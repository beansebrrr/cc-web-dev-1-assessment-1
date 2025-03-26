/**
 * Generates a... random... color... yeah.
 * @param {boolean} returnAsArray Should the function return the color as a string or object?
 * @returns {(Number[]|string)}
 */
const generateRandomColor = (returnAsArray=false) => {
  const r = randomNum(0, 255)
  const g = randomNum(0, 255)
  const b = randomNum(0, 255)

  return returnAsArray ? [r, g, b] : `rgb(${r}, ${g}, ${b})`
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

class colorChoice {
  constructor() {
    let color = this.color;
    
    const build = () => {
      const btn = document.createElement("button")
      btn.classList.add("color-choice")
      return btn
    }
    
    /**
     * @param {string} c `random` or `rgb(255, 135, 66)`
    */
   this.setColor = (c = "random") => {
     color = this.color = c.toLowerCase() === "random" ? generateRandomColor() : c
     this.element.style.backgroundColor = color
     return color
    }
    this.element = build()
    this.isCorrect = () => {
      console.log(color)
      this.element.addEventListener("click", () => {
        console.log("celebrate")
      })
    }
  }
}

class Game {
  constructor() {
    const correctColor = generateRandomColor()

    const createChoices = (numOfChoices = 3) => {
      let choices = []
      // Random Extra Choices
      for (let i = 0; i < numOfChoices - 1; i++) {
        const wrongChoice = new colorChoice()
        wrongChoice.setColor()
        choices.push(wrongChoice)
      }
      // Add the correct choice too
      const correctChoice = new colorChoice()
      correctChoice.setColor(correctColor)
      correctChoice.isCorrect()
      choices.push(correctChoice)

      const shuffled = shuffle(choices)
      this.choices = shuffled
      return shuffled
    }

    const choose = (choice) => {
      if (choice.color === correctColor) return "Yaeh"
      return "Naeh"
    }

    this.correctColor = correctColor
    this.createChoices = createChoices
    this.choose = choose

    createChoices()
  }
}

const GAME = new Game()
const CONTAINER = document.querySelector("#choices")

GAME.choices.forEach(choice => CONTAINER.appendChild(choice.element))
