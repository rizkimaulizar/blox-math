import { state } from '../state.js';

export function renderHome() {
    return `
    <div class="min-h-screen bg-gradient-to-b from-[#0099ff] to-[#aeeaff] flex flex-col items-center justify-center p-6 font-sans relative overflow-hidden">
        <div class="absolute inset-0 opacity-20" style="background-image: radial-gradient(#ffffff 6px, transparent 6px), radial-gradient(#ffffff 6px, transparent 6px); background-size: 50px 50px; background-position: 0 0, 25px 25px"></div>
        <div class="text-center mb-8 z-10 animate-bounce-short relative">
            <h1 class="text-6xl font-black text-white mb-2 tracking-tighter transform -rotate-2" style="font-family: 'Arial Black', sans-serif; text-shadow: 4px 4px 0 #000, -2px -2px 0 #0066cc; -webkit-text-stroke: 2px black;">BLOX <span class="text-[#ffd700]">MATH</span></h1>
            <div class="inline-block bg-white/20 px-6 py-2 rounded-xl text-white font-black text-sm border-2 border-white/50 backdrop-blur-md shadow-xl transform rotate-1 mt-2">VERSI TYCOON</div>
        </div>
        <div class="flex flex-col gap-4 w-full max-w-sm z-10">
            <button data-action="diff-rookie" class="group relative bg-[#00b06f] hover:bg-[#00c07f] text-white p-4 rounded-xl border-b-8 border-[#008c5a] active:border-b-0 active:translate-y-2 transition-all flex items-center justify-between shadow-2xl">
                <div class="flex items-center gap-4"><div class="bg-white/20 p-2 rounded-lg backdrop-blur-sm"><i data-lucide="box" class="text-white" width="32" height="32"></i></div><div class="text-left"><div class="text-2xl font-black uppercase drop-shadow-md">NOOB</div><div class="text-green-100 text-xs font-bold uppercase">Mode Santai</div></div></div><div class="bg-black/20 px-3 py-1 rounded text-xs font-bold border border-white/20">LVL 1</div>
            </button>
            <button data-action="diff-pro" class="group relative bg-[#2a52be] hover:bg-[#3a62ce] text-white p-4 rounded-xl border-b-8 border-[#1a329e] active:border-b-0 active:translate-y-2 transition-all flex items-center justify-between shadow-2xl">
                <div class="flex items-center gap-4"><div class="bg-white/20 p-2 rounded-lg backdrop-blur-sm"><i data-lucide="shield" width="32" height="32"></i></div><div class="text-left"><div class="text-2xl font-black uppercase drop-shadow-md">PRO</div><div class="text-blue-100 text-xs font-bold uppercase">Mode Serius</div></div></div><div class="bg-black/20 px-3 py-1 rounded text-xs font-bold border border-white/20">LVL 10</div>
            </button>
            <button data-action="diff-legend" class="group relative bg-[#111827] hover:bg-[#1f2937] text-white p-4 rounded-xl border-b-8 border-black active:border-b-0 active:translate-y-2 transition-all flex items-center justify-between shadow-2xl">
                <div class="flex items-center gap-4"><div class="bg-[#00ff41] p-2 rounded-lg backdrop-blur-sm animate-pulse"><i data-lucide="terminal" class="text-black" width="32" height="32"></i></div><div class="text-left"><div class="text-2xl font-black uppercase drop-shadow-md text-[#00ff41]">HACKER</div><div class="text-green-900 bg-[#00ff41] px-1 rounded text-[10px] font-bold uppercase inline-block">Glitch Mode</div></div></div><div class="bg-[#00ff41]/20 px-3 py-1 rounded text-xs font-bold text-[#00ff41] border border-[#00ff41]/50">LVL 99</div>
            </button>
        </div>
    </div>`;
}

