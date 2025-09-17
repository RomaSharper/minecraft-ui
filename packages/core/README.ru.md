# **@minecraft-ui/core [Русский]**

Основные стили и утилиты для MinecraftUI - библиотеки компонентов в стиле Minecraft для современных веб-фреймворков.

## 🚀 **Быстрый старт**

```bash
npm install @minecraft-ui/core
```

## **Как использовать**

### **Через CSS**

```html
<link rel="stylesheet" href="node_modules/@minecraft-ui/core/dist/minecraft-ui.css">

<div class="mc-base">
    <button class="mc-btn mc-btn-grass">Нажми меня!</button>
    <div class="mc-card">
        <div class="mc-card-header">Заголовок карточки</div>
        <div class="mc-card-body">Контент карточки</div>
    </div>
</div>
```

### **Через JavaScript**

```javascript
import MinecraftUI from '@minecraft-ui/core';
import '@minecraft-ui/core/dist/minecraft-ui.css';

// Инициализация MinecraftUI
const ui = new MinecraftUI({
    theme: 'default',
    sounds: true,
    pixelated: true
});

// Использование утилит
import { minecraftSounds, themeManager } from '@minecraft-ui/core';

minecraftSounds.playButtonClick();
themeManager.applyTheme('dark');
```

### **SCSS Integration**

```scss
// Импорт переменных и миксинов
@import '@minecraft-ui/core/src/scss/core/variables';
@import '@minecraft-ui/core/src/scss/core/mixins';

// Изменение переменных
$mc-grass: #00FF00; // Более светлая трава
$mc-ui-bg: #2C2C2C; // Более тёмный задний фон

// Импортировать всё
@import '@minecraft-ui/core/src/scss/minecraft-ui';

// Создание кастомных компонентов
.my-custom-button {
    @include mc-button-variant(#purple, white);
    @include mc-block-border(#purple);
}
```

## 🎨 **Возможности**

### ✨ **Что включено**

* 🎮 **Компоненты в стиле Minecraft**: кнопки, карточки, формы, навигация, режимы и многое другое
* 🎵 **Звуковые эффекты**: Утилиты звуков на основе Web Audio API
* 🎭 **Множество тем**: Стандартная, тёмная и неоновая темы
* 📱 **Адаптивный дизайн**: Mobile-first подход с эстетикой Minecraft
* 🔧 **Настраиваемость**: SCSS переменные и миксины для легкой кастомизации
* ⚡ **Лёгкий вес**: Оптимизированные CSS и JavaScript бандлы
* ♿ **Доступность**: Соответствие WCAG с управлением фокусом
* 📦 **Не зависит от фреймворка**: Работает с любым фреймворком или vanilla JavaScript

## 🎯 Категории компонентов

### **Формы**

* `.mc-btn` - Различные кнопки в стиле Minecraft
* `.mc-input` - Пикселизированные поля ввода
* `.mc-textarea` - Многострочные поля ввода
* `.mc-select` - Кастомные выпадающие списки
* `.mc-checkbox` - Кастомные флажки и радиокнопки

### **Контейнеры**

* `.mc-card` - Контейнер с заголовком и подвалом
* `.mc-navbar` - Меню навигации
* `.mc-modal` - Диалоговые и модальные окна
* `.mc-tabs` - Вкладки

### **Специфичные игровые компоненты**

* `.mc-inventory` - Сеточная система инвентаря
* `.mc-progress` - Строки прогресса
* `.mc-tooltip` - Подсказки при наведении

### **Утилитные классы**

* **Расстояние**: `.mc-m-*`, `.mc-p-*` (0-8 scale)
* **Тип контейнера**: `.mc-d-*`, `.mc-flex-*`, `.mc-justify-*`
* **Цвета**: `.mc-text-*`, `.mc-bg-*`
* **Типография**: `.mc-text-*`, `.mc-font-*`

## 🎵 **Утилиты JavaScript**

### **Звуковая система**

