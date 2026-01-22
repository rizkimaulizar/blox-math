import { state } from '../state.js';

function getRandom(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

export function start(container) {
    const opMode = state.operation;
    const qList = [];
    const history = new Set();
    let totalQ = 20; let limitMedium = 5; let limitHard = 11; 
    if (opMode === 'mix_all') { totalQ = 25; limitMedium = 5; limitHard = 12; }

    for (let i = 0; i < totalQ; i++) {
        let stage = 'easy';
        if (i >= limitMedium) stage = 'medium'; if (i >= limitHard) stage = 'hard';
        let valid = false; let q = {}; let attempts = 0;

        while (!valid && attempts < 100) {
            attempts++;
            let currentOp = 'add';
            if (opMode === 'mix_add_sub') currentOp = Math.random() > 0.5 ? 'add' : 'sub';
            else if (opMode === 'mix_mul_div') currentOp = Math.random() > 0.5 ? 'mul' : 'div';
            else { const r = Math.random(); if (r < 0.25) currentOp = 'add'; else if (r < 0.5) currentOp = 'sub'; else if (r < 0.75) currentOp = 'mul'; else currentOp = 'div'; }

            let n1 = 0, n2 = 0, ans = 0;
            if (currentOp === 'add') {
                if (stage === 'easy') { n1 = getRandom(2, 20); n2 = getRandom(2, 20); }
                else if (stage === 'medium') { n1 = getRandom(20, 50); n2 = getRandom(10, 50); }
                else { n1 = getRandom(50, 100); n2 = getRandom(20, 80); } 
                ans = n1 + n2;
            } else if (currentOp === 'sub') {
                if (stage === 'easy') { n1 = getRandom(5, 20); n2 = getRandom(2, 10); }
                else if (stage === 'medium') { n1 = getRandom(20, 60); n2 = getRandom(5, 30); }
                else { n1 = getRandom(50, 100); n2 = getRandom(10, 50); }
                if (n1 < n2) [n1, n2] = [n2, n1];
                ans = n1 - n2;
            } else if (currentOp === 'mul') {
                if (stage === 'easy') { n1 = getRandom(2, 9); n2 = getRandom(2, 9); }
                else if (stage === 'medium') { n1 = getRandom(10, 15); n2 = getRandom(2, 9); }
                else { n1 = getRandom(10, 20); n2 = getRandom(2, 9); }
                if (Math.random() > 0.5) [n1, n2] = [n2, n1];
                ans = n1 * n2;
            } else if (currentOp === 'div') {
                let qVal = 0; 
                if (stage === 'easy') { qVal = getRandom(2, 9); n2 = getRandom(2, 5); }
                else if (stage === 'medium') { qVal = getRandom(2, 12); n2 = getRandom(3, 9); }
                else { qVal = getRandom(10, 20); n2 = getRandom(2, 9); }
                n1 = n2 * qVal; ans = qVal;
            }

            if (ans <= 0) continue; 
            if (currentOp === 'div' && n1 === n2) continue; 

            const sig = `${n1}${currentOp}${n2}`;
            if (!history.has(sig)) { 
                history.add(sig); 
                let symbol = ''; 
                if(currentOp==='add') symbol='+'; if(currentOp==='sub') symbol='-'; 
                if(currentOp==='mul') symbol='x'; if(currentOp==='div') symbol=':'; 
                q = { num1: n1, num2: n2, answer: ans, symbol }; 
                valid = true; 
            }
        }
        qList.push(q);
    }
    state.questions = qList;
}
