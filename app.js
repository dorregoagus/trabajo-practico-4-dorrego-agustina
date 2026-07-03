import express from "express";
import sequelize from "./src/config/database.js";
import Movie from "./src/models/movie.model.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("API de películas funcionando");
});

sequelize.authenticate()
    .then(async () => {
        console.log("Conexión a la base de datos establecida correctamente.");

        await sequelize.sync();

        console.log("Tabla creada correctamente.");

        app.listen(3000, () => {
            console.log("Servidor ejecutándose en el puerto 3000");
        });
    })
    .catch((error) => {
        console.error("Error al conectar con la base de datos:", error);
    });