const Pets = require("../models/pets")


module.exports = app => {

  app.post('/pets', (req, res) => {
    const pets = req.body

    Pets.add(pets, res)
  })
}