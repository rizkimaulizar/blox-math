// audio.js

// Path ke file aset suara
const SOUND_PATHS = {
  combo: '/assets/sounds/combo.mp3',
  brainLevelUp: '/assets/sounds/brain-level-up.mp3',
  correct: '/assets/sounds/correct.mp3'
};

// Objek untuk menyimpan Audio file yang sudah di-load
const audioFiles = {
  combo: new Audio(SOUND_PATHS.combo),
  brainLevelUp: new Audio(SOUND_PATHS.brainLevelUp),
  correct: new Audio(SOUND_PATHS.correct)
};

export const playSFX = (type) => {
  if (typeof window === 'undefined') return;

  // --- Opsi 1: Prioritaskan File MP3 jika ada di folder assets ---
  if (type === 'combo') {
    audioFiles.combo.currentTime = 0;
    audioFiles.combo.play().catch(() => {}); // Catch error jika file tidak ada/gagal
    // Tetap jalankan synth di bawah sebagai backup atau layer tambahan jika mau
    // return; 
  }
  if (type === 'levelup') { // Mapping 'levelup' ke file brain-level-up
    audioFiles.brainLevelUp.currentTime = 0;
    audioFiles.brainLevelUp.play().catch(() => {});
  }
  if (type === 'correct') {
    audioFiles.correct.currentTime = 0;
    audioFiles.correct.play().catch(() => {});
    // Jika file correct.mp3 ada, kita bisa return agar tidak double suara
    // return;
  }

  // --- Opsi 2: Web Audio API (Synthesizer dari kode asli Anda) ---
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;
  
  const ctx = new AudioContext();
  if (ctx.state === 'suspended') ctx.resume();

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.connect(gain);
  gain.connect(ctx.destination);

  const now = ctx.currentTime;

  if (type === 'click') {
      osc.type = 'sine'; osc.frequency.setValueAtTime(800, now); osc.frequency.exponentialRampToValueAtTime(300, now + 0.1); gain.gain.setValueAtTime(0.05, now); gain.gain.linearRampToValueAtTime(0.01, now + 0.1); osc.start(now); osc.stop(now + 0.1);
  } else if (type === 'rotate') {
      osc.type = 'sawtooth'; osc.frequency.setValueAtTime(100, now); osc.frequency.linearRampToValueAtTime(50, now + 0.1); gain.gain.setValueAtTime(0.03, now); gain.gain.linearRampToValueAtTime(0.01, now + 0.1); osc.start(now); osc.stop(now + 0.1);
  } else if (type === 'pop') {
      osc.type = 'square'; osc.frequency.setValueAtTime(150, now); osc.frequency.exponentialRampToValueAtTime(10, now + 0.1); gain.gain.setValueAtTime(0.2, now); gain.gain.linearRampToValueAtTime(0.01, now + 0.15); osc.start(now); osc.stop(now + 0.15);
  } else if (type === 'correct') {
      // Synth tetap ada jika file MP3 gagal atau belum ada
      osc.type = 'sine'; osc.frequency.setValueAtTime(523.25, now); osc.frequency.linearRampToValueAtTime(1046.50, now + 0.1); gain.gain.setValueAtTime(0.1, now); gain.gain.linearRampToValueAtTime(0.01, now + 0.4); osc.start(now); osc.stop(now + 0.4);
  } else if (type === 'combo') {
      const notes = [523.25, 659.25, 783.99]; 
      notes.forEach((freq, i) => { const o = ctx.createOscillator(); const g = ctx.createGain(); o.connect(g); g.connect(ctx.destination); o.type = 'sine'; o.frequency.value = freq; const t = now + (i * 0.05); g.gain.setValueAtTime(0.1, t); g.gain.linearRampToValueAtTime(0.01, t + 0.2); o.start(t); o.stop(t + 0.2); });
  } else if (type === 'levelup') {
      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; 
      notes.forEach((freq, i) => { const o = ctx.createOscillator(); const g = ctx.createGain(); o.connect(g); g.connect(ctx.destination); o.type = 'triangle'; o.frequency.value = freq; const t = now + (i * 0.1); g.gain.setValueAtTime(0.1, t); g.gain.linearRampToValueAtTime(0.01, t + 0.3); o.start(t); o.stop(t + 0.3); });
  } else if (type === 'wrong') {
      osc.type = 'sawtooth'; osc.frequency.setValueAtTime(150, now); osc.frequency.linearRampToValueAtTime(100, now + 0.3); gain.gain.setValueAtTime(0.1, now); gain.gain.linearRampToValueAtTime(0.01, now + 0.3); osc.start(now); osc.stop(now + 0.3);
  } else if (type === 'finish') {
      const notes = [523.25, 659.25, 783.99, 1046.50]; const duration = 0.12; osc.disconnect(); notes.forEach((freq, i) => { const o = ctx.createOscillator(); const g = ctx.createGain(); o.connect(g); g.connect(ctx.destination); o.type = 'triangle'; o.frequency.value = freq; const time = now + (i * duration); g.gain.setValueAtTime(0.1, time); g.gain.linearRampToValueAtTime(0.01, time + duration); o.start(time); o.stop(time + duration); });
  }
};

export const playVoiceOver = (text) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'id-ID';
        utterance.rate = 1.1;
        window.speechSynthesis.speak(utterance);
    }
}