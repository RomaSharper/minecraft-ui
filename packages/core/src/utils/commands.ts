// Command system inspired by Minecraft commands

export type CommandCallback<T = any> = (data: T) => void;
export type CommandSelector = string;

// Minecraft-style selectors
export interface MinecraftSelectors {
    '@all-buttons': string;
    '@all-inputs': string;
    '@all-cards': string;
    '@all-modals': string;
    '@all-forms': string;
    '@all-images': string;
    '@all-links': string;
    '@all-videos': string;
    '@all-audios': string;
    '@document': string;
    '@world': string;
}

// Command parameters similar to Minecraft command structure
export interface CommandParams {
    selector?: CommandSelector;
    trigger?: string;
    target?: 'self' | 'parent' | 'children' | 'siblings' | 'closest';
    once?: boolean;
    delay?: number;
    bubbles?: boolean;
    cancelable?: boolean;
    passive?: boolean;
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
        '@all-buttons': '.mc-btn, button',
        '@all-inputs': '.mc-input, .mc-textarea, .mc-select, input, textarea, select',
        '@all-cards': '.mc-card, .card, [class*="card"]',
        '@all-modals': '.mc-modal, .modal, [class*="modal"]',
        '@all-forms': 'form',
        '@all-images': 'img',
        '@all-links': 'a',
        '@all-videos': 'video',
        '@all-audios': 'audio',
        '@document': 'document',
        '@world': 'window'
    };

    // Mapping of Minecraft-style commands to DOM events
    private eventMappings = {
        // Mouse events
        'mouse:click': 'click',
        'mouse:dblclick': 'dblclick',
        'mouse:down': 'mousedown',
        'mouse:up': 'mouseup',
        'mouse:move': 'mousemove',
        'mouse:over': 'mouseover',
        'mouse:out': 'mouseout',
        'mouse:enter': 'mouseenter',
        'mouse:leave': 'mouseleave',
        'mouse:wheel': 'wheel',
        'mouse:context': 'contextmenu',

        // Keyboard events
        'key:down': 'keydown',
        'key:up': 'keyup',
        'key:press': 'keypress',

        // Form events
        'form:input': 'input',
        'form:change': 'change',
        'form:submit': 'submit',
        'form:reset': 'reset',
        'form:focus': 'focus',
        'form:blur': 'blur',
        'form:select': 'select',
        'form:invalid': 'invalid',

        // Document events
        'doc:load': 'DOMContentLoaded',
        'doc:ready': 'readystatechange',
        'doc:scroll': 'scroll',
        'doc:resize': 'resize',
        'doc:beforeunload': 'beforeunload',
        'doc:unload': 'unload',

        // Media events
        'media:play': 'play',
        'media:pause': 'pause',
        'media:ended': 'ended',
        'media:timeupdate': 'timeupdate',
        'media:volumechange': 'volumechange',
        'media:waiting': 'waiting',
        'media:canplay': 'canplay',

        // Drag and drop events
        'drag:start': 'dragstart',
        'drag:end': 'dragend',
        'drag:enter': 'dragenter',
        'drag:leave': 'dragleave',
        'drag:over': 'dragover',
        'drag:drop': 'drop',

        // Touch events
        'touch:start': 'touchstart',
        'touch:move': 'touchmove',
        'touch:end': 'touchend',
        'touch:cancel': 'touchcancel',

        // Animation events
        'anim:start': 'animationstart',
        'anim:end': 'animationend',
        'anim:iteration': 'animationiteration',

        // Transition events
        'transition:start': 'transitionstart',
        'transition:end': 'transitionend',
        'transition:run': 'transitionrun',
        'transition:cancel': 'transitioncancel',

        // Clipboard events
        'clipboard:copy': 'copy',
        'clipboard:cut': 'cut',
        'clipboard:paste': 'paste',

        // Visibility events
        'visibility:change': 'visibilitychange',
        'page:show': 'pageshow',
        'page:hide': 'pagehide',
    };

    // Основная команда: /ui add <action> <selector> [params]
    public execute(
        action: 'add' | 'remove' | 'trigger' | 'clear' | 'list',
        commandType: string,
        selectorOrCallback?: CommandSelector | CommandCallback,
        callbackOrParams?: CommandCallback | CommandParams,
        params?: CommandParams
    ): any {
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

            case 'list':
                return this.listCommands(commandType);

            default:
                console.warn(`Unknown command action: ${action}`);
                return () => {};
        }
    }

    // Добавить команду
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
            Array.from(this.commands.keys())
                .filter(key => key.startsWith(commandType))
                .forEach(key => this.commands.delete(key));
            return;
        }

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

    // Список команд
    private listCommands(filter?: string): string[] {
        const commands = Array.from(this.commands.keys());
        return filter ? commands.filter(cmd => cmd.startsWith(filter)) : commands;
    }

    // Привязка к DOM событиям
    private bindDOMEvent(
        commandType: string,
        selector: CommandSelector,
        callback: CommandCallback,
        params: CommandParams
    ): void {
        const resolvedSelector = this.resolveSelector(selector);
        const eventType = this.getEventType(commandType);

        if (!eventType || !resolvedSelector) return;

        // Для кастомных событий
        if (eventType.startsWith('custom:')) {
            this.bindCustomEvent(commandType, resolvedSelector, callback, params);
            return;
        }

        const eventTarget = this.getEventTarget(resolvedSelector);
        const eventHandler = (event: Event) => {
            const element = event.target as HTMLElement;

            if (resolvedSelector !== 'document' && resolvedSelector !== 'window') {
                if (!element?.matches(resolvedSelector)) return;
            }

            const data: CommandData = {
                element,
                event,
                selector,
                params,
                timestamp: Date.now()
            };

            callback(data);

            if (params.once) {
                eventTarget.removeEventListener(eventType, eventHandler);
            }
        };

        const options: AddEventListenerOptions = {
            capture: params.bubbles === false,
            passive: params.passive ?? true,
            once: params.once ?? false
        };

        eventTarget.addEventListener(eventType, eventHandler, options);
    }

    // Привязка кастомных событий
    private bindCustomEvent(
        commandType: string,
        selector: string,
        callback: CommandCallback,
        params: CommandParams
    ): void {
        // Реализация кастомных Minecraft-событий
        switch (commandType) {
            case 'mc:block-place':
                this.setupBlockPlaceEvents(selector, callback, params);
                break;
            case 'mc:block-break':
                this.setupBlockBreakEvents(selector, callback, params);
                break;
            case 'mc:inventory-open':
                this.setupInventoryEvents(selector, callback, params);
                break;
            default:
                console.warn(`Unknown custom command: ${commandType}`);
        }
    }

    // Получить тип события из команды
    private getEventType(commandType: string): string | null {
        return this.eventMappings[commandType as keyof typeof this.eventMappings] || commandType;
    }

    // Разрешить Minecraft-селектор
    private resolveSelector(selector: CommandSelector): string {
        if (selector.startsWith('@')) {
            return this.selectors[selector as keyof MinecraftSelectors] || selector;
        }
        return selector;
    }

    // Получить цель для события
    private getEventTarget(selector: string): EventTarget {
        if (selector === 'document') return document;
        if (selector === 'window') return window;
        return document;
    }

    // Кастомные Minecraft-события
    private setupBlockPlaceEvents(selector: string, callback: CommandCallback, params: CommandParams): void {
        this.execute('add', 'mouse:down', selector, (data) => {
            if (data.event?.shiftKey) {
                callback({
                    ...data,
                    params: { ...params, action: 'block-place' }
                });
            }
        });
    }

    private setupBlockBreakEvents(selector: string, callback: CommandCallback, params: CommandParams): void {
        this.execute('add', 'mouse:down', selector, (data) => {
            if (!data.event?.shiftKey) {
                callback({
                    ...data,
                    params: { ...params, action: 'block-break' }
                });
            }
        });
    }

    private setupInventoryEvents(selector: string, callback: CommandCallback, params: CommandParams): void {
        this.execute('add', 'key:down', selector, (data) => {
            const event = data.event as KeyboardEvent;
            if (event.key === 'e') {
                callback(data);
            }
        });
    }

    // Утилиты
    public addSelector(name: string, selector: string): void {
        this.selectors[name as keyof MinecraftSelectors] = selector;
    }

    public getActiveCommands(): string[] {
        return Array.from(this.commands.keys());
    }

    public getCommandStats(): Record<string, number> {
        const stats: Record<string, number> = {};
        this.commands.forEach((callbacks, key) => {
            stats[key] = callbacks.size;
        });
        return stats;
    }
}