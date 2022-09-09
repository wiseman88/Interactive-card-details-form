// Form Handle

const holder = {
  value: "",
};

const number = {
  value: "",
};

const dateMonth = {
  value: "",
};

const dateYear = {
  value: "",
};

const cvc = {
  value: "",
};

let id = (id) => document.getElementById(id);
let classes = (classes) => document.getElementsByClassName(classes);

let formCardHolder = id("form-card-holder"),
  formCardNumber = id("form-card-number"),
  formDateMonth = id("form-date-month"),
  formDateYear = id("form-date-year"),
  formCvc = id("form-cvc"),
  formConfirmButton = id("form-confirm-button"),
  cardHolder = id("card-holder"),
  cardNumber = id("card-number"),
  cardDateMonth = id("card-date-month"),
  cardDateYear = id("card-date-year"),
  cardCvc = id("card-cvc"),
  errorMsg = classes("error");

twoWayBinding(formCardHolder, cardHolder, holder);
twoWayBinding(formCardNumber, cardNumber, number);
twoWayBinding(formDateMonth, cardDateMonth, dateMonth);
twoWayBinding(formDateYear, cardDateYear, dateYear);
twoWayBinding(formCvc, cardCvc, cvc);

formConfirmButton.addEventListener("click", (event) => {
  event.preventDefault();
  formValidation(formCardHolder, 0, "Can't be blank");
  formValidation(
    formCardNumber,
    1,
    "Can't be blank",
    "Wrong format, numbers only"
  );
  formValidation(formDateMonth, 2, "Can't be blank");
  formValidation(formDateYear, 2, "Can't be blank");
  formValidation(formCvc, 3, "Can't be blank");
});

// Form handle - functions
function twoWayBinding(inputElement, cardElement, data) {
  Object.defineProperty(data, "prop", {
    get: () => {
      return this.value;
    },
    set: (value) => {
      this.value = value;
      cardElement.innerText = data.prop;
    },
  });

  if (inputElement != formCardNumber) {
    inputElement.addEventListener("input", (event) => {
      data.prop = event.target.value;
    });
  } else {
    inputElement.addEventListener("input", (event) => {
      formCardNumber.value = event.target.value
        .replace(/\s/g, "")
        .replace(/(\w{4})/g, "$1 ")
        .trim();
      data.prop = formCardNumber.value;
    });
  }
}

let formValidation = (id, serial, message, message2) => {
  if (id.value.trim() === "") {
    errorMsg[serial].innerHTML = message;
    id.style.border = "1px solid hsl(0, 100%, 66%)";
  } else if (id.id === "form-card-number" && isNaN(id.value.trim())) {
    errorMsg[serial].innerHTML = message2;
  } else {
    errorMsg[serial].innerHTML = "";
    id.style.border = "1px solid hsl(270, 3%, 87%)";
  }
};
