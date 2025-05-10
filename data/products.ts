import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Fresh Tomatoes',
    description: 'Locally grown organic tomatoes, harvested yesterday',
    price: 40,
    category: 'vegetables',
    image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg',
    seller: {
      name: 'Sharma Farms',
      location: 'Dehradun'
    },
    rating: 4.5,
    freshness: '1 day ago'
  },
  {
    id: '2',
    name: 'Homemade Paneer',
    description: 'Fresh paneer made from pure buffalo milk',
    price: 180,
    category: 'dairy',
    image: 'https://images.pexels.com/photos/4197439/pexels-photo-4197439.jpeg',
    seller: {
      name: 'Gupta Dairy',
      location: 'Haridwar'
    },
    rating: 4.8,
    freshness: 'Today'
  },
  {
    id: '3',
    name: 'Handmade Cotton Saree',
    description: 'Traditionally woven cotton saree with natural dyes',
    price: 1200,
    category: 'handicrafts',
    image: 'https://images.pexels.com/photos/2995310/pexels-photo-2995310.jpeg',
    seller: {
      name: 'Kala Weaves',
      location: 'Almora'
    },
    rating: 4.7,
    freshness: '3 days ago'
  },
  {
    id: '4',
    name: 'Organic Apples',
    description: 'Sweet and crunchy apples from mountain orchards',
    price: 120,
    category: 'fruits',
    image: 'https://images.pexels.com/photos/1510392/pexels-photo-1510392.jpeg',
    seller: {
      name: 'Hill Orchards',
      location: 'Shimla'
    },
    rating: 4.3,
    freshness: '2 days ago'
  },
  {
    id: '5',
    name: 'Honey',
    description: 'Pure wild flower honey collected from forest areas',
    price: 350,
    category: 'food',
    image: 'https://images.pexels.com/photos/1427888/pexels-photo-1427888.jpeg',
    seller: {
      name: 'Bee Natural',
      location: 'Mussoorie'
    },
    rating: 4.9,
    freshness: '7 days ago'
  },
  {
    id: '6',
    name: 'Fresh Coriander Leaves',
    description: 'Freshly cut coriander leaves from organic garden',
    price: 20,
    category: 'vegetables',
    image: 'https://images.pexels.com/photos/606539/pexels-photo-606539.jpeg',
    seller: {
      name: 'Singh Farms',
      location: 'Dehradun'
    },
    rating: 4.2,
    freshness: 'Today'
  },
  {
    id: '7',
    name: 'Clay Water Pot',
    description: 'Handcrafted clay pot that keeps water naturally cool',
    price: 280,
    category: 'handicrafts',
    image: 'https://images.pexels.com/photos/1652457/pexels-photo-1652457.jpeg',
    seller: {
      name: 'Mati Kala',
      location: 'Rishikesh'
    },
    rating: 4.6,
    freshness: '15 days ago'
  },
  {
    id: '8',
    name: 'Fresh Butter',
    description: 'Homemade white butter churned from fresh cream',
    price: 160,
    category: 'dairy',
    image: 'https://images.pexels.com/photos/531334/pexels-photo-531334.jpeg',
    seller: {
      name: 'Patel Dairy',
      location: 'Roorkee'
    },
    rating: 4.7,
    freshness: 'Today'
  },
  {
    id: '9',
    name: 'Seasonal Mangoes',
    description: 'Sweet and juicy seasonal mangoes',
    price: 200,
    category: 'fruits',
    image: 'https://images.pexels.com/photos/2363345/pexels-photo-2363345.jpeg',
    seller: {
      name: 'Verma Orchard',
      location: 'Dehradun'
    },
    rating: 4.8,
    freshness: '1 day ago'
  },
  {
    id: '10',
    name: 'Jaggery Blocks',
    description: 'Organic jaggery made from sugarcane juice',
    price: 90,
    category: 'food',
    image: 'https://images.pexels.com/photos/7541081/pexels-photo-7541081.jpeg',
    seller: {
      name: 'Natural Sweets',
      location: 'Haridwar'
    },
    rating: 4.5,
    freshness: '5 days ago'
  },
  {
    id: '11',
    name: 'Fresh Cucumber',
    description: 'Crisp and fresh cucumbers, perfect for salads',
    price: 30,
    category: 'vegetables',
    image: 'https://images.pexels.com/photos/2329440/pexels-photo-2329440.jpeg',
    seller: {
      name: 'Singh Farms',
      location: 'Dehradun'
    },
    rating: 4.3,
    freshness: 'Today'
  },
  {
    id: '12',
    name: 'Handwoven Basket',
    description: 'Traditional basket woven from bamboo strips',
    price: 350,
    category: 'handicrafts',
    image: 'https://images.pexels.com/photos/811331/pexels-photo-811331.jpeg',
    seller: {
      name: 'Tribal Crafts',
      location: 'Nainital'
    },
    rating: 4.6,
    freshness: '20 days ago'
  }
];

export const categories = [
  {
    id: 'all',
    name: 'All Products',
    icon: 'ShoppingBag'
  },
  {
    id: 'vegetables',
    name: 'Vegetables',
    icon: 'Leaf'
  },
  {
    id: 'fruits',
    name: 'Fruits',
    icon: 'Apple'
  },
  {
    id: 'dairy',
    name: 'Dairy Products',
    icon: 'Milk'
  },
  {
    id: 'food',
    name: 'Food Items',
    icon: 'Utensils'
  },
  {
    id: 'handicrafts',
    name: 'Handicrafts',
    icon: 'Scissors'
  }
];

export const sortOptions = [
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Rating: High to Low', value: 'rating' },
  { label: 'Freshness', value: 'freshness' }
];