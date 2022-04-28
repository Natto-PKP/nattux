import supertest from 'supertest';
import server from '../../src/server';
import database from '../../src/database';

const request = supertest(server);

// eslint-disable-next-line jest/require-top-level-describe
afterAll(async () => { await database.end(); });

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const user: any = {};

describe('post users', () => {
  it('created', async () => {
    expect.hasAssertions();

    const { body } = await request.post('/users').type('form').send({
      email: `${(Math.random() + 1).toString(36).substring(7)}@test.com`,
      pseudo: `test-user-${(Math.random() + 1).toString(36).substring(7)}`,
      password: 'azerty',
    });

    expect(typeof body).toBe('object');
    expect(typeof body.id).toBe('number');
    expect(typeof body.email).toBe('string');
    expect(typeof body.pseudo).toBe('string');
    expect(body.password).toBeFalsy();
    expect(body.avatar).toBeFalsy();

    user.id = body.id;
    user.email = body.email;
  });

  it('missing params', async () => {
    expect.hasAssertions();

    const { body } = await request.post('/users').type('form').send({
      email: 'fake@email.com',
    });

    expect(typeof body).toBe('object');
    expect(body.code).toBe(400);
  });
});

describe('get token', () => {
  it('grabbed', async () => {
    expect.hasAssertions();

    const { body } = await request.post('/users/token').type('form').send({
      email: user.email,
      password: 'azerty',
    });

    expect(typeof body).toBe('object');
    expect(typeof body.id).toBe('number');
    expect(typeof body.token).toBe('string');

    user.token = `Bearer ${body.token}`;
  });
});

describe('update user', () => {
  it('updated', async () => {
    expect.hasAssertions();

    const { body } = await request.patch(`/users/${user.id}`).type('form').set('Authorization', user.token).send({
      password: '0123456',
      pseudo: 'random',
    });

    expect(typeof body).toBe('object');
    expect(typeof body.id).toBe('number');
    expect(typeof body.email).toBe('string');
    expect(typeof body.pseudo).toBe('string');
    expect(body.password).toBeFalsy();
    expect(body.avatar).toBeFalsy();
  });
});

describe('get user', () => {
  it('getted', async () => {
    expect.hasAssertions();

    const { body } = await request.get(`/users/${user.id}`).set('Authorization', user.token);

    expect(typeof body).toBe('object');
    expect(typeof body.id).toBe('number');
    expect(typeof body.email).toBe('string');
    expect(typeof body.pseudo).toBe('string');
    expect(body.password).toBeFalsy();
    expect(body.avatar).toBeFalsy();
  });
});

describe('delete user', () => {
  it('deleted', async () => {
    expect.hasAssertions();

    const { body } = await request.delete(`/users/${user.id}`).set('Authorization', user.token);

    expect(typeof body).toBe('object');
  });
});
