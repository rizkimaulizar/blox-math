// Global State Store
export const state = {
    score: 0,
    currentLevel: null,
    difficulty: null,
    operation: null,
    questions: [],
    currentIndex: 0,
    combo: 0,
    timeLeft: 0
};

// Reset state helper
export function resetState() {
    state.score = 0;
    state.currentIndex = 0;
    state.combo = 0;
    state.questions = [];
}

// Audio Logic (Preserved)
const SOUND_PATHS = {
    combo: 'assets/sounds/combo.mp3',
    brainLevelUp: 'assets/sounds/brain-level-up.mp3',
    correct: '/assets/sounds/correct-true.mp3',
    wrong: '/assets/sounds/correct-wrong.mp3',
    numeric: '/assets/sounds/numeric.mp3',
    clickMenu: '/assets/sounds/click-menu.mp3'
};

const audioFiles = {
    combo: new Audio(SOUND_PATHS.combo),
    brainLevelUp: new Audio(SOUND_PATHS.brainLevelUp),
    correct: new Audio(SOUND_PATHS.correct),
    wrong: new Audio(SOUND_PATHS.wrong),
    numeric: new Audio(SOUND_PATHS.numeric),
    clickMenu: new Audio(SOUND_PATHS.clickMenu)
};

export const playSFX = (type) => {
    // Basic file based SFX
    if (['click-menu', 'numeric', 'wrong', 'combo', 'levelup', 'correct'].includes(type)) {
        const key = type === 'levelup' ? 'brainLevelUp' : type === 'click-menu' ? 'clickMenu' : type;
        if(audioFiles[key]) {
            audioFiles[key].currentTime = 0;
            audioFiles[key].play().catch(() => {});
        }
        return;
    }

    // Web Audio API fallback/synthesis (Preserved from source)
    if (typeof window === 'undefined') return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    
    const ctx = new AudioContext();
    if (ctx.state === 'suspended') ctx.resume();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    const now = ctx.currentTime;

    if (type === 'click' || type === 'rotate') { // Added rotate to click logic
        osc.type = 'sine'; osc.frequency.setValueAtTime(800, now); osc.frequency.exponentialRampToValueAtTime(300, now + 0.1); gain.gain.setValueAtTime(0.05, now); gain.gain.linearRampToValueAtTime(0.01, now + 0.1); osc.start(now); osc.stop(now + 0.1);
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
};
