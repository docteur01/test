
"use client";

import React, { ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  Users,
  Truck,
  User,
  Route,
  Car,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  LayoutDashboard,
  Building2,
  Link2,
} from "lucide-react";
import { motion, LayoutGroup, AnimatePresence } from "framer-motion";
import { toast } from "sonner";


//import { useAuth } from "@/contexts/AuthContext";
import { useSidebar, SidebarProvider } from "./contexts/SidebarContext";

import Topbar from "./Topbar";

type NavItem = {
  title: string;
  href: string;
  icon: React.ElementType;
  description?: string;
};

const primaryItems: NavItem[] = [
  { title: "Dashboard", href: "/admin", icon: LayoutDashboard, description: "Vue d'ensemble de la flotte" },
  { title: "Utilisateurs", href: "/admin/users", icon: Users, description: "Gestion des comptes et rôles" },
  { title: "Flottes", href: "/admin/fleets", icon: Building2, description: "Gestion des groupes de véhicules" },
  { title: "Véhicules", href: "/admin/vehicles", icon: Truck, description: "Suivi et gestion des véhicules" },
  { title: "Conducteurs", href: "/admin/drivers", icon: User, description: "Gestion des conducteurs" },
  { title: "Trajets", href: "/admin/trips", icon: Route, description: "Historique et suivi des trajets" },
];

const secondaryItems: NavItem[] = [
  { 
    title: "Assignation Flottes", 
    href: "/admin/fleet-assignments", 
    icon: Link2, 
    description: "Lier utilisateurs et flottes (managers, accès)" 
  },
  { title: "Paramètres", href: "/admin/settings", icon: Settings, description: "Configuration générale" },
];

const cx = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(" ");

// Composant section déroulante (inchangé, juste adapté)
function ExpandableSection({
  title,
  icon: Icon,
  isExpanded,
  onToggle,
  isCollapsed,
  children,
}: {
  title: string;
  icon: React.ElementType;
  isExpanded: boolean;
  onToggle: () => void;
  isCollapsed: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-4">
      {!isCollapsed ? (
        <>
          <button
            onClick={onToggle}
            className="flex items-center justify-between w-full px-3 py-3 text-blue-100 hover:text-white hover:bg-blue-700/30 rounded-lg transition-colors"
          >
            <div className="flex items-center gap-3">
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium">{title}</span>
            </div>
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="pl-7 mt-1 space-y-1">
                  {children}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        <div className="flex flex-col items-center py-2">
          <Icon className="w-5 h-5 mb-1 text-blue-200" />
          <span className="text-xs text-blue-200 text-center leading-tight">{title}</span>
        </div>
      )}
    </div>
  );
}

// Composant item de navigation (inchangé)
function NavItemComponent({
  item,
  isActive,
  isCollapsed,
}: {
  item: NavItem;
  isActive: boolean;
  isCollapsed: boolean;
}) {
  const Icon = item.icon;

  if (isCollapsed) {
    return (
      <Link
        href={item.href}
        className={cx(
          "flex flex-col items-center p-3 rounded-lg transition-all duration-200 mb-2",
          isActive ? "bg-blue-700 text-white" : "text-blue-100 hover:text-white hover:bg-blue-700/50"
        )}
        title={item.title}
      >
        <Icon className="w-5 h-5" />
        <span className="text-xs mt-1">{item.title}</span>
      </Link>
    );
  }

  return (
    <Link
      href={item.href}
      className={cx(
        "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
        isActive ? "bg-blue-700 text-white" : "text-blue-100 hover:text-white hover:bg-blue-700/50"
      )}
    >
      <Icon className="w-4 h-4 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium">{item.title}</div>
        {item.description && (
          <div className="text-xs text-blue-200/70 mt-0.5 line-clamp-1">{item.description}</div>
        )}
      </div>
    </Link>
  );
}

