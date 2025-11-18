"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  UserPlus,
  Filter,
  ChevronRight,
  HeartPulse,
} from "lucide-react";

// Types
type Patient = {
  id: string;
  name: string;
  age: number;
  lastVisit: string;
  status: "Actif" | "Archivé";
  avatar?: string;
};

const MOCK_PATIENTS: Patient[] = [
  {
    id: "p1",
    name: "Marie Dupont",
    age: 42,
    lastVisit: "12 Nov 2025",
    status: "Actif",
    avatar: "/images/avatar-medical.png",
  },
  {
    id: "p2",
    name: "Paul Mbarga",
    age: 29,
    lastVisit: "10 Nov 2025",
    status: "Actif",
    avatar: "/images/avatar-medical.png",
  },
  {
    id: "p3",
    name: "Aïcha Koné",
    age: 67,
    lastVisit: "09 Nov 2025",
    status: "Archivé",
    avatar: "/images/avatar-medical.png",
  },
  {
    id: "p4",
    name: "John Doe",
    age: 54,
    lastVisit: "08 Nov 2025",
    status: "Actif",
    avatar: "/images/avatar-medical.png",
  },
];

export default function PatientsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"Tous" | "Actif" | "Archivé">("Tous");

  const filteredPatients = MOCK_PATIENTS.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      `${p.age}`.includes(search);

    const matchFilter = filter === "Tous" ? true : p.status === filter;

    return matchSearch && matchFilter;
  });

  return (
    <div className="w-full mt-20 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mt-6 mb-4 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-sky-800 dark:text-sky-300">
            Patients
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Gestion des dossiers patients
          </p>
        </div>

        <Link
          href="/dashboard/patients/new"
          className="inline-flex items-center gap-2 bg-sky-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-sky-700 transition"
        >
          <UserPlus className="w-4 h-4" /> Ajouter un patient
        </Link>
      </div>

      {/* Search & Filters */}
      <div className="mb-4 flex flex-col sm:flex-row items-center gap-3">
        {/* Search */}
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Rechercher un patient..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-3 py-2 rounded-md border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:ring-2 focus:ring-sky-500 outline-none"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2">
          {["Tous", "Actif", "Archivé"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-3 py-2 rounded-md text-sm border transition ${
                filter === f
                  ? "bg-sky-600 text-white border-sky-600"
                  : "bg-white dark:bg-gray-800 border-slate-200 dark:border-gray-700 text-slate-600 dark:text-slate-300"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Patient List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-sky-50 dark:border-gray-700">
        <ul className="divide-y divide-slate-100 dark:divide-gray-700">
          {filteredPatients.length === 0 && (
            <li className="p-6 text-center text-slate-500 text-sm">
              Aucun patient trouvé.
            </li>
          )}

          {filteredPatients.map((p) => (
            <li key={p.id} className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4 min-w-0">
                {/* Avatar */}
                <Image
                  src={p.avatar ?? "/images/avatar-medical.png"}
                  alt={p.name}
                  width={48}
                  height={48}
                  className="rounded-full object-cover bg-sky-50"
                />

                {/* Info */}
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-slate-900 dark:text-white truncate">
                      {p.name}
                    </span>
                    {p.status === "Actif" && (
                      <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                        Actif
                      </span>
                    )}
                    {p.status === "Archivé" && (
                      <span className="text-xs bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full">
                        Archivé
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                    {p.age} ans • Dernière visite : {p.lastVisit}
                  </p>
                </div>
              </div>

              {/* Action */}
              <Link
                href={`/dashboard/patients/${p.id}`}
                className="text-sky-600 hover:text-sky-800 transition"
              >
                <ChevronRight className="w-5 h-5" />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="h-10" />
    </div>
  );
}
