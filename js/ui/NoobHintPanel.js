// js/ui/NoobHintPanel.js

export const NoobHintPanel = {
  show(quest, attempt) {
    let panel = document.getElementById('hint-panel');

    if (!panel) {
      panel = document.createElement('div');
      panel.id = 'hint-panel';
      panel.className = `
        mt-4 p-3 rounded-md text-sm font-bold text-center
        bg-[#111827] text-white border-2 border-[#00b0f4]
        animate-pulse
      `;

      const container = document.getElementById('game-container') 
        || document.body;

      container.appendChild(panel);
    }

    const [a, b] = quest.operands || [0, 0];
    let hintText = 'Coba hitung pelan-pelan ya 🙂';

    if (quest.operation === 'ADD') {
      hintText = `Hitung ${a} lalu tambah ${b}`;
    }

    if (quest.operation === 'MULTIPLY') {
      hintText = `${a} kelompok, masing-masing ${b}`;
    }

    panel.innerHTML = `
      💡 Hint ${attempt}<br/>
      <span class="opacity-80">${hintText}</span>
    `;
  },

  hide() {
    const panel = document.getElementById('hint-panel');
    if (panel) panel.remove();
  }
};
