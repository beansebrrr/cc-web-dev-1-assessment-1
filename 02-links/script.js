const headerLogo = document.querySelector("#logo");

document.addEventListener("scroll", () => {
  headerLogo.style.fontSize = window.scrollY > 0 ?  "2rem" : "3rem"
})