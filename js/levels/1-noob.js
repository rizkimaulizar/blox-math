// js/levels/1-noob.js

import { GameSession } from '../core/GameSession.js';
import { GAME_LEVELS } from '../core/levelConfig.js';
import { getHintUI } from '../hintResolver.js';
import { renderHUD, updateProgress } from '../ui/hud.js';
import { state } from '../state.js';

export function startNoobLevel() {
  // 1️⃣ Load Level Configuration
  const levelConfig = GAME_LEVELS.NOOB;

  // 2️⃣ Init Game Session (Gameplay Loop)
  const session = new GameSession('NOOB');

  // 3️⃣ Resolve Hint UI (NOOB ONLY)
  const HintUI = getHintUI('NOOB');

  // 4️⃣ Sync initial state
  state.currentLevel = 'NOOB';
  state.progress = 0;

  // 5️⃣ Register Session Callbacks (EVENT CONTRACT)
  session.onQuestionStart = (quest, index) => {
    renderHUD({
      narrative: quest.narrative,
      index,
      total: session.totalQuestions
    });
  };

  session.onWrong = (quest, attempt) => {
    HintUI.show({
      quest,
      attempt
    });
  };

  session.onCorrect = (quest) => {
    HintUI.hide();
    updateProgress(++state.progress);
  };

  session.onFinish = (summary) => {
    console.log('NOOB LEVEL COMPLETE', summary);
    // nanti: show completion UI / unlock PRO
  };

  // 6️⃣ Start Session
  session.start();
}
