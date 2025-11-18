"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, UserPlus, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export default function NewPatientPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    adresse: "",
    naissance: "",
    antecedents: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // Simuler l'enregistrement (tu remplaceras par ton API)
    toast.success("Patient ajouté avec succès !");
    router.push("/dashboard/patients");
  };

  return (
    <div className="p-6 mt-20 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour
        </button>
        <h1 className="text-2xl font-bold text-blue-700">
          Nouveau patient
        </h1>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
        {/* Card Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-blue-700 flex items-center gap-2">
            <UserPlus className="w-5 h-5" />
            Ajouter un patient
          </h2>
        </div>

        {/* Card Content */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* NOM */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">Nom *</label>
              <input
                name="nom"
                placeholder="Ex: Kamdem"
                value={form.nom}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </div>

            {/* PRENOM */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">Prénom *</label>
              <input
                name="prenom"
                placeholder="Ex: Arnaud"
                value={form.prenom}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </div>

            {/* EMAIL */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                name="email"
                type="email"
                placeholder="adresse@mail.com"
                value={form.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </div>

            {/* TELEPHONE */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">Téléphone *</label>
              <input
                name="telephone"
                placeholder="+237 ..."
                value={form.telephone}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </div>

            {/* ADRESSE */}
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-sm font-medium text-gray-700">Adresse complète</label>
              <input
                name="adresse"
                placeholder="Quartier, ville, etc."
                value={form.adresse}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </div>

            {/* DATE DE NAISSANCE */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">Date de naissance</label>
              <div className="relative">
                <input
                  type="date"
                  name="naissance"
                  value={form.naissance}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition pr-10"
                />
                <Calendar className="w-4 h-4 absolute right-3 top-3 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* ANTECEDENTS */}
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-sm font-medium text-gray-700">Antécédents médicaux</label>
              <textarea
                name="antecedents"
                placeholder="Hypertension, diabète, allergies..."
                rows={4}
                value={form.antecedents}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-vertical"
              />
            </div>

            {/* BOUTON ENREGISTRER */}
            <div className="md:col-span-2 flex justify-end">
              <button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg"
              >
                Enregistrer le patient
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}