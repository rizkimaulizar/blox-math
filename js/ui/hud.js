import { state } from '../state.js';

/**
 * HUD AMAN & KOMPATIBEL
 * - Cocok dengan app.js lama
 * - Cocok dengan GameSession
 * - Fokus LEVEL NOOB
 */

export function renderHUD(feedback = null, userAnswer = '', maxTime = 7) {
  const current = state.currentIndex + 1;
  const total = state.questions.length || 1;
  const score = state.score || 0;

  return `
    <div class="min-h-screen bg-[#232527] flex flex-col items-center justify-center p-4 text-white">
      
      <div class="w-full max-w-md mb-4 flex justify-between font-black text-xl">
        <div data-hud-score>🧱 ${score}</div>
        <div data-hud-stage>Stage ${current}/${total}</div>
      </div>

      <div class="bg-[#393b3d] p-6 rounded-md shadow-xl w-full max-w-md text-center relative">

        ${feedback === 'correct' ? `<div class="absolute inset-0 flex items-center justify-center text-6xl font-black text-green-400">GG!</div>` : ''}
        ${feedback === 'wrong' || feedback === 'timeout' ? `<div class="absolute inset-0 flex items-center justify-center text-6xl font-black text-red-400">OOF!</div>` : ''}

        <div id="dynamic-area" class="mb-6 text-6xl font-black">
          ?
        </div>

        <div class="grid grid-cols-3 gap-2">
          ${[1,2,3,4,5,6,7,8,9].map(n => `
            <button data-value="${n}" class="bg-[#9ca3af] text-black text-2xl font-black p-4 rounded active:scale-95">
              ${n}
            </button>
          `).join('')}
          <button data-value="0" class="col-span-3 bg-[#00b0f4] text-black text-2xl font-black p-4 rounded active:scale-95">
            0
          </button>
        </div>
      </div>
    </div>
  `;
}

/**
 * DIPANGGIL GameSession
 */
export function updateProgress(currentIndex, total) {
  const stage = document.querySelector('[data-hud-stage]');
  if (stage) {
    stage.textContent = `Stage ${currentIndex + 1}/${total}`;
  }
}

export function updateScore(score) {
  const el = document.querySelector('[data-hud-score]');
  if (el) {
    el.textContent = `🧱 ${score}`;
  }
}

/**
 * WAJIB ADA – DIPAKAI app.js
 */
export function renderResult(message = 'Great Job!') {
  return `
    <div class="min-h-screen bg-[#111] flex flex-col items-center justify-center text-white p-6">
      <div class="bg-[#232527] p-8 rounded-lg text-center max-w-md w-full shadow-xl">
        <h1 class="text-4xl font-black mb-4">SELESAI 🎉</h1>
        <p class="mb-6">${message}</p>
        <div class="text-2xl font-black mb-6">🧱 ${state.score}</div>

        <button data-action="respawn"
          class="bg-[#00b0f4] text-black px-6 py-4 rounded font-black text-xl active:scale-95">
          MAIN LAGI
        </button>
      </div>
    </div>
  `;
}
