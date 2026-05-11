// app/states/page.tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowLeft,
  MapPinned,
  Search,
  Globe,
  ChevronRight,
  Map,
  Filter,
  X,
} from 'lucide-react';
import { getAllStates, getAllCountries } from '@/lib/ApiService';

interface State {
  id: number;
  name: string;
  country_id: number;
  country_code: string;
  iso2: string;
  type: string;
  latitude?: string;
  longitude?: string;
}

interface Country {
  id: number;
  name: string;
  iso2: string;
  emoji: string;
}

export default function AllStatesPage() {
  const [states, setStates] = useState<State[]>([]);
  const [filteredStates, setFilteredStates] = useState<State[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountryFilter, setSelectedCountryFilter] = useState<string>('');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const [statesData, countriesData] = await Promise.all([
          getAllStates(),
          getAllCountries(),
        ]);
        setStates(statesData);
        setFilteredStates(statesData);
        setCountries(countriesData);
      } catch (err) {
        setError('Impossible de charger les états. Vérifiez votre clé API.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filtrer les états
  useEffect(() => {
    let filtered = states;

    if (searchTerm.length >= 2) {
      filtered = filtered.filter((state) =>
        state.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        state.iso2.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCountryFilter) {
      filtered = filtered.filter((state) => state.country_code === selectedCountryFilter);
    }

    if (selectedTypeFilter) {
      filtered = filtered.filter((state) => state.type === selectedTypeFilter);
    }

    setFilteredStates(filtered);
    setCurrentPage(1);
  }, [searchTerm, selectedCountryFilter, selectedTypeFilter, states]);

  // Types uniques
  const types = [...new Set(states.map((s) => s.type).filter(Boolean))].sort();

  const totalPages = Math.ceil(filteredStates.length / itemsPerPage);
  const paginatedStates = filteredStates.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCountryFilter('');
    setSelectedTypeFilter('');
  };

  const hasActiveFilters = searchTerm || selectedCountryFilter || selectedTypeFilter;

  return (
    <main className="w-full min-h-screen bg-white overflow-hidden">
      {/* Background décoratif */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-200px] right-[-150px] w-[600px] h-[600px] bg-purple-200 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-[-250px] left-[-150px] w-[650px] h-[650px] bg-pink-200 rounded-full blur-3xl opacity-25" />
      </div>

      <div className="relative z-10 w-full min-h-screen flex flex-col px-6 md:px-12 lg:px-20 py-8 md:py-12">
        
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            Tous les États du Monde
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl">
            Explorez {states.length.toLocaleString()}+ états, provinces et régions à travers le monde
          </p>
        </motion.div>

        {/* Filtres */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <Filter size={18} className="text-teal-600" />
            <h2 className="font-semibold text-gray-900">Filtres</h2>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="ml-auto text-sm text-red-500 hover:text-red-600 flex items-center gap-1 transition"
              >
                <X size={14} />
                Effacer les filtres
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Recherche */}
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher un état..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-200 focus:border-teal-400 transition"
              />
            </div>

            {/* Filtre Pays */}
            <select
              value={selectedCountryFilter}
              onChange={(e) => setSelectedCountryFilter(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-200 focus:border-teal-400 transition text-gray-700"
            >
              <option value="">Tous les pays</option>
              {countries.map((country) => (
                <option key={country.id} value={country.iso2}>
                  {country.emoji} {country.name}
                </option>
              ))}
            </select>

            {/* Filtre Type */}
            <select
              value={selectedTypeFilter}
              onChange={(e) => setSelectedTypeFilter(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-200 focus:border-teal-400 transition text-gray-700"
            >
              <option value="">Tous les types</option>
              {types.map((type) => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
            <p className="text-2xl font-bold text-teal-600">{states.length.toLocaleString()}</p>
            <p className="text-xs text-gray-500">Total États</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
            <p className="text-2xl font-bold text-cyan-600">{filteredStates.length.toLocaleString()}</p>
            <p className="text-xs text-gray-500">Affichés</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{countries.length}</p>
            <p className="text-xs text-gray-500">Pays</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
            <p className="text-2xl font-bold text-purple-600">{types.length}</p>
            <p className="text-xs text-gray-500">Types</p>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mb-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        )}

        {/* Liste des états */}
        <AnimatePresence mode="wait">
          {!isLoading && (
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mb-8"
            >
              {paginatedStates.map((state, index) => {
                const country = countries.find((c) => c.iso2 === state.country_code);
                
                return (
                  <motion.div
                    key={state.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.01 }}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 transition-all hover:shadow-md hover:-translate-y-1 hover:border-teal-200 group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="bg-teal-100 text-teal-600 w-10 h-10 rounded-xl flex items-center justify-center">
                        <MapPinned size={20} />
                      </div>
                      <Link
                        href={`/countries/${state.country_code}/states/${state.iso2}/cities`}
                        className="text-teal-600 hover:text-teal-700 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ChevronRight size={20} />
                      </Link>
                    </div>

                    <h3 className="font-bold text-lg text-gray-900 mb-2 truncate">
                      {state.name}
                    </h3>

                    <div className="space-y-1.5">
                      {country && (
                        <div className="flex items-center gap-1.5 text-sm text-gray-600">
                          <span>{country.emoji}</span>
                          <span>{country.name}</span>
                        </div>
                      )}
                      <p className="text-sm text-gray-600">
                        <span className="font-medium text-teal-600">Code:</span> {state.iso2}
                      </p>
                      {state.type && (
                        <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-600 rounded-md text-xs font-medium">
                          {state.type}
                        </span>
                      )}
                      {state.latitude && state.longitude && (
                        <p className="text-xs text-gray-400">
                          {Number(state.latitude).toFixed(2)}, {Number(state.longitude).toFixed(2)}
                        </p>
                      )}
                    </div>

                    <Link
                      href={`/countries/${state.country_code}/states/${state.iso2}/cities`}
                      className="mt-4 w-full inline-flex items-center justify-center gap-1.5 bg-teal-50 hover:bg-teal-100 text-teal-700 px-4 py-2 rounded-xl text-sm font-medium transition"
                    >
                      <Map size={14} />
                      Voir les villes
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Message si aucun résultat */}
        {!isLoading && filteredStates.length === 0 && (
          <div className="text-center py-16">
            <MapPinned size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Aucun état trouvé</h3>
            <p className="text-gray-500 mb-4">Essayez de modifier vos filtres de recherche</p>
            <button
              onClick={clearFilters}
              className="text-teal-600 hover:text-teal-700 font-medium transition"
            >
              Effacer les filtres
            </button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="w-10 h-10 rounded-xl font-semibold transition bg-white text-gray-600 hover:bg-teal-50 border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ←
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-10 h-10 rounded-xl font-semibold transition ${
                  currentPage === i + 1
                    ? 'bg-teal-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-teal-50 border border-gray-200'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="w-10 h-10 rounded-xl font-semibold transition bg-white text-gray-600 hover:bg-teal-50 border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              →
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
