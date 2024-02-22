// Importation du module Mongoose qui permet de définir la structure de données de notre modèle Customer
import mongoose from "mongoose";

// Création d'un schéma de données pour le modèle Customer
const customerSchema = new mongoose.Schema({
  // Champ 'id' représentant un numéro unique pour chaque compte client, avec contrainte d'unicité
  id: { type: Number, unique: true },

  // Champ 'name' pour stocker le nom du client
  name: String,

  // Champ 'firstName' pour stocker le prénom du client
  firstName: String,

  // Champ 'dateOfBirth' pour stocker la date de naissance du client (au format Date)
  dateOfBirth: Date,

  // Champ 'address' pour stocker l'adresse du client
  address: String,

  // Champ 'phoneNumber' pour stocker le numéro de téléphone du client
  phoneNumber: String,

  // Champ 'points' pour stocker un nombre représentant les points de ce client
  points: Number,
});

// Création du modèle Customer en utilisant le schéma de données défini ci-dessus.
// Si le modèle existe déjà, il est récupéré ; sinon, il est créé.
const Customer =
  mongoose.models.Customer || mongoose.model("Customer", customerSchema);

// Exportation du modèle Customer pour qu'il puisse être utilisé dans d'autres parties de l'application
export default Customer;