function AdminLayout({ children }: { children: ReactNode }) {
  const { isCollapsed, setIsCollapsed, expandedSections, toggleSection } = useSidebar();
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      // await logout(); // à décommenter quand tu auras l'auth
      toast.success("Déconnexion réussie");
      router.push("/login");
    } catch {
      toast.error("Erreur lors de la déconnexion");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside
        className={cx(
          "hidden md:flex flex-col transition-all duration-300 bg-gradient-to-b from-blue-900 to-blue-800 text-white shadow-2xl overflow-hidden h-screen sticky top-0",
          isCollapsed ? "w-24" : "w-72"
        )}
      >
        {/* Header */}
        <div className="flex-shrink-0">
          <div className="flex items-center justify-between p-6 border-b border-blue-700">
            {!isCollapsed ? (
              <Link href="/admin" className="flex items-center gap-3 group">
                <div className="text-white font-bold text-xl">FleetControl</div>
                <div className="text-blue-200 text-xs">Admin</div>
              </Link>
            ) : (
              <Link href="/admin" className="flex items-center justify-center w-full">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                  <Car className="w-6 h-6 text-white" />
                </div>
              </Link>
            )}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
              aria-label={isCollapsed ? "Étendre" : "Réduire"}
            >
              {isCollapsed ? <ChevronRight className="w-4 h-4 text-blue-200" /> : <ChevronLeft className="w-4 h-4 text-blue-200" />}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4 px-3">
          <LayoutGroup>
            {!isCollapsed ? (
              <>
                <ExpandableSection
                  title="Principal"
                  icon={Home}
                  isExpanded={expandedSections.primary}
                  onToggle={() => toggleSection("primary")}
                  isCollapsed={isCollapsed}
                >
                  {primaryItems.map((item) => (
                    <NavItemComponent
                      key={item.href}
                      item={item}
                      isActive={pathname === item.href || pathname.startsWith(item.href + "/")}
                      isCollapsed={isCollapsed}
                    />
                  ))}
                </ExpandableSection>

                <ExpandableSection
                  title="Administration"
                  icon={Settings}
                  isExpanded={expandedSections.secondary}
                  onToggle={() => toggleSection("secondary")}
                  isCollapsed={isCollapsed}
                >
                  {secondaryItems.map((item) => (
                    <NavItemComponent
                      key={item.href}
                      item={item}
                      isActive={pathname === item.href || pathname.startsWith(item.href + "/")}
                      isCollapsed={isCollapsed}
                    />
                  ))}
                </ExpandableSection>
              </>
            ) : (
              <div className="space-y-6">
                {[...primaryItems, ...secondaryItems].map((item) => (
                  <NavItemComponent
                    key={item.href}
                    item={item}
                    isActive={pathname === item.href || pathname.startsWith(item.href + "/")}
                    isCollapsed={isCollapsed}
                  />
                ))}
              </div>
            )}
          </LayoutGroup>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 border-t border-blue-700 bg-blue-900/50">
          <div className="p-4">
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className={cx(
                "flex items-center justify-center gap-3 w-full px-3 py-2.5 rounded-lg transition-colors disabled:opacity-50",
                "text-blue-100 hover:text-white hover:bg-blue-700/50"
              )}
            >
              {isLoggingOut ? (
                <>
                  <div className="w-5 h-5 border-2 border-blue-200 border-t-transparent rounded-full animate-spin" />
                  {!isCollapsed && <span>Déconnexion...</span>}
                </>
              ) : (
                <>
                  <LogOut className="w-5 h-5" />
                  {!isCollapsed && <span>Déconnexion</span>}
                </>
              )}
            </button>

            {!isCollapsed && (
              <div className="mt-3 pt-3 border-t border-blue-700/50 text-center">
                <div className="text-xs text-blue-200/70">Administrateur</div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 bg-surface">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function AdminLayoutWrapper({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AdminLayout>{children}</AdminLayout>
    </SidebarProvider>
  );
}