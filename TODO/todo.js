const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

addTaskBtn.addEventListener("click", addTask);

function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Veuillez entrer une tâche !");
    return;
  }

  const li = document.createElement("li");
  li.textContent = taskText;

  // Marquer comme terminé
  li.addEventListener("click", () => {
    li.classList.toggle("done");
  });

  // Bouton supprimer
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "❌";
  deleteBtn.style.background = "red";

  deleteBtn.addEventListener("click", () => {
    li.remove();
  });

  li.appendChild(deleteBtn);
  taskList.appendChild(li);

  taskInput.value = "";
}
