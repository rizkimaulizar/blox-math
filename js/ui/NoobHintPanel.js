// js/ui/NoobHintPanel.js

export const NoobHintPanel = {
  show(quest, attempt) {
    let panel = document.getElementById('hint-panel');

    if (!panel) {
      panel = document.createElement('div');
      panel.id = 'hint-panel';
      panel.style.padding = '12px';
      panel.style.background = '#1f2937';
      panel.style.color = '#fff';
      panel.style.borderRadius = '8px';
      panel.style.marginTop = '12px';

      document.body.appendChild(panel);
    }

    panel.innerHTML = `
      <strong>💡 Hint ${attempt}</strong><br/>
      Hitung pelan-pelan ya 👀
    `;
  },

  hide() {
    const panel = document.getElementById('hint-panel');
    if (panel) panel.remove();
  }
};
