/**
 * Generates a... random... color... yeah.
 * @returns {string}
 */
const generateRandomColor = () => {
  let color = [
    randomNum(0, 255),
    randomNum(0, 255),
    randomNum(0, 255),
  ]
  return `rgb(${color.join(", ")})`
}

/**
 * Generates a random whole Number
 * @param {Number} max Maximum
 * @param {Number} min Minimum
 */
const randomNum = (max, min=0) => {
  return Math.round(Math.random() * (max - min)) + min 
}

/**
 * Uses the Fisher-Yates shuffle algorithm
 * https://w.wiki/8Zj
 * @param {Array} arr [1, 2, 3, 4, 5]
 * @returns {Array} Shuffled. [5, 2, 3, 1, 4] or smth
 */
const shuffle = (arr) => {
  for (let i = arr.length-1; i > 0; i--) {
    const randIndex = randomNum(i, 0)
    const temp = arr[i]
    arr[i] = arr[randIndex]
    arr[randIndex] = temp
  }
  return arr
}

/**
 * Choice Section
 */
class Choices {
  constructor() {
    this.list = []

    /**
     * Creates a randomized set of choices with one "correct" button.
     * @param {Number} numOfChoices Default is 3
     * @param {String} correctColor Color value of the correct color
     * @returns {HTMLElement[]} A list of the produced choices
     */
    this.setup = (numOfChoices = 3, correctColor) => {
      let choices = []
      // Create "wrong" choices
      for (let i = 1; i < numOfChoices; i++) {
        choices.push(new ChoiceBtn())
      }
      // Correct choice is made
      const correct = new ChoiceBtn()
      correct.color = correctColor
      choices.push(correct)
      
      // Shuffle around
      choices = shuffle(choices)
      this.list = choices
      return choices
    }

    /**
     * Appends all the choice elements to a container
     * @param {HTMLElement} container Where the choices should be displayed
     */
    this.displayTo = (container) => {
      // Clears container before adding new elements
      container.replaceChildren()
      // Add new elements
      this.list.forEach(choice => choice.displayTo(container))
    }
  }
}

class ChoiceBtn {
  constructor() {
    this.color = generateRandomColor()
    const make = () => {
      const btn = document.createElement("button")
      btn.classList.add("color-choice")
      btn.style.backgroundColor = this.color
      this.element = btn
      return btn
    }
    this.element = make()
    this.displayTo = (container) => {
      container.appendChild(make())
    }
  }
}

const GAME_CONTAINER = document.querySelector("main")
const EVENT_CORRECT = new Event("correct")
const EVENT_INCORRECT = new Event("incorrect")

class Round {
  constructor() {
    const colorDisplay = GAME_CONTAINER.querySelector("#color-prompt>h2")
    const choiceContainer = GAME_CONTAINER.querySelector("#choices")
    let correctColor = generateRandomColor()

    this.score = 0
    this.lives = 5
    
    choiceContainer.addEventListener("click", (e) => {
      const btn = e.target
      if (!btn.classList.contains("color-choice")) return
      
      if (btn.style.backgroundColor === correctColor) {
        GAME_CONTAINER.dispatchEvent(EVENT_CORRECT)
        return true
      } else if (btn.style.backgroundColor !== correctColor) {
        GAME_CONTAINER.dispatchEvent(EVENT_INCORRECT)
        return false
      }
    })
    
    this.setup = () => {
      correctColor = generateRandomColor()
      colorDisplay.textContent = correctColor

      const choiceButtons = new Choices()
      choiceButtons.setup(5, correctColor)
      choiceButtons.displayTo(choiceContainer)
    }

    this.reset = () => {
      this.setup()
      this.score = 0
      console.error("Restarted")
    }
    
    GAME_CONTAINER.addEventListener("correct", () => {
      this.setup()
      this.score++;
      console.log("score:", this.score)
    })
    GAME_CONTAINER.addEventListener("incorrect", () => this.reset())
  }
}

const GAME = new Round()
GAME.setup()




