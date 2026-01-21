import React, { useState } from 'react';
import { MERCHANTS, EVENT_CARDS, INITIAL_RESOURCES_BY_CHARACTER } from '@constants/constants';
import { GameState, Character, ResourceType, WeaponType, ConstructionType, MerchantDeal, EventCard } from '@app-types/types';
import SelectionScreen from '@screens/SelectionScreen';
import DashboardScreen from '@screens/DashboardScreen';
import EventSelectionScreen from '@screens/EventSelectionScreen';
import EventCardScreen from '@screens/EventCardScreen';
import MerchantSelectionScreen from '@screens/MerchantSelectionScreen';
import MerchantShopScreen from '@screens/MerchantShopScreen';

const App: React.FC = () => {
  const [view, setView] = useState<'selection' | 'dashboard' | 'merchant-selection' | 'merchant-shop' | 'event-selection' | 'event-card'>('selection');
  const [gameState, setGameState] = useState<GameState>({
    selectedCharacter: null,
    resources: {
      sugar: 5,
      coal: 5,
      wood: 5,
      niobium: 5,
      coffee: 5
    },
    weapons: {
      machareta: 0,
      cerraca: 0
    },
    constructions: {
      bridge: 0,
      wall: 0
    },
    drawnEventIds: [],
    currentEvent: null
  });
  const [activeMerchantId, setActiveMerchantId] = useState<string | null>(null);

  const handleSelectCharacter = (char: Character | null) => {
    if (!char) {
      setGameState(prev => ({
        ...prev,
        selectedCharacter: null,
      }));
      return;
    }

    setGameState(prev => ({
      ...prev,
      selectedCharacter: char,
      resources: INITIAL_RESOURCES_BY_CHARACTER[char.id],
      weapons: {
        machareta: 0,
        cerraca: 0,
      },
      constructions: {
        bridge: 0,
        wall: 0
      }
    }));
  };

  const handlePlay = () => {
    if (gameState.selectedCharacter) {
      setView('dashboard');
    }
  };

  const updateResource = (resource: ResourceType, delta: number) => {
    setGameState(prev => ({
      ...prev,
      resources: {
        ...prev.resources,
        [resource]: Math.min(12, Math.max(0, prev.resources[resource] + delta))
      }
    }));
  };

  const updateWeapon = (weapon: WeaponType, delta: number) => {
    setGameState(prev => ({
      ...prev,
      weapons: {
        ...prev.weapons,
        [weapon]: Math.min(12, Math.max(0, prev.weapons[weapon] + delta))
      }
    }));
  };

  const updateConstruction = (construction: ConstructionType, delta: number) => {
    setGameState(prev => ({
      ...prev,
      constructions: {
        ...prev.constructions,
        [construction]: Math.min(12, Math.max(0, prev.constructions[construction] + delta))
      }
    }));
  };

  const handleBuy = (deal: MerchantDeal) => {
    setGameState(prev => {
      const newResources = { ...prev.resources };

      Object.entries(deal.costs).forEach(([res, amount]) => {
        newResources[res as ResourceType] -= amount ?? 0;
      });

      return {
        ...prev,
        resources: newResources,
        weapons:
          deal.type === 'weapon'
            ? {
                ...prev.weapons,
                [deal.weapon]: prev.weapons[deal.weapon] + 1,
              }
            : prev.weapons,
        constructions:
          deal.type === 'construction'
            ? {
                ...prev.constructions,
                [deal.construction]:
                  prev.constructions[deal.construction] + 1,
              }
            : prev.constructions,
      };
    });

    setView('dashboard');
  };

  const drawNewEvent = () => {
    let availableIds = EVENT_CARDS.map(c => c.id).filter(id => !gameState.drawnEventIds.includes(id));
    
    // If all cards drawn, reset pool
    if (availableIds.length === 0) {
      availableIds = EVENT_CARDS.map(c => c.id);
      gameState.drawnEventIds = [];
    }

    const randomIndex = Math.floor(Math.random() * availableIds.length);
    const chosenId = availableIds[randomIndex];
    const chosenCard = EVENT_CARDS.find(c => c.id === chosenId)!;

    setGameState(prev => ({
      ...prev,
      drawnEventIds: [...prev.drawnEventIds, chosenId],
      currentEvent: chosenCard
    }));
    setView('event-card');
  };

  const showSpecificEvent = (id: number) => {
    const card = EVENT_CARDS.find(c => c.id === id)!;
    setGameState(prev => ({ ...prev, currentEvent: card }));
    setView('event-card');
  };

  return (
    <div className="w-screen h-screen paper-bg text-[#4a3225]">
      {view === 'selection' && (
        <SelectionScreen 
          selectedChar={gameState.selectedCharacter}
          onSelect={handleSelectCharacter}
          onPlay={handlePlay}
        />
      )}
      {view === 'dashboard' && gameState.selectedCharacter && (
        <DashboardScreen 
          character={gameState.selectedCharacter}
          resources={gameState.resources}
          weapons={gameState.weapons}
          constructions={gameState.constructions}
          onUpdateResource={updateResource}
          onUpdateWeapon={updateWeapon}
          onUpdateConstruction={updateConstruction}
          onEventsClick={() => setView('event-selection')}
          onBuyClick={() => setView('merchant-selection')}
        />
      )}
      {view === 'merchant-selection' && (
        <MerchantSelectionScreen 
          onBack={() => setView('dashboard')}
          onSelectMerchant={(id) => {
            setActiveMerchantId(id);
            setView('merchant-shop');
          }}
        />
      )}
      {view === 'merchant-shop' && activeMerchantId && (
        <MerchantShopScreen 
          merchant={MERCHANTS.find(m => m.id === activeMerchantId)!}
          playerChar={gameState.selectedCharacter!}
          playerResources={gameState.resources}
          onBack={() => setView('merchant-selection')}
          onPurchase={handleBuy}
        />
      )}
      {view === 'event-selection' && (
        <EventSelectionScreen 
          onBack={() => setView('dashboard')}
          onDrawEvent={drawNewEvent}
          historyIds={gameState.drawnEventIds}
          onViewHistory={showSpecificEvent}
        />
      )}
      {view === 'event-card' && gameState.currentEvent && (
        <EventCardScreen 
          card={gameState.currentEvent}
          onBack={() => setView('event-selection')}
        />
      )}
    </div>
  );
};

export default App;