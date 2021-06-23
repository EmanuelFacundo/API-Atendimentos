const moment = require('moment')
const conexao = require('../infra/conexao')

class Atendimentos {
  add(atendimento, res) {
    const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss')
    const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')
    const dataValid = moment(data).isSameOrAfter(dataCriacao)
    const clientValid = atendimento.cliente.length > 4

    const validations = [
      {
        name: 'data',
        valid: dataValid,
        message: 'Data deve ser maior ou igual a data atual'
      },
      {
        name: 'cliente',
        valid: clientValid,
        message: 'Cliente deve ter pelo menos 5 caracteres'
      }
    ]

    const errs = validations.filter(validation => !validation.valid)

    if (errs.length > 0) {
      res.status(400).json(errs)
    } else {
      const atendimentoDatado = { ...atendimento, dataCriacao, data }

      const sql = "INSERT INTO Atendimentos SET ?"

      conexao.query(sql, atendimentoDatado, (err, result) => {
        if (err) {
          res.status(400).json(err.sqlMessage)
        } else {
          res.status(201).json(atendimento)
        }
      })
    }

  }

  show(res) {
    const sql = "SELECT * FROM Atendimentos"

    conexao.query(sql, (err, result) => {
      if (err) {
        res.status(400).json(err)
      } else {
        res.status(200).json(result)
      }
    })
  }

  showById(id, res) {
    const sql = `SELECT * FROM Atendimentos WHERE id = ${id}`

    conexao.query(sql, (err, result) => {
      if (err) {
        res.status(400).json(err)
      } else {
        res.status(200).json(result[0])
      }
    })
  }

  updateById(id, valores, res) {
    if (valores.data){
      valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')
    }

    const sql = "UPDATE Atendimentos SET ? WHERE id = ?"

    conexao.query(sql, [valores, id], (err, result) => {
      if (err) {
        res.status(400).json(err)
      } else {
        res.status(200).json({
          id,
          valores
        })
      }
    })
  }

  deleteById(id, res) {
    const sql = "DELETE FROM Atendimentos WHERE id = ?"

    conexao.query(sql, id, (err, result) => {
      if (err) {
        res.status(400).json(err)
      } else {
        res.status(200).json({
          id
        })
      }
    })
  }
}

module.exports = new Atendimentos