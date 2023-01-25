let events = localStorage.getItem("events")
  ? JSON.parse(localStorage.getItem("events"))
  : [];

const container = document.getElementById("container");
const month = document.getElementById("month");
const weeks = document.getElementById("weeks");
const expenseItem = document.querySelector("#expensesPanel > .expenseItem");

function loadWeeks() {
  const dt = new Date();
  const currentMonth = dt.getMonth();
  const currentYear = dt.getFullYear();

  const currentMonthWeekCount = weekCount(currentYear, currentMonth);

  weeks.style.gridTemplateColumns = `repeat(${currentMonthWeekCount}, 1fr)`;

  for (let i = 0; i < currentMonthWeekCount * 6; i++) {
    const newWeek = document.createElement("div");
    const addNewItem = document.createElement("button");
    const zoomDetails = document.createElement("div");

    newWeek.classList.add("newWeek");
    addNewItem.classList.add("add");
    zoomDetails.classList.add("fa-solid");
    zoomDetails.classList.add("fa-magnifying-glass-plus");
    zoomDetails.classList.add("fa-inverse");

    weeks.appendChild(newWeek);
    newWeek.appendChild(addNewItem);
    newWeek.appendChild(zoomDetails);

    addNewItem.innerText = "+";

    newWeek.addEventListener("mouseover", () => {
      newWeek.classList.add("active");
    });
    newWeek.addEventListener("mouseout", () => {
      newWeek.classList.remove("active");
    });
  }
}

function weekCount(year, month_number) {
  var firstOfMonth = new Date(year, month_number - 1, 1);
  var lastOfMonth = new Date(year, month_number, 0);

  var used = firstOfMonth.getDay() + lastOfMonth.getDate();

  return Math.ceil(used / 7);
}

loadWeeks();
