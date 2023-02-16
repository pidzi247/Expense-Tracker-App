let totalExpenseItem = 0;
let totalWeek = 0;
let grandTotal = 0;
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
let columnIndices = {
  weekOne: [0,6,12,18,24],
  weekTwo: [1,7,13,19,25],
  weekThree: [2,8,14,20,26],
  weekFour: [3,9,15,21,27],
  weekFive: [4,10,16,22,28],
  weekSix: [5,11,17,23,29]
};
let weekTotalAmount = [];

const month = document.getElementById("header");
const weeks = document.getElementById("weeks");
const expensePanel = document.getElementById("expensesPanel");
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
  const cells = (currentMonthWeekCount + 1) * 6;
  console.log(cells);

  weeks.style.gridTemplateColumns = `repeat(${currentMonthWeekCount + 1}, 1fr)`;
  weeks.style.gridTemplateRows = `repeat(${currentMonthWeekCount + 1}, 1fr)`;
  weeksInfo.style.gridTemplateColumns = `repeat(${
    currentMonthWeekCount + 1
  }, 1fr)`;
  for(let j = 0; j < currentMonthWeekCount; j++) {
    weekTotalAmount[j] = 0;
  }
  
  for (let i = 1; i <= (currentMonthWeekCount + 1) * 6; i++) {
    
    const newWeek = document.createElement("div");
    const addNewItem = document.createElement("button");
    const zoomDetails = document.createElement("div");

    const findIndex = events.filter((e) => Number(e.index) === i - 1);
    findIndex.forEach((item) => {
      const findDate = item.date.split(".");
      if (
        Number(findDate[1]) - 1 === currentMonth &&
        Number(findDate[2]) === currentYear
      ) {
        if(columnIndices.weekOne.includes(Number(item.index))) {
          weekTotalAmount[0] += Number(item.amount)
        } else if(columnIndices.weekTwo.includes(Number(item.index))) {
          weekTotalAmount[1] += Number(item.amount)
        } else if(columnIndices.weekThree.includes(Number(item.index))) {
          weekTotalAmount[2] += Number(item.amount)
        } else if(columnIndices.weekFour.includes(Number(item.index))) {
          weekTotalAmount[3] += Number(item.amount)
        } else if(columnIndices.weekFive.includes(Number(item.index))){
          weekTotalAmount[4] += Number(item.amount)
        } else {
          weekTotalAmount[5] += Number(item.amount)
        }

        const newAmount = document.createElement("div");
        newAmount.classList.add("amount");
        newAmount.textContent = item.amount;
        newWeek.appendChild(newAmount);
        totalExpenseItem += Number(item.amount);
        grandTotal += Number(item.amount);
        }
      });
    
    if (
      (i !== 0 && i % (currentMonthWeekCount + 1) === 0) ||
      i > (currentMonthWeekCount + 1) * 6 - (currentMonthWeekCount + 1)
    ) {
      console.log(weekTotalAmount)
      newWeek.classList.add("newWeek");
      newWeek.classList.add("total");
      
      newWeek.textContent = totalExpenseItem;

      
      if(i === (currentMonthWeekCount + 1) * 6 - 5) {
        newWeek.textContent = weekTotalAmount[0];
      }
      if(i === (currentMonthWeekCount + 1) * 6 - 4) {
        newWeek.textContent = weekTotalAmount[1];
      }
      if(i === (currentMonthWeekCount + 1) * 6 - 3) {
        newWeek.textContent = weekTotalAmount[2];
      }
      if(i === (currentMonthWeekCount + 1) * 6 - 2) {
        newWeek.textContent = weekTotalAmount[3];
      }
      if(i === (currentMonthWeekCount + 1) * 6 - 1) {
        newWeek.textContent = weekTotalAmount[4];
      }
      if(i === (currentMonthWeekCount + 1) * 6 ) {
        newWeek.textContent = grandTotal;
      }
      
      totalExpenseItem = 0;
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
      expensePanel.style.gridTemplateRows = `repeat(6, ${
        newWeek.getBoundingClientRect().height
      }px)`;
    }

    if (i % currentMonthWeekCount === 0 && i !== 0) {
    }

    newWeek.addEventListener("mouseover", () => {
      newWeek.classList.add("active");
    });
    newWeek.addEventListener("mouseout", () => {
      newWeek.classList.remove("active");
    });
  }

  const addIndex = document.querySelectorAll(".add");

  for (let j = 0; j < addIndex.length; j++) {
    addIndex[j].addEventListener("click", function () {
      openModal();
      if (currentMonthWeekCount < 6) {
        if (j < 5) {
          newIndex.value = j;
        } else if (j >= 5 && j < 10) {
          newIndex.value = j + 1;
        } else if (j >= 10 && j < 15) {
          newIndex.value = j + 2;
        } else if (j >= 15 && j < 20) {
          newIndex.value = j + 3;
        } else {
          newIndex.value = j + 4;
        }
      } else if (currentMonthWeekCount >= 6) {
        if (j < 6) {
          newIndex.value = j;
        } else if (j >= 6 && j < 12) {
          newIndex.value = j + 1;
        } else if (j >= 12 && j < 18) {
          newIndex.value = j + 2;
        } else if (j >= 18 && j < 24) {
          newIndex.value = j + 3;
        } else if (j >= 24 && j < 30) {
          newIndex.value = j + 4;
        } else {
          newIndex.value = j + 5;
        }
      }
    });
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
    grandTotal = 0;
    load();
  });
  document.getElementById("nextButton").addEventListener("click", () => {
    navigate++;
    grandTotal = 0;
    load();
  });

  document.getElementById("saveButton").addEventListener("click", saveEvent);
  document.getElementById("cancelButton").addEventListener("click", closeEvent);
}

buttons();
load();
