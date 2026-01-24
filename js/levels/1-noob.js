// js/levels/1-noob.js

import { GameSession } from '../core/GameSession.js';
import { updateProgress, updateScore } from '../ui/hud.js';
import { NoobHintPanel } from '../ui/NoobHintPanel.js';

let session = null;

/**
 * RENDER SOAL KE LAYAR
 */
function renderQuestion(quest) {
  const area = document.getElementById('dynamic-area');
  if (!area || !quest) return;

  const [a, b] = quest.operands;

  area.innerHTML = `
    <div class="flex justify-center items-center gap-4 text-6xl font-black">
      <span>${a}</span>
      <span class="text-[#00b0f4]">+</span>
      <span>${b}</span>
    </div>
  `;
}

/**
 * START LEVEL NOOB
 */
export function start() {
  session = new GameSession('NOOB');

  session.onQuestionStart = (quest, index) => {
    renderQuestion(quest);
    updateProgress(index, session.totalQuestions);
  };

  session.onCorrect = () => {
    NoobHintPanel.hide();
    updateScore(session.blocksCollected);
  };

  session.onWrong = (quest, attempt) => {
    NoobHintPanel.show(quest, attempt);
  };

  session.onFinish = () => {
    alert('🎉 Selesai!');
  };

  session.start();
}

/**
 * INPUT DARI HUD (ANGKA)
 */
export function submit(value) {
  if (!session) return;
  session.submitAnswer(Number(value));
}
