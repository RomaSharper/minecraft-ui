// Command system inspired by Minecraft commands

export type CommandCallback<T = any> = (data: T) => void;
export type CommandSelector = string; // Например: 'button[class*="mc-btn"]' или '@all-buttons'

// Minecraft-style selectors
export interface MinecraftSelectors {
    '@all-buttons': string;
    '@all-inputs': string;
    '@all-cards': string;
    '@all-modals': string;
    '@document': string;
    '@world': string;  // window
}

// Command parameters similar to Minecraft command structure
export interface CommandParams {
    selector?: CommandSelector;
    trigger?: 'click' | 'hover' | 'focus' | 'load' | 'change' | 'submit';
    target?: 'self' | 'parent' | 'children' | 'siblings';
    sound?: boolean;
    once?: boolean;
    delay?: number;
}

export interface CommandData {
    element?: HTMLElement;
    event?: Event;
    selector?: string;
    params?: CommandParams;
    timestamp?: number;
}

export class MinecraftCommandSystem {
    private commands = new Map<string, Set<CommandCallback>>();
    private selectors: MinecraftSelectors = {
        '@all-buttons': '.mc-btn',
        '@all-inputs': '.mc-input, .mc-textarea, .mc-select',
        '@all-cards': '.mc-card',
        '@all-modals': '.mc-modal',
        '@document': 'document',
        '@world': 'window'
    };

    constructor() {
        this.initAutoCommands();
    }

    // Основная команда в стиле Minecraft: /ui add <action> <selector> [params]
    public execute(
        action: 'add' | 'remove' | 'trigger' | 'clear',
        commandType: string,
        selectorOrCallback?: CommandSelector | CommandCallback,
        callbackOrParams?: CommandCallback | CommandParams,
        params?: CommandParams
    ): () => void {
        switch (action) {
            case 'add':
                return this.addCommand(
                    commandType,
                    selectorOrCallback as CommandSelector,
                    callbackOrParams as CommandCallback,
                    params
                );

            case 'remove':
                return () => this.removeCommand(commandType, callbackOrParams as CommandCallback);

            case 'trigger':
                return () => this.triggerCommand(commandType, callbackOrParams as CommandParams);

            case 'clear':
                return () => this.clearCommands(commandType);

            default:
                console.warn(`Unknown command action: ${action}`);
                return () => {};
        }
    }

    // Добавить команду - /ui add event button:click callback
    private addCommand(
        commandType: string,
        selector: CommandSelector,
        callback: CommandCallback,
        params: CommandParams = {}
    ): () => void {
        const commandId = `${commandType}:${selector}`;

        if (!this.commands.has(commandId)) {
            this.commands.set(commandId, new Set());
        }

        const callbacks = this.commands.get(commandId)!;
        callbacks.add(callback);

        // Привязать к DOM событиям
        this.bindDOMEvent(commandType, selector, callback, params);

        // Возвращаем функцию отписки
        return () => {
            callbacks.delete(callback);
            if (callbacks.size === 0) {
                this.commands.delete(commandId);
            }
        };
    }

    // Удалить команду
    private removeCommand(commandType: string, callback?: CommandCallback): void {
        if (!callback) {
            // Удалить все команды данного типа
            Array.from(this.commands.keys())
                .filter(key => key.startsWith(commandType))
                .forEach(key => this.commands.delete(key));
            return;
        }

        // Удалить конкретный callback
        this.commands.forEach((callbacks, key) => {
            if (key.startsWith(commandType)) {
                callbacks.delete(callback);
                if (callbacks.size === 0) {
                    this.commands.delete(key);
                }
            }
        });
    }

    // Выполнить команду принудительно
    private triggerCommand(commandType: string, params: CommandParams = {}): void {
        const matchingCommands = Array.from(this.commands.entries())
            .filter(([key]) => key.startsWith(commandType));

        matchingCommands.forEach(([key, callbacks]) => {
            const selector = key.split(':')[1];
            callbacks.forEach(callback => {
                const data: CommandData = {
                    selector,
                    params,
                    timestamp: Date.now()
                };

                if (params.delay) {
                    setTimeout(() => callback(data), params.delay);
                } else {
                    callback(data);
                }
            });
        });
    }

