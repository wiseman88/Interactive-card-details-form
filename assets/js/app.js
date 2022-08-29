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

const formCardHolder = document.getElementById("form-card-holder");
const formCardNumber = document.getElementById("form-card-number");
const formDateMonth = document.getElementById("form-date-month");
const formDateYear = document.getElementById("form-date-year");
const formCvc = document.getElementById("form-cvc");

const cardHolder = document.getElementById("card-holder");
const cardNumber = document.getElementById("card-number");
const cardDateMonth = document.getElementById("card-date-month");
const cardDateYear = document.getElementById("card-date-year");
const cardCvc = document.getElementById("card-cvc");

twoWayBinding(formCardHolder, cardHolder, holder);
twoWayBinding(formCardNumber, cardNumber, number);
twoWayBinding(formDateMonth, cardDateMonth, dateMonth);
twoWayBinding(formDateYear, cardDateYear, dateYear);
twoWayBinding(formCvc, cardCvc, cvc);

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

  inputElement.addEventListener("keyup", (event) => {
    data.prop = event.target.value;
  });
}
