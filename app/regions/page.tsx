// app/regions/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ChevronRight, Map, ChevronDown } from 'lucide-react';

import Link from 'next/link';

import { getAllRegions, getSubregionsByRegion, getCountriesBySubregion } from '@/lib/ApiService';

interface Region {
  id: number;
  name: string;
  translations?: string;
  wikiDataId?: string;
  emoji?: string;
}

interface Subregion {
  id: number;
  name: string;
  region_id: number;
}

interface Country {
  id: number;
  name: string;
  iso2: string;
  iso3: string;
  emoji: string;
  capital: string;
  currency: string;
}

export default function RegionsPage() {
  const [regions, setRegions] = useState<Region[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [subregions, setSubregions] = useState<Subregion[]>([]);
  const [selectedSubregion, setSelectedSubregion] = useState<Subregion | null>(null);
  const [subregionCountries, setSubregionCountries] = useState<Country[]>([]);
  const [isLoadingSubregions, setIsLoadingSubregions] = useState(false);
  const [isLoadingCountries, setIsLoadingCountries] = useState(false);

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getAllRegions();
        setRegions(data);
      } catch (err: any) {
        if (err.response?.status === 403) {
          setError('Cette fonctionnalité nécessite un plan Supporter ou supérieur.');
        } else {
          setError('Impossible de charger les régions. Vérifiez votre clé API.');
        }
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRegions();
  }, []);

  const handleRegionClick = async (region: Region) => {
    if (selectedRegion?.id === region.id) {
      setSelectedRegion(null);
      setSubregions([]);
      setSelectedSubregion(null);
      setSubregionCountries([]);
      return;
    }

    setSelectedRegion(region);
    setSelectedSubregion(null);
    setSubregionCountries([]);
    
    try {
      setIsLoadingSubregions(true);
      const data = await getSubregionsByRegion(region.id);
      setSubregions(data);
    } catch (err) {
      console.error('Erreur chargement sous-régions:', err);
      setSubregions([]);
    } finally {
      setIsLoadingSubregions(false);
    }
  };

  const handleSubregionClick = async (subregion: Subregion) => {
    if (selectedSubregion?.id === subregion.id) {
      setSelectedSubregion(null);
      setSubregionCountries([]);
      return;
    }

    setSelectedSubregion(subregion);
    
    try {
      setIsLoadingCountries(true);
      const data = await getCountriesBySubregion(subregion.id);
      setSubregionCountries(data);
    } catch (err) {
      console.error('Erreur chargement pays:', err);
      setSubregionCountries([]);
    } finally {
      setIsLoadingCountries(false);
    }
  };

  const regionColors = [
    { bg: 'from-amber-50 to-orange-50', border: 'border-amber-200', icon: 'bg-amber-100 text-amber-600', hover: 'hover:bg-amber-50' },
    { bg: 'from-red-50 to-rose-50', border: 'border-red-200', icon: 'bg-red-100 text-red-600', hover: 'hover:bg-red-50' },
    { bg: 'from-blue-50 to-cyan-50', border: 'border-blue-200', icon: 'bg-blue-100 text-blue-600', hover: 'hover:bg-blue-50' },
    { bg: 'from-green-50 to-emerald-50', border: 'border-green-200', icon: 'bg-green-100 text-green-600', hover: 'hover:bg-green-50' },
    { bg: 'from-indigo-50 to-violet-50', border: 'border-indigo-200', icon: 'bg-indigo-100 text-indigo-600', hover: 'hover:bg-indigo-50' },
    { bg: 'from-sky-50 to-blue-50', border: 'border-sky-200', icon: 'bg-sky-100 text-sky-600', hover: 'hover:bg-sky-50' },
  ];

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
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Régions du Monde
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl">
            Explorez les régions géographiques, leurs sous-régions et les pays associés
          </p>
        </motion.div>

        {/* Message d'erreur */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Contenu principal */}
        <div className="flex-1 flex flex-col">
          
          {/* Régions principales */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 animate-pulse">
                  <div className="h-14 w-14 bg-gray-200 rounded-xl mb-4" />
                  <div className="h-7 bg-gray-200 rounded w-3/4" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {regions.map((region, index) => {
                const colors = regionColors[index % regionColors.length];
                const isSelected = selectedRegion?.id === region.id;

                return (
                  <motion.button
                    key={region.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08 }}
                    onClick={() => handleRegionClick(region)}
                    className={`relative bg-white rounded-3xl shadow-sm border-2 p-8 text-left transition-all hover:shadow-xl overflow-hidden group ${
                      isSelected ? `${colors.border} shadow-2xl scale-[1.02]` : 'border-gray-100 hover:border-purple-200'
                    }`}
                  >
                    <div className={`absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl ${colors.bg} rounded-bl-[80px] -mr-6 -mt-6 opacity-90`} />
                    
                    <div className="relative">
                      <div className={`${colors.icon} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-inner`}>
                        <Globe size={32} />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-3">{region.name}</h2>
                      <ChevronDown
                        size={24}
                        className={`text-gray-400 transition-transform ${isSelected ? 'rotate-180' : ''}`}
                      />
                    </div>
                  </motion.button>
                );
              })}
            </div>
          )}

          {/* Sous-régions */}
          <AnimatePresence>
            {selectedRegion && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-12"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Map size={26} className="text-purple-600" />
                  Sous-régions de {selectedRegion.name}
                </h3>

                {isLoadingSubregions ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 animate-pulse">
                        <div className="h-5 bg-gray-200 rounded w-2/3" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {subregions.map((subregion) => (
                      <button
                        key={subregion.id}
                        onClick={() => handleSubregionClick(subregion)}
                        className={`bg-white rounded-2xl shadow-sm border p-6 text-left transition-all hover:shadow-md ${
                          selectedSubregion?.id === subregion.id
                            ? 'border-purple-400 ring-2 ring-purple-100'
                            : 'border-gray-100 hover:border-purple-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-gray-900">{subregion.name}</p>
                          <ChevronRight
                            size={20}
                            className={`text-gray-400 transition-transform ${
                              selectedSubregion?.id === subregion.id ? 'rotate-90' : ''
                            }`}
                          />
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pays de la sous-région */}
          <AnimatePresence>
            {selectedSubregion && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Globe size={26} className="text-purple-600" />
                  Pays de {selectedSubregion.name}
                </h3>

                {isLoadingCountries ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                        <div className="h-3 bg-gray-200 rounded w-1/2" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {subregionCountries.map((country) => (
                      <Link
                        key={country.id}
                        href={`/countries/${country.iso2}/states`}
                        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 transition-all hover:shadow-lg hover:border-purple-200 hover:-translate-y-0.5 group"
                      >
                        <div className="flex items-start gap-4">
                          <span className="text-4xl mt-1">{country.emoji}</span>
                          <div>
                            <p className="font-semibold text-lg text-gray-900 group-hover:text-purple-700 transition">
                              {country.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {country.capital} • {country.currency}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}