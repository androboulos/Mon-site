const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Ajouter une tâche avec le bouton
addTaskBtn.addEventListener("click", addTask);

// Ajouter une tâche avec ENTER
taskInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Veuillez entrer une tâche !");
    return;
  }

  const li = document.createElement("li");
  li.textContent = taskText;

  // Marquer comme terminée
  li.addEventListener("click", () => {
    li.classList.toggle("done");
    saveTasks();
  });

  // Bouton supprimer
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "❌";
  deleteBtn.style.backgroundColor = "#e03131";

  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // empêche de cocher la tâche
    li.remove();
    saveTasks();
  });

  li.appendChild(deleteBtn);
  taskList.appendChild(li);

  taskInput.value = "";
  saveTasks();
}

// Sauvegarde dans le navigateur
function saveTasks() {
  localStorage.setItem("tasks", taskList.innerHTML);
}

// Chargement au démarrage
function loadTasks() {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    taskList.innerHTML = savedTasks;
  }
}

loadTasks();
