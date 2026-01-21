import React from 'react';
import { Character, ResourceState, WeaponState, ConstructionState, ResourceType, WeaponType, ConstructionType } from '@app-types/types';
import { DASHBOARD_THEME, RESOURCE_ICONS, WEAPON_ICONS, CONSTRUCTION_ICONS } from '@constants/constants';
import Hexagon from '@components/Hexagon';
import Control from '@components/Control';

interface DashboardScreenProps {
  character: Character;
  resources: ResourceState;
  weapons: WeaponState;
  constructions: ConstructionState;
  onUpdateResource: (res: ResourceType, delta: number) => void;
  onUpdateWeapon: (weap: WeaponType, delta: number) => void;
  onUpdateConstruction: (construc: ConstructionType, delta: number) => void;
  onBuyClick: () => void;
  onEventsClick: () => void;
}

const DashboardScreen: React.FC<DashboardScreenProps> = ({ 
  character, resources, weapons, constructions, onUpdateResource, onUpdateWeapon, onUpdateConstruction, onEventsClick, onBuyClick 
}) => {
  const theme = DASHBOARD_THEME[character.id];

  return (
    <div
      className="
        px-4 py-6
        md:p-10
        min-h-screen
        relative
        overflow-y-auto
      "
      style={{ backgroundColor: theme.bg }}
    >
      <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8 mb-8 md:mb-10">
        <div className="block md:hidden">
          <Hexagon color={character.color} size={120}>
            <img 
              src={encodeURI(character.image)} 
              className="w-full h-full object-contain rounded-md" 
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  parent.classList.add('flex', 'items-center', 'justify-center');
                  parent.innerHTML = `<span class="text-5xl font-erica text-[#4a3225]">${character.name[0]}</span>`;
                }
              }}
            />
          </Hexagon>
        </div>
        <div className="hidden md:block">
          <Hexagon color={character.color} size={160}>
            <img 
              src={encodeURI(character.image)} 
              className="w-full h-full object-contain rounded-md" 
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  parent.classList.add('flex', 'items-center', 'justify-center');
                  parent.innerHTML = `<span class="text-5xl font-erica text-[#4a3225]">${character.name[0]}</span>`;
                }
              }}
            />
          </Hexagon>
        </div>
        <div className="flex-1">
          <h1 className="font-erica text-3xl md:text-6xl mb-2 text-[#2E2E2E]">
            {character.name}
          </h1>
          <div
            className="rounded-2xl p-4 md:p-6 border-2 shadow-md"
            style={{ backgroundColor: theme.bg, borderColor: theme.border }}
          >
            <p className="font-enriqueta text-base md:text-2xl text-black">
              {character.description}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 pb-10">
        {/* Resources Grid */}
        <div className="
          flex flex-col items-center
          md:col-span-4
          bg-white/30
          p-4 md:p-6
          rounded-3xl
          border border-white/50
          backdrop-blur-sm
        ">
          <h2 className="font-enriqueta text-2xl md:text-4xl mb-6 text-black">Recursos</h2>
          <div className="grid grid-cols-2 gap-x-6 gap-y-4 md:gap-x-16 md:gap-y-6">
            <Control label="Açúcar" icon={RESOURCE_ICONS.sugar} border={theme.border} value={resources.sugar} onChange={(v) => onUpdateResource('sugar', v - resources.sugar)} />
            <Control label="Carvão" icon={RESOURCE_ICONS.coal} border={theme.border} value={resources.coal} onChange={(v) => onUpdateResource('coal', v - resources.coal)} />
            <Control label="Madeira" icon={RESOURCE_ICONS.wood} border={theme.border} value={resources.wood} onChange={(v) => onUpdateResource('wood', v - resources.wood)} />
            <Control label="Nióbio" icon={RESOURCE_ICONS.niobium} border={theme.border} value={resources.niobium} onChange={(v) => onUpdateResource('niobium', v - resources.niobium)} />
            <Control label="Café" icon={RESOURCE_ICONS.coffee} border={theme.border} value={resources.coffee} onChange={(v) => onUpdateResource('coffee', v - resources.coffee)} />
          </div>
        </div>

        {/* Weapons Column */}
        <div className="flex flex-col items-center md:col-span-2 bg-white/30 p-6 rounded-[2rem] border border-white/50 backdrop-blur-sm">
          <h2 className="font-enriqueta text-4xl mb-8 text-[#000000]">Armas</h2>
          <div className="flex flex-col gap-10">
            <Control label="Machareta" icon={WEAPON_ICONS.machareta} border={theme.border} value={weapons.machareta} onChange={(v) => onUpdateWeapon('machareta', v - weapons.machareta)} />
            <Control label="Cerraca" icon={WEAPON_ICONS.cerraca} border={theme.border} value={weapons.cerraca} onChange={(v) => onUpdateWeapon('cerraca', v - weapons.cerraca)} />
          </div>
        </div>

        {/* Construções Column */}
        <div className="flex flex-col items-center md:col-span-2 bg-white/30 p-6 rounded-[2rem] border border-white/50 backdrop-blur-sm">
          <h2 className="font-enriqueta text-4xl mb-8 text-[#000000]">Construções</h2>
          <div className="flex flex-col gap-10">
            <Control label="Ponte" icon={CONSTRUCTION_ICONS.bridge} border={theme.border} value={constructions.bridge} onChange={(v) => onUpdateConstruction('bridge', v - constructions.bridge)} />
            <Control label="Muralha" icon={CONSTRUCTION_ICONS.wall} border={theme.border} value={constructions.wall} onChange={(v) => onUpdateConstruction('wall', v - constructions.wall)} />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="md:col-span-4 flex flex-col gap-6 md:gap-8 justify-center h-full">
          <h2 className="font-enriqueta text-2xl md:text-4xl -mb-2 md:mb-2 text-center text-black">
            Menu de Ação
          </h2>
          <button
            onClick={onEventsClick}
            className="
              bg-[#F7F1DE]
              rounded-3xl
              py-4 md:py-10
              px-4 md:px-10
              shadow-xl
              flex items-center justify-center gap-3 md:gap-4
              hover:scale-105
              transition-all
            "
          >
            <div
              className={`
                font-erica text-[#000000]
                w-10 h-10 md:w-16 md:h-16
                rounded-full
                flex items-center justify-center
                text-xl md:text-4xl
                group-hover:scale-110 transition-transform
              `}
              style={{ backgroundColor: theme.border }}
            >!</div>
            <span className="font-erica text-xl md:text-5xl text-[#2E2E2E]">
              Eventos
            </span>
          </button>
          <button 
            onClick={onBuyClick}
            className="
              bg-[#F7F1DE]
              rounded-3xl
              py-4 md:py-10
              px-4 md:px-10
              shadow-xl
              flex items-center justify-center gap-3 md:gap-4
              hover:scale-105
              transition-all group
            "
          >
            <div
              className={`w-10 h-10 md:w-16 md:h-16 rounded-2xl rotate-45 shadow-lg group-hover:rotate-90 transition-transform`}
              style={{ backgroundColor: theme.border }}
            />
            <span className="font-erica text-xl md:text-5xl text-[#2E2E2E]">Comprar</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;