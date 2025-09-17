
import { MinecraftUI, minecraftSounds, themeManager } from '../../dist/index.esm.js';

// Инициализация MinecraftUI
const ui = new MinecraftUI({
    theme: 'default',
    sounds: true,
    pixelated: true,
    animations: true
});

// Управление звуками
document.getElementById('play-sound').addEventListener('click', () => {
    if (minecraftSounds.soundsSupported) {
        minecraftSounds.playButtonClick();
    } else {
        showToast('🔇 Звуки не поддерживаются в вашем браузере', 'warning');
    }
});

document.getElementById('play-block').addEventListener('click', () => {
    if (minecraftSounds.soundsSupported) {
        minecraftSounds.playBlockPlace();
    }
});

document.getElementById('play-error').addEventListener('click', () => {
    if (minecraftSounds.soundsSupported) {
        minecraftSounds.playError();
    }
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

        // Проигрываем звук переключения
        if (minecraftSounds.soundsSupported) {
            minecraftSounds.playButtonClick();
        }
    });
});

// Модальное окно
document.getElementById('open-modal').addEventListener('click', () => {
    document.getElementById('demo-modal').classList.add('mc-modal-open');
    if (minecraftSounds.soundsSupported) {
        minecraftSounds.playInventoryOpen();
    }
});

document.getElementById('close-modal').addEventListener('click', () => {
    document.getElementById('demo-modal').classList.remove('mc-modal-open');
    if (minecraftSounds.soundsSupported) {
        minecraftSounds.playInventoryClose();
    }
});

document.querySelector('.mc-modal-close').addEventListener('click', () => {
    document.getElementById('demo-modal').classList.remove('mc-modal-open');
    if (minecraftSounds.soundsSupported) {
        minecraftSounds.playInventoryClose();
    }
});

// Закрытие модального окна по клику вне его
document.getElementById('demo-modal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('demo-modal')) {
        document.getElementById('demo-modal').classList.remove('mc-modal-open');
        if (minecraftSounds.soundsSupported) {
            minecraftSounds.playInventoryClose();
        }
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
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// Уведомления
document.getElementById('open-toast').addEventListener('click', () => {
    const messages = [
        '🔔 Добро пожаловать в MinecraftUI!',
        '🎮 Отличный интерфейс для игры!',
        '💎 Алмазный уровень качества!',
        '⚡ Быстро и удобно!',
        '🎨 Красиво и стильно!'
    ];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    showToast(randomMessage, 'success');

    if (minecraftSounds.soundsSupported) {
        minecraftSounds.playNotification();
    }
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
        if (minecraftSounds.soundsSupported) {
            if (slot.classList.contains('selected')) {
                minecraftSounds.playBlockPlace();
            } else {
                minecraftSounds.playBlockBreak();
            }
        }
    });
});

// Инициализация демо
console.log('🎮 MinecraftUI Demo загружена!');
console.log('Доступные функции:', {
    MinecraftUI: ui,
    minecraftSounds,
    themeManager,
    currentTheme: themeManager.getCurrentTheme(),
    soundsSupported: minecraftSounds.soundsSupported
});

// Показать стартовое уведомление
setTimeout(() => {
    showToast('🚀 MinecraftUI Demo загружена! Нажмите на элементы для взаимодействия.', 'info');
}, 1000);