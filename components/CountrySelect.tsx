// components/CountrySelect.tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Search, ChevronDown, Check, Globe } from 'lucide-react';
import { getAllCountries } from '@/lib/ApiService';

interface Country {
  id: number;
  name: string;
  iso2: string;
  iso3: string;
  phonecode: string;
  capital: string;
  currency: string;
  native: string;
  emoji: string;
}

interface CountrySelectProps {
  onCountryChange: (country: Country | null) => void;
  selectedCountry: Country | null;
}

export default function CountrySelect({ onCountryChange, selectedCountry }: CountrySelectProps) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Charger les pays au montage
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getAllCountries();
        setCountries(data);
        setFilteredCountries(data);
      } catch (err) {
        setError('Impossible de charger les pays. Vérifiez votre clé API.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountries();
  }, []);

  // Filtrer les pays selon la recherche locale
  const filterCountries = useCallback((term: string) => {
    if (term.length < 2) {
      setFilteredCountries(countries);
      return;
    }
    const filtered = countries.filter((country) =>
      country.name.toLowerCase().includes(term.toLowerCase()) ||
      country.native?.toLowerCase().includes(term.toLowerCase()) ||
      country.iso2.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredCountries(filtered);
  }, [countries]);

  useEffect(() => {
    filterCountries(searchTerm);
  }, [searchTerm, filterCountries]);

  const handleSelect = (country: Country) => {
    onCountryChange(country);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleClear = () => {
    onCountryChange(null);
    setSearchTerm('');
  };

  return (
    <div className="relative">
      {/* Bouton de sélection */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        disabled={isLoading || !!error}
        className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-xl hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <div className="flex items-center gap-3">
          {selectedCountry ? (
            <>
              <span className="text-2xl">{selectedCountry.emoji}</span>
              <div className="text-left">
                <p className="font-medium text-gray-900">{selectedCountry.name}</p>
                <p className="text-xs text-gray-500">{selectedCountry.capital}</p>
              </div>
            </>
          ) : (
            <>
              <Globe size={20} className="text-gray-400" />
              <span className="text-gray-500">
                {isLoading ? 'Chargement...' : 'Sélectionnez un pays'}
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
              placeholder="Rechercher un pays..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
              autoFocus
            />
          </div>

          {/* Liste des pays */}
          <div className="max-h-60 overflow-y-auto">
            {filteredCountries.length === 0 ? (
              <p className="text-center text-gray-500 py-6 text-sm">Aucun pays trouvé</p>
            ) : (
              filteredCountries.map((country) => (
                <button
                  key={country.id}
                  type="button"
                  onClick={() => handleSelect(country)}
                  className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition text-left ${
                    selectedCountry?.iso2 === country.iso2 ? 'bg-blue-50' : ''
                  }`}
                >
                  <span className="text-xl">{country.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{country.name}</p>
                    <p className="text-xs text-gray-500">{country.capital} • {country.currency}</p>
                  </div>
                  {selectedCountry?.iso2 === country.iso2 && (
                    <Check size={18} className="text-blue-600 flex-shrink-0" />
                  )}
                </button>
              ))
            )}
          </div>

          {/* Pied du dropdown */}
          <div className="px-4 py-2 bg-gray-50 border-t border-gray-100 text-xs text-gray-500">
            {filteredCountries.length} pays affichés sur {countries.length}
          </div>
        </div>
      )}

      {/* Overlay pour fermer le dropdown en cliquant à l'extérieur */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}