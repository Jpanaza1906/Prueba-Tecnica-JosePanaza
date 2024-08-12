// JOSE DAVID PANAZA BATRES
// 2024-12-08
// PRUEBA TECNICA PLOMARSA
// CONEXION A LA BASE DATOS

// IMPORTACIONES
const mysql = require('mysql2');

// CONEXION A LA BASE DE DATOS
const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'plomarsa'
});

// PRUEBA DE CONEXION

conexion.connect((error) => {
    if (error) {
        console.log('Error en la conexion a la base de datos');
    } else {
        console.log('Conexion exitosa a la base de datos');
    }
});

// EXPORTACION
module.exports = conexion;

