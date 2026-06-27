// 1.5 ФУНКЦІЯ ПЕРЕВІРКИ ЧАСУ (ТАЙМЗОНА БАРСЕЛОНИ)
function updateClinicStatus() {
    const statusElement = document.getElementById('clinic-status');
    const desktopSos = document.getElementById('desktop-sos-text');
    const mobileSos = document.getElementById('mobile-sos-text');
    
    // Отримуємо поточну активну мову
    const currentLang = localStorage.getItem('selectedLanguage') || 'es';

    // Отримуємо точний час в Іспанії (Мадрид/Барселона)
    const spainTimeStr = new Date().toLocaleString("en-US", { timeZone: "Europe/Madrid" });
    const spainDate = new Date(spainTimeStr);

    const day = spainDate.getDay(); // 0 = Неділя, 1 = Пн, ..., 5 = Пт, 6 = Сб
    const hours = spainDate.getHours();
    const minutes = spainDate.getMinutes();
    const currentTimeInMinutes = hours * 60 + minutes;

    let isOpen = false;

    // Графік: Пн - Чт (1, 2, 3, 4) -> 09:00-14:00 та 15:00-18:30
    if (day >= 1 && day <= 4) {
        if ((currentTimeInMinutes >= 9 * 60 && currentTimeInMinutes < 14 * 60) ||
            (currentTimeInMinutes >= 15 * 60 && currentTimeInMinutes < 18 * 60 + 30)) {
            isOpen = true;
        }
    }
    // Графік: Пт (5) -> 09:00-14:00 та 15:00-17:00
    else if (day === 5) {
        if ((currentTimeInMinutes >= 9 * 60 && currentTimeInMinutes < 14 * 60) ||
            (currentTimeInMinutes >= 15 * 60 && currentTimeInMinutes < 17 * 60)) {
            isOpen = true;
        }
    }

    // Беремо відповідний текст зі словника перекладів
    const langTrans = translations[currentLang] || translations['es'];

    // --- ОНОВЛЕННЯ ІНФОРМАЦІЙНОГО БЛОКУ (БЕЙДЖА) ---
    if (statusElement) {
        if (isOpen) {
            statusElement.textContent = langTrans.card_status; 
            statusElement.className = "px-3 py-1 rounded-full bg-green-500/15 text-green-600 text-sm font-medium";
        } else {
            statusElement.textContent = langTrans.status_closed; 
            statusElement.className = "px-3 py-1 rounded-full bg-red-500/15 text-red-600 text-sm font-medium";
        }
    }

    // --- ОНОВЛЕННЯ SOS-КНОПОК В ХЕДЕРІ ---
    const sosText = isOpen ? langTrans.sos_open : langTrans.sos_closed;
    if (desktopSos) desktopSos.textContent = sosText;
    if (mobileSos) mobileSos.textContent = sosText;
}

// 2. ФУНКЦІЯ ПЕРЕМИКАННЯ МОВИ
function changeLanguage(lang) {
    localStorage.setItem('selectedLanguage', lang);
    
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    const select = document.getElementById('lang-select');
    if(select) select.value = lang;

    document.querySelectorAll('.mobile-lang-btn').forEach(btn => {
        btn.classList.remove('text-cyan-400', 'font-bold');
        btn.classList.add('text-cyan-50/90');
    });
    const activeMobBtn = document.getElementById(`mob-lang-${lang}`);
    if(activeMobBtn) {
        activeMobBtn.classList.remove('text-cyan-50/90');
        activeMobBtn.classList.add('text-cyan-400', 'font-bold');
    }

    // Викликаємо оновлення динамічних статусів після зміни мови
    updateClinicStatus();
}

document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('selectedLanguage') || 'es';
    changeLanguage(savedLang);

    document.getElementById('lang-select').addEventListener('change', (e) => {
        changeLanguage(e.target.value);
    });

    // 3. МОБІЛЬНЕ МЕНЮ
    const menuButton = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    menuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    // 4. СИНХРОНІЗАЦІЯ КРАПОК СЛАЙДЕРА
    const slider = document.getElementById('hero-slider');
    const dots = document.querySelectorAll('.slider-dot');

    slider.addEventListener('scroll', () => {
        const index = Math.round(slider.scrollLeft / slider.offsetWidth);
        dots.forEach((dot, i) => {
            if(i === index) {
                dot.classList.remove('bg-white/40', 'w-2');
                dot.classList.add('bg-cyan-400', 'w-4'); 
            } else {
                dot.classList.remove('bg-cyan-400', 'w-4');
                dot.classList.add('bg-white/40', 'w-2');
            }
        });
    });

    // 5. КЕРУВАННЯ СТРІЛКАМИ КЛАВІАТУРИ (← / →)
    document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        const index = Math.round(slider.scrollLeft / slider.offsetWidth);
        
        if (e.key === 'ArrowRight') {
            if (index < dots.length - 1) scrollToSlide(index + 1);
        } else if (e.key === 'ArrowLeft') {
            if (index > 0) scrollToSlide(index - 1);
        }
    });
});

function scrollToSlide(index) {
    const slider = document.getElementById('hero-slider');
    slider.scrollLeft = index * slider.offsetWidth;
}


// переклад placeholder у формі бронювання (запису) на різні мови
document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {

const key = element.getAttribute('data-i18n-placeholder');

if(translations[lang][key]){
element.placeholder = translations[lang][key];
}

});