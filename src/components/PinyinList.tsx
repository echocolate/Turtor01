import React, { useRef } from 'react';
import { PinyinData, vowels, consonants } from '../data/pinyin';

const PinyinList: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const playAudio = async (pinyin: PinyinData) => {
    if (!audioRef.current) return;
    
    try {
      audioRef.current.src = pinyin.audioUrl;
      audioRef.current.currentTime = 0;
      await audioRef.current.load();
      await audioRef.current.play();
    } catch (error) {
      console.error('音频播放失败:', error);
    }
  };

  return (
    <div className="space-y-6">
      <audio ref={audioRef} />
      
      <div>
        <h3 className="text-xl font-bold mb-2">声母</h3>
        <div className="grid grid-cols-5 gap-2">
          {consonants.map((pinyin) => (
            <button
              key={pinyin.pinyin}
              onClick={() => playAudio(pinyin)}
              className="p-2 border rounded hover:bg-gray-100"
            >
              {pinyin.pinyin}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-2">韵母</h3>
        <div className="grid grid-cols-5 gap-2">
          {vowels.map((pinyin) => (
            <button
              key={pinyin.pinyin}
              onClick={() => playAudio(pinyin)}
              className="p-2 border rounded hover:bg-gray-100"
            >
              {pinyin.pinyin}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PinyinList;