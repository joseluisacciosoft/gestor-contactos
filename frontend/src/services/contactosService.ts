import axios from 'axios';

const API_URL = '/api';

export interface Contacto {
  id?: number;
  nombre: string;
  telefono: string;
  email: string;
  direccion: string;
  notas: string;
  creado_en?: Date;
}

const api = axios.create({
  baseURL: API_URL
});

export const contactosService = {
  getAll: async (): Promise<Contacto[]> => {
    try {
      const response = await api.get<Contacto[]>('/contactos');
      return response.data;
    } catch (error) {
      console.error('Error al obtener contactos:', error);
      throw error;
    }
  },

  getById: async (id: number): Promise<Contacto> => {
    try {
      const response = await api.get<Contacto>(`/contactos/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener contacto:', error);
      throw error;
    }
  },

  create: async (contacto: Contacto): Promise<Contacto> => {
    try {
      const response = await api.post<Contacto>('/contactos', contacto);
      return response.data;
    } catch (error) {
      console.error('Error al crear contacto:', error);
      throw error;
    }
  },

  update: async (id: number, contacto: Contacto): Promise<void> => {
    try {
      await api.put(`/contactos/${id}`, contacto);
    } catch (error) {
      console.error('Error al actualizar contacto:', error);
      throw error;
    }
  },

  delete: async (id: number): Promise<void> => {
    try {
      await api.delete(`/contactos/${id}`);
    } catch (error) {
      console.error('Error al eliminar contacto:', error);
      throw error;
    }
  }
};
