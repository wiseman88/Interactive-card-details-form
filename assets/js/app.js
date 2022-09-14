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

const errors = ["Can't be blank", "Wrong format, numbers only"];
const colors = ["1px solid hsl(0, 100%, 66%)", "1px solid hsl(270, 3%, 87%)"];

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
  formValidation(formCardHolder, 0, false, errors[0]);
  formValidation(formCardNumber, 1, true, errors[0]);
  formValidation(formDateMonth, 2, true, errors[0]);
  formValidation(formDateYear, 2, true, errors[0]);
  formValidation(formCvc, 3, true, errors[0]);
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
  if (id.value.trim().length === 0) {
    errorMsg[serial].innerHTML = message;
    id.style.border = colors[0];
  } else if (integer === true && checkIfNumbersOnly(id)) {
    errorMsg[serial].innerHTML = errors[1];
    id.style.border = colors[0];
  } else {
    errorMsg[serial].innerHTML = "";
    id.style.border = colors[1];
  }
};

let checkIfNumbersOnly = (input) => {
  return isNaN(input.value.replace(/\s/g, ""));
};
