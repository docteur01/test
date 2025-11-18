'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { LogOut, ArrowLeft, Loader2, Stethoscope } from 'lucide-react';
import { toast } from 'sonner';

export default function LogoutPage() {
  const router = useRouter();
  
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      // TODO: Implémenter la vraie logique de déconnexion
      // await authService.logout();
      
      toast.success('Déconnecté avec succès.');
      setTimeout(() => {
        router.push('/login');
      }, 300);
    } catch (err) {
      console.error('Erreur déconnexion:', err);
      toast.error('Erreur lors de la déconnexion.');
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleCancel = () => {
    if (window.history.length > 1) router.back();
    else router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-blue-100">
          {/* En-tête médicale */}
          <div className="px-6 py-8 text-center bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center mb-4 shadow-inner">
              <LogOut className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-blue-700 mb-1">Déconnexion</h2>
            <p className="text-sm text-blue-600/80">
              Êtes-vous sûr de vouloir vous déconnecter de MedCaseGen ?
            </p>
          </div>

          {/* Contenu principal */}
          <div className="border-t border-blue-100 px-6 py-6">
            {/* Carte utilisateur */}
            <div className="bg-blue-50 rounded-lg p-4 mb-6 flex items-center gap-4 border border-blue-100">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-r from-blue-200 to-indigo-200 flex items-center justify-center flex-shrink-0 shadow-inner">
                <Stethoscope className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-blue-800">Session active</p>
                <p className="text-sm text-blue-600">Vous êtes connecté à votre compte MedCaseGen</p>
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="space-y-3">
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all duration-200 shadow-md ${
                  isLoggingOut
                    ? 'bg-blue-300 text-white cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg'
                }`}
                aria-label="Confirmer la déconnexion"
                role="button"
              >
                {isLoggingOut ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Déconnexion en cours...</span>
                  </>
                ) : (
                  <>
                    <LogOut className="h-4 w-4" />
                    <span>Confirmer la déconnexion</span>
                  </>
                )}
              </button>

              <button
                onClick={handleCancel}
                disabled={isLoggingOut}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium border border-blue-200 bg-white text-blue-700 hover:bg-blue-50 transition-all duration-200 disabled:opacity-50 hover:border-blue-300"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Annuler</span>
              </button>
            </div>

            {/* Lien retour dashboard */}
            <div className="mt-6 text-center">
              <Link 
                href="/dashboard" 
                className="text-sm text-blue-600 hover:text-blue-700 hover:underline transition-colors"
              >
                Retourner au tableau de bord
              </Link>
            </div>
          </div>
        </div>

        {/* Message informatif */}
        <p className="text-center text-xs text-blue-500/80 mt-6">
          Vous serez redirigé vers la page de connexion après déconnexion.
        </p>

        {/* Logo/brand */}
        <div className="text-center mt-6">
          <div className="inline-flex items-center gap-2 text-blue-700">
            <Stethoscope className="w-4 h-4" />
            <span className="text-sm font-medium">MedCaseGen</span>
          </div>
        </div>
      </div>
    </div>
  );
}