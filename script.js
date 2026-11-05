// --- ТАЙМЕР ---
const countDownDate = new Date("June 13, 2027 12:00:00").getTime();

const timer = setInterval(() => {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    // Если время вышло — останавливаем таймер и показываем сообщение
    if (distance < 0) {
        clearInterval(timer);
        document.querySelector('.hero-timer').innerHTML = "<h3>Свадьба состоялась!</h3>";
        return;
    }

    document.getElementById("days").innerText = Math.floor(distance / (1000 * 60 * 60 * 24));
    document.getElementById("hours").innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    document.getElementById("minutes").innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    document.getElementById("seconds").innerText = Math.floor((distance % (1000 * 60)) / 1000);
}, 1000);

// --- МУЗЫКА ---
const audio = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-btn');

function toggleMusic() {
    if (audio.paused) {
        audio.play();
        musicBtn.classList.add('playing');
    } else {
        audio.pause();
        musicBtn.classList.remove('playing');
    }
}

// --- ОТКРЫТИЕ ПРИГЛАШЕНИЯ ---
const btnOpen = document.getElementById('btn-open');
btnOpen.addEventListener('click', () => {
    document.body.classList.remove('locked');

    // Запуск музыки
    if (audio.paused) {
        audio.play()
            .then(() => musicBtn.classList.add('playing'))
            .catch(e => console.log('Музыка заблокирована браузером'));
    }

    // Плавный скролл к контенту
    const content = document.getElementById('main-content');
    if (content) {
        setTimeout(() => content.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
    }
});

// --- ОТПРАВКА ФОРМЫ ---
let submitted = false;
window.addEventListener("load", () => {
    const form = document.getElementById('my-form');
    if (form) {
        form.addEventListener("submit", () => { submitted = true; });
    }
});

// --- ИМЯ ГОСТЯ ИЗ URL ---
const urlParams = new URLSearchParams(window.location.search);
const nama = urlParams.get('n') || '';
if (nama) {
    const input = document.getElementById('nama');
    if (input) input.value = nama;
}

// --- АНИМАЦИЯ ПОЯВЛЕНИЯ ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// --- ОБРАБОТЧИК iframe ---
document.getElementById('hidden_iframe').addEventListener('load', () => {
    if (submitted) {
        alert('Спасибо! Ваш ответ отправлен.');
        submitted = false;
    }
});