"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  Building2,
  Plus,
  Search,
  Edit,
  Trash2,
  Users,
  Calendar,
  Truck,
  MoreVertical,
  X,
} from "lucide-react";
import { motion } from "framer-motion";

// Données mock
const mockFleets = [
  {
    id: "fleet-001",
    name: "Flotte Paris Centre",
    manager: { userId: "user-101", name: "Paul Durand", email: "paul@entreprise.com" },
    creationDate: "2024-03-15",
    vehicleCount: 45,
  },
  {
    id: "fleet-002",
    name: "Flotte Lyon Logistique",
    manager: { userId: "user-102", name: "Sophie Martin", email: "sophie@entreprise.com" },
    creationDate: "2024-06-20",
    vehicleCount: 38,
  },
  {
    id: "fleet-003",
    name: "Flotte Marseille Express",
    manager: { userId: "user-103", name: "Lucas Bernard", email: "lucas@entreprise.com" },
    creationDate: "2025-01-10",
    vehicleCount: 22,
  },
  {
    id: "fleet-004",
    name: "Flotte Nord Transport",
    manager: { userId: "user-101", name: "Paul Durand", email: "paul@entreprise.com" },
    creationDate: "2023-11-05",
    vehicleCount: 61,
  },
];

export default function FleetsPage() {
  const [fleets] = useState(mockFleets);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingFleet, setEditingFleet] = useState<any>(null);

  const filteredFleets = fleets.filter(
    (fleet) =>
      fleet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fleet.manager.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen p-4 md:p-6 lg:p-8 bg-background"
    >
      {/* En-tête */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-text-primary">Flottes</h1>
            <p className="text-text-secondary mt-2">
              Création et gestion des flottes de véhicules
            </p>
          </div>
          <button
            onClick={() => {
              setEditingFleet(null);
              setIsCreateModalOpen(true);
            }}
            className="flex items-center gap-2 px-5 py-3 bg-primary text-text-invert rounded-lg hover:bg-primary-hover transition-colors font-medium"
          >
            <Plus className="w-5 h-5" />
            Nouvelle flotte
          </button>
        </div>
      </div>

      {/* Barre de recherche */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
          <input
            type="text"
            placeholder="Rechercher par nom ou manager..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-3 w-full rounded-lg border border-border-default
                       bg-background text-text-primary text-sm
                       focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary
                       transition-colors"
          />
        </div>
      </div>

      {/* Liste des flottes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFleets.map((fleet) => (
          <div
            key={fleet.id}
            className="bg-surface rounded-xl shadow-sm border border-border-default p-6 hover:shadow-md transition-all duration-300"
          >
            {/* Header carte */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-primary-light">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-text-primary">{fleet.name}</h3>
                  <p className="text-sm text-text-secondary">ID: {fleet.id}</p>
                </div>
              </div>
              <button className="p-2 rounded-lg hover:bg-background-secondary transition-colors">
                <MoreVertical className="w-5 h-5 text-text-secondary" />
              </button>
            </div>

            {/* Infos flotte */}
            <div className="space-y-3 mb-5">
              <div className="flex items-center gap-3 text-sm">
                <Users className="w-4 h-4 text-text-tertiary" />
                <div>
                  <p className="text-text-secondary">Manager</p>
                  <p className="font-medium text-text-primary">{fleet.manager.name}</p>
                  <p className="text-xs text-text-tertiary">{fleet.manager.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <Calendar className="w-4 h-4 text-text-tertiary" />
                <div>
                  <p className="text-text-secondary">Créée le</p>
                  <p className="font-medium text-text-primary">
                    {new Date(fleet.creationDate).toLocaleDateString("fr-FR")}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <Truck className="w-4 h-4 text-text-tertiary" />
                <div>
                  <p className="text-text-secondary">Véhicules</p>
                  <p className="font-medium text-xl text-text-primary">{fleet.vehicleCount}</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-4 border-t border-border-hover">
              <Link
                href={`/admin/fleets/${fleet.id}`}
                className="flex-1 text-center py-2 px-4 bg-primary-light text-primary rounded-lg hover:bg-primary transition-colors font-medium text-sm"
              >
                Voir détails
              </Link>
              <button
                onClick={() => {
                  setEditingFleet(fleet);
                  setIsCreateModalOpen(true);
                }}
                className="p-2 rounded-lg hover:bg-background-secondary transition-colors"
              >
                <Edit className="w-4 h-4 text-text-secondary" />
              </button>
              <button className="p-2 rounded-lg hover:bg-error-light transition-colors">
                <Trash2 className="w-4 h-4 text-error" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Création / Édition */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-overlay flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-surface rounded-xl shadow-xl max-w-md w-full p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-text-primary">
                {editingFleet ? "Modifier la flotte" : "Nouvelle flotte"}
              </h2>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-2 rounded-lg hover:bg-background-secondary transition-colors"
              >
                <X className="w-5 h-5 text-text-secondary" />
              </button>
            </div>

            <form className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Nom de la flotte
                </label>
                <input
                  type="text"
                  defaultValue={editingFleet?.name}
                  placeholder="Ex: Flotte Paris Centre"
                  className="w-full px-4 py-3 rounded-lg border border-border-default
                             bg-background text-text-primary
                             focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Manager responsable
                </label>
                <select
                  className="w-full px-4 py-3 rounded-lg border border-border-default
                             bg-background text-text-primary
                             focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                >
                  <option>Paul Durand</option>
                  <option>Sophie Martin</option>
                  <option>Lucas Bernard</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="flex-1 py-3 px-5 border border-border-default rounded-lg
                             hover:bg-background-secondary transition-colors font-medium"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 px-5 bg-primary text-text-invert rounded-lg
                             hover:bg-primary-hover transition-colors font-medium"
                >
                  {editingFleet ? "Enregistrer" : "Créer la flotte"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
