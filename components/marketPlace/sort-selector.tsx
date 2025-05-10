'use client';

import { sortOptions } from '../../data/products';
import { SortOption } from '../../types';
import { ChevronDown, SortDesc } from 'lucide-react';
import React, { useState } from 'react';

interface SortSelectorProps {
  onSort: (sortValue: string) => void;
  selectedSort: string;
}

export const SortSelector: React.FC<SortSelectorProps> = ({
  onSort,
  selectedSort,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option: SortOption) => {
    onSort(option.value);
    setIsOpen(false);
  };

  const selectedOption = sortOptions.find(
    (option) => option.value === selectedSort
  ) || sortOptions[0];

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-between w-full p-3 text-lg bg-card border-2 border-border rounded-lg hover:bg-accent/50 transition-colors min-h-[48px] min-w-[48px]"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="flex items-center">
          <SortDesc size={20} className="mr-2" />
          <span>{selectedOption.label}</span>
        </div>
        <ChevronDown size={20} />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-popover border border-border rounded-lg shadow-lg">
          <ul 
            className="py-2 text-lg" 
            role="listbox"
            aria-labelledby="sort-button"
          >
            {sortOptions.map((option) => (
              <li
                key={option.value}
                onClick={() => handleSelect(option)}
                className={`px-4 py-3 flex justify-between items-center cursor-pointer min-h-[48px] ${
                  selectedSort === option.value
                    ? 'bg-accent text-accent-foreground'
                    : 'hover:bg-accent/50'
                }`}
                role="option"
                aria-selected={selectedSort === option.value}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};