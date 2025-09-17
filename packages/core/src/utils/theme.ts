// Theme management utilities

export type MinecraftTheme = 'default' | 'dark' | 'neon' | 'custom';

export interface ThemeConfig {
    name: string;
    colors: {
        primary: string;
        secondary: string;
        background: string;
        surface: string;
        text: string;
        border: string;
    };
    customProperties?: Record<string, string>;
}

export class ThemeManager {
    private currentTheme: MinecraftTheme = 'default';
    private customThemes = new Map<string, ThemeConfig>();

    // Apply theme to document
    public applyTheme(theme: MinecraftTheme | string): void {
        const root = document.documentElement;

        // Remove existing theme classes
        root.classList.remove('mc-theme-default', 'mc-theme-dark', 'mc-theme-neon');

        if (this.isBuiltInTheme(theme)) {
            root.classList.add(`mc-theme-${theme}`);
            this.currentTheme = theme as MinecraftTheme;
        } else {
            // Apply custom theme
            const customTheme = this.customThemes.get(theme);
            if (customTheme) {
                this.applyCustomTheme(customTheme);
            }
        }

        // Dispatch theme change event
        document.dispatchEvent(new CustomEvent('themechange', {
            detail: { theme, previousTheme: this.currentTheme }
        }));
    }

    // Register custom theme
    public registerTheme(name: string, config: ThemeConfig): void {
        this.customThemes.set(name, config);
    }

    // Get current theme
    public getCurrentTheme(): MinecraftTheme | string {
        return this.currentTheme;
    }

    // Get available themes
    public getAvailableThemes(): string[] {
        return ['default', 'dark', 'neon', ...this.customThemes.keys()];
    }

    private isBuiltInTheme(theme: string): theme is MinecraftTheme {
        return ['default', 'dark', 'neon'].includes(theme);
    }

    private applyCustomTheme(config: ThemeConfig): void {
        const root = document.documentElement;

        // Apply color variables
        Object.entries(config.colors).forEach(([key, value]) => {
            root.style.setProperty(`--mc-${key}`, value);
        });

        // Apply custom properties
        if (config.customProperties) {
            Object.entries(config.customProperties).forEach(([key, value]) => {
                root.style.setProperty(key, value);
            });
        }
    }
}

// Singleton instance
export const themeManager = new ThemeManager();