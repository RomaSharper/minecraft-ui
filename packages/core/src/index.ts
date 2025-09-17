// Main entry point for MinecraftUI Core

import {EventCallback, EventEmitter} from "./utils/events";
import {themeManager} from "./utils/theme";

// Export utilities

export * from './utils/sounds';
export * from './utils/dom';
export * from './utils/theme';
export * from './utils/validation';
export * from './utils/events';

// Export types
export interface MinecraftUIConfig {
    theme?: string;
    sounds?: boolean;
    pixelated?: boolean;
    animations?: boolean;
}

export interface MinecraftUIEvents {
    configChange: { theme?: string, sounds?: boolean, animations?: boolean, pixelated?: boolean };
    themeChanges: { theme: string };
    soundsToggled: { enabled: boolean };
    [key: string]: any;
}

// Global MinecraftUI class
export class MinecraftUI {
    private readonly config: MinecraftUIConfig;
    private readonly eventEmitter = new EventEmitter<MinecraftUIEvents>();

    constructor(config: MinecraftUIConfig = {}) {
        this.config = {
            theme: 'default',
            sounds: true,
            pixelated: true,
            animations: true,
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
    }

    // Configuration methods
    public setTheme(theme: string): void {
        themeManager.applyTheme(theme);
        this.config.theme = theme;
        this.eventEmitter.emit('configChange', { theme });
    }

    public setSounds(enabled: boolean): void {
        this.config.sounds = enabled;
        this.eventEmitter.emit('configChange', { sounds: enabled });
    }

    public getConfig(): MinecraftUIConfig {
        return { ...this.config };
    }

    // Event methods
    public on<K extends keyof MinecraftUIEvents>(event: K, callback: EventCallback): () => void {
        return this.eventEmitter.on(event, callback);
    }

    public emit<K extends keyof MinecraftUIEvents>(event: K, data?: any): void {
        this.eventEmitter.emit(event, data);
    }
}

// Default export
export default MinecraftUI;

// Create CSS custom properties for JavaScript access
if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.textContent = `
    :root {
      --mc-font-family-base: 'Courier New', 'Monaco', 'Menlo', 'Consolas', monospace;
      --mc-transition-duration-base: 0.2s;
      --mc-border-width: 2px;
    }
    
    .mc-base {
      font-family: var(--mc-font-family-base);
      image-rendering: -moz-crisp-edges;
      image-rendering: -webkit-crisp-edges;
      image-rendering: pixelated;
      image-rendering: crisp-edges;
    }
    
    .mc-no-animations * {
      animation-duration: 0s !important;
      transition-duration: 0s !important;
    }
  `;
    document.head.appendChild(style);
}