export function renderOperationMenu(isPro) {
    const bgClass = isPro ? 'bg-[#2a52be]' : 'bg-[#00b06f]';
    const btnClass = isPro ? 'bg-[#1a329e] border-[#102060]' : 'bg-[#008c5a] border-[#006e46]';
    const title = isPro ? 'PRO' : 'NOOB';
    
    let content = '';
    if (!isPro) {
        ['add','sub','mul','div'].forEach(op => {
            const color = op==='add'?'text-blue-400':op==='sub'?'text-red-400':op==='mul'?'text-yellow-400':'text-purple-400';
            const icon = op==='add'?'plus':op==='sub'?'minus':op==='mul'?'x':op==='div'?'divide':'circle';
            const text = op==='add'?'TAMBAH':op==='sub'?'KURANG':op==='mul'?'KALI':'BAGI';
            content += `<button data-op="${op}" class="bg-[#393b3d] border-[#232527] border-b-8 hover:brightness-110 active:border-b-0 active:translate-y-2 aspect-square rounded-md flex flex-col items-center justify-center gap-2 group transition-all">
                <div class="p-2 rounded group-hover:scale-110 transition-transform ${color}"><i data-lucide="${icon}" width="40" height="40" stroke-width="4"></i></div>
                <span class="text-xl font-black text-white uppercase">${text}</span>
            </button>`;
        });
        content = `<div class="grid grid-cols-2 gap-4 w-full max-w-md z-10">${content}</div>`;
    } else {
        content = `
        <div class="flex flex-col gap-4 w-full max-w-md z-10">
            <button data-op="mix_add_sub" class="bg-[#393b3d] text-white p-5 rounded-md border-b-8 border-[#232527] active:translate-y-2 flex items-center justify-between"><div class="flex gap-4"><div class="bg-[#00b0f4] p-3 rounded text-white"><i data-lucide="sword" width="32" height="32"></i></div><div class="text-left"><div class="text-2xl font-black">ADVENTURE</div><div class="text-xs font-bold text-gray-400">+ & -</div></div></div><div class="bg-black/30 px-3 py-1 rounded">20 SOAL</div></button>
            <button data-op="mix_mul_div" class="bg-[#393b3d] text-white p-5 rounded-md border-b-8 border-[#232527] active:translate-y-2 flex items-center justify-between"><div class="flex gap-4"><div class="bg-[#e29e00] p-3 rounded text-white"><i data-lucide="hexagon" width="32" height="32"></i></div><div class="text-left"><div class="text-2xl font-black">DUNGEON</div><div class="text-xs font-bold text-gray-400">x & :</div></div></div><div class="bg-black/30 px-3 py-1 rounded">20 SOAL</div></button>
            <button data-op="mix_all" class="bg-[#393b3d] text-white p-5 rounded-md border-b-8 border-[#232527] active:translate-y-2 flex items-center justify-between"><div class="flex gap-4"><div class="bg-[#f44336] p-3 rounded text-white"><i data-lucide="skull" width="32" height="32"></i></div><div class="text-left"><div class="text-2xl font-black">BOSS RAID</div><div class="text-xs font-bold text-gray-400">SEMUA</div></div></div><div class="bg-black/30 px-3 py-1 rounded">25 SOAL</div></button>
        </div>`;
    }

    return `
    <div class="min-h-screen ${bgClass} flex flex-col items-center justify-center p-4">
        <div class="w-full max-w-md mb-6 flex items-center z-10 relative">
            <button data-action="back-home" class="p-3 rounded-md text-white border-b-4 active:border-b-0 active:translate-y-1 transition-all ${btnClass}"><i data-lucide="chevron-left" width="28" height="28" stroke-width="3"></i></button>
            <h2 class="text-3xl font-black text-white ml-4 drop-shadow-md uppercase tracking-tight">MENU ${title}</h2>
        </div>
        ${content}
    </div>`;
}

