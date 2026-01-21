import React from 'react';
import { MERCHANTS } from '@constants/constants';
import Hexagon from '@components/Hexagon';

interface MerchantSelectionScreenProps {
  onBack: () => void;
  onSelectMerchant: (id: string) => void;
}

const MerchantSelectionScreen: React.FC<MerchantSelectionScreenProps> = ({ onBack, onSelectMerchant }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full relative">
      <button
        onClick={onBack}
        className="absolute top-8 left-8 p-4 rounded-full bg-white/50 border border-[#b45309]/20 hover:bg-white transition-all shadow-md group"
      >
        <span className={`text-4xl px-2 pb-1 group-hover:-translate-x-1 inline-block transition-transform`}>←</span>
      </button>

      <h1 className="font-erica text-[#2E2E2E] text-7xl mb-16">Mercadores</h1>

      <div className="flex gap-16">
        {MERCHANTS.map((merchant) => (
          <div key={merchant.id} className="flex flex-col items-center gap-4">
            <Hexagon 
              color={merchant.id === 'marquinhos' ? '#662f97' : merchant.id === 'mosca' ? '#112c6a' : '#eb8d3a'} 
              size={200}
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