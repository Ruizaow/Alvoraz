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
    <div
      className="
        flex flex-col items-center justify-center
        w-full min-h-screen
        px-4 py-6
        relative text-black
        overflow-y-auto
      "
    >
      {/* TÍTULO */}
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="font-erica text-4xl sm:text-6xl mb-2 drop-shadow-sm text-[#2E2E2E]">
          Bem vindo ao Prasil!
        </h1>
        <p className="text-lg sm:text-2xl opacity-80">
          Selecione seu grupo
        </p>
      </div>

      {/* PERSONAGENS */}
      <div
        className="
          grid
          grid-cols-2
          sm:grid-cols-3
          lg:flex lg:flex-wrap
          justify-center
          gap-6 sm:gap-12
          mb-12 sm:mb-16
        "
      >
        {CHARACTERS.map((char) => (
          <div key={char.id} className="flex flex-col items-center">
            <Hexagon
              color={char.color}
              size={120}            // mobile
              selected={selectedChar?.id === char.id}
              onClick={() =>
                selectedChar?.id === char.id
                  ? onSelect(null)
                  : onSelect(char)
              }
            >
              <img
                src={encodeURI(char.image)}
                alt={char.name}
                className="w-full h-full object-cover"
              />
            </Hexagon>

            <span
              className={`
                mt-3
                font-enriqueta
                text-lg sm:text-2xl
                transition-colors
                ${
                  selectedChar?.id === char.id
                    ? 'text-[#b45309] scale-110'
                    : 'text-[#4a3225]'
                }
              `}
            >
              {char.name.toUpperCase()}
            </span>
          </div>
        ))}
      </div>

      {/* BOTÃO */}
      <button
        onClick={onPlay}
        disabled={!selectedChar}
        className={`
          bg-[#fbbf24] text-white font-erica
          text-2xl sm:text-4xl
          px-12 sm:px-24
          py-3 sm:py-4
          rounded-2xl shadow-xl
          transition-all
          mb-6
          ${
            !selectedChar
              ? 'opacity-50 cursor-not-allowed grayscale'
              : 'hover:scale-105 active:scale-95'
          }
        `}
      >
        Jogar
      </button>
    </div>
  );
};

export default SelectionScreen;