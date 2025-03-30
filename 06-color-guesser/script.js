/**
 * Generates a... random... color... yeah.
 * @returns {string} Random color's hex value
 */
const generateRandomColor = (returnAsObject=false) => {
  let color = [
    randomNum(0, 255),
    randomNum(0, 255),
    randomNum(0, 255),
  ]
  if (returnAsObject)
    return color
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
    const colorDisplay = GAME_CONTAINER.querySelectorAll("#color-prompt>.color>span")
    const choiceContainer = GAME_CONTAINER.querySelector("#choices")
    const resetBtn = GAME_CONTAINER.querySelectorAll(".reset")
    const hearts = GAME_CONTAINER.querySelectorAll("#lives .heart")
    const scoreBoard = GAME_CONTAINER.querySelector("#score .counter")
    const gameOverScreen = GAME_CONTAINER.querySelector("#game-over")
    let correctColorArr = generateRandomColor(true)
    let correctColor = `rgb(${correctColorArr.join(", ")})`
    
    this.score = 0
    const maxLives = 3
    let lives = maxLives
    
    choiceContainer.addEventListener("click", (e) => {
      const btn = e.target
      if (!btn.classList.contains("color-choice")) return
      
      console.log(btn.style.backgroundColor)
      if (btn.style.backgroundColor === correctColor) {
        GAME_CONTAINER.dispatchEvent(EVENT_CORRECT)
        return true
      } else if (btn.style.backgroundColor !== correctColor) {
        GAME_CONTAINER.dispatchEvent(EVENT_INCORRECT)
        return false
      }
    })
    
    const newRandomColor = () => {
      correctColorArr = generateRandomColor(true)
      correctColor = `rgb(${correctColorArr.join(", ")})`
    }

    const displayPrompt = () => {
      let i = 0
      colorDisplay.forEach(child => {
        child.textContent = correctColorArr[i]
        i++
      })
    }

    const updateHearts = () => {
      let i = 0
      hearts.forEach(heart => {
        if (i >= lives)
          heart.classList.add("broken")
        else heart.classList.remove("broken")
        i++
      })
    }

    const updateScoreboard = () => {
      scoreBoard.textContent = this.score
    }
    
    this.setup = () => {
      newRandomColor()
      displayPrompt()
      updateHearts()
      updateScoreboard()
      
      const choiceButtons = new Choices()
      choiceButtons.setup(5, correctColor)
      choiceButtons.displayTo(choiceContainer)
    }

    this.reset = () => {
      this.score = 0
      lives = maxLives
      console.log("Restarted")
      this.setup()
      gameOverScreen.style.display = "none"
    }

    const gameOver = () => {
      gameOverScreen.style.display = "block"
      gameOverScreen.querySelector('.score').textContent = this.score
    }
    
    GAME_CONTAINER.addEventListener("correct", () => {
      this.setup()
      this.score++;
      updateScoreboard()
      console.log("score:", this.score)
    })
    
    resetBtn.forEach(btn => btn.addEventListener("click", () => this.reset()))
    GAME_CONTAINER.addEventListener("incorrect", () => {
      if (lives > 0){
        lives--
        updateHearts()
        this.setup()
      } else gameOver()
    })
  }
}

const GAME = new Round()
GAME.setup()