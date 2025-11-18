
"use client";

import React, { useState, useMemo } from "react";

interface Payment {
  id: string;
  patient: string;
  amount: number;
  date: string;
  statut: "payé" | "en_attente" | "annulé";
}

const MOCK_PAYMENTS: Payment[] = Array.from({ length: 40 }, (_, i) => ({
  id: `p${i + 1}`,
  patient: `Patient ${i + 1}`,
  amount: 50 + i * 10,
  date: `2025-11-${(i % 30) + 1}`.padStart(10, "0"),
  statut: ["payé", "en_attente", "annulé"][i % 3] as Payment["statut"],
}));

export default function PaymentsPage() {
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const filteredPayments = useMemo(() => {
    return MOCK_PAYMENTS.filter(
      (p) =>
        p.patient.toLowerCase().includes(filter.toLowerCase()) ||
        p.id.toLowerCase().includes(filter.toLowerCase())
    );
  }, [filter]);

  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
  const paginatedPayments = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return filteredPayments.slice(start, start + itemsPerPage);
  }, [page, filteredPayments]);

  const getStatusColor = (statut: Payment["statut"]) => {
    switch (statut) {
      case "payé":
        return "bg-green-100 text-green-700";
      case "en_attente":
        return "bg-yellow-100 text-yellow-700";
      case "annulé":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="p-6 mt-20 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold text-primary">Factures & Paiements</h1>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Rechercher par patient ou ID..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm w-full md:w-64"
          />
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition"
            onClick={() => setPage(1)}
          >
            Filtrer
          </button>
        </div>
      </div>

      {/* Liste des paiements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {paginatedPayments.length === 0 ? (
          <p className="text-gray-500 col-span-full">Aucun paiement trouvé.</p>
        ) : (
          paginatedPayments.map((p) => (
            <div
              key={p.id}
              className="border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition p-4 flex flex-col justify-between cursor-pointer"
            >
              <div>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  {p.patient}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  Montant : {p.amount} €
                </p>
              </div>
              <div className="mt-3 flex justify-between items-center text-gray-500 dark:text-gray-400 text-xs">
                <span>Date : {p.date}</span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                    p.statut
                  )}`}
                >
                  {p.statut.toUpperCase()}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-3 mt-4">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-3 py-1 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
        >
          Précédent
        </button>
        <span>
          Page {page} / {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="px-3 py-1 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
        >
          Suivant
        </button>
      </div>
    </div>
  );
}
