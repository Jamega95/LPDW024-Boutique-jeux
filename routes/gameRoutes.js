// Importation des dépendances nécessaires
import express from "express"; // Importe le framework Express.js
const router = express.Router(); // Crée un routeur Express
import * as gameController from "../controllers/gameController.js"; // Importe les fonctions de contrôle des jeux depuis le contrôleur
import multer from "multer"; // Importe Multer, un middleware pour gérer les fichiers dans les requêtes HTTP

const upload = multer(); // Initialise Multer pour la gestion des fichiers

// Routes pour les jeux vidéo

/**
 * @api {get} /games Obtenir la liste des jeux vidéo
 * @apiName GetGames
 * @apiGroup Jeux vidéo
 *
 * @apiSuccess {Object[]} jeux Liste des jeux vidéo.
 * @apiSuccess {String} jeux.id Identifiant unique du jeu vidéo.
 * @apiSuccess {String} jeux.title Titre du jeu vidéo.
 * @apiSuccess {String} jeux.editor Éditeur du jeu vidéo.
 * @apiSuccess {String[]} jeux.platforms Plateformes prises en charge par le jeu vidéo.
 * @apiSuccess {Number} jeux.quantity Quantité en stock du jeu vidéo.
 *
 * @apiSuccessExample {json} Réponse réussie :
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "id": "1",
 *         "title": "Jeu 1",
 *         "editor": "Éditeur 1",
 *         "platforms": ["PC", "PS5"],
 *         "quantity": 10
 *       },
 *       {
 *         "id": "2",
 *         "title": "Jeu 2",
 *         "editor": "Éditeur 2",
 *         "platforms": ["Xbox Series X", "PS5"],
 *         "quantity": 5
 *       }
 *     ]
 */

router.get("/games", gameController.getAllGames);

/**
 * @api {get} /games/:id Obtenir un jeu vidéo par son ID
 * @apiName GetGameById
 * @apiGroup Jeux vidéo
 *
 * @apiParam {String} id Identifiant unique du jeu vidéo.
 *
 * @apiSuccess {String} id Identifiant unique du jeu vidéo.
 * @apiSuccess {String} title Titre du jeu vidéo.
 * @apiSuccess {String} editor Éditeur du jeu vidéo.
 * @apiSuccess {String[]} platforms Plateformes prises en charge par le jeu vidéo.
 * @apiSuccess {Number} quantity Quantité en stock du jeu vidéo.
 *
 * @apiSuccessExample {json} Réponse réussie :
 *     HTTP/1.1 200 OK
 *     {
 *       "id": "1",
 *       "title": "Jeu 1",
 *       "editor": "Éditeur 1",
 *       "platforms": ["PC", "PS5"],
 *       "quantity": 10
 *     }
 *
 * @apiError {404} Jeu non trouvé - Le jeu vidéo avec l'ID spécifié n'a pas été trouvé.
 * @apiErrorExample {json} Erreur - Jeu non trouvé :
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Jeu vidéo non trouvé"
 *     }
 */
router.get("/games/:id", gameController.getGameById);

/**
 * @api {post} /games Créer un nouveau jeu vidéo
 * @apiName CreateGame
 * @apiGroup Jeux vidéo
 *
 * @apiParam {String} title Titre du jeu vidéo.
 * @apiParam {String} editor Éditeur du jeu vidéo.
 * @apiParam {String[]} platforms Plateformes prises en charge par le jeu vidéo.
 * @apiParam {Number} quantity Quantité en stock du jeu vidéo.
 *
 * @apiSuccess {String} id Identifiant unique du jeu vidéo créé.
 * @apiSuccess {String} title Titre du jeu vidéo.
 * @apiSuccess {String} editor Éditeur du jeu vidéo.
 * @apiSuccess {String[]} platforms Plateformes prises en charge par le jeu vidéo.
 * @apiSuccess {Number} quantity Quantité en stock du jeu vidéo.
 *
 * @apiSuccessExample {json} Réponse réussie :
 *     HTTP/1.1 201 Created
 *     {
 *       "id": "3",
 *       "title": "Nouveau jeu",
 *       "editor": "Nouvel éditeur",
 *       "platforms": ["PC", "PS5"],
 *       "quantity": 20
 *     }
 *
 * @apiError {500} Erreur de serveur - Une erreur s'est produite lors de la création du jeu vidéo.
 * @apiErrorExample {json} Erreur de serveur :
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Erreur de création du jeu vidéo"
 *     }
 */
router.post("/games", upload.array(), gameController.createGame);

/**
 * @api {put} /games/:id Mettre à jour un jeu vidéo par son ID
 * @apiName UpdateGame
 * @apiGroup Jeux vidéo
 *
 * @apiParam {String} id Identifiant unique du jeu vidéo à mettre à jour.
 * @apiParam {String} title Nouveau titre du jeu vidéo.
 * @apiParam {String} editor Nouvel éditeur du jeu vidéo.
 * @apiParam {String[]} platforms Nouvelles plateformes prises en charge par le jeu vidéo.
 * @apiParam {Number} quantity Nouvelle quantité en stock du jeu vidéo.
 *
 * @apiSuccess {String} id Identifiant unique du jeu vidéo mis à jour.
 * @apiSuccess {String} title Nouveau titre du jeu vidéo.
 * @apiSuccess {String} editor Nouvel éditeur du jeu vidéo.
 * @apiSuccess {String[]} platforms Nouvelles plateformes prises en charge par le jeu vidéo.
 * @apiSuccess {Number} quantity Nouvelle quantité en stock du jeu vidéo.
 *
 * @apiSuccessExample {json} Réponse réussie :
 *     HTTP/1.1 200 OK
 *     {
 *       "id": "1",
 *       "title": "Jeu mis à jour",
 *       "editor": "Éditeur mis à jour",
 *       "platforms": ["PC", "PS5", "Xbox Series X"],
 *       "quantity": 15
 *     }
 *
 * @apiError {404} Jeu non trouvé - Le jeu vidéo avec l'ID spécifié n'a pas été trouvé.
 * @apiErrorExample {json} Erreur - Jeu non trouvé :
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Jeu vidéo non trouvé"
 *     }
 */
router.put("/games/:id", upload.array(), gameController.updateGame);

/**
 * @api {delete} /games/:id Supprimer un jeu vidéo par son ID
 * @apiName DeleteGame
 * @apiGroup Jeux vidéo
 *
 * @apiParam {String} id Identifiant unique du jeu vidéo à supprimer.
 *
 * @apiSuccess {String} message Message indiquant que le jeu vidéo a été supprimé avec succès.
 *
 * @apiSuccessExample {json} Réponse réussie :
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Jeu vidéo supprimé avec succès"
 *     }
 *
 * @apiError {404} Jeu non trouvé - Le jeu vidéo avec l'ID spécifié n'a pas été trouvé.
 * @apiErrorExample {json} Erreur - Jeu non trouvé :
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Jeu vidéo non trouvé"
 *     }
 */
router.delete("/games/:id", gameController.deleteGame);

export default router; // Exporte le routeur pour une utilisation dans d'autres parties de l'application
