"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface CaseData {
  id: string;
  patient: string;
  description: string;
  date: string;
}

export default function GeneratorPage() {
  const router = useRouter();
  const [cases, setCases] = useState<CaseData[]>([
    {
      id: "c1",
      patient: "Kamdem Arnaud",
      description: "Consultation générale",
      date: "2025-11-18",
    },
    {
      id: "c2",
      patient: "Brigitte Nguemegne",
      description: "Suivi tension artérielle",
      date: "2025-11-19",
    },
  ]);

  const handleAddCase = () => {
    const newCase: CaseData = {
      id: `c${cases.length + 1}`,
      patient: `Patient ${cases.length + 1}`,
      description: "Nouveau cas médical",
      date: new Date().toISOString().split("T")[0],
    };
    setCases([newCase, ...cases]);
  };

  const handleViewCase = (id: string) => {
    router.push(`/dashboard/generator/${id}`);
  };

  return (
    <div className="p-6 mt-20 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary">Générateur de cas médicaux</h1>
        <button
          onClick={handleAddCase}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition"
        >
          + Ajouter un cas
        </button>
      </div>

      {/* Liste des cas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cases.length === 0 ? (
          <p className="text-gray-500 col-span-full">Aucun cas disponible.</p>
        ) : (
          cases.map((c) => (
            <div
              key={c.id}
              className="border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition p-4 flex flex-col justify-between cursor-pointer"
              onClick={() => handleViewCase(c.id)}
            >
              <div>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  {c.patient}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-1 line-clamp-2">
                  {c.description}
                </p>
              </div>
              <div className="mt-3 flex justify-between items-center text-gray-500 dark:text-gray-400 text-xs">
                <span>Date : {c.date}</span>
                <span className="text-blue-600 hover:underline">Voir</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
