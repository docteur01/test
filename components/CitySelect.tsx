// components/CitySelect.tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Search, ChevronDown, Check, Building2 } from 'lucide-react';
import { getCitiesByState } from '@/lib/ApiService';

interface City {
  id: number;
  name: string;
}

interface CitySelectProps {
  countryIso2: string | null;
  stateIso2: string | null;
  onCityChange: (city: City | null) => void;
  selectedCity: City | null;
}

export default function CitySelect({ countryIso2, stateIso2, onCityChange, selectedCity }: CitySelectProps) {
  const [cities, setCities] = useState<City[]>([]);
  const [filteredCities, setFilteredCities] = useState<City[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Charger les villes quand l'état change
  useEffect(() => {
    if (!countryIso2 || !stateIso2) {
      setCities([]);
      setFilteredCities([]);
      setError(null);
      return;
    }

    const fetchCities = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getCitiesByState(countryIso2, stateIso2);
        setCities(data);
        setFilteredCities(data);
      } catch (err) {
        setError('Impossible de charger les villes.');
        console.error(err);
        setCities([]);
        setFilteredCities([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCities();
  }, [countryIso2, stateIso2]);

  // Filtrer localement
  const filterCities = useCallback((term: string) => {
    if (term.length < 2) {
      setFilteredCities(cities);
      return;
    }
    const filtered = cities.filter((city) =>
      city.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredCities(filtered);
  }, [cities]);

  useEffect(() => {
    filterCities(searchTerm);
  }, [searchTerm, filterCities]);

  const handleSelect = (city: City) => {
    onCityChange(city);
    setIsOpen(false);
    setSearchTerm('');
  };

  if (!countryIso2 || !stateIso2) {
    return (
      <div className="flex items-center gap-3 text-gray-400 py-3">
        <Building2 size={20} />
        <span className="text-sm">Veuillez d&apos;abord sélectionner un état</span>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Bouton de sélection */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        disabled={isLoading || !!error}
        className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-xl hover:border-indigo-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <div className="flex items-center gap-3">
          {selectedCity ? (
            <>
              <Building2 size={20} className="text-indigo-500" />
              <p className="font-medium text-gray-900">{selectedCity.name}</p>
            </>
          ) : (
            <>
              <Building2 size={20} className="text-gray-400" />
              <span className="text-gray-500">
                {isLoading ? 'Chargement...' : 'Sélectionnez une ville'}
              </span>
            </>
          )}
        </div>
        <ChevronDown size={20} className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Message d'erreur */}
      {error && (
        <p className="mt-2 text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
      )}

      {/* Dropdown */}
      {isOpen && !isLoading && !error && (
        <div className="absolute z-50 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
          {/* Barre de recherche */}
          <div className="relative p-3 border-b border-gray-100">
            <Search size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher une ville..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400"
              autoFocus
            />
          </div>

          {/* Liste */}
          <div className="max-h-60 overflow-y-auto">
            {filteredCities.length === 0 ? (
              <p className="text-center text-gray-500 py-6 text-sm">Aucune ville trouvée</p>
            ) : (
              filteredCities.map((city) => (
                <button
                  key={city.id}
                  type="button"
                  onClick={() => handleSelect(city)}
                  className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-indigo-50 transition text-left ${
                    selectedCity?.id === city.id ? 'bg-indigo-50' : ''
                  }`}
                >
                  <Building2 size={18} className="text-indigo-500 flex-shrink-0" />
                  <p className="font-medium text-gray-900 truncate">{city.name}</p>
                  {selectedCity?.id === city.id && (
                    <Check size={18} className="text-indigo-600 flex-shrink-0 ml-auto" />
                  )}
                </button>
              ))
            )}
          </div>

          <div className="px-4 py-2 bg-gray-50 border-t border-gray-100 text-xs text-gray-500">
            {filteredCities.length} villes affichées sur {cities.length}
          </div>
        </div>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}