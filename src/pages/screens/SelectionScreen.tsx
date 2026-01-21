import React from 'react';
import { CHARACTERS } from '@constants/constants';
import { Character } from '@app-types/types';
import Hexagon from '@components/Hexagon';

interface SelectionScreenProps {
  selectedChar: Character | null;
  onSelect: (char: Character) => void;
  onPlay: () => void;
}

const SelectionScreen: React.FC<SelectionScreenProps> = ({ selectedChar, onSelect, onPlay }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-8 relative text-black">
      <div className="text-center mb-12">
        <h1 className="font-erica text-6xl mb-2 drop-shadow-sm text-[#2E2E2E]">Bem vindo ao Prasil!</h1>
        <p className="text-2xl opacity-80">Selecione seu grupo</p>
      </div>

      <div className="flex flex-wrap justify-center gap-12 mb-16">
        {CHARACTERS.map((char) => (
          <div key={char.id} className="flex flex-col items-center">
            <Hexagon 
              color={char.color} 
              size={180} 
              onClick={() => {
                if (selectedChar?.id === char.id) {
                  onSelect(null);
                } else {
                  onSelect(char);
                }
              }}
              selected={selectedChar?.id === char.id}
            >
              <img 
                src={encodeURI(char.image)} 
                alt={char.name} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).parentElement!.classList.add('flex', 'items-center', 'justify-center');
                  (e.target as HTMLImageElement).parentElement!.innerHTML = `<span class="text-4xl font-erica text-[#4a3225]">${char.name[0]}</span>`;
                }}
              />
            </Hexagon>
            <span className={`mt-4 font-enriqueta text-2xl transition-colors ${selectedChar?.id === char.id ? 'text-[#b45309] scale-110' : 'text-[#4a3225]'}`}>
              {char.name.toUpperCase()}
            </span>
          </div>
        ))}
      </div>

      <button 
        onClick={onPlay}
        disabled={!selectedChar}
        className={`bg-[#fbbf24] text-white font-erica text-4xl px-24 py-4 rounded-2xl shadow-xl transition-all ${
          !selectedChar ? 'opacity-50 cursor-not-allowed grayscale' : 'hover:scale-105 active:scale-95'
        }`}
      >
        Jogar
      </button>
    </div>
  );
};

export default SelectionScreen;