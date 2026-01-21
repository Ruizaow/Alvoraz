export type ResourceType = 'sugar' | 'coal' | 'wood' | 'niobium' | 'coffee';
export type WeaponType = 'machareta' | 'cerraca';
export type ConstructionType = 'bridge' | 'wall';

export interface Character {
  id: string;
  name: string;
  animal: string;
  color: string;
  description: string;
  image: string;
}

export interface ResourceState {
  sugar: number;
  coal: number;
  wood: number;
  niobium: number;
  coffee: number;
}

export interface WeaponState {
  machareta: number;
  cerraca: number;
}

export interface ConstructionState {
  bridge: number;
  wall: number;
}

export type EventType = 'Do Bom' | 'Do Ruim' | 'Estratégica';
export type EventSubtype = 'Área limitada' | 'Em área' | 'Pro jogador' | 'Nenhum';

export interface EventCard {
  id: number;
  edition: string;
  type: EventType;
  subtype: EventSubtype;
  title: string;
  subtitle?: string;
  description: string;
  effect: string;
}

export interface GameState {
  selectedCharacter: Character | null;
  resources: ResourceState;
  weapons: WeaponState;
  constructions: ConstructionState;
  drawnEventIds: number[];
  currentEvent: EventCard | null;
}

export type MerchantDeal =
  | {
      type: 'weapon';
      weapon: WeaponType;
      costs: Partial<Record<ResourceType, number>>;
    }
  | {
      type: 'construction';
      construction: ConstructionType;
      costs: Partial<Record<ResourceType, number>>;
    };

export interface Merchant {
  id: string;
  icon: string;
  name: string;
  speech: string;
  angrySpeech?: string;
  color: string;
  background: string;
  image: string;
  image2?: string;
  angryImage?: string;
  deals: MerchantDeal[];
  angryDeals?: MerchantDeal[];
}