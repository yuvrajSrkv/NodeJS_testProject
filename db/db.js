const Sequelize = reuire('sequelize');
const sequelize = new Sequelize('nodeJsTest','root','Ramkeshav72@',{dialect : 'mysql',host: 'localhost'});

try{
    sequelize.authenticate();
    console.log('connection has been established successfully');
}catch(e){
    console.log(`Unable to connect to the database because of ${e}`);
}

module.exports = sequelize;