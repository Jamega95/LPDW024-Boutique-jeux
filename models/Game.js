// Importation du module mongoose, un ODM (Object-Document Mapping) pour MongoDB.
import mongoose from "mongoose";

// Définition du schéma (structure) des données pour les jeux vidéo.
const gameSchema = new mongoose.Schema({
  // Identifiant unique du jeu vidéo, de type Number, et doit être unique.
  id: { type: Number, unique: true },

  // Titre du jeu vidéo, de type String.
  title: String,

  // Nom de l'éditeur du jeu vidéo, de type String.
  editor: String,

  // Liste des plateformes sur lesquelles le jeu est disponible, de type tableau de chaînes de caractères.
  platforms: [String],

  // Quantité en stock du jeu vidéo, de type Number.
  quantity: Number,
});

// Définition du modèle de données Game en utilisant le schéma gameSchema.
// Si le modèle Game existe déjà, on l'utilise, sinon, on le crée.
const Game = mongoose.models.Game || mongoose.model("Game", gameSchema);

// Export du modèle Game pour qu'il puisse être utilisé dans d'autres parties de l'application.
export default Game;
