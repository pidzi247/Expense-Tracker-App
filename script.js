let navigate = 0;
let events = localStorage.getItem("events")
  ? JSON.parse(localStorage.getItem("events"))
  : [];
let monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const month = document.getElementById("header");
const weeks = document.getElementById("weeks");
const expenseItem = document.querySelector("#expensesPanel > .expenseItem");
const weeksInfo = document.getElementById("weeksInfo");
const newEventModal = document.getElementById("newEventModal");
const backDrop = document.getElementById("backDrop");
const newEventValue = document.getElementById("expenseValue");
const newEventDate = document.getElementById("eventDate");
const newEventDescription = document.getElementById("description");
const newIndex = document.getElementById("index");

function load() {
  const dt = new Date();

  if (navigate !== 0) {
    dt.setMonth(new Date().getMonth() + navigate);
  }

  const currentDay = dt.getDate();
  const currentMonth = dt.getMonth();
  const currentYear = dt.getFullYear();

  document.getElementById(
    "date"
  ).textContent = `${monthNames[currentMonth]} ${currentYear}`;

  weeksInfo.innerHTML = "";
  weeks.innerHTML = "";

  const currentMonthWeekCount = weekCount(currentYear, currentMonth);

  weeks.style.gridTemplateColumns = `repeat(${currentMonthWeekCount + 1}, 1fr)`;
  weeks.style.gridTemplateRows = `repeat(${currentMonthWeekCount + 1}, 1fr)`;
  weeksInfo.style.gridTemplateColumns = `repeat(${
    currentMonthWeekCount + 1
  }, 1fr)`;

  for (let i = 1; i <= (currentMonthWeekCount + 1) * 6; i++) {
    const newWeek = document.createElement("div");
    const addNewItem = document.createElement("button");
    const zoomDetails = document.createElement("div");

    const findIndex = events.filter((e) => e.index === (i - 1) + "");
    
    findIndex.forEach((item) => {
      if(Number(item.date.split(".")[1])-1 === currentMonth) {
        const newAmount = document.createElement("div");
        newAmount.classList.add("amount");
        newAmount.textContent = item.amount;
        newWeek.appendChild(newAmount);
      }
    });

    if (
      (i !== 0 && i % (currentMonthWeekCount + 1) === 0) ||
      i > (currentMonthWeekCount + 1) * 6 - 6
    ) {
      newWeek.classList.add("newWeek");
      weeks.appendChild(newWeek);
    } else {
      newWeek.classList.add("newWeek");
      addNewItem.classList.add("add");
      zoomDetails.classList.add("fa-solid");
      zoomDetails.classList.add("fa-magnifying-glass-plus");

      weeks.appendChild(newWeek);
      newWeek.appendChild(addNewItem);
      newWeek.appendChild(zoomDetails);

      addNewItem.innerText = "+";
    }

    newWeek.addEventListener("mouseover", () => {
      newWeek.classList.add("active");
    });
    newWeek.addEventListener("mouseout", () => {
      newWeek.classList.remove("active");
    });

    const addIndex = document.querySelectorAll(".add");

    for (let i = 0; i < addIndex.length; i++) {
      let count = 0;
      addIndex[i].addEventListener("click", function () {
        openModal();
        if (i < 5) {
          newIndex.value = i;
        } else if (i % 5 === 0 && i !== 0) {
          count++;
          newIndex.value = i + count;
        } else {
          newIndex.value = i + count + 1;
        }
      });
    }
  }

  for (let i = 0; i < currentMonthWeekCount + 1; i++) {
    const weekNum = document.createElement("div");
    weekNum.classList.add("weekNum");
    if (i === currentMonthWeekCount) {
      weekNum.innerText = `Total`;
    } else {
      weekNum.innerText = `Week ${i + 1}`;
    }
    weeksInfo.appendChild(weekNum);
  }
}

function weekCount(year, month_number) {
  var firstOfMonth = new Date(year, month_number - 1, 1);
  var lastOfMonth = new Date(year, month_number, 0);

  var used = firstOfMonth.getDay() + lastOfMonth.getDate();

  return Math.ceil(used / 7);
}

function openModal() {
  newEventModal.style.display = "block";
  backDrop.style.display = "block";
}

function saveEvent() {
  events.push({
    amount: newEventValue.value,
    date: newEventDate.value,
    description: newEventDescription.value,
    index: newIndex.value,
  });

  localStorage.setItem("events", JSON.stringify(events));

  closeEvent();
}

function closeEvent() {
  backDrop.style.display = "none";
  newEventModal.style.display = "none";
  newEventDate.value = "";
  newEventDescription.value = "";
  newEventValue.value = "";
}

function buttons() {
  document.getElementById("prevButton").addEventListener("click", () => {
    navigate--;
    load();
  });
  document.getElementById("nextButton").addEventListener("click", () => {
    navigate++;
    load();
  });

  document.getElementById("saveButton").addEventListener("click", saveEvent);
  document.getElementById("cancelButton").addEventListener("click", closeEvent);
}

buttons();
load();
