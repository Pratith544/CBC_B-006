export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  seller: {
    name: string;
    location: string;
  };
  rating: number;
  freshness: string;
}

export interface FilterOptions {
  category: string;
  priceRange: [number, number];
  sellerLocation: string;
}

export interface SortOption {
  label: string;
  value: string;
}