// js/ui/NoobHintPanel.js

export const NoobHintPanel = {
  el: null,

  init() {
    if (this.el) return;

    const panel = document.createElement('div');
    panel.id = 'noob-hint-panel';

    panel.style.position = 'fixed';
    panel.style.bottom = '20px';
    panel.style.left = '50%';
    panel.style.transform = 'translateX(-50%)';
    panel.style.padding = '12px 18px';
    panel.style.background = '#0f172a'; // slate-900
    panel.style.color = '#fff';
    panel.style.borderRadius = '10px';
    panel.style.fontSize = '14px';
    panel.style.boxShadow = '0 10px 25px rgba(0,0,0,0.3)';
    panel.style.opacity = '0';
    panel.style.transition = 'opacity 0.3s ease';

    document.body.appendChild(panel);
    this.el = panel;
  },

  show(text = 'Coba hitung pelan-pelan ya 🙂') {
    this.init();

    this.el.textContent = `💡 Hint: ${text}`;
    this.el.style.opacity = '1';
  },

  hide() {
    if (!this.el) return;
    this.el.style.opacity = '0';
  }
};
