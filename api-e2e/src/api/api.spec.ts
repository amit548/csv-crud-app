import axios from 'axios';

function isObject(value: object) {
  return typeof value === 'object' && value !== null;
}

describe('Test User', () => {
  let userId: string;

  describe('POST User /api/v1/users', () => {
    it('should create a new user', async () => {
      const res = await axios.post(`/api/v1/users`, {
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '1234567890',
        age: 25,
        address: '123 Main St',
      });

      userId = res.data.data.user.uid;

      expect(res.status).toBe(201);
      expect(isObject(res.data)).toBe(true);
    });
  });

  describe('GET All Users /api/v1/users', () => {
    it('should retrieve a response object of users', async () => {
      const res = await axios.get(`/api/v1/users`);

      expect(res.status).toBe(200);
      expect(isObject(res.data)).toBe(true);
    });
  });

  describe(`GET User by ID /api/v1/users/:id`, () => {
    it('should retrieve a response object of a user by ID', async () => {
      const res = await axios.get(`/api/v1/users/${userId}`);

      expect(res.status).toBe(200);
      expect(isObject(res.data)).toBe(true);
    });
  });

  describe('PATCH User by ID /api/v1/users/:id', () => {
    it('should update a user by ID', async () => {
      const res = await axios.patch(`/api/v1/users/${userId}`, {
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '1234567890',
        age: 25,
      });

      expect(res.status).toBe(200);
      expect(isObject(res.data)).toBe(true);
    });
  });

  describe('DELETE User by ID /api/v1/users/:id', () => {
    it('should delete a user by ID', async () => {
      const res = await axios.delete(`/api/v1/users/${userId}`);

      expect(res.status).toBe(204);
    });
  });
});
