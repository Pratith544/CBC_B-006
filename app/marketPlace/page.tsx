'use client';

import { VoiceSearch } from '../../components/ui/voice-search';
import { categories, products, sortOptions } from '../../data/products';
import { FilterOptions } from '../../types';
import { BookOpenCheck, Info, Milk } from 'lucide-react';
import { useEffect, useState } from 'react';
import { CategoryFilter } from '../../components/marketPlace/category-filter';
import { PriceRangeFilter } from '../../components/marketPlace/price-range-filter';
import { ProductsGrid } from '../../components/marketPlace/products-grid';
import { SortSelector } from '../../components/marketPlace/sort-selector';

export default function ProductsPage() {
  const minPrice = Math.min(...products.map(p => p.price));
  const maxPrice = Math.max(...products.map(p => p.price));
  
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([minPrice, maxPrice]);
  const [sortBy, setSortBy] = useState(sortOptions[0].value);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [showWelcome, setShowWelcome] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    
    setTimeout(() => {
      let filtered = [...products];
      
      if (selectedCategory !== 'all') {
        filtered = filtered.filter(p => p.category === selectedCategory);
      }
      
      filtered = filtered.filter(
        p => p.price >= priceRange[0] && p.price <= priceRange[1]
      );
      
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(
          p => 
            p.name.toLowerCase().includes(query) || 
            p.description.toLowerCase().includes(query) ||
            p.category.toLowerCase().includes(query) ||
            p.seller.name.toLowerCase().includes(query) ||
            p.seller.location.toLowerCase().includes(query)
        );
      }
      
      filtered.sort((a, b) => {
        switch (sortBy) {
          case 'price-asc':
            return a.price - b.price;
          case 'price-desc':
            return b.price - a.price;
          case 'rating':
            return b.rating - a.rating;
          case 'freshness':
            if (a.freshness.includes('Today')) return -1;
            if (b.freshness.includes('Today')) return 1;
            const aDays = parseInt(a.freshness.split(' ')[0]) || 999;
            const bDays = parseInt(b.freshness.split(' ')[0]) || 999;
            return aDays - bDays;
          default:
            return 0;
        }
      });
      
      setFilteredProducts(filtered);
      setIsLoading(false);
    }, 500);
  }, [selectedCategory, priceRange, sortBy, searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen bg-background">
      {showWelcome && (
        <div className="bg-accent text-accent-foreground p-4 relative">
          <div className="container mx-auto flex items-center">
            <Info size={24} className="mr-3 flex-shrink-0" />
            <div>
              <p className="text-lg">
                Welcome to the Local Marketplace! Find fresh produce and handcrafted items from local farmers and artisans.
              </p>
            </div>
            <button 
              onClick={() => setShowWelcome(false)}
              className="ml-auto text-lg font-medium hover:underline min-h-[48px] min-w-[48px] p-2"
              aria-label="Close welcome message"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6 mb-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">Search Products</h2>
            <VoiceSearch onSearch={handleSearch} placeholder="Search by product name, type, or seller..." />
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Categories</h2>
            <CategoryFilter 
              selectedCategory={selectedCategory} 
              onSelectCategory={setSelectedCategory} 
            />
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h2 className="text-xl font-bold mb-4">Price Range</h2>
              <PriceRangeFilter
                minPrice={minPrice}
                maxPrice={maxPrice}
                onChange={setPriceRange}
              />
            </div>
            <div>
              <h2 className="text-xl font-bold mb-4">Sort Products</h2>
              <SortSelector onSort={setSortBy} selectedSort={sortBy} />
            </div>
          </section>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {filteredProducts.length} Products
          </h2>
          
          <button 
            className="flex items-center bg-primary text-primary-foreground px-6 py-3 rounded-lg text-lg font-medium hover:bg-primary/90 transition-colors"
          >
            <Milk size={20} className="mr-2" />
            My Orders
          </button>
        </div>

        <ProductsGrid products={filteredProducts} isLoading={isLoading} />
      </main>

      <footer className="bg-card text-card-foreground border-t border-border py-12 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">About Us</h3>
              <p className="text-muted-foreground">
                Local Marketplace connects farmers and small businesses with customers in their community. Support local businesses and get fresh produce directly from the source.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <p className="text-muted-foreground">Phone: 1800-123-4567</p>
              <p className="text-muted-foreground">Email: help@localmarket.com</p>
              <p className="text-muted-foreground">Address: 123 Market Street, Dehradun</p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Help</h3>
              <button className="text-primary hover:underline block mb-2 min-h-[48px] flex items-center">
                How to place an order
              </button>
              <button className="text-primary hover:underline block mb-2 min-h-[48px] flex items-center">
                Seller registration
              </button>
              <button className="text-primary hover:underline block min-h-[48px] flex items-center">
                Payment options
              </button>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-border text-center">
            <p className="text-muted-foreground">
              © 2025 Local Marketplace. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}