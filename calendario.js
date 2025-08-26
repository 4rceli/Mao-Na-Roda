const monthYear = document.getElementById("month-year");
const calendarGrid = document.getElementById("calendar-grid");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const eventModal = document.getElementById("event-modal");
const eventText = document.getElementById("event-text");
const saveEventBtn = document.getElementById("save-event");
const closeModalBtn = document.getElementById("close-modal");
const eventList = document.getElementById("event-list");

let currentDate = new Date();
let events = {};

function renderCalendar() {
  calendarGrid.querySelectorAll(".day").forEach(e => e.remove());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  monthYear.textContent = currentDate.toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric"
  });

  for (let i = 0; i < firstDay; i++) {
    const emptyCell = document.createElement("div");
    calendarGrid.appendChild(emptyCell);
  }

  for (let day = 1; day <= lastDate; day++) {
    const dayElement = document.createElement("div");
    dayElement.textContent = day;
    dayElement.classList.add("day");

    const today = new Date();
    if (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {
      dayElement.classList.add("today");
    }

    if (events[`${year}-${month}-${day}`]) {
      dayElement.classList.add("has-event");
    }

    dayElement.addEventListener("click", () => openModal(year, month, day));
    calendarGrid.appendChild(dayElement);
  }
}

function openModal(year, month, day) {
  eventModal.style.display = "flex";
  saveEventBtn.onclick = () => {
    const text = eventText.value.trim();
    if (text) {
      if (!events[`${year}-${month}-${day}`]) {
        events[`${year}-${month}-${day}`] = [];
      }
      events[`${year}-${month}-${day}`].push(text);
    }
    eventText.value = "";
    eventModal.style.display = "none";
    renderCalendar();
    showEvents(year, month, day);
  };
}

function showEvents(year, month, day) {
  const list = events[`${year}-${month}-${day}`] || [];
  eventList.innerHTML = list.length
    ? list.map(e => `<p>${e}</p>`).join("")
    : "<p>Nenhum evento</p>";
}

closeModalBtn.addEventListener("click", () => {
  eventModal.style.display = "none";
});

prevBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});

nextBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});

renderCalendar();
