import React, { useState, useEffect } from 'react';
import { ContactoForm } from './components/ContactoForm';
import { ContactoList } from './components/ContactoList';
import { ToastContainer } from './components/Toast';
import { contactosService, Contacto } from './services/contactosService';
import { useToast } from './hooks/useToast';
import './App.css';

export const App: React.FC = () => {
  const [contactos, setContactos] = useState<Contacto[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedContacto, setSelectedContacto] = useState<Contacto | undefined>();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });
  const toast = useToast();

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    loadContactos();
  }, []); //el [] significa que se ejecuta una sola vez al montar el componente

  const loadContactos = async () => {
    try {
      setLoading(true);
      const data = await contactosService.getAll();
      setContactos(data);
    } catch (error) {
      console.error('Error al cargar contactos:', error);
      toast.error('Error al cargar los contactos. Verifica que:\n1. El servidor backend esté ejecutándose en puerto 5000\n2. MySQL esté activo en XAMPP\n3. La tabla "contactos" exista en "agenda_db"');
    } finally {
      setLoading(false);
    }
  };

  const handleNewContacto = () => {
    setSelectedContacto(undefined); //al declararlo como undefined se sabe que es un nuevo contacto
    setShowForm(true);
  };

  const handleEditContacto = (contacto: Contacto) => {
    setSelectedContacto(contacto);
    setShowForm(true);
  };

  const handleSubmitForm = async (contacto: Contacto) => {
    try {
      if (selectedContacto?.id) {
        await contactosService.update(selectedContacto.id, contacto);
        toast.success('Contacto actualizado correctamente');
      } else {
        await contactosService.create(contacto);
        toast.success('Contacto creado correctamente');
      }
      setShowForm(false);
      await loadContactos();
    } catch (error: any) {
      console.error('Error al guardar contacto:', error);
      const errorMessage = error.response?.data?.error || 'Error al guardar el contacto';
      toast.error(errorMessage);
    }
  };

  const handleDeleteContacto = async (id: number) => {
    try {
      await contactosService.delete(id);
      toast.success('Contacto eliminado correctamente');
      await loadContactos();
    } catch (error: any) {
      console.error('Error al eliminar contacto:', error);
      const errorMessage = error.response?.data?.error || 'Error al eliminar el contacto';
      toast.error(errorMessage);
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setSelectedContacto(undefined);
  };

  const filteredContactos = contactos.filter(contacto =>
    contacto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contacto.telefono.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contacto.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <header className="app-header">
        <div className="header-content">
          <h1>Agenda de Contactos</h1>
          <button
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
            title={darkMode ? 'Modo claro' : 'Modo oscuro'}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      <main className="app-main">
        <div className="toolbar">
          <input
            type="text"
            className="search-input"
            placeholder="Buscar por nombre, teléfono o email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className={`btn btn-primary ${showForm ? 'btn-hidden' : ''}`}
            onClick={handleNewContacto}
            style={{ display: showForm ? 'none' : 'block' }}
          >
            + Nuevo Contacto
          </button>
        </div>

        {showForm && (
          <ContactoForm
            contacto={selectedContacto}
            onSubmit={handleSubmitForm}
            onCancel={handleCancelForm}
            onShowToast={(message, type) => toast.addToast(message, type || 'error')}
          />
        )}

        <ContactoList
          contactos={filteredContactos}
          onEdit={handleEditContacto}
          onDelete={handleDeleteContacto}
          loading={loading}
        />
      </main>

      <ToastContainer toasts={toast.toasts} onRemove={toast.removeToast} />

      <footer className="app-footer">
        <p>© 2026 Agenda de Contactos - Desarrollado por @jrodesc</p>
      </footer>
    </div>
  );
};

export default App;