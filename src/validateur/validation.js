export const ValidationName = ( name ) => {

    if(!name){
        return "Le nom est obligatoire";
    }
    return "";
};

export const ValidationPrenom = (prenom) => {
    if(!prenom){
        return "Le prenom est oblogatoire";
    }
    return "";
}
export const ValidationEmail = (email) => {
    if(!email){
        return "L'adresse email est oblogatoire";
    }
    return "";
}

export const ValidationTelephone = (telephone) => {
    if(!telephone){
        return "Le numero de telephone est oblogatoire";
    }
    return "";
}
export const ValidationMatricule = (matricule) => {
    if(!matricule){
        return "Le numero de matricule est oblogatoire";
    }
    return "";
}

export const ValidationRole = (role) => {
    if(!role){
        return "Selectionnez un role";
    }
    return "";
}

export const ValidationTypes = (types) => {

    if(!types){
        return "selectionnez un Type";
    }
    return "";
};


