import { state } from '../state.js';

export function renderHUD(feedback, userAnswer, maxTime) {
    const isHacker = state.difficulty === 'legend';
    const currentQ = state.questions[state.currentIndex];
    const progressPercent = (state.timeLeft / maxTime) * 100;
    const totalQ = state.questions.length;
    
    // Background and Border Logic
    let bgClass = isHacker ? 'bg-[#0d1117]' : (feedback ? (feedback==='correct'?'bg-[#00b06f]':'bg-[#f44336]') : 'bg-[#232527]');
    if (isHacker && feedback === 'correct') bgClass = 'bg-[#00b06f]';
    if (isHacker && (feedback === 'wrong' || feedback === 'timeout')) bgClass = 'bg-[#f44336]';
    const borderClass = feedback === 'correct' ? 'border-[#00ff41] animate-pulse' : (feedback === 'wrong' || feedback === 'timeout' ? 'border-[#f44336] animate-pulse' : 'border-[#30363d]');

    // Combo HTML
    // PERBAIKAN: Posisi diubah ke '-top-4' (tidak terlalu tinggi) dan '-right-2' (menempel di pojok).
    // Ini memanfaatkan celah margin antara kotak soal dan header Stage.
    let comboHtml = '';
    if (state.difficulty === 'rookie' && state.combo > 1) {
        let comboMsg = "";
        if (state.combo === 3) comboMsg = "Keren!";
        else if (state.combo === 5) comboMsg = "Hebat!";
        else if (state.combo >= 8) comboMsg = "Otak Kamu Panas 🔥";
        
        comboHtml = `
        <div class="absolute -top-4 -right-2 animate-bounce z-50 pointer-events-none origin-bottom-left">
            <div class="bg-orange-500 text-white px-3 py-1 rounded-full font-black border-4 border-yellow-400 shadow-lg rotate-12 flex flex-col items-center scale-90">
                <div class="flex items-center gap-1"><i data-lucide="flame" fill="yellow" class="text-yellow-200" width="16"></i><span class="text-sm">COMBO x${state.combo}</span></div>
                ${comboMsg ? `<div class="text-[9px] text-yellow-100 uppercase tracking-wider leading-none pb-1">${comboMsg}</div>` : ''}
            </div>
        </div>`;
    }

    // Keypad Logic
    let keypadHtml = '';
    if (!['hacker_balloon', 'hacker_circle'].includes(state.operation)) {
        let keys = '';
        for(let i=1; i<=9; i++) keys += `<button data-key="${i}" class="active:translate-y-1 active:border-b-0 rounded-sm border-b-4 p-3 text-2xl font-black transition-all ${isHacker ? 'bg-[#21262d] border-[#30363d] text-[#c9d1d9] hover:bg-[#30363d]' : 'bg-[#9ca3af] hover:bg-[#d1d5db] active:bg-[#6b7280] border-[#4b5563] text-[#1f2937]'}">${i}</button>`;
        keypadHtml = `
        <div class="h-20 flex items-center justify-center text-5xl font-black rounded-md border-4 mb-6 ${feedback === 'correct' ? 'bg-[#00b06f] border-[#008c5a] text-white' : feedback === 'wrong' ? 'bg-[#f44336] border-[#b02e21] text-white' : isHacker ? 'bg-[#0d1117] border-[#30363d] text-[#00ff41]' : 'bg-[#505254] border-[#232527] text-white'}">
            ${userAnswer || '<span class="animate-pulse text-gray-500">?</span>'}
        </div>
        <div class="grid grid-cols-3 gap-2">
            ${keys}
            <button data-action="delete" class="bg-[#f44336] hover:bg-[#ff5f52] active:translate-y-1 active:border-b-0 rounded-sm border-b-4 border-[#b02e21] p-3 text-xl font-black text-white">DEL</button>
            <button data-key="0" class="active:translate-y-1 active:border-b-0 rounded-sm border-b-4 p-3 text-2xl font-black ${isHacker ? 'bg-[#21262d] border-[#30363d] text-[#c9d1d9] hover:bg-[#30363d]' : 'bg-[#9ca3af] hover:bg-[#d1d5db] active:translate-y-1 border-[#4b5563] text-[#1f2937]'}">0</button>
            <button data-action="submit" ${userAnswer === '' ? 'disabled' : ''} class="active:translate-y-1 active:border-b-0 disabled:opacity-50 disabled:active:translate-y-0 text-white rounded-sm border-b-4 p-3 text-xl font-black shadow-lg transition-all ${isHacker ? 'bg-[#00ff41] text-black border-[#00ce35] hover:bg-[#00ff41]/90' : 'bg-[#00b06f] hover:bg-[#00c07f] border-[#008c5a]'}">ENTER</button>
        </div>`;
    }

    // Question Display (Standard/Pro)
    let questionHtml = '';
    if (!['hacker_balloon', 'hacker_circle', 'hacker_algebra'].includes(state.operation)) {
        questionHtml = `<div class="text-6xl font-black flex justify-center items-center gap-4"><span>${currentQ.num1}</span><span class="${isHacker ? "text-white" : "text-[#00b0f4]"}">${currentQ.symbol}</span><span>${currentQ.num2}</span></div>`;
    }

    // Feedback Overlay
    let feedbackOverlay = '';
    if (feedback === 'wrong' || feedback === 'timeout') feedbackOverlay = `<div class="absolute inset-0 flex items-center justify-center z-20 pointer-events-none animate-ping"><span class="text-6xl font-black text-white drop-shadow-[0_4px_0_#000]">OOF!</span></div>`;
    if (feedback === 'correct') feedbackOverlay = `<div class="absolute inset-0 flex items-center justify-center z-20 pointer-events-none animate-bounce-short"><span class="text-6xl font-black drop-shadow-[0_4px_0_#000] stroke-black ${isHacker ? 'text-[#00ff41]' : 'text-[#e29e00]'}">GG!</span></div>`;

    return `
    <div class="min-h-screen ${bgClass} transition-colors duration-200 flex flex-col items-center justify-center p-4 font-sans">
        <div class="w-full max-w-md flex justify-between items-center mb-4 font-black text-xl ${isHacker && !feedback ? 'text-[#00ff41] font-mono' : 'text-white'}">
            <div class="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-md border-b-4 border-black/20"><i data-lucide="star" fill="${isHacker ? "#00ff41" : "#e29e00"}" class="${isHacker ? "text-[#00ff41]" : "text-[#e29e00]"}"></i> ${state.score}</div>
            <div class="bg-black/40 px-4 py-2 rounded-md border-b-4 border-black/20 uppercase text-sm">Stage ${state.currentIndex + 1}/${totalQ}</div>
        </div>
        
        <div id="game-container" class="p-6 rounded-md shadow-2xl max-w-md w-full text-center border-b-8 relative ${isHacker ? `bg-[#161b22] ${borderClass} shadow-[0_0_30px_rgba(0,255,65,0.1)]` : 'bg-[#393b3d] border-[#1a1c1e]'}">
            ${comboHtml} 
            ${feedbackOverlay}
            <div class="h-6 bg-[#1a1c1e] w-full rounded-sm mb-6 p-1"><div class="h-full rounded-sm transition-all duration-100 ease-linear ${progressPercent < 30 ? 'bg-[#f44336]' : (isHacker ? 'bg-[#00ff41]' : 'bg-[#00b0f4]')}" style="width: ${progressPercent}%"></div></div>
            <div id="dynamic-area" class="mb-4">
                ${questionHtml}
            </div>
            ${keypadHtml}
        </div>
    </div>`;
}

export function renderResult(message) {
    const isHacker = state.difficulty === 'legend';
    const maxScore = state.questions.length;
    const percentage = (state.score / maxScore) * 100;
    
    let title = "", iconName = "", color = "", colorClass="";
    if (percentage === 100) { title = isHacker ? "SYSTEM HACKED!" : "HACKER LEVEL!"; iconName = "crown"; color = isHacker ? "text-[#00ff41]" : "text-[#e29e00]"; colorClass=isHacker ? "text-[#00ff41]" : "text-[#e29e00]"; }
    else if (percentage >= 80) { title = "PRO PLAYER!"; iconName = "trophy"; color = "text-[#00b0f4]"; colorClass="text-[#00b0f4]"; }
    else if (percentage >= 50) { title = "NOOB BERBAKAT"; iconName = "medal"; color = "text-[#00b06f]"; colorClass="text-[#00b06f]"; }
    else { title = "TOTAL OOF!"; iconName = "skull"; color = "text-[#f44336]"; colorClass="text-[#f44336]"; }

    return `
    <div class="min-h-screen flex flex-col items-center justify-center p-4 font-sans ${isHacker ? 'bg-[#0d1117]' : 'bg-[#111]'}">
        <div class="absolute inset-0 opacity-20" style="background-image: repeating-linear-gradient(45deg, #333 0, #333 1px, transparent 0, transparent 50%); background-size: 10px 10px"></div>
        <div class="p-8 rounded-md shadow-[0_0_50px_rgba(0,0,0,0.5)] max-w-md w-full text-center border-4 z-10 animate-fade-in relative ${isHacker ? 'bg-[#161b22] border-[#00ff41]' : 'bg-[#232527] border-[#393b3d]'}">
            <div class="flex justify-center mb-6"><div class="p-4 rounded-full border-4 ${isHacker ? 'bg-black border-[#00ff41]' : 'bg-[#1a1c1e] border-[#393b3d]'}"><i data-lucide="${iconName}" class="${colorClass}" width="80" height="80"></i></div></div>
            <h2 class="text-4xl font-black ${color} mb-2 uppercase drop-shadow-[0_2px_0_#000] ${isHacker ? 'font-mono' : ''}">${title}</h2>
            <div class="rounded-md p-4 mb-6 border ${isHacker ? 'bg-black border-[#00ff41] text-[#00ff41]' : 'bg-[#1a1c1e] border-[#393b3d] text-white'}"><p class="font-bold uppercase text-xs mb-1 tracking-widest opacity-70">FINAL SCORE</p><div class="text-6xl font-black">${state.score} <span class="text-2xl opacity-50">/ ${maxScore}</span></div></div>
            <p class="font-bold text-lg mb-8 italic leading-relaxed border-l-4 pl-4 text-left py-2 ${isHacker ? 'text-[#00ff41] border-[#00ff41] bg-[#00ff41]/10 font-mono' : 'text-gray-300 border-[#00b0f4] bg-[#00000030]'}">"${message}"</p>
            <div class="flex gap-3">
                <button data-action="mission-change" class="flex-1 bg-[#393b3d] hover:bg-[#4b4d4f] text-white font-black py-4 rounded-md border-b-4 border-[#1a1c1e] active:border-b-0 active:translate-y-1 transition-all uppercase">GANTI MISI</button>
                <button data-action="respawn" class="flex-1 text-white font-black py-4 rounded-md border-b-4 active:border-b-0 active:translate-y-1 transition-all flex items-center justify-center gap-2 uppercase ${isHacker ? 'bg-[#00ff41] text-black border-[#00ce35] hover:bg-[#00ff41]/90' : 'bg-[#00b0f4] hover:bg-[#34c3ff] border-[#0077a6]'}"><i data-lucide="refresh-ccw" width="20"></i> Re-Spawn</button>
            </div>
            <div class="mt-4 flex justify-center"><button data-action="replay-voice" class="flex items-center gap-2 text-xs font-bold uppercase tracking-widest ${isHacker ? 'text-[#00ff41]' : 'text-[#00b0f4] hover:text-white'}"><i data-lucide="volume-2" width="14"></i> Replay Voice</button></div>
        </div>
    </div>`;
}

// 🔹 Adapter for new GameSession system
export function updateProgress(currentIndex, total) {
  const stageEl = document.querySelector('[data-hud-stage]');
  if (stageEl) {
    stageEl.textContent = `Stage ${currentIndex + 1}/${total}`;
  }
}
