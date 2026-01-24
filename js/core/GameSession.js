import { GAME_LEVELS } from './levelConfig.js';
import { BloxQuestGenerator } from './questionGenerator.js';
import { showHint } from '../ui/hintSystem.js';

export class GameSession {
  constructor(levelKey = 'NOOB') {
    this.config = GAME_LEVELS[levelKey];
    this.generator = new BloxQuestGenerator(this.config);

    this.currentIndex = 0;
    this.totalQuestions = 10;
    this.attempt = 0;
    this.blocksCollected = 0;

    this.currentQuest = null;

    // 🔹 DIPAKAI HUD / APP
    this.questions = [];

    // 🔔 Event hooks
    this.onQuestionStart = () => {};
    this.onWrong = () => {};
    this.onCorrect = () => {};
    this.onFinish = () => {};
  }

  start() {
    this.currentIndex = 0;
    this.blocksCollected = 0;
    this.questions = [];
    this.nextQuestion();
  }

  nextQuestion() {
    if (this.currentIndex >= this.totalQuestions) {
      this.finishSession();
      return;
    }

    this.attempt = 0;

    const q = this.generator.generateQuest(this.currentIndex);

    // 🔹 NORMALISASI FORMAT (WAJIB UNTUK HUD)
    const quest = {
      num1: q.operands?.[0] ?? q.a ?? 0,
      num2: q.operands?.[1] ?? q.b ?? 0,
      symbol: q.operation === 'ADD' ? '+' : '×',
      answer: q.answer,
      hint: q.hint || ''
    };

    this.currentQuest = quest;
    this.questions[this.currentIndex] = quest;

    // 🔔 EVENT
    this.onQuestionStart(quest, this.currentIndex);
  }

  submitAnswer(playerInput) {
    if (!this.currentQuest) return;

    if (Number(playerInput) === this.currentQuest.answer) {
      this.handleCorrect();
    } else {
      this.handleWrong();
    }
  }

  handleCorrect() {
    this.blocksCollected += 10;

    this.onCorrect(this.currentQuest);

    this.currentIndex++;
    this.nextQuestion();
  }

  handleWrong() {
    this.attempt++;

    this.onWrong(this.currentQuest, this.attempt);

    // 🧠 NOOB = SELALU AMAN
    showHint(this.config.key, this.currentQuest.hint);
  }

  finishSession() {
    this.onFinish({
      totalBlocks: this.blocksCollected,
      totalQuestions: this.totalQuestions
    });
  }
}
