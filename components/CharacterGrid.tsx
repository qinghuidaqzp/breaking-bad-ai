import React from 'react';
import { Character } from '../types';
import { CHARACTERS } from '../constants';

interface CharacterGridProps {
  onSelectCharacter: (character: Character) => void;
}

export const CharacterGrid: React.FC<CharacterGridProps> = ({ onSelectCharacter }) => {
  return (
    <div className="py-12 bg-stone-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-western text-desert-gold mb-4">风云人物</h2>
          <p className="text-gray-400 font-sans max-w-2xl mx-auto">
            选择一名角色以建立加密通讯频道。
            历史由幸存者书写，但记忆将在此永生。
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CHARACTERS.map((char) => {
            // Extract color name from text class (e.g., "text-chem-green" -> "chem-green")
            const colorName = char.themeColor.replace('text-', '');
            
            return (
              <div 
                key={char.id}
                onClick={() => onSelectCharacter(char)}
                className={`
                  group relative bg-black border border-stone-800 rounded-lg overflow-hidden 
                  transition-all duration-500 ease-out cursor-pointer 
                  transform hover:-translate-y-3 hover:scale-105 hover:z-10
                  hover:border-${colorName}
                  hover:shadow-2xl hover:shadow-${colorName}/20
                `}
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img 
                    src={char.image} 
                    alt={char.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className={`text-sm font-tech uppercase tracking-widest mb-1 ${char.themeColor}`}>
                    {char.alias || 'Unknown'}
                  </p>
                  <h3 className="text-2xl font-bold font-sans text-white mb-2">{char.name}</h3>
                  <p className="text-gray-400 text-sm line-clamp-2 font-sans opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                    "{char.quote}"
                  </p>
                </div>
                
                <div className="absolute top-4 right-4">
                   <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};