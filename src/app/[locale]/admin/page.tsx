"use client";

import React from "react";
import Link from "next/link";
import {
  Truck,
  Users,
  AlertTriangle,
  Route,
  Wrench,
  MapPin,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  RefreshCw,
  Settings,
  FileText,
  Bell,
  AlertCircle,
} from "lucide-react";
import { motion } from "framer-motion";

/* =========================
   Carte statistique
========================= */
function StatCard({
  title,
  value,
  change,
  icon: Icon,
  trend = "up",
}: {
  title: string;
  value: string;
  change?: string;
  icon: React.ElementType;
  trend?: "up" | "down";
}) {
  return (
    <div className="bg-surface rounded-xl shadow-sm border border-border-default p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="p-3 rounded-lg bg-background-secondary">
          <Icon className="w-6 h-6 text-primary" />
        </div>

        {change && (
          <div
            className={`flex items-center gap-1 text-sm font-medium ${
              trend === "up" ? "text-success" : "text-error"
            }`}
          >
            {trend === "up" ? (
              <ArrowUpRight className="w-4 h-4" />
            ) : (
              <ArrowDownRight className="w-4 h-4" />
            )}
            <span>{change}</span>
          </div>
        )}
      </div>

      <h3 className="text-2xl font-bold mt-4 text-text-primary">{value}</h3>
      <p className="text-text-secondary text-sm mt-1">{title}</p>
    </div>
  );
}

