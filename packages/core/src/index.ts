// Main entry point for MinecraftUI Core

import {MinecraftTheme, themeManager} from "./utils/theme";
import {MinecraftCommandSystem, CommandCallback, CommandSelector, CommandParams} from './utils/commands';

// Export utilities

export * from './utils/sounds';
export * from './utils/dom';
export * from './utils/theme';
export * from './utils/validation';
export * from './utils/commands';

// Export types
export interface MinecraftUIConfig {
    theme?: MinecraftTheme;
    sounds?: boolean;
    pixelated?: boolean;
    animations?: boolean;
    autoCommands?: boolean;
}

// Global MinecraftUI class
export class MinecraftUI {
    private config: MinecraftUIConfig;
    private commandSystem = new MinecraftCommandSystem();

    constructor(config: MinecraftUIConfig = {}) {
        this.config = {
            theme: 'java',
            sounds: true,
            pixelated: true,
            animations: true,
            autoCommands: true,
            ...config
        };

        this.init();
    }

    private init(): void {
        // Apply initial theme
        if (this.config.theme) {
            themeManager.applyTheme(this.config.theme);
        }

        // Add pixelated class to body
        if (this.config.pixelated) {
            document.body.classList.add('mc-pixelated');
        }

        // Add base class
        document.body.classList.add('mc-base');

        // Disable animations if requested
        if (!this.config.animations) {
            document.body.classList.add('mc-no-animations');
        }

        // Initialize auto commands if enabled
        if (this.config.autoCommands) {
            this.initDefaultCommands();
        }
    }

    // Инициализация команд по умолчанию
    private initDefaultCommands(): void {
        // Команды для кнопок
        this.add('button:click', '@all-buttons', (data) => {
            console.log('Button clicked:', data.element?.textContent);
        });

        // Команды для модальных окон
        this.add('modal:show', '.mc-modal', (data) => {
            console.log('Modal shown');
        });

        // Команды для форм
        this.add('form:submit', 'form', (data) => {
            console.log('Form submitted');
        });
    }

    // ========================================
    // MINECRAFT-STYLE COMMAND INTERFACE
    // ========================================

    /**
     * Добавить команду (аналог /ui add)
     * @param commandType - тип команды (например: 'button:click', 'modal:open')
     * @param selector - селектор элементов (например: '@all-buttons', '.my-button')
     * @param callback - функция обратного вызова
     * @param params - дополнительные параметры
     */
    public add(
        commandType: string,
        selector: CommandSelector,
        callback: CommandCallback,
        params?: CommandParams
    ): () => void {
        return this.commandSystem.execute('add', commandType, selector, callback, params);
    }

    /**
     * Удалить команду (аналог /ui remove)
     * @param commandType - тип команды
     * @param callback - конкретный callback (опционально)
     */
    public remove(commandType: string, callback?: CommandCallback): void {
        this.commandSystem.execute('remove', commandType, undefined, callback);
    }

    /**
     * Выполнить команду принудительно (аналог /ui trigger)
     * @param commandType - тип команды
     * @param params - параметры выполнения
     */
    public trigger(commandType: string, params?: CommandParams): void {
        this.commandSystem.execute('trigger', commandType, undefined, undefined, params);
    }

    /**
     * Очистить все команды типа (аналог /ui clear)
     * @param commandType - тип команды
     */
    public clear(commandType: string): void {
        this.commandSystem.execute('clear', commandType);
    }

    /**
     * Добавить кастомный селектор (аналог /ui selector)
     * @param name - имя селектора (например: '@my-buttons')
     * @param selector - CSS селектор
     */
    public selector(name: string, selector: string): void {
        this.commandSystem.addSelector(name, selector);
    }

    // ========================================
    // CONFIGURATION METHODS
    // ========================================

