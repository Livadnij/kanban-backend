import { Request, Response } from 'express';
import Board from '../models/board.model';

export const createBoard = async (req: Request, res: Response) => {
  try {
    const board = new Board(req.body);
    const savedBoard = await board.save();
    res.status(201).json({ id: savedBoard._id });
  } catch (error) {
    res.status(400).json({ error});
  }
};

export const getBoardById = async (req: Request, res: Response) => {
  try {
    const board = await Board.findById(req.params.id);
    if (!board) {
      return res.status(404).json({ error: 'Board not found' });
    }
    res.status(200).json(board);
  } catch (error) {
    res.status(500).json({ error});
  }
};

export const updateBoard = async (req: Request, res: Response) => {
  try {
    const updatedBoard = await Board.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBoard) {
      return res.status(404).json({ error: 'Board not found' });
    }
    res.status(200).json(updatedBoard);
  } catch (error) {
    res.status(500).json({ error});
  }
};

export const deleteBoard = async (req: Request, res: Response) => {
  try {
    const deletedBoard = await Board.findByIdAndDelete(req.params.id);
    if (!deletedBoard) {
      return res.status(404).json({ error: 'Board not found' });
    }
    res.status(200).json({ message: 'Board deleted' });
  } catch (error) {
    res.status(500).json({ error});
  }
};
