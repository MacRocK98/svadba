// --- ЗАЩИТА ОТ СКРОЛЛА ВНИЗ ---
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
window.scrollTo(0, 0);

// --- ТАЙМЕР (синхронизирован с таймингом: 14:00) ---
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

function updateMusicBtn(playing) {
    if (!musicBtn) return;
    musicBtn.classList.toggle('playing', playing);
    musicBtn.setAttribute('aria-pressed', String(playing));
    musicBtn.setAttribute('aria-label', playing ? 'Выключить музыку' : 'Включить музыку');
}

if (musicBtn && audio) {
    audio.volume = 0.3;

    const toggleMusic = () => {
        if (audio.paused) {
            audio.play()
                .then(() => updateMusicBtn(true))
                .catch(() => console.log('Музыка заблокирована'));
        } else {
            audio.pause();
            updateMusicBtn(false);
        }
    };

    musicBtn.addEventListener('click', toggleMusic);
    musicBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleMusic();
        }
    });
}

// --- ОТКРЫТИЕ ПРИГЛАШЕНИЯ ---
const btnOpen = document.getElementById('btn-open');
if (btnOpen) {
    btnOpen.addEventListener('click', () => {
        document.body.classList.remove('locked');

        if (audio && audio.paused) {
            audio.play()
                .then(() => updateMusicBtn(true))
                .catch(() => console.log('Музыка заблокирована'));
        }

        const content = document.getElementById('main-content');
        if (content) {
            setTimeout(() => content.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
        }
    });
}

// --- ИМЯ ГОСТЯ ИЗ URL + ПЕРСОНАЛЬНОЕ ПРИВЕТСТВИЕ ---
const urlParams = new URLSearchParams(window.location.search);
const nama = (urlParams.get('n') || '').trim();
if (nama) {
    const input = document.getElementById('nama');
    if (input) input.value = nama;

    const greeting = document.getElementById('personal-greeting');
    if (greeting) greeting.textContent = `${nama}, мы женимся!`;
}

// --- ОТПРАВКА ФОРМЫ ---
let submitted = false;
const form = document.getElementById('my-form');
const submitBtn = document.getElementById('btn-submit');
const thanksBlock = document.getElementById('rsvp-thanks');
const thanksText = document.getElementById('rsvp-thanks-text');

if (form) {
    form.addEventListener("submit", (e) => {
        // honeypot
        const honey = form.querySelector('input[name="website"]');
        if (honey && honey.value) {
            e.preventDefault();
            return;
        }

        // простая валидация имени
        const nameInput = document.getElementById('nama');
        if (nameInput && !nameInput.value.trim()) {
            e.preventDefault();
            nameInput.classList.add('is-invalid');
            nameInput.focus();
            return;
        }
        if (nameInput) nameInput.classList.remove('is-invalid');

        submitted = true;
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Отправляем…';
        }
    });
}

// --- ОБРАБОТЧИК iframe (успех) ---
const hiddenIframe = document.getElementById('hidden_iframe');
if (hiddenIframe) {
    hiddenIframe.addEventListener('load', () => {
        if (!submitted) return;
        submitted = false;

        if (form) form.hidden = true;
        if (thanksBlock) {
            thanksBlock.hidden = false;
            if (thanksText && nama) {
                thanksText.textContent = `Спасибо, ${nama}! Мы очень рады, что ты будешь с нами.`;
            }
            thanksBlock.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Подтвердить';
        }
    });
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
