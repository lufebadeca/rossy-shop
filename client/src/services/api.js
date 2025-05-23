// src/services/api.js
import axios from 'axios';

// 1. Obtén la URL base de la API desde las variables de entorno de Vite
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
// El fallback es útil si olvidas crear el .env o para entornos donde no se defina

// 2. Crea una instancia de Axios con la URL base
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  //headers: {
    //'Content-Type': 'application/json',
  //},
});

// 3. Define las funciones para llamar a cada endpoint

/**
 * Busca productos en la API.
 * @param {string} query - El término de búsqueda.
 * @returns {Promise<Array>} - Una promesa que resuelve a un array de productos.
 */
export const searchItems = async (query) => {
  try {
    // Hacemos un GET a /items?q=query
    const response = await apiClient.get('/items', {
      params: { q: query },
    });
    return response.data; // Devuelve solo los datos (el array de productos)
  } catch (error) {
    console.error('Error buscando items:', error.response?.data || error.message);
    throw error; // Relanza el error para que el componente lo maneje
  }
};

/**
 * Obtiene los detalles de un producto por su ID.
 * @param {string} id - El ID del producto.
 * @returns {Promise<Object>} - Una promesa que resuelve al objeto del producto.
 */
export const getItemById = async (id) => {
  try {
    // Hacemos un GET a /items/:id
    const response = await apiClient.get(`/items/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error obteniendo item ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

/**
 * Crea un nuevo producto.
 * @param {Object} productData - Los datos del producto a crear.
 * @returns {Promise<Object>} - Una promesa que resuelve al producto recién creado.
 */
export const createProduct = async (productFormData) => { // Ahora recibe FormData
  try {
    console.log("Servicio API: Enviando FormData para crear producto...");
    // Al enviar FormData, Axios/navegador establecen Content-Type automáticamente.
    // Si tu 'apiClient' tiene un 'Content-Type': 'application/json' global,
    // es posible que necesites omitirlo para esta solicitud específica o crear
    // una solicitud directa de axios.
    // La mayoría de las veces, si no hay un header global conflictivo, esto funciona:
    const response = await apiClient.post('/create', productFormData,
    // Opcional: Si tienes problemas con headers globales en apiClient:
    {
      headers: {
        'Content-Type': undefined // Esto o 'multipart/form-data' (pero el navegador lo hace mejor)
      }
    }
    );
    console.log('Servicio API: Respuesta de crear producto:', response.data);
    return response.data;
  } catch (error) {
    console.error('Servicio API: Error creando producto:', error.response?.data || error.message);
    throw error; // Relanza para que el componente lo maneje
  }
};

// PATCH para rating si hay tiempo