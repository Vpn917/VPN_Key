let score = 0;
let tapPower = 1;
let upgradeCost = 20;

const scoreEl = document.getElementById('score');
const tapPowerEl = document.getElementById('tapPower');
const upgradeCostEl = document.getElementById('upgradeCost');
const popup = document.getElementById('popup');

// Загружаем сохранённые данные
if (localStorage.getItem('score')) score = parseInt(localStorage.getItem('score'));
if (localStorage.getItem('tapPower')) tapPower = parseInt(localStorage.getItem('tapPower'));
if (localStorage.getItem('upgradeCost')) upgradeCost = parseInt(localStorage.getItem('upgradeCost'));

updateUI();

document.getElementById('tapBtn').addEventListener('click', () => {
  score += tapPower;
  updateUI();
  saveProgress();
});

function buyItem(cost) {
  if (score >= cost) {
    score -= cost;
    updateUI();
    saveProgress();
    showPopup();
  } else {
    alert("Недостаточно очков для покупки VPN-ключа!");
  }
}

function upgradeTap() {
  if (score >= upgradeCost) {
    score -= upgradeCost;
    tapPower++;
    upgradeCost = Math.floor(upgradeCost * 1.9);
    updateUI();
    saveProgress();
  } else {
    alert("Недостаточно очков для улучшения!");
  }
}

function updateUI() {
  scoreEl.textContent = score;
  tapPowerEl.textContent = tapPower;
  upgradeCostEl.textContent = upgradeCost;
}

function saveProgress() {
  localStorage.setItem('score', score);
  localStorage.setItem('tapPower', tapPower);
  localStorage.setItem('upgradeCost', upgradeCost);
}

function resetGame() {
  if (confirm("Точно сбросить прогресс?")) {
    score = 0;
    tapPower = 1;
    upgradeCost = 20;
    saveProgress();
    updateUI();
  }
}

function showPopup() {
  popup.classList.remove('hidden');
  setTimeout(() => {
    popup.classList.add('hidden');
  }, 5000);
}