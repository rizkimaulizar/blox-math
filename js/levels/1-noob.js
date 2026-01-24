import { GameSession } from '../core/GameSession.js';
import { NoobHintPanel } from '../ui/NoobHintPanel.js';
import { state } from '../state.js';

let session = null;

export function start() {
  session = new GameSession('NOOB');

  // RESET STATE
  state.questions = [];
  state.currentIndex = 0;
  state.score = 0;
  state.combo = 0;
  state.appState = 'playing';

  session.onQuestionStart = () => {
    const quest = session.currentQuestion; // ⬅️ PENTING

    if (!quest) return;

    const index = session.currentIndex;

    state.questions[index] = {
      num1: quest.operands[0],
      num2: quest.operands[1],
      symbol: quest.operation === 'ADD' ? '+' : '×',
      answer: quest.answer
    };

    state.currentIndex = index;
  };

  session.onWrong = (quest, attempt) => {
    state.combo = 0;
    NoobHintPanel.show(quest, attempt);
  };

  session.onCorrect = () => {
    state.score++;
    state.combo++;
    NoobHintPanel.hide();
  };

  session.onFinish = () => {
    state.appState = 'result';
  };

  session.start();
}

export function submit(value) {
  if (!session) return;
  session.submitAnswer(value);
}
