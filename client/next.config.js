/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public", // Dónde se generarán los archivos relacionados con PWA
  register: true, // Registrar el Service Worker automáticamente
  skipWaiting: true, // Actualizar el Service Worker automáticamente
});

const nextConfig = withPWA({
  output: "standalone", // Configuración existente para standalone
  reactStrictMode: true, // Opción recomendada para React
  swcMinify: true, // Minificación para mejorar el rendimiento
});

module.exports = nextConfig;