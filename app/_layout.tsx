// app/_layout.tsx
import { Stack } from "expo-router";
import React, { createContext, ReactNode, useContext, useState } from "react";

/** ===== Categorías ===== */
export type Category = "jugadores" | "comida" | "lugares" | "deportes" | "paises";

/** Lista de jugadores (la tuya) */
export const BASE_JUGADORES: string[] = [
  "Lionel Messi", "Cristiano Ronaldo", "Neymar Jr", "Kylian Mbappé", "Erling Haaland",
  "Kevin De Bruyne", "Mohamed Salah", "Virgil van Dijk", "Sadio Mané", "Trent Alexander-Arnold",
  "Harry Kane", "Son", "Marcus Rashford", "Raheem Sterling", "Jack Grealish",
  "Phil Foden", "Kyle Walker", "Martin Ødegaard", "Bukayo Saka",
  "Karim Benzema", "Luka Modrić", "Toni Kroos", "Sergio Ramos", "Gareth Bale",
  "Thibaut Courtois", "Jude Bellingham", "Vinícius Jr.", "Rodrygo Goes", "Federico Valverde",
  "Ousmane Dembélé", "Robert Lewandowski", "Luis Suárez", "Andrés Iniesta", "Xavi Hernández",
  "Sergio Busquets", "Dani Alves", "Jordi Alba", "Pedri", "Antoine Griezmann", "Jan Oblak",
  "Paulo Dybala", "Ángel Di María", "Gonzalo Higuaín", "Carlos Tévez", "Paul Pogba",
  "Romelu Lukaku", "Lautaro Martínez", "Khvicha Kvaratskhelia", "Joshua Kimmich",
  "Franck Ribéry", "Arjen Robben", "Kingsley Coman", "Serge Gnabry", "Leroy Sané",
  "Alphonso Davies", "Mario Götze", "Jadon Sancho", "Dibu Martínez", "Nicolás Otamendi",
  "Cuti Romero", "Leandro Paredes", "Rodrigo De Paul", "Giovani Lo Celso",
  "Enzo Fernández", "Julián Álvarez", "Thiago Silva", "Casemiro", "Alisson Becker",
  "Gabriel Jesus", "Richarlison", "Raphinha", "Marquinhos", "Edinson Cavani",
  "Darwin Núñez", "Rodrigo Bentancur", "Bruno Fernandes", "João Félix", "Rúben Dias",
  "João Cancelo", "Bernardo Silva", "Vitinha", "Rafael Leao",
  "Declan Rice", "Manuel Neuer", "Thomas Müller", "İlkay Gündoğan", "Florian Wirtz",
  "Antonio Rüdiger", "Memphis Depay", "Frenkie de Jong", "Denzel Dumfries",
  "Didier Drogba", "Samuel Eto’o", "Riyad Mahrez", "Achraf Hakimi",
  "Javier Chicharito Hernández", "Keylor Navas", "Christian Pulisic",
  "Riquelme", "Cole Palmer"
];

