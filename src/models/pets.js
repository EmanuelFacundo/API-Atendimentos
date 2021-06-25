const conexao = require('../infra/database/conexao')
const uploadFiles = require('../infra/files/uploadFiles')

class Pets {
  add(pet, res) {
    const sql = "INSERT INTO Pets SET ?"

    uploadFiles(pet.imagem, pet.nome, (err, newPath) => {

      if (err) {
        res.status(400).json(err)
      } else {
        const newPet = {
          nome: pet.nome,
          imagem: newPath
        }
  
        conexao.query(sql, newPet, err => {
          if (err) {
            res.status(400).json(err)
          } else {
            res.status(200).json(newPet)
          }
        })
      }
    })

  }
}

module.exports = new Pets()