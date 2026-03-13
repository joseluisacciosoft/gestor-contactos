import React, { useState, useEffect } from 'react';
import { Contacto } from '../services/contactosService';
import './ContactoForm.css';

interface ContactoFormProps {
  contacto?: Contacto;
  onSubmit: (contacto: Contacto) => Promise<void>;
  onCancel: () => void;
}

export const ContactoForm: React.FC<ContactoFormProps> = ({ contacto, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Contacto>({
    nombre: '',
    telefono: '',
    email: '',
    direccion: '',
    notas: '',
    ...contacto
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = (): string | null => {
    if (!formData.nombre.trim()) {
      return 'El nombre es requerido';
    }

    if (formData.nombre.trim().length < 2) {
      return 'El nombre debe tener al menos 2 caracteres';
    }

    if (formData.telefono && !/^[0-9\s\-\+\(\)]{7,}$/.test(formData.telefono)) {
      return 'El teléfono debe contener solo números, espacios, guiones o símbolos (+, -)';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      return 'El email no tiene un formato válido (ejemplo: correo@dominio.com)';
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const error = validateForm();
    if (error) {
      alert('❌ ' + error);
      return;
    }

    try {
      setLoading(true);
      await onSubmit(formData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>{contacto?.id ? 'Editar Contacto' : 'Nuevo Contacto'}</h2>
      
      <div className="form-group">
        <label htmlFor="nombre">Nombre *</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Ingrese el nombre"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="telefono">Teléfono</label>
        <input
          type="tel"
          id="telefono"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          placeholder="Ingrese el teléfono"
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Ingrese el email"
        />
      </div>

      <div className="form-group">
        <label htmlFor="direccion">Dirección</label>
        <input
          type="text"
          id="direccion"
          name="direccion"
          value={formData.direccion}
          onChange={handleChange}
          placeholder="Ingrese la dirección"
        />
      </div>

      <div className="form-group">
        <label htmlFor="notas">Notas</label>
        <textarea
          id="notas"
          name="notas"
          value={formData.notas}
          onChange={handleChange}
          placeholder="Notas adicionales"
          rows={4}
        />
      </div>

      <div className="form-buttons">
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Guardando...' : (contacto?.id ? 'Actualizar' : 'Crear')}
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel} disabled={loading}>
          Cancelar
        </button>
      </div>
    </form>
  );
};