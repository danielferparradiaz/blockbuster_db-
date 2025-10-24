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
    multimedia_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(25),
    url TEXT,
    tipo VARCHAR(15)
);



-- ============================
-- Tabla: multimedias_heroe
-- ============================
CREATE TABLE multimedias_heroe (
    heroes_id INT NOT NULL,
    multimedia_id INT NOT NULL,
    CONSTRAINT multimedias_heroe_heroes_fk FOREIGN KEY (heroes_id) REFERENCES heroes(id),
    CONSTRAINT multimedias_heroe_multimedias_fk FOREIGN KEY (multimedia_id) REFERENCES multimedias(multimedia_id),
    PRIMARY KEY (heroes_id, multimedia_id)
);



-- ============================
-- Inserts en heroes
-- ============================
INSERT INTO heroes (nombre, bio, img, aparicion, casa) VALUES
('Iron Man', 'Tony Stark, genio multimillonario y filántropo, crea una armadura para proteger al mundo.', 'ironman.jpg', '2008-05-02', 'Marvel'),
('Captain America', 'Steve Rogers, un soldado mejorado con el suero del supersoldado.', 'captain_america.jpg', '2011-07-22', 'Marvel'),
('Thor', 'Dios del trueno y miembro de los Vengadores.', 'thor.jpg', '2011-05-06', 'Marvel'),
('Spider-Man', 'Peter Parker obtiene poderes arácnidos tras la picadura de una araña radiactiva.', 'spiderman.jpg', '2002-05-03', 'Marvel'),
('Black Widow', 'Natasha Romanoff, ex espía rusa convertida en heroína.', 'black_widow.jpg', '2010-05-07', 'Marvel'),
('Hulk', 'Bruce Banner se transforma en un ser verde de fuerza descomunal.', 'hulk.jpg', '2008-06-13', 'Marvel'),
('Superman', 'Clark Kent, alienígena de Krypton criado en la Tierra.', 'superman.jpg', '2013-06-14', 'DC'),
('Batman', 'Bruce Wayne, multimillonario que combate el crimen en Gotham.', 'batman.jpg', '2005-06-15', 'DC'),
('Wonder Woman', 'Diana Prince, princesa amazona con fuerza sobrehumana.', 'wonder_woman.jpg', '2017-06-02', 'DC'),
('Flash', 'Barry Allen, el hombre más rápido del mundo.', 'flash.jpg', '2023-06-16', 'DC');

-- ============================
-- Inserts en peliculas
-- ============================
INSERT INTO peliculas (nombre) VALUES
('Iron Man'),
('Captain America: The First Avenger'),
('Thor'),
('The Avengers'),
('Black Widow'),
('The Incredible Hulk'),
('Man of Steel'),
('The Dark Knight'),
('Wonder Woman'),
('The Flash');

-- ============================
-- Inserts en protagonistas
-- (relacionan héroes y películas)
-- ============================
INSERT INTO protagonistas (papel, fecha_participacion, heroes_id, peliculas_id) VALUES
('Tony Stark / Iron Man', '2008-05-02', 1, 1),
('Steve Rogers / Captain America', '2011-07-22', 2, 2),
('Thor Odinson', '2011-05-06', 3, 3),
('Peter Parker / Spider-Man', '2012-05-04', 4, 4),
('Natasha Romanoff / Black Widow', '2021-07-09', 5, 5),
('Bruce Banner / Hulk', '2008-06-13', 6, 6),
('Clark Kent / Superman', '2013-06-14', 7, 7),
('Bruce Wayne / Batman', '2008-07-18', 8, 8),
('Diana Prince / Wonder Woman', '2017-06-02', 9, 9),
('Barry Allen / Flash', '2023-06-16', 10, 10);

-- ============================
-- Inserts en usuarios
-- ============================
INSERT INTO usuarios (nombre, correo, password, img, rol, estado, google, fecha_creacion, fecha_actualizacion) VALUES
('Daniel Parra', 'daniel@blockbuster.com', 'hashedpass123', 'daniel.jpg', 'ADMIN', 'A', 'N', '2025-01-01', '2025-01-01'),
('Maria Lopez', 'maria@blockbuster.com', 'hashedpass234', 'maria.jpg', 'USER', 'A', 'S', '2025-02-15', '2025-02-15'),
('Carlos Ruiz', 'carlos@blockbuster.com', 'hashedpass345', 'carlos.jpg', 'USER', 'A', 'N', '2025-03-10', '2025-03-10'),
('Ana Torres', 'ana@blockbuster.com', 'hashedpass456', 'ana.jpg', 'USER', 'A', 'N', '2025-04-05', '2025-04-05'),
('Pedro Mejía', 'pedro@blockbuster.com', 'hashedpass567', 'pedro.jpg', 'ADMIN', 'A', 'S', '2025-05-20', '2025-05-20');

-- ============================
-- Inserts en multimedias
-- ============================
INSERT INTO multimedias (nombre, url, tipo) VALUES
('Trailer Iron Man', 'https://youtube.com/ironman', 'video'),
('Poster Captain America', 'https://images.com/captainamerica.jpg', 'imagen'),
('Clip Thor', 'https://youtube.com/thorclip', 'video'),
('Poster Wonder Woman', 'https://images.com/wonderwoman.jpg', 'imagen'),
('Trailer The Flash', 'https://youtube.com/flashtrailer', 'video');

