const axios = require('axios')
const Atendimentos = require("../models/atendimentos")

module.exports = async app => {
  app.get('/atendimentos', (req, res) => {
    Atendimentos.show()
      .then(results => {
        res.json(results)
      })
      .catch(errs => {
        res.status(400).json(errs)
      })
  })

  app.get('/atendimentos/:id', (req, res) => {
    const id = parseInt(req.params.id)

    Atendimentos.showById(id)
      .then(async results => {
        const result = results[0]
        const cpf = result.cliente
        const { data } = await axios.get(`http://localhost:8082/${cpf}`)

        res.json({ ...result, cliente: data })
      })
  })

  app.post('/atendimentos', (req, res) => {
    const atendimento = req.body

    Atendimentos.add(atendimento)
      .then(atendimentoAdded => {
        res.json(atendimentoAdded)
      })
      .catch(errs => {
        res.status(400).json(errs)
      })
  })

  app.patch('/atendimentos/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const valores = req.body
    Atendimentos.updateById(id, valores)
      .then(results => {
        res.json(results)
      })
      .catch(errs => {
        res.status(400).json(errs)
      })
  })

  app.delete('/atendimentos/:id', (req, res) => {
    const id = parseInt(req.params.id)

    Atendimentos.deleteById(id)
      .then(results => {
        res.json(results)
      })
      .catch(errs => {
        res.status(400).json(errs)
      })
  })
}