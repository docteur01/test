// components/LocationDisplay.tsx
'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, CheckCircle2 } from 'lucide-react';

interface Country {
  id: number;
  name: string;
  iso2: string;
  emoji: string;
  capital: string;
  currency: string;
  phonecode: string;
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

interface LocationDisplayProps {
  country: Country | null;
  state: State | null;
  city: City | null;
}

export default function LocationDisplay({ country, state, city }: LocationDisplayProps) {
  const isComplete = country && state && city;

  return (
    <AnimatePresence mode="wait">
      {isComplete ? (
        <motion.div
          key="complete"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-green-500 text-white w-10 h-10 rounded-xl flex items-center justify-center">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <h3 className="font-bold text-green-800 text-lg">Localisation sélectionnée</h3>
              <p className="text-green-600 text-sm">Prête pour votre cas médical</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 bg-white/70 rounded-xl p-4">
              <span className="text-3xl">{country.emoji}</span>
              <div>
                <p className="font-semibold text-gray-900">{country.name}</p>
                <p className="text-sm text-gray-500">
                  Capitale : {country.capital} • Devise : {country.currency} • Indicatif : +{country.phonecode}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-gray-600 px-2">
              <MapPin size={16} className="text-green-500" />
              <span className="text-sm font-medium">{state.name}, {country.iso2}</span>
              <span className="text-gray-400">→</span>
              <span className="text-sm font-medium text-indigo-600">{city.name}</span>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="incomplete"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="bg-gray-50 border border-dashed border-gray-300 rounded-2xl p-6 text-center"
        >
          <MapPin size={40} className="mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500">
            {!country
              ? 'Commencez par sélectionner un pays'
              : !state
              ? 'Sélectionnez maintenant un état/région'
              : 'Choisissez une ville pour compléter'}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}