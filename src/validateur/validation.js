export const ValidationName = ( name ) => {

    if(!name){
        return "Le nom est obligatoire";
    }
    return "";
};

export const ValidationPrenom = (prenom) => {
    if(!prenom){
        return "Le prénom est oblogatoire";
    }
    return "";
}
export const ValidationEmail = (email) => {
    if (!email) {
      return "L'adresse email est obligatoire";
    }
  
    // Regex simple pour valider l'email
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      return "Format d'adresse email invalide";
    }
  
    return "";
  };
  
  
  export const ValidationTelephone = (telephone) => {
    if (!telephone) {
      return "Le numéro de téléphone est obligatoire";
    }
  
    // Regex : accepte les numéros commençant par +221, 33, 7x (7 chiffres ensuite)
    const regex = /^(?:\+221)?(33|7[05678])\d{7}$/;
    if (!regex.test(telephone)) {
      return "Format de numéro de téléphone invalide";
    }
  
    return "";
  };
  
export const ValidationMatricule = (matricule) => {
    if(!matricule){
        return "Le numero de matricule est oblogatoire";
    }
    return "";
}

export const ValidationRole = (roles) => {
  if (!roles || roles.length === 0) {
      return "Sélectionnez au moins un rôle";
  }
  return "";
};


export const ValidationTypes = (types) => {

    if(!types){
        return "selectionnez un Type";
    }
    return "";
};

export const ValidationUtilisateur = (utilisateur) => {
  if(!utilisateur || !utilisateur.id){
    return "Sélectionnez un utilisateur";
  }
  return "";
};

export const ValidationEntreprise = (entreprise) => {
  if(!entreprise || !entreprise.id){
    return "Sélectionnez une entreprise";
  }
  return "";
};
export const ValidationAccesEntreprise = (acces) => {
  if(!acces || !acces.id){
    return "Sélectionnez un accès";
  }
  return "";
};

