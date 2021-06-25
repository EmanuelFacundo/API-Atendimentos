const moment = require('moment')
const repository = require('../repository/atendimentos')

const conexao = require('../infra/database/conexao')

class Atendimentos {
  constructor() {
    this.dataValid = ({ data, dataCriacao }) =>  moment(data).isSameOrAfter(dataCriacao)
    this.clientValid = ({length}) => length >= 5
    this.valid = params => {
      return this.validations.filter(validation => {
        const { name } = validation
        const param = params[name]
        return !validation.valid(param)
      })
    }

    this.validations = [
      {
        name: 'data',
        valid: this.dataValid,
        message: 'Data deve ser maior ou igual a data atual'
      },
      {
        name: 'cliente',
        valid: this.clientValid,
        message: 'Cliente deve ter pelo menos 5 caracteres'
      }
    ]

  }
  
  add(atendimento) {
    const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss')
    const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')

    const params = {
      data: { data, dataCriacao },
      cliente: { length: atendimento.cliente.length}
    }

    const errs = this.valid(params)

    if (errs.length) {
      return new Promise((_, reject) => {
        reject(errs)
      })
    } else {
      const atendimentoDatado = { ...atendimento, dataCriacao, data }
      return repository.add(atendimentoDatado)
        .then(results => {
          atendimento = { ...atendimento, id: results.insertId }
          return atendimento
        })

    }

  }

  show(res) {
    
    return repository.show()
  }

  showById(id) {
    
    return repository.showById(id)
  }

  updateById(id, valores) {
    if (valores.data) {
      valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')
    }

    
    return repository.updateById([valores, id])
  }

  deleteById(id) {
    
    return repository.deleteById(id)
  }
}

module.exports = new Atendimentos