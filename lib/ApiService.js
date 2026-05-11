// lib/ApiService.js
// Service pour l'API Country State City (https://countrystatecity.in)

import axios from 'axios';

const API_BASE_URL = 'https://api.countrystatecity.in/v1';

// Clé API - à remplacer par votre vraie clé
// IMPORTANT : En production, utilisez des variables d'environnement
const API_KEY = process.env.NEXT_PUBLIC_CSC_API_KEY || 'VOTRE_CLE_API_ICI';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-CSCAPI-KEY': API_KEY,
  },
  timeout: 15000,
});

// Intercepteur de requête - ajoute la clé API si elle n'est pas déjà présente
apiClient.interceptors.request.use(
  (config) => {
    if (!config.headers['X-CSCAPI-KEY']) {
      config.headers['X-CSCAPI-KEY'] = API_KEY;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercepteur de réponse - gestion des erreurs
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;
      switch (status) {
        case 401:
          console.error('Erreur 401 : Clé API invalide ou manquante.');
          break;
        case 404:
          console.error('Erreur 404 : Ressource non trouvée.');
          break;
        case 500:
          console.error('Erreur 500 : Erreur interne du serveur API.');
          break;
        default:
          console.error(`Erreur ${status} : ${error.response.data?.message || 'Erreur inconnue'}`);
      }
    } else if (error.request) {
      console.error('Aucune réponse reçue du serveur API. Vérifiez votre connexion.');
    }
    return Promise.reject(error);
  }
);

// ==============================================
// Endpoints : Pays (Countries)
// ==============================================

/**
 * Récupère tous les pays
 * @param {string} [search] - Terme de recherche (optionnel, nécessite plan Supporter+)
 * @returns {Promise<Array>} Liste des pays
 */
export const getAllCountries = async (search = '') => {
  try {
    const params = search.length >= 2 ? { q: search } : {};
    const response = await apiClient.get('/countries', { params });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des pays:', error);
    throw error;
  }
};

/**
 * Récupère les détails d'un pays par son code ISO2
 * @param {string} iso2 - Code ISO2 du pays (ex: "FR", "US", "IN")
 * @returns {Promise<Object>} Détails du pays
 */
export const getCountryDetails = async (iso2) => {
  try {
    const response = await apiClient.get(`/countries/${iso2}`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération du pays ${iso2}:`, error);
    throw error;
  }
};

// ==============================================
// Endpoints : Tous les États (Global)
// ==============================================

/**
 * Récupère tous les états/provinces du monde
 * @param {string} [search] - Terme de recherche (optionnel, nécessite plan Supporter+)
 * @returns {Promise<Array>} Liste de tous les états
 */
export const getAllStates = async (search = '') => {
  try {
    const params = search.length >= 2 ? { q: search } : {};
    const response = await apiClient.get('/states', { params });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération de tous les états:', error);
    throw error;
  }
};

// ==============================================
// Endpoints : États/Régions (States)
// ==============================================

/**
 * Récupère tous les états/provinces d'un pays
 * @param {string} countryIso2 - Code ISO2 du pays
 * @param {string} [search] - Terme de recherche (optionnel)
 * @returns {Promise<Array>} Liste des états
 */
export const getStatesByCountry = async (countryIso2, search = '') => {
  try {
    const params = search.length >= 2 ? { q: search } : {};
    const response = await apiClient.get(`/countries/${countryIso2}/states`, { params });
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération des états pour ${countryIso2}:`, error);
    throw error;
  }
};

/**
 * Récupère les détails d'un état spécifique
 * @param {string} countryIso2 - Code ISO2 du pays
 * @param {string} stateIso2 - Code ISO2 de l'état
 * @returns {Promise<Object>} Détails de l'état
 */
export const getStateDetails = async (countryIso2, stateIso2) => {
  try {
    const response = await apiClient.get(`/countries/${countryIso2}/states/${stateIso2}`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération de l'état ${stateIso2}:`, error);
    throw error;
  }
};

// ==============================================
// Endpoints : Villes (Cities)
// ==============================================

/**
 * Récupère toutes les villes d'un pays
 * @param {string} countryIso2 - Code ISO2 du pays
 * @param {string} [search] - Terme de recherche (optionnel)
 * @returns {Promise<Array>} Liste des villes
 */
export const getCitiesByCountry = async (countryIso2, search = '') => {
  try {
    const params = search.length >= 2 ? { q: search } : {};
    const response = await apiClient.get(`/countries/${countryIso2}/cities`, { params });
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération des villes pour ${countryIso2}:`, error);
    throw error;
  }
};

/**
 * Récupère toutes les villes d'un état spécifique
 * @param {string} countryIso2 - Code ISO2 du pays
 * @param {string} stateIso2 - Code ISO2 de l'état
 * @param {string} [search] - Terme de recherche (optionnel)
 * @returns {Promise<Array>} Liste des villes
 */
export const getCitiesByState = async (countryIso2, stateIso2, search = '') => {
  try {
    const params = search.length >= 2 ? { q: search } : {};
    const response = await apiClient.get(`/countries/${countryIso2}/states/${stateIso2}/cities`, { params });
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération des villes pour ${stateIso2}:`, error);
    throw error;
  }
};

// ==============================================
// Endpoints : Régions (Regions) - Plan Supporter+
// ==============================================

/**
 * Récupère toutes les régions géographiques
 * @returns {Promise<Array>} Liste des régions
 */
export const getAllRegions = async () => {
  try {
    const response = await apiClient.get('/regions');
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des régions:', error);
    throw error;
  }
};

/**
 * Récupère les sous-régions d'une région
 * @param {number} regionId - ID de la région
 * @returns {Promise<Array>} Liste des sous-régions
 */
export const getSubregionsByRegion = async (regionId) => {
  try {
    const response = await apiClient.get(`/regions/${regionId}/subregions`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération des sous-régions pour ${regionId}:`, error);
    throw error;
  }
};

/**
 * Récupère les pays d'une sous-région
 * @param {number} subregionId - ID de la sous-région
 * @returns {Promise<Array>} Liste des pays
 */
export const getCountriesBySubregion = async (subregionId) => {
  try {
    const response = await apiClient.get(`/subregions/${subregionId}/countries`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération des pays pour la sous-région ${subregionId}:`, error);
    throw error;
  }
};

// Export par défaut de l'instance axios
export default apiClient;