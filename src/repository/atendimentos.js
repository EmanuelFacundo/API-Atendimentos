const axios = require('axios')
const query = require('../infra/database/queries')

class Atendimentos {
  add(atendimento) {
    const sql = "INSERT INTO Atendimentos SET ?"

    return query(sql, atendimento)
  }

  show() {
    const sql = "SELECT * FROM Atendimentos"

    return query(sql)
  }

  showById(id) {
    const sql = `SELECT * FROM Atendimentos WHERE id = ${id}`

    return query(sql)
  }

  updateById(valores) {
    const sql = "UPDATE Atendimentos SET ? WHERE id = ?"

    return query(sql, valores)
  }

  deleteById(id) {
    const sql = "DELETE FROM Atendimentos WHERE id = ?"

    return query(sql, id)
  }
}

module.exports = new Atendimentos