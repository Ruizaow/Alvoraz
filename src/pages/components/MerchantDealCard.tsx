import React from 'react';
import { ResourceType, WeaponType, ConstructionType } from '@app-types/types';
import { RESOURCE_ICONS, WEAPON_ICONS, CONSTRUCTION_ICONS } from '@constants/constants';

interface MerchantDealCardProps {
  weapon?: WeaponType;
  construction?: ConstructionType;
  costs: Partial<Record<ResourceType, number>>;
  merchantColor: string;
  isColumn: boolean;
  customStyle: string;
  onClick: () => void;
}

const MerchantDealCard: React.FC<MerchantDealCardProps> = ({
  weapon,
  construction,
  costs,
  merchantColor,
  isColumn=false,
  customStyle,
  onClick,
}) => {
  return (
    <div className={`pt-6 sm:pt-10 z-10 ${customStyle}`}>
      <div className={`flex items-start gap-2 sm:gap-4 ${isColumn ? 'flex-col' : 'flex-row'} flex-wrap sm:flex-nowrap`}>
        {/* Arma/Construção */}
        <button
          onClick={onClick}
          className="w-20 h-20 sm:w-32 sm:h-32 rounded-full bg-white border-4 p-2 sm:p-4 shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
          style={{ borderColor: `${merchantColor}80` }}
        >
          <img
            src={weapon ? WEAPON_ICONS[weapon] : CONSTRUCTION_ICONS[construction!]}
            className="w-full h-full object-contain"
          />
        </button>

        {/* Custos */}
        <div className={`flex gap-2 sm:gap-4 ${isColumn ? 'flex-col' : 'flex-row'} flex-wrap`}>
          {Object.entries(costs).map(([res, amount]) => (
            <div key={res} className="flex flex-col items-center group">
              <div
                className="w-16 h-16 sm:w-24 sm:h-24 bg-white border-2 rounded-full p-1 shadow-sm flex items-center justify-center"
                style={{ borderColor: `${merchantColor}80` }}
              >
                <img
                  src={RESOURCE_ICONS[res as ResourceType]}
                  className="w-full h-full object-contain"
                />
              </div>

              <span
                className="absolute ml-10 mt-12 text-white font-enriqueta text-sm sm:text-lg px-1 sm:px-2 rounded-lg shadow-md group-hover:scale-110 transition-transform"
                style={{ backgroundColor: merchantColor }}
              >
                x{amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MerchantDealCard;