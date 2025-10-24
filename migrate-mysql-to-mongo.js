// migrateToMongo.js
const mysql = require("mysql2/promise");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

async function migrate() {
    try {
        // 1️⃣ Conexión MySQL
        const env = process.env.DB_ENV === "remote" ? "REMOTE" : "LOCAL";

        const mysqlConn = await mysql.createConnection({
            host: process.env[`MYSQL_HOST_${env}`],
            user: process.env[`MYSQL_USER_${env}`],
            password: process.env[`MYSQL_PASSWORD_${env}`],
            database: process.env[`MYSQL_DB_${env}`],
        });


        // 2️⃣ Conexión Mongo
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Conectado a MongoDB");

        // 3️⃣ Definición de modelos Mongoose
        const Heroe = mongoose.model(
            "Heroe",
            new mongoose.Schema({
                nombre: String,
                bio: String,
                img: String,
                aparicion: Date,
                casa: String,
                multimedias: [
                    {
                        nombre: String,
                        url: String,
                        tipo: String,
                    },
                ],
                protagonistas: [
                    {
                        pelicula: String,
                        papel: String,
                        fecha_participacion: Date,
                    },
                ],
            })
        );

        const Pelicula = mongoose.model(
            "Pelicula",
            new mongoose.Schema({
                nombre: String,
                protagonistas: [
                    {
                        heroe: String,
                        papel: String,
                        fecha_participacion: Date,
                    },
                ],
            })
        );

        const Multimedia = mongoose.model(
            "Multimedia",
            new mongoose.Schema({
                nombre: String,
                url: String,
                tipo: String,
            })
        );

        // 4️⃣ Extraer datos desde MySQL
        const [heroes] = await mysqlConn.query("SELECT * FROM heroes");
        const [peliculas] = await mysqlConn.query("SELECT * FROM peliculas");
        const [multimedias] = await mysqlConn.query("SELECT * FROM multimedias");
        const [multimediasHeroe] = await mysqlConn.query("SELECT * FROM multimedias_heroe");
        const [protagonistas] = await mysqlConn.query("SELECT * FROM protagonistas");

        // 5️⃣ Crear mapas en memoria para acceso rápido
        const multimediaPorHeroe = {};
        for (const rel of multimediasHeroe) {
            if (!multimediaPorHeroe[rel.heroes_id]) multimediaPorHeroe[rel.heroes_id] = [];
            const m = multimedias.find((x) => x.multimedia_id === rel.multimedia_id);
            if (m)
                multimediaPorHeroe[rel.heroes_id].push({
                    nombre: m.nombre,
                    url: m.url,
                    tipo: m.tipo,
                });
        }

        const protagonistasPorHeroe = {};
        const protagonistasPorPelicula = {};

        for (const p of protagonistas) {
            // por heroe
            if (!protagonistasPorHeroe[p.heroes_id]) protagonistasPorHeroe[p.heroes_id] = [];
            const pelicula = peliculas.find((pl) => pl.id === p.peliculas_id);
            protagonistasPorHeroe[p.heroes_id].push({
                pelicula: pelicula?.nombre,
                papel: p.papel,
                fecha_participacion: p.fecha_participacion,
            });

            // por pelicula
            if (!protagonistasPorPelicula[p.peliculas_id]) protagonistasPorPelicula[p.peliculas_id] = [];
            const heroe = heroes.find((h) => h.id === p.heroes_id);
            protagonistasPorPelicula[p.peliculas_id].push({
                heroe: heroe?.nombre,
                papel: p.papel,
                fecha_participacion: p.fecha_participacion,
            });
        }

        // 6️⃣ Transformar y migrar
        await Heroe.deleteMany({});
        await Pelicula.deleteMany({});
        await Multimedia.deleteMany({});

        const heroesDocs = heroes.map((h) => ({
            nombre: h.nombre,
            bio: h.bio,
            img: h.img,
            aparicion: h.aparicion,
            casa: h.casa,
            multimedias: multimediaPorHeroe[h.id] || [],
            protagonistas: protagonistasPorHeroe[h.id] || [],
        }));

        const peliculasDocs = peliculas.map((p) => ({
            nombre: p.nombre,
            protagonistas: protagonistasPorPelicula[p.id] || [],
        }));

        await Heroe.insertMany(heroesDocs);
        await Pelicula.insertMany(peliculasDocs);
        await Multimedia.insertMany(multimedias);

        console.log(`✅ Migración completa:
🦸‍♂️ Heroes: ${heroesDocs.length}
🎬 Peliculas: ${peliculasDocs.length}
🖼️ Multimedias: ${multimedias.length}`);

        await mysqlConn.end();
        await mongoose.disconnect();
        process.exit(0);
    } catch (err) {
        console.error("❌ Error en la migración:", err);
        process.exit(1);
    }
}

// Llamada principal
migrate();