```javascript
import { minecraftSounds } from '@minecraft-ui/core';

// Встроенные звуки
minecraftSounds.playBlockBreak();
minecraftSounds.playBlockPlace();
minecraftSounds.playButtonClick();
minecraftSounds.playError();
minecraftSounds.playSuccess();

// Кастомные звуки
minecraftSounds.playCustomSound({
    frequency: 440,
    duration: 0.2,
    type: 'square',
    volume: 0.5
});
```

### **Менеджер тем**

```javascript
import { themeManager } from '@minecraft-ui/core';

// Применение встроенной темы
themeManager.applyTheme('default');
themeManager.applyTheme('dark');
themeManager.applyTheme('neon');

// Регистрация своей темы
themeManager.registerTheme('custom', {
    name: 'My Theme',
    colors: {
        primary: '#ff0000',
        secondary: '#00ff00',
        background: '#000000',
        surface: '#333333',
        text: '#ffffff',
        border: '#666666'
    }
});

themeManager.applyTheme('custom');
```

### **ДОМ**

```javascript
import { DOMUtils } from '@minecraft-ui/core';

// Манипуляции над элементами
DOMUtils.addClass(element, 'mc-active');
DOMUtils.removeClass(element, 'mc-active');
DOMUtils.toggleClass(element, 'mc-active');

// Создание элемента
const button = DOMUtils.createElement('button', {
    classes: ['mc-btn', 'mc-btn-grass'],
    attributes: { 'data-tooltip': 'Нажми меня!' },
    content: 'Моя кнопка',
    parent: document.body
});

// Менеждмент фокуса
const cleanup = DOMUtils.trapFocus(modalElement);
// cleanup(); // Вызывать, когда модальное окно закрывается
```

## 🎨 **Темы и кастомизация**

### **SCSS Переменные**

#### **Цвета**

```scss
// Цвета Minecraft-блоков
$mc-grass: #7CB342;
$mc-stone: #9E9E9E;
$mc-gold: #FFC107;
$mc-diamond: #00BCD4;
$mc-redstone: #F44336;

// Цвета UI
$mc-ui-bg: #3E3E3E;
$mc-ui-text: #FFFFFF;
$mc-ui-border: #8B8B8B;

// Цвета состояний
$mc-success: $mc-grass;
$mc-warning: $mc-gold;
$mc-error: $mc-redstone;
$mc-info: $mc-diamond;
```

#### **Расстояния**

```scss
// 8px-шаговая система (как у Minecraft-блоков)
$mc-spacer: 8px;
$mc-space-1: 8px;
$mc-space-2: 16px;
$mc-space-3: 24px;
$mc-space-4: 32px;
```

#### **Типография**

```scss
$mc-font-family-base: 'Courier New', 'Monaco', 'Menlo', monospace;
$mc-font-size-xs: 10px;
$mc-font-size-sm: 12px;
$mc-font-size-base: 14px;
$mc-font-size-lg: 16px;
$mc-font-size-xl: 20px;
```

### **Миксины**

#### **Эффекты блоков**

```scss
// 3D-границы блоков
@include mc-block-border($color);
@include mc-block-pressed($color);
@include mc-block-inset($color);

// Варианты кнопок
@include mc-button-variant($bg-color, $text-color);
@include mc-button-size($padding-y, $padding-x, $font-size);
```

#### **Анимации**

```scss
@include mc-fade-in();
@include mc-slide-in(up, 20px);
@include mc-pulse();
```

#### **Пользовательские компоненты**

```scss
// Создание пользовательской алмазной кнопки
.mc-btn-emerald {
  @include mc-button-variant(#50c4c8, white);

  &::before {
    content: "💎";
    margin-right: 8px;
  }
}

// Пользовательская расстановка инвентаря
.mc-inventory-hotbar {
  @extend .mc-inventory;
  grid-template-columns: repeat(9, 40px);
  padding: 8px;

  .mc-slot {
    width: 40px;
    height: 40px;
  }
}

// Пользовательская карточка
.mc-card-nether {
  @include mc-card-variant(#8B0000, #FF4500);

  .mc-card-header {
    background: linear-gradient(45deg, #8B0000, #FF4500);
  }
}
```

## 🎮 **Специфичные игровые системы**

### **Инвентарь**

