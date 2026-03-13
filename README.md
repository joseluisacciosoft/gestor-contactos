# 📇 Agenda de Contactos

Proyecto full-stack de gestión de contactos desarrollado con:
- **Frontend**: React + TypeScript + Vite
- **Backend**: Express.js + TypeScript + Node.js
- **Base de Datos**: MySQL (XAMPP)

## 📋 Requisitos

- Node.js 16+ instalado
- XAMPP con MySQL ejecutándose
- Base de datos `agenda_db` creada

## 🚀 Instalación y Ejecución

### 1. Configurar la Base de Datos

```sql
-- Ejecutar en phpMyAdmin o MySQL CLI
CREATE DATABASE IF NOT EXISTS agenda_db;

USE agenda_db;

CREATE TABLE contactos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  telefono VARCHAR(20),
  email VARCHAR(100),
  direccion VARCHAR(200),
  notas TEXT,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 2. Instalar y Ejecutar el Backend

```bash
cd backend
npm install
npm run dev
```

El servidor estará disponible en `http://localhost:5000`

### 3. Instalar y Ejecutar el Frontend

En otra terminal:

```bash
cd frontend
npm install
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## 📚 Estructura del Proyecto

```
agenda-contactos/
├── backend/
│   ├── src/
│   │   ├── index.ts          # Punto de entrada
│   │   ├── database.ts       # Conexión a MySQL
│   │   ├── controllers.ts    # Lógica de negocio
│   │   └── routes.ts         # Rutas de la API
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── main.tsx          # Punto de entrada
    │   ├── App.tsx           # Componente principal
    │   ├── components/
    │   │   ├── ContactoForm.tsx   # Formulario
    │   │   └── ContactoList.tsx   # Lista de contactos
    │   └── services/
    │       └── contactosService.ts # Cliente API
    ├── public/
    │   └── index.html
    ├── package.json
    ├── tsconfig.json
    └── vite.config.ts
```

## 🔌 API Endpoints

### GET /api/contactos
Obtiene todos los contactos

**Respuesta:**
```json
[
  {
    "id": 1,
    "nombre": "Juan Pérez",
    "telefono": "123456789",
    "email": "juan@example.com",
    "direccion": "Calle 1, 10",
    "notas": "Contacto importante",
    "creado_en": "2026-03-13T10:00:00.000Z"
  }
]
```

### GET /api/contactos/:id
Obtiene un contacto por ID

### POST /api/contactos
Crea un nuevo contacto

**Body:**
```json
{
  "nombre": "Juan Pérez",
  "telefono": "123456789",
  "email": "juan@example.com",
  "direccion": "Calle 1, 10",
  "notas": "Contacto importante"
}
```

### PUT /api/contactos/:id
Actualiza un contacto

**Body:** (Mismo formato que POST)

### DELETE /api/contactos/:id
Elimina un contacto

## ⚙️ Configuración

### Backend (.env)
```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=agenda_db
DB_PORT=3306
```

Modifica estas variables según tu configuración de XAMPP.

## 🎨 Características

- ✅ Crear contactos
- ✅ Editar contactos
- ✅ Eliminar contactos
- ✅ Buscar contactos (por nombre, teléfono o email)
- ✅ Interfaz responsiva
- ✅ Estilos modernos con gradientes
- ✅ Validación de datos

## 🛠️ Desarrollo

### Scripts disponibles

**Backend:**
- `npm run dev` - Ejecuta en modo desarrollo con hot reload
- `npm run build` - Compila TypeScript
- `npm start` - Ejecuta la versión compilada

**Frontend:**
- `npm run dev` - Ejecuta Vite en modo desarrollo
- `npm run build` - Construye para producción
- `npm run preview` - Preview de la build

## 📝 Notas

- La contraseña de MySQL en XAMPP está vacía por defecto
- Asegúrate de que MySQL esté ejecutándose en XAMPP antes de iniciar el backend
- El frontend se conecta al backend a través del proxy en vite.config.ts

## 🤝 Contribución

Este es un proyecto personal. Siéntete libre de modificarlo según tus necesidades.
