# **@minecraft-ui/core [English]**

Core styles and utilities for MinecraftUI - a Minecraft-styled component library for modern web frameworks.

## 🚀 **Quick Start**

```bash
npm install @minecraft-ui/core
```

## **Basic Usage**

### **CSS Only**

```html
<link rel="stylesheet" href="node_modules/@minecraft-ui/core/dist/minecraft-ui.css">

<div class="mc-base">
    <button class="mc-btn mc-btn-grass">Click me!</button>
    <div class="mc-card">
        <div class="mc-card-header">Card Title</div>
        <div class="mc-card-body">Card content</div>
    </div>
</div>
```

### **With JavaScript**

```javascript
import MinecraftUI from '@minecraft-ui/core';
import '@minecraft-ui/core/dist/minecraft-ui.css';

// Initialize MinecraftUI
const ui = new MinecraftUI({
    theme: 'default',
    sounds: true,
    pixelated: true
});

// Use utilities
import { minecraftSounds, themeManager } from '@minecraft-ui/core';

minecraftSounds.playButtonClick();
themeManager.applyTheme('dark');
```

### **SCSS Integration**

```scss
// Import variables and mixins
@import '@minecraft-ui/core/src/scss/core/variables';
@import '@minecraft-ui/core/src/scss/core/mixins';

// Customize variables
$mc-grass: #00FF00; // Brighter grass
$mc-ui-bg: #2C2C2C; // Darker background

// Import everything
@import '@minecraft-ui/core/src/scss/minecraft-ui';

// Create custom components
.my-custom-button {
    @include mc-button-variant(#purple, white);
    @include mc-block-border(#purple);
}
```

## 🎨 **Features**

### ✨ **What's Included**

* 🎮 **Minecraft-styled Components**: Buttons, cards, forms, navigation, modals, and more
* 🎵 Sound Effects: Web Audio API-based sound utilities
* 🎭 Multiple Themes: Default, dark, and neon themes
* 📱 Responsive Design: Mobile-first approach with Minecraft aesthetics
* 🔧 Customizable: SCSS variables and mixins for easy theming
* ⚡ Lightweight: Optimized CSS and JavaScript bundles
* ♿ Accessible: WCAG compliant with focus management
* 📦 Framework Agnostic: Works with any framework or vanilla JavaScript

## 🎯 Component Categories

### **Form Components**

* `.mc-btn` - Minecraft-styled buttons with variants
* `.mc-input` - Pixelated form inputs
* `.mc-textarea` - Multi-line text areas
* `.mc-select` - Custom select dropdowns
* `.mc-checkbox` - Custom checkboxes and radios

### **Layout Components**

* `.mc-card` - Content containers with headers/footers
* `.mc-navbar` - Navigation bars
* `.mc-modal` - Dialog boxes and overlays
* `.mc-tabs` - Tabbed interfaces

### **Game-specific Components**

* `.mc-inventory` - Grid-based inventory system
* `.mc-progress` - Health/hunger/XP bars
* `.mc-tooltip` - Hover information panels

### **Utility Classes**

* **Spacing**: `.mc-m-*`, `.mc-p-*` (0-8 scale)
* **Layout**: `.mc-d-*`, `.mc-flex-*`, `.mc-justify-*`
* **Colors**: `.mc-text-*`, `.mc-bg-*`
* **Typography**: `.mc-text-*`, `.mc-font-*`

## 🎵 **JavaScript Utilities**

### **Sound System**

```javascript
import { minecraftSounds } from '@minecraft-ui/core';

// Predefined sounds
minecraftSounds.playBlockBreak();
minecraftSounds.playBlockPlace();
minecraftSounds.playButtonClick();
minecraftSounds.playError();
minecraftSounds.playSuccess();

// Custom sounds
minecraftSounds.playCustomSound({
    frequency: 440,
    duration: 0.2,
    type: 'square',
    volume: 0.5
});
```

### **Theme Management**

```javascript
import { themeManager } from '@minecraft-ui/core';

// Apply built-in themes
themeManager.applyTheme('default');
themeManager.applyTheme('dark');
themeManager.applyTheme('neon');

// Register custom theme
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

### **DOM**

```javascript
import { DOMUtils } from '@minecraft-ui/core';

// Element manipulation
DOMUtils.addClass(element, 'mc-active');
DOMUtils.removeClass(element, 'mc-active');
DOMUtils.toggleClass(element, 'mc-active');

// Create elements
const button = DOMUtils.createElement('button', {
    classes: ['mc-btn', 'mc-btn-grass'],
    attributes: { 'data-tooltip': 'Click me!' },
    content: 'My Button',
    parent: document.body
});

