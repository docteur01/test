// app/countries/[iso2]/states/[stateIso2]/cities/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ArrowLeft,
  Building2,
  Search,
  MapPinned,
  ChevronRight,
  Navigation,
  X,
  Filter,
  Globe,
  Map,
  Hash,
  List,
  LayoutGrid,
  Download,
  Copy,
  Check,
} from 'lucide-react';
import { getCitiesByState, getCountryDetails, getStateDetails } from '@/lib/ApiService';

interface City {
  id: number;
  name: string;
  latitude?: string;
  longitude?: string;
  country_code?: string;
  state_code?: string;
}

interface State {
  id: number;
  name: string;
  iso2: string;
  country_code?: string;
  type?: string;
}

interface Country {
  id: number;
  name: string;
  iso2: string;
  emoji: string;
  capital: string;
  currency: string;
}

export default function CitiesByStatePage() {
  const params = useParams();
  const countryIso2 = params?.iso2 as string;
  const stateIso2 = params?.stateIso2 as string;

  const [cities, setCities] = useState<City[]>([]);
  const [filteredCities, setFilteredCities] = useState<City[]>([]);
  const [country, setCountry] = useState<Country | null>(null);
  const [state, setState] = useState<State | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<'name' | 'coordinates'>('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'compact'>('grid');
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const itemsPerPage = 30;

  useEffect(() => {
    if (!countryIso2 || !stateIso2) return;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const [countryData, stateData, citiesData] = await Promise.all([
          getCountryDetails(countryIso2),
          getStateDetails(countryIso2, stateIso2),
          getCitiesByState(countryIso2, stateIso2),
        ]);
        setCountry(countryData as Country);
        setState(stateData as State);
        
        // Tri initial par nom
        const sorted = [...citiesData].sort((a, b) => a.name.localeCompare(b.name));
        setCities(sorted);
        setFilteredCities(sorted);
      } catch (err) {
        setError('Impossible de charger les données. Vérifiez votre clé API.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [countryIso2, stateIso2]);

  useEffect(() => {
    let filtered = cities;

    if (searchTerm.length >= 2) {
      filtered = cities.filter((city) =>
        city.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortOrder === 'name') {
      filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === 'coordinates') {
      filtered = [...filtered].sort((a, b) => {
        const latA = a.latitude ? Number(a.latitude) : 0;
        const latB = b.latitude ? Number(b.latitude) : 0;
        return latA - latB;
      });
    }

    setFilteredCities(filtered);
    setCurrentPage(1);
  }, [searchTerm, sortOrder, cities]);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const citiesWithCoords = cities.filter((c) => c.latitude && c.longitude).length;
  const uniqueLetters = [...new Set(cities.map((c) => c.name.charAt(0).toUpperCase()))].sort();

  const totalPages = Math.ceil(filteredCities.length / itemsPerPage);
  const paginatedCities = filteredCities.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Grouper par première lettre pour la vue liste
  const groupedByLetter = paginatedCities.reduce((acc, city) => {
    const letter = city.name.charAt(0).toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(city);
    return acc;
  }, {} as Record<string, City[]>);

  return (
    <main className="w-full min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Background décoratif */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-250px] right-[-200px] w-[700px] h-[700px] bg-indigo-200 rounded-full blur-3xl opacity-25" />
        <div className="absolute bottom-[-250px] left-[-200px] w-[700px] h-[700px] bg-purple-200 rounded-full blur-3xl opacity-20" />
      </div>

      <div className="relative z-10 w-full min-h-screen flex flex-col px-6 md:px-10 lg:px-16 py-8 md:py-10">
        
        {/* En-tête compact */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          {/* Fil d'Ariane 
          <div className="flex items-center gap-2 text-sm mb-3">
            <Link href="/" className="text-indigo-600 hover:text-indigo-700 transition font-medium">
              Accueil
            </Link>
            <ChevronRight size={14} className="text-gray-400" />
            <Link href="/countries" className="text-indigo-600 hover:text-indigo-700 transition font-medium">
              Pays
            </Link>
            <ChevronRight size={14} className="text-gray-400" />
            <Link href={`/countries/${countryIso2}/states`} className="text-indigo-600 hover:text-indigo-700 transition font-medium">
              {country?.name || 'États'}
            </Link>
            <ChevronRight size={14} className="text-gray-400" />
            <span className="text-gray-600">{state?.name || 'Villes'}</span>
          </div>*/}

          {country && state && (
            <div className="flex items-center gap-4">
              <span className="text-5xl">{country.emoji}</span>
              <div>
                <p className="text-sm text-gray-500">
                  <span className="font-medium text-indigo-600">{state.name}</span> • {country.name}
                </p>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900">
                  Villes
                </h1>
              </div>
            </div>
          )}
        </motion.div>

        {/* Layout 2 colonnes */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* COLONNE PRINCIPALE (2/3) */}
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
                    placeholder={`Rechercher parmi ${cities.length} villes...`}
                    className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition"
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
                    onChange={(e) => setSortOrder(e.target.value as 'name' | 'coordinates')}
                    className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 text-gray-700"
                  >
                    <option value="name">Trier par nom</option>
                    <option value="coordinates">Trier par coordonnées</option>
                  </select>

                  <div className="flex bg-gray-100 rounded-xl p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-lg transition ${
                        viewMode === 'grid' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500'
                      }`}
                      title="Vue grille"
                    >
                      <LayoutGrid size={16} />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-lg transition ${
                        viewMode === 'list' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500'
                      }`}
                      title="Vue liste"
                    >
                      <List size={16} />
                    </button>
                    <button
                      onClick={() => setViewMode('compact')}
                      className={`p-2 rounded-lg transition ${
                        viewMode === 'compact' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500'
                      }`}
                      title="Vue compacte"
                    >
                      <Hash size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Compteur et stats rapides */}
              <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-100">
                <span className="text-sm text-gray-500">
                  <strong className="text-indigo-600">{filteredCities.length}</strong> villes affichées
                </span>
                <span className="text-xs text-gray-400">sur {cities.length} au total</span>
                {searchTerm && (
                  <span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-lg">
                    Recherche: "{searchTerm}"
                  </span>
                )}
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
              <div className={`grid gap-4 ${
                viewMode === 'compact' ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4' : 'grid-cols-1 md:grid-cols-2'
              }`}>
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 animate-pulse">
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
                  key={`grid-${currentPage}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  {paginatedCities.map((city, index) => (
                    <motion.button
                      key={city.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.01 }}
                      onClick={() => setSelectedCity(selectedCity?.id === city.id ? null : city)}
                      className={`relative bg-white rounded-2xl shadow-sm border p-5 text-left transition-all hover:shadow-md hover:-translate-y-1 group ${
                        selectedCity?.id === city.id
                          ? 'border-indigo-400 ring-2 ring-indigo-200 bg-indigo-50/30'
                          : 'border-gray-100 hover:border-indigo-200'
                      }`}
                    >
                      {selectedCity?.id === city.id && (
                        <div className="absolute top-3 right-3 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}

                      <div className="flex items-start gap-3">
                        <div className="bg-indigo-100 text-indigo-600 w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                          <Building2 size={20} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-bold text-gray-900 truncate">{city.name}</h3>
                          {city.latitude && city.longitude ? (
                            <div className="space-y-1 mt-2">
                              <p className="text-xs text-gray-500 flex items-center gap-1">
                                <Navigation size={10} className="text-indigo-400" />
                                Lat: {Number(city.latitude).toFixed(4)}°
                              </p>
                              <p className="text-xs text-gray-500 flex items-center gap-1">
                                <Navigation size={10} className="text-purple-400" />
                                Lng: {Number(city.longitude).toFixed(4)}°
                              </p>
                            </div>
                          ) : (
                            <p className="text-xs text-gray-400 mt-1">Coordonnées non disponibles</p>
                          )}
                          {city.state_code && (
                            <p className="text-xs text-gray-400 mt-1">Code: {city.state_code}</p>
                          )}
                        </div>
                        <ChevronRight size={16} className="text-gray-300 flex-shrink-0 mt-1" />
                      </div>
                    </motion.button>
                  ))}
                </motion.div>
              </AnimatePresence>
            )}

            {/* Vue Liste groupée par lettre */}
            {!isLoading && viewMode === 'list' && (
              <div className="space-y-4">
                {Object.entries(groupedByLetter)
                  .sort(([a], [b]) => a.localeCompare(b))
                  .map(([letter, letterCities]) => (
                    <motion.div
                      key={letter}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                    >
                      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-5 py-3 border-b border-gray-100 flex items-center justify-between">
                        <h3 className="text-lg font-bold text-indigo-600">{letter}</h3>
                        <span className="text-xs text-gray-500">{letterCities.length} ville(s)</span>
                      </div>
                      <div className="divide-y divide-gray-50">
                        {letterCities.map((city) => (
                          <button
                            key={city.id}
                            onClick={() => setSelectedCity(selectedCity?.id === city.id ? null : city)}
                            className={`w-full flex items-center gap-4 px-5 py-3 text-left hover:bg-indigo-50/50 transition ${
                              selectedCity?.id === city.id ? 'bg-indigo-50' : ''
                            }`}
                          >
                            <Building2 size={16} className="text-indigo-500 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-gray-900 truncate">{city.name}</p>
                            </div>
                            {city.latitude && city.longitude && (
                              <span className="text-xs text-gray-400 flex items-center gap-1 flex-shrink-0">
                                <Navigation size={10} />
                                {Number(city.latitude).toFixed(2)}°, {Number(city.longitude).toFixed(2)}°
                              </span>
                            )}
                            {selectedCity?.id === city.id && (
                              <span className="w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
                                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  ))}
              </div>
            )}

            {/* Vue Compacte */}
            {!isLoading && viewMode === 'compact' && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={`compact-${currentPage}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
                >
                  {paginatedCities.map((city, index) => (
                    <motion.button
                      key={city.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.005 }}
                      onClick={() => setSelectedCity(selectedCity?.id === city.id ? null : city)}
                      className={`bg-white rounded-xl shadow-sm border px-4 py-3 text-center transition-all hover:shadow-md hover:-translate-y-1 ${
                        selectedCity?.id === city.id
                          ? 'border-indigo-400 ring-2 ring-indigo-200 bg-indigo-50'
                          : 'border-gray-100 hover:border-indigo-200'
                      }`}
                    >
                      <Building2 size={16} className="text-indigo-400 mx-auto mb-1.5" />
                      <p className="font-medium text-gray-900 text-sm truncate">{city.name}</p>
                      {city.latitude && city.longitude && (
                        <p className="text-xs text-gray-400 mt-1">
                          {Number(city.latitude).toFixed(1)}°, {Number(city.longitude).toFixed(1)}°
                        </p>
                      )}
                    </motion.button>
                  ))}
                </motion.div>
              </AnimatePresence>
            )}

            {/* Aucun résultat */}
            {!isLoading && filteredCities.length === 0 && (
              <div className="text-center py-16">
                <Building2 size={64} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Aucune ville trouvée</h3>
                <p className="text-gray-500 mb-4">
                  {searchTerm ? `Aucun résultat pour "${searchTerm}"` : 'Essayez de modifier votre recherche'}
                </p>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="text-indigo-600 hover:text-indigo-700 font-medium transition"
                  >
                    Effacer la recherche
                  </button>
                )}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 flex-wrap">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="w-10 h-10 rounded-xl transition bg-white text-gray-600 hover:bg-indigo-50 border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-bold"
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
                          ? 'bg-indigo-600 text-white'
                          : 'bg-white text-gray-600 hover:bg-indigo-50 border border-gray-200'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 rounded-xl transition bg-white text-gray-600 hover:bg-indigo-50 border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-bold"
                >
                  →
                </button>
              </div>
            )}

            {/* Export rapide */}
            {!isLoading && filteredCities.length > 0 && (
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    const csv = filteredCities.map((c) => `${c.name},${c.latitude || ''},${c.longitude || ''}`).join('\n');
                    const blob = new Blob([`Nom,Latitude,Longitude\n${csv}`], { type: 'text/csv' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `villes-${stateIso2}.csv`;
                    a.click();
                  }}
                  className="flex items-center gap-2 text-xs text-gray-500 hover:text-indigo-600 transition px-3 py-1.5 bg-gray-50 hover:bg-indigo-50 rounded-xl border border-gray-200"
                >
                  <Download size={14} />
                  Exporter en CSV
                </button>
              </div>
            )}
          </div>

          {/* COLONNE DROITE (1/3) : Détails et Stats */}
          <div className="space-y-5">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="sticky top-24 space-y-5"
            >
              
              {/* Carte Détails de la ville sélectionnée */}
              <AnimatePresence mode="wait">
                {selectedCity ? (
                  <motion.div
                    key="city-details"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white rounded-3xl shadow-xl border border-indigo-100 overflow-hidden"
                  >
                    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 text-white">
                      <div className="flex items-center gap-3 mb-1">
                        <Building2 size={24} />
                        <h3 className="font-bold text-lg">Ville Sélectionnée</h3>
                      </div>
                      <p className="text-indigo-100 text-sm">Détails complets</p>
                    </div>

                    <div className="p-6 space-y-4">
                      <div className="bg-indigo-50 rounded-2xl p-5 border border-indigo-100">
                        <h2 className="text-xl font-bold text-gray-900 mb-1">{selectedCity.name}</h2>
                        {selectedCity.state_code && (
                          <span className="inline-block px-2.5 py-1 bg-white text-indigo-600 rounded-lg text-xs font-medium border border-indigo-200">
                            {selectedCity.state_code}
                          </span>
                        )}
                      </div>

                      {selectedCity.latitude && selectedCity.longitude ? (
                        <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                          <p className="text-xs text-gray-500 mb-3 font-medium flex items-center gap-2">
                            <Navigation size={14} className="text-indigo-500" />
                            Coordonnées GPS
                          </p>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="bg-white rounded-xl p-3 text-center border border-gray-100">
                              <p className="text-xs text-gray-400 mb-1">Latitude</p>
                              <p className="font-mono text-sm font-bold text-indigo-600">
                                {Number(selectedCity.latitude).toFixed(4)}°
                              </p>
                            </div>
                            <div className="bg-white rounded-xl p-3 text-center border border-gray-100">
                              <p className="text-xs text-gray-400 mb-1">Longitude</p>
                              <p className="font-mono text-sm font-bold text-purple-600">
                                {Number(selectedCity.longitude).toFixed(4)}°
                              </p>
                            </div>
                          </div>
                          <div className="mt-3 bg-gray-900 rounded-xl p-3 relative group">
                            <button
                              onClick={() => copyToClipboard(`${selectedCity.latitude}, ${selectedCity.longitude}`, 'coords')}
                              className="absolute top-2 right-2 text-gray-500 hover:text-white transition"
                            >
                              {copiedField === 'coords' ? (
                                <Check size={14} className="text-green-400" />
                              ) : (
                                <Copy size={14} />
                              )}
                            </button>
                            <p className="text-xs text-gray-400 mb-1">Format brut</p>
                            <p className="text-green-400 font-mono text-xs">
                              {selectedCity.latitude}, {selectedCity.longitude}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100 text-center">
                          <Navigation size={24} className="text-amber-400 mx-auto mb-2" />
                          <p className="text-sm text-amber-700">Coordonnées non disponibles pour cette ville</p>
                        </div>
                      )}

                      <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                        <p className="text-xs text-gray-500 mb-1">ID unique</p>
                        <p className="font-mono text-sm font-bold text-gray-900">#{selectedCity.id}</p>
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
                        {state?.name || 'État'} • {country?.name || 'Pays'}
                      </p>
                    </div>

                    <div className="p-6 space-y-4">
                      {/* Contexte */}
                      {country && state && (
                        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-4 border border-indigo-100">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-2xl">{country.emoji}</span>
                            <div>
                              <p className="text-xs text-gray-500">{country.name}</p>
                              <p className="font-bold text-gray-900">{state.name}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span className="px-2 py-0.5 bg-white rounded-lg border border-gray-200">{state.iso2}</span>
                            {state.type && (
                              <span className="px-2 py-0.5 bg-white rounded-lg border border-gray-200">{state.type}</span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Compteurs */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-indigo-50 rounded-2xl p-4 border border-indigo-100 text-center">
                          <p className="text-3xl font-bold text-indigo-600">{cities.length}</p>
                          <p className="text-xs text-gray-500 mt-1">Total Villes</p>
                        </div>
                        <div className="bg-purple-50 rounded-2xl p-4 border border-purple-100 text-center">
                          <p className="text-3xl font-bold text-purple-600">{citiesWithCoords}</p>
                          <p className="text-xs text-gray-500 mt-1">Avec Coord.</p>
                        </div>
                        <div className="bg-violet-50 rounded-2xl p-4 border border-violet-100 text-center">
                          <p className="text-3xl font-bold text-violet-600">{uniqueLetters.length}</p>
                          <p className="text-xs text-gray-500 mt-1">Lettres</p>
                        </div>
                        <div className="bg-fuchsia-50 rounded-2xl p-4 border border-fuchsia-100 text-center">
                          <p className="text-3xl font-bold text-fuchsia-600">{filteredCities.length}</p>
                          <p className="text-xs text-gray-500 mt-1">Affichées</p>
                        </div>
                      </div>

                      {/* Index alphabétique */}
                      <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                        <p className="text-xs text-gray-500 mb-2 font-medium">Index rapide</p>
                        <div className="flex flex-wrap gap-1.5">
                          {uniqueLetters.map((letter) => {
                            const count = cities.filter((c) => c.name.toUpperCase().startsWith(letter)).length;
                            return (
                              <button
                                key={letter}
                                onClick={() => {
                                  setSearchTerm(letter);
                                  setViewMode('list');
                                }}
                                className="w-8 h-8 bg-white hover:bg-indigo-100 border border-gray-200 hover:border-indigo-300 rounded-lg flex items-center justify-center text-xs font-semibold text-gray-600 hover:text-indigo-700 transition relative group"
                                title={`${count} ville(s)`}
                              >
                                {letter}
                                <span className="absolute -top-2 -right-2 bg-indigo-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                                  {count}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Conseil */}
                      <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100">
                        <div className="flex items-start gap-2">
                          <span className="text-lg">💡</span>
                          <p className="text-xs text-amber-700">
                            Cliquez sur une ville pour voir ses détails. Utilisez l'index alphabétique pour naviguer rapidement.
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