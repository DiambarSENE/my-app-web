import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AppContextRole, AppContextRoleByToken, AppContextUtilisateur } from "../../../useContext/contextStateUser";
import { createUsers, setAuthHeader } from "../../../servicesApi/microservice-utilisateur";
import { ValidationEmail, ValidationName, ValidationPrenom, ValidationRole, ValidationTelephone } from "../../../validateur/validation";


function Inscription(){
    //const token = getAuthToken();
    const { userRoles, setUserRoles } = useContext(AppContextRole);
    

    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [telephone, setTelephone] = useState("");
    const [matricule , setMatricule] = useState("");
    const [email, setEmail] = useState("");
    //const [password, setPassword] = useState("");
    const [activer , setActiver] = useState(false);
    const [createBy, setCreateBy] = useState("");
    const [role, setRole] = useState("");

    const [errorPrenom, setErrorPrenom] = useState("");
    const [errorNom, setErrorNom] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorTelephone, setErrorTelephone] = useState("");
    const [errorRole, setErrorRole] = useState("");

    const [componentToShow, setComponentToShow] = useState("");

    const login = () => {
        setComponentToShow("login")
    };

    const logout = () => {
        setComponentToShow("welcome")
        setAuthHeader(null);
    };

    const handlerAddUser = (e) => {
        e.preventDefault();
        const errorPrenom = ValidationPrenom(prenom);
        const errorNom = ValidationName(nom);
        const errorEmail = ValidationEmail(email);
        const errorTelephone = ValidationTelephone(telephone);
        const errorRole = ValidationRole(role);

         let user = {nom, prenom,telephone, email, role, activer, createBy}
        if(!errorPrenom || !errorNom || !errorEmail || !errorTelephone || !errorRole){
            createUsers(user)
                .then(
                    (response) => {
                        //setComponentToShow("messages");
                        setNom("");
                        setPrenom("");
                        setTelephone("");
                        //setMatricule("");
                        setEmail("");
                        // setPassword("");
                        setActiver(false);
                        setCreateBy("")
                        alert("utilisateur ajouter avec succes");
                        
                    })
                    .catch(
                    (error) => {
                    // setAuthHeader(null);
                        setComponentToShow("welcome")
                        console.log(error)
                    }
                );
        }else{
            setErrorPrenom(errorPrenom);
            setErrorNom(errorNom);
            setErrorEmail(errorEmail);
            setErrorTelephone(errorTelephone);
            setErrorRole(errorRole);
        }        
    };

    
    return(
        <>
        {/* {componentToShow === "welcome" && <Footer /> }
                    {componentToShow === "login" && <Connexion />}
                    {componentToShow === "messages" && <Home />} */}
        {/* { 
           token !== "null" && stateRoleFromToken.includes('admin') && ( 
            ) 
        }
        
        {
            token == "null" && !stateRoleFromToken.includes('admin') && <PageError403/>
        } */}
            <div className="authincation h-100">
                <div className="container h-100">
                    <br/>
                    <div className="row justify-content-center h-100 align-items-center">
                    <div className="col-md-6">
                        <div className="authincation-content">
                        <div className="row no-gutters">
                            <div className="col-xl-12">
                            <div className="auth-form">
                                <div className="text-center mb-3">
                                <a href="index.html"><img src="images/logo-full.png" alt /></a>
                                </div>
                                <h4 className="text-center mb-4">Ouvrir un compte</h4>
                                <form onSubmit={ handlerAddUser }>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label className="mb-1"><strong>PRENOM <span style={{color:"red"}}>*</span> :</strong></label>   
                                            <input value={prenom} onChange={(e) => setPrenom(e.target.value) } type="text" className="form-control" placeholder="Votre prenom ici" />
                                        </div>
                                        <div className="col-sm-6 mt-2 mt-sm-0">
                                            <label className="mb-1"><strong>NOM <span style={{color:"red"}}>*</span> :</strong></label>
                                            <input value={nom} onChange={(e) => setNom(e.target.value)} type="text" className="form-control" placeholder="Votre nom ici" />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="mb-1"><strong>Email <span style={{color:"red"}}>*</span> :</strong></label>
                                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" placeholder="hello@example.com" />
                                    </div>
                                    {/* <div className="mb-3">
                                        <label className="mb-1"><strong>Matricule <span style={{color:"red"}}>*</span> :</strong></label>
                                        <input value={matricule} onChange={(e) => setMatricule(e.target.value)} type="text" className="form-control" placeholder="Votre adresse" />
                                    </div> */}
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <label className="mb-1"><strong>TEL. PORTABLE <span style={{color:"red"}}>*</span> :</strong></label>   
                                            <input value={telephone} onChange={(e) => setTelephone(e.target.value)} type="tel" className="form-control" placeholder="Votre prenom ici" />
                                        </div>
                                        <div className="col-sm-6 mt-2 mt-sm-0">
                                            <label className="mb-1"><strong>TEL. FIXE</strong></label>
                                            <input  type="tel" className="form-control" placeholder="Votre nom ici" />
                                        </div>
                                    </div>
                                    
                                    <div className="mb-3">
                                        <label className="form-label">Profil<span style={{color: "red"}}>*</span>:</label>
                                        <select name="role" value={role} 
                                            onChange={(e) => setRole(e.target.value)}
                                            className="form-control default-select wide" id="inputState">
                                        <option selected value="">Choose...</option>
                                        {   
                                            userRoles.map(role => (
                                                <option key={role.id} value={role.name}>{role.nom}</option>
                                            ))
                                        }
                                        </select>
                                        {errorRole && <span style={{color : "red"}}>{errorRole}</span>}
                                    </div>
                                    {/* <div className="row">
                                        <div className="col-sm-6">
                                            <label className="mb-1"><strong>MOT DE PASSE <span style={{color:"red"}}>*</span> :</strong></label>   
                                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" defaultValue="Password" />
                                        </div>
                                        <div className="col-sm-6 mt-2 mt-sm-0">
                                            <label className="mb-1"><strong>CONFIRMER LE MOT DE PASSE <span style={{color:"red"}}>*</span> :</strong></label>
                                            <input type="password" className="form-control" defaultValue="Password" />
                                        </div>
                                    </div> */}
                                    <div className="text-center mt-4">
                                        <button className="btn btn-primary btn-block">Je m'inscris</button>
                                    </div>
                                </form>
                                <div className="new-account mt-3">
                                <p>Vous avez déjà un compte ? <Link className="text-primary" to={"/"}>Se connecter</Link></p>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    <br/>
                </div>
            </div> 
        
        </>
    );
}
export default Inscription;