```html
<div class="mc-inventory">
    <div class="mc-slot occupied">⚔️</div>
    <div class="mc-slot occupied">🛡️<span class="mc-slot-count">1</span></div>
    <div class="mc-slot"><!-- пусто --></div>
    <!-- ... больше слотов -->
</div>
```

### **Прогресс-бары**

```html
<div class="mc-progress">
    <div class="mc-progress-bar mc-progress-health" style="width: 75%"></div>
</div>

<div class="mc-progress">
    <div class="mc-progress-bar mc-progress-hunger" style="width: 60%"></div>
</div>

<div class="mc-progress">
    <div class="mc-progress-bar mc-progress-xp" style="width: 30%"></div>
    <span class="mc-progress-label">Уровень 15</span>
</div>
```

### **Подсказки**

```html
<button class="mc-btn mc-tooltip" data-tooltip="Алмазный меч - Атака: 7">
    ⚔️
</button>

<div class="mc-tooltip mc-tooltip-right" data-tooltip="Увеличивает скорость копания">
    🔧 Эффективность V
</div>
```

## 📱 **Отзывчивый дизайн**

MinecraftUI использует подход mobile-first с этими брейкпоинтами:

* **xs**: `0` (_default_)
* **sm**: `576px`
* **md**: `768px`
* **lg**: `992px`
* **xl**: `1200px`
* **xxl**: `1400px`

```scss
@include mc-media-up(md) {
    .my-component {
        display: flex;
    }
}

@include mc-media-between(sm, lg) {
    .my-component {
        padding: 16px;
    }
}
```

## **Отзывчивые классы**

```html
<!-- Спрятано на мобильных устройствах, видно на компьютерах -->
<div class="mc-d-none mc-d-md-block">Только пользователи компьютера видят это</div>

<!-- Разные компоновки при разных размерах экранов -->
<div class="mc-d-flex mc-flex-col mc-flex-md-row">
    <div class="mc-w-full mc-w-md-1/2">Колонка 1</div>
    <div class="mc-w-full mc-w-md-1/2">Колонка 2</div>
</div>
```

### **Отзывчивая навигация**

```html
<nav class="mc-navbar">
    <a href="#" class="mc-navbar-brand">🎮 MinecraftUI</a>
    <ul class="mc-navbar-nav">
        <li class="mc-nav-item">
            <a href="#" class="mc-nav-link active">Главная</a>
        </li>
        <!-- Скрывается на мобильном устройстве -->
    </ul>
</nav>
```

## 🎵 **Интеграция аудио**

### **Особенности Web Audio API**

* **Пиксельные звуковые эффекты**: Прямоугольные генераторы для создания ретро-атмосферы
* **Динамическая регулировка громкости**: Регулируемые узлы усиления
* **Частотная модуляция**: Создание пользовательских звуковых эффектов
* **Запасной вариант**: Не работает, когда звук не поддерживается

### **Создание пользовательских звуков**

```javascript
import { MinecraftSounds } from '@minecraft-ui/core';

const sounds = new MinecraftSounds();

// Создать пользовательский звук "повышения уровня"
sounds.playCustomSound({
    frequency: 440, // Нота A4
    duration: 0.3,
    type: 'sine',
    volume: 0.4
});

setTimeout(() => {
    sounds.playCustomSound({ frequency: 660, duration: 0.2 });
}, 100);
```

## 📦 **Информация о сборке**

| **Файл**             | **Размер (Сжатый)** | **Описание**                     |
|----------------------|---------------------|----------------------------------|
| minecraft-ui.css     | ~45KB               | Полный CSS со всеми компонентами |
| minecraft-ui.min.css | ~32KB               | Уменьшенный CSS                  |
| index.js             | ~15KB               | JavaScript утилиты (CommonJS)    |
| index.esm.js         | ~15KB               | JavaScript утилиты (ES Modules)  |
| minecraft-ui.min.js  | ~8KB                | Уменьшенная UMD сборка           |

## **Поддержка Tree Shaking**

```javascript
// Импортируйте только те функции, что вам нужны
import { minecraftSounds } from '@minecraft-ui/core/sounds';
import { themeManager } from '@minecraft-ui/core/theme';
import { Validator } from '@minecraft-ui/core/validation';
```

