//import './App.css';
import React, { useCallback, useEffect } from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppContext, useAppState, AppContextParamByType, useAppStateParamByType, useAppStateSousParametre, AppContextSousParametre, AppContextParam, useAppStateParam} from './useContext/context';
import { getAllSousParametres, getParametres, getTypes } from './servicesApi/microservice-parametre';
import Footer from './components/templates/Footer';
import Header from './components/templates/header';
import SideNav from './components/templates/SideNav';
import Home from './components/templates/home';
// import Inscription from './components/utilisateurs/inscription.js';
import Connexion from './components/api-utilisateur/utilisateurs/connexion';
import { AppContextAccessBackEnd, AppContextAccessEntreprise, AppContextEntreprise, AppContextFonctionnalite, AppContextIdUserByToken, AppContextProvider, AppContextRole, AppContextRoleByToken, AppContextToken, AppContextUserByEmail, AppContextUtilisateur, AuthProvider, useAppGetIdUserFromToken, useAppGetRoleFromToken, useAppGetToken, useAppStateAccessBackEnd, useAppStateAccessEntreprise, useAppStateEntreprise, useAppStateFonctionnalite, useAppStateRoles, useAppStateUserByEmail, useAppStateUtilisateur, UserProvider } from './useContext/contextStateUser';
import { deleteToken, getAllAccessBackEnds, getAllAccessEntreprises, getAllEntreprises, getAllFonctionnalites, getAllRoles, getAuthToken, getUsers } from './servicesApi/microservice-utilisateur';
import Profile from './components/api-utilisateur/utilisateurs/profile';
import ListUser from './components/api-utilisateur/utilisateurs/listUser';
import ListRole from './components/api-utilisateur/roles/listRole';
import { decodeJWT } from './validateur/decoteToken';
import Inscription from './components/api-utilisateur/utilisateurs/inscription';
import AddRole from './components/api-utilisateur/roles/addRole';
import ListType from './components/api-parametre/types/listType';
import EditParametre from './components/api-parametre/parametre/editParametre';
import ListParametreByType from './components/api-parametre/parametre/listParametreByType';
import ListSousParametre from './components/api-parametre/sousParametre/listSousParametre';
import ListAccessBackend from './components/api-utilisateur/accessBackend/listAccessBackend';
import ListFonctionnalite from './components/api-utilisateur/fonctionnalite/listFonctionnalite';
import ListEntreprise from './components/api-utilisateur/entreprise/listEntreprise';
import ListAccessEntreprise from './components/api-utilisateur/accessEntreprise/listAccessEntreprise';



