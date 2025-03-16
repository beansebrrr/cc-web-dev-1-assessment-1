const filters = document.querySelectorAll("figure .filter-buttons")
console.log(filters)

filters.forEach(set => {
  set.addEventListener("click", (e) => {
    const btn = e.target
    if (!Array.from(btn.classList).includes("filter")) return
    
    const catImage = btn.parentElement.parentElement.querySelector("img")
    addFilter(btn.classList, catImage)
  })  
})


function addFilter(filterList, image) {
  const filterType = filterList[1]
  switch (filterType) {
    case "mono":
      image.style.filter = "grayscale(100%)"
      break
    case "sepia":
      image.style.filter = "sepia(100%)"
      break
    case "blur":
      image.style.filter = "blur(8px)"
      break
    case "original":
      image.style.filter = ""
      break
    default:
      break;
  }
}