import { MinecraftUI, themeManager } from '/packages/core/dist/index.esm.js';

// Инициализация MinecraftUI
const ui = new MinecraftUI({
    theme: 'default',
    pixelated: true,
    animations: true
});

// Анимации при наведении
ui.add('mouse:enter', '@all-cards', (data) => {
    data.element?.style.setProperty('transform', 'translateY(-2px)');
    data.element?.style.setProperty('transition', 'transform 0.2s ease');
});

ui.add('mouse:leave', '@all-cards', (data) => {
    data.element?.style.setProperty('transform', 'translateY(0)');
});

// Базовая поддержка геймпада
ui.add('gamepad:connected', '@world', (data) => {
    console.log('Gamepad connected', data);
});

ui.add('gamepad:disconnected', '@world', (data) => {
    console.log('Gamepad disconnected', data);
});

// Смена тем
document.querySelectorAll('.theme-preview').forEach(preview => {
    preview.addEventListener('click', () => {
        const theme = preview.getAttribute('data-theme');
        themeManager.applyTheme(theme);
        showToast(`🎨 Тема изменена: ${theme}`, 'success');
    });
});

// Управление вкладками
document.querySelectorAll('.mc-tab-button').forEach(button => {
    button.addEventListener('click', () => {
        const tabId = button.getAttribute('data-tab');

        // Убираем активный класс у всех кнопок
        document.querySelectorAll('.mc-tab-button').forEach(btn => {
            btn.classList.remove('active');
        });

        // Убираем активный класс у всех вкладок
        document.querySelectorAll('.mc-tab-pane').forEach(pane => {
            pane.classList.remove('active');
        });

        // Добавляем активный класс текущей кнопке и вкладке
        button.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    });
});

// Модальное окно
document.getElementById('open-modal').addEventListener('click', () => {
    document.getElementById('demo-modal').classList.add('mc-modal-open');
});

document.getElementById('close-modal').addEventListener('click', () => {
    document.getElementById('demo-modal').classList.remove('mc-modal-open');
});

document.querySelector('.mc-modal-close').addEventListener('click', () => {
    document.getElementById('demo-modal').classList.remove('mc-modal-open');
});

// Закрытие модального окна по клику вне его
document.getElementById('demo-modal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('demo-modal')) {
        document.getElementById('demo-modal').classList.remove('mc-modal-open');
    }
});

// Функция показа уведомлений
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `custom-toast mc-text-${type}`;
    toast.textContent = message;

    const container = document.getElementById('toast-container');
    container.appendChild(toast);

    // Анимация появления
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(0)';
    }, 10);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

document.getElementById('fill-btn').addEventListener('click', () => {
    const items = ['⚔️', '🛡️', '🏹', '🍖', '🍞', '💎', '⭐'];
    const inventory = document.getElementById('inventory');

    // Clear existing
    inventory.innerHTML = '';

    // Create 36 slots (4 rows of 9)
    for (let i = 0; i < 36; i++) {
        const slot = document.createElement('div');
        slot.style.cssText = `
            width: 40px;
            height: 40px; 
            display: flex;
            align-items: center;
            border: 1px solid #666; 
            justify-content: center;
            background: rgba(0,0,0,0.1);
            cursor: pointer; font-size: 18px;
        `;

        // Random item or empty
        if (Math.random() > 0.4) {
            slot.textContent = items[Math.floor(Math.random() * items.length)];
            slot.style.background = 'rgba(255, 255, 255, 0.1)';
        }

        // Add click event
        slot.addEventListener('click', () => {
            if (slot.textContent) {
                slot.textContent = '';
                slot.style.background = 'rgba(0,0,0,0.1)';
            } else {
                slot.textContent = items[Math.floor(Math.random() * items.length)];
                slot.style.background = 'rgba(255,255,255,0.1)';
            }
        });

        inventory.appendChild(slot);
    }
});

document.getElementById('clear-btn').addEventListener('click', () =>
    document.getElementById('inventory').innerHTML = '');

// Уведомления
document.getElementById('open-toast').addEventListener('click', () => {
    const messages = [
        '🔔 Добро пожаловать в MinecraftUI!',
        '🎮 Отличный интерфейс для игры!',
        '💎 Алмазный уровень качества!',
        '⚡ Быстро и удобно!',
        '🎨 Красиво и стильно!'
    ];
    const randomMessage = messages[
        Math.floor(Math.random() * messages.length)];
    showToast(randomMessage, 'success');
});

// Демонстрация анимаций - подсветка случайных элементов
setInterval(() => {
    const elements = document.querySelectorAll('.demo-highlight');
    elements.forEach(el => el.classList.remove('demo-highlight'));

    const interactiveElements = document.querySelectorAll('.mc-btn, .mc-card, .mc-slot, .mc-input, .mc-select');
    if (interactiveElements.length > 0) {
        const randomElement = interactiveElements[
            Math.floor(Math.random() * interactiveElements.length)
            ];

        if (randomElement) {
            randomElement.classList.add('demo-highlight');
        }
    }
}, 3000);

// Обработка форм
document.querySelectorAll('.mc-input, .mc-textarea, .mc-select').forEach(input => {
    input.addEventListener('focus', () => {
        input.classList.add('mc-animate-pulse');
    });

    input.addEventListener('blur', () => {
        input.classList.remove('mc-animate-pulse');
    });
});

// Интерактивные слоты инвентаря
document.querySelectorAll('.mc-slot').forEach(slot => {
    slot.addEventListener('click', () => {
        slot.classList.toggle('selected');
    });
});

// Инициализация демо
console.log('🎮 MinecraftUI Demo загружена!');
console.log('Доступные функции:', {
    MinecraftUI: ui,
    themeManager,
    currentTheme: themeManager.getCurrentTheme()
});

// Показать стартовое уведомление
setTimeout(() => {
    showToast('🚀 MinecraftUI Demo загружена! Нажмите на элементы для взаимодействия.', 'info');
}, 1000);