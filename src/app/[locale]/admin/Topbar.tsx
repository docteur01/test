// app/admin/components/topbar.tsx

"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Bell, Search, Settings } from "lucide-react";
import { useSidebar } from "./contexts/SidebarContext";

const pageConfig: Record<string, { title: string; description: string }> = {
  "/admin": { title: "Dashboard", description: "Vue d'ensemble de votre flotte" },
  "/admin/users": { title: "Utilisateurs", description: "Gestion des comptes administrateurs et conducteurs" },
  "/admin/fleets": { title: "Flottes", description: "Création et gestion des flottes de véhicules" },
  "/admin/vehicles": { title: "Véhicules", description: "Liste et suivi en temps réel" },
  "/admin/drivers": { title: "Conducteurs", description: "Gestion et assignation des conducteurs" },
  "/admin/trips": { title: "Trajets", description: "Historique et détails des déplacements" },
  "/admin/fleet-assignments": { title: "Assignation Flottes", description: "Liaison entre utilisateurs et flottes" },
  "/admin/settings": { title: "Paramètres", description: "Configuration de l'application" },
};

export default function Topbar() {
  const { isCollapsed } = useSidebar();
  const pathname = usePathname();
  const currentPage =
    pageConfig[pathname] || { title: "", description: "Votre espace personnel" };

  /* =======================
     Heure & date actuelles
  ======================== */
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedDate = now.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedTime = now.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <header
      className="sticky top-0 z-40 bg-surface border-b border-border-default shadow-sm transition-all"
      style={{
        height: isCollapsed ? "5.6rem" : "4.9rem",
      }}
    >
      <div className="h-full px-6">
        <div className="flex items-center justify-between h-full gap-6">

          {/* ===== GAUCHE : titre & description ===== */}
          <div className="flex-shrink-0 min-w-0 w-[30%]">
            <h1 className="text-2xl font-bold text-text-primary leading-tight truncate">
              {currentPage.title}
            </h1>
            <p className="text-sm text-text-secondary truncate mt-1">
              {currentPage.description}
            </p>
          </div>

          {/* ===== CENTRE : recherche ===== */}
          <div className="hidden md:flex flex-1 justify-center items-center px-8">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
              <input
                type="text"
                placeholder="Rechercher…"
                className="pl-10 pr-4 py-2 w-full rounded-lg border border-border-default
                           bg-background text-text-primary text-sm
                           focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary
                           transition-colors"
              />
            </div>
          </div>

          {/* ===== DROITE : date / actions ===== */}
          <div className="flex items-center justify-end gap-4 flex-shrink-0 min-w-[320px]">

            {/* Date & heure */}
            <div className="hidden lg:flex flex-col text-right leading-tight">
              <span className="text-sm font-medium text-text-primary capitalize">
                {formattedDate}
              </span>
              <span className="text-xs text-text-secondary">
                {formattedTime}
              </span>
            </div>

            {pathname === "/admin" && (
              <button className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-lg
                                 border border-border-default text-sm text-text-primary
                                 hover:bg-background-secondary transition-colors">
                <Settings className="w-4 h-4" />
                <span>Personnaliser</span>
              </button>
            )}

            {/* Calendrier */}
            <button className="p-2 rounded-lg hover:bg-background-secondary transition-colors">
              <svg className="w-5 h-5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </button>

            {/* Notifications */}
            <button className="relative p-2 rounded-lg hover:bg-background-secondary transition-colors">
              <Bell className="w-5 h-5 text-text-secondary" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full" />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
