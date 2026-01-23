// js/core/GameSession.js

import { GAME_LEVELS } from './levelConfig.js';
import { BloxQuestGenerator } from './questionGenerator.js';
import { showHint } from '../ui/hintSystem.js';

export class GameSession {
  constructor(levelKey = 'NOOB') {
    this.config = GAME_LEVELS[levelKey];
    this.generator = new BloxQuestGenerator(this.config);

    this.currentQuestionIndex = 0;
    this.totalQuestions = 10;
    this.attempt = 0;
    this.blocksCollected = 0;
    this.currentQuest = null;

    // 🔔 Event Callbacks (Safe Defaults)
    this.onQuestionStart = () => {};
    this.onWrong = () => {};
    this.onCorrect = () => {};
    this.onFinish = () => {};
  }

  start() {
    this.currentQuestionIndex = 0;
    this.blocksCollected = 0;
    this.nextQuestion();
  }

  nextQuestion() {
    if (this.currentQuestionIndex >= this.totalQuestions) {
      this.finishSession();
      return;
    }

    this.attempt = 0;
    this.currentQuest = this.generator.generateQuest(this.currentQuestionIndex);

    // 🔔 EVENT: Question Start
    this.onQuestionStart(this.currentQuest, this.currentQuestionIndex);
  }

  submitAnswer(playerInput) {
    if (playerInput === this.currentQuest.answer) {
      this.handleCorrect();
    } else {
      this.handleWrong();
    }
  }

  handleCorrect() {
    const reward =
      this.currentQuest.phase === 'FINISHER' ? 50 : 10;

    this.blocksCollected += reward;

    // 🔔 EVENT: Correct Answer
    this.onCorrect(this.currentQuest);

    this.currentQuestionIndex++;
    this.nextQuestion();
  }

  handleWrong() {
    this.attempt++;

    // 🔔 EVENT: Wrong Answer
    this.onWrong(this.currentQuest, this.attempt);
  }

  finishSession() {
    const summary = {
      totalBlocks: this.blocksCollected,
      totalQuestions: this.totalQuestions
    };

    // 🔔 EVENT: Session Finish
    this.onFinish(summary);
  }
}

