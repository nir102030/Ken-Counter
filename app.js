// ########################### Global Variables #############################

let startTime;
let endTime;
let scoreBoard = window.localStorage.getItem("score-board")
  ? JSON.parse(window.localStorage.getItem("score-board"))
  : [];

// ########################### Event Listeners #############################

// count click
document
  .getElementById("count-button")
  .addEventListener("click", increaseCount);

// submit click
document.getElementById("submit").addEventListener("click", submitCount);

// on page load
window.addEventListener("load", initiateScoreBoard);

// ########################### Functions #############################

function increaseCount() {
  const $countEl = document.getElementById("count");
  let currentCount = parseInt($countEl.innerHTML);

  if (currentCount == 0) startTime = new Date();
  currentCount++;
  $countEl.innerHTML = currentCount;
}

function submitCount() {
  const $countEl = document.getElementById("count");
  let currentCount = parseInt($countEl.innerHTML);
  endTime = new Date();

  const timeslot = getTimeSlot(startTime, endTime);
  const date = startTime.toISOString().substring(0, 10);
  $countEl.innerHTML = 0;

  createTableRow(date, timeslot, currentCount);
  addToLocalStorage(date, timeslot, currentCount);
}

function initiateScoreBoard() {
  scoreBoard.forEach((row) => {
    createTableRow(row.date, row.timeslot, row.score);
  });
}

// ########################### Helper Functions #############################

function createTableRow(date, timeslot, score) {
  const $tableEl = document.getElementById("score-table");
  const $tableBodyEl = document.getElementById("score-board-body");
  if (!$tableBodyEl.innerHTML) $tableEl.style.display = "block";
  $tableBodyEl.innerHTML += `<tr>
  <td>${date}</td>
  <td>${timeslot}</td>
  <td>${score}</td>
</tr>`;
}

function getTimeSlot(start, end) {
  let timeslot = end - start;
  const MILLISECONDS_IN_SECOND = 1000;
  const MILLISECONDS_IN_MINUTE = 60000;
  const MILLISECONDS_IN_HOUR = MILLISECONDS_IN_MINUTE * 60;

  if (timeslot > MILLISECONDS_IN_HOUR) {
    return `${(timeslot / MILLISECONDS_IN_HOUR).toFixed(2)} hours`;
  }
  if (timeslot > MILLISECONDS_IN_MINUTE) {
    return `${(timeslot / MILLISECONDS_IN_MINUTE).toFixed(2)} minutes`;
  } else return `${(timeslot / MILLISECONDS_IN_SECOND).toFixed(2)} seconds`;
}

function addToLocalStorage(date, timeslot, score) {
  scoreBoard.push({ date: date, timeslot: timeslot, score: score });
  window.localStorage.setItem("score-board", JSON.stringify(scoreBoard));
}
