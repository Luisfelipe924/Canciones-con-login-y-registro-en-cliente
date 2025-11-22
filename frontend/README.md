# 🎵 Canciones con Login y Registro (Fullstack)

Este proyecto es un **sistema completo Fullstack** que incluye tanto **frontend en React** como **backend en Node.js/Express**, diseñado para manejar autenticación de usuarios mediante **JWT** y rutas protegidas.

## 🚀 Funcionalidades principales

- **Registro de usuarios**: Formulario en React que permite crear cuentas y obtener un token JWT al registrarse.
- **Login de usuarios**: Formulario para iniciar sesión y recibir un token JWT para acceder a rutas protegidas.
- **Rutas protegidas**: Implementadas con React Router en el frontend y verificación de JWT en el backend.
- **Gestión de sesión**: Almacenamiento seguro del token JWT en `localStorage` o cookies y control de expiración.
- **Interacción segura con el backend**: Todas las peticiones a rutas protegidas incluyen el token en los encabezados o cookies (`token_usuario`).
- **Redirección automática**: Si el token expira o no es válido, el usuario es enviado al login.

> ⚠️ Este proyecto **requiere que ambos, frontend y backend, estén funcionando** para que la aplicación opere correctamente.
