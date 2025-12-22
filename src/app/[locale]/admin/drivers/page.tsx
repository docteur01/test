"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  Users,
  Plus,
  Search,
  Filter,
  Phone,
  Mail,
  Car,
  Activity,
  AlertTriangle,
  MoreVertical,
  UserCheck,
  UserX,
} from "lucide-react";
import { motion } from "framer-motion";

// Données mock basées sur tes types Driver + DriverActivity
const mockDrivers = [
  {
    userId: "drv-001",
    name: "Jean Dupont",
    phone: "+33 6 12 34 56 78",
    email: "jean.dupont@entreprise.com",
    licenceNumber: "LIC-789456",
    status: true,
    currentStatus: "driving" as const,
    assignedVehicle: { licensePlate: "AB-123-CD", brand: "Renault", model: "Kangoo" },
    fleetName: "Flotte Paris Centre",
    safetyScore: 94,
    todayTrips: 3,
    todayDistance: 185,
  },
  {
    userId: "drv-002",
    name: "Marie Curie",
    phone: "+33 6 98 76 54 32",
    email: "marie.curie@entreprise.com",
    licenceNumber: "LIC-123987",
    status: true,
    currentStatus: "idle" as const,
    assignedVehicle: { licensePlate: "EF-456-GH", brand: "Peugeot", model: "Expert" },
    fleetName: "Flotte Paris Centre",
    safetyScore: 88,
    todayTrips: 1,
    todayDistance: 42,
  },
  {
    userId: "drv-003",
    name: "Pierre Martin",
    phone: "+33 6 55 44 33 22",
    email: "pierre.martin@entreprise.com",
    licenceNumber: "LIC-456789",
    status: false,
    currentStatus: "offline" as const,
    assignedVehicle: null,
    fleetName: "Flotte Lyon Logistique",
    safetyScore: 72,
    todayTrips: 0,
    todayDistance: 0,
  },
  {
    userId: "drv-004",
    name: "Sophie Bernard",
    phone: "+33 6 11 22 33 44",
    email: "sophie.bernard@entreprise.com",
    licenceNumber: "LIC-654321",
    status: true,
    currentStatus: "on-break" as const,
    assignedVehicle: { licensePlate: "XY-789-KL", brand: "Mercedes", model: "Sprinter" },
    fleetName: "Flotte Marseille Express",
    safetyScore: 97,
    todayTrips: 4,
    todayDistance: 312,
  },
  ...Array(6)
    .fill(null)
    .map((_, i) => ({
      userId: `drv-00${i + 5}`,
      name: `Conducteur ${i + 5} Nom`,
      phone: `+33 6 ${String(i + 10).padStart(2, "0")} ${String(i + 20).padStart(
        2,
        "0"
      )} ${String(i + 30).padStart(2, "0")} ${String(i + 40).padStart(2, "0")}`,
      email: `conducteur${i + 5}@entreprise.com`,
      licenceNumber: `LIC-${100000 + i * 1111}`,
      status: i % 3 !== 1,
      currentStatus: (["driving", "idle", "on-break", "offline"] as const)[i % 4],
      assignedVehicle: i % 4 === 0 ? null : { licensePlate: `PL-${i + 100}-ZZ`, brand: "Citroën", model: "Jumpy" },
      fleetName: ["Flotte Paris Centre", "Flotte Lyon Logistique"][i % 2],
      safetyScore: Math.floor(Math.random() * 30) + 70,
      todayTrips: Math.floor(Math.random() * 6),
      todayDistance: Math.floor(Math.random() * 400),
    })),
];

