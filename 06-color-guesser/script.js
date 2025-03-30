/**
 * Generates a... random... color... yeah.
 * @param {boolean} returnAsHex returns hex or rgb()?
 * @returns {string}
 */
const generateRandomColor = (returnAsHex=true) => {
  let color = [
    randomNum(0, 255),
    randomNum(0, 255),
    randomNum(0, 255),
  ]
  if (returnAsHex) {
    color = color.map(val => val.toString(16).padStart(2, "0"))
    return ["#", ...color].join("").toUpperCase() 
  }
  return `rgb(${color[0]}, ${color[1]}, ${color[2]})`
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
    console.log()
    const randIndex = randomNum(i, 0)
    const temp = arr[i]
    arr[i] = arr[randIndex]
    arr[randIndex] = temp
  }
  return arr
}

function Game() {

}

class GameRound {
  constructor(gameContainer) {
    let choices = [];
    let correctColor = generateRandomColor()
    const colorDisplay = gameContainer.querySelector("#color-query>h2")
    const choiceSection = gameContainer.querySelector("#choices")
    const resetBtn = gameContainer.querySelector("#reset")
    resetBtn.addEventListener("click", () => this.start())
    
    const createChoices = (numOfChoices) => {
      choices = []
      // Random Extra Choices
      for (let i = 0; i < numOfChoices - 1; i++) {
        const wrongChoice = new colorChoice()
        wrongChoice.setColor()
        wrongChoice.isWrong()
        choices.push(wrongChoice)
      }
      // Add the correct choice too
      const correctChoice = new colorChoice()
      correctChoice.setColor(correctColor)
      correctChoice.isCorrect()
      choices.push(correctChoice)
      
      const shuffled = shuffle(choices)
      this.choices = choices = shuffled
      return shuffled
    }

    const displayChoices = () => {
      choiceSection.replaceChildren()
      choices.forEach(choice => {
        choiceSection.appendChild(choice.element)
      })
    }

    this.numOfChoices = 3
    this.hexMode = true
    this.start = () => {
      correctColor = generateRandomColor(this.hexMode)
      colorDisplay.textContent = correctColor
      createChoices(this.numOfChoices)
      displayChoices()
    }
  }
}

class colorChoice {
  constructor() {
    let color = this.color;
    const eventCorrect = new CustomEvent("correct", {bubbles : true})
    const eventWrong = new CustomEvent("wrong", {bubbles : true})
    
    const build = () => {
      const btn = document.createElement("button")
      btn.classList.add("color-choice")
      return btn
    }
    const setColor = (c = "random") => {
      color = this.color = c.toLowerCase() === "random" ? generateRandomColor() : c
      this.element.style.backgroundColor = color
      return color
    }


    this.setColor = setColor
    this.element = build()
    this.isCorrect = () => {
      this.element.addEventListener("click", () => {
        console.log("yeah")
        this.element.dispatchEvent(eventCorrect)
      })
    }
    this.isWrong = () => {
      this.element.addEventListener("click", () => {
        console.log("naeh")
        this.element.dispatchEvent(eventWrong)
      })
    }
  }
}


const CONTAINER = document.querySelector("main")
const GAME = new GameRound(CONTAINER)
GAME.start()
