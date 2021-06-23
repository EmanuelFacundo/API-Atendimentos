class Tabelas {
  init(conexao) {
    this.conexao = conexao;
    console.log("Tabelas foram chamadas!")
    this.criarAtendimentos()
  }

  criarAtendimentos(){
    var sql = "CREATE TABLE IF NOT EXISTS Atendimentos (id int NOT NULL AUTO_INCREMENT, "
    sql += "cliente varchar(50) NOT NULL, pet varchar(20), servico varchar(20) NOT NULL, "
    sql += "data datetime NOT NULL, dataCriacao datetime NOT NULL, "
    sql += "status varchar(20) NOT NULL, observacoes text, PRIMARY KEY(id))"

    this.conexao.query(sql, err => {
      if(err) {
        console.log(err)
      } else {
        console.log("Tabela atendimentos criada com sucesso!")
      }
    })
  }
}

module.exports = new Tabelas