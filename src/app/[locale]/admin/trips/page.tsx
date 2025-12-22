"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Route,
  Activity,
  Search,
  Filter,
  MapPin,
  Clock,
  Gauge,
  ChevronLeft,
  ChevronRight,
  Car,
  User,
} from "lucide-react";
import { motion } from "framer-motion";

/* =======================
   Mock data
======================= */
const mockTrips = [
  {
    id: "trip-1001",
    vehicleLicensePlate: "AB-123-CD",
    driverName: "Jean Dupont",
    startDate: "2025-12-22",
    startTime: "08:30",
    endDate: "2025-12-22",
    endTime: "11:45",
    distance: 185,
    duration: 195,
    status: "COMPLETED" as const,
  },
  {
    id: "trip-1002",
    vehicleLicensePlate: "EF-456-GH",
    driverName: "Marie Curie",
    startDate: "2025-12-22",
    startTime: "09:15",
    endDate: null,
    endTime: null,
    distance: 42,
    duration: null,
    status: "ONGOING" as const,
  },
  ...Array(18).fill(null).map((_, i) => ({
    id: `trip-${1003 + i}`,
    vehicleLicensePlate: `PL-${100 + i}-XX`,
    driverName: `Conducteur ${i + 1}`,
    startDate: `2025-12-${String(20 + (i % 5)).padStart(2, "0")}`,
    startTime: `${String(8 + (i % 6)).padStart(2, "0")}:00`,
    endDate: i % 3 === 0 ? null : `2025-12-${String(20 + (i % 5)).padStart(2, "0")}`,
    endTime: i % 3 === 0 ? null : `${String(12 + (i % 6)).padStart(2, "0")}:30`,
    distance: Math.floor(Math.random() * 300) + 20,
    duration: i % 3 === 0 ? null : Math.floor(Math.random() * 240) + 60,
    status: ["COMPLETED", "ONGOING", "CANCELLED"][i % 3] as const,
  })),
];

const tripsPerPage = 10;

