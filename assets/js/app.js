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

const errors = [
  "Can't be blank",
  "Wrong format, numbers only",
  "Must contain ",
];

let errs = [];

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
  formCard = id("card-form"),
  completedMessage = id("completed-message"),
  errorMsg = classes("error");

twoWayBinding(formCardHolder, cardHolder, holder);
twoWayBinding(formCardNumber, cardNumber, number);
twoWayBinding(formDateMonth, cardDateMonth, dateMonth);
twoWayBinding(formDateYear, cardDateYear, dateYear);
twoWayBinding(formCvc, cardCvc, cvc);

formConfirmButton.addEventListener("click", (event) => {
  event.preventDefault();
  errs = [];
  formValidation(formCardHolder, 0, false, null, errors[0]);
  formValidation(formCardNumber, 1, true, 16, errors[0]);
  formValidation(formDateMonth, 2, true, 2, errors[0]);
  formValidation(formDateYear, 3, true, 2, errors[0]);
  formValidation(formCvc, 4, true, 3, errors[0]);

  errs.length === 0 ? (formCard.style.display = "none",
    completedMessage.style.display = "block") : (formCard.style.display = "block",
      completedMessage.style.display = "none");
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

let formValidation = (id, serial, integer, minChars, message) => {
  if (id.value.trim().length === 0) {
    showErrors(errorMsg[serial], colors[0], id, message);
    checkExpDateErrors(errorMsg[3], errorMsg[2], message);
    errs.push(errorMsg[serial]);
  } else if (integer === true && checkIfNumbersOnly(id)) {
    showErrors(errorMsg[serial], colors[0], id, errors[1]);
    checkExpDateErrors(errorMsg[3], errorMsg[2], errors[1]);
    errs.push(errorMsg[serial]);
  } else if (
    integer === true &&
    id.value.replace(/\s/g, "").length < minChars
  ) {
    errorMsg[serial].innerHTML = errors[2] + minChars + " digits";
    checkExpDateErrors(
      errorMsg[3],
      errorMsg[2],
      errors[2] + minChars + " digits"
    );
    errs.push(errorMsg[serial]);
  } else {
    errorMsg[serial].innerHTML = "";
    id.style.border = colors[1];
    errs = [];
  }
};

let checkIfNumbersOnly = (input) => {
  return isNaN(input.value.replace(/\s/g, ""));
};

let checkExpDateErrors = (err1, err2, message) => {
  err1.innerHTML === ""
    ? (err2.innerHTML === message,
      (err2.style.display = "block"),
      (err1.style.display = "none"))
    : (err2.innerHTML === "",
      (err2.style.display = "none"),
      (err1.style.display = "block"));
};

let showErrors = (errorMsg, errorStyle, id, msg) => {
  return (errorMsg.innerHTML = msg), (id.style.border = errorStyle);
};
