# Agenda de Contactos - Guía de Configuración

## Pasos iniciales

### 1️⃣ Verificar que XAMPP esté en ejecución
- Abre XAMPP Control Panel
- Asegúrate de que "Apache" y "MySQL" estén iniciados

### 2️⃣ Crear la base de datos
- Abre [phpMyAdmin](http://localhost/phpmyadmin)
- En la sección SQL, copia y pega el contenido de `database.sql`
- Ejecuta la consulta

### 3️⃣ Instalar dependencias
```bash
# En la raíz del proyecto
npm run install-all
```

### 4️⃣ Iniciar el servidor
```bash
# Terminal 1 - Backend
cd backend
npm run dev
# Debe mostrar: ✅ Servidor ejecutándose en puerto 5000
```

### 5️⃣ Iniciar el cliente
```bash
# Terminal 2 - Frontend
cd frontend
npm run dev
# Debe mostrar: ✅ Local: http://localhost:3000
```

### 6️⃣ Abrir en el navegador
- Ve a `http://localhost:3000`
- ¡Listo! La aplicación está funcionando

## 🐛 Solucionar problemas

### Error: "connect ECONNREFUSED 127.0.0.1:3306"
- Verifica que MySQL esté ejecutándose en XAMPP
- Revisa la configuración en `backend/.env`

### Error: "Unknown database 'agenda_db'"
- Ejecuta el script en `database.sql` desde phpMyAdmin
- Verifica el nombre de la base de datos en `backend/.env`

### Error: "listen EADDRINUSE :::5000"
- El puerto 5000 ya está en uso
- Cambia `PORT` en `backend/.env`

### El formulario no envía datos
- Abre la consola del navegador (F12)
- Verifica que el backend esté ejecutándose en http://localhost:5000
- Revisa la pestaña "Network" para ver los errores de API

## 📝 Próximos pasos

Puedes mejorar el proyecto con:
- [ ] Autenticación de usuarios
- [ ] Paginación en la lista de contactos
- [ ] Exportar/Importar contactos (CSV, Excel)
- [ ] Fotos de perfil para contactos
- [ ] Categorías de contactos
- [ ] Backup automático de la BD
