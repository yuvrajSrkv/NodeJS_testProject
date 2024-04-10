const Sequelize = require('sequelize');
const sequelize = new Sequelize('nojejstest','root','Ramkeshav72@',{dialect : 'mysql',host: 'localhost'});

try{
    // aunthecation
    sequelize.authenticate();
    console.log('connection has been established successfully');
}catch(e){
    console.log(`Unable to connect to the database because of ${e}`);
}

module.exports = sequelize;
