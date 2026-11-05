// --- ЗАЩИТА ОТ СКРОЛЛА ВНИЗ ---
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
window.scrollTo(0, 0);

// --- ТАЙМЕР ---
const countDownDate = new Date("June 13, 2027 14:00:00").getTime();
const timer = setInterval(() => {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    if (distance < 0) {
        clearInterval(timer);
        const timerBlock = document.querySelector('.hero-timer');
        if (timerBlock) timerBlock.innerHTML = "<h3>Свадьба состоялась!</h3>";
        return;
    }

    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    if (daysEl) daysEl.innerText = Math.floor(distance / (1000 * 60 * 60 * 24));
    if (hoursEl) hoursEl.innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    if (minutesEl) minutesEl.innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    if (secondsEl) secondsEl.innerText = Math.floor((distance % (1000 * 60)) / 1000);
}, 1000);

// --- МУЗЫКА ---
const audio = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-btn');

if (musicBtn && audio) {
    musicBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            musicBtn.classList.add('playing');
        } else {
            audio.pause();
            musicBtn.classList.remove('playing');
        }
    });
}

// --- ОТКРЫТИЕ ПРИГЛАШЕНИЯ (ИСХОДНАЯ РАБОЧАЯ ЛОГИКА) ---
const btnOpen = document.getElementById('btn-open');
if (btnOpen) {
    btnOpen.addEventListener('click', () => {
        document.body.classList.remove('locked');

        if (audio && audio.paused) {
            audio.play()
                .then(() => musicBtn.classList.add('playing'))
                .catch(e => console.log('Музыка заблокирована'));
        }

        const content = document.getElementById('main-content');
        if (content) {
            setTimeout(() => content.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
        }
    });
}

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
if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
} else {
    document.querySelectorAll('.fade-in').forEach(el => el.classList.add('visible'));
}

// --- ОБРАБОТЧИК iframe ---
const hiddenIframe = document.getElementById('hidden_iframe');
if (hiddenIframe) {
    hiddenIframe.addEventListener('load', () => {
        if (submitted) {
            alert('Спасибо! Ваш ответ отправлен.');
            submitted = false;
        }
    });
}
