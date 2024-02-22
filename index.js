/**
 * @api {object} BoutiqueJeux API de la Boutique de Jeux
 * @apiDescription API de la Boutique de Jeux pour la gestion des jeux vidéo et des clients.
 * @apiName BoutiqueJeux
 * @apiGroup API
 */

// Import des modules nécessaires pour créer l'application Express
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";

// Import des routes définies pour les jeux vidéo et les clients
import gameRoutes from "./routes/gameRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";

// Initialisation de l'application Express
const app = express();
const port = process.env.PORT || 5001;

// Connexion à la base de données MongoDB
mongoose
  .connect("mongodb://127.0.0.1/boutique-jeux", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connexion à MongoDB établie");
  })
  .catch((error) => {
    console.error("Erreur de connexion à MongoDB :", error);
  });

/**
 * @api {function} Middleware CORS Middleware pour activer CORS (Cross-Origin Resource Sharing)
 * @apiName CorsMiddleware
 * @apiGroup Middleware
 *
 * @apiExample {js} Example usage:
 *  app.use(cors());
 *
 *
 * @apiDescription Middleware permettant d'activer Cross-Origin Resource Sharing (CORS) pour permettre les requêtes depuis des domaines différents.
 */

// Middleware pour activer CORS (Cross-Origin Resource Sharing)
app.use(cors());

/**
 * @api {function} Middleware JSON Middleware pour analyser les données JSON dans les requêtes
 * @apiName JsonMiddleware
 * @apiGroup Middleware
 *
 * @apiExample {js} Example usage:
 *     app.use(bodyParser.json());
 *     app.use(bodyParser.urlencoded({ extended: true }));
 *
 * @apiDescription Middleware pour analyser les données JSON dans les requêtes entrantes.
 */

// Middleware pour analyser les données JSON dans les requêtes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * @api {function} Middleware Route Middleware pour gérer les routes des jeux vidéo et des clients
 * @apiName RouteMiddleware
 * @apiGroup Middleware
 *
 * @apiExample {js} Example usage:
 *     app.use("/api", gameRoutes);
 *     app.use("/api", customerRoutes);
 *
 *
 * @apiDescription Middleware pour gérer les routes des jeux vidéo et des clients.
 */

// Middleware pour gérer les routes des jeux vidéo et des clients
app.use("/api", gameRoutes);
app.use("/api", customerRoutes);

/**
 * @api {function} Middleware Error Middleware pour la gestion des erreurs
 * @apiName ErrorMiddleware
 * @apiGroup Middleware
 *
 * @apiExample {js} Example usage:
 *     app.use((err, req, res, next) => {
 *        console.error(err.stack);
 *        res.status(500).json({ error: "Une erreur est survenue sur le serveur" });
 *      });
 *
 * @apiDescription Middleware pour capturer et gérer les erreurs survenues dans l'application.
 */

// Gestion des erreurs : Middleware pour capturer et gérer les erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Une erreur est survenue sur le serveur" });
});

// Démarrage du serveur Express
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
