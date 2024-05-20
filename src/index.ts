import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import boardRoutes from './routes/boardRoutes';
import cors from "cors";

const uri = "mongodb+srv://thebadpoint:yo89i5rkKttZs0yz@kanbanapi.r7guayz.mongodb.net/?retryWrites=true&w=majority&appName=KanbanAPI";
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api', boardRoutes);

mongoose.connect(uri)
  .then(() => {
    console.log('Connected to MongoDB');
    if (process.env.NODE_ENV !== 'test') {
      app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
      });
    }
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB', error);
  });

export default app;