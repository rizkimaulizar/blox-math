import { NoobHintPanel } from './NoobHintPanel.js';
import { ProHintPanel } from './ProHintPanel.js';

export function showHint(levelKey, quest, attempt) {
  if (levelKey === 'NOOB') {
    NoobHintPanel.show(quest, attempt);
  } else if (levelKey === 'PRO') {
    ProHintPanel.show(quest, attempt);
  }
}
