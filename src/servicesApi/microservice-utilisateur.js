import axios from "axios";

// Fonction pour récupérer le token depuis le localStorage
export const getAuthToken = () => {
    return window.localStorage.getItem('auth_token');
};

// Fonction pour stocker le token dans le localStorage
export const setAuthHeader = (token) => {
    window.localStorage.setItem('auth_token', token);
};

// Fonction pour supprimer le token du localStorage
export const deleteToken = () => {
    window.localStorage.removeItem('auth_token');
}
// Fonction pour récupérer l'email depuis le localStorage
export const getEmailInLocalStorage = () => {
    return window.localStorage.getItem('auth_email');
};

// Fonction pour stocker l'email dans le localStorage
export const setEmailInLocalStorage = (email) => {
    window.localStorage.setItem('auth_email', email);
};

// Fonction pour supprimer l'email du localStorage
export const deleteEmailInLocalStorage = () => {
    window.localStorage.removeItem('auth_email');
}

// Fonction pour récupérer l'id depuis le localStorage
export const getIdInLocalStorage = () => {
    return window.localStorage.getItem('auth_id');
};

// Fonction pour stocker l'id dans le localStorage
export const setIdInLocalStorage = (id) => {
    window.localStorage.setItem('auth_id', id);
};

// Fonction pour supprimer l'id du localStorage
export const deleteIdInLocalStorage = () => {
    window.localStorage.removeItem('auth_id');
}

// Créer une instance Axios avec le jeton dans l'en-tête par défaut
export const usersApi = axios.create({
    //baseURL: "http://31.220.20.148:8083",
    baseURL: "http://localhost:8083",
    // headers: {
    //     'Content-Type': 'application/json',
    //   },
  
});

// Ajouter un intercepteur pour mettre à jour le jeton à chaque requête
// usersApi.interceptors.request.use(config => {
//     // Récupérer le jeton à chaque requête
//     const token = getAuthToken();
  
//     // Mettre à jour l'en-tête avec le nouveau jeton
//     if(token !== "null"){
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   });


//==================       Utilisateur           ==================================================== 

export const createUsers = (user) => {
    // let headers = {};
    // if (getAuthToken() !== null && getAuthToken() !== "null") {
    //     headers = {'Authorization': `Bearer ${getAuthToken()}`};
    // }
    return usersApi.post("/utilisateur", user)
};

export const updateUser = (user) => {
    return usersApi.put("/utilisateur", user);
};

export const updatePassword = (updatePass) => {
    return usersApi.patch("/utilisateur",updatePass);
}

export const getUsers = () => {
    return usersApi.get(`/utilisateurs`);
};

export const deleteUserById = (id) => {
    return usersApi.delete(`/utilisateur/${id}/id`);
};

export const deleteUserByNom = (nom) => {
    return usersApi.delete(`/utilisateur/${nom}/id`);
};

export const getUserById = (idUser) => {
    return usersApi.get(`/utilisateur/${idUser}/id`);
};

export const getUserByNom = (nom) => {
    return usersApi.get(`/utilisateur/${nom}/nom`);
};

export const getUserByEmail = (email) => {
    return usersApi.get(`/utilisateur/${email}`);
};
export const getUserByToken = (token) => {
    return usersApi.get(`/utilisateur/${token}`);
};
export const getConnexion = (login) => {
    return usersApi.post("/utilisateur/connecter", login);
};

export const getDeconnexion = () => {
    return usersApi.post("/utilisateur")
};


export const updateEtatActiver = (etat) => {
    return usersApi.patch("/utilisateur/activer",etat);
}

//==================       Role           ====================================================

// export const addRole = (role) => {
//     return usersApi.post("/role", role)
// };

