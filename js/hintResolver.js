// js/hintResolver.js
import { NoobHintPanel } from '../hint-system/noob/NoobHintPanel.js';
import { ProHintPanel } from '../hint-system/pro/ProHintPanel.js';

export function getHintUI(levelKey) {
  if (levelKey === 'NOOB') {
    return NoobHintPanel;
  }

  if (levelKey === 'PRO') {
    return ProHintPanel;
  }

  return null;
}

