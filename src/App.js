//import './App.css';
import React, { useEffect } from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ListType from './components/types/listType';
import AddParametre from './components/parametrages/addParametre';
import EditParametre from './components/parametrages/editParametre';
import ListParametre from './components/parametrages/XxxxxxxXlistParametreJS';
import ListParametreByType from './components/parametrages/listParametreByType';
import { AppContext, useAppState, AppContextParamByType, useAppStateParamByType, useAppStateFonctionnalite, AppContextFonctionnalite} from './useContext/context';
import { getAllFonctionnalites, getParametres, getTypes } from './servicesApi/microservice-parametre';
import Footer from './components/templates/Footer';
import Header from './components/templates/header';
import SideNav from './components/templates/SideNav';
import Home from './components/templates/home';
// import Inscription from './components/utilisateurs/inscription.js';
import Connexion from './components/utilisateurs/connexion';
import { AppContextIdUserByToken, AppContextRole, AppContextRoleByToken, AppContextToken, AppContextUserByEmail, AppContextUtilisateur, useAppGetIdUserFromToken, useAppGetRoleFromToken, useAppGetToken, useAppStateRoles, useAppStateUserByEmail, useAppStateUtilisateur } from './useContext/contextStateUser';
import { deleteToken, getAllRoles, getAuthToken, getUsers } from './servicesApi/microservice-utilisateur';
import Profile from './components/utilisateurs/profile';
import ListUser from './components/utilisateurs/listUser';
import ListRole from './components/roles/listRole';
import { decodeJWT } from './validateur/decoteToken';
import Inscription from './components/utilisateurs/inscription';
import AddRole from './components/roles/addRole';
import ListFonctionnalite from './components/fonctionnalites/listFonctionnalite';



function App() {

    const [ stateT, setStateT ] = useAppState(AppContext);
    const [stateFonctionnalite, setStateFonctionnalite] = useAppStateFonctionnalite(AppContextFonctionnalite)
    //const [ stateParametre, setStateParametre ] = useAppStateParam(AppContextParam);
    const [stateParametreByType, setStateParametreByType] = useAppStateParamByType(AppContextParamByType)
    const [stateUtilisateur, setStateUtilisateur] = useAppStateUtilisateur(AppContextUtilisateur);
    const [stateUserByEmail, setStateUserByEmail] = useAppStateUserByEmail(AppContextUserByEmail);
    const [userRoles, setUserRoles] = useAppStateRoles(AppContextRole)
    const [stateRoleFromToken , setStateRoleFromToken] = useAppGetRoleFromToken(AppContextRoleByToken);
    const [stateIdUserFromToken , setStateIdUserFromToken] = useAppGetIdUserFromToken(AppContextIdUserByToken);
    const [stateToken , setStateToken] = useAppGetToken(AppContextToken);

    useEffect(() => {
        handleGetType();
        //handlerGetParametre();
        handlerGetFonctionnalite();
        handlerGetUtilisateur();
        handlerGetRole();
        handlerToken();
    },[]);

    const handlerToken = () => {
        // Récupérez le token JWT depuis le stockage local
        const token = getAuthToken();
        if (token) {
           setStateToken(token);
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

    const handleGetType = () => {
        getTypes()
            .then( resp => {
                setStateT(resp.data);
            })
            .catch((err) => {
                console.log(err)
            });
    };
    
    // const handlerGetParametre = () => {
    //     getParametres()
    //         .then( resp => {
    //             setStateParametre(resp.data);
    //     })
    //     .catch((err) => {
    //         console.log(err)
    //     });
    // };
    
    const handlerGetFonctionnalite = () => {
         getAllFonctionnalites()
            .then( resp => {
                
                setStateFonctionnalite(resp.data);
            })
            .catch(error => {
                console.error(error);
            });
    };
    
    const handlerGetRole = () => {
        getAllRoles()
            .then( resp => {
                setUserRoles(resp.data);
        })
        .catch((err) => {
            console.log(err)
        });
    };
    
    const handlerGetUtilisateur = () => {
        getUsers()
            .then(resp => {
                setStateUtilisateur(resp.data);
        })
        .catch(err => {
            console.log(err)
        });
    };
    
    return (
        <>
        <AppContext.Provider value={ { stateT, setStateT } }>
        <AppContextFonctionnalite.Provider value={ { stateFonctionnalite, setStateFonctionnalite } }>
        {/* <AppContextParam.Provider value={  { stateParametre, setStateParametre } }> */}
        <AppContextParamByType.Provider value={  { stateParametreByType, setStateParametreByType } }>
        <AppContextUtilisateur.Provider value={{ stateUtilisateur, setStateUtilisateur }}>
        <AppContextUserByEmail.Provider value={{stateUserByEmail, setStateUserByEmail}}>
        <AppContextRole.Provider value={{userRoles, setUserRoles}}>
        <AppContextRoleByToken.Provider value={{stateRoleFromToken , setStateRoleFromToken}}>
        <AppContextIdUserByToken.Provider value={{stateIdUserFromToken , setStateIdUserFromToken}}>
        <AppContextToken.Provider value={{stateToken , setStateToken}}>
                <BrowserRouter> 
                   
                    <Routes>
                        {/* <Route path="/" exact element={ < Connexion /> }></Route> */}
                        <Route path="/home"   element={ < Home  /> } ></Route>
                        <Route path="/listType" element={ < ListType /> } ></Route>
                        <Route path="/addParametre" element={ < AddParametre /> }></Route>
                        <Route path="/editParametre/:id" element={ < EditParametre /> }></Route>
                        {/* <Route path="/listParametre" element={ < ListParametre /> }></Route> */}
                        <Route path="/listParametreByType/:id" element={ < ListParametreByType /> }></Route>
                        <Route path="/adminInscription" element={ < Inscription /> }></Route> 
                        <Route path="/adminAddRole" element={ < AddRole /> }></Route>
                        <Route path="/profile" element={ <Profile /> }></Route>
                        <Route path="/listUser" element={ <ListUser /> }></Route>
                        <Route path="/listRole" element={ <ListRole /> }></Route>
                        <Route path="/listFonctionnalite" element={ < ListFonctionnalite/>}></Route>
                    </Routes>

                </BrowserRouter>
        </AppContextToken.Provider>        
        </AppContextIdUserByToken.Provider>         
        </AppContextRoleByToken.Provider>        
        </AppContextRole.Provider>       
        </AppContextUserByEmail.Provider>        
        </AppContextUtilisateur.Provider>        
        </AppContextParamByType.Provider>
         {/* </AppContextParam.Provider> */}
         </AppContextFonctionnalite.Provider>
        </AppContext.Provider>
        </>    
  );
}
export default App;
