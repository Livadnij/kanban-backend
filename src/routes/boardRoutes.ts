import { Router } from 'express';
import { createBoard, getBoardById, updateBoard, deleteBoard } from '../controllers/boardController';

const router = Router();

router.post('/boards', createBoard);
router.get('/boards/:id', getBoardById);
router.put('/boards/:id', updateBoard);
router.delete('/boards/:id', deleteBoard);

export default router;