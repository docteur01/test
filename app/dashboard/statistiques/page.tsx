// app/dashboard/stats/page.tsx
"use client";

import React from "react";
import {
  Activity,
  Users,
  FileText,
  TrendingUp,
  TrendingDown,
  Stethoscope,
  Calendar,
  Clock,
  Heart,
  AlertCircle,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

// Types
type StatCardProps = {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: React.ElementType;
  iconBgColor: string;
  iconColor: string;
};

type CasRecents = {
  id: string;
  patient: string;
  age: number;
  sexe: string;
  motif: string;
  temps: string;
  diagnostic: string;
  statut: "nouveau" | "en-cours" | "terminé" | "urgent";
};

// Données réalistes MedCaseGen (Cameroun)
const casSemaineData = [
  { jour: "Lun", cas: 12, consultations: 45 },
  { jour: "Mar", cas: 18, consultations: 58 },
  { jour: "Mer", cas: 15, consultations: 52 },
  { jour: "Jeu", cas: 22, consultations: 68 },
  { jour: "Ven", cas: 28, consultations: 82 },
  { jour: "Sam", cas: 25, consultations: 74 },
  { jour: "Dim", cas: 19, consultations: 61 },
];

const casRecents: CasRecents[] = [
  {
    id: "#CAS-1247",
    patient: "Tchouameni Martine",
    age: 38,
    sexe: "F",
    motif: "Dyspnée + œdèmes",
    temps: "Il y a 8 min",
    diagnostic: "Insuffisance cardiaque",
    statut: "urgent",
  },
  {
    id: "#CAS-1246",
    patient: "Nga Jean-Paul",
    age: 46,
    sexe: "H",
    motif: "Douleur abdominale intense",
    temps: "Il y a 15 min",
    diagnostic: "Pancréatite aiguë",
    statut: "en-cours",
  },
  {
    id: "#CAS-1245",
    patient: "Mbarga Émilienne",
    age: 30,
    sexe: "F",
    motif: "Fièvre + lombalgie",
    temps: "Il y a 22 min",
    diagnostic: "Pyélonéphrite (grossesse)",
    statut: "nouveau",
  },
  {
    id: "#CAS-1244",
    patient: "Fouda Pierre",
    age: 57,
    sexe: "H",
    motif: "Crise hypertensive",
    temps: "Il y a 35 min",
    diagnostic: "HTA grade 3",
    statut: "terminé",
  },
  {
    id: "#CAS-1243",
    patient: "Ngo Carine",
    age: 24,
    sexe: "F",
    motif: "Accès palustre",
    temps: "Il y a 42 min",
    diagnostic: "Paludisme grave",
    statut: "en-cours",
  },
];

// Composant carte statistique
function StatCard({
  title,
  value,
  change,
  changeLabel,
  icon: Icon,
  iconBgColor,
  iconColor,
}: StatCardProps) {
  const isPositive = change ? change >= 0 : true;
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 font-medium mb-2">{title}</p>
          <h3 className="text-3xl font-bold text-gray-900 mb-3">{value}</h3>
          {change !== undefined && changeLabel && (
            <div className="flex items-center gap-2">
              {isPositive ? (
                <TrendingUp className="w-4 h-4 text-green-600" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-600" />
              )}
              <span className={`text-sm font-semibold ${isPositive ? "text-green-600" : "text-red-600"}`}>
                {isPositive ? "+" : ""}{change}%
              </span>
              <span className="text-sm text-gray-500">{changeLabel}</span>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 rounded-xl ${iconBgColor} flex items-center justify-center`}>
          <Icon className={`w-7 h-7 ${iconColor}`} />
        </div>
      </div>
    </div>
  );
}

// Badge statut cas clinique
function StatusBadge({ statut }: { statut: CasRecents["statut"] }) {
  const config = {
    nouveau: { label: "Nouveau", bg: "bg-blue-100", text: "text-blue-700", dot: "bg-blue-500" },
    "en-cours": { label: "En analyse", bg: "bg-amber-100", text: "text-amber-700", dot: "bg-amber-500" },
    terminé: { label: "Terminé", bg: "bg-green-100", text: "text-green-700", dot: "bg-green-500" },
    urgent: { label: "Urgent", bg: "bg-red-100", text: "text-red-700", dot: "bg-red-500" },
  };
  const { label, bg, text, dot } = config[statut];
  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${bg} ${text}`}>
      <span className={`w-2 h-2 rounded-full ${dot}`}></span>
      {label}
    </span>
  );
}

export default function DashboardStatsPage() {
  return (
    <div className="min-h-screen mt-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8">

        {/* Titre du dashboard */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Tableau de bord MedCaseGen</h1>
          <p className="text-gray-600 mt-2">Suivi en temps réel de votre activité de génération et d'analyse de cas cliniques</p>
        </div>

        {/* Cartes de statistiques principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Cas générés aujourd'hui"
            value="28"
            change={18.4}
            changeLabel="vs hier"
            icon={FileText}
            iconBgColor="bg-blue-100"
            iconColor="text-blue-600"
          />
          <StatCard
            title="Consultations simulées"
            value="82"
            change={12.7}
            changeLabel="vs hier"
            icon={Activity}
            iconBgColor="bg-emerald-100"
            iconColor="text-emerald-600"
          />
          <StatCard
            title="Pathologies couvertes"
            value="156"
            change={5.1}
            changeLabel="ce mois"
            icon={Heart}
            iconBgColor="bg-purple-100"
            iconColor="text-purple-600"
          />
          <StatCard
            title="Taux de précision IA"
            value="96.8%"
            change={1.3}
            changeLabel="vs semaine dernière"
            icon={TrendingUp}
            iconBgColor="bg-green-100"
            iconColor="text-green-600"
          />
        </div>

        {/* Graphique + Cas le plus fréquent */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Graphique activité semaine */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Activité de la semaine</h2>
                <p className="text-sm text-gray-500 mt-1">Cas générés et consultations simulées</p>
              </div>
              <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                  <span className="text-gray-600">Cas générés</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  <span className="text-gray-600">Consultations</span>
                </div>
              </div>
            </div>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={casSemaineData}>
                  <defs>
                    <linearGradient id="colorCas" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorConsult" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="4 4" stroke="#f1f5f9" />
                  <XAxis dataKey="jour" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip
                    contentStyle={{ backgroundColor: "white", border: "1px solid #e2e8f0", borderRadius: "12px" }}
                  />
                  <Area type="monotone" dataKey="cas" stroke="#3b82f6" strokeWidth={3} fill="url(#colorCas)" />
                  <Area type="monotone" dataKey="consultations" stroke="#10b981" strokeWidth={3} fill="url(#colorConsult)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Cas clinique le plus fréquent */}
          <div className="bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl p-6 shadow-xl text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="w-6 h-6" />
                <span className="text-sm font-bold uppercase tracking-wider">Pathologie du jour</span>
              </div>
              <h3 className="text-2xl font-bold mb-3">Paludisme à Plasmodium falciparum</h3>
              <p className="text-red-100 mb-6">18 cas générés aujourd’hui (saison des pluies)</p>
              <div className="space-y-4 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="flex justify-between">
                  <span className="text-red-100">Taux de gravité moyen</span>
                  <span className="font-bold text-xl">Élevé</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-red-100">Âge moyen des patients</span>
                  <span className="font-bold text-xl">28 ans</span>
                </div>
              </div>
              <button className="mt-6 w-full bg-white text-red-600 font-bold py-3 rounded-xl hover:bg-red-50 transition-all">
                Voir tous les cas palu
              </button>
            </div>
          </div>
        </div>

        {/* Tableau des cas récents */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Cas cliniques récents</h2>
                <p className="text-sm text-gray-500 mt-1">Derniers cas générés ou consultés</p>
              </div>
              <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                Voir tout →
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">ID Cas</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Patient</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Motif</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Diagnostic pressenti</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Heure</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {casRecents.map((cas) => (
                  <tr key={cas.id} className="hover:bg-gray-50 transition-colors cursor-pointer">
                    <td className="px-6 py-4">
                      <span className="font-semibold text-blue-600">{cas.id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                          cas.sexe === "F" ? "bg-pink-500" : "bg-indigo-500"
                        }`}>
                          {cas.patient.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{cas.patient}</p>
                          <p className="text-xs text-gray-500">{cas.age} ans • {cas.sexe}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{cas.motif}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{cas.diagnostic}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        {cas.temps}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge statut={cas.statut} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}