export const addRole = async (role) => {
    try {
        console.log("Envoi des données :", role);
        const response = await usersApi.post("/role", role, {
            headers: { "Content-Type": "application/json" }
        });
        console.log("Réponse du serveur :", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Erreur lors de l'ajout du rôle :", error.response?.data || error.message);
        return { success: false, error: error.response?.data || "Erreur inconnue" };
    }
};


export const getAllRoles = () => {
    return usersApi.get(`/roles`);
};

export const deleteRole = (id) => {
    return usersApi.delete(`/role/${id}/id`);
};

export const deleteRolebyNom = (nom) => {
    return usersApi.delete(`/role/${nom}/nom`);
};

export const updateRole = (role) => {
    return usersApi.put("/role", role);
};

export const updateRolePartiel = (role) => {
    return usersApi.patch("/role", role);
};

export const getRoleByUser = (userId) => {
    return usersApi.get(`/role/getRoleByUser/${userId}`);
};

export const getRoleById = (roleId) => {
    return usersApi.get(`/role/${roleId}/id`);
};
export const getRoleByNom = (nom) => {
    return usersApi.get(`/role/${nom}/nom`);
};

//==================       AccessBackEnd           ====================================================

export const getAllAccessBackEnds = () => {
    return usersApi.get(`/accessBackEnds`);
};

export const createAccessBackEnd = (accessBackEnd) => {
    return usersApi.post("/accessBackEnd", accessBackEnd );
};

export const deleteAccessBackEnd = (id) => {
    return usersApi.delete(`/accessBackEnd/${id}/id`);
};

export const deleteAccessBackEndByNom = (nom) => {
    return usersApi.delete(`/accessBackEnd/${nom}/nom`);
};

export const updateAccessBackEnd = (accessBackEnd) => {
    return usersApi.put("/accessBackEnd", accessBackEnd);
};

export const updateAccessBackEndPartiel = (accessBackEnd) => {
    return usersApi.patch("/accessBackEnd", accessBackEnd);
};

export const getAccessBackEndById = (id) => {
    return usersApi.get(`/accessBackEnd/${id}/id`);
};
export const getAccessBackEndByNom = (nom) => {
    return usersApi.get(`/accessBackEnd/${nom}/nom`);
};


//==================       AccessEntreprise           ====================================================

export const getAllAccessEntreprises = () => {
    return usersApi.get(`/accessEntreprises`);
};

export const createAccessEntreprise = (accessEntreprise) => {
    return usersApi.post("/accessEntreprise", accessEntreprise );
};

export const deleteAccessEntrepriseById = (id) => {
    return usersApi.delete(`/accessEntreprise/${id}/id`);
};

export const deleteAccessEntrepriseByNom = (nom) => {
    return usersApi.delete(`/accessEntreprise/${nom}/nom`);
};

export const updateAccessEntreprise = (accessEntreprise) => {
    return usersApi.put("/accessEntreprise", accessEntreprise);
};

export const getAccessEntrepriseById = (id) => {
    return usersApi.get(`/accessEntreprise/${id}/id`);
};
export const getAccessEntrepriseByNom = (nom) => {
    return usersApi.get(`/accessEntreprise/${nom}/nom`);
};

//==================       Entreprise           ====================================================

export const getAllEntreprises = () => {
    return usersApi.get(`/entreprises`);
};

export const createEntreprise = (entreprise) => {
    return usersApi.post("/entreprise", entreprise );
};

export const deleteEntrepriseById = (id) => {
    return usersApi.delete(`/entreprise/${id}/id`);
};

export const deleteEntrepriseByNom = (nom) => {
    return usersApi.delete(`/entreprise/${nom}/nom`);
};

export const updateEntreprise = (entreprise) => {
    return usersApi.put("/entreprise", entreprise);
};

export const getEntrepriseById = (id) => {
    return usersApi.get(`/entreprise/${id}/id`);
};
export const getEntrepriseByNom = (nom) => {
    return usersApi.get(`/entreprise/${nom}/nom`);
};
export const updateEntreprisePartiel = (entreprise) => {
    return usersApi.patch("/entreprise", entreprise);
};
export const getAllEntrepriseByIdUtilisateur = (id) => {
    return usersApi.get(`/entreprise/${id}`);
};

//==================       Fonctionnalite           ====================================================

export const getAllFonctionnalites = () => {
    return usersApi.get(`/fonctionnalites`);
};

export const createFonctionnalite = (fonctionnalite) => {
    return usersApi.post("/fonctionnalite", fonctionnalite );
};

export const deleteFonctionnaliteById = (id) => {
    return usersApi.delete(`/fonctionnalite/${id}/id`);
};

export const deleteFonctionnaliteByNom = (nom) => {
    return usersApi.delete(`/fonctionnalite/${nom}/nom`);
};

export const updateFonctionnalite = (fonctionnalite) => {
    return usersApi.put("/fonctionnalite", fonctionnalite);
};

export const getFonctionnaliteById = (id) => {
    return usersApi.get(`/fonctionnalite/${id}/id`);
};
export const getFonctionnaliteByNom = (nom) => {
    return usersApi.get(`/fonctionnalite/${nom}/nom`);
};
export const updateFonctionnalitePartial = (fonctionnalite) => {
    return usersApi.patch("/fonctionnalite", fonctionnalite);
};