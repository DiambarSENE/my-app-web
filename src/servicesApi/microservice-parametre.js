import axios from 'axios';


export const getAuthToken = () => {
    return window.localStorage.getItem(`auth_token`);
};

export const parametresApi = axios.create({
    baseURL: "http://localhost:8084",
    //baseURL: "http://31.220.20.148:8084",
    headers: {
        //'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json',
    },
});


parametresApi.interceptors.request.use(config => {
    const token = getAuthToken();
    if(token !== "null"){
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});
// ==============================
// export const getTypes = async () => {
//     try {
//       const response = await parametresApi.get('/types/getAll');
//       return response.data;
//     } catch (error) {
//       console.error('Erreur lors de la récupération des types :', error);
//       throw error; // Vous pouvez choisir de traiter l'erreur ici ou la propager vers l'appelant
//     }
//   };
// ==============================

export const getTypes= () => {
    return parametresApi.get(`/types/getAll`);
};

export const createType = (type) => {
    return parametresApi.post("/types/ajouter", type );
};

export const deleteType = (id) => {
    return parametresApi.delete("/types/delete/"+id);
};

export const updateType = (type) => {
    return parametresApi.put("/types/update", type);
};
export const updatePropertyActivated = (type) => {
    return parametresApi.patch("/types/updatePropriteActivated", type);
};
export const getTypeById = (idType) => {
    return parametresApi.get(`/types/${idType}`);
};
export const getTypeByName = (id) => {
    return parametresApi.get(`/types/name/${id}`);
};

//==================       Parametre           ====================================================

// export const getParametres=()=> {
//     return parametresApi.get(`/parametres/getAll`);
// };
//export const getParametres=(page,size,keyword)=> {
  //  return parametresApi.get(`/parametres/getAllParametres?page=${page}&size=${size}`);
//};
export const createParametre = (parametre) => {
    return parametresApi.post("/parametres/ajouter", parametre );
};

export const deleteParametre = (id) => {
    return parametresApi.delete("/parametres/delete/"+id);
};

export const updateParametre = (parametre) => {
    return parametresApi.put("/parametres/update", parametre);
};
export const updatePropertyiSActivated = (parametre) => {
    return parametresApi.patch("/parametres/updatePropriteActivated", parametre);
};
export const getParametreById = (idParametre) => {
    return parametresApi.get(`/parametres/${idParametre}`);
};
export const getParametreByName = (name) => {
    return parametresApi.get(`/parametres/name/${name}`);
};
export const getParametreByIdType = (idType) => {
    return parametresApi.get(`/parametres/parametreByType/${idType}`);
};

//==================       Fonctionnalite           ====================================================

export const getAllFonctionnalites = () => {
    return parametresApi.get(`/fonctionnalite/getAllFonctionnalite`);
};

export const createFonctionnalite = (fonctionnalite) => {
    return parametresApi.post("/fonctionnalite/add", fonctionnalite );
};

export const deleteFonctionnalite = (id) => {
    return parametresApi.delete("/fonctionnalite/delete/"+id);
};

export const updateFonctionnalite = (fonctionnalite) => {
    return parametresApi.put("/fonctionnalite/update", fonctionnalite);
};
export const updatePropertyActiver = (fonctionnalite) => {
    return parametresApi.patch("/fonctionnalite/updatePropriteActiver", fonctionnalite);
};
export const getFonctionnaliteById = (idFonctionnalite) => {
    return parametresApi.get(`/fonctionnalite/${idFonctionnalite}`);
};
export const activerDesactiver = (fonctionnalite) => {
    return parametresApi.patch("/fonctionnalite/activerDesactiver", fonctionnalite);
};