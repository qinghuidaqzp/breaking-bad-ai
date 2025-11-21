import React from 'react';
import { ViewState } from '../types';

interface HeaderProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, setView }) => {
  const NavItem = ({ view, label }: { view: ViewState; label: string }) => (
    <button
      onClick={() => setView(view)}
      className={`px-4 py-2 font-western tracking-wider transition-all duration-300 ${
        currentView === view
          ? 'text-desert-gold border-b-2 border-desert-gold'
          : 'text-gray-400 hover:text-white'
      }`}
    >
      {label}
    </button>
  );

  return (
    <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-stone-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => setView(ViewState.HOME)}
          >
            <div className="flex flex-col items-start leading-none">
              <span className="text-3xl font-bold font-sans text-white">
                <span className="bg-chem-green px-1 mr-1 text-black font-bold inline-block">阿</span>尔伯克基
              </span>
              <span className="text-3xl font-bold font-sans text-white ml-8">
                <span className="bg-desert-gold px-1 mr-1 text-black font-bold inline-block">往</span>事
              </span>
            </div>
          </div>
          <nav className="flex space-x-4">
            <NavItem view={ViewState.HOME} label="首页" />
            <NavItem view={ViewState.GALLERY} label="风云人物" />
            <NavItem view={ViewState.CHAT} label="实验室 (AI)" />
          </nav>
        </div>
      </div>
    </header>
  );
};