// js/ui/hintSystem.js

import { NoobHintPanel } from '../../hint-system/noob/NoobHintPanel.js';
import { ProHintPanel } from '../../hint-system/pro/ProHintPanel.js';

export function showHint(levelKey, quest, attempt) {
  if (levelKey === 'NOOB') {
    NoobHintPanel.show(quest, attempt);
  } else if (levelKey === 'PRO') {
    ProHintPanel.show(quest, attempt);
  }
}