function App() {

    const [ stateT, setStateT ] = useAppState(AppContext);
    const [stateSousParametre, setStateSousParametre] = useAppStateSousParametre(AppContextSousParametre)
    const [ stateParametre, setStateParametre ] = useAppStateParam(AppContextParam);
    const [stateParametreByType, setStateParametreByType] = useAppStateParamByType(AppContextParamByType)
    // const [stateUtilisateur, setStateUtilisateur] = useAppStateUtilisateur(AppContextUtilisateur);
    const [stateUserByEmail, setStateUserByEmail] = useAppStateUserByEmail(AppContextUserByEmail);
    // const [stateRole, setStateRole] = useAppStateRoles(AppContextRole)
    const [stateRoleFromToken , setStateRoleFromToken] = useAppGetRoleFromToken(AppContextRoleByToken);
    const [stateIdUserFromToken , setStateIdUserFromToken] = useAppGetIdUserFromToken(AppContextIdUserByToken);
    // const [stateToken , setStateToken] = useAppGetToken(AppContextToken);
    const [ stateAccessBackEnd, setStateAccessBackEnd ] = useAppStateAccessBackEnd(AppContextAccessBackEnd);
    const [ stateAccessEntreprise, setStateAccessEntreprise ] = useAppStateAccessEntreprise(AppContextAccessEntreprise);
    const [ stateEntreprise, setStateEntreprise ] = useAppStateEntreprise(AppContextEntreprise);
    const [ stateFonctionnalite, setStateFonctionnalite ] = useAppStateFonctionnalite(AppContextFonctionnalite);
    
    const token = getAuthToken();
    

    const handlerToken = () => {
        // Récupérez le token JWT depuis le stockage local
        const token = getAuthToken();
        if (token) {
        //    setStateToken(token);
            //Décodez le token JWT pour accéder aux rôles
            const decodedToken = decodeJWT(token);
            //if (decodedToken && decodedToken.roles) {
               if (decodedToken) {
                   setStateUserByEmail(decodedToken.sub);
                   setStateRoleFromToken(decodedToken.roles)
                   setStateIdUserFromToken(decodedToken.userId)
                   //destructuration pour recuperer un attribut specifique
                   const { exp } = decodedToken;
                   const expirationTempsEnMiliseconde = exp * 1000;
                   const tempsExpiration = expirationTempsEnMiliseconde - Date.now();

                   if(tempsExpiration <= 0){
                       deleteToken();
                       window.location.href = '/';
                   }else{
                       setTimeout(handlerToken, tempsExpiration);
                   }
               } else {
                   // Gestion des erreurs de décodage
                   console.error('Le décodage du token a échoué.');
                   deleteToken();
                   window.location.href = '/';
           }
        }

    };

    const handleGetType = useCallback(async () => {
        if (!token) {
            // Si le token n'existe pas, on ne fait rien
            return;
        }
        try {
            const resp = await getTypes();
            setStateT(resp.data);
        } catch (err) {
            console.error("Erreur lors de la récupération des types :", err);
        }
    }, [getTypes, setStateT]); // Ajouter les dépendances si la fonction est utilisée dans un useEffect

    useEffect(() => {
        handleGetType();
        handlerGetParametre();
        handlerGetSousParametre();
        //handlerGetUtilisateur();
        // handlerGetRole();
        handlerToken();
        handlerGetAccessBackEnd(); 
        handlerGetAccessEntreprise();
        handlerGetEntreprise(); 
        handlerGetFonctionnalite();

    },[handleGetType]);
    
    const handlerGetParametre = () => {
        getParametres()
            .then( resp => {
                setStateParametre(resp.data);
        })
        .catch((err) => {
            console.log(err)
        });
    };
    
    const handlerGetSousParametre = () => {
         getAllSousParametres()
            .then( resp => {
                
                setStateSousParametre(resp.data);
            })
            .catch(error => {
                console.error(error);
            });
    };
    
    // const handlerGetRole = () => {
    //     getAllRoles()
    //         .then( resp => {
    //             setStateRole(resp.data);
    //     })
    //     .catch((err) => {
    //         console.log(err)
    //     });
    // };
    
    // const handlerGetUtilisateur = () => {
    //     getUsers()
    //         .then(resp => {
    //             setStateUtilisateur(resp.data);
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     });
    // };

    const handlerGetAccessBackEnd = () => {
        getAllAccessBackEnds()
            .then(resp => {
                setStateAccessBackEnd(resp.data);
        })
        .catch(err => {
            console.log(err)
        });
    };
    const handlerGetAccessEntreprise = () => {
        getAllAccessEntreprises()
            .then(resp => {
                setStateAccessEntreprise(resp.data);
        })
        .catch(err => {
            console.log(err)
        });
    };
    const handlerGetEntreprise = () => {
        getAllEntreprises()
            .then(resp => {
                setStateEntreprise(resp.data);
        })
        .catch(err => {
            console.log(err)
        });
    }; 
    const handlerGetFonctionnalite = () => {
        getAllFonctionnalites()
            .then(resp => {
                setStateFonctionnalite(resp.data);
        })
        .catch(err => {
            console.log(err)
        });
    };

    
    return (
        <>
        <AuthProvider> {/* AuthProvider pour le token */}
        <UserProvider> {/* UserProvider pour la liste des utilisateurs */}

        <AppContext.Provider value={ { stateT, setStateT } }>
        <AppContextSousParametre.Provider value={ { stateSousParametre, setStateSousParametre } }>
        <AppContextParam.Provider value={  { stateParametre, setStateParametre } }>
        <AppContextParamByType.Provider value={  { stateParametreByType, setStateParametreByType } }>
        {/* <AppContextUtilisateur.Provider value={{ stateUtilisateur, setStateUtilisateur }}> */}
        <AppContextUserByEmail.Provider value={{stateUserByEmail, setStateUserByEmail}}>
        {/* <AppContextRole.Provider value={{stateRole, setStateRole}}> */}
        <AppContextRoleByToken.Provider value={{stateRoleFromToken , setStateRoleFromToken}}>
        <AppContextIdUserByToken.Provider value={{stateIdUserFromToken , setStateIdUserFromToken}}>
        {/* <AppContextToken.Provider value={{stateToken , setStateToken}}> */}
        <AppContextAccessBackEnd.Provider value={ { stateAccessBackEnd, setStateAccessBackEnd } }>
        <AppContextAccessEntreprise.Provider value={ { stateAccessEntreprise, setStateAccessEntreprise } }>
        <AppContextEntreprise.Provider value={ { stateEntreprise, setStateEntreprise } }>
        <AppContextFonctionnalite.Provider value={ { stateFonctionnalite, setStateFonctionnalite } }>
                <BrowserRouter> 
                   
                    <Routes>
                        <Route path="/" exact element={ < Connexion /> }></Route>
                        <Route path="/home"   element={ < Home  /> } ></Route>
                        <Route path="/types" element={ < ListType /> } ></Route>
                        {/* <Route path="/addParametre" element={ < AddParametre /> }></Route> */}
                        <Route path="/editParametre/:id" element={ < EditParametre /> }></Route>
                        {/* <Route path="/listParametre" element={ < ListParametre /> }></Route> */}
                        <Route path="/listParametreByType/:id" element={ < ListParametreByType /> }></Route>
                        <Route path="/adminInscription" element={ < Inscription /> }></Route> 
                        <Route path="/adminAddRole" element={ < AddRole /> }></Route>
                        <Route path="/profile" element={ <Profile /> }></Route>
                        <Route path="/utilisateurs" element={ <ListUser /> }></Route>
                        <Route path="/roles" element={ <ListRole /> }></Route>
                        <Route path="/sousParametres" element={ < ListSousParametre/>}></Route>
                        <Route path="/entreprises" element={ < ListEntreprise/>}></Route>
                        <Route path="/accesEntreprises" element={ < ListAccessEntreprise/>}></Route>
                        <Route path="/accesBackends" element={ < ListAccessBackend/>}></Route>
                        <Route path="/fonctionnalites" element={ < ListFonctionnalite/>}></Route>
                    </Routes>

                </BrowserRouter>
        </AppContextFonctionnalite.Provider>
         </AppContextEntreprise.Provider>
         </AppContextAccessEntreprise.Provider>
        </AppContextAccessBackEnd.Provider>        
        {/* </AppContextToken.Provider>         */}
        </AppContextIdUserByToken.Provider>         
        </AppContextRoleByToken.Provider>        
        {/* </AppContextRole.Provider>        */}
        </AppContextUserByEmail.Provider>        
        {/* </AppContextUtilisateur.Provider>         */}
        </AppContextParamByType.Provider>
         </AppContextParam.Provider>
         </AppContextSousParametre.Provider>
        </AppContext.Provider>
        </UserProvider>
        </AuthProvider>
        </>    
  );
}
export default App;
