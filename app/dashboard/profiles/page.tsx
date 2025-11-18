'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { FiEdit, FiMail, FiPhone, FiMapPin, FiCalendar, FiUser, FiInfo } from 'react-icons/fi';
import Link from 'next/link';
import Image from 'next/image';

export default function ProfilePage() {
  const router = useRouter();

  // Données locales (à remplacer plus tard par une API/AuthContext)
  const user = {
    name: 'BADA Andre',
    email: 'andre.bada@example.com',
    phone: '+237 698 45 78 22',
    address: 'Yaoundé, Cameroun',
    birthDate: '1994-06-15',
    profession: 'Infirmier diplômé',
    bloodType: 'O+',
  };

  return (
    <div className="min-h-screen mt-20 bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Mon Profil</h1>
          <p className="text-gray-600">Gérez vos informations personnelles.</p>
        </div>

        {/* Avatar et informations principales */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="px-6 py-8 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-6">

              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="relative w-28 h-28 rounded-full overflow-hidden bg-gray-100 border-4 border-amber-200 shadow">
                  <Image
                    src="https://ui-avatars.com/api/?name=BADA+Andre&background=FBBF24&color=fff&size=128"
                    alt="Avatar"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Basic Info */}
              <div className="text-center lg:text-left flex-1">
                <h2 className="text-2xl font-semibold text-gray-900 mb-1">
                  {user.name}
                </h2>
                <p className="text-gray-600 text-lg mb-4">{user.email}</p>

                <Link
                  href="/profile/edit"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition text-sm shadow-md"
                >
                  <FiEdit className="w-4 h-4" /> Modifier le profil
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Infos détaillées */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* Informations personnelles */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FiUser className="w-5 h-5 text-amber-600" /> Informations personnelles
            </h3>

            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <FiUser className="w-4 h-4 text-gray-500" />
                <span className="font-medium">Nom complet :</span>
                <span className="text-gray-700">{user.name}</span>
              </div>

              <div className="flex items-center gap-3">
                <FiCalendar className="w-4 h-4 text-gray-500" />
                <span className="font-medium">Date de naissance :</span>
                <span className="text-gray-700">{user.birthDate}</span>
              </div>

              <div className="flex items-center gap-3">
                <FiInfo className="w-4 h-4 text-gray-500" />
                <span className="font-medium">Groupe sanguin :</span>
                <span className="text-gray-700">{user.bloodType}</span>
              </div>
            </div>
          </div>

          {/* Coordonnées */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FiMail className="w-5 h-5 text-amber-600" /> Coordonnées
            </h3>

            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <FiMail className="w-4 h-4 text-gray-500" />
                <span className="font-medium">Email :</span>
                <span className="text-gray-700">{user.email}</span>
              </div>

              <div className="flex items-center gap-3">
                <FiPhone className="w-4 h-4 text-gray-500" />
                <span className="font-medium">Téléphone :</span>
                <span className="text-gray-700">{user.phone}</span>
              </div>

              <div className="flex items-center gap-3">
                <FiMapPin className="w-4 h-4 text-gray-500" />
                <span className="font-medium">Adresse :</span>
                <span className="text-gray-700">{user.address}</span>
              </div>
            </div>
          </div>

          {/* Informations supplémentaires */}
          <div className="md:col-span-2 bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FiInfo className="w-5 h-5 text-amber-600" /> Informations supplémentaires
            </h3>

            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-3">
                <FiUser className="w-4 h-4 text-gray-500" />
                <span className="font-medium">Profession :</span>
                <span className="text-gray-700">{user.profession}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}