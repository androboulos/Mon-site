const list = document.getElementById("list");
const totalEl = document.getElementById("total");

window.onload = loadExpenses;

function addExpense() {
  const label = document.getElementById("label").value.trim();
  const amount = Number(document.getElementById("amount").value);

  if (!label || amount <= 0) return;

  const expense = { label, amount };
  const expenses = getExpenses();
  expenses.push(expense);

  saveExpenses(expenses);
  displayExpenses();

  document.getElementById("label").value = "";
  document.getElementById("amount").value = "";
}

function displayExpenses() {
  const expenses = getExpenses();
  list.innerHTML = "";
  let total = 0;

  expenses.forEach((e, index) => {
    total += e.amount;

    const li = document.createElement("li");
    li.innerHTML = `
      ${e.label} - ${e.amount} €
      <button onclick="deleteExpense(${index})">✕</button>
    `;
    list.appendChild(li);
  });

  totalEl.textContent = total.toFixed(2);
}

function deleteExpense(index) {
  const expenses = getExpenses();
  expenses.splice(index, 1);
  saveExpenses(expenses);
  displayExpenses();
}

function saveExpenses(data) {
  localStorage.setItem("expenses", JSON.stringify(data));
}

function getExpenses() {
  return JSON.parse(localStorage.getItem("expenses")) || [];
}

function loadExpenses() {
  displayExpenses();
}
