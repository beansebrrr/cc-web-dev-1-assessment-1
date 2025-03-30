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
  } else return `rgb(${color[0]}, ${color[1]}, ${color[2]})`
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

function Round() {
  const correctColor = generateRandomColor()

  this.play = () => {
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
    this.displayTo = (container) => {
      container.appendChild(make())
    }
  }
}

const main = document.querySelector("main")
const choicebtn = new ChoiceBtn()
choicebtn.color = "#000000"
choicebtn.displayTo(main)

