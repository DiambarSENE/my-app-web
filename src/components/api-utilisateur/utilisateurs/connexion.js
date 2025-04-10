import React, { useContext, useState } from "react";
import {  useNavigate } from "react-router-dom";
import {  deleteToken, getConnexion,
     setAuthHeader, setEmailInLocalStorage, 
     setIdInLocalStorage, deleteIdInLocalStorage,
     deleteEmailInLocalStorage } from "../../../servicesApi/microservice-utilisateur";

import {  AppContextToken, AppContextUserByEmail, useAppGetIdUserFromToken, useAppGetToken, useAuth } from "../../../useContext/contextStateUser";
import Home from "../../templates/home";





function Connexion(){
    const navigate = useNavigate();
     const {setStateUserByEmail} = useContext(AppContextUserByEmail);
    
     const { login } = useAuth();  // ✅ Récupération de la fonction login

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handlerConnexion = async (e) => {
        e.preventDefault();
        const data = { email, password };

        try {
            const response = await getConnexion(data);
            console.log("Réponse serveur:", response.data);

            if (response.data.token && response.data.token !== "null") {
                setStateUserByEmail(response.data.email);
                // ✅ Stocker le token dans le localStorage pour éviter qu'il disparaisse après un refresh
                setAuthHeader(response.data.token);
                 // ✅ Stocker l'email dans le localStorage pour éviter qu'il disparaisse après un refresh
                setEmailInLocalStorage(response.data.email);
                // ✅ Stocker l'id dans le localStorage pour éviter qu'il disparaisse après un refresh
                setIdInLocalStorage(response.data.id);
                login(response.data.token); // ✅ Stocker le token dans le contexte
                // ✅ Redirection propre sans reload
                navigate("/home");
                window.location.reload();
            } else {
                alert("Email ou mot de passe incorrect");
            }
        } catch (error) {
            deleteToken();
            deleteIdInLocalStorage();
            deleteEmailInLocalStorage();
            setAuthHeader(null);
            console.error("Erreur lors de la connexion:", error);
            alert("Email ou mot de passe incorrect");
        }
    };

    // const findUserByEmail = (email) => {
    //     getUserByEmail(email)
    //         .then(response => {
    //         setStateUserByEmail(response.data)
    //     })
    //     .catch(err =>{
    //         console.log(err);
    //     })
    // }

    return(
        <>
                    {/* {componentToShow === "welcome" && <Footer /> }
                    {componentToShow === "login" && <Connexion />}
                    {componentToShow === "messages" && <Home />} */}
           {
          
                <div className="authincation h-100">
                    <div className="container h-100">
                    <br/><br/><br/>
                        <div className="row justify-content-center h-100 align-items-center">
                        <div className="col-md-6">
                            <div className="authincation-content">
                            <div className="row no-gutters">
                                <div className="col-xl-12">
                                <div className="auth-form">
                                    <div className="text-center mb-3">
                                    <a href="index.html"><img src="images/logo-full.png" alt /></a>
                                    </div>
                                    <h4 className="text-center mb-4">Connectez-vous à votre compte</h4>

                                    {/* {componentToShow === "welcome" && <h6 className="text-center mb-4" style={{color:"red"}}>Email ou mot de passe invalide</h6> }
                                    */}
                                    <form onSubmit={ handlerConnexion }>
                                    <div className="mb-3">
                                        <label className="mb-1"><strong>Email <span style={{color:"red"}}>*</span> :</strong></label>
                                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" defaultValue="hello@example.com" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="mb-1"><strong>Mot de passe <span style={{color:"red"}}>*</span> :</strong></label>
                                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" defaultValue="Password" />
                                    </div>
                                    <div className="row d-flex justify-content-between mt-4 mb-2">
                                        <div className="mb-3">
                                        <div className="form-check custom-checkbox ms-1">
                                            <input type="checkbox" className="form-check-input" id="basic_checkbox_1" />
                                            <label className="form-check-label" htmlFor="basic_checkbox_1">Souvenez-vous de ma préférence</label>
                                        </div>
                                        </div>
                                        <div className="mb-3">
                                        <a href="page-forgot-password.html">Mot de passe oublié ?</a>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <button type="submit" className="btn btn-primary btn-block">Se connecter</button>
                                    </div>
                                    </form>
                                    <div className="new-account mt-3">
                                    {/*                                 
                                    <p>Vous n'avez pas encore de compte ? <Link className="text-primary" to={"/inscription"}>Inscrivez-vous</Link></p> 
                                    */}
                                    </div> 
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            
            }
           
        </>
    );
}

export default Connexion;