// 游戏文本
export const GAME_TEXTS = {
  TITLE: '拼音学习游戏',
  START_BUTTON: '开始游戏',
  GAME_OVER: '游戏结束',
  SCORE_TEXT: '得分',
  LEVEL_TEXT: '等级',
  PLAY_AGAIN: '再玩一次',
  QUESTION_COUNT: '第 {0} 题 / 共 {1} 题',
  CURRENT_SCORE: '当前得分',
  REPLAY_AUDIO: '重播发音',
};

// 反馈文本
export const FEEDBACK_TEXTS = {
  PRAISE: ['太棒了！', '真厉害！', '答对啦！', '你真聪明！'],
  ENCOURAGE: ['继续加油！', '下一题一定行！', '别灰心，再试一次！', '慢慢来，你可以的！'],
};

// 音频路径
export const AUDIO_PATHS = {
  CLICK: '/audio/click.mp3',
  CORRECT: '/audio/correct.mp3',
  INCORRECT: '/audio/incorrect.mp3',
};

// 游戏配置
export const GAME_CONFIG = {
  TOTAL_QUESTIONS: 50,
  SCORE_PER_CORRECT: 2,
  FEEDBACK_DELAY: 1000,
  OPTIONS_COUNT: 3,
};

// 分数等级
export const SCORE_LEVELS = {
  EXCELLENT: {
    threshold: 90,
    text: '优秀',
  },
  GOOD: {
    threshold: 80,
    text: '良好',
  },
  PASS: {
    threshold: 60,
    text: '加油',
  },
  FAIL: {
    text: '不及格',
  },
};