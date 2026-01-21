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
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      {/* Table Background */}
      <div
        className={`absolute inset-0`}
        style={{
          backgroundImage: `url(${background_table})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[#200700] opacity-40"></div>
      
      {/* Texture Overlay */}
      <div className="absolute inset-0 texture-overlay opacity-50"></div>

      {/* Back Button */}
      <button 
        onClick={onBack}
        className="absolute top-8 left-8 p-4 rounded-full bg-white/20 border border-white/30 text-white hover:bg-white/40 transition-all shadow-md group z-20"
      >
        <span className={`text-4xl px-2 pb-1 group-hover:-translate-x-1 inline-block transition-transform`}>←</span>
      </button>

      <h1 className="relative z-10 font-erica text-8xl text-[#f3e5ab] mb-12 drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)]">
        Eventos
      </h1>

      {/* Newspaper Card */}
      <div className="relative z-10 group cursor-pointer" onClick={onDrawEvent}>
        <div className="relative w-[400px] md:w-[500px] transition-all transform group-hover:scale-105 group-hover:brightness-125 duration-300">
           {/* Simple Newspaper Image Simulation */}
           <div className="bg-[#FFFAEA] w-full aspect-[4/3] shadow-2xl rounded-sm border-2 border-black/10 overflow-hidden flex flex-col p-4">
              <div className="border-b-2 border-black/80 pb-2 mb-2 flex justify-between items-end">
                <span className="font-erica text-3xl">Jornal Pru</span>
                <span className="text-xs opacity-60">Edição Especial</span>
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <div className="h-4 bg-black/10 w-full"></div>
                <div className="h-4 bg-black/10 w-full"></div>
                <div className="h-24 bg-black/20 w-full mt-2"></div>
                <div className="flex gap-2 mt-2">
                  <div className="flex-1 h-20 bg-black/10"></div>
                  <div className="flex-1 h-20 bg-black/10"></div>
                </div>
              </div>
           </div>
        </div>
      </div>

      {/* History Thumbnails */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center items-center gap-4 px-10 z-20">
        {historyIds.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 max-w-full overflow-x-hidden py-4">
            {historyIds.map((id, index) => (
              <div 
                key={`${id}-${index}`}
                onClick={() => onViewHistory(id)}
                className="w-12 h-16 bg-[#FFFAEA] border border-black/30 shadow-md cursor-pointer hover:scale-110 hover:brightness-110 transition-all flex flex-col items-center justify-center p-1 rounded-sm"
                title={`Ver evento ${id}`}
              >
                <div className="w-full h-1 bg-black/20 mb-1"></div>
                <div className="w-full h-1 bg-black/20 mb-1"></div>
                <div className="w-6 h-6 bg-black/10"></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventSelectionScreen;