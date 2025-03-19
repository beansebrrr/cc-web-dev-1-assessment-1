const Tasks = document.querySelectorAll("#todo-list .task")

const subTasks = document.querySelectorAll("#todo-list .sub-task")

/* Main task checkboxes */
Tasks.forEach(task => {
  const checkbox = task.querySelector(".checkbox")
  checkbox.addEventListener("click", () => {
    task.classList.toggle("checked")
  })
})

/* Subtask checkboxes */
subTasks.forEach(subTask => {
  subTask.addEventListener("dblclick", () => {
    subTask.classList.toggle("checked")
  })
})

/* Cloning the notes to fill the grid. */
const note = document.querySelector(".note")

for (let i = 0; i < 10; i++) {
  note.parentElement.appendChild(note.cloneNode(true))
}