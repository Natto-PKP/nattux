import supertest from 'supertest';
import server from '../../../src/server';
import database from '../../../src/database';

const request = supertest(server);

// eslint-disable-next-line jest/require-top-level-describe
afterAll(async () => { await database.end(); });

const info: any = {};

describe('get token', () => {
  it('assign token', async () => {
    expect.hasAssertions();

    const { body } = await request.post('/users/token').type('form').send({
      email: process.env.NT_EMAIL,
      password: process.env.NT_PASSWORD,
    });

    expect(typeof body).toBe('object');

    info.userId = body.id;
    info.token = `Bearer ${body.token}`;
  });
});

describe('get favorites', () => {
  it('get all files', async () => {
    expect.hasAssertions();

    const { body } = await request.get(`/users/${info.userId}/favorites/files`).set('Authorization', info.token);

    expect(Array.isArray(body)).toBeTruthy();
  });

  it('get all folders', async () => {
    expect.hasAssertions();

    const { body } = await request.get(`/users/${info.userId}/favorites/folders`).set('Authorization', info.token);

    expect(Array.isArray(body)).toBeTruthy();
  });
});
