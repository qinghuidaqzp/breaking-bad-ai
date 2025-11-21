import React from 'react';
import { ViewState } from '../types';

interface HeroProps {
  onStart: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <div className="relative h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/id/1028/1920/1080" 
          alt="Desert Landscape" 
          className="w-full h-full object-cover grayscale contrast-125 brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-stone-900" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="mb-6 animate-fade-in">
            <span className="font-tech text-desert-gold text-xl tracking-[0.5em] uppercase mb-2 block">新墨西哥州，2008-2010</span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-western text-white mb-6 drop-shadow-2xl">
          切勿轻举妄动
        </h1>
        
        <p className="text-xl md:text-2xl font-sans text-gray-300 mb-12 font-light leading-relaxed max-w-2xl mx-auto">
          踏入帝国的残垣断壁。硝烟散去，但传说永存。<br/>
          通过我们的神经网络档案，链接阿尔伯克基的亡灵。
        </p>
        
        <div className="flex flex-col md:flex-row justify-center gap-6">
          <button 
            onClick={onStart}
            className="group relative px-8 py-4 bg-transparent border-2 border-desert-gold text-desert-gold font-bold uppercase tracking-widest hover:bg-desert-gold hover:text-black transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10 font-sans">进入档案库</span>
          </button>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute bottom-10 left-10 text-stone-600 font-tech text-sm">
        <p>坐标: 35.0844° N, 106.6504° W</p>
        <p>状态: 休眠中</p>
      </div>
    </div>
  );
};