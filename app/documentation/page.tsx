// app/documentation/page.tsx
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowLeft,
  Book,
  Code,
  Key,
  Globe,
  MapPinned,
  Building2,
  Server,
  Check,
  Copy,
  ChevronRight,
  Layers,
  ExternalLink,
  Terminal,
  Shield,
  Zap,
  Clock,
  AlertCircle,
} from 'lucide-react';

export default function DocumentationPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const sections = [
    { id: 'overview', label: 'Aperçu', icon: Book },
    { id: 'authentication', label: 'Authentification', icon: Key },
    { id: 'base-url', label: 'URL de Base', icon: Server },
    { id: 'countries', label: 'Pays', icon: Globe },
    { id: 'states', label: 'États', icon: MapPinned },
    { id: 'cities', label: 'Villes', icon: Building2 },
    { id: 'regions', label: 'Régions', icon: Layers },
    { id: 'errors', label: 'Erreurs', icon: AlertCircle },
  ];

  const endpoints = [
    {
      method: 'GET',
      path: '/v1/countries',
      description: 'Liste de tous les pays',
      curl: `curl -X GET 'https://api.countrystatecity.in/v1/countries' \\
  -H 'X-CSCAPI-KEY: YOUR_API_KEY'`,
      response: `[
  {
    "id": 101,
    "name": "India",
    "iso2": "IN",
    "iso3": "IND",
    "phonecode": "91",
    "capital": "New Delhi",
    "currency": "INR",
    "native": "भारत",
    "emoji": "🇮🇳"
  }
]`,
    },
    {
      method: 'GET',
      path: '/v1/countries/{iso2}',
      description: 'Détails d\'un pays',
      curl: `curl -X GET 'https://api.countrystatecity.in/v1/countries/IN' \\
  -H 'X-CSCAPI-KEY: YOUR_API_KEY'`,
      response: `{
  "id": 101,
  "name": "India",
  "iso2": "IN",
  "iso3": "IND",
  "capital": "New Delhi",
  "currency": "INR",
  "region": "Asia",
  "subregion": "Southern Asia",
  ...
}`,
    },
    {
      method: 'GET',
      path: '/v1/countries/{iso2}/states',
      description: 'États d\'un pays',
      curl: `curl -X GET 'https://api.countrystatecity.in/v1/countries/IN/states' \\
  -H 'X-CSCAPI-KEY: YOUR_API_KEY'`,
      response: `[
  {
    "id": 4008,
    "name": "Maharashtra",
    "iso2": "MH"
  }
]`,
    },
    {
      method: 'GET',
      path: '/v1/countries/{iso2}/states/{stateIso2}',
      description: 'Détails d\'un état',
      curl: `curl -X GET 'https://api.countrystatecity.in/v1/countries/IN/states/MH' \\
  -H 'X-CSCAPI-KEY: YOUR_API_KEY'`,
      response: `{
  "id": 4008,
  "name": "Maharashtra",
  "iso2": "MH",
  "country_code": "IN",
  "type": "state"
}`,
    },
    {
      method: 'GET',
      path: '/v1/countries/{iso2}/cities',
      description: 'Villes d\'un pays',
      curl: `curl -X GET 'https://api.countrystatecity.in/v1/countries/IN/cities' \\
  -H 'X-CSCAPI-KEY: YOUR_API_KEY'`,
      response: `[
  {
    "id": 133024,
    "name": "Mumbai"
  }
]`,
    },
    {
      method: 'GET',
      path: '/v1/countries/{iso2}/states/{stateIso2}/cities',
      description: 'Villes d\'un état',
      curl: `curl -X GET 'https://api.countrystatecity.in/v1/countries/IN/states/MH/cities' \\
  -H 'X-CSCAPI-KEY: YOUR_API_KEY'`,
      response: `[
  {
    "id": 133024,
    "name": "Mumbai"
  }
]`,
    },
    {
      method: 'GET',
      path: '/v1/states',
      description: 'Tous les états du monde',
      curl: `curl -X GET 'https://api.countrystatecity.in/v1/states' \\
  -H 'X-CSCAPI-KEY: YOUR_API_KEY'`,
      response: `[
  {
    "id": 4008,
    "name": "Maharashtra",
    "country_id": 101,
    "country_code": "IN",
    "iso2": "MH"
  }
]`,
    },
    {
      method: 'GET',
      path: '/v1/regions',
      description: 'Régions géographiques',
      curl: `curl -X GET 'https://api.countrystatecity.in/v1/regions' \\
  -H 'X-CSCAPI-KEY: YOUR_API_KEY'`,
      response: `[
  { "id": 1, "name": "Africa" },
  { "id": 3, "name": "Asia" },
  { "id": 4, "name": "Europe" }
]`,
    },
    {
      method: 'GET',
      path: '/v1/regions/{id}/subregions',
      description: 'Sous-régions d\'une région',
      curl: `curl -X GET 'https://api.countrystatecity.in/v1/regions/3/subregions' \\
  -H 'X-CSCAPI-KEY: YOUR_API_KEY'`,
      response: `[
  { "id": 14, "name": "Southern Asia", "region_id": 3 },
  { "id": 15, "name": "Eastern Asia", "region_id": 3 }
]`,
    },
    {
      method: 'GET',
      path: '/v1/subregions/{id}/countries',
      description: 'Pays d\'une sous-région',
      curl: `curl -X GET 'https://api.countrystatecity.in/v1/subregions/14/countries' \\
  -H 'X-CSCAPI-KEY: YOUR_API_KEY'`,
      response: `[
  { "id": 101, "name": "India", "iso2": "IN" },
  { "id": 167, "name": "Pakistan", "iso2": "PK" }
]`,
    },
  ];

  return (
    <main className="w-full min-h-screen bg-white overflow-hidden">
      {/* Background décoratif */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-180px] right-[-120px] w-[550px] h-[550px] bg-blue-200 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-[-220px] left-[-150px] w-[620px] h-[620px] bg-indigo-200 rounded-full blur-3xl opacity-25" />
      </div>

      <div className="relative z-10 w-full min-h-screen flex flex-col px-6 md:px-12 lg:px-20 py-8 md:py-12">
        
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10  "
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-slate-700 to-gray-900 bg-clip-text text-transparent mb-4">
            Documentation API
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl">
            Guide complet pour intégrer l&apos;API Country State City dans vos applications
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          {/* Sidebar Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <nav className="sticky top-8 bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-900 mb-5 px-3">Sommaire</h3>
              <ul className="space-y-1">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition"
                    >
                      <section.icon size={17} />
                      {section.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>

          {/* Contenu */}
          <div className="lg:col-span-3 space-y-12">
            {/* Aperçu */}
            <motion.section
              id="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Book size={24} className="text-blue-600" />
                Aperçu
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                L&apos;API Country State City fournit un accès complet aux données géographiques mondiales,
                couvrant plus de <strong>247 pays</strong>, <strong>5 000+ états/provinces</strong> et
                <strong> 151 000+ villes</strong>. Conçue pour être rapide, fiable et facile à intégrer.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                  <Globe size={24} className="text-blue-600 mb-2" />
                  <h3 className="font-semibold text-gray-900">247+ Pays</h3>
                  <p className="text-sm text-gray-600">Avec détails complets</p>
                </div>
                <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                  <MapPinned size={24} className="text-green-600 mb-2" />
                  <h3 className="font-semibold text-gray-900">5000+ États</h3>
                  <p className="text-sm text-gray-600">Provinces et régions</p>
                </div>
                <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
                  <Building2 size={24} className="text-purple-600 mb-2" />
                  <h3 className="font-semibold text-gray-900">151K+ Villes</h3>
                  <p className="text-sm text-gray-600">Avec coordonnées</p>
                </div>
              </div>
            </motion.section>

            {/* Authentification */}
            <motion.section
              id="authentication"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Key size={24} className="text-amber-600" />
                Authentification
              </h2>
              <p className="text-gray-600 mb-6">
                Toutes les requêtes nécessitent une clé API dans le header <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono">X-CSCAPI-KEY</code>.
              </p>

              <div className="bg-gray-900 rounded-xl p-6 mb-4 relative group">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-xs font-mono">Header Requis</span>
                  <button
                    onClick={() => copyToClipboard('X-CSCAPI-KEY: YOUR_API_KEY', 'auth')}
                    className="text-gray-400 hover:text-white transition"
                  >
                    {copiedCode === 'auth' ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                  </button>
                </div>
                <pre className="text-green-400 text-sm font-mono">X-CSCAPI-KEY: YOUR_API_KEY</pre>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                <Shield size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-amber-800">Sécurité</p>
                  <p className="text-sm text-amber-700">
                    Ne jamais exposer votre clé API dans du code client-side ou des dépôts publics.
                    Utilisez des variables d&apos;environnement.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* URL de Base */}
            <motion.section
              id="base-url"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Server size={24} className="text-indigo-600" />
                URL de Base
              </h2>
              <div className="bg-gray-900 rounded-xl p-6">
                <pre className="text-green-400 font-mono">https://api.countrystatecity.in/v1</pre>
              </div>
            </motion.section>

            {/* Endpoints */}
            {[
              { id: 'countries', title: 'Pays', icon: Globe, color: 'blue', endpoints: endpoints.filter(e => e.path.includes('countries') && !e.path.includes('states') && !e.path.includes('cities')) },
              { id: 'states', title: 'États', icon: MapPinned, color: 'green', endpoints: endpoints.filter(e => e.path.includes('states')) },
              { id: 'cities', title: 'Villes', icon: Building2, color: 'purple', endpoints: endpoints.filter(e => e.path.includes('cities')) },
              { id: 'regions', title: 'Régions', icon: Layers, color: 'orange', endpoints: endpoints.filter(e => e.path.includes('regions') || e.path.includes('subregions')) },
            ].map((group) => (
              <motion.section
                key={group.id}
                id={group.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8"
              >
                <h2 className={`text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3`}>
                  <group.icon size={24} className={`text-${group.color}-600`} />
                  {group.title}
                </h2>

                <div className="space-y-8">
                  {group.endpoints.map((endpoint, index) => (
                    <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
                      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center gap-3">
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-bold font-mono">
                          {endpoint.method}
                        </span>
                        <code className="text-sm font-mono text-gray-700">{endpoint.path}</code>
                        <span className="text-xs text-gray-500 ml-auto">{endpoint.description}</span>
                      </div>

                      <div className="p-4">
                        <p className="text-xs text-gray-500 mb-2 font-semibold">cURL</p>
                        <div className="bg-gray-900 rounded-lg p-4 mb-4 relative group">
                          <button
                            onClick={() => copyToClipboard(endpoint.curl, `${group.id}-${index}-curl`)}
                            className="absolute top-2 right-2 text-gray-400 hover:text-white transition"
                          >
                            {copiedCode === `${group.id}-${index}-curl` ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                          </button>
                          <pre className="text-green-400 text-xs font-mono overflow-x-auto">{endpoint.curl}</pre>
                        </div>

                        <p className="text-xs text-gray-500 mb-2 font-semibold">Réponse</p>
                        <div className="bg-gray-900 rounded-lg p-4 relative group">
                          <button
                            onClick={() => copyToClipboard(endpoint.response, `${group.id}-${index}-response`)}
                            className="absolute top-2 right-2 text-gray-400 hover:text-white transition"
                          >
                            {copiedCode === `${group.id}-${index}-response` ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                          </button>
                          <pre className="text-green-400 text-xs font-mono overflow-x-auto">{endpoint.response}</pre>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>
            ))}

            {/* Codes d'erreur */}
            <motion.section
              id="errors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <AlertCircle size={24} className="text-red-600" />
                Codes d&apos;Erreur HTTP
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="py-3 px-4 text-sm font-semibold text-gray-600">Code</th>
                      <th className="py-3 px-4 text-sm font-semibold text-gray-600">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <td className="py-3 px-4"><span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">200</span></td>
                      <td className="py-3 px-4 text-gray-600">Succès - Requête complétée avec succès</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4"><span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-bold">401</span></td>
                      <td className="py-3 px-4 text-gray-600">Non autorisé - Clé API invalide ou manquante</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4"><span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs font-bold">403</span></td>
                      <td className="py-3 px-4 text-gray-600">Interdit - Plan insuffisant pour cette fonctionnalité</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4"><span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-bold">404</span></td>
                      <td className="py-3 px-4 text-gray-600">Non trouvé - La ressource n&apos;existe pas</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4"><span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-bold">500</span></td>
                      <td className="py-3 px-4 text-gray-600">Erreur interne du serveur</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.section>
          </div>
        </div>
      </div>
    </main>
  );
}