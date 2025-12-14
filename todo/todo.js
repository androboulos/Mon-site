const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const counter = document.getElementById("counter");
const filterButtons = document.querySelectorAll(".filters button");

// Liste des tâches
let tasks = [];

// Ajouter tâche
addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => { if (e.key === "Enter") addTask(); });

// Filtres
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => filterTasks(btn.dataset.filter));
});

// Ajouter une tâche
function addTask() {
  const text = taskInput.value.trim();
  if (!text) return alert("Entrez une tâche");

  const task = { text: text, done: false };
  tasks.push(task);
  saveTasks();
  renderTasks();
  taskInput.value = "";
}

// Affichage des tâches
function renderTasks(filter = "all") {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    if (
      filter === "all" ||
      (filter === "done" && task.done) ||
      (filter === "todo" && !task.done)
    ) {
      const li = document.createElement("li");
      li.textContent = task.text;
      if (task.done) li.classList.add("done");

      // Toggle done
      li.addEventListener("click", () => {
        task.done = !task.done;
        saveTasks();
        renderTasks(filter);
      });

      // Supprimer
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "❌";
      deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        tasks.splice(index, 1);
        saveTasks();
        renderTasks(filter);
      });

      li.appendChild(deleteBtn);
      taskList.appendChild(li);
    }
  });

  updateCounter();
}

// Compteur
function updateCounter() {
  const total = tasks.length;
  const doneCount = tasks.filter(t => t.done).length;
  const remaining = total - doneCount;
  counter.textContent = `Tâches : ${remaining} à faire / ${total} au total`;
}

// Sauvegarde
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Chargement
function loadTasks() {
  const saved = localStorage.getItem("tasks");
  if (saved) tasks = JSON.parse(saved);
  renderTasks();
}

// Filtrer
function filterTasks(filter) {
  renderTasks(filter);
}

loadTasks();
