// app/countries/[iso2]/cities/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ArrowLeft,
  Building2,
  Search,
  MapPin,
  Globe,
  ChevronRight,
  Navigation,
} from 'lucide-react';
import { getCitiesByCountry, getCountryDetails } from '@/lib/ApiService';

interface City {
  id: number;
  name: string;
  latitude?: string;
  longitude?: string;
  country_code?: string;
  state_code?: string;
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

export default function CitiesByCountryPage() {
  const params = useParams();
  const countryIso2 = params?.iso2 as string;

  const [cities, setCities] = useState<City[]>([]);
  const [filteredCities, setFilteredCities] = useState<City[]>([]);
  const [country, setCountry] = useState<Country | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<'name' | 'none'>('name');
  const itemsPerPage = 30;

  useEffect(() => {
    if (!countryIso2) return;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const [countryData, citiesData] = await Promise.all([
          getCountryDetails(countryIso2),
          getCitiesByCountry(countryIso2),
        ]);
        setCountry(countryData as Country);
        setCities(citiesData);
        
        // Trier par nom
        const sorted = [...citiesData].sort((a, b) => a.name.localeCompare(b.name));
        setFilteredCities(sorted);
      } catch (err) {
        setError('Impossible de charger les villes. Vérifiez votre clé API.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [countryIso2]);

  useEffect(() => {
    let filtered = cities;

    if (searchTerm.length >= 2) {
      filtered = filtered.filter((city) =>
        city.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortOrder === 'name') {
      filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredCities(filtered);
    setCurrentPage(1);
  }, [searchTerm, sortOrder, cities]);

  const totalPages = Math.ceil(filteredCities.length / itemsPerPage);
  const paginatedCities = filteredCities.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Grouper par première lettre
  const groupedCities = paginatedCities.reduce((acc, city) => {
    const letter = city.name.charAt(0).toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(city);
    return acc;
  }, {} as Record<string, City[]>);

  return (
    <main className="w-full min-h-screen bg-white overflow-hidden">
      {/* Background décoratif */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-200px] right-[-150px] w-[600px] h-[600px] bg-purple-200 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-[-250px] left-[-150px] w-[650px] h-[650px] bg-pink-200 rounded-full blur-3xl opacity-25" />
      </div>

      <div className="relative z-10 w-full min-h-screen flex flex-col px-6 md:px-12 lg:px-20 py-8 md:py-12">
        
        {/* Fil d'Ariane 
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-sky-600 hover:text-sky-700 transition">
              Accueil
            </Link>
            <ChevronRight size={14} className="text-gray-400" />
            <Link href="/countries" className="text-sky-600 hover:text-sky-700 transition">
              Pays
            </Link>
            <ChevronRight size={14} className="text-gray-400" />
            <Link href={`/countries/${countryIso2}`} className="text-sky-600 hover:text-sky-700 transition">
              {country?.name || countryIso2}
            </Link>
            <ChevronRight size={14} className="text-gray-400" />
            <span className="text-gray-600">Villes</span>
          </div>
        </motion.div>*/}

        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          {country && (
            <div className="flex items-center gap-4 mb-4">
              <span className="text-5xl">{country.emoji}</span>
              <div>
                <p className="text-sm text-gray-500">Toutes les villes de</p>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900">
                  {country.name}
                </h1>
              </div>
            </div>
          )}
          <p className="text-lg md:text-xl text-gray-600">
            {cities.length.toLocaleString()}+ villes répertoriées
          </p>
        </motion.div>

        {/* Barre de recherche et contrôles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex-1 relative max-w-xl">
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={`Rechercher une ville en ${country?.name || '...'}...`}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400 transition"
              />
            </div>
            <div className="flex items-center gap-4">
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as 'name' | 'none')}
                className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-200 text-gray-700"
              >
                <option value="name">Trier par nom</option>
                <option value="none">Ordre original</option>
              </select>
              <div className="flex items-center gap-4">
                <div className="text-center px-4 py-2 bg-sky-50 rounded-xl">
                  <p className="text-2xl font-bold text-sky-600">{cities.length.toLocaleString()}</p>
                  <p className="text-xs text-gray-600">Total</p>
                </div>
                <div className="text-center px-4 py-2 bg-blue-50 rounded-xl">
                  <p className="text-2xl font-bold text-blue-600">{filteredCities.length.toLocaleString()}</p>
                  <p className="text-xs text-gray-600">Affichées</p>
                </div>
              </div>
            </div>
          </div>

          {/* Index rapide */}
          {sortOrder === 'name' && !searchTerm && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {Object.keys(groupedCities).sort().map((letter) => (
                <a
                  key={letter}
                  href={`#letter-${letter}`}
                  className="w-8 h-8 bg-gray-50 hover:bg-sky-100 border border-gray-200 hover:border-sky-300 rounded-lg flex items-center justify-center text-xs font-semibold text-gray-600 hover:text-sky-700 transition"
                >
                  {letter}
                </a>
              ))}
            </div>
          )}
        </motion.div>

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

        {/* Liste groupée par lettre */}
        {!isLoading && sortOrder === 'name' && !searchTerm && (
          <div className="space-y-8 mb-8">
            {Object.entries(groupedCities)
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([letter, letterCities]) => (
                <motion.div
                  key={letter}
                  id={`letter-${letter}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h3 className="text-2xl font-bold text-sky-600 mb-4 pl-2 border-l-4 border-sky-500">
                    {letter}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {letterCities.map((city, index) => (
                      <motion.div
                        key={city.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.01 }}
                        className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 transition-all hover:shadow-md hover:border-sky-200 hover:-translate-y-0.5"
                      >
                        <div className="flex items-start gap-3">
                          <div className="bg-sky-100 text-sky-600 w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Building2 size={16} />
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-gray-900 truncate">{city.name}</p>
                            {city.latitude && city.longitude && (
                              <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                                <Navigation size={10} />
                                {Number(city.latitude).toFixed(2)}, {Number(city.longitude).toFixed(2)}
                              </p>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
          </div>
        )}

        {/* Liste simple pour recherche */}
        {!isLoading && (sortOrder !== 'name' || searchTerm) && (
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mb-8"
          >
            {paginatedCities.map((city, index) => (
              <motion.div
                key={city.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.01 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 transition-all hover:shadow-md hover:-translate-y-1 hover:border-sky-200"
              >
                <div className="flex items-start gap-3 mb-2">
                  <div className="bg-sky-100 text-sky-600 w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Building2 size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{city.name}</h3>
                    {city.state_code && (
                      <p className="text-xs text-gray-500">{city.state_code}</p>
                    )}
                  </div>
                </div>
                {city.latitude && city.longitude && (
                  <div className="flex items-center gap-1 text-xs text-gray-400 mt-2 pt-2 border-t border-gray-100">
                    <Navigation size={12} />
                    {Number(city.latitude).toFixed(4)}, {Number(city.longitude).toFixed(4)}
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="w-10 h-10 rounded-xl font-semibold transition bg-white text-gray-600 hover:bg-sky-50 border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ←
            </button>
            {[...Array(Math.min(totalPages, 10))].map((_, i) => {
              let pageNum = i + 1;
              if (totalPages > 10 && currentPage > 5) {
                pageNum = currentPage - 4 + i;
                if (pageNum > totalPages) pageNum = totalPages - 9 + i;
              }
              if (pageNum > totalPages) return null;
              
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-10 h-10 rounded-xl font-semibold transition ${
                    currentPage === pageNum
                      ? 'bg-sky-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-sky-50 border border-gray-200'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="w-10 h-10 rounded-xl font-semibold transition bg-white text-gray-600 hover:bg-sky-50 border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              →
            </button>
          </div>
        )}
      </div>
    </main>
  );
}