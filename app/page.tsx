// app/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Globe,
  MapPinned,
  Building2,
  Sparkles, ChevronRight,
  Database,
} from 'lucide-react';

import { motion } from 'framer-motion';

export default function HomePage() {
  return (
    <main className="w-full min-h-screen bg-white overflow-hidden">
      {/* HERO */}
      <section className="relative w-full min-h-screen flex items-center px-6 md:px-12 lg:px-20 py-5">
        {/* Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[-200px] right-[-150px] w-[500px] h-[500px] bg-blue-200 rounded-full blur-3xl opacity-30" />

          <div className="absolute bottom-[-200px] left-[-150px] w-[500px] h-[500px] bg-indigo-200 rounded-full blur-3xl opacity-30" />
        </div>

        <div className="relative z-10 w-full grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT CONTENT */}
          <div className="w-full">
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <Sparkles size={16} />
              Géographique Mondiale
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-8"
            >
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Country State City
              </span>

              <br />

              <span className="text-gray-900">
                Gérez les données géographiques facilement
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mb-10"
            >
              Accédez à plus de <strong>247 pays</strong>,
              <strong> 5000+ régions</strong> et
              <strong> 151,000+ villes</strong> avec une interface moderne,
              rapide et optimisée pour vous.
            </motion.p>

            {/* BUTTONS - Version mise à jour */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-6"
            >
              <Link href="/geo-test">
                <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg shadow-blue-200 transition">
                  Commencer
                  <ArrowRight size={20} />
                </button>
              </Link>

              <Link href="/documentation">
                <button className="w-full sm:w-auto border border-gray-300 hover:border-blue-300 hover:bg-blue-50 px-8 py-4 rounded-2xl font-semibold text-lg transition">
                  Documentation
                </button>
              </Link>
            </motion.div>

            {/* STATS */}
            <div className="grid grid-cols-3 gap-6 mt-16">
              {[
                {
                  value: '247+',
                  label: 'Pays',
                },
                {
                  value: '5000+',
                  label: 'Régions',
                },
                {
                  value: '151K+',
                  label: 'Villes',
                },
              ].map((item, index) => (
                <div key={index}>
                  <h3 className="text-3xl md:text-4xl font-bold text-blue-600">
                    {item.value}
                  </h3>

                  <p className="text-gray-600 mt-1">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="w-full"
          >
            <div className="bg-white border border-gray-200 rounded-[32px] shadow-2xl p-8 lg:p-10">
              
            <div className="space-y-6">
              {/* CARD */}
              <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-blue-600 text-white w-12 h-12 rounded-xl flex items-center justify-center">
                    <Globe size={24} />
                  </div>

                  <div>
                    <h3 className="font-bold text-lg">
                      Une expérience mondiale
                    </h3>

                    <p className="text-gray-600 text-sm">
                      Permettez à vos utilisateurs de sélectionner facilement leur pays,
                      région ou ville partout dans le monde.
                    </p>
                  </div>
                </div>

                <div className="h-3 bg-blue-200 rounded-full overflow-hidden">
                  <div className="w-[90%] h-full bg-blue-600 rounded-full" />
                </div>
              </div>

              {/* CARD */}
              <div className="bg-indigo-50 rounded-2xl p-6 border border-indigo-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-indigo-600 text-white w-12 h-12 rounded-xl flex items-center justify-center">
                    <MapPinned size={24} />
                  </div>

                  <div>
                    <h3 className="font-bold text-lg">
                      Des formulaires plus intelligents
                    </h3>

                    <p className="text-gray-600 text-sm">
                      Réduisez les erreurs de saisie et améliorez l’expérience utilisateur
                      avec des localisations précises et organisées.
                    </p>
                  </div>
                </div>

                <div className="h-3 bg-indigo-200 rounded-full overflow-hidden">
                  <div className="w-[95%] h-full bg-indigo-600 rounded-full" />
                </div>
              </div>

              {/* CARD */}
              <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-green-600 text-white w-12 h-12 rounded-xl flex items-center justify-center">
                    <Database size={24} />
                  </div>

                  <div>
                    <h3 className="font-bold text-lg">
                      Un gain de temps énorme
                    </h3>

                    <p className="text-gray-600 text-sm">
                      Évitez de créer et maintenir vous-même des listes de pays, régions et
                      villes déjà prêtes à être utilisées.
                    </p>
                  </div>
                </div>

                <div className="h-3 bg-green-200 rounded-full overflow-hidden">
                  <div className="w-[98%] h-full bg-green-600 rounded-full" />
                </div>
              </div>
            </div>

            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}