// Event handling utilities

export type EventCallback<T = any> = (data: T) => void;

export class EventEmitter<T extends Record<string, any> = {}> {
    private events = new Map<keyof T, Set<EventCallback>>();

    public on<K extends keyof T>(event: K, callback: EventCallback<T[K]>): () => void {
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

    public emit<K extends keyof T>(event: K, data: T[K]): void {
        const callbacks = this.events.get(event);
        if (callbacks) {
            callbacks.forEach(callback => {
                try {
                    callback(data);
                } catch (error) {
                    console.error(`Error in event callback for ${String(event)}:`, error);
                }
            });
        }
    }

    public off<K extends keyof T>(event: K, callback?: EventCallback<T[K]>): void {
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

    public once<K extends keyof T>(event: K, callback: EventCallback<T[K]>): void {
        const onceCallback = (data: T[K]) => {
            callback(data);
            this.off(event, onceCallback);
        };

        this.on(event, onceCallback);
    }

    public clear(): void {
        this.events.clear();
    }
}