// Focus management
const cleanup = DOMUtils.trapFocus(modalElement);
// cleanup(); // Call when modal closes
```

## 🎨 **Theming & Customization**

### **SCSS Variables**

#### **Colors**

```scss
// Minecraft block colors
$mc-grass: #7CB342;
$mc-stone: #9E9E9E;
$mc-gold: #FFC107;
$mc-diamond: #00BCD4;
$mc-redstone: #F44336;

// UI colors
$mc-ui-bg: #3E3E3E;
$mc-ui-text: #FFFFFF;
$mc-ui-border: #8B8B8B;

// State colors
$mc-success: $mc-grass;
$mc-warning: $mc-gold;
$mc-error: $mc-redstone;
$mc-info: $mc-diamond;
```

#### **Spacing**

```scss
// 8px grid system (like Minecraft blocks)
$mc-spacer: 8px;
$mc-space-1: 8px;
$mc-space-2: 16px;
$mc-space-3: 24px;
$mc-space-4: 32px;
```

#### **Typography**

```scss
$mc-font-family-base: 'Courier New', 'Monaco', 'Menlo', monospace;
$mc-font-size-xs: 10px;
$mc-font-size-sm: 12px;
$mc-font-size-base: 14px;
$mc-font-size-lg: 16px;
$mc-font-size-xl: 20px;
```

### **Mixins**

#### **Block Effects**

```scss
// 3D block borders
@include mc-block-border($color);
@include mc-block-pressed($color);
@include mc-block-inset($color);

