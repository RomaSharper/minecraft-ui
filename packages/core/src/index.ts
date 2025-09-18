// Main entry point for MinecraftUI Core

import {UIEventCallback, UIEventEmitter, UIEvents} from "./utils/events";
import {minecraftSounds} from "./utils/sounds";
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

// Global MinecraftUI class
export class MinecraftUI {
    private readonly config: MinecraftUIConfig;
    private readonly eventEmitter = new UIEventEmitter();

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

        // Auto-add sound effects to buttons if enabled
        if (this.config.sounds) {
            this.initButtonSounds();
        }
    }

    private getButtonVariant(button: HTMLElement): string | undefined {
        const classes = Array.from(button.classList);
        const variantClass = classes.find(
            cls => cls.startsWith('mc-btn-') && cls !== 'mc-btn');
        return variantClass?.replace('mc-btn-', '');
    }

    private initButtonSounds(): void {
        // Add click sounds to all mc-btn elements
        document.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            if (target.classList.contains('mc-btn')) {
                minecraftSounds.playButtonClick();
                this.eventEmitter.emit('button:click', {
                    element: target,
                    variant: this.getButtonVariant(target)
                });
            }
        });

        // Add hover sounds to buttons
        document.addEventListener('mouseenter', (e) => {
            const target = e.target as HTMLElement;
            if (target.classList.contains('mc-btn')) {
                minecraftSounds.playButtonHover();
            }
        }, true);
    }

    // Configuration methods
    public setTheme(theme: string): void {
        const previousTheme = this.config.theme || 'default';
        themeManager.applyTheme(theme);
        this.config.theme = theme;
        this.eventEmitter.emit('theme:change', { theme, previousTheme });
    }

    public setSounds(enabled: boolean): void {
        this.config.sounds = enabled;
        if (enabled) {
            this.initButtonSounds();
        }
    }

    public getConfig(): MinecraftUIConfig {
        return { ...this.config };
    }

    // Event methods
    public on<K extends keyof UIEvents>(event: K, callback: UIEventCallback): () => void {
        return this.eventEmitter.on(event, callback);
    }

    public emit<K extends keyof UIEvents>(event: K, data: UIEvents[K]): void {
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