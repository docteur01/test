// app/dashboard/patients/[id]/page.tsx

import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  Calendar,
  FileText,
  HeartPulse,
  Stethoscope,
  ChevronRight,
  Plus,
  FolderOpen,
  AlertTriangle,
} from "lucide-react";

// ------- MOCK DATA (à remplacer plus tard par API) -------
const MOCK_PATIENTS: Record<string, any> = {
  p1: {
    id: "p1",
    name: "Tchouameni Martine",
    age: 38,
    gender: "Femme",
    blood: "O+",
    allergies: "Pénicilline",
    conditions: "Hypertension artérielle, Anémie",
    lastVisit: "18 Nov 2025",
    lastDoctor: "Dr.Dr. Ngo Carine",
    status: "Actif",
    avatar: "/images/avatars/martine.jpg",
    dossierNumber: "PAT-CM-2025-001",
    history: [
      { date: "18 Nov 2025", title: "Consultation cardiologie", details: "Suivi insuffisance cardiaque" },
      { date: "03 Oct 2025", title: "Bilan biologique", details: "Anémie ferriprive confirmée" },
      { date: "15 Juil 2025", title: "Échographie cardiaque", details: "FEVG 45%" },
    ],
    documents: [
      { id: 1, name: "Bilan sanguin novembre 2025.pdf", date: "18 Nov 2025" },
      { id: 2, name: "Échographie cardiaque.pdf", date: "15 Juil 2025" },
    ],
  },
  // Tu peux ajouter d'autres patients ici (p2, p3...)
};

// Props corrigées pour Next.js 15+
type Props = {
  params: Promise<{ id: string }>;
};

export default async function PatientDetailPage({ params }: Props) {
  // Important : await les params (Next.js 15)
  const { id } = await params;

  const patient = MOCK_PATIENTS[id];

  if (!patient) {
    notFound();
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      {/* HEADER PATIENT */}
      <div className="mb-8 flex flex-col md:flex-row items-start md:items-center gap-6 bg-white rounded-2xl border border-blue-100 shadow-lg p-6">
        <Image
          src={patient.avatar || "/images/avatar-placeholder.png"}
          alt={patient.name}
          width={100}
          height={100}
          className="rounded-full border-4 border-blue-200 object-cover"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-blue-800">
            {patient.name}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Dossier n° <span className="font-mono font-semibold">{patient.dossierNumber}</span>
          </p>
          <div className="mt-3 flex items-center gap-3">
            <span className="px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold">
              Patient actif
            </span>
            <span className="text-sm text-gray-600">
              Dernière visite : <strong>{patient.lastVisit}</strong> par {patient.lastDoctor}
            </span>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="flex gap-8">
          {["Informations", "Historique", "Documents", "Rendez-vous"].map((tab) => (
            <button
              key={tab}
              className="pb-4 px-2 text-sm font-medium border-b-2 border-transparent hover:border-blue-500 text-gray-600 hover:text-blue-700 transition"
              // Tu peux ajouter un état activeTab si tu veux un onglet actif
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* CONTENU - Informations (tu peux faire des onglets dynamiques plus tard) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Informations générales */}
        <div className="bg-white rounded-2xl border border-blue-100 p-6 shadow">
          <h3 className="text-xl font-bold text-blue-700 mb-5 flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Informations générales
          </h3>
          <div className="space-y-4 text-sm">
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-500">Âge</span>
              <span className="font-semibold">{patient.age} ans</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-500">Sexe</span>
              <span className="font-semibold">{patient.gender}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-500">Groupe sanguin</span>
              <span className="font-semibold text-red-600">{patient.blood}</span>
            </div>
          </div>
        </div>

        {/* Informations médicales */}
        <div className="bg-white rounded-2xl border border-blue-100 p-6 shadow">
          <h3 className="text-xl font-bold text-blue-700 mb-5 flex items-center gap-2">
            <HeartPulse className="w-5 h-5" />
            Données médicales
          </h3>
          <div className="space-y-4 text-sm">
            <div>
              <p className="text-gray-500 mb-1">Allergies</p>
              <p className={`font-semibold ${patient.allergies === "Aucune" ? "text-green-600" : "text-red-600"}`}>
                {patient.allergies}
              </p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Antécédents / Conditions</p>
              <p className="font-semibold text-gray-800">{patient.conditions}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Historique récent */}
      <div className="mt-10">
        <h3 className="text-xl font-bold text-blue-700 mb-5 flex items-center gap-2">
          <Stethoscope className="w-5 h-5" />
          Historique médical récent
        </h3>
        <div className="space-y-4">
          {patient.history.map((item: any, i: number) => (
            <div
              key={i}
              className="bg-white border border-blue-50 rounded-xl p-5 shadow-sm hover:shadow transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-gray-800">{item.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{item.details}</p>
                </div>
                <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                  {item.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}