export function renderHackerMenu() {
    return `
    <div class="min-h-screen bg-[#0d1117] flex flex-col items-center justify-center p-4 relative overflow-hidden">
        <div class="absolute inset-0 opacity-10" style="background-image: linear-gradient(0deg, transparent 24%, #00ff41 25%, #00ff41 26%, transparent 27%, transparent 74%, #00ff41 75%, #00ff41 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, #00ff41 25%, #00ff41 26%, transparent 27%, transparent 74%, #00ff41 75%, #00ff41 76%, transparent 77%, transparent); background-size: 50px 50px"></div>
        <div class="w-full max-w-md mb-6 flex items-center z-10 relative">
            <button data-action="back-home" class="bg-[#161b22] p-3 rounded-md text-[#00ff41] border border-[#00ff41] hover:bg-[#00ff41] hover:text-black transition-all"><i data-lucide="chevron-left" width="28" height="28" stroke-width="3"></i></button>
            <h2 class="text-3xl font-black text-[#00ff41] ml-4 drop-shadow-[0_0_10px_#00ff41] uppercase tracking-tight font-mono">TERMINAL</h2>
        </div>
        <div class="flex flex-col gap-4 w-full max-w-md z-10">
            <button data-op="hacker_balloon" class="group relative bg-[#161b22] hover:bg-[#00ff41]/10 text-white p-5 rounded-md border border-[#00ff41] active:translate-y-1 transition-all flex items-center justify-between shadow-[0_0_15px_rgba(0,255,65,0.1)]">
                <div class="flex items-center gap-4"><div class="bg-[#00ff41]/20 p-3 rounded-full border border-[#00ff41] animate-pulse"><i data-lucide="circle" class="text-[#00ff41]" width="32" height="32"></i></div><div class="text-left"><div class="text-2xl font-black uppercase text-[#00ff41] font-mono">BALON HACKER</div><div class="text-[#00ff41]/70 text-xs font-bold uppercase font-mono">ISI KOSONG • 10 DETIK</div></div></div>
            </button>
            <button data-op="hacker_algebra" class="group relative bg-[#161b22] hover:bg-[#00ff41]/10 text-white p-5 rounded-md border border-[#00ff41] active:translate-y-1 transition-all flex items-center justify-between shadow-[0_0_15px_rgba(0,255,65,0.1)]">
                <div class="flex items-center gap-4"><div class="bg-[#00ff41]/20 p-3 rounded-full border border-[#00ff41] animate-pulse"><i data-lucide="code" class="text-[#00ff41]" width="32" height="32"></i></div><div class="text-left"><div class="text-2xl font-black uppercase text-[#00ff41] font-mono">CODE BREAKER</div><div class="text-[#00ff41]/70 text-xs font-bold uppercase font-mono">PEMECAH SANDI • 9 DETIK</div></div></div>
            </button>
            <button data-op="hacker_circle" class="group relative bg-[#161b22] hover:bg-[#00ff41]/10 text-white p-5 rounded-md border border-[#00ff41] active:translate-y-1 transition-all flex items-center justify-between shadow-[0_0_15px_rgba(0,255,65,0.1)]">
                <div class="flex items-center gap-4"><div class="bg-[#00ff41]/20 p-3 rounded-full border border-[#00ff41] animate-pulse"><i data-lucide="settings" class="text-[#00ff41]" width="32" height="32"></i></div><div class="text-left"><div class="text-2xl font-black uppercase text-[#00ff41] font-mono">CYBER CIRCLE</div><div class="text-[#00ff41]/70 text-xs font-bold uppercase font-mono">PUTAR & COCOKKAN • 13 DETIK</div></div></div>
            </button>
        </div>
    </div>`;
}

export function renderTableSelect() {
    let btns = '';
    for(let i=1; i<=10; i++) {
        btns += `<button data-table="${i}" class="bg-[#00b0f4] hover:bg-[#34c3ff] active:translate-y-1 active:border-b-0 text-white text-2xl font-black py-3 rounded-md border-b-4 border-[#0077a6] transition-all">LEVEL ${i}</button>`;
    }
    return `
    <div class="min-h-screen bg-[#e29e00] flex flex-col items-center justify-center p-4">
        <div class="bg-[#232527] p-6 rounded-md shadow-xl max-w-md w-full text-center border-b-8 border-black z-10">
            <div class="flex justify-between items-center mb-6"><button data-action="back-rookie" class="text-gray-400 hover:text-white font-black">&lt; KEMBALI</button><h2 class="text-2xl font-black text-white uppercase">Pilih Angka</h2></div>
            <div class="grid grid-cols-2 gap-3">${btns}</div>
        </div>
    </div>`;
}

