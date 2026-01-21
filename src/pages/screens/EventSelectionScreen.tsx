import React from 'react';
import background_table from '@assets/backgrounds/background_table.png';

interface EventSelectionScreenProps {
  onBack: () => void;
  onDrawEvent: () => void;
  historyIds: number[];
  onViewHistory: (id: number) => void;
}

const EventSelectionScreen: React.FC<EventSelectionScreenProps> = ({ 
  onBack, onDrawEvent, historyIds, onViewHistory 
}) => {
  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-y-auto py-10">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${background_table})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-[#200700] opacity-40" />
      <div className="absolute inset-0 texture-overlay opacity-50" />

      {/* Back Button */}
      <button 
        onClick={onBack}
        className="
          absolute top-4 left-4 md:top-8 md:left-8
          p-2 md:p-4
          rounded-full
          bg-white/20 border border-white/30
          text-white
          hover:bg-white/40
          transition-all
          shadow-md
          z-20
        "
      >
        <span className="text-2xl md:text-4xl px-2 pb-1">←</span>
      </button>

      {/* Title */}
      <h1
        className="
          relative z-10
          font-erica
          text-4xl sm:text-5xl md:text-8xl
          text-[#f3e5ab]
          mb-8 md:mb-12
          drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)]
          text-center
        "
      >
        Eventos
      </h1>

      {/* Newspaper Card */}
      <div
        className="relative z-10 cursor-pointer"
        onClick={onDrawEvent}
      >
        <div
          className="
            relative
            w-[280px] sm:w-[360px] md:w-[500px]
            transition-all
            hover:scale-105 hover:brightness-110
            duration-300
          "
        >
          <div className="bg-[#FFFAEA] w-full aspect-[4/3] shadow-2xl rounded-sm border-2 border-black/10 overflow-hidden flex flex-col p-3 md:p-4">
            
            <div className="border-b-2 border-black/80 pb-2 mb-2 flex justify-between items-end">
              <span className="font-erica text-xl md:text-3xl">Jornal Pru</span>
              <span className="text-[10px] md:text-xs opacity-60">
                Edição Especial
              </span>
            </div>

            <div className="flex-1 flex flex-col gap-2">
              <div className="h-3 bg-black/10 w-full"></div>
              <div className="h-3 bg-black/10 w-full"></div>
              <div className="h-20 md:h-24 bg-black/20 w-full mt-2"></div>
              <div className="flex gap-2 mt-2">
                <div className="flex-1 h-16 md:h-20 bg-black/10"></div>
                <div className="flex-1 h-16 md:h-20 bg-black/10"></div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* History Thumbnails */}
      {historyIds.length > 0 && (
        <div className="relative z-20 mt-10 w-full px-4">
          <div
            className="
              flex flex-wrap
              justify-center
              gap-3
              py-4
            "
          >
            {historyIds.map((id, index) => (
              <div 
                key={`${id}-${index}`}
                onClick={() => onViewHistory(id)}
                className="
                  w-10 h-14 md:w-12 md:h-16
                  bg-[#FFFAEA]
                  border border-black/30
                  shadow-md
                  cursor-pointer
                  hover:scale-110 hover:brightness-110
                  transition-all
                  flex flex-col items-center justify-center p-1 rounded-sm
                "
                title={`Ver evento ${id}`}
              >
                <div className="w-full h-1 bg-black/20 mb-1"></div>
                <div className="w-full h-1 bg-black/20 mb-1"></div>
                <div className="w-5 h-5 bg-black/10"></div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventSelectionScreen;