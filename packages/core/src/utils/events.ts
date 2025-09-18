// Event handling utilities

export type UIEventCallback<T = any> = (data: T) => void;

export interface UIEvents {
    'button:click': { element: HTMLElement; variant?: string };
    'modal:open': { modalId?: string };
    'modal:close': { modalId?: string };
    'tab:change': { oldTab: string; newTab: string };
    'theme:change': { theme: string; previousTheme: string };
    'tooltip:show': { element: HTMLElement; content: string };
    'tooltip:hide': { element: HTMLElement };
    'form:submit': { form: HTMLFormElement; data: FormData };
    'form:error': { form: HTMLFormElement; errors: string[] };
}

export class UIEventEmitter {
    private events = new Map<keyof UIEvents, Set<UIEventCallback>>();

    public on<K extends keyof UIEvents>(
        event: K,
        callback: UIEventCallback<UIEvents[K]>
    ): () => void {
        if (!this.events.has(event)) {
            this.events.set(event, new Set());
        }

        const callbacks = this.events.get(event)!;
        callbacks.add(callback);

        // Return unsubscribe function
        return () => {
            callbacks.delete(callback);
            if (callbacks.size === 0) {
                this.events.delete(event);
            }
        };
    }

    public emit<K extends keyof UIEvents>(event: K, data: UIEvents[K]): void {
        const callbacks = this.events.get(event);
        if (callbacks) {
            callbacks.forEach(callback => {
                try {
                    callback(data);
                } catch (error) {
                    console.error(`Error in UI event callback for ${String(event)}:`, error);
                }
            });
        }
    }

    public off<K extends keyof UIEvents>(
        event: K,
        callback?: UIEventCallback<UIEvents[K]>
    ): void {
        if (!callback) {
            this.events.delete(event);
            return;
        }

        const callbacks = this.events.get(event);
        if (callbacks) {
            callbacks.delete(callback);
            if (callbacks.size === 0) {
                this.events.delete(event);
            }
        }
    }

    public once<K extends keyof UIEvents>(
        event: K,
        callback: UIEventCallback<UIEvents[K]>
    ): void {
        const onceCallback = (data: UIEvents[K]) => {
            callback(data);
            this.off(event, onceCallback);
        };

        this.on(event, onceCallback);
    }

    public clear(): void {
        this.events.clear();
    }
}