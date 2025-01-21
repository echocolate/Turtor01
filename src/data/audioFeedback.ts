// 表扬音频数组
export const praiseAudios = [
  '/audio/praise1.mp3',
  '/audio/praise2.mp3',
  '/audio/praise3.mp3'
];

// 鼓励音频数组
export const encourageAudios = [
  '/audio/encourage1.mp3',
  '/audio/encourage2.mp3',
  '/audio/encourage3.mp3'
];

// 获取随机表扬音频
export const getRandomPraiseAudio = (): string => {
  const randomIndex = Math.floor(Math.random() * praiseAudios.length);
  return praiseAudios[randomIndex];
};

// 获取随机鼓励音频
export const getRandomEncourageAudio = (): string => {
  const randomIndex = Math.floor(Math.random() * encourageAudios.length);
  return encourageAudios[randomIndex];
};