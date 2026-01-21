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
  
  const deals = isAngryOwl ? merchant.angryDeals : merchant.deals
  
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
    <div className="min-h-screen relative overflow-hidden flex transition-colors duration-500">
      <div
        className={`absolute inset-0 z-0 pointer-events-none`}
        style={{
          backgroundImage: `url(${merchant.background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {merchant.id === 'marquinhos' ? (
        <div className="flex flex-1 items-end">
          <div className="flex flex-col h-full bg-white deal-card-bg backdrop-blur-md shadow-2xl">
            {deals.map((deal, idx) => (
              <MerchantDealCard
                key={idx}
                {...(deal.type === 'weapon'
                  ? { weapon: deal.weapon }
                  : { construction: deal.construction })}
                costs={deal.costs}
                merchantColor={merchant.color}
                customStyle={'pl-6 pr-10'}
                onClick={() => handleAttemptPurchase(deal)}
              />
            ))}
          </div>

          <div className="relative flex h-full items-end">
            <div className="absolute top-10 left-10 flex flex-col items-start gap-5 z-10">
              <div
                className={`px-10 py-5 rounded-xl shadow-2xl`}
                style={{ backgroundColor: merchant.color }}
              >
                <h1 className="font-erica text-3xl text-white tracking-widest">{merchant.name}</h1>
              </div>
              <button
                onClick={onBack}
                className="p-4 rounded-full bg-white/50 border border-[#b45309]/20 hover:bg-white transition-all shadow-md group"
              >
                <span className={`text-4xl px-2 pb-1 group-hover:-translate-x-1 inline-block transition-transform`}>←</span>
              </button>
            </div>
            
            <div className="relative">
              <div className="absolute z-10 -top-40 left-1/2 ml-40 bg-[#fef9c3] p-10 rounded-[3rem] border-4 border-[#e5d9b6] shadow-2xl max-w-md animate-bounce-slow">
                <p className="text-3xl text-[#4a3225] text-center leading-relaxed font-bold">
                  {canBuy
                    ? speech
                    : noResourcesSpeech
                  }
                </p>
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[25px] border-t-[#e5d9b6]"></div>
              </div>

              <div className="relative group ml-80">
                <img 
                  src={image} 
                  alt={merchant.name} 
                  className={`h-[650px] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-transform duration-700 ${isAngryOwl ? 'grayscale-[0.5] sepia-[0.3]' : ''}`}
                />
              </div>
            </div>
          </div>
        </div>
      ) : merchant.id === 'chico' ? (
        <div className="flex flex-1 justify-between items-end">
          <div className="flex h-full bg-white deal-card-bg backdrop-blur-md shadow-2xl">
            <MerchantDealCard
              weapon={chicoDeals[0].weapon}
              costs={chicoDeals[0].costs}
              merchantColor={merchant.color}
              isColumn={true}
              customStyle={'pl-6'}
              onClick={() => handleAttemptPurchase(chicoDeals[0])}
            />
            <MerchantDealCard
              construction={chicoDeals[2].construction}
              costs={chicoDeals[2].costs}
              merchantColor={merchant.color}
              isColumn={true}
              customStyle={'pl-8 pr-10'}
              onClick={() => handleAttemptPurchase(chicoDeals[2])}
            />
          </div>

          <div className="flex flex-1 h-full flex-col items-start p-10">
            <div className="flex flex-col items-start gap-5 z-10">
              <div
                className={`px-10 py-5 rounded-xl shadow-2xl`}
                style={{ backgroundColor: merchant.color }}
              >
                <h1 className="font-erica text-3xl text-white tracking-widest">{merchant.name}</h1>
              </div>
              <button
                onClick={onBack}
                className="p-4 rounded-full bg-white/50 border border-[#b45309]/20 hover:bg-white transition-all shadow-md group"
              >
                <span className={`text-4xl px-2 pb-1 group-hover:-translate-x-1 inline-block transition-transform`}>←</span>
              </button>
            </div>
            
            <div className="fixed bottom-0 left-1/2 -translate-x-1/2 z-0 pointer-events-none">
              {/* Balão */}
              <div className="absolute z-10 -top-48 left-1/2 -translate-x-1/2 bg-[#fef9c3] p-10 rounded-[3rem] border-4 border-[#e5d9b6] shadow-2xl max-w-md animate-bounce-slow pointer-events-auto">
                <p className="text-3xl text-[#4a3225] text-center leading-relaxed font-bold">
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

                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-0 h-0
                  border-l-[20px] border-l-transparent
                  border-r-[20px] border-r-transparent
                  border-t-[25px] border-t-[#e5d9b6]" />
              </div>

              {/* Personagem */}
              <img
                src={image}
                alt={merchant.name}
                className="h-[650px] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-transform duration-700" />
            </div>
          </div>

          <div className="flex h-full bg-white deal-card-bg backdrop-blur-md shadow-2xl">
            <MerchantDealCard
              weapon={chicoDeals[1].weapon}
              costs={chicoDeals[1].costs}
              merchantColor={merchant.color}
              isColumn={true}
              customStyle={'pl-10 pr-8'}
              onClick={() => handleAttemptPurchase(chicoDeals[1])}
            />
            <MerchantDealCard
              construction={chicoDeals[3].construction}
              costs={chicoDeals[3].costs}
              merchantColor={merchant.color}
              isColumn={true}
              customStyle={'pr-6'}
              onClick={() => handleAttemptPurchase(chicoDeals[3])}
            />
          </div>
        </div>
      ) : (
        <div className="flex items-end justify-center absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 flex flex-col items-start gap-5 z-10">
            <div
              className={`px-10 py-5 rounded-xl shadow-2xl`}
              style={{ backgroundColor: merchant.color }}
            >
              <h1 className="font-erica text-3xl text-white tracking-widest">{merchant.name}</h1>
            </div>
            <button
              onClick={onBack}
              className="p-4 rounded-full bg-white/50 border border-[#b45309]/20 hover:bg-white transition-all shadow-md group"
            >
              <span className={`text-4xl px-2 pb-1 group-hover:-translate-x-1 inline-block transition-transform`}>←</span>
            </button>
          </div>
          
          <div className="flex justify-end items-center">
            <div className="relative h-screen overflow-hidden">
              <img
                src={merchant.image2}
                alt={merchant.name}
                className="mt-7 h-[70vh] sm:h-[80vh] md:h-[90vh] lg:h-screen w-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all" />
            </div>
            <div className="absolute top-40">
              <div className="flex gap-4 pointer-events-auto">
                {deals.map((deal, idx) => (
                  <MerchantDealCard
                    key={idx}
                    {...(deal.type === 'weapon'
                      ? { weapon: deal.weapon }
                      : { construction: deal.construction })}
                    costs={deal.costs}
                    merchantColor={merchant.color}
                    isColumn={true}
                    onClick={() => handleAttemptPurchase(deal)}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-start items-center">
            <div className="relative h-screen overflow-hidden">
              <img
                src={merchant.image}
                alt={merchant.name}
                className="h-[70vh] sm:h-[80vh] md:h-[90vh] lg:h-screen w-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all" />
            </div>
            <div className="absolute z-10 right-20 mt-5 bg-[#fef9c3] p-10 rounded-[3rem] border-4 border-[#e5d9b6] shadow-2xl max-w-md animate-bounce-slow">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[25px] border-b-[#e5d9b6]"></div>
              <p className="text-3xl text-[#4a3225] text-center leading-relaxed font-bold">
                {canBuy
                  ? speech
                  : noResourcesSpeech
                }
              </p>
            </div>
          </div>
        </div>
      )}

      {buyingItem && canBuy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-[#fef9c3] rounded-[3rem] p-12 max-w-xl border-8 border-[#b45309]/30 shadow-2xl text-center">
            <h2 className="font-enriqueta text-5xl mb-8">
              Confirmar Compra?
            </h2>

            <p className="text-3xl mb-8 leading-snug">
              Você deseja comprar a {itemTypeLabel}{' '}
              <span className="font-bold text-[#b45309] uppercase">
                {itemLabel}
              </span>?
            </p>

            <p className="text-3xl mb-8 leading-snug">
              Você gastará {costSummary} para comprar essa {itemTypeLabel}.
            </p>

            <div className="flex gap-8 justify-center">
              <button
                onClick={() => setBuyingItem(null)}
                className="bg-red-500 text-white text-3xl px-12 py-4 rounded-2xl shadow-lg"
              >
                Não
              </button>

              <button
                onClick={() => onPurchase(buyingItem)}
                className="bg-[#22c55e] text-white text-3xl px-12 py-4 rounded-2xl shadow-lg"
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