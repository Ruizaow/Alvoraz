import React from 'react';
import { EventCard } from '@app-types/types';
import { EVENT_COLORS } from '@constants/constants';

interface EventCardScreenProps {
  card: EventCard;
  onBack: () => void;
}

const EventCardScreen: React.FC<EventCardScreenProps> = ({ card, onBack }) => {
  const typeColor = EVENT_COLORS[card.subtype] || EVENT_COLORS['Estratégica'];

  return (
    <div className="relative w-full h-full bg-[#FFFAEA] overflow-hidden flex flex-col items-center">
      {/* Texture Overlay */}
      <div className="absolute inset-0 texture-overlay opacity-[0.15] z-0"></div>

      {/* Back Button */}
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

      {/* Main Newspaper Wrapper */}
      <div className="relative z-10 w-full max-w-6xl h-full flex flex-col px-4 sm:px-6 md:px-20 py-6 md:py-8">
        
        {/* Newspaper Header */}
        <header className="w-full mb-10">
          <div className="w-full h-[2px] bg-black mb-1"></div>
          
          {/* Main Line */}
          <div className="flex justify-between items-center py-4 border-b border-black/20">
            <div className="absolute hidden md:block w-28">
              <p className="font-farro text-sm leading-tight text-black">
                Você gosta de ler o jornal Pru?
                então assine a nossa revista!
              </p>
            </div>

            <div className="flex-1 text-center">
              <h1 className="
                font-erica
                text-4xl sm:text-5xl md:text-7xl
                text-[#2E2E2E]
                flex flex-wrap items-center justify-center gap-4
                text-center
              ">
                <span className="text-5xl">⬡</span>
                Jornal Pru
                <span className="text-5xl">⬡</span>
              </h1>
            </div>
          </div>

          {/* Secondary Line */}
          <div className="
            flex flex-col sm:flex-row
            justify-between items-center
            gap-2 sm:gap-0
            py-2
            text-center
          ">
            <span className="font-enriqueta font-bold text-lg md:text-xl text-black">Edição {card.edition}</span>
            <span className="font-enriqueta font-bold text-lg md:text-xl text-black">A verdade... mais ou menos.</span>
            <span className="font-enriqueta font-bold text-lg md:text-xl text-black">Com fotos!</span>
          </div>
          
          <div className="w-full h-[2px] bg-black mt-1"></div>
        </header>

        {/* Content Area */}
        <div className="
          flex-1
          flex flex-col md:flex-row
          gap-8 md:gap-12
          overflow-y-auto
          pb-24 md:pb-20
          scrollbar-hide
        ">
          
          {/* Left Column (Content) */}
          <div className="flex-1 flex flex-col gap-6">
            
            {/* Title Header */}
            <div 
              className="flex justify-center items-center p-4 md:p-6 shadow-md"
              style={{ backgroundColor: typeColor }}
            >
              <h2 className="font-erica text-2xl sm:text-3xl md:text-4xl text-[#F7F1DE]">
                {card.title}
              </h2>
            </div>

            {/* Subtitle if exists */}
            {card.subtitle && (
              <h3 className="font-enriqueta font-bold text-xl sm:text-2xl md:text-3xl italic">
                {card.subtitle}
              </h3>
            )}

            {/* Description */}
            <div className="py-4">
              <p className="font-enriqueta-regular text-lg sm:text-xl md:text-2xl leading-relaxed">
                {card.description}
              </p>
            </div>

            {/* Effect */}
            <div className="border-t-2 border-black/20 pt-6">
              <p className="font-enriqueta font-bold text-lg sm:text-xl md:text-2xl bg-black/5 p-4 border-l-8 border-black">
                {card.effect.replace(/\n/g, '<br/>').split('<br/>').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i < card.effect.split('\n').length - 1 && <br/>}
                  </React.Fragment>
                ))}
              </p>
            </div>

            {/* Bottom division line */}
            <div className="w-full h-[2px] bg-black mt-10"></div>
          </div>

          {/* Right Column (Placeholder for Photo) */}
          <div className="w-full md:w-[400px] max-w-sm mx-auto">
            <div className="bg-[#2E2E2E] aspect-square w-full shadow-xl flex items-center justify-center relative border-4 border-[#FFFAEA]">
               {/* Decorative corner markers */}
               <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-white/20"></div>
               <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-white/20"></div>
               <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-white/20"></div>
               <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-white/20"></div>
               
               <p className="text-white/30 font-erica text-4xl">FOTO</p>
            </div>
            <p className="font-enriqueta italic text-sm mt-4 text-center opacity-70">"Legenda: Imagem ilustrativa do evento ocorrido recentemente."</p>
          </div>
        </div>

      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default EventCardScreen;