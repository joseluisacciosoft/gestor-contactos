import express from 'express';
import { getContactos, getContactoById, createContacto, updateContacto, deleteContacto } from './controllers';

const router = express.Router();

router.get('/contactos', getContactos);
router.get('/contactos/:id', getContactoById);
router.post('/contactos', createContacto);
router.put('/contactos/:id', updateContacto);
router.delete('/contactos/:id', deleteContacto);

export default router;
