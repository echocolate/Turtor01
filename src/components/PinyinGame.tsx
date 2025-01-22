import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { PinyinData, getRandomPinyin, generateAnswerOptions } from '../data/pinyin';
import { getRandomPraiseAudio, getRandomEncourageAudio } from '../data/audioFeedback';
import { GAME_TEXTS, FEEDBACK_TEXTS, AUDIO_PATHS, GAME_CONFIG, SCORE_LEVELS } from '../data/const';
import Fireworks from './Fireworks';
import '../styles/game.css';

// 音效
const clickSound = new Audio(AUDIO_PATHS.CLICK);
const correctSound = new Audio(AUDIO_PATHS.CORRECT);
const incorrectSound = new Audio(AUDIO_PATHS.INCORRECT);
const praiseSound = new Audio();
const encourageSound = new Audio();

interface GameState {
  currentQuestion: PinyinData | null;
  options: PinyinData[];
  score: number;
  questionCount: number;
  gameStatus: 'start' | 'playing' | 'result';
  feedback: 'none' | 'correct' | 'incorrect';
}

const PinyinGame: React.FC = () => {
  // 移除不需要的状态
  const [showFireworks, setShowFireworks] = useState(false);

  const [gameState, setGameState] = useState<GameState>({
    currentQuestion: null,
    options: [],
    score: 0,
    questionCount: 0,
    gameStatus: 'start',
    feedback: 'none',
  });

  const audioRef = useRef<HTMLAudioElement>(null);

  // 初始化音频元素
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('error', (e) => {
        console.error('音频加载错误:', e);
      });
    }
  }, []);

  const startGame = async () => {
    if (!audioRef.current) {
      console.error('音频元素未初始化');
      return;
    }

    setGameState({
      currentQuestion: null,
      options: [],
      score: 0,
      questionCount: 0,
      gameStatus: 'playing',
      feedback: 'none',
    });

    await generateQuestion();
  };

  const generateQuestion = async () => {
    const question = getRandomPinyin();
    const options = generateAnswerOptions(question);
    
    setGameState(prev => ({
      ...prev,
      currentQuestion: question,
      options,
      feedback: 'none',
    }));

    if (audioRef.current) {
      try {
        audioRef.current.src = question.audioUrl;
        await audioRef.current.load();
        await audioRef.current.play();
      } catch (error) {
        console.error('音频播放失败:', error);
      }
    }
  };

  const replayAudio = async () => {
    if (!audioRef.current || !gameState.currentQuestion) return;

    try {
      audioRef.current.src = gameState.currentQuestion.audioUrl;
      audioRef.current.currentTime = 0;
      await audioRef.current.load();
      await audioRef.current.play();
    } catch (error) {
      console.error('重播音频失败:', error);
    }
  };

  const handleAnswer = (answer: PinyinData) => {
    if (gameState.feedback !== 'none') return;

    const isCorrect = answer.pinyin === gameState.currentQuestion?.pinyin;

    // 播放点击音效
    clickSound.currentTime = 0;
    clickSound.play().catch(console.error);

    // 播放答题反馈音效
    if (isCorrect) {
      correctSound.currentTime = 0;
      correctSound.play().catch(console.error);
      // 播放随机表扬音效
      praiseSound.src = getRandomPraiseAudio();
      praiseSound.play().catch(console.error);
      // 显示烟花特效
      setShowFireworks(true);
    } else {
      incorrectSound.currentTime = 0;
      incorrectSound.play().catch(console.error);
      // 播放随机鼓励音效
      encourageSound.src = getRandomEncourageAudio();
      encourageSound.play().catch(console.error);
    }
    const newScore = gameState.score + (isCorrect ? GAME_CONFIG.SCORE_PER_CORRECT : 0);
    const newQuestionCount = gameState.questionCount + 1;

    setGameState(prev => ({
      ...prev,
      score: newScore,
      questionCount: newQuestionCount,
      feedback: isCorrect ? 'correct' : 'incorrect',
    }));

    // 延迟显示下一题或结束游戏
    setTimeout(() => {
      if (newQuestionCount >= GAME_CONFIG.TOTAL_QUESTIONS) {
        setGameState(prev => ({ ...prev, gameStatus: 'result' }));
      } else {
        generateQuestion();
      }
    }, 2000); // 固定延迟2秒
  };

  const getGrade = (score: number): string => {
    if (score >= SCORE_LEVELS.EXCELLENT.threshold) return SCORE_LEVELS.EXCELLENT.text;
    if (score >= SCORE_LEVELS.GOOD.threshold) return SCORE_LEVELS.GOOD.text;
    if (score >= SCORE_LEVELS.PASS.threshold) return SCORE_LEVELS.PASS.text;
    return SCORE_LEVELS.FAIL.text;
  };

  // 渲染开始界面
  if (gameState.gameStatus === 'start') {
    return (
      <div className="game-container flex flex-col items-center justify-center">
        <div className="content-wrapper">
          <h1 className="text-4xl font-bold mb-8">{GAME_TEXTS.TITLE}</h1>
          <div className="flex gap-4">
            <button
              onClick={startGame}
              className="btn-base bg-blue-500 text-white px-8 py-4 text-2xl hover:bg-blue-600 flex-1"
            >
              {GAME_TEXTS.START_BUTTON}
            </button>
            <Link
              to="/pinyin-list"
              className="btn-base bg-blue-500 text-white px-8 py-4 text-2xl hover:bg-blue-600 flex-1 inline-flex items-center justify-center"
            >
              {GAME_TEXTS.PINYIN_LIST}
            </Link>
          </div>
          <audio ref={audioRef} preload="auto" />
        </div>
      </div>
    );
  }

  if (gameState.gameStatus === 'result') {
    return (
      <div className="game-container flex flex-col items-center justify-center">
        <div className="content-wrapper">
          <h2 className="text-3xl font-bold mb-4">{GAME_TEXTS.GAME_OVER}</h2>
          <p className="text-2xl mb-4">{GAME_TEXTS.SCORE_TEXT}: {gameState.score}</p>
          <p className="text-2xl mb-8">{GAME_TEXTS.LEVEL_TEXT}: {getGrade(gameState.score)}</p>
          <button
            onClick={startGame}
            className="btn-base bg-blue-500 text-white px-8 py-4 text-2xl hover:bg-blue-600"
          >
            {GAME_TEXTS.PLAY_AGAIN}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="game-container flex flex-col items-center justify-center">
      <div className="content-wrapper" style={{ position: 'relative' }}>
        {showFireworks && <Fireworks onComplete={() => setShowFireworks(false)} />}
        <audio ref={audioRef} />
        <div className="mb-8">
          <p className="text-xl mb-4">{GAME_TEXTS.QUESTION_COUNT.replace('{0}', String(gameState.questionCount + 1)).replace('{1}', String(GAME_CONFIG.TOTAL_QUESTIONS))}</p>
          <p className="text-xl">{GAME_TEXTS.CURRENT_SCORE}: {gameState.score}</p>
        </div>

        <div className="mb-8">
          <button
            onClick={replayAudio}
            className="btn-base bg-green-500 text-white px-6 py-3 text-xl hover:bg-green-600 flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM18.584 5.106a.75.75 0 011.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 11-1.06-1.06 8.25 8.25 0 000-11.668.75.75 0 010-1.06z"/>
              <path d="M15.932 7.757a.75.75 0 011.061 0 6 6 0 010 8.486.75.75 0 01-1.06-1.061 4.5 4.5 0 000-6.364.75.75 0 010-1.06z"/>
            </svg>
            {GAME_TEXTS.REPLAY_AUDIO}
          </button>
        </div>

        <div className="options-grid">
          {gameState.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              className={`option-btn ${gameState.feedback === 'none'
                ? 'bg-white hover:bg-gray-100'
                : option.pinyin === gameState.currentQuestion?.pinyin
                  ? 'bg-green-500 text-white correct'
                  : gameState.feedback === 'incorrect' && option.pinyin === gameState.options.find(o => o === option)?.pinyin
                    ? 'bg-red-500 text-white incorrect'
                    : 'bg-white'
                }`}
              disabled={gameState.feedback !== 'none'}
            >
              {option.pinyin}
            </button>
          ))}
        </div>

        {gameState.feedback !== 'none' && (
          <p className={`feedback-text ${gameState.feedback === 'correct' ? 'text-green-600' : 'text-red-600'}`}>
            {gameState.feedback === 'correct' 
              ? FEEDBACK_TEXTS.PRAISE[Math.floor(Math.random() * FEEDBACK_TEXTS.PRAISE.length)]
              : FEEDBACK_TEXTS.ENCOURAGE[Math.floor(Math.random() * FEEDBACK_TEXTS.ENCOURAGE.length)]}
          </p>
        )}
      </div>
    </div>
  );
};

export default PinyinGame;