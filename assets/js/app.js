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
const formConfirmButton = document.getElementById("form-confirm-button");

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

formConfirmButton.addEventListener("click", (event) => {
  event.preventDefault();
  const formData = [
    {
      element: formCardHolder,
      error: "Can't be blank",
    },
    {
      element: formCardNumber,
      error: "Can't be blank",
    },
    {
      element: formDateMonth,
      error: "Can't be blank",
    },
    {
      element: formDateYear,
      error: "Can't be blank",
    },
    {
      element: formCvc,
      error: "Can't be blank",
    },
  ];

  formData.forEach((item) => {
    item.element.value === ""
      ? (item.element.nextElementSibling.innerText = item.error)
      : (item.element.nextElementSibling.innerHTML = "");
  });
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
    inputElement.addEventListener("keyup", (event) => {
      data.prop = event.target.value;
    });
  } else {
    inputElement.addEventListener("keyup", (event) => {
      formCardNumber.value = event.target.value
        .replace(/[^\dA-Z]/g, "")
        .replace(/(.{4})/g, "$1 ");
      data.prop = formCardNumber.value;
    });
  }
}

// next to do

// expiration date error for month & year
