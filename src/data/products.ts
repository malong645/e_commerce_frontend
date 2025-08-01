import { Product } from '../types';

export const initialProducts: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro',
    description: 'Le smartphone le plus avancé avec puce A17 Pro, écran Super Retina XDR et système de caméras professionnel triple.',
    price: 1299,
    stock: 15,
    image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=500'
  },
  {
    id: '2',
    name: 'MacBook Air M3',
    description: 'Ordinateur portable ultra-fin avec puce M3, écran Liquid Retina 13.6" et autonomie exceptionnelle jusqu\'à 18 heures.',
    price: 1399,
    stock: 8,
    image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=500'
  },
  {
    id: '3',
    name: 'AirPods Pro',
    description: 'Écouteurs sans fil avec réduction active du bruit, son spatial personnalisé et étui de recharge MagSafe.',
    price: 279,
    stock: 25,
    image: 'https://images.pexels.com/photos/8534088/pexels-photo-8534088.jpeg?auto=compress&cs=tinysrgb&w=500'
  },
  {
    id: '4',
    name: 'iPad Pro 12.9"',
    description: 'Tablette professionnelle avec écran Liquid Retina XDR, puce M2 et compatibilité Apple Pencil (2ème génération).',
    price: 1199,
    stock: 12,
    image: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=500'
  },
  {
    id: '5',
    name: 'Apple Watch Series 9',
    description: 'Montre connectée avec écran Always-On Retina, suivi de santé avancé et résistance à l\'eau jusqu\'à 50 mètres.',
    price: 449,
    stock: 20,
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=500'
  },
  {
    id: '6',
    name: 'Magic Keyboard',
    description: 'Clavier sans fil avec touches ciseaux rétroéclairées, pavé numérique et rechargeable via Lightning.',
    price: 149,
    stock: 30,
    image: 'https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=500'
  }
];