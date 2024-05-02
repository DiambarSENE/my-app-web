import { createContext , useState } from 'react';

export const AppContextUtilisateur = createContext();
export const AppContextUserByEmail = createContext();
export const AppContextRole = createContext();
export const AppContextRoleNom = createContext();
//export const AppContextEmailByToken = createContext();
export const AppContextRoleByToken = createContext();
export const AppContextIdUserByToken = createContext();
export const AppContextToken = createContext();

export const useAppStateUtilisateur = () => {
    const appState = useState([]);
    return appState;
};

export const useAppStateUserByEmail = () => {
    const appState = useState("");
    return appState;
};

export const useAppStateRoles = () => {
    const appState = useState([]);
    return appState;
};

export const useAppStateRolesNom = () => {
    const appState = useState([]);
    return appState;
};


// export const useAppGetEmailFromToken = () => {
//     const appState = useState("");
//     return appState;
// };

export const useAppGetRoleFromToken = () => {
    const appState = useState([]);
    return appState;
};

export const useAppGetIdUserFromToken = () => {
    const appState = useState("");
    return appState;
};

export const useAppGetToken = () => {
    const appState = useState("");
    return appState;
};