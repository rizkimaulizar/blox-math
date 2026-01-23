import { GameSession } from '../core/GameSession.js';
import { updateProgress } from '../ui/hud.js';
import { NoobHintPanel } from '../ui/NoobHintPanel.js';

function renderQuestion(quest) {
  const area = document.getElementById('dynamic-area');
  if (!area) return;

  const [a, b] = quest.operands;
  const symbol = quest.operation === 'ADD' ? '+' : '×';

  area.innerHTML = `
    <div class="text-6xl font-black flex justify-center items-center gap-4">
      <span>${a}</span>
      <span class="text-[#00b0f4]">${symbol}</span>
      <span>${b}</span>
    </div>
  `;
}

const session = new GameSession('NOOB');

session.onQuestionStart = (quest, index) => {
  renderQuestion(quest);
  updateProgress(index, session.totalQuestions);
};

session.onWrong = (quest, attempt) => {
  NoobHintPanel.show(quest, attempt);
};

session.onCorrect = () => {
  NoobHintPanel.hide();
};

session.onFinish = (summary) => {
  alert(`Selesai! Total blocks: ${summary.totalBlocks}`);
};

session.start();

// === TEMP INPUT BRIDGE (NOOB ONLY) ===
document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-value]');
  if (!btn) return;

  const value = Number(btn.dataset.value);
  if (isNaN(value)) return;

  session.submitAnswer(value);
});
