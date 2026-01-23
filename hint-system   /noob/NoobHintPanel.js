// hint-system/noob/NoobHintPanel.js

import { BlockVisualizer } from './BlockVisualizer.js';
import { GuidedInput } from './GuidedInput.js';

export const NoobHintPanel = {
  container: null,

  init() {
    this.container = document.getElementById('noob-hint-panel');
  },

  show({ quest, attempt }) {
    if (!this.container) this.init();

    this.container.style.display = 'block';

    // 🔹 Attempt 1: visual ringan + teks singkat
    if (attempt === 1) {
      this.container.innerHTML = `
        <p>👀 Coba lihat bloknya dulu ya!</p>
      `;

      BlockVisualizer.render(
        quest.operation,
        quest.operands
      );

      GuidedInput.setMode('normal');
    }

    // 🔹 Attempt 2+: visual kuat + input dibantu
    if (attempt >= 2) {
      this.container.innerHTML = `
        <p>🧠 Kita hitung bareng-bareng 👇</p>
      `;

      BlockVisualizer.renderStepByStep(
        quest.operation,
        quest.operands
      );

      GuidedInput.setMode('assisted');
    }
  },

  hide() {
    if (!this.container) return;

    this.container.style.display = 'none';
    this.container.innerHTML = '';
  }
};

