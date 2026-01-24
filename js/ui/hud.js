import { state } from '../state.js';

/**
 * HUD MINIMAL & AMAN
 * - Tidak tergantung state.questions
 * - Cocok dengan GameSession (event-based)
 * - Fokus NOOB dulu
 */

export function renderHUD() {
  const container = document.getElementById('app');
  if (!container) return;

  container.innerHTML = `
    <div class="min-h-screen bg-[#232527] flex flex-col items-center justify-center p-4 text-white">
      
      <div class="w-full max-w-md mb-4 flex justify-between font-black">
        <div id="hud-score">🧱 0</div>
        <div id="hud-stage">Stage 1</div>
      </div>

      <div class="bg-[#393b3d] p-6 rounded-md shadow-xl w-full max-w-md text-center">
        <div id="dynamic-area" class="mb-6 text-6xl font-black">
          ?
        </div>

        <div class="grid grid-cols-3 gap-2">
          ${[1,2,3,4,5,6,7,8,9].map(n => `
            <button data-value="${n}" class="bg-[#9ca3af] text-black text-2xl font-black p-4 rounded active:scale-95">${n}</button>
          `).join('')}
          <button data-value="0" class="col-span-3 bg-[#00b0f4] text-black text-2xl font-black p-4 rounded active:scale-95">0</button>
        </div>
      </div>
    </div>
  `;
}

/**
 * Dipanggil GameSession
 */
export function updateProgress(currentIndex, total) {
  const stage = document.getElementById('hud-stage');
  if (stage) {
    stage.textContent = `Stage ${currentIndex + 1} / ${total}`;
  }
}

export function updateScore(score) {
  const el = document.getElementById('hud-score');
  if (el) {
    el.textContent = `🧱 ${score}`;
  }
}
