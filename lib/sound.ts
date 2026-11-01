'use client';
// Soft UI sounds synthesised with Web Audio: no audio files, nothing to license, nothing to download.
// Browsers only allow sound after a tap, which is the only time these play.
let context: AudioContext | null = null;

function play(notes: { freq: number; at: number; length: number }[], type: OscillatorType = 'sine', volume = 0.07) {
  try {
    const AudioCtor = window.AudioContext ?? (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtor) return;
    context ??= new AudioCtor();
    const now = context.currentTime;
    for (const note of notes) {
      const osc = context.createOscillator(), gain = context.createGain();
      osc.type = type; osc.frequency.value = note.freq;
      gain.gain.setValueAtTime(0, now + note.at);
      gain.gain.linearRampToValueAtTime(volume, now + note.at + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + note.at + note.length);
      osc.connect(gain).connect(context.destination);
      osc.start(now + note.at); osc.stop(now + note.at + note.length + 0.05);
    }
  } catch { /* Sound is optional; never break the page over it. */ }
}

export const sounds = {
  tap: () => play([{ freq: 523, at: 0, length: 0.14 }, { freq: 784, at: 0.07, length: 0.18 }]),
  splash: () => play([{ freq: 330, at: 0, length: 0.25 }, { freq: 262, at: 0.12, length: 0.3 }], 'triangle', 0.05),
  arrive: () => play([{ freq: 659, at: 0, length: 0.3 }, { freq: 784, at: 0.12, length: 0.3 }, { freq: 1047, at: 0.24, length: 0.45 }]),
  locked: () => play([{ freq: 247, at: 0, length: 0.16 }, { freq: 220, at: 0.12, length: 0.2 }], 'triangle', 0.05),
};
