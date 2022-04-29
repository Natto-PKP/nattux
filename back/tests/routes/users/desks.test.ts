import supertest from 'supertest';
import server from '../../../src/server';
import database from '../../../src/database';

const request = supertest(server);

// eslint-disable-next-line jest/require-top-level-describe
afterAll(async () => { await database.end(); });

let user: any;

describe('get token', () => {
  it('assign token', async () => {
    expect.hasAssertions();

    const { body } = await request.post('/users/token').type('form').send({
      email: process.env.NT_EMAIL,
      password: process.env.NT_PASSWORD,
    });

    expect(typeof body).toBe('object');

    user = body;
    user.token = `Bearer ${body.token}`;
  });
});

describe('post desks', () => {
  it('created', async () => {
    expect.hasAssertions();

    const { body } = await request.post(`/users/${user.id}/desks`).set('Authorization', user.token).type('form').send({
      theme: 'default',
      color: '#45df45',
    });

    expect(typeof body).toBe('object');
    expect(typeof body.id).toBe('number');
    expect(typeof body.theme).toBe('string');
    expect(typeof body.color).toBe('string');
    expect(typeof body.accountId).toBe('number');
    expect(body.background).toBeFalsy();

    user.deskId = body.id;
  });
});

describe('update desks', () => {
  it('updated', async () => {
    expect.hasAssertions();

    const { body } = await request.patch(`/users/${user.id}/desks/${user.deskId}`).set('Authorization', user.token).type('form').send({
      color: '#fad781',
    });

    expect(typeof body).toBe('object');
    expect(typeof body.id).toBe('number');
    expect(typeof body.theme).toBe('string');
    expect(typeof body.color).toBe('string');
    expect(typeof body.accountId).toBe('number');
    expect(body.background).toBeFalsy();
  });
});

describe('get desks', () => {
  it('getted', async () => {
    expect.hasAssertions();

    const { body } = await request.get(`/users/${user.id}/desks/${user.deskId}`).set('Authorization', user.token);

    expect(typeof body).toBe('object');
    expect(typeof body.id).toBe('number');
    expect(typeof body.theme).toBe('string');
    expect(typeof body.color).toBe('string');
    expect(typeof body.accountId).toBe('number');
    expect(body.background).toBeFalsy();
  });
});

describe('delete desks', () => {
  it('deleted', async () => {
    expect.hasAssertions();

    const { body } = await request.delete(`/users/${user.id}/desks/${user.deskId}`).set('Authorization', user.token);

    expect(typeof body).toBe('object');
  });
});