export default function TripsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  /* =======================
     Stats
  ======================= */
  const todayTrips = mockTrips.filter(t => t.startDate === "2025-12-22").length;
  const ongoingTrips = mockTrips.filter(t => t.status === "ONGOING").length;
  const totalDistanceToday = mockTrips
    .filter(t => t.startDate === "2025-12-22")
    .reduce((sum, t) => sum + t.distance, 0);

  /* =======================
     Filtering
  ======================= */
  const filteredTrips = mockTrips.filter(trip => {
    const matchesSearch =
      trip.vehicleLicensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.driverName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDate =
      (!dateFrom || trip.startDate >= dateFrom) &&
      (!dateTo || trip.startDate <= dateTo);

    const matchesStatus =
      selectedStatus === "all" || trip.status === selectedStatus;

    return matchesSearch && matchesDate && matchesStatus;
  });

  /* =======================
     Pagination
  ======================= */
  const totalPages = Math.ceil(filteredTrips.length / tripsPerPage);
  const paginatedTrips = filteredTrips.slice(
    (currentPage - 1) * tripsPerPage,
    currentPage * tripsPerPage
  );

  const getStatusClasses = (status: string) => {
    switch (status) {
      case "ONGOING":
        return "bg-info-light text-info";
      case "COMPLETED":
        return "bg-success-light text-success";
      case "CANCELLED":
        return "bg-error-light text-error";
      default:
        return "bg-background-secondary text-text-secondary";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen p-4 md:p-6 lg:p-8"
    >
      {/* ===== Header ===== */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary">Trajets</h1>
        <p className="mt-2 text-text-secondary">
          Historique et détails des déplacements
        </p>
      </div>

      {/* ===== Stats ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: "Trajets aujourd'hui", value: todayTrips, icon: Route },
          { label: "En cours", value: ongoingTrips, icon: Activity },
          { label: "Distance aujourd'hui", value: `${totalDistanceToday} km`, icon: Gauge },
          { label: "Temps total conduite", value: "~48h", icon: Clock },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="bg-surface border border-border-default rounded-xl p-6 shadow-sm">
            <Icon className="w-7 h-7 text-primary mb-3" />
            <p className="text-2xl font-bold text-text-primary">{value}</p>
            <p className="text-sm text-text-secondary">{label}</p>
          </div>
        ))}
      </div>

      {/* ===== Filters ===== */}
      <div className="bg-surface border border-border-default rounded-xl p-6 shadow-sm mb-8">
        <h2 className="text-lg font-semibold text-text-primary flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5" /> Filtres
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
            <input
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Plaque ou conducteur…"
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-border-default
                         bg-background text-text-primary
                         focus:border-primary focus:ring-1 focus:ring-primary outline-none"
            />
          </div>

          <input
            type="date"
            value={dateFrom}
            onChange={e => setDateFrom(e.target.value)}
            className="px-4 py-2 rounded-lg border border-border-default bg-background text-text-primary
                       focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          />

          <select
            value={selectedStatus}
            onChange={e => setSelectedStatus(e.target.value)}
            className="px-4 py-2 rounded-lg border border-border-default bg-background text-text-primary
                       focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          >
            <option value="all">Tous statuts</option>
            <option value="ONGOING">En cours</option>
            <option value="COMPLETED">Terminé</option>
            <option value="CANCELLED">Annulé</option>
          </select>
        </div>
      </div>

      {/* ===== Table + Map ===== */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* ===== Table ===== */}
        <div className="xl:col-span-2 bg-surface border border-border-default rounded-xl shadow-sm">
          <div className="p-6 border-b border-border-default text-sm text-text-secondary">
            {filteredTrips.length} trajet(s) trouvé(s)
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="text-sm text-text-secondary border-b border-border-default">
                <tr>
                  {["Véhicule", "Conducteur", "Départ", "Arrivée", "Distance", "Durée", "Statut", "Actions"].map(h => (
                    <th key={h} className="px-6 py-4 font-medium text-left">{h}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {paginatedTrips.map(trip => (
                  <tr key={trip.id} className="border-b border-border-default hover:bg-background-secondary transition-colors">
                    <td className="px-6 py-4 flex items-center gap-2 font-medium text-text-primary">
                      <Car className="w-4 h-4 text-text-tertiary" />
                      {trip.vehicleLicensePlate}
                    </td>
                    <td className="px-6 py-4 flex items-center gap-2">
                      <User className="w-4 h-4 text-text-tertiary" />
                      {trip.driverName}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium">{trip.startDate}</p>
                      <p className="text-sm text-text-secondary">{trip.startTime}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-text-secondary">
                      {trip.endDate ?? "En cours"}
                    </td>
                    <td className="px-6 py-4 font-medium">{trip.distance} km</td>
                    <td className="px-6 py-4 text-sm">
                      {trip.duration ? `${Math.floor(trip.duration / 60)}h ${trip.duration % 60}min` : "-"}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusClasses(trip.status)}`}>
                        {trip.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Link href={`/admin/trips/${trip.id}`} className="text-primary hover:underline text-sm font-medium">
                        Détails →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-6 border-t border-border-default flex items-center justify-between">
            <p className="text-sm text-text-secondary">
              Page {currentPage} / {totalPages || 1}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg hover:bg-background-secondary disabled:opacity-50"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg hover:bg-background-secondary disabled:opacity-50"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* ===== Map ===== */}
        <div className="bg-surface border border-border-default rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-text-primary flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5" /> Carte des trajets
          </h2>

          <div className="h-96 rounded-lg border border-border-default bg-background-secondary
                          flex items-center justify-center text-center">
            <div>
              <Route className="w-12 h-12 text-text-tertiary mx-auto mb-3" />
              <p className="font-medium text-text-primary">Carte globale interactive</p>
              <p className="text-sm text-text-secondary mt-1">
                Intégration Leaflet / Mapbox prête
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
