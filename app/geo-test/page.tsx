// app/geo-test/page.tsx
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ArrowLeft, CheckCircle2, Globe, MapPinned, Building2, ChevronRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import CountrySelect from '@/components/CountrySelect';
import StateSelect from '@/components/StateSelect';
import CitySelect from '@/components/CitySelect';

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

interface State {
  id: number;
  name: string;
  iso2: string;
}

interface City {
  id: number;
  name: string;
}

export default function GeoTestPage() {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedState, setSelectedState] = useState<State | null>(null);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  const handleCountryChange = (country: Country | null) => {
    setSelectedCountry(country);
    setSelectedState(null);
    setSelectedCity(null);
  };

  const handleStateChange = (state: State | null) => {
    setSelectedState(state);
    setSelectedCity(null);
  };

  const handleCityChange = (city: City | null) => {
    setSelectedCity(city);
  };

  const progress = selectedCountry ? (selectedState ? (selectedCity ? 3 : 2) : 1) : 0;
  const isComplete = progress === 3;

  return (
    <main className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Background décoratif */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-300px] right-[-200px] w-[700px] h-[700px] bg-blue-100 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-[-300px] left-[-200px] w-[700px] h-[700px] bg-indigo-100 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="relative z-10 w-full min-h-screen flex flex-col px-6 md:px-10 lg:px-16 py-8 md:py-10">
        
        {/* En-tête compact */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200">
              <MapPin size={24} />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Sélecteur Géographique
              </h1>
              <p className="text-gray-500 text-sm">Sélectionnez un pays, un état et une ville</p>
            </div>
          </div>
        </motion.div>

        {/* Layout 2 colonnes */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
          
          {/* COLONNE GAUCHE : Sélecteurs en cascade */}
          <div className="space-y-5">
            
            {/* Indicateur de progression */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4"
            >
              <div className="flex items-center gap-4">
                {/* Étapes */}
                {[
                  { step: 1, label: 'Pays', icon: Globe, done: progress >= 1, active: progress === 0 },
                  { step: 2, label: 'État', icon: MapPinned, done: progress >= 2, active: progress === 1 },
                  { step: 3, label: 'Ville', icon: Building2, done: progress >= 3, active: progress === 2 },
                ].map((item, index) => (
                  <React.Fragment key={item.step}>
                    {index > 0 && (
                      <div className={`flex-1 h-0.5 rounded-full transition-colors duration-500 ${
                        progress > index ? 'bg-green-400' : 'bg-gray-200'
                      }`} />
                    )}
                    <div className="flex flex-col items-center gap-1">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        item.done
                          ? 'bg-green-100 text-green-600'
                          : item.active
                          ? 'bg-blue-100 text-blue-600 ring-2 ring-blue-200'
                          : 'bg-gray-100 text-gray-400'
                      }`}>
                        {item.done ? <CheckCircle2 size={20} /> : <item.icon size={20} />}
                      </div>
                      <span className={`text-xs font-medium ${
                        item.done ? 'text-green-600' : item.active ? 'text-blue-600' : 'text-gray-400'
                      }`}>
                        {item.label}
                      </span>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </motion.div>

            {/* Étape 1 : Pays */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className={`relative bg-white rounded-2xl shadow-sm border p-6 transition-all duration-300 ${
                progress >= 1 ? 'border-green-200 bg-green-50/30' : 'border-gray-100'
              }`}
            >
              {progress >= 1 && (
                <div className="absolute top-3 right-3">
                  <CheckCircle2 size={20} className="text-green-500" />
                </div>
              )}
              <div className="flex items-center gap-3 mb-4">
                <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                  progress >= 1 ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
                }`}>
                  1
                </span>
                <h2 className="font-semibold text-gray-900">Pays</h2>
              </div>
              <CountrySelect
                onCountryChange={handleCountryChange}
                selectedCountry={selectedCountry}
              />
            </motion.div>

            {/* Étape 2 : État */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className={`relative bg-white rounded-2xl shadow-sm border p-6 transition-all duration-500 ${
                !selectedCountry ? 'opacity-50 pointer-events-none' :
                progress >= 2 ? 'border-green-200 bg-green-50/30' : 'border-gray-100'
              }`}
            >
              {progress >= 2 && (
                <div className="absolute top-3 right-3">
                  <CheckCircle2 size={20} className="text-green-500" />
                </div>
              )}
              <div className="flex items-center gap-3 mb-4">
                <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                  !selectedCountry ? 'bg-gray-300 text-white' :
                  progress >= 2 ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
                }`}>
                  2
                </span>
                <h2 className="font-semibold text-gray-900">État / Région</h2>
                {!selectedCountry && (
                  <span className="text-xs text-gray-400 ml-auto">Sélectionnez d'abord un pays</span>
                )}
              </div>
              <StateSelect
                countryIso2={selectedCountry?.iso2 || null}
                onStateChange={handleStateChange}
                selectedState={selectedState}
              />
            </motion.div>

            {/* Étape 3 : Ville */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 }}
              className={`relative bg-white rounded-2xl shadow-sm border p-6 transition-all duration-500 ${
                !selectedState ? 'opacity-50 pointer-events-none' :
                progress >= 3 ? 'border-green-200 bg-green-50/30' : 'border-gray-100'
              }`}
            >
              {progress >= 3 && (
                <div className="absolute top-3 right-3">
                  <CheckCircle2 size={20} className="text-green-500" />
                </div>
              )}
              <div className="flex items-center gap-3 mb-4">
                <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                  !selectedState ? 'bg-gray-300 text-white' :
                  progress >= 3 ? 'bg-green-500 text-white' : 'bg-indigo-500 text-white'
                }`}>
                  3
                </span>
                <h2 className="font-semibold text-gray-900">Ville</h2>
                {!selectedState && (
                  <span className="text-xs text-gray-400 ml-auto">Sélectionnez d'abord un état</span>
                )}
              </div>
              <CitySelect
                countryIso2={selectedCountry?.iso2 || null}
                stateIso2={selectedState?.iso2 || null}
                onCityChange={handleCityChange}
                selectedCity={selectedCity}
              />
            </motion.div>
          </div>

          {/* COLONNE DROITE : Récapitulatif et Informations */}
          <div className="space-y-5">
            
            {/* Carte Récapitulative */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="sticky top-8"
            >
              <AnimatePresence mode="wait">
                {isComplete && selectedCountry && selectedState && selectedCity ? (
                  /* ÉTAT COMPLET */
                  <motion.div
                    key="complete"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white rounded-3xl shadow-xl border border-green-100 overflow-hidden"
                  >
                    {/* En-tête succès */}
                    <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 text-white">
                      <div className="flex items-center gap-3 mb-2">
                        <Sparkles size={24} />
                        <h3 className="font-bold text-lg">Localisation Complète</h3>
                      </div>
                      <p className="text-green-100 text-sm">Votre sélection est prête</p>
                    </div>

                    <div className="p-6 space-y-4">
                      {/* Pays */}
                      <div className="bg-blue-50/50 rounded-2xl p-4 border border-blue-100">
                        <div className="flex items-center gap-3">
                          <span className="text-4xl">{selectedCountry.emoji}</span>
                          <div>
                            <p className="text-xs text-blue-500 font-medium uppercase tracking-wide">Pays</p>
                            <p className="font-bold text-gray-900 text-lg">{selectedCountry.name}</p>
                            <p className="text-sm text-gray-500">
                              {selectedCountry.capital} • {selectedCountry.currency}
                            </p>
                          </div>
                        </div>
                        <div className="mt-3 grid grid-cols-2 gap-2">
                          <div className="bg-white rounded-xl p-2.5 text-center">
                            <p className="text-xs text-gray-500">Indicatif</p>
                            <p className="font-semibold text-blue-600">+{selectedCountry.phonecode}</p>
                          </div>
                          <div className="bg-white rounded-xl p-2.5 text-center">
                            <p className="text-xs text-gray-500">Code ISO</p>
                            <p className="font-semibold text-blue-600">{selectedCountry.iso2}</p>
                          </div>
                        </div>
                      </div>

                      {/* Flèche */}
                      <div className="flex justify-center">
                        <ChevronRight size={24} className="text-gray-300 rotate-90" />
                      </div>

                      {/* État */}
                      <div className="bg-green-50/50 rounded-2xl p-4 border border-green-100">
                        <div className="flex items-center gap-3">
                          <div className="bg-green-100 text-green-600 w-10 h-10 rounded-xl flex items-center justify-center">
                            <MapPinned size={20} />
                          </div>
                          <div>
                            <p className="text-xs text-green-500 font-medium uppercase tracking-wide">État / Région</p>
                            <p className="font-bold text-gray-900">{selectedState.name}</p>
                            <p className="text-sm text-gray-500">Code: {selectedState.iso2}</p>
                          </div>
                        </div>
                      </div>

                      {/* Flèche */}
                      <div className="flex justify-center">
                        <ChevronRight size={24} className="text-gray-300 rotate-90" />
                      </div>

                      {/* Ville */}
                      <div className="bg-indigo-50/50 rounded-2xl p-4 border border-indigo-100">
                        <div className="flex items-center gap-3">
                          <div className="bg-indigo-100 text-indigo-600 w-10 h-10 rounded-xl flex items-center justify-center">
                            <Building2 size={20} />
                          </div>
                          <div>
                            <p className="text-xs text-indigo-500 font-medium uppercase tracking-wide">Ville</p>
                            <p className="font-bold text-gray-900">{selectedCity.name}</p>
                          </div>
                        </div>
                      </div>

                      {/* Résumé final */}
                      <div className="bg-gray-900 rounded-2xl p-4 text-white">
                        <p className="text-xs text-gray-400 mb-1">Chemin complet</p>
                        <p className="font-mono text-sm">
                          {selectedCountry.name} → {selectedState.name} → {selectedCity.name}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  /* ÉTAT INCOMPLET - Guide */
                  <motion.div
                    key="incomplete"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
                  >
                    <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-6 text-white">
                      <div className="flex items-center gap-3 mb-2">
                        <MapPin size={24} />
                        <h3 className="font-bold text-lg">Récapitulatif</h3>
                      </div>
                      <p className="text-blue-100 text-sm">
                        {progress === 0
                          ? 'Commencez par sélectionner un pays'
                          : progress === 1
                          ? 'Choisissez maintenant un état'
                          : 'Sélectionnez une ville pour terminer'}
                      </p>
                    </div>

                    <div className="p-6 space-y-4">
                      {/* Étape 1 */}
                      <div className={`rounded-2xl p-4 border-2 transition-all duration-300 ${
                        progress === 0
                          ? 'border-blue-300 bg-blue-50 ring-2 ring-blue-100'
                          : progress >= 1
                          ? 'border-green-200 bg-green-50/30'
                          : 'border-gray-100 bg-gray-50/50'
                      }`}>
                        <div className="flex items-center gap-3">
                          {progress >= 1 ? (
                            <CheckCircle2 size={24} className="text-green-500" />
                          ) : (
                            <Globe size={24} className={progress === 0 ? 'text-blue-500' : 'text-gray-300'} />
                          )}
                          <div>
                            <p className="font-semibold text-gray-900">
                              {selectedCountry ? selectedCountry.name : 'Pays'}
                            </p>
                            <p className="text-xs text-gray-500">
                              {selectedCountry ? `${selectedCountry.capital} • ${selectedCountry.currency}` : 'Non sélectionné'}
                            </p>
                          </div>
                          {selectedCountry && (
                            <span className="ml-auto text-3xl">{selectedCountry.emoji}</span>
                          )}
                        </div>
                      </div>

                      {/* Flèche */}
                      <div className="flex justify-center">
                        <ChevronRight size={20} className={`rotate-90 transition-colors ${progress >= 1 ? 'text-green-400' : 'text-gray-300'}`} />
                      </div>

                      {/* Étape 2 */}
                      <div className={`rounded-2xl p-4 border-2 transition-all duration-300 ${
                        progress === 1
                          ? 'border-blue-300 bg-blue-50 ring-2 ring-blue-100'
                          : progress >= 2
                          ? 'border-green-200 bg-green-50/30'
                          : 'border-gray-100 bg-gray-50/50'
                      }`}>
                        <div className="flex items-center gap-3">
                          {progress >= 2 ? (
                            <CheckCircle2 size={24} className="text-green-500" />
                          ) : (
                            <MapPinned size={24} className={progress === 1 ? 'text-blue-500' : 'text-gray-300'} />
                          )}
                          <div>
                            <p className="font-semibold text-gray-900">
                              {selectedState ? selectedState.name : 'État / Région'}
                            </p>
                            <p className="text-xs text-gray-500">
                              {selectedState ? `Code: ${selectedState.iso2}` : 'En attente...'}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Flèche */}
                      <div className="flex justify-center">
                        <ChevronRight size={20} className={`rotate-90 transition-colors ${progress >= 2 ? 'text-green-400' : 'text-gray-300'}`} />
                      </div>

                      {/* Étape 3 */}
                      <div className={`rounded-2xl p-4 border-2 transition-all duration-300 ${
                        progress === 2
                          ? 'border-blue-300 bg-blue-50 ring-2 ring-blue-100'
                          : 'border-gray-100 bg-gray-50/50'
                      }`}>
                        <div className="flex items-center gap-3">
                          <Building2 size={24} className={progress === 2 ? 'text-blue-500' : 'text-gray-300'} />
                          <div>
                            <p className="font-semibold text-gray-900">
                              {selectedCity ? selectedCity.name : 'Ville'}
                            </p>
                            <p className="text-xs text-gray-500">
                              {selectedCity ? 'Sélectionnée' : 'En attente...'}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Message d'aide */}
                      <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100">
                        <div className="flex items-start gap-3">
                          <span className="text-2xl">💡</span>
                          <div>
                            <p className="text-sm font-medium text-amber-800">Conseil</p>
                            <p className="text-xs text-amber-700 mt-0.5">
                              {progress === 0
                                ? 'Utilisez la barre de recherche pour trouver rapidement un pays.'
                                : progress === 1
                                ? 'Les états disponibles dépendent du pays choisi.'
                                : 'Plus que la ville à sélectionner !'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Compteur rapide */}
            {!isComplete && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">Progression</p>
                  <span className="text-sm font-bold text-blue-600">{progress}/3 étapes</span>
                </div>
                <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(progress / 3) * 100}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}