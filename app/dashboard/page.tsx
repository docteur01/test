// app/dashboard/page.tsx
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Users,
  Calendar,
  FileText,
  BarChart3,
  PlusSquare,
  Clock,
  Eye,
} from "lucide-react";

type Patient = {
  id: string;
  name: string;
  age: number;
  lastVisit: string;
  avatar?: string;
  note?: string;
};

type Appointment = {
  id: string;
  patientName: string;
  time: string;
  reason: string;
  status: "À venir" | "Confirmé" | "Terminé";
};

const MOCK_STATS = {
  patientsCount: 1248,
  appointmentsToday: 12,
  openCases: 34,
  avgResponseMin: 18,
  trend: [4, 6, 8, 7, 9, 12, 10, 14],
};

const RECENT_PATIENTS: Patient[] = [
  { id: "p1", name: "Marie Dupont", age: 42, lastVisit: "2025-11-12", avatar: "/images/avatar-medical.png", note: "HTA - suivi" },
  { id: "p2", name: "Paul Mbarga", age: 29, lastVisit: "2025-11-10", avatar: "/images/avatar-medical.png", note: "Contrôle post-op" },
  { id: "p3", name: "Aïcha Koné", age: 67, lastVisit: "2025-11-09", avatar: "/images/avatar-medical.png", note: "Diabète" },
];

const UPCOMING_APPOINTMENTS: Appointment[] = [
  { id: "a1", patientName: "Marie Dupont", time: "09:30", reason: "Consultation Cardiologie", status: "À venir" },
  { id: "a2", patientName: "John Doe", time: "10:00", reason: "Bilan sanguin", status: "Confirmé" },
  { id: "a3", patientName: "Paul Mbarga", time: "11:15", reason: "Suivi post-op", status: "À venir" },
];

function StatCard({ title, value, icon: Icon, subtitle }: { title: string; value: string | number; icon: any; subtitle?: string; }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 flex items-start gap-4 border border-sky-50 dark:border-gray-700">
      <div className="w-12 h-12 rounded-md bg-sky-50 dark:bg-sky-900/30 flex items-center justify-center text-sky-600 dark:text-sky-300">
        <Icon className="w-6 h-6" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm text-slate-500 dark:text-slate-400">{title}</div>
        <div className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">{value}</div>
        {subtitle && <div className="text-xs text-slate-400 mt-1">{subtitle}</div>}
      </div>
    </div>
  );
}

