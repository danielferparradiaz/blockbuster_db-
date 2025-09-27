-- ============================
-- Base de datos
-- ============================
CREATE DATABASE IF NOT EXISTS blockbuster_db;
USE blockbuster_db;

-- ============================
-- Tabla: heroes
-- ============================
CREATE TABLE heroes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(30) NOT NULL,
    bio TEXT,
    img VARCHAR(250),
    aparicion DATE,
    casa VARCHAR(20),
    UNIQUE KEY heroes_nombre_u (nombre)
);

-- ============================
-- Tabla: peliculas
-- ============================
CREATE TABLE peliculas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(30) NOT NULL
);

-- ============================
-- Tabla: protagonistas
-- ============================
CREATE TABLE protagonistas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    papel TEXT,
    fecha_participacion DATE,
    heroes_id INT,
    peliculas_id INT,
    CONSTRAINT protagonistas_heroes_fk FOREIGN KEY (heroes_id) REFERENCES heroes(id),
    CONSTRAINT protagonistas_peliculas_fk FOREIGN KEY (peliculas_id) REFERENCES peliculas(id)
);

-- ============================
-- Tabla: usuarios
-- ============================
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    correo VARCHAR(50) NOT NULL,
    password VARCHAR(250) NOT NULL,
    img VARCHAR(150),
    rol VARCHAR(10),
    estado CHAR(1),
    google CHAR(1),
    fecha_creacion DATE,
    fecha_actualizacion DATE,
    UNIQUE KEY usuarios_correo_u (correo)
);

-- ============================
-- Tabla: multimedias
-- ============================
CREATE TABLE multimedias (
    idmultimedia INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(25),
    url TEXT,
    tipo VARCHAR(15)
);


-- ============================
-- Tabla: multimedias_heroe
-- ============================
CREATE TABLE multimedias_heroe (
    heroes_id INT NOT NULL,
    idmultimedia INT NOT NULL,
    CONSTRAINT multimedias_heroe_heroes_fk FOREIGN KEY (heroes_id) REFERENCES heroes(id),
    CONSTRAINT multimedias_heroe_multimedias_fk FOREIGN KEY (idmultimedia) REFERENCES multimedias(idmultimedia),
    PRIMARY KEY (heroes_id, idmultimedia)
);
