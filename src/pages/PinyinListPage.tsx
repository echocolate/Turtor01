import React from 'react';
import { Link } from 'react-router-dom';
import PinyinList from '../components/PinyinList';
import { GAME_TEXTS } from '../data/const';

const PinyinListPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">{GAME_TEXTS.PINYIN_LIST}</h1>
          <Link 
            to="/" 
            className="btn-base bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            返回首页
          </Link>
        </div>
        <PinyinList />
      </div>
    </div>
  );
};

export default PinyinListPage;