/* =========================
   Véhicules récents
========================= */
function RecentVehicles() {
  const vehicles = [
    { plate: "AB-123-CD", driver: "Jean Dupont", status: "En trajet", speed: "85 km/h", location: "Paris → Lyon" },
    { plate: "EF-456-GH", driver: "Marie Curie", status: "Actif", speed: "0 km/h", location: "Entrepôt Paris" },
    { plate: "IJ-789-KL", driver: "Pierre Martin", status: "En trajet", speed: "110 km/h", location: "Lyon → Marseille" },
    { plate: "MN-012-OP", driver: "Sophie Bernard", status: "Inactif", speed: "0 km/h", location: "Garage" },
  ];

  const statusClasses: Record<string, string> = {
    "En trajet": "bg-info-light text-info",
    Actif: "bg-success-light text-success",
    Inactif: "bg-background-secondary text-text-secondary",
  };

  return (
    <div className="bg-surface rounded-xl shadow-sm border border-border-default p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-text-primary">Véhicules en activité</h2>
        <Link href="/admin/vehicles" className="text-sm text-primary hover:text-primary-hover font-medium">
          Voir tout →
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-text-secondary border-b border-border-default">
              <th className="pb-3 font-medium">Immatriculation</th>
              <th className="pb-3 font-medium">Conducteur</th>
              <th className="pb-3 font-medium">Statut</th>
              <th className="pb-3 font-medium">Vitesse</th>
              <th className="pb-3 font-medium">Position</th>
              <th className="pb-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((v) => (
              <tr key={v.plate} className="border-b border-border-default hover:bg-background-secondary transition-colors">
                <td className="py-4 font-medium text-text-primary">{v.plate}</td>
                <td className="py-4">{v.driver}</td>
                <td className="py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusClasses[v.status]}`}>
                    {v.status}
                  </span>
                </td>
                <td className="py-4">{v.speed}</td>
                <td className="py-4 text-text-secondary">{v.location}</td>
                <td className="py-4">
                  <button className="text-primary hover:text-primary-hover font-medium">
                    Suivi live
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* =========================
   Alertes maintenance
========================= */
function UrgentMaintenanceAlerts() {
  const alerts = [
    { vehicle: "AB-123-CD", type: "Vidange", due: "Dans 2 jours", priority: "Haute" },
    { vehicle: "EF-456-GH", type: "Pneus", due: "Dépassé", priority: "Critique" },
    { vehicle: "IJ-789-KL", type: "Freins", due: "Dans 5 jours", priority: "Moyenne" },
  ];

  return (
    <div className="bg-error-light text-error rounded-xl shadow-sm border border-error-light p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold">Alertes maintenance</h2>
          <p className="text-sm">Interventions urgentes requises</p>
        </div>
        <Wrench className="w-6 h-6" />
      </div>

      <div className="space-y-4">
        {alerts.map((a, i) => (
          <div key={i} className="flex items-center justify-between bg-background rounded-lg p-3">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-4 h-4 text-error" />
              <div>
                <div className="font-medium">{a.vehicle} – {a.type}</div>
                <div className="text-sm">{a.due}</div>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-error-light">
              {a.priority}
            </span>
          </div>
        ))}
      </div>

      <Link
        href="/admin/vehicles"
        className="block text-center mt-6 bg-error hover:bg-error-light text-white py-3 rounded-lg font-medium transition-colors"
      >
        Voir toutes les alertes
      </Link>
    </div>
  );
}

/* =========================
   Actions rapides
========================= */
function QuickActions() {
  const actions = [
    { icon: Truck, label: "Ajouter véhicule", href: "/admin/vehicles" },
    { icon: Users, label: "Conducteurs", href: "/admin/drivers" },
    { icon: Route, label: "Nouveau trajet", href: "/admin/trips" },
    { icon: FileText, label: "Rapports", href: "/admin/reports" },
    { icon: Settings, label: "Paramètres", href: "/admin/settings" },
  ];

  return (
    <div className="bg-surface rounded-xl shadow-sm border border-border-default p-6">
      <h2 className="text-lg font-semibold mb-6 text-text-primary">Actions rapides</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {actions.map((a) => (
          <Link
            key={a.label}
            href={a.href}
            className="flex flex-col items-center justify-center p-4 rounded-lg border border-border-default
                       hover:bg-background-secondary transition-colors"
          >
            <div className="p-3 rounded-lg bg-primary mb-3">
              <a.icon className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm font-medium text-text-primary text-center">{a.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

/* =========================
   Graphique placeholder
========================= */
function ChartPlaceholder() {
  return (
    <div className="bg-surface rounded-xl shadow-sm border border-border-default p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-text-primary">Distance parcourue</h2>
          <p className="text-sm text-text-secondary">Évolution sur 30 jours</p>
        </div>
        <RefreshCw className="w-4 h-4 text-text-tertiary" />
      </div>

      <div className="h-64 flex items-center justify-center border border-dashed border-border-default rounded-lg">
        <div className="text-center">
          <BarChart3 className="w-12 h-12 text-text-tertiary mx-auto mb-2" />
          <p className="text-text-secondary">Graphique interactif</p>
        </div>
      </div>
    </div>
  );
}

/* =========================
   Page Admin
========================= */
export default function AdminPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen p-4 md:p-6 lg:p-8"
    >
      {/* En-tête */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary">Bonjour, Administrateur 👋</h1>
        <p className="text-text-secondary mt-2">
          Voici un aperçu en temps réel de votre flotte
        </p>
      </div>

      {/* Alerte */}
      <div className="mb-6 bg-warning-light border border-warning-light rounded-xl p-4 flex gap-3">
        <AlertCircle className="w-5 h-5 text-warning mt-0.5" />
        <div>
          <h3 className="font-medium text-warning">3 véhicules en maintenance overdue</h3>
          <p className="text-sm">Vérifiez les alertes pour éviter les pannes critiques.</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Véhicules totaux" value="156" change="+12 ce mois" icon={Truck} />
        <StatCard title="Véhicules actifs" value="89" change="+5%" icon={Activity} />
        <StatCard title="Conducteurs connectés" value="74" change="+3" icon={Users} />
        <StatCard title="Trajets aujourd’hui" value="312" change="-8%" icon={Route} trend="down" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartPlaceholder />
        <UrgentMaintenanceAlerts />
      </div>

      <QuickActions />

      <div className="mt-8">
        <RecentVehicles />
      </div>
    </motion.div>
  );
}
