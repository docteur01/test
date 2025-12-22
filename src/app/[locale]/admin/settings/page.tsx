"use client";

import React, { useState } from "react";
import {
  User,
  Shield,
  Bell,
  Globe,
  Moon,
  Sun,
  Key,
  Webhook,
  Info,
  Save,
} from "lucide-react";
import { motion } from "framer-motion";

export default function SettingsPage() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [language, setLanguage] = useState("fr");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [inAppNotifications, setInAppNotifications] = useState(true);

  const currentAdmin = {
    name: "Administrateur Principal",
    email: "admin@fleetcontrol.com",
    role: "Administrateur",
    joinedDate: "1er janvier 2023",
  };

  const toggleTheme = (value: "light" | "dark") => {
    setTheme(value);
    // plus tard : document.documentElement.dataset.theme = value
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen px-4 py-10"
    >
      {/* ===== En-tête ===== */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-text-primary">Paramètres</h1>
        <p className="mt-2 text-text-secondary">
          Configuration de l'application et de votre compte
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ===== Navigation gauche ===== */}
        <div>
          <div className="bg-surface rounded-xl border border-border-default shadow-sm overflow-hidden">
            <ul className="divide-y divide-border-default">
              {[
                { label: "Mon profil", icon: User, active: true },
                { label: "Sécurité", icon: Shield },
                { label: "Notifications", icon: Bell },
                { label: "Apparence & langue", icon: Globe },
                { label: "Intégrations", icon: Webhook },
                { label: "À propos", icon: Info },
              ].map(({ label, icon: Icon, active }) => (
                <li
                  key={label}
                  className={`px-6 py-4 flex items-center gap-3 cursor-pointer transition-colors
                    ${
                      active
                        ? "bg-background-secondary text-primary font-medium"
                        : "hover:bg-background-secondary text-text-primary"
                    }`}
                >
                  <Icon className="w-5 h-5" />
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ===== Contenu droit ===== */}
        <div className="lg:col-span-2 space-y-8">
          {/* ===== Profil ===== */}
          <div className="bg-surface rounded-xl border border-border-default shadow-sm p-8">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-3 text-text-primary">
              <User className="w-6 h-6 text-primary" />
              Mon profil
            </h2>

            <div className="flex items-center gap-6 mb-8">
              <div className="w-24 h-24 rounded-full bg-background-secondary flex items-center justify-center">
                <User className="w-12 h-12 text-text-tertiary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-text-primary">
                  {currentAdmin.name}
                </h3>
                <p className="text-text-secondary">{currentAdmin.email}</p>
                <p className="text-sm text-text-tertiary mt-1">
                  Rôle : {currentAdmin.role}
                </p>
                <p className="text-sm text-text-tertiary">
                  Membre depuis : {currentAdmin.joinedDate}
                </p>
              </div>
            </div>

            <button className="px-5 py-3 rounded-lg border border-border-default
                               hover:bg-background-secondary transition-colors
                               font-medium text-text-primary">
              Modifier le profil
            </button>
          </div>

          {/* ===== Sécurité ===== */}
          <div className="bg-surface rounded-xl border border-border-default shadow-sm p-8">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-3 text-text-primary">
              <Shield className="w-6 h-6 text-primary" />
              Sécurité
            </h2>

            <div className="space-y-6">
              {[
                "Mot de passe actuel",
                "Nouveau mot de passe",
                "Confirmer le nouveau mot de passe",
              ].map((label) => (
                <div key={label}>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    {label}
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 rounded-lg
                               border border-border-default
                               bg-background text-text-primary
                               focus:border-primary focus:ring-1 focus:ring-primary
                               outline-none transition-colors"
                  />
                </div>
              ))}

              <button className="px-6 py-3 rounded-lg bg-primary hover:bg-primary-hover
                                 text-white font-medium flex items-center gap-2 transition-colors">
                <Key className="w-5 h-5" />
                Changer le mot de passe
              </button>
            </div>
          </div>

          {/* ===== Notifications ===== */}
          <div className="bg-surface rounded-xl border border-border-default shadow-sm p-8">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-3 text-text-primary">
              <Bell className="w-6 h-6 text-primary" />
              Notifications
            </h2>

            {[
              {
                label: "Notifications par email",
                desc: "Alertes critiques, rapports hebdomadaires",
                value: emailNotifications,
                set: setEmailNotifications,
              },
              {
                label: "Notifications push",
                desc: "Navigateur ou application mobile",
                value: pushNotifications,
                set: setPushNotifications,
              },
              {
                label: "Notifications dans l'app",
                desc: "Badge et centre de notifications",
                value: inAppNotifications,
                set: setInAppNotifications,
              },
            ].map(({ label, desc, value, set }) => (
              <label
                key={label}
                className="flex items-center justify-between py-3 cursor-pointer"
              >
                <div>
                  <p className="font-medium text-text-primary">{label}</p>
                  <p className="text-sm text-text-secondary">{desc}</p>
                </div>
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => set(e.target.checked)}
                  className="w-5 h-5 accent-[var(--color-primary)]"
                />
              </label>
            ))}
          </div>

          {/* ===== Apparence & Langue ===== */}
          <div className="bg-surface rounded-xl border border-border-default shadow-sm p-8">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-3 text-text-primary">
              <Globe className="w-6 h-6 text-primary" />
              Apparence & langue
            </h2>

            <div className="space-y-6">
              {/* Thème */}
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-3">
                  Thème
                </label>
                <div className="flex gap-4">
                  {[
                    { key: "light", icon: Sun, label: "Clair" },
                    { key: "dark", icon: Moon, label: "Sombre" },
                  ].map(({ key, icon: Icon, label }) => (
                    <button
                      key={key}
                      onClick={() => toggleTheme(key as "light" | "dark")}
                      className={`flex items-center gap-3 px-6 py-4 rounded-lg border transition-all
                        ${
                          theme === key
                            ? "border-primary bg-background-secondary"
                            : "border-border-default"
                        }`}
                    >
                      <Icon className="w-6 h-6 text-text-primary" />
                      <span className="font-medium text-text-primary">
                        {label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Langue */}
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Langue
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full max-w-xs px-4 py-3 rounded-lg
                             border border-border-default bg-background
                             text-text-primary focus:border-primary
                             focus:ring-1 focus:ring-primary outline-none"
                >
                  <option value="fr">Français</option>
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="de">Deutsch</option>
                </select>
              </div>
            </div>
          </div>

          {/* ===== À propos ===== */}
          <div className="bg-surface rounded-xl border border-border-default shadow-sm p-8 text-center">
            <div className="text-4xl font-bold text-primary mb-2">
              FleetControl
            </div>
            <p className="text-text-secondary">Version 1.0.0</p>
            <p className="text-sm text-text-tertiary mt-2">
              © 2025 FleetControl. Tous droits réservés.
            </p>
          </div>

          {/* ===== Sauvegarde ===== */}
          <div className="flex justify-end">
            <button className="px-8 py-4 rounded-lg bg-primary hover:bg-primary-hover
                               text-white font-medium flex items-center gap-3 transition-colors">
              <Save className="w-6 h-6" />
              Enregistrer les modifications
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
