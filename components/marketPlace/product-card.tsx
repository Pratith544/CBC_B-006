'use client';

import { Product } from '../../types';
import { Star, Store } from 'lucide-react';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col h-full">
      <div className="relative w-full pt-[75%]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-foreground line-clamp-2 mb-2">
          {product.name}
        </h3>
        
        <p className="text-2xl font-bold text-foreground mb-2">
          ₹{product.price}
        </p>
        
        <p className="text-muted-foreground mb-4 line-clamp-2">
          {product.description}
        </p>
        
        <div className="mt-auto">
          <div className="flex items-center text-muted-foreground mb-2">
            <Store size={16} className="mr-1" />
            <span>{product.seller.name}, {product.seller.location}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Star size={16} className="text-chart-5 mr-1" />
              <span className="font-medium">{product.rating}</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {product.freshness}
            </span>
          </div>
        </div>
      </div>
      
      <button 
        className="w-full py-4 bg-primary text-primary-foreground text-lg font-medium hover:bg-primary/90 transition-colors"
        aria-label={`Buy ${product.name}`}
      >
        Buy Now
      </button>
    </div>
  );
};