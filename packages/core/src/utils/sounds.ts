// Sound utilities for MinecraftUI

export interface SoundOptions {
    frequency: number;
    duration?: number;
    type?: OscillatorType;
    volume?: number;
}

export class MinecraftSounds {
    private audioContext: AudioContext | null = null;
    private isSupported = true;

    constructor() {
        this.initAudioContext();
    }

    private initAudioContext(): void {
        try {
            this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        } catch (error) {
            console.warn('Web Audio API not supported:', error);
            this.isSupported = false;
        }
    }

    private playSound(options: SoundOptions): void {
        if (!this.isSupported || !this.audioContext) {
            return;
        }

        const {
            frequency,
            duration = 0.1,
            type = 'square',
            volume = 0.3
        } = options;

        try {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);

            oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
            oscillator.type = type;
            gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + duration);
        } catch (error) {
            console.warn('Failed to play sound:', error);
        }
    }

    // Predefined Minecraft-style sounds
    public playBlockBreak(): void {
        this.playSound({ frequency: 220, duration: 0.1, type: 'square' });
    }

    public playBlockPlace(): void {
        this.playSound({ frequency: 440, duration: 0.08, type: 'square' });
    }

    public playButtonClick(): void {
        this.playSound({ frequency: 550, duration: 0.05, type: 'square' });
    }

    public playError(): void {
        this.playSound({ frequency: 150, duration: 0.2, type: 'sawtooth' });
    }

    public playSuccess(): void {
        this.playSound({ frequency: 660, duration: 0.15, type: 'sine' });
    }

    public playNotification(): void {
        this.playSound({ frequency: 800, duration: 0.1, type: 'triangle' });
    }

    public playInventoryOpen(): void {
        this.playSound({ frequency: 400, duration: 0.12, type: 'square' });
    }

    public playInventoryClose(): void {
        this.playSound({ frequency: 300, duration: 0.12, type: 'square' });
    }

    // Custom sound method
    public playCustomSound(options: SoundOptions): void {
        this.playSound(options);
    }

    // Check if sounds are supported
    public get soundsSupported(): boolean {
        return this.isSupported;
    }

    // Cleanup method
    public dispose(): void {
        if (this.audioContext && this.audioContext.state !== 'closed') {
            this.audioContext.close();
        }
    }
}

// Singleton instance
export const minecraftSounds = new MinecraftSounds();