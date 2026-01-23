// hint-system/noob/NoobHintPanel.js

export const NoobHintPanel = {
  show(quest, attempt) {
    let panel = document.getElementById('hint-panel');

    // Create panel if not exists
    if (!panel) {
      panel = document.createElement('div');
      panel.id = 'hint-panel';
      panel.style.padding = '12px';
      panel.style.marginTop = '12px';
      panel.style.background = '#1f2937';
      panel.style.color = '#fff';
      panel.style.borderRadius = '8px';

      document.body.appendChild(panel);
    }

    panel.innerHTML = `
      <div style="font-weight:bold; margin-bottom:6px;">
        💡 Hint ${attempt}
      </div>
      <div>
        Coba hitung pelan-pelan ya 👀  
        (${quest.operands.join(' ' + quest.operation + ' ')})
      </div>
    `;
  },

  hide() {
    const panel = document.getElementById('hint-panel');
    if (panel) panel.remove();
  }
};
