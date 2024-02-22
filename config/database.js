/**
 * @api {object} Database Connexion à la base de données
 * @apiDescription Module de connexion à la base de données MongoDB.
 * @apiName Database
 * @apiGroup Base de données
 */

// Importation du module mongoose, qui permet d'interagir avec la base de données MongoDB.
import mongoose from "mongoose";

/**
 * @api {function} connectToDatabase() Établir une connexion à la base de données
 * @apiName ConnectToDatabase
 * @apiGroup Base de données
 *
 * @apiDescription Cette fonction asynchrone permet d'établir une connexion à la base de données MongoDB en utilisant les paramètres de configuration spécifiés.
 *
 * @apiSuccess {String} message Message de confirmation de la connexion à MongoDB.
 *
 * @apiError {String} error Message d'erreur en cas d'échec de la connexion à MongoDB.
 */

// Fonction asynchrone pour établir une connexion à la base de données MongoDB.
const connectToDatabase = async () => {
  try {
    // Utilisation de la méthode connect() de mongoose pour se connecter à la base de données.
    await mongoose.connect("mongodb://localhost/boutique-jeux", {
      useNewUrlParser: true, // Options de configuration pour une connexion MongoDB.
      useUnifiedTopology: true,
    });

    // Si la connexion réussit, affiche un message de confirmation dans la console.
    console.log("Connexion à MongoDB établie");
  } catch (error) {
    // En cas d'erreur de connexion, affiche un message d'erreur détaillé dans la console.
    console.error("Erreur de connexion à MongoDB :", error);
  }
};

// Exporte la fonction connectToDatabase pour qu'elle puisse être utilisée ailleurs dans l'application.
export default connectToDatabase;
