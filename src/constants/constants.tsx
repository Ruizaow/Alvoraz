import { Character, Merchant, ResourceType, WeaponType, ConstructionType, EventCard, GameState } from '@app-types/types';
import {
  onca, calango, chacal, soin, acucar, carvao, madeira, niobio, cafe,
  machareta, cerraca, bridge, wall, marquinho_icon, marquinho_background,
  marquinho_image, marquinho_angryImage, estranho_icon, estranho_background,
  estranho_image, estranho_image_2, chico_icon, chico_background, chico_image
 } from '@assets/index';

export const CHARACTERS: Character[] = [
  {
    id: 'punks',
    name: 'Rebeldes',
    animal: 'onças',
    color: '#FCB53B',
    description: 'Mova suas onças pelo tabuleiro!',
    image: onca
  },
  {
    id: 'outlaws',
    name: 'Foras da lei',
    animal: 'calangos',
    color: '#B87C4C',
    description: 'Mova seus calangos pelo tabuleiro!',
    image: calango
  },
  {
    id: 'law',
    name: 'A Lei',
    animal: 'chacaus',
    color: '#577B8D',
    description: 'Mova seus chacaus pelo tabuleiro!',
    image: chacal
  },
  {
    id: 'scholars',
    name: 'Nerds',
    animal: 'soins',
    color: '#9946E6',
    description: 'Mova seus soins pelo tabuleiro!',
    image: soin
  }
];

export const INITIAL_RESOURCES_BY_CHARACTER: Record<string, GameState['resources']> = {
  punks: {
    coffee: 2,
    sugar: 1,
    coal: 1,
    wood: 1,
    niobium: 0,
  },
  scholars: {
    coffee: 1,
    sugar: 2,
    coal: 1,
    wood: 1,
    niobium: 0,
  },
  law: {
    coffee: 1,
    sugar: 1,
    coal: 2,
    wood: 1,
    niobium: 0,
  },
  outlaws: {
    coffee: 1,
    sugar: 1,
    coal: 1,
    wood: 2,
    niobium: 0,
  },
};

export const RESOURCE_ICONS: Record<ResourceType, string> = {
  sugar: acucar,
  coal: carvao,
  wood: madeira,
  niobium: niobio,
  coffee: cafe
};

export const WEAPON_ICONS: Record<WeaponType, string> = {
  machareta: machareta,
  cerraca: cerraca
};

export const CONSTRUCTION_ICONS: Record<ConstructionType, string> = {
  bridge: bridge,
  wall: wall
};

export const MERCHANTS: Merchant[] = [
  {
    id: 'marquinhos',
    icon: marquinho_icon,
    name: 'Sr. Marquinhos',
    speech: 'Oh, você. Vejo que tem bom gosto para mercadores.',
    angrySpeech: 'Arhg, os seus tipos não são bem vindos aqui. Compre algo logo e saia.',
    color: '#662f97',
    background: marquinho_background,
    image: marquinho_image,
    angryImage: marquinho_angryImage,
    deals: [
      { type: 'weapon', weapon: 'machareta', costs: { niobium: 2, wood: 2, coal: 1 } },
      { type: 'weapon', weapon: 'cerraca', costs: { niobium: 2, wood: 1 } },
      { type: 'construction', construction: 'bridge', costs: { wood: 5, niobium: 2 } },
      { type: 'construction', construction: 'wall', costs: { niobium: 5 } }
    ],
    angryDeals: [
      { type: 'weapon', weapon: 'machareta', costs: { niobium: 2, wood: 3, coal: 2 } },
      { type: 'weapon', weapon: 'cerraca', costs: { niobium: 2, wood: 2 } },
      { type: 'construction', construction: 'bridge', costs: { wood: 5, niobium: 3 } },
      { type: 'construction', construction: 'wall', costs: { niobium: 6 } }
    ]
  },
  {
    id: 'mosca',
    icon: estranho_icon,
    name: 'Vendedor Estranho',
    speech: 'Ei jovem, você vai comprar ou não?',
    color: '#112c6a',
    background: estranho_background,
    image: estranho_image,
    image2: estranho_image_2,
    deals: [
      { type: 'weapon', weapon: 'machareta', costs: { niobium: 2, wood: 2, coal: 1 } },
      { type: 'weapon', weapon: 'cerraca', costs: { niobium: 2, wood: 1 } },
      { type: 'construction', construction: 'bridge', costs: { wood: 5, niobium: 2 } },
      { type: 'construction', construction: 'wall', costs: { niobium: 5 } }
    ]
  },
  {
    id: 'chico',
    icon: chico_icon,
    name: 'Chico Cruzeiros',
    speech: 'Olá caro cliente! Vamos, olhe o que quiser!',
    color: '#eb8d3a',
    background: chico_background,
    image: chico_image,
    deals: [
      { type: 'weapon', weapon: 'machareta', costs: { niobium: 2, wood: 2, coal: 1 } },
      { type: 'weapon', weapon: 'cerraca', costs: { niobium: 2, wood: 1 } },
      { type: 'construction', construction: 'bridge', costs: { wood: 5, niobium: 2 } },
      { type: 'construction', construction: 'wall', costs: { niobium: 5 } }
    ]
  },
];

