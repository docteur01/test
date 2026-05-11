// app/countries/[iso2]/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ArrowLeft,
  Globe,
  MapPin,
  Phone,
  Coins,
  MapPinned,
  Building2,
  Clock,
  Languages,
  Hash,
  ChevronRight,
  ExternalLink,
  Users,
  Navigation,
  Sparkles,
  Copy,
  Check,
  Flag,
  Calendar,
  Layers,
} from 'lucide-react';
import { getCountryDetails } from '@/lib/ApiService';

interface Timezone {
  zoneName: string;
  gmtOffset: number;
  gmtOffsetName: string;
  abbreviation: string;
  tzName: string;
}

interface CountryDetails {
  id: number;
  name: string;
  iso2: string;
  iso3: string;
  numeric_code: string;
  phonecode: string;
  capital: string;
  currency: string;
  currency_name: string;
  currency_symbol: string;
  tld: string;
  native: string;
  region: string;
  region_id: number;
  subregion: string;
  subregion_id: number;
  nationality: string;
  timezones: string;
  translations: string;
  latitude: string;
  longitude: string;
  emoji: string;
  emojiU: string;
}

export default function CountryDetailsPage() {
  const params = useParams();
  const countryIso2 = params?.iso2 as string;

  const [country, setCountry] = useState<CountryDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'timezones' | 'translations'>('overview');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    if (!countryIso2) return;

    const fetchCountryDetails = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getCountryDetails(countryIso2);
        setCountry(data as CountryDetails);
      } catch (err) {
        setError('Impossible de charger les détails du pays.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountryDetails();
  }, [countryIso2]);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  if (isLoading) {
    return (
      <main className="w-full min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full mx-auto mb-6"
          />
          <p className="text-gray-600 text-lg">Chargement des détails...</p>
        </div>
      </main>
    );
  }

  if (error || !country) {
    return (
      <main className="w-full min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-6">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-3xl p-8 max-w-md mx-auto">
            <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">⚠️</span>
            </div>
            <p className="text-red-600 text-lg font-semibold mb-4">{error || 'Pays non trouvé'}</p>
            <Link
              href="/countries"
              className="inline-flex items-center gap-2 bg-white text-blue-600 hover:text-blue-700 px-6 py-3 rounded-xl font-medium transition border border-gray-200"
            >
              <ArrowLeft size={18} />
              Retour à la liste des pays
            </Link>
          </div>
        </div>
      </main>
    );
  }

  let timezones: Timezone[] = [];
  let translations: Record<string, string> = {};

  try {
    timezones = JSON.parse(country.timezones || '[]');
  } catch (e) {}

  try {
    translations = JSON.parse(country.translations || '{}');
  } catch (e) {}

  const infoCards = [
    { icon: MapPin, label: 'Capitale', value: country.capital, color: 'text-red-500', bg: 'bg-red-50', border: 'border-red-100' },
    { icon: Coins, label: 'Devise', value: `${country.currency} (${country.currency_symbol})`, subvalue: country.currency_name, color: 'text-yellow-500', bg: 'bg-yellow-50', border: 'border-yellow-100' },
    { icon: Phone, label: 'Indicatif', value: `+${country.phonecode}`, color: 'text-green-500', bg: 'bg-green-50', border: 'border-green-100' },
    { icon: Hash, label: 'Code Numérique', value: country.numeric_code, color: 'text-purple-500', bg: 'bg-purple-50', border: 'border-purple-100' },
    { icon: ExternalLink, label: 'Domaine', value: country.tld, color: 'text-indigo-500', bg: 'bg-indigo-50', border: 'border-indigo-100' },
    { icon: Users, label: 'Nationalité', value: country.nationality, color: 'text-orange-500', bg: 'bg-orange-50', border: 'border-orange-100' },
  ];

  const tabs = [
    { id: 'overview' as const, label: 'Aperçu', icon: Globe },
    { id: 'timezones' as const, label: 'Fuseaux Horaires', icon: Clock, count: timezones.length },
    { id: 'translations' as const, label: 'Traductions', icon: Languages, count: Object.keys(translations).length },
  ];

  return (
    <main className="w-full min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Background décoratif */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-300px] right-[-200px] w-[800px] h-[800px] bg-blue-100 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-[-300px] left-[-200px] w-[800px] h-[800px] bg-indigo-100 rounded-full blur-3xl opacity-25" />
      </div>

      <div className="relative z-10 w-full min-h-screen flex flex-col px-6 md:px-10 lg:px-16 py-8 md:py-10">
        
        {/* Fil d'Ariane 
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4"
        >
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-blue-600 hover:text-blue-700 transition font-medium">
              Accueil
            </Link>
            <ChevronRight size={14} className="text-gray-400" />
            <Link href="/countries" className="text-blue-600 hover:text-blue-700 transition font-medium">
              Pays
            </Link>
            <ChevronRight size={14} className="text-gray-400" />
            <span className="text-gray-600">{country.name}</span>
          </div>
        </motion.div>*/}

        {/* Layout 2 colonnes */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* COLONNE GAUCHE (2/3) : Contenu principal */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Hero Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
            >
              <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 p-6 md:p-8 text-white">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-4">
                  <div className="bg-white/20 backdrop-blur-sm w-20 h-20 md:w-24 md:h-24 rounded-3xl flex items-center justify-center text-5xl md:text-6xl shadow-inner border border-white/30">
                    {country.emoji}
                  </div>
                  <div className="flex-1">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-black mb-1">
                      {country.name}
                    </h1>
                    <p className="text-xl text-blue-100 mb-3">{country.native}</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-xs font-medium border border-white/20">
                        {country.iso2}
                      </span>
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-xs font-medium border border-white/20">
                        {country.iso3}
                      </span>
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-xs font-medium border border-white/20">
                        {country.region}
                      </span>
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-xs font-medium border border-white/20">
                        {country.subregion}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="p-4 md:p-6 bg-gray-50/50 grid grid-cols-1 sm:grid-cols-1 gap-3">
                <Link
                  href={`/countries/${country.iso2}/states`}
                  className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3.5 rounded-2xl font-semibold transition shadow-lg shadow-blue-200 group"
                >
                  <MapPinned size={20} className="group-hover:scale-110 transition-transform" />
                  États et Régions
                  <ChevronRight size={18} />
                </Link>
                {/** 
                  <Link
                    href={`/countries/${country.iso2}/cities`}
                    className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3.5 rounded-2xl font-semibold transition shadow-lg shadow-indigo-200 group"
                  >
                    <Building2 size={20} className="group-hover:scale-110 transition-transform" />
                    Toutes les Villes
                    <ChevronRight size={18} />
                  </Link>
                */}
              </div>
            </motion.div>

            {/* Grille d'informations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {infoCards.map((card, index) => (
                <div
                  key={card.label}
                  className={`${card.bg} ${card.border} border rounded-2xl p-5 transition-all hover:shadow-md hover:-translate-y-1 cursor-default`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <card.icon size={20} className={card.color} />
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{card.label}</p>
                  </div>
                  <p className="font-bold text-gray-900 text-lg">{card.value}</p>
                  {card.subvalue && (
                    <p className="text-sm text-gray-500 mt-0.5">{card.subvalue}</p>
                  )}
                </div>
              ))}
            </motion.div>

            {/* Coordonnées */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6"
            >
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Navigation size={20} className="text-emerald-600" />
                Coordonnées Géographiques
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-100 text-center">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Latitude</p>
                  <p className="text-2xl md:text-3xl font-black text-emerald-600 font-mono">{Number(country.latitude).toFixed(4)}°</p>
                </div>
                <div className="bg-teal-50 rounded-2xl p-5 border border-teal-100 text-center">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Longitude</p>
                  <p className="text-2xl md:text-3xl font-black text-teal-600 font-mono">{Number(country.longitude).toFixed(4)}°</p>
                </div>
              </div>
            </motion.div>

            {/* Onglets */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
            >
              {/* Navigation des onglets */}
              <div className="flex border-b border-gray-100 overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-5 py-4 text-sm font-medium transition whitespace-nowrap relative ${
                      activeTab === tab.id
                        ? 'text-blue-600'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon size={16} />
                    {tab.label}
                    {tab.count !== undefined && tab.count > 0 && (
                      <span className={`px-1.5 py-0.5 rounded-md text-xs font-bold ${
                        activeTab === tab.id ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'
                      }`}>
                        {tab.count}
                      </span>
                    )}
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Contenu des onglets */}
              <div className="p-6">
                <AnimatePresence mode="wait">
                  {activeTab === 'overview' && (
                    <motion.div
                      key="overview"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                      <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-5 border border-purple-100">
                        <div className="flex items-center gap-2 mb-2">
                          <Globe size={16} className="text-purple-500" />
                          <p className="text-xs text-gray-500 font-medium">Région</p>
                        </div>
                        <p className="font-bold text-gray-900 text-lg">{country.region}</p>
                        <p className="text-sm text-purple-600 mt-1">ID: {country.region_id}</p>
                      </div>
                      <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-5 border border-violet-100">
                        <div className="flex items-center gap-2 mb-2">
                          <Layers size={16} className="text-violet-500" />
                          <p className="text-xs text-gray-500 font-medium">Sous-région</p>
                        </div>
                        <p className="font-bold text-gray-900 text-lg">{country.subregion}</p>
                        <p className="text-sm text-violet-600 mt-1">ID: {country.subregion_id}</p>
                      </div>
                      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-5 border border-amber-100 md:col-span-2">
                        <div className="flex items-center gap-2 mb-2">
                          <Hash size={16} className="text-amber-500" />
                          <p className="text-xs text-gray-500 font-medium">Codes ISO</p>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          <div className="bg-white rounded-xl p-3 text-center">
                            <p className="text-xs text-gray-400">ISO2</p>
                            <p className="font-bold text-gray-900">{country.iso2}</p>
                          </div>
                          <div className="bg-white rounded-xl p-3 text-center">
                            <p className="text-xs text-gray-400">ISO3</p>
                            <p className="font-bold text-gray-900">{country.iso3}</p>
                          </div>
                          <div className="bg-white rounded-xl p-3 text-center">
                            <p className="text-xs text-gray-400">Numérique</p>
                            <p className="font-bold text-gray-900">{country.numeric_code}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'timezones' && (
                    <motion.div
                      key="timezones"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      {timezones.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {timezones.map((tz, index) => (
                            <div key={index} className="bg-gradient-to-br from-blue-50 to-sky-50 rounded-2xl p-5 border border-blue-100">
                              <p className="font-bold text-gray-900 text-lg mb-3">{tz.tzName}</p>
                              <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-500">Zone</span>
                                  <span className="font-medium text-gray-700">{tz.zoneName}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-500">UTC</span>
                                  <span className="font-medium text-blue-600">{tz.gmtOffsetName}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-500">Abréviation</span>
                                  <span className="font-medium text-gray-700">{tz.abbreviation}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-500">Offset</span>
                                  <span className="font-medium text-gray-700">{tz.gmtOffset}s</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12 text-gray-500">
                          <Clock size={48} className="mx-auto text-gray-300 mb-3" />
                          <p>Aucun fuseau horaire disponible</p>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {activeTab === 'translations' && (
                    <motion.div
                      key="translations"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      {Object.keys(translations).length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                          {Object.entries(translations)
                            .sort(([a], [b]) => a.localeCompare(b))
                            .map(([lang, name]) => (
                              <div
                                key={lang}
                                className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl p-3 text-center border border-gray-100 hover:border-green-200 hover:bg-green-50/50 transition cursor-default"
                              >
                                <p className="text-xs text-gray-500 mb-1 uppercase font-medium">{lang}</p>
                                <p className="font-semibold text-gray-900">{name}</p>
                              </div>
                            ))}
                        </div>
                      ) : (
                        <div className="text-center py-12 text-gray-500">
                          <Languages size={48} className="mx-auto text-gray-300 mb-3" />
                          <p>Aucune traduction disponible</p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* COLONNE DROITE (1/3) : Sidebar */}
          <div className="space-y-5">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="sticky top-24 space-y-5"
            >
              {/* Carte Emoji Unicode */}
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-br from-amber-400 to-orange-500 p-5 text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles size={18} />
                    <h3 className="font-bold">Drapeau Unicode</h3>
                  </div>
                  <p className="text-amber-100 text-xs">Représentation standard</p>
                </div>
                <div className="p-5 space-y-4">
                  <div className="bg-gray-50 rounded-2xl p-6 text-center border border-gray-100">
                    <p className="text-6xl mb-2">{country.emoji}</p>
                    <p className="text-sm text-gray-500">Emoji</p>
                  </div>
                  <div className="bg-gray-900 rounded-2xl p-4 relative group">
                    <button
                      onClick={() => copyToClipboard(country.emojiU, 'unicode')}
                      className="absolute top-2 right-2 text-gray-500 hover:text-white transition"
                    >
                      {copiedField === 'unicode' ? (
                        <Check size={14} className="text-green-400" />
                      ) : (
                        <Copy size={14} />
                      )}
                    </button>
                    <p className="text-xs text-gray-400 mb-1">Code Unicode</p>
                    <p className="text-green-400 font-mono text-sm break-all">{country.emojiU}</p>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-br from-gray-700 to-gray-900 p-5 text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <Flag size={18} />
                    <h3 className="font-bold">Actions Rapides</h3>
                  </div>
                  <p className="text-gray-300 text-xs">Explorer ce pays</p>
                </div>
                <div className="p-4 space-y-2">
                  <Link
                    href={`/countries/${country.iso2}/states`}
                    className="flex items-center justify-between p-3 bg-green-50 hover:bg-green-100 rounded-xl transition group"
                  >
                    <div className="flex items-center gap-3">
                      <MapPinned size={18} className="text-green-600" />
                      <span className="text-sm font-medium text-gray-700">États/Régions/Villes</span>
                    </div>
                    <ChevronRight size={16} className="text-gray-400 group-hover:text-green-600" />
                  </Link>
                  {/** 
                  <Link
                    href={`/countries/${country.iso2}/cities`}
                    className="flex items-center justify-between p-3 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition group"
                  >
                    <div className="flex items-center gap-3">
                      <Building2 size={18} className="text-indigo-600" />
                      <span className="text-sm font-medium text-gray-700">Villes</span>
                    </div>
                    <ChevronRight size={16} className="text-gray-400 group-hover:text-indigo-600" />
                  </Link>
                  */}
                  <Link
                    href={`/countries/${country.iso2}/states`}
                    className="flex items-center justify-between p-3 bg-amber-50 hover:bg-amber-100 rounded-xl transition group"
                  >
                    <div className="flex items-center gap-3">
                      <Clock size={18} className="text-amber-600" />
                      <span className="text-sm font-medium text-gray-700">Fuseaux horaires</span>
                    </div>
                    <ChevronRight size={16} className="text-gray-400 group-hover:text-amber-600" />
                  </Link>
                </div>
              </div>

              {/* Stats rapides */}
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Calendar size={18} className="text-blue-600" />
                    En Résumé
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2">
                      <span className="text-sm text-gray-500">Fuseaux horaires</span>
                      <span className="font-bold text-blue-600">{timezones.length}</span>
                    </div>
                    <div className="flex justify-between items-center p-2">
                      <span className="text-sm text-gray-500">Traductions</span>
                      <span className="font-bold text-green-600">{Object.keys(translations).length}</span>
                    </div>
                    <div className="flex justify-between items-center p-2">
                      <span className="text-sm text-gray-500">Région</span>
                      <span className="font-bold text-purple-600">{country.region}</span>
                    </div>
                    <div className="flex justify-between items-center p-2">
                      <span className="text-sm text-gray-500">Sous-région</span>
                      <span className="font-bold text-violet-600 truncate max-w-[120px]">{country.subregion}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}