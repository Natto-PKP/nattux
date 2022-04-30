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

describe('post files', () => {
  it('created', async () => {
    expect.hasAssertions();

    const { body } = await request.post(`/users/${info.userId}/files`).set('Authorization', info.token).type('form').send({
      name: 'random',
      type: 'text',
      content: 'I love ferret',
    });

    expect(typeof body).toBe('object');
    expect(typeof body.id).toBe('number');
    expect(typeof body.name).toBe('string');
    expect(typeof body.type).toBe('string');
    expect(typeof body.content).toBe('string');
    expect(body.folderId).toBeFalsy();
    expect(typeof body.userId).toBe('number');

    info.fileId = body.id;
  });
});

describe('patch files', () => {
  it('updated', async () => {
    expect.hasAssertions();

    const { body } = await request.patch(`/users/${info.userId}/files/${info.fileId}`).set('Authorization', info.token).type('form').send({
      content: 'FERRET FERRET FERRET FERRET',
    });

    expect(typeof body).toBe('object');
    expect(typeof body.id).toBe('number');
    expect(typeof body.name).toBe('string');
    expect(typeof body.type).toBe('string');
    expect(typeof body.content).toBe('string');
    expect(body.folderId).toBeFalsy();
    expect(typeof body.userId).toBe('number');
  });
});

describe('get files', () => {
  it('all getted', async () => {
    expect.hasAssertions();

    const { body } = await request.get(`/users/${info.userId}/files`).set('Authorization', info.token);

    expect(Array.isArray(body)).toBeTruthy();
  });

  it('one getted', async () => {
    expect.hasAssertions();

    const { body } = await request.get(`/users/${info.userId}/files/${info.fileId}`).set('Authorization', info.token);

    expect(typeof body).toBe('object');
    expect(typeof body.id).toBe('number');
    expect(typeof body.name).toBe('string');
    expect(typeof body.type).toBe('string');
    expect(typeof body.content).toBe('string');
    expect(body.folderId).toBeFalsy();
    expect(typeof body.userId).toBe('number');
  });
});

describe('delete files', () => {
  it('deleted', async () => {
    expect.hasAssertions();

    const { body } = await request.delete(`/users/${info.userId}/files/${info.userId}`).set('Authorization', info.token);

    expect(typeof body).toBe('object');
  });
});
