import request from 'supertest';
import mongoose from 'mongoose';
import app from '../index'; // Adjust the import if your app entry file is named differently

const TEST_PORT = 4000; // Use a different port for testing

let server: any;

beforeAll(async () => {
  const uri = "mongodb+srv://thebadpoint:yo89i5rkKttZs0yz@kanbanapi.r7guayz.mongodb.net/?retryWrites=true&w=majority&appName=KanbanAPI";
  await mongoose.connect(uri);

  server = app.listen(TEST_PORT);
});

afterAll(async () => {
  await mongoose.connection.close();
  server.close();
});

describe('Board Controller', () => {
  let createdBoardId: string;

  beforeEach(async () => {
    const response = await request(app)
      .post('/api/boards')
      .send({ name: 'Test Board', to_do: [{ title: 'Test Task' }] });
    createdBoardId = response.body.id;
  });

  afterEach(async () => {
    if (createdBoardId) {
      await request(app).delete(`/api/boards/${createdBoardId}`);
      createdBoardId = '';
    }
  });

  it('should create a new board', async () => {
    const response = await request(app)
      .post('/api/boards')
      .send({ name: 'Another Test Board', to_do: [{ title: 'Another Test Task' }] })
      .expect(201);
    expect(response.body).toHaveProperty('id');
    const newBoardId = response.body.id;

    // Clean up created board
    await request(app).delete(`/api/boards/${newBoardId}`);
  });

  it('should get a board by id', async () => {
    const response = await request(app)
      .get(`/api/boards/${createdBoardId}`)
      .expect(200);
    expect(response.body).toHaveProperty('_id', createdBoardId);
  });

  it('should delete a board', async () => {
    const response = await request(app)
      .delete(`/api/boards/${createdBoardId}`)
      .expect(200);
    expect(response.body).toHaveProperty('message', 'Board deleted');
  });

  it('should return 404 for non-existent board', async () => {
    const response = await request(app)
      .get('/api/boards/nonexistentid')
      .expect(404);
    expect(response.body).toHaveProperty('error', 'Board not found');
  });
});
