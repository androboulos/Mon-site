const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const counter = document.getElementById("counter");

addTaskBtn.addEventListener("click", addTask);
window.onload = loadTasks;

function addTask() {
  const text = taskInput.value.trim();
  if (text === "") return;

  const li = createTask(text, false);
  taskList.appendChild(li);

  taskInput.value = "";
  saveTasks();
  updateCounter();
}

function createTask(text, done) {
  const li = document.createElement("li");
  if (done) li.classList.add("done");

  const span = document.createElement("span");
  span.textContent = text;

  const actions = document.createElement("div");
  actions.className = "actions";

  const doneBtn = document.createElement("button");
  doneBtn.textContent = "✓";
  doneBtn.className = "done-btn";
  doneBtn.onclick = () => {
    li.classList.toggle("done");
    saveTasks();
    updateCounter();
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "✕";
  deleteBtn.className = "delete-btn";
  deleteBtn.onclick = () => {
    li.remove();
    saveTasks();
    updateCounter();
  };

  actions.appendChild(doneBtn);
  actions.appendChild(deleteBtn);

  li.appendChild(span);
  li.appendChild(actions);

  return li;
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("li").forEach(li => {
    tasks.push({
      text: li.querySelector("span").textContent,
      done: li.classList.contains("done")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const saved = JSON.parse(localStorage.getItem("tasks"));
  if (!saved) return;

  saved.forEach(task => {
    const li = createTask(task.text, task.done);
    taskList.appendChild(li);
  });

  updateCounter();
}

function updateCounter() {
  const total = document.querySelectorAll("li").length;
  const done = document.querySelectorAll("li.done").length;
  counter.textContent = `${done} / ${total} tâches terminées`;
}

/* Filtres */
function showAll() {
  document.querySelectorAll("li").forEach(li => li.style.display = "flex");
}

function showTodo() {
  document.querySelectorAll("li").forEach(li => {
    li.style.display = li.classList.contains("done") ? "none" : "flex";
  });
}

function showDone() {
  document.querySelectorAll("li").forEach(li => {
    li.style.display = li.classList.contains("done") ? "flex" : "none";
  });
}
