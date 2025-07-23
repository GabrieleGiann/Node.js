interface Planet {
  id: number;
  name: string;
}

// Dummy database di pianeti
const planets: Planet[] = [
  { id: 1, name: "Mercurio" },
  { id: 2, name: "Venere" },
  { id: 3, name: "Terra" },
  { id: 4, name: "Marte" },
];

export { planets, Planet };
