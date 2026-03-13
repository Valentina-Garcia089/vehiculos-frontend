# BuscaTuVehiculo - Frontend
Este es el cliente web de BuscaTuVehiculo, una interfaz dinámica diseñada para que los usuarios puedan explorar el catálogo de vehículos y los administradores gestionen el inventario en tiempo real. El proyecto se centra en ofrecer una experiencia de usuario fluida y segura.

---

## Tecnologías Utilizadas
 * React siendo la biblioteca principal para la construcción de la interfaz basada en componentes.
 * React Router en la gestión de la navegación y protección de rutas según el rol del usuario.
 * Axios para la comunicación eficiente con el backend mediante peticiones HTTP.
 * JWT Decode en el procesamiento de tokens para extraer información del usuario y sus permisos.
 * CSS Modules para tener estilos encapsulados evitando conflictos y manteniendo un código limpio.
 * Vite como herramienta de construcción para un desarrollo rápido y optimizado.

---

## Funcionalidades Clave
 * Autenticación y Sesión: Implementación de registro e inicio de sesión integrados con el backend.
 * Gestión de Roles: El sistema detecta si el usuario es ADMIN o USER, redirigiéndolo automáticamente al panel del inventario del admin o al Catálogo de clientes.
 * Protección de Rutas: Uso de localStorage para persistir la sesión y asegurar que solo usuarios autorizados accedan a funciones administrativas.
 * Consumo de API: Configuración de variables de entorno para conectar de forma dinámica con el entorno de producción en Render.

---

## Estado del proyecto
En desarrollo.

Implementaciones faltantes:

* Avisos de exito o fracaso en operaciones realizadas (actualmente están con alert())
