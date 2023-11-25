const Sequelize = require('sequelize');

const sequelize = new Sequelize ("app", "root", "catolica",{
    host:'localhost',
    dialect: 'mysql'
});

sequelize.authenticate()
.then(function(){
    console.log("Conexao Sucesso");
}).catch(function(){
    console.log("Erro sem conexao cm DB");
});

sequelize.sync({ force: true }).then(() => {
    console.log('Banco de dados sincronizado.');
  }).catch((error) => {
    console.error('Erro ao sincronizar o banco de dados:', error);
  });

module.exports = sequelize;