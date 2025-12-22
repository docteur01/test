"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  Building2,
  Users,
  Truck,
  Route,
  AlertTriangle,
  Calendar,
  Edit,
  Plus,
  Search,
  MapPin,
  Activity,
  MoreVertical,
  ArrowUpRight,
} from "lucide-react";
import { motion } from "framer-motion";

// Données mock pour la flotte fleet-001
const fleetData = {
  id: "fleet-001",
  name: "Flotte Paris Centre",
  creationDate: "2024-03-15",
  manager: {
    userId: "user-101",
    name: "Paul Durand",
    email: "paul.durand@entreprise.com",
    phone: "+33 6 12 34 56 78",
  },
  statistics: {
    totalVehicles: 45,
    activeVehicles: 38,
    ongoingTrips: 12,
    maintenanceAlerts: 4,
    totalMileageToday: 2847,
    averageSpeed: 62,
  },
};

// Véhicules mock appartenant à cette flotte
const fleetVehicles = [
  {
    id: "veh-001",
    licensePlate: "AB-123-CD",
    brand: "Renault",
    model: "Kangoo",
    type: "VAN",
    status: true,
    currentSpeed: 85,
    driverName: "Jean Dupont",
    location: "A13 vers Rouen",
  },
  {
    id: "veh-002",
    licensePlate: "EF-456-GH",
    brand: "Peugeot",
    model: "Expert",
    type: "VAN",
    status: true,
    currentSpeed: 0,
    driverName: "Marie Curie",
    location: "Entrepôt Paris 15",
  },
  {
    id: "veh-003",
    licensePlate: "XY-789-KL",
    brand: "Mercedes",
    model: "Sprinter",
    type: "TRUCK",
    status: false,
    currentSpeed: 0,
    driverName: null,
    location: "Garage maintenance",
  },
  {
    id: "veh-004",
    licensePlate: "MN-012-OP",
    brand: "Citroën",
    model: "Jumpy",
    type: "VAN",
    status: true,
    currentSpeed: 72,
    driverName: "Lucas Bernard",
    location: "Livraison centre Paris",
  },
];

export default function FleetDetailPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredVehicles = fleetVehicles.filter(
    (veh) =>
      veh.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      veh.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (veh.driverName && veh.driverName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const fleet = fleetData;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen p-4 md:p-6 lg:p-8 bg-background"
    >
      {/* En-tête avec breadcrumb et actions */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 text-sm text-text-secondary mb-3">
              <Link href="/admin/fleets" className="hover:text-primary transition-colors">
                Flottes
              </Link>
              <span>/</span>
              <span className="text-text-primary font-medium">{fleet.name}</span>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-4 rounded-xl bg-primary-light">
                <Building2 className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-text-primary">{fleet.name}</h1>
                <p className="text-text-secondary mt-1">ID: {fleet.id}</p>
              </div>
            </div>
          </div>

          <button className="flex items-center gap-2 px-5 py-3 bg-primary text-text-invert rounded-lg hover:bg-primary-hover transition-colors font-medium">
            <Edit className="w-5 h-5" />
            Modifier
          </button>
        </div>
      </div>

      {/* Infos manager et création */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-text-secondary">Manager responsable</p>
              <p className="font-semibold text-lg text-text-primary">{fleet.manager.name}</p>
              <p className="text-sm text-text-tertiary">{fleet.manager.email}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center gap-4">
            <Calendar className="w-8 h-8 text-text-secondary" />
            <div>
              <p className="text-sm text-text-secondary">Date de création</p>
              <p className="font-semibold text-lg text-text-primary">
                {new Date(fleet.creationDate).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Statut général</p>
              <p className="font-semibold text-lg text-success">Opérationnelle</p>
            </div>
            <Activity className="w-8 h-8 text-success" />
          </div>
        </div>
      </div>

      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <Truck className="w-8 h-8 text-primary" />
            <span className="text-sm text-success font-medium flex items-center gap-1">
              <ArrowUpRight className="w-4 h-4" /> +3
            </span>
          </div>
          <p className="text-2xl font-bold text-text-primary">{fleet.statistics.totalVehicles}</p>
          <p className="text-sm text-text-secondary">Véhicules totaux</p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <Activity className="w-8 h-8 text-success" />
          </div>
          <p className="text-2xl font-bold text-text-primary">{fleet.statistics.activeVehicles}</p>
          <p className="text-sm text-text-secondary">Véhicules actifs</p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <Route className="w-8 h-8 text-info" />
          </div>
          <p className="text-2xl font-bold text-text-primary">{fleet.statistics.ongoingTrips}</p>
          <p className="text-sm text-text-secondary">Trajets en cours</p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <AlertTriangle className="w-8 h-8 text-warning" />
          </div>
          <p className="text-2xl font-bold text-warning">{fleet.statistics.maintenanceAlerts}</p>
          <p className="text-sm text-text-secondary">Alertes maintenance</p>
        </div>
      </div>

      {/* Section : Carte en temps réel + Liste véhicules */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Carte placeholder */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-text-primary">Carte en temps réel</h2>
            <button className="text-sm text-primary hover:text-primary-hover font-medium">
              Actualiser
            </button>
          </div>
          <div className="h-96 bg-background-secondary border border-border rounded-lg flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-text-tertiary mx-auto mb-4" />
              <p className="text-text-primary font-medium">Carte interactive</p>
              <p className="text-sm text-text-secondary mt-1">
                {fleet.statistics.activeVehicles} véhicules localisés
              </p>
            </div>
          </div>
          <p className="text-xs text-text-tertiary text-center mt-4">
            Intégration Leaflet/Mapbox à venir
          </p>
        </div>

        {/* Liste des véhicules */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-text-primary">Véhicules de la flotte</h2>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-text-invert rounded-lg hover:bg-primary-hover text-sm font-medium">
              <Plus className="w-4 h-4" />
              Ajouter
            </button>
          </div>

          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
            <input
              type="text"
              placeholder="Rechercher un véhicule..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 w-full rounded-md border border-border focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary bg-background text-text-primary transition-colors"
            />
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredVehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-surface-hover transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-3 h-3 rounded-full ${vehicle.status ? "bg-success" : "bg-text-disabled"}`}
                  />
                  <div>
                    <p className="font-medium text-text-primary">{vehicle.licensePlate}</p>
                    <p className="text-sm text-text-secondary">
                      {vehicle.brand} {vehicle.model} • {vehicle.type}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  {vehicle.status ? (
                    <>
                      <p className="font-medium text-text-primary">{vehicle.currentSpeed} km/h</p>
                      <p className="text-sm text-text-secondary">{vehicle.driverName || "Sans conducteur"}</p>
                    </>
                  ) : (
                    <p className="text-sm text-text-tertiary">Hors service</p>
                  )}
                </div>

                <button className="p-2 rounded-lg hover:bg-background-secondary transition-colors">
                  <MoreVertical className="w-5 h-5 text-text-secondary" />
                </button>
              </div>
            ))}
          </div>

          <Link
            href="/admin/vehicles"
            className="block text-center text-sm text-primary hover:text-primary-hover font-medium mt-4"
          >
            Voir tous les véhicules →
          </Link>
        </div>
      </div>

      {/* Pied de page */}
      <div className="pt-8 border-t border-border text-center text-sm text-text-secondary">
        <p>Dernière mise à jour : {new Date().toLocaleTimeString("fr-FR")}</p>
      </div>
    </motion.div>
  );
}
