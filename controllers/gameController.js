/**
 * @api {object} Game Gestion des jeux vidéo
 * @apiDescription Module de gestion des jeux vidéo.
 * @apiName Game
 * @apiGroup Jeux vidéo
 */

// Importation du modèle de données pour les jeux vidéo depuis Game.js
import Game from "../models/Game.js";

/**
 * @api {function} getAllGames() Récupérer tous les jeux vidéo en stock
 * @apiName GetAllGames
 * @apiGroup Jeux vidéo
 *
 * @apiDescription Cette fonction récupère tous les jeux vidéo en stock de la base de données et renvoie une réponse JSON contenant la liste des jeux vidéo.
 *
 * @apiSuccess {Array} games Liste des jeux vidéo en stock.
 *
 * @apiError {String} error Message d'erreur en cas d'échec de la récupération.
 */

// Récupérer tous les jeux vidéo en stock
const getAllGames = async (req, res) => {
  try {
    const games = await Game.find({});
    res.json(games);
  } catch (err) {
    // En cas d'erreur, renvoyer une réponse d'erreur avec le code HTTP 500
    res.status(500).json({ error: err.message });
  }
};

/**
 * @api {function} getGameById() Récupérer un jeu vidéo par son ID
 * @apiName GetGameById
 * @apiGroup Jeux vidéo
 *
 * @apiDescription Cette fonction récupère un jeu vidéo de la base de données par son ID et renvoie une réponse JSON contenant les données du jeu vidéo.
 *
 * @apiParam {Number} id Identifiant unique du jeu vidéo.
 *
 * @apiSuccess {Object} game Données du jeu vidéo.
 *
 * @apiError {String} error Message d'erreur en cas d'échec de la récupération.
 */

// Récupérer un jeu vidéo par son ID
const getGameById = async (req, res) => {
  const gameId = req.params.id;

  try {
    const game = await Game.findOne({ id: gameId });
    if (!game) {
      // Si le jeu n'est pas trouvé, renvoyer une réponse avec le code HTTP 404
      res.status(404).json({ message: "Jeu vidéo non trouvé" });
    } else {
      res.json(game);
    }
  } catch (err) {
    // En cas d'erreur, renvoyer une réponse d'erreur avec le code HTTP 500
    res.status(500).json({ error: err.message });
  }
};

/**
 * @api {function} createGame() Créer un nouveau jeu vidéo
 * @apiName CreateGame
 * @apiGroup Jeux vidéo
 *
 * @apiDescription Cette fonction crée un nouveau jeu vidéo en utilisant les données fournies dans le corps de la requête et renvoie une réponse JSON avec les données du nouveau jeu vidéo créé.
 *
 * @apiParam {Number} id Identifiant unique du jeu vidéo.
 * @apiParam {String} title Titre du jeu vidéo.
 * @apiParam {String} editor Éditeur du jeu vidéo.
 * @apiParam {Array} platforms Plateformes sur lesquelles le jeu est disponible.
 * @apiParam {Number} quantity Quantité en stock du jeu vidéo.
 *
 * @apiSuccess {Object} game Données du nouveau jeu vidéo créé.
 *
 * @apiError {String} error Message d'erreur en cas d'échec de la création.
 */

// Créer un nouveau jeu vidéo avec l'ID fourni par l'utilisateur
const createGame = async (req, res) => {
  const { id, title, editor, platforms, quantity } = req.body;

  try {
    const newGame = new Game({
      id,
      title,
      editor,
      platforms,
      quantity,
    });

    const game = await newGame.save();
    // Répondre avec le code HTTP 201 pour indiquer que la création a réussi
    res.status(201).json(game);
  } catch (err) {
    // En cas d'erreur, renvoyer une réponse d'erreur avec le code HTTP 500
    res.status(500).json({ error: err.message });
  }
};

/**
 * @api {function} updateGame() Mettre à jour un jeu vidéo par son ID
 * @apiName UpdateGame
 * @apiGroup Jeux vidéo
 *
 * @apiDescription Cette fonction met à jour un jeu vidéo par son ID en utilisant les données fournies dans le corps de la requête et renvoie une réponse JSON avec les données du jeu vidéo mis à jour.
 *
 * @apiParam {Number} id Identifiant unique du jeu vidéo.
 *
 * @apiSuccess {Object} game Données du jeu vidéo mis à jour.
 *
 * @apiError {String} error Message d'erreur en cas d'échec de la mise à jour.
 */

// Mettre à jour un jeu vidéo par son ID
const updateGame = async (req, res) => {
  const gameId = req.params.id;

  try {
    const game = await Game.findOneAndUpdate({ id: gameId }, req.body, {
      new: true,
    });
    if (!game) {
      // Si le jeu n'est pas trouvé, renvoyer une réponse avec le code HTTP 404
      res.status(404).json({ message: "Jeu vidéo non trouvé" });
    } else {
      res.json(game);
    }
  } catch (err) {
    // En cas d'erreur, renvoyer une réponse d'erreur avec le code HTTP 500
    res.status(500).json({ error: err.message });
  }
};

/**
 * @api {function} deleteGame() Supprimer un jeu vidéo par son ID
 * @apiName DeleteGame
 * @apiGroup Jeux vidéo
 *
 * @apiDescription Cette fonction supprime un jeu vidéo par son ID et renvoie une réponse JSON avec un message de succès.
 *
 * @apiParam {Number} id Identifiant unique du jeu vidéo.
 *
 * @apiSuccess {Object} message Message de succès indiquant que le jeu vidéo a été supprimé avec succès.
 *
 * @apiError {String} error Message d'erreur en cas d'échec de la suppression.
 */

// Supprimer un jeu vidéo par son ID
const deleteGame = async (req, res) => {
  const gameId = req.params.id;

  try {
    const game = await Game.findOneAndRemove({ id: gameId });
    if (!game) {
      // Si le jeu n'est pas trouvé, renvoyer une réponse avec le code HTTP 404
      res.status(404).json({ message: "Jeu vidéo non trouvé" });
    } else {
      // Répondre avec un message de succès
      res.json({ message: "Jeu vidéo supprimé avec succès" });
    }
  } catch (err) {
    // En cas d'erreur, renvoyer une réponse d'erreur avec le code HTTP 500
    res.status(500).json({ error: err.message });
  }
};

// Exportation des fonctions de contrôle des jeux vidéo pour les utiliser dans les routes.
export { getAllGames, getGameById, createGame, updateGame, deleteGame };
