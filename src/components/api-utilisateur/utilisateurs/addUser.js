import React, {  useState } from "react";
import { Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import {   useUsers } from "../../../useContext/contextStateUser";
import { ValidationEmail, ValidationName, ValidationPrenom,  ValidationTelephone } from "../../../validateur/validation";
import { createUsers, getIdInLocalStorage } from "../../../servicesApi/microservice-utilisateur";

function AddUser(){
    const idInLocalStorage = getIdInLocalStorage();
    //const { stateUtilisateur, setStateUtilisateur} = useContext(AppContextUtilisateur);
    const {  setUsers } = useUsers(); // ✅ Récupérer la liste des utilisateurs
    
    //const {userRoles, setUserRoles} = useContext(AppContextRole);
    //permet de requiperer l'identifiant de l'utilisateur ensuite de l'utiliser dans le methode d'ajoute

      const [show, setShow] = useState(false);
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);

      const [nom, setNom] = useState("");
      const [prenom, setPrenom] = useState("");
      const [telephone, setTelephone] = useState("");
      const [email, setEmail] = useState("");
      const [matricule, setMatricule] = useState("");
      const [role, setRole] = useState("");
      const [activer , setActiver] = useState(false);
      const [adresse, setAdresse] = useState("");
      //recupere la valeur de l'identifiant
      const userId = idInLocalStorage;
      const [createBy, setCreateBy] = useState(userId);

      const [errorPrenom, setErrorPrenom] = useState("");
      const [errorNom, setErrorNom] = useState("");
      const [errorEmail, setErrorEmail] = useState("");
      const [errorTelephone, setErrorTelephone] = useState("");

      const handlerAddUser = (e) => {
        e.preventDefault();
        // Validation des champs
        const errorPrenom = ValidationPrenom(prenom);
        const errorNom = ValidationName(nom);
        const errorEmail = ValidationEmail(email);
        const errorTelephone = ValidationTelephone(telephone);
        
         // S'il y a AU MOINS une erreur, on bloque la soumission
        if(errorPrenom || errorNom || errorEmail || errorTelephone){
            setErrorPrenom(errorPrenom);
            setErrorNom(errorNom);
            setErrorEmail(errorEmail);
            setErrorTelephone(errorTelephone);
            return;
        }

        // Création de l'objet utilisateur
        let newUser = {nom, prenom,telephone, email, matricule, activer,adresse, createBy}

        // Envoi de l'utilisateur si tout est valide
        createUsers(newUser)
            .then((resp) => {
                handleClose();
                setUsers((prevUsers) => [...prevUsers, newUser]);

                setPrenom("");
                setNom("");
                setTelephone("");
                setMatricule("");
                setEmail("");
                setActiver(false);
                setAdresse("")
            })
            .catch((error) => {
                console.error("Erreur lors de la création de l'utilisateur :", error);
                // Vérifie si c’est une erreur HTTP avec un message serveur
                if (error.response && error.response.data && error.response.data.message) {
                    setErrorEmail(error.response.data.message); // Affiche : "L'adresse email existe déjà"
                } else {
                    alert("Une erreur est survenue !");
                }

            });
      };

    return(
        <>
          <Link onClick={handleShow} className="btn btn-primary btn-rounded fs-18" >+Ajouter un utilisateur</Link>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Ajouter un Utilisateur</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form onSubmit={handlerAddUser}>
                <div className="row"> 
                    <div className="col-lg-6">
                    <div className="mb-3">
                        <label className="form-label">Prenom <span style={{color: "red"}}>*</span>: </label>
                        <input type="text" value={prenom}
                            onChange={(e) => setPrenom(e.target.value) } className="form-control" name="prenom"/>
                        {errorPrenom && <span style={{color : "red"}}>{errorPrenom}</span>}
                    </div>
                    </div>
                    <div className="col-lg-6">
                    <div className="mb-3">
                        <label className="form-label">Nom <span style={{color: "red"}}>*</span>:</label>
                        <input name="nom" type="text" value={nom}
                        onChange={(e) => setNom(e.target.value) } className="form-control" />
                        {errorNom && <span style={{color : "red"}}>{errorNom}</span>}
                    </div>
                    </div>
                    <div className="col-lg-6">
                    <div className="mb-3">
                        <label className="form-label">Telephone <span style={{color: "red"}}>*</span>: </label>
                        <input name="telephone" type="tel" value={telephone}
                            onChange={(e) => setTelephone(e.target.value) } className="form-control" />
                        {errorTelephone && <span style={{color : "red"}}>{errorTelephone}</span>}
                    </div>
                    </div>
                    <div className="col-lg-6">
                    <div className="mb-3">
                        <label className="form-label">Email <span style={{color: "red"}}>*</span>:</label>
                        <input name="email" type="email" value={email}
                            onChange={(e) => setEmail(e.target.value) } className="form-control" />
                            {errorEmail && <span style={{color : "red"}}>{errorEmail}</span>}
                    </div>
                    </div>
                    <div className="col-lg-6">
                    <div className="mb-3">
                        <label className="form-label">Matricule</label>
                        <input name="matricule" type="matricule" value={matricule}
                            onChange={(e) => setMatricule(e.target.value) } className="form-control" />
                    </div>
                    </div>
                    <div className="col-lg-6">
                    <div className="mb-3">
                        <label className="form-label">Adresse</label>
                        <input name="adresse" type="adresse" value={adresse}
                            onChange={(e) => setAdresse(e.target.value) } className="form-control" />
                    </div>
                    </div>
                      {/* <div className="col-lg-6">
                    <div className="mb-3">
                        <input name="createBy"
                            type="hidden" min="0"
                        value={createBy}
                        onChange={(e) => setCreateBy(e.target.value) } className="form-control" />
                    </div>
*/}
                  <div className="mb-3">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox"
                        checked={activer}
                        onChange={(e) => setActiver(e.target.checked) } />
                    <label className="form-check-label" htmlFor="flexCheckChecked">
                        Activer
                    </label>
                    </div>  
                    {/* </div>  */}
                </div>
                
                <div className="modal-footer">
                    <button type="button" className="btn btn-danger light" onClick={handleClose}>Fermer</button>
                    <button className="btn btn-primary">+ Enregistrer</button>
                </div>
                </div>
            </form>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
        </Modal>
        </>
    );
}

export default AddUser;