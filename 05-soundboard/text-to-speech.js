/* Select the relevant elements for this to work */
const textField = document.querySelector("#text-to-speech>textarea")
const sayBtn = document.querySelector("#text-to-speech>#say")

/* Web Speech API */
const TTS = new SpeechSynthesisUtterance();

sayBtn.addEventListener("click", () => {
  // Extract audio from textfield, says "hello world" if blank
  TTS.text = textField.value || "Hello, world!"
  // Speak.
  window.speechSynthesis.speak(TTS)

  // Styling
  sayBtn.classList.add("audio-active")
  sayBtn.setAttribute("disabled", "")
})

// Also styling
TTS.addEventListener("end", () => {
  sayBtn.classList.remove("audio-active")
  sayBtn.removeAttribute("disabled")
})