'use client';

import { cn } from '../../lib/utils';
import { IndianRupee } from 'lucide-react';
import React, { useState } from 'react';

interface PriceRangeFilterProps {
  minPrice: number;
  maxPrice: number;
  onChange: (range: [number, number]) => void;
}

export const PriceRangeFilter: React.FC<PriceRangeFilterProps> = ({
  minPrice,
  maxPrice,
  onChange,
}) => {
  const [localRange, setLocalRange] = useState<[number, number]>([minPrice, maxPrice]);
  const [isOpen, setIsOpen] = useState(false);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setLocalRange([value, localRange[1]]);
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setLocalRange([localRange[0], value]);
    }
  };

  const handleApply = () => {
    onChange(localRange);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full p-3 text-lg bg-card border-2 border-border rounded-lg hover:bg-accent/50 transition-colors min-h-[48px]"
        aria-expanded={isOpen}
      >
        <div className="flex items-center">
          <IndianRupee size={20} className="mr-2" />
          <span>
            Price: ₹{localRange[0]} - ₹{localRange[1]}
          </span>
        </div>
      </button>

      <div className={cn(
        "absolute z-10 w-full mt-1 bg-popover border border-border rounded-lg shadow-lg p-4 transition-all duration-200",
        isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1 pointer-events-none"
      )}>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Min Price</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-muted-foreground">₹</span>
                <input
                  type="number"
                  min={minPrice}
                  max={localRange[1]}
                  value={localRange[0]}
                  onChange={handleMinChange}
                  className="w-full p-2 pl-7 text-lg border border-input rounded-md min-h-[48px]"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Max Price</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-muted-foreground">₹</span>
                <input
                  type="number"
                  min={localRange[0]}
                  max={maxPrice}
                  value={localRange[1]}
                  onChange={handleMaxChange}
                  className="w-full p-2 pl-7 text-lg border border-input rounded-md min-h-[48px]"
                />
              </div>
            </div>
          </div>
          
          <button
            onClick={handleApply}
            className="w-full bg-primary text-primary-foreground p-3 rounded-lg text-lg font-medium hover:bg-primary/90 transition-colors min-h-[48px]"
          >
            Apply Price Filter
          </button>
        </div>
      </div>
    </div>
  );
};