const customExpress = require('./config/customExpress')
const conexao = require('./infra/database/conexao')
const Tabelas = require('./infra/database/tabelas')

conexao.connect((err) => {
  if (err) {
    console.error(err)
  } else {
    console.log("Connected to Data Base")
    Tabelas.init(conexao)
    const app = customExpress()
    
    app.listen(4004,() => {
      console.log("Serve is on port 4004")
    })
  }
})

