import { Schema, model } from 'mongoose';

const taskSchema = new Schema({
  title: { type: String, required: true },
  id: { type: String, default: Date.now , required: true },
  description: { type: String },
});

const boardSchema = new Schema({
  name: { type: String, required: true },
  to_do: [taskSchema],
  in_progress: [taskSchema],
  done: [taskSchema]
});

const Board = model('Board', boardSchema);

export default Board;