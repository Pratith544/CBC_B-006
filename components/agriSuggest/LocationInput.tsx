import React, { useState, useEffect, useRef } from 'react';
import { Search, X, MapPin } from 'lucide-react';
import { searchLocations } from '@/api/weatherApi';
import { LocationData } from '@/types/weather';

interface SearchBarProps {
  onLocationSelect: (location: string) => void;
  savedLocations?: string[];
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onLocationSelect, 
  savedLocations = [] 
}) => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<LocationData[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const searchTimer = setTimeout(async () => {
      if (query.length >= 2) {
        setIsSearching(true);
        const locations = await searchLocations(query);
        setResults(locations);
        setIsSearching(false);
        setShowDropdown(true);
      } else {
        setResults([]);
        setShowDropdown(false);
      }
    }, 500);

    return () => clearTimeout(searchTimer);
  }, [query]);

  const handleLocationClick = (location: LocationData) => {
    onLocationSelect(`${location.lat},${location.lon}`);
    setQuery(location.name);
    setShowDropdown(false);
  };

  const handleSavedLocationClick = (location: string) => {
    onLocationSelect(location);
    setQuery(location);
    setShowDropdown(false);
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setShowDropdown(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleFocus = () => {
    if (query.length >= 2) {
      setShowDropdown(true);
    }
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={handleFocus}
          placeholder="Search for a location..."
          className="w-full pl-10 pr-10 py-2 bg-white/20 backdrop-blur-md text-white 
                    border border-white/30 rounded-full shadow-lg focus:outline-none 
                    focus:ring-2 focus:ring-white/50 transition-all"
        />
        <Search className="absolute left-3 top-2.5 text-white/70" size={18} />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-2.5 text-white/70 hover:text-white"
          >
            <X size={18} />
          </button>
        )}
      </div>
      
      {showDropdown && (
        <div className="absolute z-10 mt-1 w-full bg-white/90 backdrop-blur-lg 
                        rounded-xl shadow-lg overflow-hidden transform transition-all 
                        duration-200 max-h-60 overflow-y-auto">
          {isSearching ? (
            <div className="p-3 text-center text-gray-600">
              Searching...
            </div>
          ) : (
            <>
              {results.length > 0 ? (
                <ul>
                  {results.map((location) => (
                    <li
                      key={`${location.id}-${location.name}`}
                      onClick={() => handleLocationClick(location)}
                      className="p-3 hover:bg-blue-50 cursor-pointer transition-colors 
                                flex items-center justify-between border-b border-gray-100"
                    >
                      <div>
                        <p className="font-medium text-gray-800">{location.name}</p>
                        <p className="text-sm text-gray-500">{location.region}, {location.country}</p>
                      </div>
                      <MapPin size={16} className="text-blue-500" />
                    </li>
                  ))}
                </ul>
              ) : query.length >= 2 ? (
                <div className="p-3 text-center text-gray-600">
                  No locations found
                </div>
              ) : savedLocations.length > 0 ? (
                <div>
                  <p className="p-2 bg-gray-100 text-xs font-medium text-gray-500 uppercase">
                    Saved Locations
                  </p>
                  <ul>
                    {savedLocations.map((location, index) => (
                      <li
                        key={`saved-${index}`}
                        onClick={() => handleSavedLocationClick(location)}
                        className="p-3 hover:bg-blue-50 cursor-pointer transition-colors 
                                  flex items-center border-b border-gray-100"
                      >
                        <MapPin size={16} className="text-blue-500 mr-2" />
                        <span className="text-gray-800">{location}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;