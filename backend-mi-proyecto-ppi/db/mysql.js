const mysql      = require('mysql');

//Conexión local
/*
const connection = mysql.createConnection({
  host : "localhost",//127.0.0.1
  user : "oscar",
  password : "media2020",
  database : "media_tecnica_app",
  port : 3306
}) */

const connection = mysql.createConnection({
  host     : 'bfb0uqoprf7gt47xneak-mysql.services.clever-cloud.com',
  user     : 'ux6soryfrgj4sob3',
  password : '7ZbXR8cC9mzQbhWNn2rd',
  database : 'bfb0uqoprf7gt47xneak'
});


connection.connect((error) => {
    if(error){
      console.log(`Error en conexión a base de datos: ${error}`)
      return;
    }else{
      console.log("Conexión extablecida con el servidor de MySQL")
    }
});

module.exports =  {connection: connection}