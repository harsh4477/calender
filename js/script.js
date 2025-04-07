// const currentDateTitle = document.querySelector(".current-date"),
//   daysTag = document.querySelector(".days"),
//   prevNextIcons = document.querySelectorAll(".icons span");

// let date = new Date(),
//   currentYear = date.getFullYear(),
//   currentMonth = date.getMonth();

// const months = [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December",
// ];

// const renderCalendar = () => {
//   let firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
//   let lastDateOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
//   let lastDayOfMonth = new Date(
//     currentYear,
//     currentMonth,
//     lastDateOfMonth
//   ).getDay();
//   let lastDateOfLastMonth = new Date(currentYear, currentMonth, 0).getDate();
//   let liDayTag = "";

//   for (let i = firstDayOfMonth; i > 0; i--) {
//     liDayTag += `<li class="inactive">${lastDateOfLastMonth - i + 1}</li>`;
//   }

//   for (let i = 1; i <= lastDateOfMonth; i++) {
//     let isToday =
//       i === date.getDate() &&
//       currentMonth === new Date().getMonth() &&
//       currentYear === new Date().getFullYear()
//         ? 'class="active"'
//         : "";
//     liDayTag += `<li ${isToday}>${i}</li>`;
//   }

//   for (let i = lastDayOfMonth; i < 6; i++) {
//     liDayTag += `<li class="inactive">${i - lastDayOfMonth + 1}</li>`;
//   }

//   currentDateTitle.innerText = `${months[currentMonth]} ${currentYear}`;
//   daysTag.innerHTML = liDayTag;
// };

// renderCalendar();

const monthSelect = document.getElementById("month-select");
const yearSelect = document.getElementById("year-select");
const daysTag = document.querySelector(".days");
const prevNextIcons = document.querySelectorAll(".icons span");

let date = new Date(),
  currentYear = date.getFullYear(),
  currentMonth = date.getMonth();

const months = [
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

for (let i = 0; i < months.length; i++) {
  let option = document.createElement("div");
  option.classList += " calendar-select-list";
  option.id = `option-${i}`;
  option.value = i;
  option.addEventListener("click", function () {
    toggleDropdownMonth(i, months[i]); // Pass index and month name if needed
  });
  option.textContent = months[i];
  monthSelect.appendChild(option);
}

for (let i = currentYear - 50; i <= currentYear + 50; i++) {
  let option = document.createElement("div");
  option.classList += " calendar-select-list";
  option.value = i;
  if (currentMonth === i) {
    option.classList += " active";
  }
  option.textContent = i;
  option.addEventListener("click", function () {
    toggleDropdownYear(i); // Pass index and month name if needed
  });
  yearSelect.appendChild(option);
}

monthSelect.value = currentMonth;
yearSelect.value = currentYear;

const toggleDropdownMonth = (index, month) => {
  const div = document.getElementById("month-select");
  const year_div = document.getElementById("year-select");
  year_div.classList.remove("show-dropdown");
  if (month) {
    // const dropdown = document.getElementById("selected-month");
    // dropdown.innerText = month;
    currentMonth = index;
    console.log("month", index);
    const div_option = document.getElementById(`option-${index}`);
    console.log("div_option", div_option);
    div_option.classList += " active";
    renderCalendar();
  }
  div.classList.toggle("show-dropdown");
};

const toggleDropdownYear = (year) => {
  const div = document.getElementById("year-select");
  const month_div = document.getElementById("month-select");
  month_div.classList.remove("show-dropdown");
  if (year) {
    // const dropdown = document.getElementById("selected-year");
    // dropdown.innerText = year;
    currentYear = year;
    renderCalendar();
  }
  div.classList.toggle("show-dropdown");
};
const renderCalendar = () => {
  let firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  let lastDateOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  let lastDayOfMonth = new Date(
    currentYear,
    currentMonth,
    lastDateOfMonth
  ).getDay();
  const dropdown_month = document.getElementById("selected-month");
  dropdown_month.innerText = months[currentMonth];
  const dropdown_year = document.getElementById("selected-year");
  dropdown_year.innerText = currentYear;
  let lastDateOfLastMonth = new Date(currentYear, currentMonth, 0).getDate();
  let liDayTag = "";

  for (let i = firstDayOfMonth; i > 0; i--) {
    liDayTag += `<li class="inactive">${lastDateOfLastMonth - i + 1}</li>`;
  }

  for (let i = 1; i <= lastDateOfMonth; i++) {
    let isToday =
      i === date.getDate() &&
      currentMonth === new Date().getMonth() &&
      currentYear === new Date().getFullYear()
        ? 'class="active"'
        : "";
    liDayTag += `<li ${isToday}>${i}</li>`;
  }

  for (let i = lastDayOfMonth; i < 6; i++) {
    liDayTag += `<li class="inactive">${i - lastDayOfMonth + 1}</li>`;
  }

  daysTag.innerHTML = liDayTag;
};

renderCalendar(currentMonth, currentYear);

monthSelect.addEventListener("change", (e) => {
  currentMonth = parseInt(e.target.value);
  renderCalendar();
});

yearSelect.addEventListener("change", (e) => {
  currentYear = parseInt(e.target.value);
  renderCalendar();
});
prevNextIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    currentMonth = icon.id === "prevIcon" ? currentMonth - 1 : currentMonth + 1;

    if (currentMonth < 0 || currentMonth > 11) {
      date = new Date(currentYear, currentMonth);
      currentYear = date.getFullYear();
      currentMonth = date.getMonth();
      return;
    } else {
      date = new Date();
    }

    renderCalendar();
  });
});