// Button variants
@include mc-button-variant($bg-color, $text-color);
@include mc-button-size($padding-y, $padding-x, $font-size);
```

#### **Animations**

```scss
@include mc-fade-in();
@include mc-slide-in(up, 20px);
@include mc-pulse();
```

#### **Custom Components**

```scss
// Create a custom diamond button
.mc-btn-diamond {
    @include mc-button-variant(#50c4c8, white);
    &::before {
        content: "💎";
        margin-right: 8px;
    }
}

// Custom inventory layout
.mc-inventory-hotbar {
    @extend .mc-inventory;
    grid-template-columns: repeat(9, 40px);
    padding: 8px;

    .mc-slot {
        width: 40px;
        height: 40px;
    }
}

// Custom card variant
.mc-card-nether {
    @include mc-card-variant(#8B0000, #FF4500);

    .mc-card-header {
        background: linear-gradient(45deg, #8B0000, #FF4500);
    }
}
```

## 🎮 **Game-Specific Features**

### **Inventory System**

```html
<div class="mc-inventory">
    <div class="mc-slot occupied">⚔️</div>
    <div class="mc-slot occupied">🛡️<span class="mc-slot-count">1</span></div>
    <div class="mc-slot"><!-- empty --></div>
    <!-- ... more slots -->
</div>
```

### **Progress Bars**

```html
<div class="mc-progress">
    <div class="mc-progress-bar mc-progress-health" style="width: 75%"></div>
</div>

<div class="mc-progress">
    <div class="mc-progress-bar mc-progress-hunger" style="width: 60%"></div>
</div>

<div class="mc-progress">
    <div class="mc-progress-bar mc-progress-xp" style="width: 30%"></div>
    <span class="mc-progress-label">Level 15</span>
</div>
```

### **Tooltips**

```html
<button class="mc-btn mc-tooltip" data-tooltip="Diamond Sword - Attack: 7">
    ⚔️
</button>

<div class="mc-tooltip mc-tooltip-right" data-tooltip="Increases mining speed">
    🔧 Efficiency V
</div>
```

## 📱 **Responsive Design**

MinecraftUI uses a mobile-first approach with these breakpoints:

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

## **Responsive Classes**

```html
<!-- Hidden on mobile, visible on desktop -->
<div class="mc-d-none mc-d-md-block">Desktop only</div>

<!-- Different layouts per screen size -->
<div class="mc-d-flex mc-flex-col mc-flex-md-row">
    <div class="mc-w-full mc-w-md-1/2">Column 1</div>
    <div class="mc-w-full mc-w-md-1/2">Column 2</div>
</div>
```

### **Responsive Navigation**

```html
<nav class="mc-navbar">
    <a href="#" class="mc-navbar-brand">🎮 MinecraftUI</a>
    <ul class="mc-navbar-nav">
        <li class="mc-nav-item">
            <a href="#" class="mc-nav-link active">Home</a>
        </li>
        <!-- Auto-collapses on mobile -->
    </ul>
</nav>
```

## 🎵 **Audio Integration**

### **Web Audio API Features**

* **Pixelated Sound Effects**: Square wave oscillators for retro feel
* **Dynamic Volume Control**: Adjustable gain nodes
* **Frequency Modulation**: Create custom sound effects
* **Graceful Fallbacks**: Silent operation when audio isn't supported

### **Custom Sound Creation**

```javascript
import { MinecraftSounds } from '@minecraft-ui/core';

const sounds = new MinecraftSounds();

// Create a custom "level up" sound
sounds.playCustomSound({
    frequency: 440, // A4 note
    duration: 0.3,
    type: 'sine',
    volume: 0.4
});

// Chain sounds for complex effects
setTimeout(() => {
    sounds.playCustomSound({ frequency: 660, duration: 0.2 });
}, 100);
```

## 📦 **Bundle Information**

| **File**             | **Size (Gzipped)** | **Description**                   |
|----------------------|--------------------|-----------------------------------|
| minecraft-ui.css     | ~45KB              | Full CSS with all components      |
| minecraft-ui.min.css | ~32KB              | Minified CSS                      |
| index.js             | ~15KB              | JavaScript utilities (CommonJS)   |
| index.esm.js         | ~15KB              | JavaScript utilities (ES Modules) |
| minecraft-ui.min.js  | ~8KB               | Minified UMD bundle               |

## **Tree Shaking Support**

```javascript
// Import only what you need
import { minecraftSounds } from '@minecraft-ui/core/sounds';
import { themeManager } from '@minecraft-ui/core/theme';
import { Validator } from '@minecraft-ui/core/validation';
```

## 🧪 **Testing**

### **Running Tests**

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Watch mode
npm run test:watch

# Lint SCSS and TypeScript
npm run lint
```

### **Writing Tests**

```javascript
import { MinecraftSounds, DOMUtils } from '@minecraft-ui/core';

describe('MinecraftSounds', () => {
    let sounds;

    beforeEach(() => {
        sounds = new MinecraftSounds();
    });
    
    it('should play button sound without errors', () => {
        expect(() => sounds.playButtonClick()).not.toThrow();
    });
    
    it('should handle unsupported browsers gracefully', () => {
        // Mock unsupported environment
        global.AudioContext = undefined;
        
        const soundsNoSupport = new MinecraftSounds();
        expect(soundsNoSupport.soundsSupported).toBe(false);
    });
});
```

## 🔧 **Development**

### **Build Process**

```bash
# Install dependencies
npm install

# Development watch mode
npm run dev

# Build for production
npm run build

# Clean dist folder
npm run clean
```

### **File Structure**

```
packages/core/
├── src/
│   ├── scss/
│   │   ├── base/               # Reset, typography, animations  
│   │   ├── components/         # UI components
│   │   ├── core/               # Variables, mixins, functions
│   │   ├── themes/             # Color themes
│   │   ├── utilities/          # Utility classes
│   │   └── minecraft-ui.scss   # Main entry point
│   ├── utils/                  # TypeScript utilities
│   └── index.ts                # Main JS entry point
├── dist/                       # Built files
├── tests/                      # Test files
└── scripts/                    # Build scripts
```

## 📄 **License**

MIT License - feel free to use in personal and commercial projects.
Don't forget to link a developer.

## 🤝 **Contributing**

* Fork the repository
* Create a feature branch: `git checkout -b feature/amazing-feature`
* Commit changes: `git commit -m "Add amazing feature"`
* Push to branch: `git push origin feature/amazing-feature`
* Open a Pull Request

## **Coding Standards**

* Use meaningful variable names
* Follow BEM methodology for CSS classes
* Write tests for new features
* Update documentation

## 🆘 **Troubleshooting**

### **Common Issues**

1. CSS not loading properly

```javascript
// Make sure to import CSS
import '@minecraft-ui/core/dist/minecraft-ui.css';
```

```html
<!--Or in HTML-->
<link rel="stylesheet" href="path/to/minecraft-ui.css">
```

2. Sounds not playing

```javascript
// Check browser support
if (minecraftSounds.soundsSupported) {
    minecraftSounds.playButtonClick();
} else {
    console.log('Audio not supported in this browser');
}
```

3. Components not styled correctly

```html
<!-- Always wrap content in mc-base -->
<div class="mc-base">
    <button class="mc-btn mc-btn-grass">Properly styled</button>
</div>
```

4. SCSS compilation errors

```scss
// Make sure to import variables first
@import '@minecraft-ui/core/src/scss/core/variables';
@import '@minecraft-ui/core/src/scss/core/mixins';

// Then use them
.my-component {
    @include mc-button-variant($mc-grass);
}
```

## 📞 **Support**

Documentation: [Minecraft UI Docs](https://minecraftui.ru/dev)

Telegram: [@roma_sharper](https://t.me/roma_sharper)

Email: [roma.sharper@yandex.ru](mailto:roma.sharper@yandex.ru)