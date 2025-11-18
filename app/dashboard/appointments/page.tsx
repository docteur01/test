"use client";

import React, { useState } from "react";
import { CalendarDays, Plus, Clock, User, MoreVertical } from "lucide-react";

export default function AppointmentsPage() {
  const [appointments] = useState([
    {
      id: "rdv1",
      patient: "Kamdem Arnaud",
      heure: "09:00",
      motif: "Consultation générale",
      statut: "confirmé",
    },
    {
      id: "rdv2",
      patient: "Brigitte Nguemegne",
      heure: "10:30",
      motif: "Suivi tension artérielle",
      statut: "en_attente",
    },
    {
      id: "rdv3",
      patient: "Roland Mbatchou",
      heure: "13:00",
      motif: "Résultats examens",
      statut: "annulé",
    },
  ]);

  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case "confirmé":
        return "bg-green-100 text-green-700 border-green-200";
      case "en_attente":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "annulé":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const toggleDropdown = (id: string) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  return (
    <div className="p-6 mt-20 space-y-6">
      {/* --- Header --- */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-blue-700 flex items-center gap-2">
          <CalendarDays className="w-6 h-6" />
          Rendez-vous
        </h1>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors shadow-md hover:shadow-lg">
          <Plus className="w-4 h-4" />
          Nouveau rendez-vous
        </button>
      </div>

      {/* --- Planning du jour --- */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden">
        {/* Card Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-blue-700 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Planning du jour
          </h2>
        </div>

        {/* Card Content */}
        <div className="p-6 space-y-4">
          {appointments.length === 0 ? (
            <p className="text-sm text-gray-500">Aucun rendez-vous aujourd'hui.</p>
          ) : (
            <div className="space-y-4">
              {appointments.map((rdv) => (
                <div
                  key={rdv.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:gap-6">
                    <span className="text-lg font-semibold text-gray-800">{rdv.heure}</span>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                        <User className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{rdv.patient}</p>
                        <p className="text-sm text-gray-500">{rdv.motif}</p>
                      </div>
                    </div>
                  </div>

                  {/* --- Statut + Actions --- */}
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                        rdv.statut
                      )}`}
                    >
                      {rdv.statut.replace("_", " ").toUpperCase()}
                    </span>

                    {/* Dropdown Menu */}
                    <div className="relative">
                      <button
                        onClick={() => toggleDropdown(rdv.id)}
                        className="p-1 rounded-md hover:bg-gray-100 transition-colors"
                      >
                        <MoreVertical className="w-5 h-5 text-gray-600" />
                      </button>

                      {dropdownOpen === rdv.id && (
                        <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10 py-1">
                          <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                            Voir le dossier
                          </button>
                          <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                            Modifier le RDV
                          </button>
                          <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                            Annuler
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}