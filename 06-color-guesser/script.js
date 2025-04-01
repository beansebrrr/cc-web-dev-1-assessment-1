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

/**
 * Automatically generated per round
 */
class ChoiceBtn {
  constructor() {
    this.color = generateRandomColor(true)
    const make = () => {
      const btn = document.createElement("button")
      btn.classList.add("color-choice")
      btn.style.backgroundColor = this.color
      this.element = btn
      return btn
    }
    this.displayTo = (container) => {
      container.appendChild(make())
    }
  }
}

/**
 * The game. all in one object.
 */
class Round {
  constructor() {
    /* VERY IMPORTANT HTML ELEMENTS */
    const GAME_CONTAINER = document.querySelector("main")
    const colorDisplay = GAME_CONTAINER.querySelectorAll("#color-prompt>.color>span")
    const choiceContainer = GAME_CONTAINER.querySelector("#choices")
    const resetBtn = GAME_CONTAINER.querySelectorAll(".reset")
    const hearts = GAME_CONTAINER.querySelectorAll("#lives .heart")
    const scoreBoard = GAME_CONTAINER.querySelector("#score .counter")
    const gameOverScreen = GAME_CONTAINER.querySelector("#game-over")

    /* Getting two values. an array (for the colorDisplay), and
    the default RGB value */
    let correctColorArr = generateRandomColor()
    let correctColor = `rgb(${correctColorArr.join(", ")})`

    // Initializing these here
    this.score = 0
    const maxLives = 3
    let lives = maxLives
    
    // An event is dispatched depending on whether the button's color
    // matches the correctColor
    choiceContainer.addEventListener("click", (e) => {
      const btn = e.target
      if (!btn.classList.contains("color-choice")) return
      
      if (btn.style.backgroundColor === correctColor) {
        GAME_CONTAINER.dispatchEvent(new Event("correct"))
        return true
      } else if (btn.style.backgroundColor !== correctColor) {
        GAME_CONTAINER.dispatchEvent(new Event("incorrect"))
        return false
      }
    })
    
    // Set a new... random... color... yeah.
    const newRandomColor = () => {
      correctColorArr = generateRandomColor()
      correctColor = `rgb(${correctColorArr.join(", ")})`
    }

    // Update the displayed values in the Color Prompt
    const displayPrompt = () => {
      let i = 0
      colorDisplay.forEach(child => {
        child.textContent = correctColorArr[i]
        i++
      })
    }

    // Toggle broken hearts depending on how many lives
    // the player has.
    const updateHearts = () => {
      let i = 0
      hearts.forEach(heart => {
        if (i >= lives)
          heart.classList.add("broken")
        else heart.classList.remove("broken")
        i++
      })
    }

    // I didn't need this in a function but it looks
    // better like this
    const updateScoreboard = () => {
      scoreBoard.textContent = this.score
    }
    
    // When a new game starts, this is being run.
    this.setup = () => {
      newRandomColor()
      displayPrompt()
      updateHearts()
      updateScoreboard()
      
      const choiceButtons = new Choices()
      choiceButtons.setup(5, correctColor)
      choiceButtons.displayTo(choiceContainer)
    }

    // Total reset of all the values.
    this.reset = () => {
      this.score = 0
      lives = maxLives
      console.log("Restarted")
      this.setup()
      gameOverScreen.style.display = "none"
    }

    // Game over screen is displayed
    const gameOver = () => {
      gameOverScreen.style.display = "block"
      gameOverScreen.querySelector('.score').textContent = this.score
    }
    
    // Add to the player's score when the correct button is clicked
    GAME_CONTAINER.addEventListener("correct", () => {
      this.setup()
      this.score++;
      updateScoreboard()
      console.log("score:", this.score)
    })
    
    // Deducts a players lives or displays a game over screen
    GAME_CONTAINER.addEventListener("incorrect", () => {
      lives--
      this.setup()
      updateHearts()
      if (lives < 1) gameOver()
    })

    // Gives the restart buttons function.
    resetBtn.forEach(btn => btn.addEventListener("click", () => this.reset()))
  }
}

/**
 * Generates a... random... color... yeah.
 * @returns {(Number[]|String)} RGB value of a random color
 */
const generateRandomColor = (returnAsStr) => {
  const color = [
    randomNum(0, 255),
    randomNum(0, 255),
    randomNum(0, 255),
  ]
  if (returnAsStr) return `rgb(${color.join(", ")})`
  return color
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

/* The game. */

const GAME = new Round()
GAME.setup()