function Sparkline({ data }: { data: number[] }) {
  const width = 120;
  const height = 36;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / (max - min || 1)) * height;
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="inline-block align-middle">
      <polyline fill="none" stroke="#0ea5e9" strokeWidth={2} points={points} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function DashboardPage() {
  return (
    <div className="w-full mt-20 max-w-7xl mx-auto">
      {/* Header section inside page (the Topbar is fixed in layout) */}
      <div className="mt-6 mb-4 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-sky-800 dark:text-sky-300">Tableau de bord</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Aperçu clinique — indicateurs clés et activités récentes</p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/dashboard/generator" className="inline-flex items-center gap-2 bg-sky-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-sky-700 transition">
            <PlusSquare className="w-4 h-4" /> Nouveau dossier
          </Link>
          <Link href="/dashboard/appointments" className="inline-flex items-center gap-2 border border-sky-200 bg-white text-sky-700 px-3 py-2 rounded-md text-sm hover:bg-sky-50 transition">
            <Calendar className="w-4 h-4" /> Planning
          </Link>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Patients enregistrés" value={MOCK_STATS.patientsCount.toLocaleString()} icon={Users} subtitle="Total patients" />
        <StatCard title="Rendez-vous aujourd'hui" value={MOCK_STATS.appointmentsToday} icon={Calendar} subtitle="RDV planifiés" />
        <StatCard title="Cas ouverts" value={MOCK_STATS.openCases} icon={FileText} subtitle="Dossiers nécessitant attention" />
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-sky-50 dark:border-gray-700 flex items-center justify-between">
          <div>
            <div className="text-sm text-slate-500 dark:text-slate-400">Temps de réponse moyen</div>
            <div className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">{MOCK_STATS.avgResponseMin} min</div>
            <div className="text-xs text-slate-400 mt-1">Tendance récente</div>
          </div>
          <div className="ml-4">
            <Sparkline data={MOCK_STATS.trend} />
          </div>
        </div>
      </div>

      {/* Main grid: recent patients + upcoming appointments */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Patients */}
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-sky-50 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Patients récents</h3>
            <Link href="/dashboard/patients" className="text-sm text-sky-600 hover:underline">Voir tout</Link>
          </div>

          <ul className="mt-4 space-y-3">
            {RECENT_PATIENTS.map((p) => (
              <li key={p.id} className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-sky-50 flex-shrink-0">
                  <Image src={p.avatar ?? "/images/avatar-medical.png"} alt={p.name} width={48} height={48} className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-slate-900 dark:text-white">{p.name}</div>
                      <div className="text-xs text-slate-400">{p.age} ans • Dernière visite {p.lastVisit}</div>
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">{p.note}</div>
                  </div>
                </div>
                <Link href={`/dashboard/patients/${p.id}`} className="text-sky-600 text-sm hover:underline">Ouvrir</Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Upcoming appointments */}
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-sky-50 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Prochains rendez-vous</h3>
            <Link href="/dashboard/appointments" className="text-sm text-sky-600 hover:underline">Voir tout</Link>
          </div>

          <div className="mt-4 space-y-3">
            {UPCOMING_APPOINTMENTS.map((a) => (
              <div key={a.id} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-md bg-sky-50 dark:bg-sky-900/20 flex items-center justify-center text-sky-600">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-slate-900 dark:text-white truncate">{a.patientName}</div>
                    <div className="text-xs text-slate-400 truncate">{a.reason}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-sm font-semibold text-slate-700 dark:text-slate-200">{a.time}</div>
                  <div className={`
                    text-xs px-2 py-1 rounded-full font-medium
                    ${a.status === "À venir" ? "bg-sky-100 text-sky-700" : ""}
                    ${a.status === "Confirmé" ? "bg-emerald-100 text-emerald-700" : ""}
                    ${a.status === "Terminé" ? "bg-slate-100 text-slate-700" : ""}
                  `}>
                    {a.status}
                  </div>
                  <Link href={`/dashboard/appointments/${a.id}`} className="text-sky-600 text-sm hover:underline">Détails</Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Quick overview / actions */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/dashboard/patients/new" className="block bg-white dark:bg-gray-800 rounded-lg border border-sky-50 dark:border-gray-700 p-4 hover:shadow transition">
          <div className="flex items-center gap-3">
            <PlusSquare className="w-6 h-6 text-sky-600" />
            <div>
              <div className="text-sm font-medium text-slate-900 dark:text-white">Ajouter un patient</div>
              <div className="text-xs text-slate-400">Créer un nouveau dossier patient</div>
            </div>
          </div>
        </Link>

        <Link href="/dashboard/generator" className="block bg-white dark:bg-gray-800 rounded-lg border border-sky-50 dark:border-gray-700 p-4 hover:shadow transition">
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6 text-sky-600" />
            <div>
              <div className="text-sm font-medium text-slate-900 dark:text-white">Générateur de cas</div>
              <div className="text-xs text-slate-400">Créer rapidement des cas médicaux</div>
            </div>
          </div>
        </Link>

        <Link href="/dashboard/appointments" className="block bg-white dark:bg-gray-800 rounded-lg border border-sky-50 dark:border-gray-700 p-4 hover:shadow transition">
          <div className="flex items-center gap-3">
            <Eye className="w-6 h-6 text-sky-600" />
            <div>
              <div className="text-sm font-medium text-slate-900 dark:text-white">Voir planning</div>
              <div className="text-xs text-slate-400">Gérer les rendez-vous et disponibilités</div>
            </div>
          </div>
        </Link>
      </div>

      <div className="h-16" />
    </div>
  );
}