/** Ítems por categoría */
export const CATEGORY_ITEMS: Record<Category, string[]> = {
  jugadores: BASE_JUGADORES,
  comida: [
    "Asado",
    "Empanadas",
    "Milanesa con fritas",
    "Choripán",
    "Pizza",
    "Burritos",
    "Ravioles",
    "Ñoquis",
    "Canelones",
    "Locro",
    "Medialunas",
    "Vitel Tone",
    "Ensalada",
    "Albondigas",
    "Alfajor",
    "Tarta de jamón y queso",
    "Polenta",
    "Picada",
    "Paella",
    "Pastel de papas",
    "Pastafrola",
    "Ensalada de frutas",
    "Guiso de lentejas",
    "Guiso de mondongo",
    "Sorrentinos",
    "Sándwich de milanesa",
    "Sándwiches de miga",
    "Hamburguesa",
    "Tortilla de papas",
    "Arroz",
    "Torta",
    "Churros",
    "Pancakes",
    "Waffles",
    "Sushi",
    "Panqueques",
    "Flan",
    "Budin de Pan",
    "Donas",
    "Brownies",
    "Tacos",
    "Tiramisu",
    "Chocotorta",
    "Cheesecake",
    "Lasaña",
    "Panchos",
    "Mantecol",
    "Salchichas con pure",
    "Helado "
  ],
  lugares: [
    "Shopping",
    "Plaza",
    "Parque acuático",
    "Basurero",
    "Jardín",
    "Zoológico",
    "Acuario",
    "Museo",
    "Biblioteca",
    "Cine",
    "Teatro",
    "Estadio",
    "Cancha de fútbol",
    "Cancha de básquet",
    "Gimnasio",
    "Pista de patinaje",
    "Bar",
    "Playa",
    "Puerto",
    "Mar",
    "Montaña",
    "Camping",
    "Hotel",
    "Restaurante",
    "Café",
    "Estacionamiento",
    "Hospital",
    "Heladería",
    "Boliche",
    "Colegio",
    "Universidad",
    "Oficina",
    "Comisaria",
    "Carniceria",
    "Verduleria",
    "Bowling",
    "Feria",
    "Supermercado",
    "Taller Mecanico",
    "Farmacia",
    "Estacion de Servicio",
    "Parque de diversiones",
    "Piscina pública",
    "Spa",
    "Estación de tren",
    "Estación de subte",
    "Parada de colectivo",
    "Aeropuerto",
    "Cocina",
    "Panaderia",
    "Cancha de tenis",
    "Cancha de padel",
    "Campo de golf"
  ],
  deportes: [
    "Fútbol",
    "Básquet",
    "Vóley",
    "Tenis",
    "Rugby",
    "Hockey sobre césped",
    "Natación",
    "Atletismo",
    "Handball",
    "Skate",
    "Pádel",
    "Boxeo",
    "Artes marciales",
    "Gimnasia artística",
    "Ciclismo",
    "Running",
    "Surf",
    "Snowboard",
    "Esquí",
    "Patinaje artístico",
    "Patinaje sobre hielo",
    "Golf",
    "Tenis de mesa",
    "Billar",
    "Bowling",
    "Automovilismo",
    "Fútbol sala",
    "Fútbol americano",
    "Softball",
    "Béisbol",
    "Cricket",
    "Canoa / Kayak",
    "Remo",
    "Vela",
    "Tiro con arco",
    "Esgrima",
    "Bádminton",
    "Pato"
  ],

  paises: [
    "Argentina",
    "Brasil",
    "Uruguay",
    "Chile",
    "Paraguay",
    "Bolivia",
    "Perú",
    "Colombia",
    "México",
    "España",
    "Francia",
    "Italia",
    "Alemania",
    "Inglaterra",
    "Estados Unidos",
    "Japón",
    "Canadá",
    "Ecuador",
    "Venezuela",
    "Costa Rica",
    "Panamá",
    "Cuba",
    "República Dominicana",
    "Portugal",
    "Holanda",
    "Bélgica",
    "Suiza",
    "Suecia",
    "Noruega",
    "Dinamarca",
    "Irlanda",
    "Polonia",
    "Rusia",
    "Grecia",
    "Turquía",
    "China",
    "India",
    "Corea del Sur",
    "Arabia Saudita",
    "Israel",
    "Sudáfrica",
    "Egipto",
    "Marruecos",
    "Nigeria",
    "Australia",
    "Nueva Zelanda",
  ],

};

type Role = "IMPOSTOR" | "CIVIL";
type Round = { secret: string; assignments: Role[]; category: Category };

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
function pickRandom<T>(list: T[]): T {
  return list[Math.floor(Math.random() * list.length)];
}
function generateRound(playerCount: number, impostorCount: number, category: Category): Round {
  const secret = pickRandom(CATEGORY_ITEMS[category]);
  const roles: Role[] = Array.from({ length: playerCount }, (_, i) =>
    i < impostorCount ? "IMPOSTOR" : "CIVIL"
  );
  return { secret, assignments: shuffle(roles), category };
}

/** ===== Contexto global ===== */
type GameState = {
  players: number;
  impostors: number;
  round: Round | null;
  lastCategory: Category | null;
  startRound: (players: number, impostors: number, category: Category) => void;
  rematch: () => void;
  resetGame: () => void;
};

const GameContext = createContext<GameState | null>(null);
export const useGame = () => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame debe usarse dentro de <GameProvider>");
  return ctx;
};

function GameProvider({ children }: { children: ReactNode }) {
  const [players, setPlayers] = useState(0);
  const [impostors, setImpostors] = useState(0);
  const [round, setRound] = useState<Round | null>(null);
  const [lastCategory, setLastCategory] = useState<Category | null>(null);

  const startRound = (p: number, i: number, category: Category) => {
    setPlayers(p);
    setImpostors(i);
    setLastCategory(category);
    setRound(generateRound(p, i, category));
  };
  const rematch = () => {
    if (players > 0 && impostors > 0 && lastCategory) {
      setRound(generateRound(players, impostors, lastCategory));
    }
  };
  const resetGame = () => {
    setPlayers(0);
    setImpostors(0);
    setRound(null);
    setLastCategory(null);
  };

  return (
    <GameContext.Provider value={{ players, impostors, round, lastCategory, startRound, rematch, resetGame }}>
      {children}
    </GameContext.Provider>
  );
}

/** ===== Layout con Stack (sin header) ===== */
export default function RootLayout() {
  return (
    <GameProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </GameProvider>
  );
}
