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
costPerLitre.setDefaultValue(1.3)

const numOfLitres = new fieldAndValue("#litres");
numOfLitres.setDefaultValue(0)

const submitBtn = document.querySelector("button#evaluate");


/**
 * Functionalities go here
 */

submitBtn.addEventListener("click", event => {
  event.preventDefault();
})