// Form Handle

const data = {
  value: "",
};

Object.defineProperty(data, "prop", {
  get: () => {
    console.log("Getter called");
    return this.value;
  },
  set: (value) => {
    console.log("Setter called");
    this.value = value;
    printVal();
  },
});

const el = document.getElementById("form-card-holder");

el.addEventListener("keyup", (event) => {
  data.prop = event.target.value;
});

function printVal() {
  const el = document.getElementById("card-holder");
  el.innerText = data.prop;
}
