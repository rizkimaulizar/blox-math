import { NoobHintPanel } from './NoobHintPanel.js';
import { ProHintPanel } from './ProHintPanel.js';

export const HintSystem = {
  show(level, text) {
    if (level === 'NOOB') {
      NoobHintPanel.show(text);
    } else {
      ProHintPanel.show();
    }
  },

  hide(level) {
    if (level === 'NOOB') {
      NoobHintPanel.hide();
    }
  }
};
