import { NoobHintPanel } from './NoobHintPanel.js';
import { ProHintPanel } from './ProHintPanel.js';

export function showHint(level, text) {
  if (level === 'NOOB') {
    NoobHintPanel.show(text);
  } else {
    ProHintPanel.show();
  }
}