## 🧪 **Тестирование**

### **Запуск тестов**

```bash
# Запустить все тесты
npm test

# Запустить тесты с покрытием
npm run test:coverage

# Watch режим
npm run test:watch

# Проверка синтаксиса для SCSS и TypeScript
npm run lint
```

### **Написание тестов**

```javascript
import { MinecraftSounds, DOMUtils } from '@minecraft-ui/core';

describe('MinecraftSounds', () => {
    let sounds;

    beforeEach(() => {
        sounds = new MinecraftSounds();
    });
    
    it('кнопка воспроизведения должна проиграть звук без ошибок', () => {
        expect(() => sounds.playButtonClick()).not.toThrow();
    });
    
    it('должна быть обработка неподдерживаемых браузеров', () => {
        // Симуляция неподдерживаемого окружения
        global.AudioContext = undefined;
        
        const soundsNoSupport = new MinecraftSounds();
        expect(soundsNoSupport.soundsSupported).toBe(false);
    });
});
```

## 🔧 **Разработка**

### **Процесс сборки**

```bash
# Установка зависимостей
npm install

# Watch режим разработки
npm run dev

# Сборка для продакшна
npm run build

# Очистить папку сборки dist
npm run clean
```

### **Файловая структура**

```
packages/core/
├── src/
│   ├── scss/
│   │   ├── base/               # Сброс, типография, анимации  
│   │   ├── components/         # UI компоненты
│   │   ├── core/               # Переменные, миксины, функции
│   │   ├── themes/             # Цветовые темы
│   │   ├── utilities/          # Утилитные классы
│   │   └── minecraft-ui.scss   # Главная точка входа
│   ├── utils/                  # TypeScript утилиты
│   └── index.ts                # Главная JS точка входа
├── dist/                       # Файлы сборки
├── tests/                      # Файлы тестов
└── scripts/                    # Скрипты сборки
```

## 📄 **Лицензия**

MIT Лицензия - вы можете использовать эту библиотеку бесплатно
для коммерческих или некоммерческих проектов с указанием ссылки на автора.

## 🤝 **Содействие**

* Сделайте форк репозитория
* Создайте feature-ветку: `git checkout -b feature/amazing-feature`
* Совершите коммит внесённых изменений: `git commit -m "Add amazing feature"`
* Выполните пуш в свою ветку: `git push origin feature/amazing-feature`
* Создайте Pull Request

## **Стандарты кодинга**

* Используйте осмысленные имена переменных
* Следуйте методологии BEM для классов CSS
* Пишите тесты для новых функций
* Обновляйте документацию

## 🆘 **Неисправности**

### **Частые ошибки**

1. CSS не загружается корректно

```javascript
// Убедитесь, что вы испортировали CSS
import '@minecraft-ui/core/dist/minecraft-ui.css';
```

```html
<!--Или в HTML-->
<link rel="stylesheet" href="путь/к/minecraft-ui.css">
```

2. Звуки не проигрываются

```javascript
// Проверьте поддержку браузера
if (minecraftSounds.soundsSupported) {
    minecraftSounds.playButtonClick();
} else {
    console.log('Звуки не поддерживаются в вашем браузере');
}
```

3. На компоненты некорректно накладываются стили

```html
<!-- Всегда заворачивайте элементы в блок с классом mc-base -->
<div class="mc-base">
    <button class="mc-btn mc-btn-grass">Корректный стиль</button>
</div>
```

4. SCSS ошибка компиляции

```scss
// Убедитесь, что первым делом импортируете переменные
@import '@minecraft-ui/core/src/scss/core/variables';
@import '@minecraft-ui/core/src/scss/core/mixins';

// А уже потом используете их
.my-component {
    @include mc-button-variant($mc-grass);
}
```

## 📞 **Поддержка**

Документация: [Minecraft UI Документация](https://minecraftui.ru/dev)

Telegram: [@roma_sharper](https://t.me/roma_sharper)

Почта: [roma.sharper@yandex.ru](mailto:roma.sharper@yandex.ru)