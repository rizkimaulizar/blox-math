import { GameSession } from '../core/GameSession.js';
import { renderHUD, updateProgress } from '../ui/hud.js';
import { NoobHintPanel } from '../ui/NoobHintPanel.js';

const session = new GameSession('NOOB');

// 1️⃣ Saat soal dimulai
session.onQuestionStart = (quest, index) => {
  renderQuestion(quest);
  updateProgress(index, session.totalQuestions);
};

// 2️⃣ Saat jawaban salah
session.onWrong = (quest, attempt) => {
  NoobHintPanel.show(quest, attempt);
};

// 3️⃣ Saat jawaban benar
session.onCorrect = () => {
  NoobHintPanel.hide();
};

// 4️⃣ Saat sesi selesai
session.onFinish = (summary) => {
  alert(`Selesai! Total blocks: ${summary.totalBlocks}`);
};

// 🚀 START GAME
session.start();
