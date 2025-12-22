"use client";

import React, { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  MapPin,
  Activity,
  AlertTriangle,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Wrench,
} from "lucide-react";
import { motion } from "framer-motion";

/* =====================
   Mock data
===================== */
const mockVehicles = [
  {
    id: "veh-001",
    licensePlate: "AB-123-CD",
    brand: "Renault",
    model: "Kangoo",
    type: "VAN",
    fleetId: "fleet-001",
    fleetName: "Flotte Paris Centre",
    assignedDriver: { name: "Jean Dupont" },
    status: true,
    currentSpeed: 85,
    maintenanceStatus: "UP_TO_DATE",
    currentLocation: "Paris → Rouen",
  },
].concat(
  Array(19)
    .fill(null)
    .map((_, i) => ({
      id: `veh-${i + 2}`,
      licensePlate: `PL-${100 + i}-XX`,
      brand: ["Renault", "Peugeot", "Citroën", "Mercedes"][i % 4],
      model: `Modèle ${i + 1}`,
      type: ["CAR", "VAN", "TRUCK", "BIKE"][i % 4],
      fleetId: "fleet-001",
      fleetName: "Flotte Paris Centre",
      assignedDriver: i % 3 === 0 ? null : { name: `Conducteur ${i + 1}` },
      status: i % 5 !== 0,
      currentSpeed: Math.floor(Math.random() * 120),
      maintenanceStatus: ["UP_TO_DATE", "PENDING", "OVERDUE", "IN_PROGRESS"][i % 4],
      currentLocation: `Localisation ${i + 1}`,
    }))
);

const vehiclesPerPage = 10;

export default function VehiclesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFleet, setSelectedFleet] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedMaintenance, setSelectedMaintenance] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  /* =====================
     Filters
  ===================== */
  const filteredVehicles = mockVehicles.filter((veh) => {
    const matchesSearch =
      veh.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      veh.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      veh.model.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFleet = selectedFleet === "all" || veh.fleetId === selectedFleet;
    const matchesType = selectedType === "all" || veh.type === selectedType;
    const matchesStatus =
      selectedStatus === "all" ||
      (selectedStatus === "active" ? veh.status : !veh.status);
    const matchesMaintenance =
      selectedMaintenance === "all" ||
      veh.maintenanceStatus === selectedMaintenance;

    return (
      matchesSearch &&
      matchesFleet &&
      matchesType &&
      matchesStatus &&
      matchesMaintenance
    );
  });

  const totalPages = Math.ceil(filteredVehicles.length / vehiclesPerPage);
  const paginatedVehicles = filteredVehicles.slice(
    (currentPage - 1) * vehiclesPerPage,
    currentPage * vehiclesPerPage
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen p-4 md:p-6 lg:p-8"
    >
      {/* ===== Header ===== */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Véhicules</h1>
          <p className="mt-2 text-text-secondary">
            Liste et suivi en temps réel
          </p>
        </div>
        <button className="flex items-center gap-2 px-5 py-3 rounded-lg bg-primary hover:bg-primary-hover text-white font-bold transition-colors">
          <Plus className="w-5 h-5" />
          Ajouter un véhicule
        </button>
      </div>

      {/* ===== Filters ===== */}
      <div className="bg-surface rounded-xl border border-border-default shadow-sm p-6 mb-8">
        <h2 className="text-lg font-semibold text-text-primary flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5" /> Filtres
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher plaque, marque..."
              className="pl-10 pr-4 py-3 w-full rounded-lg border border-border-default bg-background text-text-primary
                         focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
            />
          </div>

          {[
            [selectedFleet, setSelectedFleet, "Toutes les flottes"],
            [selectedType, setSelectedType, "Tous les types"],
            [selectedStatus, setSelectedStatus, "Tous les statuts"],
            [selectedMaintenance, setSelectedMaintenance, "Toutes maintenances"],
          ].map(([value, setter, label], i) => (
            <select
              key={i}
              value={value as string}
              onChange={(e) => (setter as any)(e.target.value)}
              className="px-4 py-3 rounded-lg border border-border-default bg-background text-text-primary
                         focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
            >
              <option value="all">{label}</option>
            </select>
          ))}
        </div>
      </div>

      {/* ===== Layout ===== */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* ===== Table ===== */}
        <div className="xl:col-span-2 bg-surface rounded-xl border border-border-default shadow-sm">
          <div className="p-6 border-b border-border-default text-sm text-text-secondary">
            {filteredVehicles.length} véhicule(s) trouvé(s)
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border-default text-text-secondary">
                <tr>
                  {[
                    "Plaque",
                    "Marque / Modèle",
                    "Type",
                    "Flotte",
                    "Conducteur",
                    "Statut",
                    "Vitesse",
                    "Maintenance",
                    "Actions",
                  ].map((h) => (
                    <th key={h} className="px-6 py-4 font-medium">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {paginatedVehicles.map((v) => (
                  <tr
                    key={v.id}
                    className="border-b border-border-default hover:bg-background-secondary transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-text-primary">
                      {v.licensePlate}
                    </td>
                    <td className="px-6 py-4">
                      {v.brand} {v.model}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full bg-background-secondary text-xs">
                        {v.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">{v.fleetName}</td>
                    <td className="px-6 py-4">
                      {v.assignedDriver?.name || "-"}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block w-2 h-2 rounded-full mr-2 ${
                          v.status ? "bg-success" : "bg-text-disabled"
                        }`}
                      />
                      {v.status ? "Actif" : "Inactif"}
                    </td>
                    <td className="px-6 py-4">{v.currentSpeed} km/h</td>
                    <td className="px-6 py-4 flex items-center gap-2">
                      {v.maintenanceStatus === "OVERDUE" && (
                        <AlertTriangle className="w-5 h-5 text-error" />
                      )}
                      {v.maintenanceStatus === "PENDING" && (
                        <Wrench className="w-5 h-5 text-warning" />
                      )}
                      <span>{v.maintenanceStatus}</span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="p-2 rounded-lg hover:bg-background-secondary">
                        <MoreVertical className="w-5 h-5 text-text-tertiary" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-6 flex justify-between items-center border-t border-border-default">
            <span className="text-sm text-text-secondary">
              Page {currentPage} / {totalPages}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="p-2 rounded-lg hover:bg-background-secondary"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                className="p-2 rounded-lg hover:bg-background-secondary"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* ===== Map ===== */}
        <div className="bg-surface rounded-xl border border-border-default shadow-sm p-6">
          <div className="flex justify-between mb-6">
            <h2 className="font-semibold text-text-primary flex items-center gap-2">
              <MapPin className="w-5 h-5" /> Carte en temps réel
            </h2>
            <span className="text-sm text-text-secondary">
              {filteredVehicles.filter((v) => v.status).length} actifs
            </span>
          </div>

          <div className="h-96 bg-background-secondary border border-border-default rounded-lg flex flex-col items-center justify-center text-center">
            <Activity className="w-12 h-12 text-text-tertiary mb-4" />
            <p className="font-medium text-text-primary">
              Carte globale interactive
            </p>
            <p className="text-sm text-text-secondary mt-1">
              Intégration Mapbox / Leaflet prête
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
