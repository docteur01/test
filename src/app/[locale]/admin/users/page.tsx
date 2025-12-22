"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Users,
  Plus,
  Search,
  Filter,
  UserCheck,
  UserX,
  Mail,
  Car,
  Phone,
  Calendar,
  MoreVertical,
  Crown,
  Wrench,
} from "lucide-react";
import { motion } from "framer-motion";

/* =======================
   Données mock
======================= */
const mockUsers = [
  {
    userId: "usr-001",
    name: "Admin Principal",
    email: "admin@fleetcontrol.com",
    phone: "+33 1 23 45 67 89",
    role: "ADMIN" as const,
    status: true,
    fleetsManaged: [],
    joinedDate: "2023-01-01",
  },
  {
    userId: "usr-002",
    name: "Paul Durand",
    email: "paul.durand@entreprise.com",
    phone: "+33 6 12 34 56 78",
    role: "FLEET_MANAGER" as const,
    status: true,
    fleetsManaged: ["Flotte Paris Centre", "Flotte Nord Transport"],
    joinedDate: "2023-06-15",
  },
  {
    userId: "usr-003",
    name: "Sophie Martin",
    email: "sophie.martin@entreprise.com",
    phone: "+33 6 98 76 54 32",
    role: "FLEET_MANAGER" as const,
    status: true,
    fleetsManaged: ["Flotte Lyon Logistique"],
    joinedDate: "2024-02-20",
  },
  {
    userId: "drv-001",
    name: "Jean Dupont",
    email: "jean.dupont@entreprise.com",
    phone: "+33 6 12 34 56 78",
    role: "DRIVER" as const,
    status: true,
    fleetsManaged: [],
    joinedDate: "2024-03-10",
  },
  {
    userId: "drv-002",
    name: "Marie Curie",
    email: "marie.curie@entreprise.com",
    phone: "+33 6 98 76 54 32",
    role: "DRIVER" as const,
    status: false,
    fleetsManaged: [],
    joinedDate: "2024-05-05",
  },
];

/* =======================
   Helpers UI
======================= */
const getRoleMeta = (role: string) => {
  switch (role) {
    case "ADMIN":
      return { icon: Crown, label: "Administrateur", badge: "bg-primary" };
    case "FLEET_MANAGER":
      return { icon: Wrench, label: "Manager de flotte", badge: "bg-info" };
    case "DRIVER":
      return { icon: Car, label: "Conducteur", badge: "bg-success" };
    default:
      return { icon: Users, label: "Utilisateur", badge: "bg-secondary" };
  }
};

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  /* =======================
     Filtrage
  ======================= */
  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" ? user.status : !user.status);

    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen p-4 md:p-6 lg:p-8 bg-background"
    >
      {/* =======================
          HEADER
      ======================= */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">
            Utilisateurs
          </h1>
          <p className="text-text-secondary mt-2">
            Gestion des comptes administrateurs et conducteurs
          </p>
        </div>

        <button className="flex items-center gap-2 px-5 h-12 rounded-lg bg-primary hover:bg-primary-hover text-white font-bold transition-colors">
          <Plus className="w-5 h-5" />
          Ajouter un utilisateur
        </button>
      </div>

      {/* =======================
          FILTRES
      ======================= */}
      <div className="bg-surface border border-border-default rounded-xl p-6 shadow-sm mb-8">
        <h2 className="text-lg font-semibold text-text-primary flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5" />
          Filtres
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
            <input
              type="text"
              placeholder="Rechercher nom ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 w-full rounded-lg border border-border-default
                         bg-background text-text-primary
                         focus:border-primary focus:ring-1 focus:ring-primary outline-none"
            />
          </div>

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-3 rounded-lg border border-border-default
                       bg-background text-text-primary
                       focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          >
            <option value="all">Tous les rôles</option>
            <option value="ADMIN">Administrateur</option>
            <option value="FLEET_MANAGER">Manager de flotte</option>
            <option value="DRIVER">Conducteur</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 rounded-lg border border-border-default
                       bg-background text-text-primary
                       focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          >
            <option value="all">Tous les statuts</option>
            <option value="active">Actif</option>
            <option value="inactive">Inactif</option>
          </select>
        </div>
      </div>

      {/* =======================
          CARTES UTILISATEURS
      ======================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredUsers.map((user) => {
          const { icon: RoleIcon, label, badge } = getRoleMeta(user.role);

          return (
            <div
              key={user.userId}
              className="bg-surface border border-border-default rounded-xl p-6 shadow-sm hover:shadow-md transition-all"
            >
              {/* Header carte */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-background-secondary flex items-center justify-center">
                    <RoleIcon className="w-7 h-7 text-text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-text-primary">
                      {user.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`w-3 h-3 rounded-full ${badge}`} />
                      <span className="text-sm text-text-secondary">
                        {label}
                      </span>
                    </div>
                  </div>
                </div>

                <button className="p-2 rounded-lg hover:bg-background-secondary transition-colors">
                  <MoreVertical className="w-5 h-5 text-text-tertiary" />
                </button>
              </div>

              {/* Infos */}
              <div className="space-y-3 text-sm text-text-secondary">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{user.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>{user.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    Inscrit le{" "}
                    {new Date(user.joinedDate).toLocaleDateString("fr-FR")}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 mt-5">
                <Link
                  href={`/admin/users/${user.userId}`}
                  className="flex-1 text-center py-2 px-4 rounded-lg
                             bg-background-secondary text-text-primary
                             hover:bg-background-tertiary transition-colors font-medium text-sm"
                >
                  Voir détails
                </Link>

                <button className="p-2 rounded-lg hover:bg-background-secondary transition-colors">
                  {user.status ? (
                    <UserX className="w-5 h-5 text-error" />
                  ) : (
                    <UserCheck className="w-5 h-5 text-success" />
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
