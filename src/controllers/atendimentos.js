const Atendimentos = require("../models/atendimentos")

module.exports = app => {
  app.get('/atendimentos', (req, res) => {
    Atendimentos.show(res)
  })

  app.get('/atendimentos/:id', (req, res) => {
    const id = parseInt(req.params.id)

    Atendimentos.showById(id, res)
  })
  
  app.post('/atendimentos', (req, res) => {
    const atendimento = req.body
    Atendimentos.add(atendimento, res)
  })
  
  app.patch('/atendimentos/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const valores = req.body
    Atendimentos.updateById(id, valores, res)
  })
  
  app.delete('/atendimentos/:id', (req, res) => {
    const id = parseInt(req.params.id)
  
    Atendimentos.deleteById(id, res)
  })
}