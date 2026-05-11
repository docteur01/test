// app/countries/page.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Globe, Search, MapPin, Phone, Coins } from 'lucide-react';

import Link from 'next/link';

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

export default function CountriesPage() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 24;

  // Charger tous les pays
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

  // Filtrer les pays
  useEffect(() => {
    if (searchTerm.length >= 2) {
      const filtered = countries.filter((country) =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.native?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.iso2.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.capital?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCountries(filtered);
      setCurrentPage(1);
    } else {
      setFilteredCountries(countries);
    }
  }, [searchTerm, countries]);

  const totalPages = Math.ceil(filteredCountries.length / itemsPerPage);
  const paginatedCountries = filteredCountries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <main className="w-full min-h-screen bg-white overflow-hidden">
      {/* Background décoratif */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-200px] right-[-150px] w-[600px] h-[600px] bg-blue-200 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-[-250px] left-[-150px] w-[650px] h-[650px] bg-indigo-200 rounded-full blur-3xl opacity-25" />
      </div>

      <div className="relative z-10 w-full min-h-screen flex flex-col px-6 md:px-12 lg:px-20 py-8 md:py-12">
        
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 transition"
          >
            <ArrowLeft size={18} />
            <span className="text-sm font-medium">Retour à l'accueil</span>
          </Link>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Explorer les Pays
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl">
            Découvrez les {countries.length}+ pays disponibles avec leurs informations détaillées
          </p>
        </motion.div>

        {/* Barre de recherche et statistiques */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
            <div className="flex-1 relative max-w-xl">
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher un pays par nom, code ISO, capitale..."
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition"
              />
            </div>

            <div className="flex items-center gap-4">
              <div className="text-center px-5 py-3 bg-blue-50 rounded-xl">
                <p className="text-2xl font-bold text-blue-600">{countries.length}</p>
                <p className="text-xs text-gray-600">Pays</p>
              </div>
              <div className="text-center px-5 py-3 bg-indigo-50 rounded-xl">
                <p className="text-2xl font-bold text-indigo-600">{filteredCountries.length}</p>
                <p className="text-xs text-gray-600">Affichés</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Message d'erreur */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Contenu principal (flex-1 pour prendre tout l'espace restant) */}
        <div className="flex-1 flex flex-col">
          {/* Grille des pays */}
          <AnimatePresence mode="wait">
            {!isLoading && (
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 flex-1"
              >
                {paginatedCountries.map((country, index) => (
                  <Link key={country.id} href={`/countries/${country.iso2}`}
                    className={`bg-white rounded-2xl shadow-sm border p-6 text-left transition-all hover:shadow-md hover:-translate-y-1 ${
                      selectedCountry?.id === country.id
                        ? 'border-blue-400 ring-2 ring-blue-200 shadow-lg'
                        : 'border-gray-100'
                    }`}                  
                  >
                    <motion.button
                      key={country.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.02 }}
                      onClick={() => setSelectedCountry(selectedCountry?.id === country.id ? null : country)}

                    >
                      {/* ... reste du contenu de la carte inchangé ... */}
                      <div className="flex items-start justify-between mb-4">
                        <span className="text-4xl">{country.emoji}</span>
                      </div>
                      <h3 className="font-bold text-lg text-gray-900 mb-2 truncate">
                        {country.name}
                      </h3>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-600 flex items-center gap-2">
                          <MapPin size={14} className="text-blue-500 flex-shrink-0" />
                          <span className="truncate">{country.capital}</span>
                        </p>
                        <p className="text-sm text-gray-600 flex items-center gap-2">
                          <Coins size={14} className="text-green-500 flex-shrink-0" />
                          <span>{country.currency}</span>
                        </p>
                        <p className="text-sm text-gray-600 flex items-center gap-2">
                          <Phone size={14} className="text-indigo-500 flex-shrink-0" />
                          <span>+{country.phonecode}</span>
                        </p>
                      </div>
                    </motion.button>
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-10">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-10 h-10 rounded-xl font-semibold transition ${
                  currentPage === i + 1
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-blue-50 border border-gray-200'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}