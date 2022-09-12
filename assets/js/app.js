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

const wrongFormatMessage = "Wrong format, numbers only";

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
  formValidation(formCardHolder, 0, false, "Can't be blank");
  formValidation(formCardNumber, 1, true, "Can't be blank");
  formValidation(formDateMonth, 2, true, "Can't be blank");
  formValidation(formDateYear, 2, true, "Can't be blank");
  formValidation(formCvc, 3, true, "Can't be blank");
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

let formValidation = (id, serial, integer, message) => {
  if (id.value.trim() === "") {
    errorMsg[serial].innerHTML = message;
    id.style.border = "1px solid hsl(0, 100%, 66%)";
  } else if (
    // create function to check input value is numbers only
    integer === true &&
    checkIfNumbersOnly(id)
  ) {
    errorMsg[serial].innerHTML = wrongFormatMessage;
    id.style.border = "1px solid hsl(0, 100%, 66%)";
  } else {
    errorMsg[serial].innerHTML = "";
    id.style.border = "1px solid hsl(270, 3%, 87%)";
  }
};

let checkIfNumbersOnly = (input) => {
  return isNaN(input.value.replace(/\s/g, ""));
};