export default function DriversPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [vehicleFilter, setVehicleFilter] = useState("all");
  const [activityFilter, setActivityFilter] = useState("all");

  // Statistiques rapides
  const totalDrivers = mockDrivers.length;
  const activeDrivers = mockDrivers.filter((d) => d.status).length;
  const drivingNow = mockDrivers.filter((d) => d.currentStatus === "driving").length;

  // Filtrage
  const filteredDrivers = mockDrivers.filter((driver) => {
    const matchesSearch =
      driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.phone.includes(searchTerm) ||
      driver.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" ? driver.status : !driver.status);
    const matchesVehicle =
      vehicleFilter === "all" ||
      (vehicleFilter === "with-vehicle" ? driver.assignedVehicle !== null : driver.assignedVehicle === null);
    const matchesActivity = activityFilter === "all" || driver.currentStatus === activityFilter;
    return matchesSearch && matchesStatus && matchesVehicle && matchesActivity;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "driving":
        return "bg-blue-500";
      case "idle":
        return "bg-green-500";
      case "on-break":
        return "bg-orange-500";
      case "offline":
        return "bg-gray-400";
      default:
        return "bg-gray-400";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "driving":
        return "En trajet";
      case "idle":
        return "Disponible";
      case "on-break":
        return "En pause";
      case "offline":
        return "Hors ligne";
      default:
        return "Inconnu";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen p-4 md:p-6 lg:p-8 bg-surface text-text-primary"
    >
      {/* En-tête */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">{`Conducteurs`}</h1>
            <p className="text-text-secondary mt-2">Gestion et assignation des conducteurs</p>
          </div>
          <button className="flex items-center gap-2 px-5 py-3 bg-primary text-on-primary rounded-lg hover:bg-primary-hover transition-colors font-medium">
            <Plus className="w-5 h-5" />
            Ajouter un conducteur
          </button>
        </div>
      </div>

      {/* Stats rapides */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-surface-secondary rounded-xl shadow-sm border border-border-default p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Conducteurs totaux</p>
              <p className="text-3xl font-bold mt-1">{totalDrivers}</p>
            </div>
            <Users className="w-10 h-10 text-primary" />
          </div>
        </div>
        <div className="bg-surface-secondary rounded-xl shadow-sm border border-border-default p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Actifs</p>
              <p className="text-3xl font-bold mt-1 text-green-500">{activeDrivers}</p>
            </div>
            <UserCheck className="w-10 h-10 text-green-500" />
          </div>
        </div>
        <div className="bg-surface-secondary rounded-xl shadow-sm border border-border-default p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">En trajet actuellement</p>
              <p className="text-3xl font-bold mt-1 text-blue-500">{drivingNow}</p>
            </div>
            <Activity className="w-10 h-10 text-blue-500" />
          </div>
        </div>
      </div>

      {/* Filtres */}
      <div className="bg-surface-secondary rounded-xl shadow-sm border border-border-default p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Filter className="w-5 h-5" /> Filtres
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
            <input
              type="text"
              placeholder="Rechercher nom, téléphone, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 w-full rounded-lg border border-border-default
                         bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 bg-surface text-text-primary rounded-lg border border-border-default focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">Tous les statuts</option>
            <option value="active">Actif</option>
            <option value="inactive">Inactif</option>
          </select>
          <select
            value={vehicleFilter}
            onChange={(e) => setVehicleFilter(e.target.value)}
            className="px-4 py-3 bg-surface text-text-primary rounded-lg border border-border-default focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">Tous véhicules</option>
            <option value="with-vehicle">Avec véhicule</option>
            <option value="without-vehicle">Sans véhicule</option>
          </select>
          <select
            value={activityFilter}
            onChange={(e) => setActivityFilter(e.target.value)}
            className="px-4 py-3 bg-surface text-text-primary rounded-lg border border-border-default focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">Toutes activités</option>
            <option value="driving">En trajet</option>
            <option value="idle">Disponible</option>
            <option value="on-break">En pause</option>
            <option value="offline">Hors ligne</option>
          </select>
        </div>
      </div>

      {/* Liste des conducteurs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredDrivers.map((driver) => (
          <div
            key={driver.userId}
            className="bg-surface-secondary rounded-xl shadow-sm border border-border-default p-6 hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-surface rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-text-tertiary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{driver.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(driver.currentStatus)}`} />
                    <span className="text-sm text-text-secondary">{getStatusLabel(driver.currentStatus)}</span>
                  </div>
                </div>
              </div>
              <button className="p-2 rounded-lg hover:bg-surface hover:shadow-sm transition-colors">
                <MoreVertical className="w-5 h-5 text-text-tertiary" />
              </button>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-text-secondary">
                <Phone className="w-4 h-4" />
                <span>{driver.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-text-secondary">
                <Mail className="w-4 h-4" />
                <span className="truncate">{driver.email}</span>
              </div>

              {driver.assignedVehicle ? (
                <div className="flex items-center gap-2 text-text-primary">
                  <Car className="w-4 h-4" />
                  <div>
                    <p className="font-medium">{driver.assignedVehicle.licensePlate}</p>
                    <p className="text-xs text-text-secondary">{driver.assignedVehicle.brand} {driver.assignedVehicle.model}</p>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-text-secondary italic">Aucun véhicule assigné</p>
              )}

              <div className="pt-3 border-t border-border-default">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-text-secondary">Score sécurité</p>
                    <p className="font-semibold text-lg">
                      {driver.safetyScore}/100
                      {driver.safetyScore < 80 && <AlertTriangle className="w-4 h-4 text-orange-500 inline ml-1" />}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-text-secondary">Aujourd'hui</p>
                    <p className="font-medium">{driver.todayTrips} trajets</p>
                    <p className="text-xs text-text-secondary">{driver.todayDistance} km</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-5">
              <Link
                href={`/admin/drivers/${driver.userId}`}
                className="flex-1 text-center py-2 px-4 bg-primary-light text-primary rounded-lg hover:bg-primary transition-colors font-medium text-sm"
              >
                Voir profil
              </Link>
              <button className="p-2 rounded-lg hover:bg-surface hover:shadow-sm transition-colors">
                {driver.status ? <UserX className="w-5 h-5 text-red-600" /> : <UserCheck className="w-5 h-5 text-green-600" />}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredDrivers.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-text-tertiary mx-auto mb-4" />
          <p className="text-text-secondary">Aucun conducteur ne correspond à vos filtres</p>
        </div>
      )}
    </motion.div>
  );
}
