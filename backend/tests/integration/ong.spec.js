const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
  let ongID;
  beforeAll(async () => {
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('Consegue pegar a ONG ?', async () => {
    const response = await request(app)
      .get('/ongs')
      .expect(200);

    expect(response.body[0]).toEqual({
      id: '65bc04f6',
      name: 'APAD',
      email: 'contato@apad.com.br',
      whatsapp: '2132003232',
      city: 'Rio do Sul',
      uf: 'SC',
    });
  });

  it('Consegue criar uma nova ONG ?', async () => {
    const response = await request(app)
      .post('/ongs')
      .send({
        name: 'teste',
        email: 'meexclua@teste.com.br',
        whatsapp: '2132003232',
        city: 'teste city',
        uf: 'tc',
      })
      .expect(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
    ongID = response.body.id;
  });

  it('Consegue editar a ONG ?', async () => {
    const response = await request(app)
      .put(`/ongs/${ongID}`)
      .set({ Authorization: ongID })
      .send({
        name: 'teste',
        email: 'meexclua@teste.org',
        whatsapp: '2132003232',
        city: 'teste city2',
        uf: 'tc',
      })
      .expect(200);

    expect(response.body).toEqual('teste');
  });

  it('Consegue deletar a ONG ?', async () => {
    const response = await request(app)
      .del(`/ongs/${ongID}`)
      .set({ Authorization: ongID })
      .expect(204);
  });
});
