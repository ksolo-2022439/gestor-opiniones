# Gestor de Opiniones

API Backend desarrollada con Node.js, Express y MongoDB para la gestión de publicaciones y opiniones de usuarios. Este proyecto cumple con los requerimientos del Laboratorio #2 de la Fundación Kinal.

## Descripción

El sistema permite a los usuarios registrarse, iniciar sesión, gestionar su perfil, crear publicaciones y comentar en las publicaciones de otros usuarios. Incluye validaciones de seguridad, encriptación de contraseñas y control de permisos mediante JWT.

## Requisitos Previos

- Node.js (v18 o superior)
- MongoDB (servicio en ejecución)
- pnpm (gestor de paquetes)

## Instalación

1. Clonar el repositorio o descargar el código fuente.
2. Abrir una terminal en la raíz del proyecto.
3. Instalar las dependencias:

```bash
pnpm install
```

## Configuración

Crear un archivo .env en la raíz del proyecto con las siguientes variables de entorno:

```env
PORT=3000
DB_URI=mongodb://127.0.0.1:27017/gestorOpinionesDB
SECRET_KEY=TU_LLAVE_SECRETA
```

## Ejecución

Para entorno de desarrollo (con nodemon):

```bash
pnpm dev
```

Para entorno de producción:

```bash
pnpm start
```

## Estructura del Proyecto

El código se encuentra dentro de la carpeta `src` siguiendo una arquitectura modular:

* `configs`: Configuraciones de base de datos y servidor (Express).
* `controllers`: Lógica de negocio para usuarios, publicaciones y comentarios.
* `middlewares`: Validaciones de campos y verificación de JWT.
* `models`: Esquemas de Mongoose (User, Post, Comment).
* `routes`: Definición de rutas de la API.
* `helpers`: Validaciones personalizadas de base de datos y generación de tokens.

## Endpoints de la API

La URL base es: `http://localhost:3000/gestorOpiniones/v1`

### Autenticación

* POST /auth/register - Registrar un nuevo usuario.
* POST /auth/login - Iniciar sesión (Email o Username).

### Usuarios

* PUT /users/:id - Actualizar perfil (requiere contraseña anterior para cambios de clave).

### Publicaciones

* GET /posts - Listar publicaciones.
* POST /posts - Crear una publicación.
* PUT /posts/:id - Editar una publicación (solo el autor).
* DELETE /posts/:id - Eliminar una publicación (solo el autor).

### Comentarios

* POST /comments - Agregar comentario a una publicación.
* PUT /comments/:id - Editar comentario (solo el autor).
* DELETE /comments/:id - Eliminar comentario (solo el autor).
