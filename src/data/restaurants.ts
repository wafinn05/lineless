export interface Restaurant {
  id: number;
  name: string;
  category: string;
  distanceKm: number;
  rating: number;
  reviews: number;
  /** people currently ahead in queue */
  queue: number;
  /** estimated wait in minutes */
  waitMin: number;
  /** number currently being called */
  called: number;
  /** picsum seed — descriptive, per skill guidance */
  seed: string;
  openHours: string;
}

export const restaurants: Restaurant[] = [
  {
    id: 0,
    name: "Kopi Senja",
    category: "Coffee & Brunch",
    distanceKm: 0.5,
    rating: 4.8,
    reviews: 116,
    queue: 8,
    waitMin: 15,
    called: 2,
    seed: "warm-espresso-bar",
    openHours: "07.30 – 22.00",
  },
  {
    id: 1,
    name: "Warung Nusantara",
    category: "Masakan Indonesia",
    distanceKm: 1.2,
    rating: 4.6,
    reviews: 203,
    queue: 15,
    waitMin: 25,
    called: 8,
    seed: "wooden-family-table",
    openHours: "09.00 – 21.30",
  },
  {
    id: 2,
    name: "Sushi Hana",
    category: "Japanese",
    distanceKm: 2.0,
    rating: 4.9,
    reviews: 88,
    queue: 5,
    waitMin: 10,
    called: 1,
    seed: "minimal-counter-dining",
    openHours: "11.00 – 22.00",
  },
  {
    id: 3,
    name: "Pizza Roma",
    category: "Italian",
    distanceKm: 1.8,
    rating: 4.5,
    reviews: 341,
    queue: 20,
    waitMin: 30,
    called: 12,
    seed: "brick-oven-kitchen",
    openHours: "10.00 – 23.00",
  },
  {
    id: 4,
    name: "Green Bowl",
    category: "Healthy & Salad",
    distanceKm: 0.9,
    rating: 4.7,
    reviews: 129,
    queue: 3,
    waitMin: 8,
    called: 1,
    seed: "bright-greenhouse-cafe",
    openHours: "08.00 – 20.00",
  },
  {
    id: 5,
    name: "Bakso Pak Kumis",
    category: "Bakso & Mie",
    distanceKm: 0.6,
    rating: 4.4,
    reviews: 512,
    queue: 25,
    waitMin: 35,
    called: 18,
    seed: "street-food-stall-night",
    openHours: "10.00 – 21.00",
  },
];

export const categories = [
  "Semua",
  "Kopi",
  "Indonesia",
  "Jepang",
  "Italia",
  "Sehat",
  "Cepat Saji",
];

export const cardImage = (seed: string) =>
  `https://picsum.photos/seed/${seed}/600/450`;

export const galleryImages = (seed: string) =>
  [seed, `${seed}-2`, `${seed}-3`, `${seed}-4`, `${seed}-5`].map(
    (s) => `https://picsum.photos/seed/${s}/760/620`,
  );

export const pad3 = (n: number) => String(n).padStart(3, "0");

export interface ActiveQueue {
  restaurant: Restaurant;
  number: string;
  takenAt: string;
}

export interface Message {
  id: number;
  name: string;
  initial?: string;
  system?: boolean;
  color: string;
  text: string;
  time: string;
  unread: boolean;
}

export const initialMessages: Message[] = [
  {
    id: 1,
    name: "Kopi Senja",
    initial: "K",
    color: "#7A1E27",
    text: "Nomor 002 sedang dipanggil — giliranmu 3 lagi.",
    time: "2 mnt",
    unread: true,
  },
  {
    id: 2,
    name: "LineLess",
    system: true,
    color: "#FF6B6B",
    text: "Antrean kamu berhasil diambil.",
    time: "5 mnt",
    unread: true,
  },
  {
    id: 3,
    name: "Sushi Hana",
    initial: "S",
    color: "#333333",
    text: "Terima kasih sudah berkunjung. Beri rating ya.",
    time: "1 jam",
    unread: false,
  },
  {
    id: 4,
    name: "Warung Nusantara",
    initial: "W",
    color: "#a12734",
    text: "Meja kamu sudah siap, silakan menuju kasir.",
    time: "Kemarin",
    unread: false,
  },
];
