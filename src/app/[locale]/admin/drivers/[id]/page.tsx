"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  User,
  Phone,
  Mail,
  Calendar,
  Car,
  MapPin,
  Activity,
  AlertTriangle,
  Shield,
  Route,
  Clock,
  Edit,
  MessageSquare,
  Ban,
} from "lucide-react";
import { motion } from "framer-motion";

// Données mock pour le conducteur drv-001
const driverData = {
  userId: "drv-001",
  name: "Jean Dupont",
  phone: "+33 6 12 34 56 78",
  email: "jean.dupont@entreprise.com",
  avatar: null,
  licenceNumber: "LIC-789456",
  licenceExpiry: "2028-11-15",
  status: true,
  currentStatus: "driving" as const,
  assignedVehicle: {
    id: "veh-001",
    licensePlate: "AB-123-CD",
    brand: "Renault",
    model: "Kangoo",
    type: "VAN",
    imageUrl: null,
  },
  fleetName: "Flotte Paris Centre",
  statistics: {
    totalTrips: 842,
    totalDistance: 45620,
    totalDrivingTime: 1824,
    averageSpeed: 68,
    safetyScore: 94,
    geofenceViolations: 3,
    harshEvents: 12,
  },
  lastLocation: "A13 direction Rouen - 85 km/h",
};

// Derniers trajets mock
const recentTrips = [
  {
    id: "trip-1001",
    startDate: "2025-12-22",
    startTime: "08:30",
    endDate: "2025-12-22",
    endTime: "11:45",
    distance: 185,
    duration: 195,
    status: "COMPLETED",
    startLocation: "Paris Centre",
    endLocation: "Rouen",
  },
  {
    id: "trip-1002",
    startDate: "2025-12-21",
    startTime: "14:00",
    endDate: "2025-12-21",
    endTime: "16:30",
    distance: 142,
    duration: 150,
    status: "COMPLETED",
    startLocation: "Entrepôt Paris",
    endLocation: "Versailles",
  },
  {
    id: "trip-1003",
    startDate: "2025-12-21",
    startTime: "09:15",
    endDate: "2025-12-21",
    endTime: "10:20",
    distance: 68,
    duration: 65,
    status: "COMPLETED",
    startLocation: "Paris 15",
    endLocation: "Boulogne",
  },
];

