const jwt = require('jsonwebtoken');
const { Secret, Expires } = require('../config/token');
const generateUniqueId = require('../Utils/generateUniqueId');
const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const ongs = await connection('ongs').select('*');
    return response.json(ongs);
  },

  async create(request, response) {
    const { name, email, whatsapp, city, uf } = request.body;

    const id = generateUniqueId();

    await connection('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf,
    });

    const token = jwt.sign({ id: id }, Secret, {
      expiresIn: Expires,
    });

    return response.send({
      token,
      id,
      name,
    });
  },

  async update(request, response) {
    const { id } = request.params;
    const ong_id = request.user.id;
    const { name, email, whatsapp, city, uf } = request.body;

    if (id != ong_id) {
      return response.status(401).json({ error: 'Operation not permitted. ' });
    }

    try {
      await connection('ongs')
        .where('id', id)
        .update({
          name,
          email,
          whatsapp,
          city,
          uf,
        });
    } catch (error) {
      return response.status(400).json({ error: 'Error UPDATING.' });
    }

    const ong = await connection('ongs')
      .select('name')
      .where('id', id)
      .first();

    return response.json(ong.name);
  },

  async delete(request, response) {
    const { id } = request.params;
    const ong_id = request.user.id;

    if (id != ong_id) {
      return response.status(401).json({ error: 'Operation not permitted. ' });
    }

    await connection('ongs')
      .where('id', id)
      .first()
      .delete();

    return response.status(204).send();
  },
};
