// server/config/cloudinary.js
const cloudinary = require('cloudinary').v2; // Usa la v2
const dotenv = require('dotenv');

dotenv.config(); // Asegúrate de que las variables de entorno estén cargadas

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true, // Para que siempre genere URLs HTTPS
});

module.exports = cloudinary;