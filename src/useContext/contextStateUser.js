import { createContext , useContext, useEffect, useState } from 'react';
import { getAllRoles, getAuthToken, getUsers } from '../servicesApi/microservice-utilisateur';
// Création du contexte
//export const AppContextUtilisateur = createContext();
// 1️⃣ Création du contexte pour les utilisateurs
const UserContext = createContext();

export const AppContextUserByEmail = createContext();
export const AppContextRole = createContext();
export const AppContextRoleNom = createContext();
//export const AppContextEmailByToken = createContext();
export const AppContextRoleByToken = createContext();
export const AppContextIdUserByToken = createContext();
export const AuthContext  = createContext();
export const AppContextAccessBackEnd = createContext();
export const AppContextAccessEntreprise = createContext();
export const AppContextEntreprise = createContext();
export const AppContextFonctionnalite = createContext();


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

export const useAppGetRoleFromToken = () => {
    const appState = useState([]);
    return appState;
};

export const useAppGetIdUserFromToken = () => {
    const appState = useState("");
    return appState;
};

// export const useAppGetToken = () => {
//     const appState = useState(null);
//     return appState;
// };

// Hook personnalisé pour récupérer le contexte
export const useAuth  = () => {
    return useContext(AuthContext ); // ✅ Récupère la vraie valeur du contexte
}

// Fournisseur du contexte
export const AuthProvider = ({ children }) => {
     // Récupérer le token depuis le localStorage (si existant)
    const [stateToken, setStateToken] = useState(localStorage.getItem("authToken") || null);
    const [roles, setRoles] = useState([]);  // Liste des roles

     // Fonction pour mettre à jour le token et le sauvegarder
     const login = (newToken) => {
        setStateToken(newToken);
        localStorage.setItem("authToken", newToken);
    };

    // Fonction pour supprimer le token (Déconnexion)
    const logout = () => {
        setStateToken(null);
        localStorage.removeItem("authToken");
    };

    // 5️⃣ Fonction pour mettre à jour la liste des roles
    const updateRoleList = (newRoles) => {
        setRoles((prevRoles) => [newRoles, ...prevRoles]);  // Ajoute en tête
    };

    // 6️⃣ Fonction pour récupérer les roles
    const fetchRoles = async () => {
        try {
            // Imaginons que tu fais une requête API pour récupérer les roles
            //const response = await fetch("/api/users");
            //const data = await response.json();
            const response = await getAllRoles();
            setRoles(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des roles:", error);
        }
    };

    useEffect(() => {
        if (stateToken) {
            fetchRoles(); // Appeler la fonction dès que le token est disponible
        }
    }, [stateToken]);


    return(
        <AuthContext.Provider value={{ stateToken, login, logout, roles,setRoles, fetchRoles, updateRoleList }}>
            {children}
        </AuthContext.Provider>
    );
};

// Création du Provider pour gérer la liste des utilisateurs
export const UserProvider = ({children}) => {
    const [users, setUsers] = useState([]);  // Liste des utilisateurs

    // Fonction pour récupérer la liste des utilisateurs
    const fetchUsers = async () => {
        try{
            const response = await getUsers();
            setUsers(response.data);
        }catch(error){
            console.error("Erreur lors de la récupération des utilisateurs:", error);
        }
    };

    useEffect(() => {
        fetchUsers(); // Charger les utilisateurs lors du montage
    },[]);

    return(
        <UserContext.Provider value={{users, setUsers}}>
            {children}
        </UserContext.Provider>
    );
};

// Hook personnalisé pour accéder aux utilisateurs
export const useUsers = () => useContext(UserContext);

export const useAppStateAccessBackEnd = () => {
    const appState = useState([]);
    return appState;
};

export const useAppStateAccessEntreprise = () => {
    const appState = useState([]);
    return appState;
};

export const useAppStateEntreprise = () => {
    const appState = useState([]);
    return appState;
};

export const useAppStateFonctionnalite = () => {
    const appState = useState([]);
    return appState;
};