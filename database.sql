-- Crear base de datos
CREATE DATABASE IF NOT EXISTS scrum_db;
USE scrum_db;

-- Crear tabla para almacenar registros
CREATE TABLE IF NOT EXISTS registros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    equipo VARCHAR(255) NOT NULL,
    sprint INT NOT NULL,
    tipo VARCHAR(255) NOT NULL,
    comentarios TEXT,
    archivoName VARCHAR(255) NOT NULL,
    archivoPath VARCHAR(255) NOT NULL
);
