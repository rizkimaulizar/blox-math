// js/hintResolver.js
import { NoobHintPanel } from '../js/ui/NoobHintPanel.js';
import { ProHintPanel } from '../js/ui/ProHintPanel.js';

export function getHintUI(levelKey) {
  if (levelKey === 'NOOB') {
    return NoobHintPanel;
  }

  if (levelKey === 'PRO') {
    return ProHintPanel;
  }

  return null;
}

