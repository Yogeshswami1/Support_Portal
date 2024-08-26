import express from 'express';
import {
  getManagers,
  createManager,
  updateManager,
  deleteManager,
} from '../controllers/managerController.js';

const router = express.Router();

router.get('/get', getManagers);
router.post('/create', createManager);
router.patch('/:id', updateManager);
router.delete('/:id', deleteManager);

export default router;
