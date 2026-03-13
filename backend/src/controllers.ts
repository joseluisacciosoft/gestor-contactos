import { Request, Response } from 'express';
import pool from './database';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

interface Contacto extends RowDataPacket {
  id: number;
  nombre: string;
  telefono: string;
  email: string;
  direccion: string;
  notas: string;
  creado_en: Date;
}

// Obtener todos los contactos
export const getContactos = async (req: Request, res: Response) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM contactos ORDER BY creado_en DESC');
    connection.release();
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener contactos:', error);
    res.status(500).json({ error: 'Error al obtener contactos' });
  }
};

// Obtener un contacto por ID
export const getContactoById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM contactos WHERE id = ?', [id]);
    connection.release();
    
    if ((rows as RowDataPacket[]).length === 0) {
      return res.status(404).json({ error: 'Contacto no encontrado' });
    }
    
    res.json((rows as Contacto[])[0]);
  } catch (error) {
    console.error('Error al obtener contacto:', error);
    res.status(500).json({ error: 'Error al obtener contacto' });
  }
};

// Crear un nuevo contacto
export const createContacto = async (req: Request, res: Response) => {
  try {
    const { nombre, telefono, email, direccion, notas } = req.body;

    // Validar nombre
    if (!nombre || !nombre.trim()) {
      return res.status(400).json({ error: '❌ El nombre es requerido' });
    }

    if (nombre.trim().length < 2) {
      return res.status(400).json({ error: '❌ El nombre debe tener al menos 2 caracteres' });
    }

    // Validar teléfono
    if (telefono && !/^[0-9\s\-\+\(\)]{7,}$/.test(telefono)) {
      return res.status(400).json({ 
        error: '❌ El teléfono debe contener solo números, espacios, guiones o símbolos (+, -)' 
      });
    }

    // Validar email
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ 
        error: '❌ El email no tiene un formato válido (ejemplo: correo@dominio.com)' 
      });
    }

    const connection = await pool.getConnection();
    const [result] = await connection.query(
      'INSERT INTO contactos (nombre, telefono, email, direccion, notas) VALUES (?, ?, ?, ?, ?)',
      [nombre, telefono || null, email || null, direccion || null, notas || null]
    );
    connection.release();

    const insertResult = result as ResultSetHeader;
    res.status(201).json({
      id: insertResult.insertId,
      nombre,
      telefono: telefono || null,
      email: email || null,
      direccion: direccion || null,
      notas: notas || null
    });
  } catch (error) {
    console.error('Error al crear contacto:', error);
    res.status(500).json({ error: 'Error al crear contacto' });
  }
};

// Actualizar un contacto
export const updateContacto = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nombre, telefono, email, direccion, notas } = req.body;

    // Validar nombre
    if (!nombre || !nombre.trim()) {
      return res.status(400).json({ error: '❌ El nombre es requerido' });
    }

    if (nombre.trim().length < 2) {
      return res.status(400).json({ error: '❌ El nombre debe tener al menos 2 caracteres' });
    }

    // Validar teléfono
    if (telefono && !/^[0-9\s\-\+\(\)]{7,}$/.test(telefono)) {
      return res.status(400).json({ 
        error: '❌ El teléfono debe contener solo números, espacios, guiones o símbolos (+, -)' 
      });
    }

    // Validar email
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ 
        error: '❌ El email no tiene un formato válido (ejemplo: correo@dominio.com)' 
      });
    }

    const connection = await pool.getConnection();
    const [result] = await connection.query(
      'UPDATE contactos SET nombre = ?, telefono = ?, email = ?, direccion = ?, notas = ? WHERE id = ?',
      [nombre, telefono || null, email || null, direccion || null, notas || null, id]
    );
    connection.release();

    const updateResult = result as ResultSetHeader;
    if (updateResult.affectedRows === 0) {
      return res.status(404).json({ error: 'Contacto no encontrado' });
    }

    res.json({ message: 'Contacto actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar contacto:', error);
    res.status(500).json({ error: 'Error al actualizar contacto' });
  }
};

// Eliminar un contacto
export const deleteContacto = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    const [result] = await connection.query('DELETE FROM contactos WHERE id = ?', [id]);
    connection.release();

    const deleteResult = result as ResultSetHeader;
    if (deleteResult.affectedRows === 0) {
      return res.status(404).json({ error: 'Contacto no encontrado' });
    }

    res.json({ message: 'Contacto eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar contacto:', error);
    res.status(500).json({ error: 'Error al eliminar contacto' });
  }
};