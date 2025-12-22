"use client";
import React, { useState } from "react";
import {
  Link2,
  Search,
  Plus,
  Users,
  Building2,
  X,
  Check,
} from "lucide-react";
import { motion } from "framer-motion";

// Données mock : liaisons entre flottes et managers
const mockAssignments = [
  {
    fleetId: "fleet-001",
    fleetName: "Flotte Paris Centre",
    managers: [
      { userId: "usr-002", name: "Paul Durand", email: "paul.durand@entreprise.com" },
      { userId: "usr-004", name: "Emma Dubois", email: "emma.dubois@entreprise.com" },
    ],
  },
  {
    fleetId: "fleet-002",
    fleetName: "Flotte Lyon Logistique",
    managers: [
      { userId: "usr-003", name: "Sophie Martin", email: "sophie.martin@entreprise.com" },
    ],
  },
  {
    fleetId: "fleet-003",
    fleetName: "Flotte Marseille Express",
    managers: [
      { userId: "usr-002", name: "Paul Durand", email: "paul.durand@entreprise.com" },
    ],
  },
  {
    fleetId: "fleet-004",
    fleetName: "Flotte Nord Transport",
    managers: [],
  },
];

// Liste des utilisateurs éligibles comme managers
const availableManagers = [
  { userId: "usr-002", name: "Paul Durand", email: "paul.durand@entreprise.com" },
  { userId: "usr-003", name: "Sophie Martin", email: "sophie.martin@entreprise.com" },
  { userId: "usr-004", name: "Emma Dubois", email: "emma.dubois@entreprise.com" },
  { userId: "usr-005", name: "Lucas Moreau", email: "lucas.moreau@entreprise.com" },
];

