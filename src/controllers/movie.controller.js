import Movie from "../models/movie.model.js";

export const getMovies = async (req, res) => {

    try {

        const movies = await Movie.findAll();

        res.json(movies);

    } catch (error) {

        res.status(500).json({
            message: "Error al obtener las películas."
        });

    }

};
export const createMovie = async (req, res) => {

    try {

        const { title, genre, duration, year, synopsis } = req.body;

        if (!title || !genre || duration === undefined || year === undefined) {
            return res.status(400).json({
                message: "Los campos title, genre, duration y year son obligatorios."
            });
        }

        if (!Number.isInteger(duration) || duration <= 0) {
            return res.status(400).json({
                message: "La duración debe ser un número entero mayor que 0."
            });
        }

        const currentYear = new Date().getFullYear();

        if (
            !Number.isInteger(year) ||
            year < 1888 ||
            year > currentYear ||
            year.toString().length !== 4
        ) {
            return res.status(400).json({
                message: "El año debe ser un número entero de 4 dígitos entre 1888 y el año actual."
            });
        }

        if (synopsis !== undefined && typeof synopsis !== "string") {
            return res.status(400).json({
                message: "La sinopsis debe ser un texto."
            });
        }

        const existingMovie = await Movie.findOne({
            where: { title }
        });

        if (existingMovie) {
            return res.status(400).json({
                message: "Ya existe una película con ese título."
            });
        }

        const movie = await Movie.create({
            title,
            genre,
            duration,
            year,
            synopsis
        });

        return res.status(201).json(movie);

    } catch (error) {

        return res.status(500).json({
            message: "Error al crear la película."
        });

    }

};
export const getMovieById = async (req, res) => {

    try {

        const { id } = req.params;

        const movie = await Movie.findByPk(id);

        if (!movie) {
            return res.status(404).json({
                message: "Película no encontrada."
            });
        }

        return res.json(movie);

    } catch (error) {

        return res.status(500).json({
            message: "Error al obtener la película."
        });

    }

};
export const updateMovie = async (req, res) => {

    try {

        const { id } = req.params;
        const { title, genre, duration, year, synopsis } = req.body;

        const movie = await Movie.findByPk(id);

        if (!movie) {
            return res.status(404).json({
                message: "Película no encontrada."
            });
        }

        if (!title || !genre || duration === undefined || year === undefined) {
            return res.status(400).json({
                message: "Los campos title, genre, duration y year son obligatorios."
            });
        }

        if (!Number.isInteger(duration) || duration <= 0) {
            return res.status(400).json({
                message: "La duración debe ser un número entero mayor que 0."
            });
        }

        const currentYear = new Date().getFullYear();

        if (
            !Number.isInteger(year) ||
            year < 1888 ||
            year > currentYear ||
            year.toString().length !== 4
        ) {
            return res.status(400).json({
                message: "El año debe ser un número entero de 4 dígitos entre 1888 y el año actual."
            });
        }

        if (synopsis !== undefined && typeof synopsis !== "string") {
            return res.status(400).json({
                message: "La sinopsis debe ser un texto."
            });
        }

        const existingMovie = await Movie.findOne({
            where: { title }
        });

        if (existingMovie && existingMovie.id !== movie.id) {
            return res.status(400).json({
                message: "Ya existe una película con ese título."
            });
        }

        await movie.update({
            title,
            genre,
            duration,
            year,
            synopsis
        });

        return res.json(movie);

    } catch (error) {

        return res.status(500).json({
            message: "Error al actualizar la película."
        });

    }

};
export const deleteMovie = async (req, res) => {

    try {

        const { id } = req.params;

        const movie = await Movie.findByPk(id);

        if (!movie) {
            return res.status(404).json({
                message: "Película no encontrada."
            });
        }

        await movie.destroy();

        return res.json({
            message: "Película eliminada correctamente."
        });

    } catch (error) {

        return res.status(500).json({
            message: "Error al eliminar la película."
        });

    }

};