let events = localStorage.getItem("events")
  ? JSON.parse(localStorage.getItem("events"))
  : [];

const container = document.getElementById("container");
const month = document.getElementById("date");
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
  const currentDay = dt.getDate();
  const currentMonth = dt.getMonth();
  const currentYear = dt.getFullYear();

  const currentDate = `${currentDay}.${currentMonth+1}.${currentYear}`;
  
  month.innerText = `${dt.toLocaleDateString("en-us", {
    month: "long",
  })} ${currentYear}`;

  const currentMonthWeekCount = weekCount(currentYear, currentMonth);

  weeks.style.gridTemplateColumns = `repeat(${currentMonthWeekCount + 1}, 1fr)`;
  weeksInfo.style.gridTemplateColumns = `repeat(${
    currentMonthWeekCount + 1
  }, 1fr)`;

  for (let i = 1; i <= (currentMonthWeekCount + 1) * 6; i++) {
    const newWeek = document.createElement("div");
    const addNewItem = document.createElement("button");
    const zoomDetails = document.createElement("div");

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

    for(let i = 0; i < addIndex.length ; i++) {
      addIndex[i].addEventListener('click', function() {
        openModal();
        newIndex.value = i;
      })
    };
    
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
    index: newIndex.value
  });

  localStorage.setItem("events", JSON.stringify(events));

  closeEvent();
}

function closeEvent() {
  backDrop.style.display = "none";
  newEventModal.style.display = "none";
}

function buttons() {
  document.getElementById("saveButton").addEventListener("click", saveEvent);
  document.getElementById("cancelButton").addEventListener("click", closeEvent);
}

buttons();
load();
