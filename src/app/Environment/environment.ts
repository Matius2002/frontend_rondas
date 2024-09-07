export const environment = {
  // Indica si la aplicación está en modo de producción o no. Este valor se utiliza
  // para activar/desactivar funcionalidades específicas para producción.
  production: false,

  // URL del host dinámico para los servicios de backend:
  // Aquí puedes cambiar entre diferentes entornos (desarrollo, producción, staging).
  dynamicHost: 'localhost:8080', // Desarrollo - se utiliza el servidor local
  // dynamicHost: '10.100.204.20:8080', // Producción - dirección IP del servidor de producción
  // dynamicHost: '10.100.204.20:8082', // Staging - dirección IP del servidor de staging

  // URL del host dinámico para la parte frontend:
  // Cambia entre diferentes URLs según el entorno en el que esté la aplicación.
  dynamicFrontHost: 'localhost:4200/index.html#', // Desarrollo - se utiliza el servidor local de Angular
  // dynamicFrontHost: '10.100.204.20/junical-rondas/proyecto-rondas/browser/index.html#', // Producción
  // dynamicFrontHost: '10.100.204.20/staging-rondas/proyecto-rondas/browser/index.html#', // Staging

  // URL para acceder a las imágenes desde el servidor de backend:
  // Ajusta la URL de la API que sirve imágenes dependiendo del entorno.
  dynamicImageHost: 'http://localhost:8080', // Desarrollo - servidor local
  // dynamicImageHost: 'http://10.100.204.20:8080', // Producción - servidor de producción
  // dynamicImageHost: 'http://10.100.204.20:8082', // Staging insight - servidor de staging

  // URL del host dinámico para servicios biomédicos:
  // Se ajusta para cada entorno específico según los requisitos de la aplicación.
  dynamicBiomedicosHost: 'localhost:4200/index.html#', // Desarrollo - se usa el servidor local
  // dynamicBiomedicosHost: '10.100.204.20/junical/proyecto-junical/index.html#', // Producción
  // dynamicBiomedicosHost: '10.100.204.20/staging/proyecto-junical/index.html#', // Staging

  // URL base de la API del backend:
  // Se utiliza para construir todas las llamadas API desde la aplicación.
  apiUrl: 'https://backend-pro-production.up.railway.app/api/v1/'
  //apiUrl: 'http://localhost:8080/api/v1/'
};
