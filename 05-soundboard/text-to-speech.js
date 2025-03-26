const textField = document.querySelector("#text-to-speech>textarea")
const sayBtn = document.querySelector("#text-to-speech>#say")
const TTS = new SpeechSynthesisUtterance();

sayBtn.addEventListener("click", () => {
  TTS.text = textField.value || "Hello, world!"
  window.speechSynthesis.speak(TTS)
  sayBtn.classList.add("audio-active")
  sayBtn.setAttribute("disabled", "")
})

TTS.addEventListener("end", () => {
  sayBtn.classList.remove("audio-active")
  sayBtn.removeAttribute("disabled")
})