export function renderIntro(op, table, diff) {
    let title = "", bgColor = "bg-[#00b0f4]", maxTime = 7, totalQuestions = 10;
    if (op === 'add') { title = table ? `TAMBAH: LEVEL ${table}` : "OBBY: TAMBAH"; bgColor = "bg-[#00b0f4]"; }
    else if (op === 'sub') { title = table ? `KURANG: LEVEL ${table}` : "OBBY: KURANG"; bgColor = "bg-[#f44336]"; }
    else if (op === 'mul') { title = table ? `KALI: LEVEL ${table}` : `OBBY: KALI`; bgColor = "bg-[#e29e00]"; }
    else if (op === 'div') { title = table ? `BAGI: LEVEL ${table}` : "OBBY: BAGI"; bgColor = "bg-[#9059ff]"; }
    else if (op === 'mix_add_sub') { title = "ADV: CAMPURAN 1"; bgColor = "bg-[#2a52be]"; totalQuestions = 20; }
    else if (op === 'mix_mul_div') { title = "DUNG: CAMPURAN 2"; bgColor = "bg-[#2a52be]"; totalQuestions = 20; }
    else if (op === 'mix_all') { title = "RAID: SEMUA"; bgColor = "bg-[#2a52be]"; totalQuestions = 25; }
    else if (op === 'hacker_balloon') { title = "BALON HACKER"; bgColor = "bg-[#0d1117]"; totalQuestions = 15; maxTime = 10; }
    else if (op === 'hacker_algebra') { title = "CODE BREAKER"; bgColor = "bg-[#0d1117]"; totalQuestions = 15; maxTime = 9; }
    else if (op === 'hacker_circle') { title = "CYBER CIRCLE"; bgColor = "bg-[#0d1117]"; totalQuestions = 15; maxTime = 13; }

    const isHacker = ['hacker_balloon', 'hacker_algebra', 'hacker_circle'].includes(op);

    return `
    <div class="min-h-screen ${bgColor} flex flex-col items-center justify-center p-4">
        <div class="absolute inset-0 opacity-20" style="background-image: linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000); background-size: 40px 40px; background-position: 0 0, 20px 20px"></div>
        <div class="p-8 rounded-md shadow-2xl max-w-sm w-full text-center border-4 z-10 ${isHacker ? 'bg-[#161b22] border-[#00ff41]' : 'bg-[#232527] border-white'}">
            <h2 class="text-2xl font-black mb-2 uppercase tracking-wide ${isHacker ? 'text-[#00ff41] font-mono' : 'text-white'}">${title}</h2>
            <div class="p-4 rounded mb-6 border-2 ${isHacker ? 'bg-black border-[#00ff41]/50' : 'bg-[#393b3d] border-[#505254]'}">
                <p class="font-bold ${isHacker ? 'text-[#00ff41]' : 'text-gray-300'}">MISI:</p><p class="text-white text-lg">${op === 'hacker_balloon' ? 'Isi Balon Kosong' : op === 'hacker_algebra' ? 'Pecahkan Kode' : op === 'hacker_circle' ? 'Putar Roda Gigi' : `Jawab ${totalQuestions} Soal`}</p>
                <div class="h-px bg-gray-600 my-2"></div>
                <p class="font-bold ${isHacker ? 'text-[#00ff41]' : 'text-gray-300'}">TIMER:</p><p class="${isHacker ? 'text-[#00ff41] font-mono' : 'text-[#f44336]'} font-black text-xl">${maxTime} Detik</p>
            </div>
            <button data-action="start-game" data-maxtime="${maxTime}" class="w-full text-3xl font-black py-4 rounded-md active:translate-y-2 transition-all flex items-center justify-center gap-2 uppercase ${isHacker ? 'bg-[#00ff41] text-black hover:bg-[#00ff41]/80 shadow-[0_0_15px_#00ff41]' : 'bg-[#00b06f] hover:bg-[#00c07f] text-white border-b-8 border-[#008c5a] active:border-b-0'}">GAS KAN!</button>
            <button data-action="cancel-intro" class="mt-6 text-gray-400 font-bold hover:text-white uppercase text-sm">Batal Misi</button>
        </div>
    </div>`;
}