export default function DriverDetailPage() {
  const driver = driverData;

  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedTime = now.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const getStatusColor = () => {
    switch (driver.currentStatus) {
      case "driving":
        return "bg-status-driving";
      case "idle":
        return "bg-status-available";
      case "on-break":
        return "bg-status-break";
      case "offline":
        return "bg-status-offline";
    }
  };

  const getStatusLabel = () => {
    switch (driver.currentStatus) {
      case "driving":
        return "En trajet";
      case "idle":
        return "Disponible";
      case "on-break":
        return "En pause";
      case "offline":
        return "Hors ligne";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen p-4 md:p-6 lg:p-8 bg-background text-text-primary"
    >
      {/* Breadcrumb et actions */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 text-sm text-text-secondary mb-3">
              <Link href="/admin/drivers" className="hover:text-primary transition-colors">
                Conducteurs
              </Link>
              <span>/</span>
              <span className="text-text-primary font-medium">{driver.name}</span>
            </div>
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 bg-surface rounded-full flex items-center justify-center">
                <User className="w-12 h-12 text-text-tertiary" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-bold">{driver.name}</h1>
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full ${getStatusColor()}`} />
                    <span className="text-lg font-medium">{getStatusLabel()}</span>
                  </div>
                </div>
                <p className="text-text-secondary mt-1">ID: {driver.userId}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="px-5 py-3 border border-border-default rounded-lg hover:bg-surface-secondary transition-colors font-medium flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Contacter
            </button>
            <button className="px-5 py-3 border border-border-default rounded-lg hover:bg-surface-secondary transition-colors font-medium flex items-center gap-2">
              <Edit className="w-5 h-5" />
              Modifier
            </button>
            <button className="px-5 py-3 border border-error text-error rounded-lg hover:bg-error/10 transition-colors font-medium flex items-center gap-2">
              <Ban className="w-5 h-5" />
              Suspendre
            </button>
          </div>
        </div>
      </div>

      {/* Infos personnelles et véhicule */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-surface rounded-xl shadow-sm border border-border-default p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-text-tertiary" /> Informations personnelles
          </h3>
          <div className="space-y-3 text-sm text-text-primary">
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-text-tertiary" />
              <span>{driver.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-text-tertiary" />
              <span>{driver.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="w-4 h-4 text-text-tertiary" />
              <div>
                <p className="text-text-secondary">Permis n° {driver.licenceNumber}</p>
                <p className="font-medium">Valable jusqu'au {new Date(driver.licenceExpiry).toLocaleDateString("fr-FR")}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-surface rounded-xl shadow-sm border border-border-default p-6 md:col-span-2">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Car className="w-5 h-5 text-text-tertiary" /> Véhicule assigné
          </h3>
          {driver.assignedVehicle ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-surface-secondary rounded-lg flex items-center justify-center">
                  <Car className="w-10 h-10 text-text-tertiary" />
                </div>
                <div>
                  <Link href={`/admin/vehicles/${driver.assignedVehicle.id}`} className="font-semibold text-xl text-primary hover:underline">
                    {driver.assignedVehicle.licensePlate}
                  </Link>
                  <p className="text-text-secondary">{driver.assignedVehicle.brand} {driver.assignedVehicle.model} • {driver.assignedVehicle.type}</p>
                  <p className="text-sm text-text-tertiary mt-1">Flotte : {driver.fleetName}</p>
                </div>
              </div>
              <button className="px-4 py-2 border border-border-default rounded-lg hover:bg-surface-secondary text-sm font-medium">
                Désassigner
              </button>
            </div>
          ) : (
            <p className="text-text-tertiary italic">Aucun véhicule assigné actuellement</p>
          )}
        </div>
      </div>

      {/* Statistiques de performance */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-surface rounded-xl shadow-sm border border-border-default p-6">
          <div className="flex items-center justify-between mb-3">
            <Route className="w-8 h-8 text-primary" />
          </div>
          <p className="text-2xl font-bold">{driver.statistics.totalTrips}</p>
          <p className="text-text-secondary text-sm">Trajets totaux</p>
        </div>

        <div className="bg-surface rounded-xl shadow-sm border border-border-default p-6">
          <div className="flex items-center justify-between mb-3">
            <MapPin className="w-8 h-8 text-success" />
          </div>
          <p className="text-2xl font-bold">{driver.statistics.totalDistance.toLocaleString()} km</p>
          <p className="text-text-secondary text-sm">Distance parcourue</p>
        </div>

        <div className="bg-surface rounded-xl shadow-sm border border-border-default p-6">
          <div className="flex items-center justify-between mb-3">
            <Clock className="w-8 h-8 text-accent" />
          </div>
          <p className="text-2xl font-bold">{driver.statistics.totalDrivingTime} h</p>
          <p className="text-text-secondary text-sm">Temps de conduite</p>
        </div>

        <div className="bg-surface rounded-xl shadow-sm border border-border-default p-6">
          <div className="flex items-center justify-between mb-3">
            <Shield className="w-8 h-8 text-warning" />
            {driver.statistics.safetyScore < 85 && <AlertTriangle className="w-6 h-6 text-warning" />}
          </div>
          <p className="text-2xl font-bold text-warning">{driver.statistics.safetyScore}/100</p>
          <p className="text-text-secondary text-sm">Score de sécurité</p>
        </div>
      </div>

      {/* Localisation actuelle + Carte */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-surface rounded-xl shadow-sm border border-border-default p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5" /> Position actuelle
          </h3>
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-4 h-4 rounded-full ${getStatusColor()} animate-pulse`} />
            <div>
              <p className="font-medium">{getStatusLabel()}</p>
              <p className="text-sm text-text-secondary">Mis à jour à {formattedTime}</p>
            </div>
          </div>
          <p className="text-text-primary bg-surface-secondary p-4 rounded-lg flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            {driver.lastLocation}
          </p>
        </div>

        <div className="bg-surface rounded-xl shadow-sm border border-border-default p-6">
          <h3 className="text-lg font-semibold mb-4">Trajet en cours / Dernière position</h3>
          <div className="h-80 bg-surface-secondary border-2 border-dashed border-border-default rounded-lg flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-text-tertiary mx-auto mb-4" />
              <p className="text-text-primary font-medium">Carte du trajet en temps réel</p>
              <p className="text-text-secondary text-sm mt-1">Intégration Leaflet/Mapbox à venir</p>
            </div>
          </div>
        </div>
      </div>

      {/* Derniers trajets */}
      <div className="bg-surface rounded-xl shadow-sm border border-border-default">
        <div className="p-6 border-b border-border-default">
          <h3 className="text-lg font-semibold">Derniers trajets</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-text-secondary border-b">
                <th className="pb-4 px-6 font-medium">Date / Heure</th>
                <th className="pb-4 px-6 font-medium">Trajet</th>
                <th className="pb-4 px-6 font-medium">Distance</th>
                <th className="pb-4 px-6 font-medium">Durée</th>
                <th className="pb-4 px-6 font-medium">Statut</th>
                <th className="pb-4 px-6 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentTrips.map((trip) => (
                <tr key={trip.id} className="border-b hover:bg-surface-secondary transition-colors">
                  <td className="py-4 px-6">
                    <p className="font-medium">{trip.startDate}</p>
                    <p className="text-sm text-text-secondary">{trip.startTime} → {trip.endTime || "-"}</p>
                  </td>
                  <td className="py-4 px-6">
                    {trip.startLocation} → {trip.endLocation}
                  </td>
                  <td className="py-4 px-6 font-medium">{trip.distance} km</td>
                  <td className="py-4 px-6">{Math.floor(trip.duration / 60)}h {trip.duration % 60}min</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      trip.status === "COMPLETED" ? "bg-success/20 text-success" : "bg-warning/20 text-warning"
                    }`}>
                      {trip.status === "COMPLETED" ? "Terminé" : trip.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <Link href={`/admin/trips/${trip.id}`} className="text-primary hover:text-primary-dark text-sm font-medium">
                      Voir détails →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-6 text-center">
          <Link href="/admin/trips" className="text-primary hover:text-primary-dark font-medium">
            Voir tous les trajets de ce conducteur →
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
