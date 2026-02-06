export interface Product {
  id: string;
  name: string;
  category: 'slides' | 'sneakers' | 'sandals' | 'formal' | 'casual';
  price: number;
  rating: number;
  image: string;
  colors: string[];
  sizes: number[];
  description: string;
  materials: string;
  isBestSeller?: boolean;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Classic White Sneakers',
    category: 'sneakers',
    price: 89.99,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1631482665588-d3a6f88e65f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHNuZWFrZXJzJTIwcHJvZHVjdHxlbnwxfHx8fDE3NzAyODg4Njh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    colors: ['white', 'black', 'navy'],
    sizes: [7, 8, 9, 10, 11, 12],
    description: 'Premium leather sneakers with superior comfort and style. Perfect for everyday wear.',
    materials: 'Premium leather upper, rubber sole, cushioned insole',
    isBestSeller: true
  },
  {
    id: '2',
    name: 'Comfort Leather Slides',
    category: 'slides',
    price: 49.99,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1625318880107-49baad6765fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWF0aGVyJTIwc2xpZGVzJTIwc2FuZGFsc3xlbnwxfHx8fDE3NzAzOTg4MDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    colors: ['brown', 'black', 'tan'],
    sizes: [7, 8, 9, 10, 11, 12],
    description: 'Luxuriously soft slides with premium leather straps. Ultimate relaxation for your feet.',
    materials: 'Genuine leather straps, memory foam footbed, non-slip sole',
    isBestSeller: true
  },
  {
    id: '3',
    name: 'Performance Running Shoes',
    category: 'sneakers',
    price: 129.99,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1765914448113-ebf0ce8cb918?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydW5uaW5nJTIwc2hvZXMlMjBhdGhsZXRpY3xlbnwxfHx8fDE3NzAyODM3Njh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    colors: ['red', 'blue', 'black'],
    sizes: [7, 8, 9, 10, 11, 12],
    description: 'Engineered for peak performance with advanced cushioning technology.',
    materials: 'Breathable mesh, responsive foam midsole, durable rubber outsole',
    isBestSeller: true
  },
  {
    id: '4',
    name: 'Executive Dress Shoes',
    category: 'formal',
    price: 149.99,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1552422554-0d5af0c79fc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3JtYWwlMjBkcmVzcyUyMHNob2VzfGVufDF8fHx8MTc3MDI3NDU3N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    colors: ['black', 'brown'],
    sizes: [7, 8, 9, 10, 11, 12],
    description: 'Sophisticated formal shoes crafted for the modern professional.',
    materials: 'Full-grain leather, leather sole, cushioned footbed',
    isBestSeller: false
  },
  {
    id: '5',
    name: 'Casual Canvas Sneakers',
    category: 'casual',
    price: 59.99,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1759527588071-e143b4a451b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBjYW52YXMlMjBzaG9lc3xlbnwxfHx8fDE3NzAzNjY3MzF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    colors: ['white', 'black', 'gray'],
    sizes: [7, 8, 9, 10, 11, 12],
    description: 'Lightweight and versatile canvas shoes for everyday comfort.',
    materials: 'Canvas upper, rubber sole, padded collar',
    isBestSeller: false
  },
  {
    id: '6',
    name: 'Premium Leather Boots',
    category: 'casual',
    price: 179.99,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1638158980051-f7e67291efed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicm93biUyMGxlYXRoZXIlMjBib290c3xlbnwxfHx8fDE3NzAzMDgzNjl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    colors: ['brown', 'black'],
    sizes: [7, 8, 9, 10, 11, 12],
    description: 'Rugged yet refined boots built to last season after season.',
    materials: 'Full-grain leather, Goodyear welt construction, leather lining',
    isBestSeller: true
  },
  {
    id: '7',
    name: 'Summer Sport Sandals',
    category: 'sandals',
    price: 69.99,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1758179764179-955b069dd2cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHNhbmRhbHMlMjBzdW1tZXJ8ZW58MXx8fHwxNzcwMzk4ODA5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    colors: ['black', 'navy', 'khaki'],
    sizes: [7, 8, 9, 10, 11, 12],
    description: 'Adjustable sport sandals with arch support for active lifestyles.',
    materials: 'Synthetic straps, contoured footbed, water-resistant construction',
    isBestSeller: false
  },
  {
    id: '8',
    name: 'Urban Street Sneakers',
    category: 'sneakers',
    price: 99.99,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1631482665588-d3a6f88e65f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHNuZWFrZXJzJTIwcHJvZHVjdHxlbnwxfHx8fDE3NzAyODg4Njh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    colors: ['white', 'gray', 'black'],
    sizes: [7, 8, 9, 10, 11, 12],
    description: 'Modern design meets classic comfort in these versatile sneakers.',
    materials: 'Leather and synthetic upper, EVA midsole, rubber outsole',
    isBestSeller: false
  }
];
