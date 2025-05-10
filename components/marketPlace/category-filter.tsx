'use client';

import { categories } from '../../data/products';
import * as LucideIcons from 'lucide-react';
import { IconButton } from '../ui/icon-button';

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="w-full overflow-x-auto py-4 scrollbar-hide">
      <div className="flex space-x-4 min-w-max px-2">
        {categories.map((category) => {
          const IconComponent = 
            //LucideIcons[category.icon as keyof typeof LucideIcons] || 
            LucideIcons.ShoppingBag;
          
          const isActive = selectedCategory === category.id;
          
          return (
            <div 
              key={category.id}
              className="flex flex-col items-center space-y-2"
            >
              <IconButton
                onClick={() => onSelectCategory(category.id)}
                active={isActive}
                size="lg"
                variant={isActive ? "primary" : "outline"}
                aria-label={`Filter by ${category.name}`}
              >
                <IconComponent size={24} />
              </IconButton>
              <span className={`text-sm font-medium ${
                isActive ? 'text-primary' : 'text-muted-foreground'
              }`}>
                {category.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};