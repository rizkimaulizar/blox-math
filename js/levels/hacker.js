import { state } from '../state.js';

function getRandom(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

export function start(container) {
    state.questions = [];
    const op = state.operation;
    
    if (op === 'hacker_balloon') {
        for (let i = 0; i < 15; i++) {
            let n1 = 0, n2 = 0;
            if (i < 5) { n1 = getRandom(2, 9); n2 = getRandom(2, 9); } 
            else if (i < 10) { n1 = getRandom(11, 19); n2 = getRandom(2, 5); } 
            else { const bases = [20, 25, 30, 40, 50, 60]; n1 = bases[getRandom(0, bases.length - 1)]; n2 = getRandom(2, 5); }
            if (Math.random() > 0.5) [n1, n2] = [n2, n1];
            const ans = n1 * n2;
            const missingPart = Math.floor(Math.random() * 3); 
            let answer = 0;
            if (missingPart === 0) answer = n1; else if (missingPart === 1) answer = n2; else answer = ans;

            const optionsSet = new Set(); optionsSet.add(answer);
            while (optionsSet.size < 10) { let fake = getRandom(Math.max(1, answer - 20), answer + 20); if (fake !== answer) optionsSet.add(fake); }
            const rawOptions = Array.from(optionsSet);
            for (let k = rawOptions.length - 1; k > 0; k--) { const j = Math.floor(Math.random() * (k + 1)); [rawOptions[k], rawOptions[j]] = [rawOptions[j], rawOptions[k]]; }

            const optionsWithPos = rawOptions.map((val, k) => {
                const baseAngle = k * 36; const randomOffset = getRandom(-15, 15); const angleRad = (baseAngle + randomOffset) * (Math.PI / 180);
                const radius = getRandom(220, 260); const x = Math.cos(angleRad) * radius; const y = Math.sin(angleRad) * radius;
                const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-orange-500'];
                const color = colors[getRandom(0, colors.length - 1)];
                return { val, x, y, color };
            });
            state.questions.push({ num1: n1, num2: n2, product: ans, missingPart, answer, options: optionsWithPos });
        }
    } else if (op === 'hacker_algebra') {
        const iconsPool = ['sword', 'shield', 'gem', 'ghost', 'smile', 'box', 'zap', 'star', 'trophy', 'crown'];
        for (let i = 0; i < 15; i++) {
            // Shuffle
            for (let k = iconsPool.length - 1; k > 0; k--) { const j = Math.floor(Math.random() * (k + 1)); [iconsPool[k], iconsPool[j]] = [iconsPool[j], iconsPool[k]]; }
            let val1 = 0, val2 = 0, answer = 0, symbol = ""; let isValid = false;
            while (!isValid) {
                const ops = ['add', 'sub', 'mul', 'div']; const op = ops[Math.floor(Math.random() * ops.length)];
                val1 = getRandom(1, 10); val2 = getRandom(1, 10);
                if (val1 === val2) continue;
                if (op === 'add') { answer = val1 + val2; symbol = "+"; if (answer !== 1) isValid = true; } 
                else if (op === 'sub') { if (val1 < val2) [val1, val2] = [val2, val1]; answer = val1 - val2; symbol = "-"; if (answer !== 1) isValid = true; } 
                else if (op === 'mul') { answer = val1 * val2; symbol = "x"; if (answer !== 1) isValid = true; } 
                else if (op === 'div') { if (val1 % val2 === 0) { answer = val1 / val2; symbol = ":"; if (answer !== 1) isValid = true; } }
            }
            state.questions.push({ type: 'algebra', keyMap: [...iconsPool], val1, val2, symbol, answer });
        }
    } else if (op === 'hacker_circle') {
        for(let i=0; i<15; i++) {
            const ops = ['add', 'sub', 'mul', 'div']; const op = ops[Math.floor(Math.random() * ops.length)];
            let n1 = 0, n2 = 0, ans = 0, symbol = '';
            const isHard = i >= 10;
            const getSingleDigit = () => getRandom(1, 9); const getTwoDigit = () => getRandom(10, 50);

            if (op === 'mul') { if (isHard) { n1 = getTwoDigit(); n2 = getRandom(2, 5); } else { n1 = getSingleDigit(); n2 = getSingleDigit(); } ans = n1 * n2; symbol = 'x'; } 
            else if (op === 'div') { if (isHard) { n2 = getRandom(2, 9); ans = getTwoDigit(); n1 = n2 * ans; } else { n2 = getSingleDigit(); ans = getSingleDigit(); n1 = n2 * ans; } if (n1 > 50) { n2 = getRandom(2, 5); ans = getRandom(2, 9); n1 = n2 * ans; } symbol = ':'; } 
            else if (op === 'add') { if (isHard) { n1 = getTwoDigit(); n2 = getSingleDigit(); } else { n1 = getSingleDigit(); n2 = getSingleDigit(); } ans = n1 + n2; symbol = '+'; } 
            else { if (isHard) { n1 = getTwoDigit(); n2 = getSingleDigit(); ans = n1 - n2; } else { const a = getSingleDigit(); const b = getSingleDigit(); n1 = Math.max(a, b); n2 = Math.min(a, b); ans = n1 - n2; } symbol = '-'; }

            const midOpts = new Set(); midOpts.add(n2); while (midOpts.size < 10) midOpts.add(getRandom(1, 50));
            const midArr = Array.from(midOpts); for (let k = midArr.length - 1; k > 0; k--) { const j = Math.floor(Math.random() * (k + 1)); [midArr[k], midArr[j]] = [midArr[j], midArr[k]]; }
            const outArr = Array(10).fill(null); outArr[0] = ans; for (let k = outArr.length - 1; k > 0; k--) { const j = Math.floor(Math.random() * (k + 1)); [outArr[k], outArr[j]] = [outArr[j], outArr[k]]; }
            
            state.questions.push({ type: 'circle', num1: n1, num2: n2, ans, symbol, midOptions: midArr, outOptions: outArr });
        }
    }
}
