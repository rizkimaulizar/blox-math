// js/core/questionGenerator.js

export class BloxQuestGenerator {
  constructor(levelConfig) {
    this.config = levelConfig;
  }

  generateQuest(questionIndex = 0) {
    // 🔒 SAFE DEFAULT (ANTI UNDEFINED)
    const min = this.config.min ?? 1;
    const max = this.config.max ?? 10;

    const a = this.random(min, max);
    const b = this.random(min, max);

    return {
      id: questionIndex,
      operands: [a, b],
      operator: '+',
      answer: a + b,
      hint: `Coba hitung ${a} + ${b} pelan-pelan 🙂`,
      phase: 'NORMAL'
    };
  }

  random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
