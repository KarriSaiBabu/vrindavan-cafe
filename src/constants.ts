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
    image: 'https://images.unsplash.com/photo-1668236543090-52ee0100cd7c?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    isRecommended: true
  },
  {
    id: 't2',
    name: 'MLA Pesarattu',
    description: 'Green gram crepe stuffed with Ginger Upma, served with Ginger Chutney. A royal Andhra breakfast.',
    price: 110,
    category: 'Tiffins',
    image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&q=80&w=800',
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
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=800',
    rating: 4.5
  },
  // Lunch
  {
    id: 'l1',
    name: 'Andhra Veg Meals',
    description: 'Complete platter with Rice, Pappu, Sambar, Rasam, Curds, Podi, Ghee, sweets, and various curries.',
    price: 180,
    category: 'Lunch',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    isRecommended: true
  },
  {
    id: 'l2',
    name: 'Gutti Vankaya Curry',
    description: 'Tender baby eggplants stuffed with a spicy peanut and coconut masala. A traditional masterpiece.',
    price: 160,
    category: 'Lunch',
    image: 'https://images.unsplash.com/photo-1601050690597-df056fb1d745?auto=format&fit=crop&q=80&w=800',
    rating: 4.8
  },
  {
    id: 'l3',
    name: 'Gongura Chicken',
    description: 'Tangy and spicy chicken curry made with sorrel leaves (Gongura). A signature Andhra dish.',
    price: 240,
    category: 'Lunch',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=800',
    rating: 4.9
  },
  {
    id: 'l4',
    name: 'Chicken Dum Biryani',
    description: 'Long grain basmati rice cooked with succulent chicken pieces and secret Andhra spices in Dum style.',
    price: 280,
    category: 'Lunch',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?auto=format&fit=crop&q=80&w=800',
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
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=800',
    rating: 4.6
  },
  {
    id: 'd2',
    name: 'Chicken Fried Rice',
    description: 'Stir-fried rice with shredded chicken, veggies, and Indo-Chinese sauces.',
    price: 190,
    category: 'Dinner',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&q=80&w=800',
    rating: 4.4
  },
  // Drinks
  {
    id: 'j1',
    name: 'Mango Juice',
    description: 'Fresh pulpy mango juice made from seasonal Alphonso mangoes.',
    price: 80,
    category: 'Juices',
    image: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&q=80&w=800',
    rating: 4.7
  },
  {
    id: 'c1',
    name: 'Thums Up',
    description: 'Strong, spicy, fizzy cola. The heart of Andhra refreshment.',
    price: 40,
    category: 'Cool Drinks',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=800',
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
