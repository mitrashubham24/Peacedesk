// =============== CLOCK =================
function updateClock() {
  const now = new Date();
  const timeString = now.toLocaleTimeString();
  document.getElementById("clock").textContent = timeString;
}
setInterval(updateClock, 1000);
updateClock();


// =============== TIMER =================
let time = 1500; // 25 minutes
let timerInterval;

function startTimer() {
  if (timerInterval) return;
  timerInterval = setInterval(() => {
    time--;
    renderTimer();
    if (time <= 0) {
      clearInterval(timerInterval);
      time = 1500;
      alert("Session complete!");
      renderTimer();
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  time = 1500;
  renderTimer();
}

function renderTimer() {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  document.getElementById("timer").textContent =
    `${minutes}:${seconds.toString().padStart(2, '0')}`;
}


// =============== ROUTINE LIST =================
function addRoutine() {
  const input = document.getElementById("routineInput");
  const task = input.value.trim();
  if (!task) return;

  const list = document.getElementById("routineList");

  const li = document.createElement("li");
  li.innerHTML = `${task} <span onclick="this.parentElement.remove(); saveRoutine()">✖</span>`;
  list.appendChild(li);

  saveRoutine();
  input.value = "";
}

function saveRoutine() {
  const items = [...document.getElementById("routineList").children].map(li =>
    li.textContent.replace("✖", "").trim()
  );
  localStorage.setItem("routine", JSON.stringify(items));
}

function loadRoutine() {
  const items = JSON.parse(localStorage.getItem("routine")) || [];
  const list = document.getElementById("routineList");
  items.forEach(task => {
    const li = document.createElement("li");
    li.innerHTML = `${task} <span onclick="this.parentElement.remove(); saveRoutine()">✖</span>`;
    list.appendChild(li);
  });
}
loadRoutine();


// =============== AMBIENT SOUND =================
function playAmbient() {
  const audio = document.getElementById("ambientAudio");
  const sound = document.getElementById("soundSelect").value;

  if (!sound) {
    alert("Please select a sound.");
    return;
  }

  audio.src = sound;
  audio.play();
}

function stopAmbient() {
  const audio = document.getElementById("ambientAudio");
  audio.pause();
}


// =============== DARK MODE =================
function toggleMode() {
  document.body.classList.toggle("dark");

  const mode = document.body.classList.contains("dark") ? "dark" : "light";
  localStorage.setItem("mode", mode);
}

window.onload = () => {
  const saved = localStorage.getItem("mode");
  if (saved === "dark") document.body.classList.add("dark");
};


// =============== QUOTE API =================
async function getQuote() {
  const res = await fetch("https://api.quotable.io/random");
  const data = await res.json();
  document.getElementById("quote").textContent = data.content;
}

getQuote();
