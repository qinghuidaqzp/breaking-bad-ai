import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CharacterGrid } from './components/CharacterGrid';
import { ChatInterface } from './components/ChatInterface';
import { ViewState, Character } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.HOME);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  const handleSelectCharacter = (character: Character) => {
    setSelectedCharacter(character);
    setView(ViewState.CHAT);
  };

  const renderView = () => {
    switch (view) {
      case ViewState.HOME:
        return <Hero onStart={() => setView(ViewState.GALLERY)} />;
      case ViewState.GALLERY:
        return <CharacterGrid onSelectCharacter={handleSelectCharacter} />;
      case ViewState.CHAT:
        return (
          <ChatInterface 
            character={selectedCharacter} 
            onBack={() => setView(ViewState.GALLERY)} 
          />
        );
      default:
        return <Hero onStart={() => setView(ViewState.GALLERY)} />;
    }
  };

  return (
    <div className="min-h-screen bg-stone-900 text-gray-100 selection:bg-desert-gold selection:text-black">
      <Header currentView={view} setView={setView} />
      <main className="animate-fade-in">
        {renderView()}
      </main>
      
      {/* Footer */}
      <footer className="bg-black py-8 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 text-center font-tech text-stone-600 text-sm">
          <p>&copy; {new Date().getFullYear()} 阿尔伯克基往事 (Albuquerque Chronicles). 粉丝致敬作品.</p>
          <p className="mt-2">Powered by Google Gemini. 与 AMC 或 Sony Pictures 无关.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;