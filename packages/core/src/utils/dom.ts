// DOM manipulation utilities

export interface ElementPosition {
    top: number;
    left: number;
    width: number;
    height: number;
}

export class DOMUtils {
    // Get element position relative to viewport
    static getElementPosition(element: HTMLElement): ElementPosition {
        const rect = element.getBoundingClientRect();
        return {
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height
        };
    }

    // Check if element is in viewport
    static isInViewport(element: HTMLElement): boolean {
        const { top, left, bottom, right } = element.getBoundingClientRect();
        return (
            top >= 0 &&
            left >= 0 &&
            bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Add class with animation support
    static addClass(element: HTMLElement, className: string): void {
        if (!element.classList.contains(className)) {
            element.classList.add(className);
        }
    }

    // Remove class with animation support
    static removeClass(element: HTMLElement, className: string): void {
        element.classList.remove(className);
    }

    // Toggle class
    static toggleClass(element: HTMLElement, className: string): boolean {
        return element.classList.toggle(className);
    }

    // Set CSS custom property
    static setCustomProperty(element: HTMLElement, property: string, value: string): void {
        element.style.setProperty(`--${property}`, value);
    }

    // Create element with classes and attributes
    static createElement<T extends keyof HTMLElementTagNameMap>(
        tag: T,
        options?: {
            classes?: string[];
            attributes?: Record<string, string>;
            content?: string;
            parent?: HTMLElement;
        }
    ): HTMLElementTagNameMap[T] {
        const element = document.createElement(tag);

        if (options?.classes) {
            element.classList.add(...options.classes);
        }

        if (options?.attributes) {
            Object.entries(options.attributes).forEach(([key, value]) => {
                element.setAttribute(key, value);
            });
        }

        if (options?.content) {
            element.textContent = options.content;
        }

        if (options?.parent) {
            options.parent.appendChild(element);
        }

        return element;
    }

    // Focus trap for modals
    static trapFocus(element: HTMLElement): () => void {
        const focusableElements = element.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        ) as NodeListOf<HTMLElement>;

        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];

        const handleTabKey = (e: KeyboardEvent) => {
            if (e.key !== 'Tab') return;

            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    lastFocusable?.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    firstFocusable?.focus();
                    e.preventDefault();
                }
            }
        };

        element.addEventListener('keydown', handleTabKey);
        firstFocusable?.focus();

        // Return cleanup function
        return () => {
            element.removeEventListener('keydown', handleTabKey);
        };
    }
}