    /**
     * Сменить тему (аналог /ui theme)
     * @param theme - название темы ('java', 'bedrock')
     */
    public theme(theme: string): void {
        const previousTheme = this.config.theme || 'java';
        themeManager.applyTheme(theme);
        this.config.theme = theme;

        // Триггер события смены темы
        this.trigger('theme:change', {
            selector: '@player',
            target: 'self'
        });
    }

    /**
     * Включить/выключить звуки (аналог /ui sounds)
     * @param enabled - включить звуки
     */
    public sounds(enabled: boolean): void {
        this.config.sounds = enabled;
        if (!enabled) {
            // Отключить все звуковые команды
            this.remove('button:click');
            this.remove('button:hover');
        } else {
            // Переинициализировать звуковые команды
            this.initDefaultCommands();
        }
    }

    /**
     * Получить конфигурацию (аналог /ui config)
     */
    public getConfig(): MinecraftUIConfig {
        return { ...this.config };
    }

    /**
     * Получить статистику команд (аналог /ui stats)
     */
    public stats(): Record<string, number> {
        return this.commandSystem.getCommandStats();
    }

    /**
     * Получить список активных команд (аналог /ui list)
     */
    public list(): string[] {
        return this.commandSystem.getActiveCommands();
    }

    // ========================================
    // CONVENIENCE METHODS (сокращения)
    // ========================================

    /**
     * Быстрое добавление события клика
     */
    public onClick(selector: CommandSelector, callback: CommandCallback, params?: CommandParams): () => void {
        return this.add('button:click', selector, callback, params);
    }

    /**
     * Быстрое добавление события наведения
     */
    public onHover(selector: CommandSelector, callback: CommandCallback, params?: CommandParams): () => void {
        return this.add('button:hover', selector, callback, params);
    }

    /**
     * Быстрое добавление события загрузки
     */
    public onLoad(callback: CommandCallback, params?: CommandParams): () => void {
        return this.add('document:load', '@player', callback, params);
    }

    /**
     * Показать модальное окно
     */
    public showModal(selector: string, params?: CommandParams): void {
        const modal = document.querySelector(selector);
        if (modal) {
            modal.classList.add('mc-modal-open');
            this.trigger('modal:open', { ...params, selector });
        }
    }

    /**
     * Скрыть модальное окно
     */
    public hideModal(selector: string, params?: CommandParams): void {
        const modal = document.querySelector(selector);
        if (modal) {
            modal.classList.remove('mc-modal-open');
            this.trigger('modal:close', { ...params, selector });
        }
    }
}

// Default export
export default MinecraftUI;

// Create global instance (like $ in jQuery)
declare global {
    interface Window {
        mc: MinecraftUI;
    }
}

// Auto-initialize if in browser
if (typeof document !== 'undefined') {
    // Add CSS custom properties
    const style = document.createElement('style');
    style.textContent = `
    :root {
      --mc-font-family-java: 'Courier New', 'Monaco', 'Menlo', 'Consolas', monospace;
      --mc-font-family-bedrock: 'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif;
      --mc-transition-duration: 0.2s;
      --mc-border-radius: 4px;
    }
    
    .mc-base {
      box-sizing: border-box;
      image-rendering: -moz-crisp-edges;
      image-rendering: -webkit-crisp-edges;  
      image-rendering: pixelated;
      image-rendering: crisp-edges;
    }
    
    .mc-base *,
    .mc-base *::before,
    .mc-base *::after {
      box-sizing: inherit;
    }
    
    .mc-no-animations * {
      animation-duration: 0s !important;
      transition-duration: 0s !important;
    }

    /* Java Edition базовые стили */
    .mc-theme-java {
      font-family: var(--mc-font-family-java);
    }

    /* Bedrock Edition базовые стили */
    .mc-theme-bedrock {
      font-family: var(--mc-font-family-bedrock);
    }
  `;
    document.head.appendChild(style);

    // Create global instance
    window.mc = new MinecraftUI();

    // Auto-initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.mc.trigger('document:ready');
        });
    } else {
        // DOM already loaded
        setTimeout(() => window.mc.trigger('document:ready'), 0);
    }
}