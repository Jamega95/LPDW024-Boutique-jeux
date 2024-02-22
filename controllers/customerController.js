// Importation du modèle de données pour les comptes clients depuis Customer.js
import Customer from "../models/Customer.js";

// Récupère tous les comptes clients et renvoie une réponse JSON contenant la liste.
const getAllCustomers = async (req, res) => {
  try {
    // Utilisation de la méthode "find" du modèle Customer pour récupérer tous les clients.
    const customers = await Customer.find({});
    res.json(customers); // Réponse avec la liste des clients au format JSON.
  } catch (err) {
    // En cas d'erreur, renvoie une réponse avec un statut 500 et un message d'erreur JSON.
    res.status(500).json({ error: err.message });
  }
};

// Récupère un compte client par son ID et renvoie une réponse JSON.
const getCustomerById = async (req, res) => {
  const customerId = req.params.id; // Récupération de l'ID à partir des paramètres de la requête.

  try {
    // Utilisation de la méthode "findOne" du modèle Customer pour trouver un client par son ID.
    const customer = await Customer.findOne({ id: customerId });

    if (!customer) {
      // Si aucun client n'est trouvé, renvoie une réponse avec un statut 404 et un message d'erreur JSON.
      res.status(404).json({ message: "Compte client non trouvé" });
    } else {
      // Réponse avec les données du client au format JSON.
      res.json(customer);
    }
  } catch (err) {
    // En cas d'erreur, renvoie une réponse avec un statut 500 et un message d'erreur JSON.
    res.status(500).json({ error: err.message });
  }
};

// Crée un nouveau compte client en utilisant les données fournies dans le corps de la requête.
const createCustomer = async (req, res) => {
  const { id, name, firstName, dateOfBirth, address, phoneNumber, points } =
    req.body;

  try {
    // Création d'une nouvelle instance de Customer avec les données fournies.
    const newCustomer = new Customer({
      id,
      name,
      firstName,
      dateOfBirth,
      address,
      phoneNumber,
      points,
    });

    // Sauvegarde du nouveau client dans la base de données.
    const customer = await newCustomer.save();

    // Réponse avec le nouveau client créé au format JSON et un statut 201 (Créé avec succès).
    res.status(201).json(customer);
  } catch (err) {
    // En cas d'erreur, renvoie une réponse avec un statut 500 et un message d'erreur JSON.
    res.status(500).json({ error: err.message });
  }
};

// Met à jour un compte client par son ID en utilisant les données fournies dans le corps de la requête.
const updateCustomer = async (req, res) => {
  const customerId = req.params.id; // Récupération de l'ID à partir des paramètres de la requête.

  try {
    // Utilisation de la méthode "findOneAndUpdate" du modèle Customer pour mettre à jour le client.
    const customer = await Customer.findOneAndUpdate(
      { id: customerId }, // Recherche du client par son ID.
      req.body, // Données de mise à jour fournies dans le corps de la requête.
      { new: true } // Option pour renvoyer le client mis à jour dans la réponse.
    );

    if (!customer) {
      // Si aucun client n'est trouvé, renvoie une réponse avec un statut 404 et un message d'erreur JSON.
      res.status(404).json({ message: "Compte client non trouvé" });
    } else {
      // Réponse avec le client mis à jour au format JSON.
      res.json(customer);
    }
  } catch (err) {
    // En cas d'erreur, renvoie une réponse avec un statut 500 et un message d'erreur JSON.
    res.status(500).json({ error: err.message });
  }
};

// Supprime un compte client par son ID.
const deleteCustomer = async (req, res) => {
  const customerId = req.params.id; // Récupération de l'ID à partir des paramètres de la requête.

  try {
    // Utilisation de la méthode "findOneAndRemove" du modèle Customer pour supprimer le client.
    const customer = await Customer.findOneAndRemove({ id: customerId });

    if (!customer) {
      // Si aucun client n'est trouvé, renvoie une réponse avec un statut 404 et un message d'erreur JSON.
      res.status(404).json({ message: "Compte client non trouvé" });
    } else {
      // Réponse avec un message de succès au format JSON.
      res.json({ message: "Compte client supprimé avec succès" });
    }
  } catch (err) {
    // En cas d'erreur, renvoie une réponse avec un statut 500 et un message d'erreur JSON.
    res.status(500).json({ error: err.message });
  }
};

// Exportation des fonctions de contrôle des comptes clients pour les utiliser dans les routes.
export {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
