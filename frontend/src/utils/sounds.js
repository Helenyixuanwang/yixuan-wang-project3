import { Howl } from 'howler';

class SoundManager {
  constructor() {
    this.sounds = {
      // Error sound - plays when invalid move
      error: new Howl({
        src: ['/sounds/error.mp3'],
        volume: 0.4,
        preload: true
      }),
      
      // Success sound - plays when puzzle completed
      success: new Howl({
        src: ['/sounds/success.mp3'],
        volume: 0.5,
        preload: true
      })
    };
  }

  play(soundName) {
    const sound = this.sounds[soundName];
    if (sound) {
      sound.play();
    }
  }

  // Optional: Stop all sounds
  stopAll() {
    Object.values(this.sounds).forEach(sound => sound.stop());
  }
}

// Export single instance
export const soundManager = new SoundManager();