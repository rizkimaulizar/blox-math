import { state } from '../state.js';
import { renderHUD } from '../ui/hud.js';

export function start(container, onComplete) {
    // Generate Questions
    const count = 10;
    state.questions = [];
    let uniqueModifiers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    // Shuffle
    for (let i = uniqueModifiers.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [uniqueModifiers[i], uniqueModifiers[j]] = [uniqueModifiers[j], uniqueModifiers[i]]; }

    const table = state.currentLevel; // The selected number (1-10)
    const op = state.operation;

    for (let i = 0; i < count; i++) {
        let n1 = 0, n2 = 0, ans = 0, symbol = '';
        const mod = i < uniqueModifiers.length ? uniqueModifiers[i] : Math.floor(Math.random() * 10) + 1;
        
        if (op === 'mul') { n1 = table; n2 = mod; ans = n1 * n2; symbol = 'x'; } 
        else if (op === 'div') { n2 = table; ans = mod; n1 = n2 * ans; symbol = ':'; }
        else if (op === 'add') { n1 = table; n2 = mod; ans = n1 + n2; symbol = '+'; }
        else if (op === 'sub') { n2 = table; ans = mod; n1 = ans + n2; symbol = '-'; }
        
        state.questions.push({ num1: n1, num2: n2, answer: ans, symbol });
    }

    // Since Level 1 & 2 share mechanics, we rely on App.js loop, 
    // but ensuring state is prepped.
    // The render is handled by App.js using renderHUD
}
