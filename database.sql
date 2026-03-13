-- Script para crear la tabla de contactos en MySQL
-- Ejecutar en phpMyAdmin o desde MySQL CLI

CREATE DATABASE IF NOT EXISTS agenda_db;

USE agenda_db;

CREATE TABLE IF NOT EXISTS contactos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  telefono VARCHAR(20),
  email VARCHAR(100),
  direccion VARCHAR(200),
  notas TEXT,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Algunos datos de ejemplo (opcional)
 INSERT INTO contactos (nombre, telefono, email, direccion, notas) VALUES
 ('Juan Pérez', '123456789', 'juan@example.com', 'Calle 1, 10', 'Contacto importante'),
 ('María García', '987654321', 'maria@example.com', 'Avenida 2, 20', 'Cliente habitual');
