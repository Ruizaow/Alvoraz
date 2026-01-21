import React from 'react';
import { MERCHANTS } from '@constants/constants';
import Hexagon from '@components/Hexagon';

interface MerchantSelectionScreenProps {
  onBack: () => void;
  onSelectMerchant: (id: string) => void;
}

const MerchantSelectionScreen: React.FC<MerchantSelectionScreenProps> = ({ onBack, onSelectMerchant }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full relative px-4 sm:px-8">
      {/* Botão de voltar */}
      <button 
        onClick={onBack}
        className="
          absolute top-4 left-4 md:top-8 md:left-8
          p-2 md:p-4
          rounded-full
          bg-white/20 border border-white/30
          text-black
          hover:bg-white/40
          transition-all
          shadow-md
          z-20
        "
      >
        <span className="text-2xl md:text-4xl px-2 pb-1">←</span>
      </button>

      {/* Título */}
      <h1 className="font-erica text-[#2E2E2E] text-5xl sm:text-6xl mb-12 sm:mb-16 text-center">
        Mercadores
      </h1>

      {/* Lista de mercadores */}
      <div className="flex flex-wrap justify-center gap-8 sm:gap-16">
        {MERCHANTS.map((merchant) => (
          <div key={merchant.id} className="flex flex-col items-center gap-4">
            <Hexagon 
              color={merchant.id === 'marquinhos' ? '#662f97' : merchant.id === 'mosca' ? '#112c6a' : '#eb8d3a'} 
              size={150} // tamanho menor para telas pequenas
              className="sm:size-[200px]"
              onClick={() => onSelectMerchant(merchant.id)}
            >
              <img 
                src={encodeURI(merchant.icon)} 
                alt={merchant.icon} 
                className="w-full h-full object-cover"
              />
            </Hexagon>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MerchantSelectionScreen;