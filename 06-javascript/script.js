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

  // Lets me set a value through code
  this.setValue = (newValue) => {
    this.value = this.field.value = newValue;
  };
}

/**
 * Set up fields and their defaults here
 */
const costPerLitre = new fieldAndValue("#cost-per-litre");
costPerLitre.setValue(1.72)
const numOfLitres = new fieldAndValue("#litres");
numOfLitres.setValue(0)

// Elements that are NOT fields but I still need
const calculatorForm = document.querySelector("form#petrol-calculator")
const outputText = document.querySelector("#output")

// Unicode emojis (not the most important but I'm defining them here now)
const sparkleEmoji = String.fromCodePoint(0x2728)
const warningEmoji = String.fromCodePoint(0x26A0,0xFE0F)

/**
 * Functionalities go here
 */
calculatorForm.addEventListener("submit", event => {
  event.preventDefault();
  const totalPrice = calculateGasPrice(costPerLitre.value, numOfLitres.value);
  
  // Will print out an error message if the output is invalid
  const result = !Number.isNaN(totalPrice)
  ? `${sparkleEmoji} ${totalPrice.toLocaleString('en', {style:"currency", currency:"AED"})} ${sparkleEmoji}`  // Currency Formatting.
  : `${warningEmoji} Error ${warningEmoji}`;  // Error message if all else fails.

  // Display result to the HTML Document
  outputText.textContent = result;
})

const calculateGasPrice = (cost, quantity) => {
  return Math.ceil((cost * quantity) * 1000) / 1000
}