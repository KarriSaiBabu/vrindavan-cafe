import { FoodItem } from './types';

export const CATEGORIES = [
  'Tiffins',
  'Lunch',
  'Dinner',
  'Cool Drinks',
  'Juices'
] as const;

export const MENU_ITEMS: FoodItem[] = [
  // Tiffins
  {
    id: 't1',
    name: 'Ghee Karam Dosa',
    description: 'Crispy rice crepe spiced with traditional red chili chutney and topped with pure cow ghee.',
    price: 95,
    category: 'Tiffins',
    image: '/images/dosa.jpg',
    rating: 4.8,
    isRecommended: true
  },
  {
    id: 't2',
    name: 'MLA Pesarattu',
    description: 'Green gram crepe stuffed with Ginger Upma, served with Ginger Chutney. A royal Andhra breakfast.',
    price: 110,
    category: 'Tiffins',
    image: '/images/pesarattu.jpg',
    rating: 4.9,
    isOffer: true,
    offerText: 'Specialty'
  },
  {
    id: 't3',
    name: 'Idli',
    description: 'Soft, steamed fermented rice and lentil cakes. Served with Sambar and 3 types of chutneys.',
    price: 60,
    category: 'Tiffins',
    image: '/images/idli.jpg',
    rating: 4.5
  },
  // Lunch
  {
    id: 'l1',
    name: 'Andhra Veg Meals',
    description: 'Complete platter with Rice, Pappu, Sambar, Rasam, Curds, Podi, Ghee, sweets, and various curries.',
    price: 180,
    category: 'Lunch',
    image: '/images/meals.jpg',
    rating: 4.7,
    isRecommended: true
  },
  {
    id: 'l2',
    name: 'Gutti Vankaya Curry',
    description: 'Tender baby eggplants stuffed with a spicy peanut and coconut masala. A traditional masterpiece.',
    price: 160,
    category: 'Lunch',
    image: '/images/default-food.svg',
    rating: 4.8
  },
  {
    id: 'l3',
    name: 'Gongura Chicken',
    description: 'Tangy and spicy chicken curry made with sorrel leaves (Gongura). A signature Andhra dish.',
    price: 240,
    category: 'Lunch',
    image: '/images/default-food.svg',
    rating: 4.9
  },
  {
    id: 'l4',
    name: 'Chicken Dum Biryani',
    description: 'Long grain basmati rice cooked with succulent chicken pieces and secret Andhra spices in Dum style.',
    price: 280,
    category: 'Lunch',
    image: '/images/biryani.jpg',
    rating: 4.8,
    isOffer: true,
    offerText: 'Best Seller'
  },
  // Dinner
  {
    id: 'd1',
    name: 'Butter Naan with Paneer Curry',
    description: 'Freshly baked tandoori naan with creamy paneer butter masala.',
    price: 220,
    category: 'Dinner',
    image: '/images/default-food.svg',
    rating: 4.6
  },
  {
    id: 'd2',
    name: 'Chicken Fried Rice',
    description: 'Stir-fried rice with shredded chicken, veggies, and Indo-Chinese sauces.',
    price: 190,
    category: 'Dinner',
    image: '/images/default-food.svg',
    rating: 4.4
  },
  // Drinks
  {
    id: 'j1',
    name: 'Mango Juice',
    description: 'Fresh pulpy mango juice made from seasonal Alphonso mangoes.',
    price: 80,
    category: 'Juices',
    image: '/images/mango-juice.svg',
    rating: 4.7
  },
  {
    id: 'c1',
    name: 'Thums Up',
    description: 'Strong, spicy, fizzy cola. The heart of Andhra refreshment.',
    price: 40,
    category: 'Cool Drinks',
    image: '/images/default-food.svg',
    rating: 4.5
  }
];

export const FAQ_ITEMS = [
  {
    question: "Do you offer home delivery?",
    answer: "Yes, we offer home delivery within a 5km radius of our restaurant. You can order directly through our website."
  },
  {
    question: "Is the food very spicy?",
    answer: "Andhra cuisine is known for its spice, but we offer customizable spice levels (Mild, Medium, Spicy) for most of our dishes."
  },
  {
    question: "Do you have parking facilities?",
    answer: "Yes, we have a dedicated parking area for both two-wheelers and four-wheelers."
  }
];

export const TESTIMONIALS = [
  {
    name: "Ravi Kumar",
    review: "The MLA Pesarattu reminded me of my home in Vijayawada. Truly authentic taste!",
    rating: 5
  },
  {
    name: "Sowmya Reddy",
    review: "Excellent Andhra Meals. The service is fast and the atmosphere is very welcoming.",
    rating: 4.8
  }
];
