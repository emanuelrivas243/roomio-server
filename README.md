# Roomio Server

Backend para la aplicación Roomio de gestión de reuniones.

## Pila tecnológica (Sprint 1)

* Node.js + Express + TypeScript
* Firebase Auth
* Firestore
* Render

## ¿Qué incluye?

* Autenticación: registro, login, recuperación de contraseña
* Gestión de usuarios: obtener perfil, editar perfil, eliminar cuenta
* Gestión de reuniones: crear, obtener y eliminar reuniones
* Estructura básica con DAO, modelos, rutas, servicios y middleware de autenticación

## Cómo iniciar

1. Instalar dependencias:
```bash
npm install
```

2. Iniciar servidor de desarrollo:
```bash
npm run dev
```

## Estructura
```
ROOMIO-SERVER/
├── src/
│   ├── dao/
│   │   ├── MeetingDAO.ts
│   │   └── UserDAO.ts
│   ├── middleware/
│   │   └── authMiddleware.ts
│   ├── models/
│   │   └── Meeting.ts
│   ├── routes/
│   │   ├── auth.ts
│   │   ├── meetings.ts
│   │   └── users.ts
│   ├── services/
│   │   ├── MeetingService.ts
│   │   └── UserService.ts
│   ├── firebase.ts
│   └── server.ts
├── .env
├── .gitignore
├── package-lock.json
├── package.json
└── tsconfig.json
```

## Notas

* El servidor está desplegado en Render con variables de entorno configuradas.
* Las credenciales de Firebase deben añadirse a `.env`.
