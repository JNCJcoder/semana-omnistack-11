const connection = require('../database/connection');
const jwt = require('jsonwebtoken');
const { Secret, Expires } = require('../config/token');

module.exports = {
  async create(request, response) {
    const { id } = request.body;

    const ong = await connection('ongs')
      .where('id', id)
      .select('name')
      .first();

    if (!ong) {
      return response.status(400).json({ error: 'No ONG found with this ID' });
    }

    const token = jwt.sign({ id: id }, Secret, {
      expiresIn: Expires,
    });

    return response.send({
      token: token,
      id: id,
      name: ong.name,
    });
  },
};
