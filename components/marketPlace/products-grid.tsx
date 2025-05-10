'use client';

import { Product } from '../../types';
import React from 'react';
import { ProductCard } from './product-card';

interface ProductsGridProps {
  products: Product[];
  isLoading?: boolean;
}

export const ProductsGrid: React.FC<ProductsGridProps> = ({ 
  products,
  isLoading = false
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div 
            key={i} 
            className="bg-card border border-border rounded-xl overflow-hidden shadow-sm h-[400px] animate-pulse"
          >
            <div className="bg-muted w-full h-[200px]"></div>
            <div className="p-4 space-y-3">
              <div className="h-6 bg-muted rounded-md w-3/4"></div>
              <div className="h-6 bg-muted rounded-md w-1/4"></div>
              <div className="h-4 bg-muted rounded-md w-full"></div>
              <div className="h-4 bg-muted rounded-md w-full"></div>
              <div className="flex justify-between mt-4">
                <div className="h-4 bg-muted rounded-md w-1/3"></div>
                <div className="h-4 bg-muted rounded-md w-1/3"></div>
              </div>
            </div>
            <div className="h-12 bg-muted w-full mt-auto"></div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 bg-card border border-border rounded-xl text-center">
        <h3 className="text-2xl font-semibold mb-2">No Products Found</h3>
        <p className="text-muted-foreground text-lg mb-6">
          Try changing your filters or search term
        </p>
        <button 
          className="bg-primary text-primary-foreground px-6 py-3 text-lg font-medium rounded-lg hover:bg-primary/90 transition-colors min-h-[48px]"
          onClick={() => window.location.reload()}
        >
          Reset All Filters
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};