export default function FleetAssignmentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedFleets, setSelectedFleets] = useState<string[]>([]);

  // Stats rapides
  const totalFleets = mockAssignments.length;
  const fleetsWithManager = mockAssignments.filter(f => f.managers.length > 0).length;
  const totalAssignments = mockAssignments.reduce((sum, f) => sum + f.managers.length, 0);

  // Filtrage
  const filteredAssignments = mockAssignments.filter(
    (assignment) =>
      assignment.fleetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.managers.some(m => 
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const toggleFleetSelection = (fleetId: string) => {
    setSelectedFleets(prev =>
      prev.includes(fleetId)
        ? prev.filter(id => id !== fleetId)
        : [...prev, fleetId]
    );
  };

  const handleAssign = () => {
    if (selectedUser && selectedFleets.length > 0) {
      console.log("Assigner", selectedUser, "aux flottes", selectedFleets);
      setIsAssignModalOpen(false);
      setSelectedUser("");
      setSelectedFleets([]);
    }
  };

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
            <h1 className="text-3xl font-bold text-text-primary">Assignation Flottes</h1>
            <p className="text-text-secondary mt-2">Liaison entre utilisateurs et flottes</p>
          </div>
          <button
            onClick={() => setIsAssignModalOpen(true)}
            className="flex items-center gap-2 px-5 py-3 bg-primary hover:bg-primary-hover text-text-invert rounded-lg transition-colors font-medium"
          >
            <Plus className="w-5 h-5" />
            Assigner un manager
          </button>
        </div>
      </div>

      {/* Stats rapides */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Flottes totales</p>
              <p className="text-3xl font-bold mt-1">{totalFleets}</p>
            </div>
            <div className="p-3 rounded-lg bg-primary-light">
              <Building2 className="w-8 h-8 text-primary" />
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Avec manager</p>
              <p className="text-3xl font-bold mt-1 text-success">{fleetsWithManager}</p>
            </div>
            <div className="p-3 rounded-lg bg-success-light">
              <Link2 className="w-8 h-8 text-success" />
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Assignations totales</p>
              <p className="text-3xl font-bold mt-1">{totalAssignments}</p>
            </div>
            <div className="p-3 rounded-lg bg-info-light">
              <Users className="w-8 h-8 text-info" />
            </div>
          </div>
        </div>
      </div>

      {/* Recherche */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
          <input
            type="text"
            placeholder="Rechercher une flotte ou un manager..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-3 w-full rounded-lg border border-border focus:outline-none focus:ring-1 focus:ring-primary bg-background text-text-primary transition-colors"
          />
        </div>
      </div>

      {/* Tableau des assignations */}
      <div className="card overflow-x-auto">
        <table className="w-full">
          <thead className="bg-background-secondary border-b border-border">
            <tr>
              <th className="text-left px-6 py-4 font-medium text-text-secondary">Flotte</th>
              <th className="text-left px-6 py-4 font-medium text-text-secondary">Managers assignés</th>
              <th className="text-center px-6 py-4 font-medium text-text-secondary">Nombre</th>
              <th className="text-left px-6 py-4 font-medium text-text-secondary">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAssignments.map((assignment) => (
              <tr key={assignment.fleetId} className="border-b border-border hover:bg-background-tertiary transition-colors">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary-light">
                      <Building2 className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-text-primary">{assignment.fleetName}</p>
                      <p className="text-sm text-text-secondary">ID: {assignment.fleetId}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  {assignment.managers.length > 0 ? (
                    <div className="flex items-center gap-2 flex-wrap">
                      {assignment.managers.map((manager) => (
                        <div
                          key={manager.userId}
                          className="flex items-center gap-2 bg-background-secondary px-3 py-1.5 rounded-lg"
                        >
                          <div className="w-6 h-6 bg-border rounded-full flex items-center justify-center text-xs font-medium text-text-primary">
                            {manager.name.charAt(0)}
                          </div>
                          <p className="text-sm font-medium text-text-primary">{manager.name}</p>
                          <button className="ml-2 text-error hover:opacity-80 transition-opacity">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span className="text-sm italic text-text-tertiary">Aucun manager assigné</span>
                  )}
                </td>
                <td className="px-6 py-5 text-center font-medium text-text-primary">
                  {assignment.managers.length}
                </td>
                <td className="px-6 py-5">
                  <button
                    onClick={() => setIsAssignModalOpen(true)}
                    className="text-primary hover:text-primary-hover font-medium text-sm"
                  >
                    Gérer →
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal d'assignation */}
      {isAssignModalOpen && (
        <div className="fixed inset-0 bg-overlay flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-surface rounded-xl shadow-xl max-w-lg w-full p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-text-primary">Assigner un manager à des flottes</h2>
              <button
                onClick={() => {
                  setIsAssignModalOpen(false);
                  setSelectedUser("");
                  setSelectedFleets([]);
                }}
                className="p-2 rounded-lg hover:bg-background-secondary transition-colors"
              >
                <X className="w-5 h-5 text-text-secondary" />
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Sélectionner un utilisateur (manager)
                </label>
                <select
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-1 focus:ring-primary bg-background text-text-primary transition-colors"
                >
                  <option value="">Choisir un manager...</option>
                  {availableManagers.map((user) => (
                    <option key={user.userId} value={user.userId}>
                      {user.name} ({user.email})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Sélectionner une ou plusieurs flottes
                </label>
                <div className="space-y-2 max-h-64 overflow-y-auto border border-border rounded-lg p-4 bg-background-secondary">
                  {mockAssignments.map((fleet) => (
                    <label
                      key={fleet.fleetId}
                      className="flex items-center justify-between cursor-pointer hover:bg-background-tertiary px-3 py-2 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selectedFleets.includes(fleet.fleetId)}
                          onChange={() => toggleFleetSelection(fleet.fleetId)}
                          className="w-4 h-4 text-primary rounded focus:ring-primary"
                        />
                        <span className="font-medium text-text-primary">{fleet.fleetName}</span>
                      </div>
                      <span className="text-sm text-text-secondary">
                        {fleet.managers.length} manager{fleet.managers.length > 1 ? "s" : ""}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    setIsAssignModalOpen(false);
                    setSelectedUser("");
                    setSelectedFleets([]);
                  }}
                  className="flex-1 py-3 px-5 border border-border rounded-lg hover:bg-background-secondary transition-colors font-medium text-text-primary"
                >
                  Annuler
                </button>
                <button
                  onClick={handleAssign}
                  disabled={!selectedUser || selectedFleets.length === 0}
                  className="flex-1 py-3 px-5 bg-primary text-text-invert rounded-lg hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <Check className="w-5 h-5" />
                  Assigner
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
