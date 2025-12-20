// Simple sound effects using Web Audio API
class SoundManager {
  constructor() {
    this.audioContext = null;
    this.enabled = true;
    this.initAudio();
  }

  initAudio() {
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      console.warn('Web Audio API not supported');
      this.enabled = false;
    }
  }

  // Create a simple beep sound
  createBeep(frequency, duration, type = 'sine') {
    if (!this.enabled || !this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = type;

    gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  // Food eaten sound
  playEat() {
    this.createBeep(800, 0.1, 'square');
    setTimeout(() => this.createBeep(1000, 0.1, 'square'), 50);
  }

  // Game over sound
  playGameOver() {
    this.createBeep(200, 0.5, 'sawtooth');
    setTimeout(() => this.createBeep(150, 0.5, 'sawtooth'), 200);
    setTimeout(() => this.createBeep(100, 0.8, 'sawtooth'), 400);
  }

  // Direction change sound
  playMove() {
    this.createBeep(400, 0.05, 'square');
  }

  // AI toggle sound
  playToggle() {
    this.createBeep(600, 0.1, 'triangle');
    setTimeout(() => this.createBeep(900, 0.1, 'triangle'), 100);
  }

  // Food evasion sound
  playFoodMove() {
    this.createBeep(300, 0.03, 'triangle');
  }
}

export const soundManager = new SoundManager();