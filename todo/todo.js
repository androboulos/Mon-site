const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const counter = document.getElementById("counter");
const filterButtons = document.querySelectorAll(".filters button");

// Ajouter tâche
addTaskBtn.addEventListener("click", addTask);

// Ajouter avec ENTER
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

// Filtres
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterTasks(btn.dataset.filter);
  });
});

function addTask() {
  const text = taskInput.value.trim();
  if (text === "") return alert("Entrez une tâche");

  const li = document.createElement("li");
  li.textContent = text;

  li.addEventListener("click", () => {
    li.classList.toggle("done");
    saveTasks();
    updateCounter();
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "❌";
  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    li.remove();
    saveTasks();
    updateCounter();
  });

  li.appendChild(deleteBtn);
  taskList.appendChild(li);

  taskInput.value = "";
  saveTasks();
  updateCounter();
}

// Compteur
function updateCounter() {
  const total = taskList.children.length;
  const done = document.querySelectorAll("li.done").length;
  const remaining = total - done;

  counter.textContent = `Tâches : ${remaining} à faire / ${total} au total`;
}

// Sauvegarde
function saveTasks() {
  localStorage.setItem("tasks", taskList.innerHTML);
}

// Chargement
function loadTasks() {
  const saved = localStorage.getItem("tasks");
  if (saved) {
    taskList.innerHTML = saved;
    updateCounter();
  }
}

// Filtres
function filterTasks(filter) {
  const tasks = document.querySelectorAll("li");

  tasks.forEach(task => {
    if (filter === "all") {
      task.style.display = "flex";
    } else if (filter === "done") {
      task.style.display = task.classList.contains("done") ? "flex" : "none";
    } else if (filter === "todo") {
      task.style.display = !task.classList.contains("done") ? "flex" : "none";
    }
  });
}

loadTasks();
updateCounter();
