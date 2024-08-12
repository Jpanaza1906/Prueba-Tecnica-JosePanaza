CREATE DATABASE IF NOT EXISTS plomarsa;

use plomarsa;

CREATE TABLE TAREA
(
    id          INT AUTO_INCREMENT PRIMARY KEY,
    titulo      VARCHAR(255) NOT NULL,
    descripcion VARCHAR(255) NOT NULL
);
