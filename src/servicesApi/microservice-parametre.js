import axios from 'axios';


export const getAuthToken = () => {
    return window.localStorage.getItem(`auth_token`);
};

export const parametresApi = axios.create({
    baseURL: "http://localhost:8084",
    //baseURL: "http://31.220.20.148:9999/YAATOUT-PARAMETTRES-API",
    // headers: {
    //     'Authorization': `Bearer ${getAuthToken()}`,
    //     'Content-Type': 'application/json',
    // },
});


// parametresApi.interceptors.request.use(config => {
//     const token = getAuthToken();
//     if(token !== "null"){
//         config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
// });
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
    return parametresApi.get(`/types`);
};

export const createType = (type) => {
    return parametresApi.post("/type", type );
};

export const deleteType = (id) => {
    return parametresApi.delete("/type/"+id+"/id");
};

export const updateType = (type) => {
    return parametresApi.put("/type", type);
};
export const updatePropertyActivated = (type) => {
    return parametresApi.patch("/type", type);
};
export const getTypeById = (idType) => {
    return parametresApi.get(`/type/${idType}/id`);
};
export const getTypeByName = (nom) => {
    return parametresApi.get(`/type/${nom}/nom`);
};

//==================       Parametre           ====================================================

export const getParametres=()=> {
    return parametresApi.get("/parametres");
};
// export const getParametres=(page,size,keyword)=> {
//    return parametresApi.get(`/parametres/getAllParametres?page=${page}&size=${size}`);
// };
export const createParametre = (parametre) => {
    return parametresApi.post("/parametre", parametre );
};

export const deleteParametreById = (id) => {
    return parametresApi.delete("/parametre/"+id+"/id");
};

export const deleteParametreByNom = (nom) => {
    return parametresApi.delete("/parametre/"+nom+"/nom");
};

export const updateParametre = (parametre) => {
    return parametresApi.put("/parametre", parametre);
};
export const updatePropertyiSActivated = (parametre) => {
    return parametresApi.patch("/parametre", parametre);
};
export const getParametreById = (idParametre) => {
    return parametresApi.get(`/parametre/${idParametre}/id`);
};
export const getParametreByName = (name) => {
    return parametresApi.get(`/parametre/${name}/nom`);
};
export const getParametreByIdType = (idType) => {
    return parametresApi.get(`/parametres/${idType}`);
};

//==================       SousParametre           ====================================================

export const getAllSousParametres = () => {
    return parametresApi.get(`/sousParametres`);
};

export const createSousParametre = (sousParametre) => {
    return parametresApi.post("/sousParametre", sousParametre );
};

export const deleteSousParametre = (id) => {
    return parametresApi.delete(`/sousParametre/${id}/id`);
};

export const deleteSousParametreByNom = (nom) => {
    return parametresApi.delete(`/sousParametre/${nom}/nom`);
};

export const updateSousParametre = (sousParametre) => {
    return parametresApi.put("/sousParametre", sousParametre);
};
// export const updatePropertyActiver = (sousParametre) => {
//     return parametresApi.patch("/sousParametre/updatePropriteActiver", sousParametre);
// };
export const getSousParametreById = (id) => {
    return parametresApi.get(`/sousParametre/${id}/id`);
};
export const getSousParametreByNom = (nom) => {
    return parametresApi.get(`/sousParametre/${nom}/nom`);
};
export const activerDesactiver = (sousParametre) => {
    return parametresApi.patch("/sousParametre", sousParametre);
};