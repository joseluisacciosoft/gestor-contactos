import React from 'react';
import { Contacto } from '../services/contactosService';
import { ConfirmDialog } from './ConfirmDialog';
import './ContactoList.css';

interface ContactoListProps {
  contactos: Contacto[];
  onEdit: (contacto: Contacto) => void;
  onDelete: (id: number) => Promise<void>;
  loading: boolean;
}

export const ContactoList: React.FC<ContactoListProps> = ({ contactos, onEdit, onDelete, loading }) => {
  const [deletingId, setDeletingId] = React.useState<number | null>(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = React.useState(false);
  const [pendingDeleteId, setPendingDeleteId] = React.useState<number | null>(null);

  const handleDeleteClick = (id: number) => {
    setPendingDeleteId(id);
    setConfirmDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (pendingDeleteId) {
      try {
        setDeletingId(pendingDeleteId);
        await onDelete(pendingDeleteId);
      } finally {
        setDeletingId(null);
        setConfirmDialogOpen(false);
        setPendingDeleteId(null);
      }
    }
  };

  const handleCancelDelete = () => {
    setConfirmDialogOpen(false);
    setPendingDeleteId(null);
  };

  if (loading) {
    return <div className="loading">Cargando contactos...</div>;
  }

  if (contactos.length === 0) {
    return (
      <div className="empty-state">
        <p>📋 No hay contactos registrados</p>
        <p>Crea uno nuevo para comenzar</p>
      </div>
    );
  }

  return (
    <>
      <div className="contactos-grid">
        {contactos.map((contacto) => (
          <div key={contacto.id} className="contacto-card">
            <div className="contacto-header">
              <h3>{contacto.nombre}</h3>
              <div className="contacto-actions">
                <button
                  className="btn-icon btn-edit"
                  onClick={() => onEdit(contacto)}
                  title="Editar"
                >
                  ✏️
                </button>
                <button
                  className="btn-icon btn-delete"
                  onClick={() => handleDeleteClick(contacto.id!)}
                  disabled={deletingId === contacto.id}
                  title="Eliminar"
                >
                  {deletingId === contacto.id ? '⏳' : '🗑️'}
                </button>
              </div>
            </div>

            <div className="contacto-body">
              {contacto.telefono && (
                <div className="contacto-info">
                  <span className="icon">📞</span>
                  <span>{contacto.telefono}</span>
                </div>
              )}
              {contacto.email && (
                <div className="contacto-info">
                  <span className="icon">📧</span>
                  <span>{contacto.email}</span>
                </div>
              )}
              {contacto.direccion && (
                <div className="contacto-info">
                  <span className="icon">📍</span>
                  <span>{contacto.direccion}</span>
                </div>
              )}
              {contacto.notas && (
                <div className="contacto-info notas">
                  <span className="icon">📝</span>
                  <p>{contacto.notas}</p>
                </div>
              )}
            </div>

            <div className="contacto-footer">
              <h4>
                {contacto.creado_en ? new Date(contacto.creado_en).toLocaleDateString() : ''}
              </h4>
            </div>
          </div>
        ))}
      </div>

      {confirmDialogOpen && (
        <ConfirmDialog
          title="Eliminar Contacto"
          message="¿Estás seguro de que deseas eliminar este contacto? Esta acción no se puede deshacer."
          confirmText="Eliminar"
          cancelText="Cancelar"
          isDangerous={true}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </>
  );
};
