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

describe('post folders', () => {
  it('created', async () => {
    expect.hasAssertions();

    const { body } = await request.post(`/users/${info.userId}/folders`).set('Authorization', info.token).type('form').send({
      name: 'random',
    });

    expect(typeof body).toBe('object');
    expect(typeof body.id).toBe('number');
    expect(typeof body.name).toBe('string');
    expect(typeof body.icon).toBe('string');
    expect(typeof body.favorite).toBe('boolean');
    expect(typeof body.userId).toBe('number');
    expect(body.folderId).toBeFalsy();

    info.folderId = body.id;
  });

  it('create file into folder', async () => {
    expect.hasAssertions();

    const { body } = await request.post(`/users/${info.userId}/folders/${info.folderId}/files`).set('Authorization', info.token).type('form').send({
      name: 'file',
      type: 'text',
    });

    expect(typeof body).toBe('object');
    expect(typeof body.id).toBe('number');
    expect(typeof body.name).toBe('string');
    expect(typeof body.type).toBe('string');
    expect(body.content).toBeFalsy();
    expect(body.folderId).toBe(info.folderId);
    expect(typeof body.userId).toBe('number');
  });
});

describe('patch folders', () => {
  it('updated', async () => {
    expect.hasAssertions();

    const { body } = await request.patch(`/users/${info.userId}/folders/${info.folderId}`).set('Authorization', info.token).type('form').send({
      name: 'folder',
    });

    expect(typeof body).toBe('object');
    expect(typeof body.id).toBe('number');
    expect(typeof body.name).toBe('string');
    expect(typeof body.icon).toBe('string');
    expect(typeof body.favorite).toBe('boolean');
    expect(typeof body.userId).toBe('number');
    expect(body.folderId).toBeFalsy();
  });
});

describe('get folders', () => {
  it('all getted', async () => {
    expect.hasAssertions();

    const { body } = await request.get(`/users/${info.userId}/folders`).set('Authorization', info.token);

    expect(Array.isArray(body)).toBeTruthy();
  });

  it('getted', async () => {
    expect.hasAssertions();

    const { body } = await request.get(`/users/${info.userId}/folders/${info.folderId}`).set('Authorization', info.token);

    expect(typeof body).toBe('object');
    expect(typeof body.id).toBe('number');
    expect(typeof body.name).toBe('string');
    expect(typeof body.icon).toBe('string');
    expect(typeof body.favorite).toBe('boolean');
    expect(typeof body.userId).toBe('number');
    expect(body.folderId).toBeFalsy();
  });
});

describe('delete folders', () => {
  it('deleted', async () => {
    expect.hasAssertions();

    const { body } = await request.delete(`/users/${info.userId}/folders/${info.folderId}`).set('Authorization', info.token);

    expect(typeof body).toBe('object');
  });
});