    // Очистить все команды типа
    private clearCommands(commandType: string): void {
        Array.from(this.commands.keys())
            .filter(key => key.startsWith(commandType))
            .forEach(key => this.commands.delete(key));
    }

    // Привязка к DOM событиям
    private bindDOMEvent(
        commandType: string,
        selector: CommandSelector,
        callback: CommandCallback,
        params: CommandParams
    ): void {
        const resolvedSelector = this.resolveSelector(selector);
        const eventType = this.extractEventType(commandType);

        if (!eventType || !resolvedSelector) return;

        const eventTarget = this.getEventTarget(resolvedSelector);
        const eventHandler = (event: Event) => {
            const element = event.target as HTMLElement;

            // Проверить, подходит ли элемент под селектор
            if (resolvedSelector !== 'document' && resolvedSelector !== 'window') {
                if (!element.matches(resolvedSelector)) return;
            }

            const data: CommandData = {
                element,
                event,
                selector,
                params,
                timestamp: Date.now()
            };

            // Воспроизвести звук если нужно
            if (params.sound && this.shouldPlaySound(commandType)) {
                this.playCommandSound(commandType);
            }

            // Выполнить callback
            callback(data);

            // Удалить если это одноразовая команда
            if (params.once) {
                eventTarget.removeEventListener(eventType, eventHandler);
            }
        };

        eventTarget.addEventListener(eventType, eventHandler);
    }

    // Разрешить Minecraft-селектор в CSS селектор
    private resolveSelector(selector: CommandSelector): string {
        if (selector.startsWith('@')) {
            return this.selectors[selector as keyof MinecraftSelectors] || selector;
        }
        return selector;
    }

    // Извлечь тип события из команды
    private extractEventType(commandType: string): string | null {
        const parts = commandType.split(':');
        if (parts.length < 2) return null;

        const eventMap: Record<string, string> = {
            'click': 'click',
            'hover': 'mouseenter',
            'focus': 'focus',
            'load': 'DOMContentLoaded',
            'change': 'change',
            'submit': 'submit'
        };

        return eventMap[parts[1]] || parts[1];
    }

    // Получить цель для события
    private getEventTarget(selector: string): EventTarget {
        if (selector === 'document') return document;
        if (selector === 'window') return window;
        return document;
    }

    // Автоматические команды для UI элементов
    private initAutoCommands(): void {
        // Автоматические звуки для кнопок
        this.execute('add', 'button:click', '@all-buttons', () => {
            this.playCommandSound('button:click');
        }, { sound: false }); // звук уже встроен

        // Автоматические звуки при наведении
        this.execute('add', 'button:hover', '@all-buttons', () => {
            this.playCommandSound('button:hover');
        }, { sound: false });
    }

    // Воспроизвести звук для команды
    private playCommandSound(commandType: string): void {
        // Импортируем звуки динамически чтобы избежать циклических зависимостей
        import('./sounds').then(({ minecraftSounds }) => {
            switch (commandType) {
                case 'button:click':
                    minecraftSounds.playButtonClick();
                    break;
                case 'button:hover':
                    minecraftSounds.playButtonHover();
                    break;
                case 'modal:open':
                    minecraftSounds.playModalOpen();
                    break;
                case 'modal:close':
                    minecraftSounds.playModalClose();
                    break;
                default:
                    minecraftSounds.playNotification();
            }
        });
    }



    // Проверить, нужно ли воспроизводить звук
    private shouldPlaySound(commandType: string): boolean {
        const soundCommands = ['button:click', 'button:hover', 'modal:open', 'modal:close', 'tab:switch'];
        return soundCommands.includes(commandType);
    }

    // Добавить кастомный селектор
    public addSelector(name: string, selector: string): void {
        this.selectors[name as keyof MinecraftSelectors] = selector;
    }

    // Получить все активные команды
    public getActiveCommands(): string[] {
        return Array.from(this.commands.keys());
    }

    // Статистика команд
    public getCommandStats(): Record<string, number> {
        const stats: Record<string, number> = {};
        this.commands.forEach((callbacks, key) => {
            stats[key] = callbacks.size;
        });
        return stats;
    }
}