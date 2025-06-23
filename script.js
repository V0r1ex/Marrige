// Музыкальная кнопка
const musicBtn = document.getElementById('musicBtn');
const weddingMusic = document.getElementById('weddingMusic');
let isPlaying = false;

musicBtn.addEventListener('click', () => {
    if (isPlaying) {
        weddingMusic.pause();
        musicBtn.innerHTML = '<i class="fas fa-music"></i>';
    } else {
        weddingMusic.play();
        musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
    isPlaying = !isPlaying;
});

// Генерация календаря
function generateCalendar() {
    const calendarGrid = document.querySelector('.calendar-grid');
    const daysInMonth = 31; // В августе 31 день
    const firstDay = 5; // 1 августа 2025 - пятница (0 - воскресенье, 1 - понедельник, ... 5 - пятница)
    
    // Создаем строку с днями недели
    const weekdaysRow = document.createElement('div');
    weekdaysRow.classList.add('weekdays-row');
    
    const weekdays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    weekdays.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.classList.add('weekday');
        dayElement.textContent = day;
        weekdaysRow.appendChild(dayElement);
    });
    const calendarHeader = document.querySelector('.calendar-header')
    calendarHeader.parentNode.insertBefore(weekdaysRow, calendarHeader.nextSibling);
    
    // Пустые ячейки для дней перед 1 августа
    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.classList.add('calendar-day', 'empty-day');
        calendarGrid.appendChild(emptyDay);
    }
    
    // Заполняем дни месяца
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('calendar-day');
        dayElement.textContent = day;
        
        if (day === 25) {
            dayElement.classList.add('special-day');
        }
        
        calendarGrid.appendChild(dayElement);
    }
}

// Слайдер
let currentSlide = 0;
const slider = document.getElementById('slider');
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
let timerSlider = setInterval(() => {
    goToSlide(currentSlide + 1);
}, 5000);

function goToSlide(slideIndex) {
    if (slideIndex < 0) {
        currentSlide = totalSlides - 1;
    } else if (slideIndex >= totalSlides) {
        currentSlide = 0;
    } else {
        currentSlide = slideIndex;
    }
    
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
}

document.getElementById('prevBtn').addEventListener('click', () => {
    clearInterval(timerSlider)
    goToSlide(currentSlide - 1);
    timerSlider = setInterval(() => {
        goToSlide(currentSlide - 1);
    }, 5000);
});

document.getElementById('nextBtn').addEventListener('click', () => {
    clearInterval(timerSlider)
    goToSlide(currentSlide + 1);
    timerSlider = setInterval(() => {
        goToSlide(currentSlide + 1);
    }, 5000);
});

// Таймер обратного отсчета
function updateCountdown() {
    const weddingDate = new Date('2025-08-25T00:00:00');
    const now = new Date();
    const diff = weddingDate - now;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
}

// Анимации при скролле
function checkScroll() {
    const fadeElements = document.querySelectorAll('.fade-in');
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('active');
        }
    });
    
    timelineItems.forEach((item, index) => {
        const itemTop = item.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (itemTop < windowHeight - 100) {
            setTimeout(() => {
                item.classList.add('active');
            }, index * 200);
        }
    });
}

// Инициализация
window.addEventListener('DOMContentLoaded', () => {
    generateCalendar();
    updateCountdown();
    setInterval(updateCountdown, 1000);
    checkScroll();
});

window.addEventListener('scroll', checkScroll);