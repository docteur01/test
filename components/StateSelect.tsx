// components/StateSelect.tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Search, ChevronDown, Check, Map } from 'lucide-react';
import { getStatesByCountry } from '@/lib/ApiService';

interface State {
  id: number;
  name: string;
  iso2: string;
}

interface StateSelectProps {
  countryIso2: string | null;
  onStateChange: (state: State | null) => void;
  selectedState: State | null;
}

export default function StateSelect({ countryIso2, onStateChange, selectedState }: StateSelectProps) {
  const [states, setStates] = useState<State[]>([]);
  const [filteredStates, setFilteredStates] = useState<State[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Charger les états quand le pays change
  useEffect(() => {
    if (!countryIso2) {
      setStates([]);
      setFilteredStates([]);
      setError(null);
      return;
    }

    const fetchStates = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getStatesByCountry(countryIso2);
        setStates(data);
        setFilteredStates(data);
      } catch (err) {
        setError('Impossible de charger les états.');
        console.error(err);
        setStates([]);
        setFilteredStates([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStates();
  }, [countryIso2]);

  // Filtrer localement
  const filterStates = useCallback((term: string) => {
    if (term.length < 2) {
      setFilteredStates(states);
      return;
    }
    const filtered = states.filter((state) =>
      state.name.toLowerCase().includes(term.toLowerCase()) ||
      state.iso2.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredStates(filtered);
  }, [states]);

  useEffect(() => {
    filterStates(searchTerm);
  }, [searchTerm, filterStates]);

  const handleSelect = (state: State) => {
    onStateChange(state);
    setIsOpen(false);
    setSearchTerm('');
  };

  if (!countryIso2) {
    return (
      <div className="flex items-center gap-3 text-gray-400 py-3">
        <Map size={20} />
        <span className="text-sm">Veuillez d&apos;abord sélectionner un pays</span>
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
        className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-xl hover:border-green-400 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <div className="flex items-center gap-3">
          {selectedState ? (
            <>
              <Map size={20} className="text-green-500" />
              <div className="text-left">
                <p className="font-medium text-gray-900">{selectedState.name}</p>
                <p className="text-xs text-gray-500">{selectedState.iso2}</p>
              </div>
            </>
          ) : (
            <>
              <Map size={20} className="text-gray-400" />
              <span className="text-gray-500">
                {isLoading ? 'Chargement...' : 'Sélectionnez un état'}
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
              placeholder="Rechercher un état..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400"
              autoFocus
            />
          </div>

          {/* Liste */}
          <div className="max-h-60 overflow-y-auto">
            {filteredStates.length === 0 ? (
              <p className="text-center text-gray-500 py-6 text-sm">Aucun état trouvé</p>
            ) : (
              filteredStates.map((state) => (
                <button
                  key={state.id}
                  type="button"
                  onClick={() => handleSelect(state)}
                  className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-green-50 transition text-left ${
                    selectedState?.iso2 === state.iso2 ? 'bg-green-50' : ''
                  }`}
                >
                  <Map size={18} className="text-green-500 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{state.name}</p>
                    <p className="text-xs text-gray-500">{state.iso2}</p>
                  </div>
                  {selectedState?.iso2 === state.iso2 && (
                    <Check size={18} className="text-green-600 flex-shrink-0" />
                  )}
                </button>
              ))
            )}
          </div>

          <div className="px-4 py-2 bg-gray-50 border-t border-gray-100 text-xs text-gray-500">
            {filteredStates.length} états affichés sur {states.length}
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