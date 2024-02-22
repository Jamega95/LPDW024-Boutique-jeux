// Importation des dépendances nécessaires
import express from "express"; // Importe le framework Express.js
const router = express.Router(); // Crée un routeur Express
import * as customerController from "../controllers/customerController.js"; // Importe les fonctions de contrôle des clients depuis le contrôleur
import multer from "multer"; // Importe Multer, un middleware pour gérer les fichiers dans les requêtes HTTP

const upload = multer(); // Initialise Multer pour la gestion des fichiers

// Routes pour les comptes clients

/**
 * @api {get} /customers Obtenir la liste des comptes clients
 * @apiName GetCustomers
 * @apiGroup Clients
 *
 * @apiSuccess {Array} customers Liste des comptes clients.
 *
 * @apiSuccessExample {json} Exemple de réponse réussie :
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "id": 1,
 *         "name": "Doe",
 *         "firstName": "John",
 *         "dateOfBirth": "1990-01-01",
 *         "address": "123 Rue de la Rue",
 *         "phoneNumber": "123-456-7890",
 *         "points": 100
 *       },
 *       {
 *         "id": 2,
 *         "name": "Smith",
 *         "firstName": "Alice",
 *         "dateOfBirth": "1985-05-15",
 *         "address": "456 Main Street",
 *         "phoneNumber": "987-654-3210",
 *         "points": 75
 *       }
 *     ]
 */

router.get("/customers", customerController.getAllCustomers);

/**
 * @api {get} /customers/:id Obtenir un compte client par son ID
 * @apiName GetCustomerById
 * @apiGroup Clients
 *
 * @apiParam {Number} id ID unique du compte client.
 *
 * @apiSuccess {Object} customer Détails du compte client.
 *
 * @apiSuccessExample {json} Exemple de réponse réussie :
 *     HTTP/1.1 200 OK
 *     {
 *       "id": 1,
 *       "name": "Doe",
 *       "firstName": "John",
 *       "dateOfBirth": "1990-01-01",
 *       "address": "123 Rue de la Rue",
 *       "phoneNumber": "123-456-7890",
 *       "points": 100
 *     }
 *
 * @apiError {404} NotFound Compte client non trouvé.
 * @apiErrorExample {json} Exemple d'erreur 404 :
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Compte client non trouvé"
 *     }
 */

router.get("/customers/:id", customerController.getCustomerById);

// Utilisation de Multer pour gérer le contenu du formulaire dans les requêtes POST et PUT

/**
 * @api {post} /customers Créer un nouveau compte client
 * @apiName CreateCustomer
 * @apiGroup Clients
 *
 * @apiParam {Number} id ID unique du compte client.
 * @apiParam {String} name Nom du client.
 * @apiParam {String} firstName Prénom du client.
 * @apiParam {Date} dateOfBirth Date de naissance du client.
 * @apiParam {String} address Adresse du client.
 * @apiParam {String} phoneNumber Numéro de téléphone du client.
 * @apiParam {Number} points Points du client.
 *
 * @apiSuccess {Object} customer Détails du compte client créé.
 *
 * @apiSuccessExample {json} Exemple de réponse réussie :
 *     HTTP/1.1 201 Created
 *     {
 *       "id": 3,
 *       "name": "Johnson",
 *       "firstName": "Mary",
 *       "dateOfBirth": "1988-07-20",
 *       "address": "789 Elm Avenue",
 *       "phoneNumber": "555-123-4567",
 *       "points": 50
 *     }
 *
 * @apiError {500} InternalServerError Erreur interne du serveur.
 * @apiErrorExample {json} Exemple d'erreur 500 :
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Une erreur est survenue lors de la création du compte client."
 *     }
 */

router.post("/customers", upload.array(), customerController.createCustomer);

/**
 * @api {put} /customers/:id Mettre à jour un compte client par son ID
 * @apiName UpdateCustomer
 * @apiGroup Clients
 *
 * @apiParam {Number} id ID unique du compte client à mettre à jour.
 *
 * @apiParam {Number} id ID unique du compte client.
 * @apiParam {String} name Nom du client.
 * @apiParam {String} firstName Prénom du client.
 * @apiParam {Date} dateOfBirth Date de naissance du client.
 * @apiParam {String} address Adresse du client.
 * @apiParam {String} phoneNumber Numéro de téléphone du client.
 * @apiParam {Number} points Points du client.
 *
 * @apiSuccess {Object} customer Détails du compte client mis à jour.
 *
 * @apiSuccessExample {json} Exemple de réponse réussie :
 *     HTTP/1.1 200 OK
 *     {
 *       "id": 3,
 *       "name": "Johnson",
 *       "firstName": "Mary",
 *       "dateOfBirth": "1988-07-20",
 *       "address": "123 New Street",
 *       "phoneNumber": "555-987-6543",
 *       "points": 60
 *     }
 *
 * @apiError {500} InternalServerError Erreur interne du serveur.
 * @apiErrorExample {json} Exemple d'erreur 500 :
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Une erreur est survenue lors de la mise à jour du compte client."
 *     }
 *
 * @apiError {404} NotFound Compte client non trouvé.
 * @apiErrorExample {json} Exemple d'erreur 404 :
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Compte client non trouvé"
 *     }
 */

router.put("/customers/:id", upload.array(), customerController.updateCustomer);

/**
 * @api {delete} /customers/:id Supprimer un compte client par son ID
 * @apiName DeleteCustomer
 * @apiGroup Clients
 *
 * @apiParam {Number} id ID unique du compte client à supprimer.
 *
 * @apiSuccess {Object} message Message indiquant que le compte client a été supprimé avec succès.
 *
 * @apiSuccessExample {json} Exemple de réponse réussie :
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Compte client supprimé avec succès"
 *     }
 *
 * @apiError {500} InternalServerError Erreur interne du serveur.
 * @apiErrorExample {json} Exemple d'erreur 500 :
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Une erreur est survenue lors de la suppression du compte client."
 *     }
 *
 * @apiError {404} NotFound Compte client non trouvé.
 * @apiErrorExample {json} Exemple d'erreur 404 :
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Compte client non trouvé"
 *     }
 */

router.delete("/customers/:id", customerController.deleteCustomer);

export default router; // Exporte le routeur pour une utilisation dans d'autres parties de l'application
