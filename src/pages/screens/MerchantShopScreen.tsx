import React, { useState } from 'react';
import MerchantDealCard from '@components/MerchantDealCard';
import { Merchant, Character, ResourceState, ResourceType, MerchantDeal } from '@app-types/types';
import chico_safado from '@assets/merchant_images/Mercador 2 - Macaco_safado.png';

interface MerchantShopScreenProps {
  merchant: Merchant;
  playerChar: Character;
  playerResources: ResourceState;
  onBack: () => void;
  onPurchase: (deal: MerchantDeal) => void;
}

const MerchantShopScreen: React.FC<MerchantShopScreenProps> = ({ 
  merchant, playerChar, playerResources, onBack, onPurchase 
}) => {
  const [canBuy, setCanBuy] = useState(true);
  const [buyingItem, setBuyingItem] = useState<MerchantDeal | null>(null);

  const isChico = merchant.id === 'chico';

  const [chicoNoMoneyItems, setChicoNoMoneyItems] = useState<Set<string>>(new Set());
  const [isChicoSafado, setIsChicoSafado] = useState(false);
  const [chicoSafadoDenied, setChicoSafadoDenied] = useState(false);

  const itemLabel =
    buyingItem?.type === 'weapon'
      ? buyingItem.weapon
      : buyingItem?.construction === 'bridge'
        ? 'ponte'
        : 'muralha';

  const itemTypeLabel =
    buyingItem?.type === 'weapon' ? 'arma' : 'construção';

  const isAngryOwl = merchant.id === 'marquinhos' && (playerChar.id === 'outlaws' || playerChar.id === 'punks');

  const speech =
    isChico && isChicoSafado
      ? 'Sem dinheiro? não se preocupe, você pode me pagar de outra forma...'
      : isChico && chicoSafadoDenied
        ? 'Bem, você decide...'
        : isAngryOwl
          ? merchant.angrySpeech
          : merchant.speech;
  
  const image =
    isChico && isChicoSafado
      ? chico_safado
      : isAngryOwl
        ? merchant.angryImage
        : merchant.image;
  
  const deals = isAngryOwl ? merchant.angryDeals : merchant.deals;
  
  const noResourcesSpeech =
    isChico && isChicoSafado
      ? 'Sem dinheiro? não se preocupe, você pode me pagar de outra forma...'
      : buyingItem
          ? isAngryOwl
            ? `Você não tem recursos suficientes para comprar essa ${itemTypeLabel}. Se manda!`
            : `Opa! Parece que você não possui recursos suficientes para comprar esta ${itemTypeLabel}.`
          : '';

  const canAfford = (costs: Partial<Record<ResourceType, number>>) => {
    return Object.entries(costs).every(([res, amount]) => playerResources[res as ResourceType] >= (amount || 0));
  };

  const handleAttemptPurchase = (deal: MerchantDeal) => {
    setBuyingItem(deal);

    if (canAfford(deal.costs)) {
      setCanBuy(true);
      return;
    }

    setCanBuy(false);

    if (!isChico || isChicoSafado || chicoSafadoDenied) return;

    const itemKey =
      deal.type === 'weapon'
        ? `weapon-${deal.weapon}`
        : `construction-${deal.construction}`;

    setChicoNoMoneyItems(prev => {
      const next = new Set(prev);
      next.add(itemKey);

      if (next.size >= 2) {
        setIsChicoSafado(true);
      }

      return next;
    });
  };

  const RESOURCE_LABELS: Record<
    ResourceType,
    { singular: string; plural: string }
  > = {
    niobium: { singular: 'nióbio', plural: 'nióbios' },
    coal: { singular: 'carvão', plural: 'carvões' },
    wood: { singular: 'madeira', plural: 'madeiras' },
    sugar: { singular: 'açúcar', plural: 'açúcares' },
    coffee: { singular: 'café', plural: 'cafés' },
  };

  const costSummary = buyingItem
    ? (() => {
      const parts = Object.entries(buyingItem.costs)
        .map(([res, amount]) => {
          if (typeof amount !== 'number') return null;

          const label =
            amount > 1
              ? RESOURCE_LABELS[res as ResourceType].plural
              : RESOURCE_LABELS[res as ResourceType].singular;

          return (
            <span key={res} className="font-bold underline">
              {amount}{' '}
              <span>{label.toUpperCase()}</span>
            </span>
          );
        })
        .filter((v): v is React.ReactNode => Boolean(v));

        if (parts.length <= 1) return parts[0] ?? null;

        return parts.map((part, index) => {
          const isLast = index === parts.length - 1;
          const isPenultimate = index === parts.length - 2;

          return (
            <React.Fragment key={index}>
              {isLast && ' e '}
              {part}
              {!isLast && !isPenultimate && ', '}
            </React.Fragment>
          );
        });
      })()
    : '';

  const chicoDeals = isChico && isChicoSafado
    ? deals.map(deal => ({
        ...deal,
        costs: { sugar: 5 }
      }))
    : deals;

  return (
    <div className="min-h-screen relative overflow-hidden flex transition-colors duration-500 px-2 sm:px-4 md:px-0">
      {/* Background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `url(${merchant.background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Conteúdo principal */}
      <div className="flex flex-1 flex-col md:flex-row items-end justify-center w-full gap-4 md:gap-0">

        {/* Deal Cards (lado esquerdo em desktop) */}
        { merchant.id === 'chico' ? (
          <div className="flex flex-wrap sm:flex-nowrap gap-2 sm:gap-6 justify-center md:justify-start flex-1 md:flex-none">
            {chicoDeals.map((deal, idx) => (
              <MerchantDealCard
                key={idx}
                {...(deal.type === 'weapon' ? { weapon: deal.weapon } : { construction: deal.construction })}
                costs={deal.costs}
                merchantColor={merchant.color}
                isColumn={true}
                customStyle="mb-2 sm:mb-0"
                onClick={() => handleAttemptPurchase(deal)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap sm:flex-nowrap gap-2 sm:gap-6 justify-center md:justify-start flex-1 md:flex-none">
            {deals.map((deal, idx) => (
              <MerchantDealCard
                key={idx}
                {...(deal.type === 'weapon' ? { weapon: deal.weapon } : { construction: deal.construction })}
                costs={deal.costs}
                merchantColor={merchant.color}
                isColumn={true}
                customStyle="mb-2 sm:mb-0"
                onClick={() => handleAttemptPurchase(deal)}
              />
            ))}
          </div>
        )}

        {/* Balão de fala e personagem */}
        <div className="relative flex flex-col items-center md:items-start w-full md:w-auto">
          <div className={`
            absolute z-10
            ${isChico && isChicoSafado ? '-top-60' : '-top-40'}
            sm:-top-40 left-1/2 md:left-40
            transform -translate-x-1/2 md:translate-x-0
            p-4 sm:p-10
            bg-[#fef9c3]
            rounded-[2rem] sm:rounded-[3rem]
            border-4 border-[#e5d9b6]
            shadow-2xl
            max-w-xs sm:max-w-md
            animate-bounce-slow`}
          >
            <p className="text-xl sm:text-3xl text-[#4a3225] text-center leading-relaxed font-bold">
              {canBuy ? speech : noResourcesSpeech}
            </p>

            {isChico && isChicoSafado && (
              <div className="flex justify-center mt-6">
                <button
                  onClick={() => {
                    setIsChicoSafado(false);
                    setChicoSafadoDenied(true);
                    setChicoNoMoneyItems(new Set());
                    setCanBuy(true);
                    setBuyingItem(null);
                  }}
                    className="bg-red-500 text-white text-2xl px-10 py-3 rounded-2xl shadow-lg hover:bg-red-600 transition"
                >
                  Negar
                </button>
              </div>
            )}
            
            <div className="absolute -bottom-4 sm:-bottom-6 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] sm:border-l-[20px] border-l-transparent border-r-[12px] sm:border-r-[20px] border-r-transparent border-t-[15px] sm:border-t-[25px] border-t-[#e5d9b6]" />
          </div>

          <img
            src={image}
            alt={merchant.name}
            className="h-64 sm:h-[450px] md:h-[650px] lg:h-[650px] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-transform duration-700"
          />
        </div>

        {/* Botão de voltar */}
        <div className="absolute top-4 left-4 sm:top-8 sm:left-8 z-20">
          <button
            onClick={onBack}
            className="p-2 sm:p-4 rounded-full bg-white/50 border border-[#b45309]/20 hover:bg-white transition-all shadow-md"
          >
            <span className="text-2xl sm:text-4xl px-2 pb-1">←</span>
          </button>
        </div>
      </div>

      {/* Modal de confirmação de compra */}
      {buyingItem && canBuy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-2 sm:p-4">
          <div className="bg-[#fef9c3] rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-12 max-w-xs sm:max-w-xl border-4 sm:border-8 border-[#b45309]/30 shadow-2xl text-center">
            <h2 className="font-enriqueta text-2xl sm:text-5xl mb-4 sm:mb-8">
              Confirmar Compra?
            </h2>

            <p className="text-base sm:text-3xl mb-4 sm:mb-8 leading-snug">
              Você deseja comprar a {itemTypeLabel}{' '}
              <span className="font-bold text-[#b45309] uppercase">
                {itemLabel}
              </span>?
            </p>

            <p className="text-base sm:text-3xl mb-4 sm:mb-8 leading-snug">
              Você gastará {costSummary} para comprar essa {itemTypeLabel}.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center">
              <button
                onClick={() => setBuyingItem(null)}
                className="bg-red-500 text-white text-lg sm:text-3xl px-6 sm:px-12 py-2 sm:py-4 rounded-2xl shadow-lg"
              >
                Não
              </button>

              <button
                onClick={() => onPurchase(buyingItem)}
                className="bg-[#22c55e] text-white text-lg sm:text-3xl px-6 sm:px-12 py-2 sm:py-4 rounded-2xl shadow-lg"
              >
                Sim, comprar
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translate(-50%, 0); }
          50% { transform: translate(-50%, -10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default MerchantShopScreen;