-- ============================
-- Inserts en multimedias_heroe
-- (relaciona héroes con multimedia)
-- ============================
INSERT INTO multimedias_heroe (heroes_id, multimedia_id) VALUES
(1, 1), -- Iron Man → Trailer Iron Man
(2, 2), -- Captain America → Poster
(3, 3), -- Thor → Clip Thor
(9, 4), -- Wonder Woman → Poster
(10, 5); -- Flash → Trailer


-- ============================
-- Más héroes (id 11–20)
-- ============================
INSERT INTO heroes (nombre, bio, img, aparicion, casa) VALUES
('Doctor Strange', 'Stephen Strange, ex cirujano que se convierte en el Hechicero Supremo.', 'doctor_strange.jpg', '2016-11-04', 'Marvel'),
('Black Panther', 'T’Challa, rey de Wakanda y portador del traje de Pantera Negra.', 'black_panther.jpg', '2018-02-16', 'Marvel'),
('Ant-Man', 'Scott Lang, ladrón reformado que usa un traje que le permite encogerse.', 'antman.jpg', '2015-07-17', 'Marvel'),
('Scarlet Witch', 'Wanda Maximoff, poderosa hechicera con habilidades telequinéticas.', 'scarlet_witch.jpg', '2015-05-01', 'Marvel'),
('Aquaman', 'Arthur Curry, rey de la Atlántida y defensor de los mares.', 'aquaman.jpg', '2018-12-21', 'DC'),
('Cyborg', 'Victor Stone, mitad humano mitad máquina, miembro de la Liga de la Justicia.', 'cyborg.jpg', '2017-11-17', 'DC'),
('Green Lantern', 'Hal Jordan, piloto que recibe un anillo con poder cósmico.', 'green_lantern.jpg', '2011-06-17', 'DC'),
('Shazam', 'Billy Batson, joven que puede transformarse en un superhéroe adulto.', 'shazam.jpg', '2019-04-05', 'DC'),
('Loki', 'Hermano de Thor, dios del engaño y la travesura.', 'loki.jpg', '2011-05-06', 'Marvel'),
('Harley Quinn', 'Ex psiquiatra convertida en villana y antiheroína de Gotham.', 'harley_quinn.jpg', '2016-08-05', 'DC');

-- ============================
-- Más películas (id 11–20)
-- ============================
INSERT INTO peliculas (nombre) VALUES
('Doctor Strange'),
('Black Panther'),
('Ant-Man'),
('Avengers: Age of Ultron'),
('Aquaman'),
('Justice League'),
('Green Lantern'),
('Shazam!'),
('Loki'),
('Birds of Prey');

-- ============================
-- Protagonistas (nuevos vínculos)
-- ============================
INSERT INTO protagonistas (papel, fecha_participacion, heroes_id, peliculas_id) VALUES
('Stephen Strange / Doctor Strange', '2016-11-04', 11, 11),
('T’Challa / Black Panther', '2018-02-16', 12, 12),
('Scott Lang / Ant-Man', '2015-07-17', 13, 13),
('Wanda Maximoff / Scarlet Witch', '2015-05-01', 14, 14),
('Arthur Curry / Aquaman', '2018-12-21', 15, 15),
('Victor Stone / Cyborg', '2017-11-17', 16, 16),
('Hal Jordan / Green Lantern', '2011-06-17', 17, 17),
('Billy Batson / Shazam', '2019-04-05', 18, 18),
('Loki Laufeyson', '2021-06-09', 19, 19),
('Harleen Quinzel / Harley Quinn', '2020-02-07', 20, 20);

-- ============================
-- Nuevos multimedias
-- ============================
INSERT INTO multimedias (nombre, url, tipo) VALUES
('Trailer Doctor Strange', 'https://youtube.com/doctorstrange', 'video'),
('Poster Black Panther', 'https://images.com/blackpanther.jpg', 'imagen'),
('Clip Ant-Man', 'https://youtube.com/antmanclip', 'video'),
('Poster Avengers: Age of Ultron', 'https://images.com/ageofultron.jpg', 'imagen'),
('Trailer Aquaman', 'https://youtube.com/aquaman', 'video'),
('Poster Justice League', 'https://images.com/justiceleague.jpg', 'imagen'),
('Trailer Green Lantern', 'https://youtube.com/greenlantern', 'video'),
('Poster Shazam!', 'https://images.com/shazam.jpg', 'imagen'),
('Serie Loki Trailer', 'https://youtube.com/lokitrailer', 'video'),
('Poster Birds of Prey', 'https://images.com/birdsofprey.jpg', 'imagen');

-- ============================
-- Relaciones multimedia ↔ héroes
-- ============================
INSERT INTO multimedias_heroe (heroes_id, multimedia_id) VALUES
(11, 6),  -- Doctor Strange → Trailer
(12, 7),  -- Black Panther → Poster
(13, 8),  -- Ant-Man → Clip
(14, 9),  -- Scarlet Witch → Poster Age of Ultron
(15, 10), -- Aquaman → Trailer
(16, 11), -- Cyborg → Poster Justice League
(17, 12), -- Green Lantern → Trailer
(18, 13), -- Shazam → Poster
(19, 14), -- Loki → Trailer Serie
(20, 15); -- Harley Quinn → Poster Birds of Prey

