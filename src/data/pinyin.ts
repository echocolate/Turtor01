// 拼音数据定义
export interface PinyinData {
  type: 'vowel' | 'consonant';
  pinyin: string;
  audioUrl: string;
}

// 元音列表（包含单韵母和复韵母）
export const vowels: PinyinData[] = [
  // 单韵母
  { type: 'vowel', pinyin: 'a', audioUrl: '/audio/t_a1.mp3' },
  { type: 'vowel', pinyin: 'o', audioUrl: '/audio/t_o1.mp3' },
  { type: 'vowel', pinyin: 'e', audioUrl: '/audio/t_e1.mp3' },
  { type: 'vowel', pinyin: 'i', audioUrl: '/audio/t_yi1.mp3' },
  { type: 'vowel', pinyin: 'u', audioUrl: '/audio/t_wu1.mp3' },
  { type: 'vowel', pinyin: 'ü', audioUrl: '/audio/t_yu1.mp3' },
  // 复韵母
  { type: 'vowel', pinyin: 'ai', audioUrl: '/audio/t_ai1.mp3' },
  { type: 'vowel', pinyin: 'ei', audioUrl: '/audio/t_ei1.mp3' },
  { type: 'vowel', pinyin: 'ui', audioUrl: '/audio/t_ui1.mp3' },
  { type: 'vowel', pinyin: 'ao', audioUrl: '/audio/t_ao1.mp3' },
  { type: 'vowel', pinyin: 'ou', audioUrl: '/audio/t_ou1.mp3' },
  { type: 'vowel', pinyin: 'iu', audioUrl: '/audio/t_you1.mp3' },
  { type: 'vowel', pinyin: 'ie', audioUrl: '/audio/t_ye1.mp3' },
  { type: 'vowel', pinyin: 'üe', audioUrl: '/audio/t_yue1.mp3' },
  { type: 'vowel', pinyin: 'er', audioUrl: '/audio/t_er3.mp3' },
  // 鼻韵母
  { type: 'vowel', pinyin: 'an', audioUrl: '/audio/t_an1.mp3' },
  { type: 'vowel', pinyin: 'en', audioUrl: '/audio/t_en1.mp3' },
  { type: 'vowel', pinyin: 'in', audioUrl: '/audio/t_yin1.mp3' },
  { type: 'vowel', pinyin: 'un', audioUrl: '/audio/t_yun1.mp3' },
  { type: 'vowel', pinyin: 'ang', audioUrl: '/audio/t_ang1.mp3' },
  { type: 'vowel', pinyin: 'eng', audioUrl: '/audio/t_eng1.mp3' },
  { type: 'vowel', pinyin: 'ing', audioUrl: '/audio/t_ying1.mp3' },
  { type: 'vowel', pinyin: 'ong', audioUrl: '/audio/t_weng1.mp3' },
];

// 辅音列表
export const consonants: PinyinData[] = [
  { type: 'consonant', pinyin: 'b', audioUrl: '/audio/t_bo1.mp3' },
  { type: 'consonant', pinyin: 'p', audioUrl: '/audio/t_po1.mp3' },
  { type: 'consonant', pinyin: 'm', audioUrl: '/audio/t_mo1.mp3' },
  { type: 'consonant', pinyin: 'f', audioUrl: '/audio/t_fo1.mp3' },
  { type: 'consonant', pinyin: 'd', audioUrl: '/audio/t_de1.mp3' },
  { type: 'consonant', pinyin: 't', audioUrl: '/audio/t_te2.mp3' },
  { type: 'consonant', pinyin: 'n', audioUrl: '/audio/t_ne5.mp3' },
  { type: 'consonant', pinyin: 'l', audioUrl: '/audio/t_le1.mp3' },
  { type: 'consonant', pinyin: 'g', audioUrl: '/audio/t_ge1.mp3' },
  { type: 'consonant', pinyin: 'k', audioUrl: '/audio/t_ke1.mp3' },
  { type: 'consonant', pinyin: 'h', audioUrl: '/audio/t_he1.mp3' },
  { type: 'consonant', pinyin: 'j', audioUrl: '/audio/t_ji1.mp3' },
  { type: 'consonant', pinyin: 'q', audioUrl: '/audio/t_qi1.mp3' },
  { type: 'consonant', pinyin: 'x', audioUrl: '/audio/t_xi1.mp3' },
  { type: 'consonant', pinyin: 'zh', audioUrl: '/audio/t_zhi1.mp3' },
  { type: 'consonant', pinyin: 'ch', audioUrl: '/audio/t_chi1.mp3' },
  { type: 'consonant', pinyin: 'sh', audioUrl: '/audio/t_shi1.mp3' },
  { type: 'consonant', pinyin: 'r', audioUrl: '/audio/t_ri1.mp3' },
  { type: 'consonant', pinyin: 'z', audioUrl: '/audio/t_zi1.mp3' },
  { type: 'consonant', pinyin: 'c', audioUrl: '/audio/t_ci1.mp3' },
  { type: 'consonant', pinyin: 's', audioUrl: '/audio/t_si1.mp3' },
];

// 获取所有拼音数据
export const getAllPinyin = (): PinyinData[] => [...vowels, ...consonants];

// 根据类型获取拼音数据
export const getPinyinByType = (type: 'vowel' | 'consonant'): PinyinData[] => {
  return type === 'vowel' ? vowels : consonants;
};

// 随机获取一个拼音数据
export const getRandomPinyin = (type?: 'vowel' | 'consonant'): PinyinData => {
  const list = type ? getPinyinByType(type) : getAllPinyin();
  const randomIndex = Math.floor(Math.random() * list.length);
  return list[randomIndex];
};

// 生成随机答案选项
export const generateAnswerOptions = (correctAnswer: PinyinData): PinyinData[] => {
  const list = getPinyinByType(correctAnswer.type);
  const options = [correctAnswer];
  
  while (options.length < 3) {
    const randomPinyin = getRandomPinyin(correctAnswer.type);
    if (!options.find(option => option.pinyin === randomPinyin.pinyin)) {
      options.push(randomPinyin);
    }
  }

  // 打乱选项顺序
  return options.sort(() => Math.random() - 0.5);
};