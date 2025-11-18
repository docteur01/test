"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface CaseData {
  id: number;        // ← id est un number
  patient: string;
  description: string;
  date: string;
  observations: string;
}

export default function CasePage() {
  const params = useParams();           // ← useParams() retourne { id: string | string[] }
  const router = useRouter();

  const [caseData, setCaseData] = useState<CaseData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCase = async () => {
      // Récupération sécurisée de l'id
      const rawId = params.id;
      if (!rawId || Array.isArray(rawId)) {
        router.replace("/dashboard/generator");
        return;
      }

      const idNumber = parseInt(rawId, 10);
      if (isNaN(idNumber)) {
        router.replace("/dashboard/generator");
        return;
      }

      // Simulation API (à remplacer par ton vrai appel plus tard)
      const mockCase: CaseData = {
        id: idNumber,                                     // ← maintenant c'est bien un number
        patient: "Kamdem Arnaud",
        description: "Consultation générale - Fatigue persistante",
        date: "2025-11-18",
        observations: `Patient de 42 ans consultant pour fatigue depuis 3 semaines.
Pas de fièvre, pas de perte de poids.
Pression artérielle : 128/82 mmHg
Fréquence cardiaque : 78 bpm
Saturation O₂ : 98 %
Examen clinique normal.
Bilan biologique prescrit (NFS, CRP, ferritinémie).
Recommandation : repos + hydratation + suivi dans 1 mois.`,
      };

      setCaseData(mockCase);
      setLoading(false);
    };

    fetchCase();
  }, [params.id, router]);

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-600">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-4 border-b-4 border-blue-600"></div>
        <p className="mt-4">Chargement du cas médical...</p>
      </div>
    );
  }

  if (!caseData) {
    return (
      <div className="p-6 text-center text-red-600">
        Cas introuvable ou ID invalide.
      </div>
    );
  }

  return (
    <div className="p-6 mt-20 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-blue-800">{caseData.patient}</h1>
          <p className="text-sm text-gray-500 mt-1">
            Cas clinique n° <span className="font-mono font-bold">{caseData.id}</span> • Généré le {caseData.date}
          </p>
        </div>
        <button
          onClick={() => router.push("/dashboard/generator")}
          className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-5 py-3 rounded-xl font-medium transition flex items-center gap-2"
        >
          ← Retour à la liste
        </button>
      </div>

      {/* Contenu du cas */}
      <div className="bg-white border border-blue-100 rounded-2xl p-8 shadow-lg">
        <h2 className="text-xl font-bold text-blue-700 mb-4 flex items-center gap-2">
          Description du cas
        </h2>
        <p className="text-gray-700 leading-relaxed text-lg">{caseData.description}</p>

        <div className="mt-8">
          <h2 className="text-xl font-bold text-blue-700 mb-4">Observations cliniques</h2>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-gray-800 whitespace-pre-line leading-relaxed">
            {caseData.observations}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-4">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition shadow-md">
          Modifier le cas
        </button>
        <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-xl font-semibold transition shadow-md">
          Exporter en PDF
        </button>
        <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition shadow-md">
          Supprimer le cas
        </button>
      </div>
    </div>
  );
}