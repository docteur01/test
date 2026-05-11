// app/countries/[iso2]/states/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ArrowLeft,
  Map,
  Search,
  MapPinned,
  ChevronRight,
  Building2,
  Globe,
  Filter,
  X,
  ChevronDown,
  ExternalLink,
  Navigation,
  Hash,
} from 'lucide-react';
import { getStatesByCountry, getCountryDetails } from '@/lib/ApiService';

interface State {
  id: number;
  name: string;
  iso2: string;
  country_id?: number;
  country_code?: string;
  type?: string;
  latitude?: string;
  longitude?: string;
}

interface Country {
  id: number;
  name: string;
  iso2: string;
  emoji: string;
  capital: string;
  currency: string;
  phonecode: string;
}

export default function StatesByCountryPage() {
  const params = useParams();
  const countryIso2 = params?.iso2 as string;

  const [states, setStates] = useState<State[]>([]);
  const [filteredStates, setFilteredStates] = useState<State[]>([]);
  const [country, setCountry] = useState<Country | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState<State | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<'name' | 'type'>('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const itemsPerPage = 24;

  useEffect(() => {
    if (!countryIso2) return;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const [countryData, statesData] = await Promise.all([
          getCountryDetails(countryIso2),
          getStatesByCountry(countryIso2),
        ]);
        setCountry(countryData as Country);
        
        // Tri initial par nom
        const sorted = [...statesData].sort((a, b) => a.name.localeCompare(b.name));
        setStates(sorted);
        setFilteredStates(sorted);
      } catch (err) {
        setError('Impossible de charger les données. Vérifiez votre clé API.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [countryIso2]);

  useEffect(() => {
    let filtered = states;

    if (searchTerm.length >= 2) {
      filtered = states.filter((state) =>
        state.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        state.iso2.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (state.type && state.type.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (sortOrder === 'name') {
      filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === 'type') {
      filtered = [...filtered].sort((a, b) => (a.type || '').localeCompare(b.type || ''));
    }

    setFilteredStates(filtered);
    setCurrentPage(1);
  }, [searchTerm, sortOrder, states]);

  // Statistiques
  const types = [...new Set(states.map((s) => s.type).filter(Boolean))];
  const statesWithCoords = states.filter((s) => s.latitude && s.longitude).length;

  const totalPages = Math.ceil(filteredStates.length / itemsPerPage);
  const paginatedStates = filteredStates.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Grouper par type pour la vue liste
  const groupedByType = paginatedStates.reduce((acc, state) => {
    const type = state.type || 'Non classé';
    if (!acc[type]) acc[type] = [];
    acc[type].push(state);
    return acc;
  }, {} as Record<string, State[]>);

  return (
    <main className="w-full min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Background décoratif */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-250px] right-[-200px] w-[700px] h-[700px] bg-green-200 rounded-full blur-3xl opacity-25" />
        <div className="absolute bottom-[-250px] left-[-200px] w-[700px] h-[700px] bg-emerald-200 rounded-full blur-3xl opacity-20" />
      </div>

      <div className="relative z-10 w-full min-h-screen flex flex-col px-6 md:px-10 lg:px-16 py-8 md:py-10">
        
        {/* En-tête compact */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
        {/**
          <div className="flex items-center gap-2 text-sm mb-3">
            <Link href="/" className="text-green-600 hover:text-green-700 transition">
              Accueil
            </Link>
            <ChevronRight size={14} className="text-gray-400" />
            <Link href="/countries" className="text-green-600 hover:text-green-700 transition">
              Pays
            </Link>
            <ChevronRight size={14} className="text-gray-400" />
            <span className="text-gray-600">{country?.name || 'États'}</span>
          </div>
        */}

          {country && (
            <div className="flex items-center gap-4">
              <span className="text-5xl">{country.emoji}</span>
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wide">États et Régions de</p>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900">
                  {country.name}
                </h1>
              </div>
            </div>
          )}
        </motion.div>

        {/* Layout 2 colonnes */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* COLONNE PRINCIPALE (2/3) : Liste des états */}
          <div className="lg:col-span-2 space-y-5">
            
            {/* Barre d'outils */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4"
            >
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                {/* Recherche */}
                <div className="flex-1 relative max-w-md">
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Rechercher un état..."
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400 transition"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>

                {/* Contrôles */}
                <div className="flex items-center gap-3">
                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value as 'name' | 'type')}
                    className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-200 text-gray-700"
                  >
                    <option value="name">Trier par nom</option>
                    <option value="type">Trier par type</option>
                  </select>

                  <div className="flex bg-gray-100 rounded-xl p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                        viewMode === 'grid' ? 'bg-white shadow-sm text-green-600' : 'text-gray-500'
                      }`}
                    >
                      Grille
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                        viewMode === 'list' ? 'bg-white shadow-sm text-green-600' : 'text-gray-500'
                      }`}
                    >
                      Liste
                    </button>
                  </div>
                </div>
              </div>

              {/* Compteur */}
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
                <span className="text-sm text-gray-500">
                  <strong className="text-green-600">{filteredStates.length}</strong> états affichés
                  {searchTerm && ` pour "${searchTerm}"`}
                </span>
                <span className="text-xs text-gray-400">sur {states.length}</span>
              </div>
            </motion.div>

            {/* Message d'erreur */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                <p className="text-red-600">{error}</p>
              </div>
            )}

            {/* Loading */}
            {isLoading && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-pulse">
                    <div className="h-8 w-8 bg-gray-200 rounded-xl mb-4" />
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                  </div>
                ))}
              </div>
            )}

            {/* Vue Grille */}
            {!isLoading && viewMode === 'grid' && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPage}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  {paginatedStates.map((state, index) => (
                    <motion.button
                      key={state.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.02 }}
                      onClick={() => setSelectedState(selectedState?.id === state.id ? null : state)}
                      className={`relative bg-white rounded-2xl shadow-sm border p-5 text-left transition-all hover:shadow-md hover:-translate-y-1 group ${
                        selectedState?.id === state.id
                          ? 'border-green-400 ring-2 ring-green-200 shadow-lg bg-green-50/30'
                          : 'border-gray-100'
                      }`}
                    >
                      {/* Badge sélectionné */}
                      {selectedState?.id === state.id && (
                        <div className="absolute top-3 right-3 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}

                      <div className="flex items-start gap-3 mb-3">
                        <div className="bg-green-100 text-green-600 w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                          <MapPinned size={20} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-bold text-gray-900 truncate">{state.name}</h3>
                          <p className="text-sm text-green-600 font-medium">{state.iso2}</p>
                        </div>
                        <ChevronRight
                          size={18}
                          className={`text-gray-400 flex-shrink-0 transition-transform ${
                            selectedState?.id === state.id ? 'rotate-90' : ''
                          }`}
                        />
                      </div>

                      <div className="space-y-2">
                        {state.type && (
                          <span className="inline-block px-2.5 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium">
                            {state.type}
                          </span>
                        )}
                        {state.latitude && state.longitude && (
                          <p className="text-xs text-gray-400 flex items-center gap-1">
                            <Navigation size={10} />
                            {Number(state.latitude).toFixed(2)}, {Number(state.longitude).toFixed(2)}
                          </p>
                        )}
                      </div>

                      {/* Lien rapide */}
                      <Link
                        href={`/countries/${countryIso2}/states/${state.iso2}/cities`}
                        onClick={(e) => e.stopPropagation()}
                        className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-green-600 hover:text-green-700 transition"
                      >
                        <Building2 size={12} />
                        Voir les villes
                        <ChevronRight size={12} />
                      </Link>
                    </motion.button>
                  ))}
                </motion.div>
              </AnimatePresence>
            )}

            {/* Vue Liste groupée */}
            {!isLoading && viewMode === 'list' && (
              <div className="space-y-6">
                {Object.entries(groupedByType)
                  .sort(([a], [b]) => a.localeCompare(b))
                  .map(([type, typeStates]) => (
                    <motion.div
                      key={type}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                    >
                      <div className="bg-gray-50 px-4 py-2.5 border-b border-gray-100 flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                          <Hash size={14} className="text-green-500" />
                          {type}
                        </h3>
                        <span className="text-xs text-gray-400">{typeStates.length} état(s)</span>
                      </div>
                      <div className="divide-y divide-gray-50">
                        {typeStates.map((state) => (
                          <button
                            key={state.id}
                            onClick={() => setSelectedState(selectedState?.id === state.id ? null : state)}
                            className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-green-50/50 transition ${
                              selectedState?.id === state.id ? 'bg-green-50' : ''
                            }`}
                          >
                            <MapPinned size={16} className="text-green-500 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-gray-900 truncate">{state.name}</p>
                              <p className="text-xs text-gray-400">{state.iso2}</p>
                            </div>
                            <Link
                              href={`/countries/${countryIso2}/states/${state.iso2}/cities`}
                              onClick={(e) => e.stopPropagation()}
                              className="text-xs text-green-600 hover:text-green-700 font-medium flex items-center gap-1 flex-shrink-0"
                            >
                              Villes
                              <ChevronRight size={12} />
                            </Link>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  ))}
              </div>
            )}

            {/* Aucun résultat */}
            {!isLoading && filteredStates.length === 0 && (
              <div className="text-center py-16">
                <MapPinned size={64} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Aucun état trouvé</h3>
                <p className="text-gray-500 mb-4">Essayez de modifier votre recherche</p>
                <button
                  onClick={() => setSearchTerm('')}
                  className="text-green-600 hover:text-green-700 font-medium transition"
                >
                  Effacer la recherche
                </button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="w-10 h-10 rounded-xl transition bg-white text-gray-600 hover:bg-green-50 border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  ←
                </button>
                {[...Array(Math.min(totalPages, 7))].map((_, i) => {
                  let pageNum = i + 1;
                  if (totalPages > 7 && currentPage > 4) {
                    pageNum = currentPage - 3 + i;
                    if (pageNum > totalPages) return null;
                  }
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-10 h-10 rounded-xl font-semibold transition ${
                        currentPage === pageNum
                          ? 'bg-green-600 text-white'
                          : 'bg-white text-gray-600 hover:bg-green-50 border border-gray-200'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 rounded-xl transition bg-white text-gray-600 hover:bg-green-50 border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  →
                </button>
              </div>
            )}
          </div>

          {/* COLONNE DROITE (1/3) : Détails et Statistiques */}
          <div className="space-y-5">
            
            {/* Carte Détails de l'état sélectionné */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="sticky top-24"
            >
              <AnimatePresence mode="wait">
                {selectedState ? (
                  <motion.div
                    key="details"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white rounded-3xl shadow-xl border border-green-100 overflow-hidden"
                  >
                    {/* En-tête */}
                    <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 text-white">
                      <div className="flex items-center gap-3 mb-1">
                        <MapPinned size={24} />
                        <h3 className="font-bold text-lg">État Sélectionné</h3>
                      </div>
                      <p className="text-green-100 text-sm">Détails et actions</p>
                    </div>

                    <div className="p-6 space-y-4">
                      {/* Nom et code */}
                      <div className="bg-green-50 rounded-2xl p-4 border border-green-100">
                        <h2 className="text-xl font-bold text-gray-900 mb-1">{selectedState.name}</h2>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 bg-white text-green-700 rounded-lg text-xs font-bold border border-green-200">
                            {selectedState.iso2}
                          </span>
                          {selectedState.type && (
                            <span className="px-2 py-0.5 bg-white text-gray-600 rounded-lg text-xs border border-gray-200">
                              {selectedState.type}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Coordonnées */}
                      {selectedState.latitude && selectedState.longitude && (
                        <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                          <p className="text-xs text-gray-500 mb-2 font-medium">Coordonnées</p>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="bg-white rounded-xl p-3 text-center">
                              <p className="text-xs text-gray-400">Latitude</p>
                              <p className="font-mono text-sm font-bold text-green-600">{Number(selectedState.latitude).toFixed(4)}</p>
                            </div>
                            <div className="bg-white rounded-xl p-3 text-center">
                              <p className="text-xs text-gray-400">Longitude</p>
                              <p className="font-mono text-sm font-bold text-green-600">{Number(selectedState.longitude).toFixed(4)}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="space-y-2">
                        <Link
                          href={`/countries/${countryIso2}/states/${selectedState.iso2}/cities`}
                          className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-xl font-semibold transition shadow-lg shadow-green-200"
                        >
                          <Building2 size={18} />
                          Voir toutes les villes
                          <ChevronRight size={18} />
                        </Link>
                        <Link
                          href={`/countries/${countryIso2}`}
                          className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2.5 rounded-xl font-medium transition"
                        >
                          <Globe size={16} />
                          Détails du pays
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  /* Statistiques */
                  <motion.div
                    key="stats"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
                  >
                    <div className="bg-gradient-to-br from-gray-700 to-gray-900 p-6 text-white">
                      <div className="flex items-center gap-3 mb-1">
                        <Filter size={24} />
                        <h3 className="font-bold text-lg">Statistiques</h3>
                      </div>
                      <p className="text-gray-300 text-sm">
                        {country ? country.name : 'Chargement...'}
                      </p>
                    </div>

                    <div className="p-6 space-y-4">
                      {country && (
                        <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
                          <div className="flex items-center gap-3">
                            <span className="text-3xl">{country.emoji}</span>
                            <div>
                              <p className="text-sm text-gray-500">Pays</p>
                              <p className="font-bold text-gray-900">{country.name}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-green-50 rounded-2xl p-4 border border-green-100 text-center">
                          <p className="text-3xl font-bold text-green-600">{states.length}</p>
                          <p className="text-xs text-gray-500 mt-1">Total États</p>
                        </div>
                        <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100 text-center">
                          <p className="text-3xl font-bold text-emerald-600">{types.length}</p>
                          <p className="text-xs text-gray-500 mt-1">Types</p>
                        </div>
                        <div className="bg-teal-50 rounded-2xl p-4 border border-teal-100 text-center">
                          <p className="text-3xl font-bold text-teal-600">{statesWithCoords}</p>
                          <p className="text-xs text-gray-500 mt-1">Avec coord.</p>
                        </div>
                        <div className="bg-cyan-50 rounded-2xl p-4 border border-cyan-100 text-center">
                          <p className="text-3xl font-bold text-cyan-600">{filteredStates.length}</p>
                          <p className="text-xs text-gray-500 mt-1">Affichés</p>
                        </div>
                      </div>

                      {/* Types disponibles */}
                      {types.length > 0 && (
                        <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                          <p className="text-xs text-gray-500 mb-2 font-medium">Types d'états</p>
                          <div className="flex flex-wrap gap-1.5">
                            {types.map((type) => (
                              <span
                                key={type}
                                className="px-2.5 py-1 bg-white text-gray-600 rounded-lg text-xs border border-gray-200"
                              >
                                {type}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100">
                        <div className="flex items-start gap-2">
                          <span className="text-lg">💡</span>
                          <p className="text-xs text-amber-700">
                            Cliquez sur un état pour voir ses détails et accéder à ses villes.
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}