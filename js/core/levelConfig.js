export const GAME_LEVELS = {
  NOOB: {
    id: 'noob_builder',
    name: 'Foundation Field',
    allowedOps: ['ADD', 'MULTIPLY'],
    numberRange: { min: 1, max: 10 },
    progression: {
      warmup: 5,
      challenge: 4,
      finisher: 1
    },
    assets: ['wood_block', 'stone_brick', 'grass_block', 'gold_block']
  }
};

