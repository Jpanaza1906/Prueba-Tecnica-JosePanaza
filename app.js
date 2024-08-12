// JOSE DAVID PANAZA BATRES
// 2024-12-08
// PRUEBA TECNICA PLOMARSA
// APLICACION PRINCIPAL

// IMPORTACIONES
const express = require('express');
const bodyParser = require('body-parser');
const conexion = require('./conexion');

// CONFIGURACION
const app = express();
app.use(bodyParser.json());

// ESTRUCTURA DE TAREA
const Task = {
    id: 0,
    titulo: '',
    descripcion: '',
};

// RUTAS

//Crear una nueva tarea
app.post('/api/tasks', (req, res) => {
    // Obtener los datos de la tarea
    const task = Object.create(Task);
    task.titulo = req.body.titulo;
    task.descripcion = req.body.descripcion;

    // Insertar la tarea en la base de datos
    conexion.query('INSERT INTO TAREA (titulo, descripcion) VALUES (?, ?)', [task.titulo, task.descripcion], (error, result) => {
        if (error) {
            res.status(500).send('Error al insertar la tarea');
        } else {
            task.id = result.insertId;
            res.status(201).send(task);
        }
    });
});

// Obtener todas las tareas
app.get('/api/tasks', (req, res) => {
    conexion.query('SELECT * FROM TAREA', (error, result) => {
        // Si no hay tareas, se envía un 404
        if (result.length === 0) {
            res.status(404).send('No se encontraron tareas');
            return;
        }
        if (error) {
            res.status(500).send('Error al obtener las tareas');
        } else {
            res.status(200).send(result);
        }
    });
});

// Obtener una tarea por su id
app.get('/api/tasks/:id', (req, res) => {
    const {id} = req.params;
    conexion.query('SELECT * FROM TAREA WHERE id = ?', [id], (error, result) => {
        // Si el id no existe, se envía un 404
        if (result.length === 0) {
            res.status(404).send('No se encontró la tarea con el id ' + id);
            return;
        }
        if (error) {
            res.status(500).send('Error al obtener la tarea');
        } else {
            res.status(200).send(result);
        }
    });
});

// Actualizar una tarea
app.put('/api/tasks/:id', (req, res) => {
    const {id} = req.params;
    const task = Object.create(Task);
    task.id = id;
    task.titulo = req.body.titulo;
    task.descripcion = req.body.descripcion;

    conexion.query('UPDATE TAREA SET titulo = ?, descripcion = ? WHERE id = ?', [task.titulo, task.descripcion, id], (error, result) => {
        // Si el id no existe, se envía un 404
        if (result.affectedRows === 0) {
            res.status(404).send('No se encontró la tarea con el id ' + id);
            return;
        }
        if (error) {
            res.status(500).send('Error al actualizar la tarea');
        } else {
            res.status(200).send(task);
        }
    });
});

// Eliminar una tarea
app.delete('/api/tasks/:id', (req, res) =>{
    const {id} = req.params;
    conexion.query('DELETE FROM TAREA WHERE id = ?', [id], (error, result) => {
        // Si el id no existe, se envía un 404
        if (result.affectedRows === 0) {
            res.status(404).send('No se encontró la tarea con el id ' + id);
            return;
        }
        if (error) {

            res.status(500).send('Error al eliminar la tarea');
        } else {
            res.status(200).send('Tarea con el id ' + id + ' eliminada');
        }
    });
});

// Levantar el servidor
app.listen(3000, () => {
    console.log('Servidor levantado en el puerto 3000');
});