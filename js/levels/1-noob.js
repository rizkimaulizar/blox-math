import { GameSession } from '../core/GameSession.js';
import { NoobHintPanel } from '../ui/NoobHintPanel.js';
import { state } from '../state.js';

let session = null;

export function start() {
  session = new GameSession('NOOB');

  session.onQuestionStart = (quest) => {
    // Sinkronkan ke STATE, bukan render
    state.questions = session.questions;
    state.currentIndex = session.currentIndex;
  };

  session.onWrong = (quest, attempt) => {
    NoobHintPanel.show(quest, attempt);
  };

  session.onCorrect = () => {
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
