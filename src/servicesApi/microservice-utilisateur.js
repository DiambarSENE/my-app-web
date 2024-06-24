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

// Créer une instance Axios avec le jeton dans l'en-tête par défaut
export const usersApi = axios.create({
    baseURL: "http://31.220.20.148:8083",
    //baseURL: "http://localhost:8083",
    headers: {
        'Content-Type': 'application/json',
      },
  
});

// Ajouter un intercepteur pour mettre à jour le jeton à chaque requête
usersApi.interceptors.request.use(config => {
    // Récupérer le jeton à chaque requête
    const token = getAuthToken();
  
    // Mettre à jour l'en-tête avec le nouveau jeton
    if(token !== "null"){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });


export const createUsers = (user) => {
    // let headers = {};
    // if (getAuthToken() !== null && getAuthToken() !== "null") {
    //     headers = {'Authorization': `Bearer ${getAuthToken()}`};
    // }
    return usersApi.post("/users/ajouter", user)
};

export const getUsers = () => {
    return usersApi.get(`/users/getAll`);
};


export const deleteUsers = (id) => {
    return usersApi.delete("/users/delete/"+id);
};

export const updateUser = (user) => {
    return usersApi.patch("/users/update", user);
};

export const updatePassword = (updatePass) => {
    return usersApi.patch("users/updatePassword",updatePass);
}

export const getUserById = (idUser) => {
    return usersApi.get(`/users/getUserById/${idUser}`);
};
export const getUserByEmail = (email) => {
    return usersApi.get(`/users/getUserByEmail/${email}`);
};
export const getUserByToken = (token) => {
    return usersApi.get(`/users/getUserByToken/${token}`);
};
export const getConnexion = (login) => {
    return usersApi.post("users/connexion", login);
};

export const getDeconnexion = () => {
    return usersApi.post("users/deconnexion")
};

export const updateEtatActiverDesactiver = (user) => {
    return usersApi.patch("/users/updateEtat", user);
};

export const addRole = (role) => {
    return usersApi.post("/role/addRole", role)
};

export const getAllRoles = () => {
    return usersApi.get(`/role/getAllRoles`);
};

export const deleteRole = (id) => {
    return usersApi.delete(`/role/deleteRole/${id}`);
};

export const updateRole = (role) => {
    return usersApi.put("/role/updateRole", role);
};

export const getRoleByUser = (userId) => {
    return usersApi.get(`/role/getRoleByUser/${userId}`);
};

export const getRoleById = (roleId) => {
    return usersApi.get(`/role/getRoleById/${roleId}`);
};