import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', routes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: '✅ Agenda de Contactos Backend',
    version: '1.0.0',
    endpoints: {
      getAll: 'GET /api/contactos',
      getById: 'GET /api/contactos/:id',
      create: 'POST /api/contactos',
      update: 'PUT /api/contactos/:id',
      delete: 'DELETE /api/contactos/:id',
      health: 'GET /health'
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Servidor ejecutándose en puerto ${PORT}`);
});
