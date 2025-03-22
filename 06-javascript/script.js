/**
 * Simplify input field management :)
 */
function fieldAndValue(selector) {
  this.field = document.querySelector(selector);
  this.value = this.field.value;

  // Update its value whenever user re-enters their 
  this.field.addEventListener("input", () => {
    this.value = this.field.value;
  })

  // Lets me set a default value
  this.setDefaultValue = (defaultValue) => {
    this.value = this.field.value = defaultValue;
  };
}

/**
 * Set up fields and their defaults here
 */

const costPerLitre = new fieldAndValue("#cost-per-litre");
costPerLitre.setDefaultValue(1.72)
const numOfLitres = new fieldAndValue("#litres");
numOfLitres.setDefaultValue(0)

const submitBtn = document.querySelector("button#evaluate");
const outputText = document.querySelector("#output")


/**
 * Functionalities go here
 */

submitBtn.addEventListener("click", event => {
  event.preventDefault();
  const totalPrice = calculateGasPrice(costPerLitre.value, numOfLitres.value);
  outputText.textContent = `AED ${totalPrice}`
})

const calculateGasPrice = (cost, quantity) => {
  return Math.ceil((cost * quantity) * 1000) / 1000
}