// js/main.js

// Ждем полной загрузки DOM перед выполнением скриптов (это тоже хорошая практика)
document.addEventListener('DOMContentLoaded', () => {
    
    /* =========================================
       Интерактив 1: Dark Mode Toggle
       Требования: DOM Manipulation, Event Listener, localStorage
       ========================================= */
       
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // 1. Проверяем, есть ли сохраненная тема в localStorage
    const savedTheme = localStorage.getItem('theme');

    // Если тема была сохранена ранее, применяем ее
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
    }

    // 2. Вешаем слушатель событий на кнопку (Event Listener #1)
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            // Получаем текущую тему
            const currentTheme = htmlElement.getAttribute('data-theme');
            
            // Определяем новую тему
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            // Манипуляция DOM: меняем атрибут у тега <html>
            htmlElement.setAttribute('data-theme', newTheme);
            
            // Сохраняем выбор пользователя в localStorage
            localStorage.setItem('theme', newTheme);
        });
    }
});

/* =========================================
       Интерактив 2: Фильтрация услуг (setTimeout / API Mock)
       Требования: setTimeout, Event Listeners, DOM Manipulation
       ========================================= */
       
    const filterBtns = document.querySelectorAll('.filter-btn');
    const servicesGrid = document.getElementById('services-grid');
    const cards = document.querySelectorAll('.service-card');
    const loader = document.getElementById('loader');

    if (filterBtns.length > 0 && servicesGrid) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // 1. Убираем класс active у всех кнопок и вешаем на нажатую
                filterBtns.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');

                const filterValue = e.target.getAttribute('data-filter');

                // 2. Имитация обращения к базе данных (setTimeout)
                // Сначала делаем сетку полупрозрачной и показываем лоадер
                servicesGrid.classList.add('opacity-0');
                loader.classList.remove('hidden');

                // Задержка 600мс для эффекта "работы сервера"
                setTimeout(() => {
                    // 3. Логика фильтрации (манипуляция DOM)
                    cards.forEach(card => {
                        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    });

                    // 4. Возвращаем прозрачность и прячем лоадер
                    servicesGrid.classList.remove('opacity-0');
                    loader.classList.add('hidden');
                }, 600);
            });
        });
    }