export const EVENT_COLORS: Record<string, string> = {
  'Área limitada': '#B87C4C',
  'Em área': '#EB453A',
  'Pro jogador': '#84994F',
  'Estratégica': '#577B8D'
};

export const EVENT_CARDS: EventCard[] = [
  {
    id: 1,
    edition: '01',
    type: 'Do Bom',
    subtype: 'Área limitada',
    title: 'Fora pena!',
    subtitle: '“Nativos de Rupiar Reagem e Expulsam Tropas Pelicanas”',
    description: 'Após meses de pressão do coronel da cidade Pelicanos, tropas avançaram sobre a Vila Rupiar, fundada pela realeza Galinha I. Liderados pelo pastor Pardaulino, os moradores se uniram e repeliram os soldados invasores. A vitória reacende o orgulho local, que explode em celebrações pela defesa do território sagrado.',
    effect: 'Efeito: Uma rodada vai ser dado madeira 4 e outra rodada café 2 para quem conseguir chegar naquela área de evento.'
  },
  {
    id: 2,
    edition: '02',
    type: 'Do Bom',
    subtype: 'Área limitada',
    title: 'Fluxo de Retorno!',
    description: 'Trabalhadores Tucanos migraram para o cerrado durante a grande construção da nova capital. 20 anos desde a inauguração os tucanos estão retornando para suas regiões de origem. Devido ao grande fluxo de retorno, muitas lojas e fábricas tiveram que fechar suas portas pela falta de trabalhadores que aceitassem um salário humilde.',
    effect: 'Efeito: Se tiver 1 território com 3 ou mais cartas de terreno da Caatinga, rouba recursos de terrenos de vegetação da Mata Atlântica e Cerrado adjacentes a este evento; se não, bloqueia os jogadores de coletar recursos dos terrenos do Cerrado e Mata Atlântica adjacentes a este evento.'
  },
  {
    id: 3,
    edition: '03',
    type: 'Do Bom',
    subtype: 'Área limitada',
    title: 'Trabalhadores Tucanos mortos de tanto trabalhar',
    description: 'Protetores do Estado marcharam até o acampamento dos tucanos durante a construção da nova capital. Aparentemente, os tucanos não paravam de questionar o porquê de não terem acesso à moradia, alimentação e saneamento básico; como resposta, o presidente do país “não ordena” soldados a invadirem o acampamento e “conversarem” com os trabalhadores.',
    effect: 'Efeito: O jogador que tiver mais cartas de (cerrado) dentro do total dos territórios receberá por um turno o número máximo de recursos que estiverem em sua posse.'
  },
  {
    id: 4,
    edition: '04',
    type: 'Do Bom',
    subtype: 'Área limitada',
    title: 'Dono de terra',
    description: 'Misteriosamente o grupo político religioso dos pardais vence as eleições novamente no nordeste sendo que o contrato era que um outro governante do cerrado ganhasse.',
    effect: 'Efeito: O jogador pode realocar as 4 cartas adjacentes a esta para qualquer lugar do mapa.'
  },
  {
    id: 5,
    edition: '05',
    type: 'Do Bom',
    subtype: 'Em área',
    title: 'Ferrou!',
    description: 'Um ferreiro armista estrangeiro visita o país e traz com ele o aço.',
    effect: 'Efeito: Ele oferece ao jogador uma arma que dá +4 no dado, em troca de 7 nióbios e 10 carvões. O jogador pode escolher comprar a carta de arma ou não. Após uma rodada, o ferreiro é descartado. \nSó existem 3 exemplares da arma.'
  },
  {
    id: 6,
    edition: '06',
    type: 'Do Bom',
    subtype: 'Em área',
    title: 'Ferrou!',
    description: 'O Estado elaborou um plano (que funciona) para diminuir a inflação do país. O Falso, uma moeda virtual temporária, em breve será implementada como uma moeda real após a conclusão do plano.',
    effect: 'Efeito: Por 2 turnos todos os mercadores comuns vendem seus produtos pela metade do preço.'
  },
  {
    id: 7,
    edition: '07',
    type: 'Do Bom',
    subtype: 'Pro jogador',
    title: 'Conhecimento é poder',
    description: 'Apesar de falar uma língua estranha e rezar para deuses estranhos, seu grupo decide acolher um grupo de ratos estrangeiros. Vocês compartilham comida, bebida e conhecimento. Agora todos sabem o básico de higiene animal e direitos trabalhistas!',
    effect: 'Efeito: Você impediu o nascimento de uma possível pandemia, ganhe +2 em rolagens de ataque OU defesa nas próximas 2 batalhas.'
  },
  {
    id: 8,
    edition: '08',
    type: 'Do Bom',
    subtype: 'Pro jogador',
    title: 'Tem para todo mundo!',
    description: 'O honorável, esplendoroso, misericordioso e totalmente elegível no próximo ano, presidente do Prasil anunciou com grande festa a inauguração do primeiro salário mínimo do país!',
    effect: 'Efeito: O jogador recebe o mínimo do recurso que é mais apegado (1 recurso) durante 2 rodadas. \nRebeldes: Madeira \nForas da Lei: Café \nA Lei: Carvão \nNerds: Açúcar'
  },
  {
    id: 9,
    edition: '09',
    type: 'Do Bom',
    subtype: 'Pro jogador',
    title: 'Horóscopo do dia',
    description: 'Segundo os pardais, está escrito nas enormes esferas de plasma em fusão nuclear que liberam energia na forma de luz e calor, tornando-se visíveis a olho nu graças à emissão contínua de fótons, que hoje provavelmente é o seu dia de sorte.',
    effect: 'Efeito: REBELDES e FORAS DA LEI: Podem colher os recursos dobrados nas 5 cartas adjacentes a esta. Caso o evento seja ativado por qualquer outro grupo, o jogador deverá escolher um terreno adjacente para receber instantaneamente o número máximo de 1 recurso.'
  },
  {
    id: 10,
    edition: '10',
    type: 'Do Bom',
    subtype: 'Pro jogador',
    title: 'Sumiu!',
    description: 'A gasolina some, o querosene evapora, e boatos surgem de que um jogador abasteceu seu carro movido a carvão. O Prasil inteiro entra em pânico energético.',
    effect: 'Efeito: Durante 3 rodadas você precisa sacrificar 2 carvões para realizar uma ação.'
  },
  {
    id: 11,
    edition: '11',
    type: 'Do Ruim',
    subtype: 'Área limitada',
    title: 'A população da cidade Pelicanos se revolta contra o estado!',
    description: 'Os trabalhadores pelicanos entraram em greve após o discurso do governador Tamanduá. Segundo fontes, o governador afirmou que pedidos como “um banheiro na empresa”, “horário de almoço” e “um dia de folga” representam uma ameaça grave à economia do país.',
    effect: 'Efeito: Nenhum jogador poderá colher recursos dentro das 3 cartas adjacentes a esta carta.'
  },
  {
    id: 12,
    edition: '12',
    type: 'Do Ruim',
    subtype: 'Área limitada',
    title: 'Somos todos gratos pelo presidente',
    description: 'O governo agora está dando oportunidade de emprego irrecusável (sequestro) para quem já buscava uma fonte de renda extra!',
    effect: 'Efeito: Por 2 rodadas, cada trabalhador sobre a carta da região Amazônia deve rolar um dado de 8 lados: \n1–5: o trabalhador se perde e só volta quando o evento terminar. \n6–8: ele permanece no local. \nJogue um dado para cada trabalhador, os trabalhadores perdidos saem do tabuleiro e só podem ser usados após o fim do evento.'
  },
  {
    id: 13,
    edition: '13',
    type: 'Do Ruim',
    subtype: 'Área limitada',
    title: 'Pique poquete',
    description: 'Com o número alto de estrangeiros no país, a cidade Capital não reconhece mais quem é gringo para cobrar mais caro.',
    effect: 'Efeito: Durante 2 rodadas, jogadores que enviarem trabalhadores para a área do evento (6 cartas adjacentes a esta) rolarão um dado, que se o resultado der 5 ou menos, terá 2 de cada recurso na mão roubados.'
  },
  {
    id: 14,
    edition: '14',
    type: 'Do Ruim',
    subtype: 'Área limitada',
    title: 'Censura!',
    description: 'O governo local decidiu que notícias sobre a escassez de recursos são "Fake News". Jornalistas foram convidados para um retiro espiritual forçado em uma ilha deserta.',
    effect: 'Efeito: Todos os jogadores devem descartar 1 recurso de sua escolha para provar sua lealdade ao Estado.'
  },
  {
    id: 15,
    edition: '15',
    type: 'Do Ruim',
    subtype: 'Em área',
    title: 'Prasil colmeia',
    description: 'Após as decisões do governador Abelhudo de abrir as portas para um “mercado livre”, enxames de estrangeiros aterrissaram, colheram cada recurso que encontraram e partiram com rapidez.',
    effect: 'Efeito: Os jogadores não poderão colher nióbio por 2 rodadas.'
  },
  {
    id: 16,
    edition: '16',
    type: 'Do Ruim',
    subtype: 'Em área',
    title: 'Gasolina em falta!',
    description: 'A gasolina some, o querosene evapora, e boatos surgem de que um jogador abasteceu seu carro movido a carvão. O Prasil inteiro entra em pânico energético!',
    effect: 'Efeito: Por 1 rodada, todas as ações que dependem de movimentação custam 1 recurso de carvão extra. Quem não tiver carvão não pode mover trabalhadores.'
  },
  {
    id: 17,
    edition: '17',
    type: 'Do Ruim',
    subtype: 'Pro jogador',
    title: 'Pelo bem do povo',
    description: 'Os protetores do Estado tomaram “temporariamente” o poder; eles desconfiam que seu grupo está envolvido com os G. Varianos e isolam os seus membros para uma intervenção.',
    effect: 'Efeito: Durante 1 rodada, você não pode mover seus trabalhadores do grupo.'
  },
  {
    id: 18,
    edition: '18',
    type: 'Do Ruim',
    subtype: 'Pro jogador',
    title: 'Sendo feito de otário',
    description: 'Você ajudou um grupo de super-ricos a ficarem mais ricos ainda ao sumir com a gasolina local e subir o preço do carvão.',
    effect: 'Efeito: Receba 4 carvões.'
  },
  {
    id: 19,
    edition: '19',
    type: 'Do Ruim',
    subtype: 'Pro jogador',
    title: 'Proteção do grupo',
    description: 'Seu grupo usou o Pitch no lugar do discurso para manipular o povo a reeleger os pardais no nordeste, fazendo os governantes brigarem para saber qual deles vai te contratar para as próximas eleições.',
    effect: 'Efeito: Receba 4 carvões.'
  },
  {
    id: 20,
    edition: '20',
    type: 'Do Ruim',
    subtype: 'Pro jogador',
    title: 'O petróleo é nosso!',
    description: 'Seu grupo encontra um pequeno poço de “óleo do futuro”.',
    effect: 'Efeito: O jogador ganha 2 unidades de qualquer recurso aleatório instantaneamente.'
  },
  {
    id: 21,
    edition: '21',
    type: 'Estratégica',
    subtype: 'Nenhum',
    title: 'Ninguém gosta de podcast',
    description: 'O presidente descobriu que a falta de educação aumenta o número de habitantes analfabetos e encontra um novo meio de manipular o povo dentro da sua casa. \nO rádio se tornou a nova modinha entre os jovens e os pobres pombos-correios precisam trabalhar dobrado para provar seu valor.',
    effect: 'Efeito: O jogador recebe +1 ação de movimentação gratuita na rodada.'
  },
  {
    id: 22,
    edition: '22',
    type: 'Estratégica',
    subtype: 'Nenhum',
    title: 'Cursinho',
    description: 'Depois de topar com tanto estrangeiro, seu grupo agora no lugar de dar um discurso para convidar mais membros, agora faz pitch de como convidar pessoas para o seu grupo!',
    effect: 'Efeito: Você fechou uma parceria com o melhor jornal do país! Use esse poder para difamar um grupo inimigo e bloqueie-o por 1 rodada. \nO grupo bloqueado está sendo tão mal falado que não pode mais sair nas ruas para realizar uma ação.'
  },
  {
    id: 23,
    edition: '23',
    type: 'Estratégica',
    subtype: 'Nenhum',
    title: 'Mestre do berimbau',
    description: 'Após meses de convivência com os ratos, seu grupo agora aprendeu uma dança que pode machucar inimigos!',
    effect: 'Efeito: A qualquer hora, use seus passos de dança para dar +2 no dado de ataque e defesa.'
  }
];

export const DASHBOARD_THEME: Record<string, { bg: string; border: string }> = {
  outlaws: {
    bg: '#f7f1de80',
    border: '#B87C4C',
  },
  punks: {
    bg: '#faf8c880',
    border: '#FCB53B',
  },
  law: {
    bg: '#c6ecff80',
    border: '#577B8D',
  },
  scholars: {
    bg: '#e8cfff80',
    border: '#9946E6',
  },
};