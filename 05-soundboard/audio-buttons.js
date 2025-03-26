// List all the audio files here 
const AUDIO_DIRECTORY = "./audio/"
const MP3_FILES = [
  "ah-ha",
  "aqua",
  "back-of-the-net",
  "bang-out-of-order",
  "bangkok",
  "billwithers",
  "bird-noise",
  "bugger",
  "dan",
  "email-of-the-evening",
  "hello-partridge",
  "helloooo",
  "i-ate-a-scotch-egg",
  "i-love-em",
  "im-confused",
  "japan",
  "ten",
  "that-went-quite-well",
  "touch-my-this",
  "uh",
  "what",
  "why-do-why-do",
]
// Container.
const CONTAINER = document.querySelector("section#soundboard")


class ButtonGrid {
  constructor(files) {
    /**
     * Function for creating the grid pages
     * @param {String[]} files Array of MP3 files go here
     * @param {Number} buttonsPerPage 9 duh
     * @returns {Object[]} Array of `Page` objects
     */
    const makePages = (files, buttonsPerPage) => {
      const groupedFiles = groupIntoN(files, buttonsPerPage)

      return groupedFiles.reduce((pgList, group) => {
        const pg = new Page(group)
        pg.pageNumber = groupedFiles.indexOf(group) + 1
        pgList.push(pg)
        return pgList
      }, [])
    }
    const pages = makePages(files, 9)
    let currentPage = 1
    this.numOfPages = pages.length

    /**
     * Appends the button grid to "container"
     * @param {HTMLElement} container Element where you want to display the button grid
     */
    this.displayTo = (container) =>
      pages.forEach(page => container.appendChild(page.element)
    )

    /**
     * Shows a specified page and hides all the other pages
     * @param {Number} pageNum pageNumber of page you wish to show
     */
    this.goToPage = (pageNum) => {
      currentPage = pageNum
      pages.forEach(page => page.pageNumber !== pageNum ? page.hide() : page.show())
      document.dispatchEvent(new Event("update-nav-btn"))
    }

    /**
     * Nav buttons (previous page, next page)
     * @param {String} selector Nav button's CSS Selector
     * @param {Boolean} reverse Navigate backwards?
     * @param {Number} increment How many pages will be traveled at a time?
     */
    this.navButton = (selector, reverse=false, increment=1) => {
      const element = document.querySelector(selector)
      const multiplier = reverse ? -1 : 1
      increment *= multiplier;
    
      element.addEventListener("click", () => {
        this.goToPage(currentPage + increment)
      })

      // Disables the buttons if in first and/or last page
      const updateNavAvailability = () => {
        if ((reverse && currentPage <= 1) ||
        (!reverse && currentPage >= this.numOfPages)) {
          element.classList.add("disabled")
          element.setAttribute("disabled", "")
        } else {
          element.classList.remove("disabled")
          element.removeAttribute("disabled")
        }
      }
      updateNavAvailability()
      document.addEventListener("update-nav-btn", () => updateNavAvailability())
    }
    this.goToPage(1)
  }
}

/**
 * Is the 9x9 grid of buttons itself.
 * I named it a page because we'll be navigating between
 * multiple of them.
 * @param {String[]} groupList Array of the files' names
 */
class Page {
  constructor(groupList) {
    const page = createElementWithClass("section", "audio-page")

    /**
     * Create buttons out of the Array
     * @returns NodeList of buttons
     */
    const produceButtons = () => {
      const buttonsFragment = new DocumentFragment()
      groupList.forEach(filename => {
        buttonsFragment.appendChild(AudioButton(filename))
      })
      return buttonsFragment.querySelectorAll(".audio-button")
    }

    produceButtons().forEach(button => {
      page.appendChild(button)
    })

    // Properties I can reference in other parts of the code
    this.element = page;
    this.pageNumber = 0;

    // Will be used for switching between pages
    this.hide = () => this.element.classList.add("hidden")
    this.show = () => this.element.classList.remove("hidden")
  }
}



function AudioButton(filename) {
  const btnElement = createElementWithClass("button", "audio-button")
  const titleElement = createElementWithClass("h3", "audio-title")
  btnElement.appendChild(titleElement);
  
  // Link the file to the audio element here
  const src = [AUDIO_DIRECTORY, filename, ".mp3"].join('');
  const audioElement = btnElement.appendChild(new Audio(src));

  // Alters the filename for a more appropriate button title
  titleElement.textContent = kebabToSentenceCase(filename);

  // Plays its audio when button is pressed
  btnElement.addEventListener("click", () => {
    btnElement.classList.add("audio-active")
    audioElement.currentTime = 0
    audioElement.play()
  })
  audioElement.addEventListener("ended", () => {
    btnElement.classList.remove("audio-active")
  })

  return btnElement;
}

/* --------------------------------------------------------- */

/**
 * Create a documentElement and add a class to it.
 * Merged into one line.
 * @param {String} htmlTag "div", "p", "section"
 * @param {*} className "flexbox", "nav-item"
 * @returns 
 */
const createElementWithClass = (htmlTag, className) => {
  const element = document.createElement(htmlTag)
  element.classList.add(className)
  return element
}

/**
 * Splits the array into groups of N
 * @param {Array} arr [1, 2, 3, ..., 12]
 * @param {Number} groupSize 4
 * @returns {Array} [[1, 2, 3, 4], ..., [9, 10, 11, 12]]
 */
function groupIntoN(arr, groupSize) {
  return Array.from({ length: Math.ceil(arr.length / groupSize) }, (_, i) =>
    arr.slice(i * groupSize, i * groupSize + groupSize)
  );
}

/**
 * Converts kebab-case text into Sentence case
 * @param {String} str hello-world
 * @returns {String} Hello world
 */
const kebabToSentenceCase = (str) => {
  return str.split("-").map(
    (word, i) => i === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word.toLowerCase()
  ).join(" ");
}

/* --------------------------------------------------------- */

// boom. two lines.
const AUDIO_BUTTONS = new ButtonGrid(MP3_FILES)
AUDIO_BUTTONS.displayTo(CONTAINER)

// now four.
AUDIO_BUTTONS.navButton("#btnPrevPage", reverse=true)
AUDIO_BUTTONS.navButton("#btnNextPage", reverse=false)

/* --------------------------------------------------------- */