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
    <div className={`pt-10 z-10 ${customStyle}`}>
      <div className={`flex items-start gap-4 ${isColumn ? 'flex-col' : ''}`}>
        {/* Arma */}
        <button
          onClick={onClick}
          className="w-32 h-32 rounded-full bg-white border-4 p-4 shadow-lg hover:scale-110 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
          style={{ borderColor: `${merchantColor}80` }}
        >
          <img
            src={
              weapon
                ? WEAPON_ICONS[weapon]
                : CONSTRUCTION_ICONS[construction!]
            }
            className="w-full h-full object-contain"
          />
        </button>

        {/* Custos */}
        <div className={`flex gap-4 ${isColumn ? 'flex-col' : ''}`}>
          {Object.entries(costs).map(([res, amount]) => (
            <div key={res} className="flex flex-col items-center group">
              <div className="relative">
                <div
                  className="w-24 h-24 bg-white border-2 rounded-full p-1 shadow-sm"
                  style={{ borderColor: `${merchantColor}80` }}
                >
                  <img
                    src={RESOURCE_ICONS[res as ResourceType]}
                    className="w-full h-full object-contain"
                  />
                </div>

                <span
                  className="absolute -bottom-2 -right-2 text-white font-enriqueta text-lg px-2 rounded-lg shadow-md group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: merchantColor }}
                >
                  x{amount}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MerchantDealCard;