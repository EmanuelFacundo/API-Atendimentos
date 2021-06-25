class Tabelas {
  init(conexao) {
    this.conexao = conexao;
    console.log("Tabelas foram chamadas!")
    this.criarAtendimentos()
    this.createPets()
  }

  criarAtendimentos(){
    var sql = "CREATE TABLE IF NOT EXISTS Atendimentos (id int NOT NULL AUTO_INCREMENT, "
    sql += "cliente varchar(11) NOT NULL, pet varchar(20), servico varchar(20) NOT NULL, "
    sql += "data datetime NOT NULL, dataCriacao datetime NOT NULL, "
    sql += "status varchar(20) NOT NULL, observacoes text, PRIMARY KEY(id))"

    this.conexao.query(sql, err => {
      if(err) {
        console.log(err)
      } else {
        console.log("Tabela Atendimentos criada com sucesso!")
      }
    })
  }

  createPets(){
    var sql = "CREATE TABLE IF NOT EXISTS Pets (id int NOT NULL AUTO_INCREMENT, "
    sql += "nome varchar(50), imagem varchar(200), PRIMARY KEY(id))"

    this.conexao.query(sql, err => {
      if(err) {
        console.log(err)
      } else {
        console.log("Tabela Pets foi criada com sucesso!")
      }
    })
  }
}

module.exports = new Tabelas