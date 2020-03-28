const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('INCIDENTS', () => {
  let incidentID;
  beforeAll(async () => {
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('Consegue pegar o Incident ?', async () => {
    const response = await request(app)
      .get('/incidents')
      .expect(200);
    expect(response.body).toEqual([
      {
        id: 2,
        title: 'Caso 1',
        description: 'Detalhes do caso',
        value: 120,
        ong_id: '65bc04f6',
        name: 'APAD',
        email: 'contato@apad.com.br',
        whatsapp: '2132003232',
        city: 'Rio do Sul',
        uf: 'SC',
      },
    ]);
  });

  it('consegue criar um novo Incident ?', async () => {
    const response = await request(app)
      .post('/incidents')
      .set({ Authorization: '65bc04f6' })
      .send({
        title: 'Teste',
        description: 'Me Exclua',
        value: '999',
      })
      .expect(200);
    expect(response.body).toHaveProperty('id');
    incidentID = response.body.id;
  });

  it('Consegue deletar o Incident ?', async () => {
    const response = await request(app)
      .del(`/incidents/${incidentID}`)
      .set({ Authorization: '65bc04f6' })
      .expect(204);
  });
});
