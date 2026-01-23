export const NoobHintPanel = {
  show(hintText = 'Coba hitung pelan-pelan ya 🙂') {
    console.log('[NOOB HINT]', hintText);

    let panel = document.getElementById('noob-hint');
    if (!panel) {
      panel = document.createElement('div');
      panel.id = 'noob-hint';
      panel.style.position = 'fixed';
      panel.style.bottom = '16px';
      panel.style.left = '50%';
      panel.style.transform = 'translateX(-50%)';
      panel.style.padding = '12px 16px';
      panel.style.background = '#1e293b';
      panel.style.color = '#fff';
      panel.style.borderRadius = '8px';
      panel.style.fontSize = '14px';
      panel.style.zIndex = '999';
      document.body.appendChild(panel);
    }

    panel.textContent = hintText;
  }
};

