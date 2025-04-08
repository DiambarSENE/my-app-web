import React, { useState, useEffect, useContext } from 'react';
import {  faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from 'react-bootstrap/Modal';

import { Link } from 'react-router-dom';
import { AppContextIdUserByToken, AppContextUtilisateur, useUsers } from '../../../useContext/contextStateUser';
import { getUserById, getUsers, updateUser, getIdInLocalStorage } from '../../../servicesApi/microservice-utilisateur';
import { ValidationEmail, ValidationName, ValidationPrenom, ValidationTelephone } from '../../../validateur/validation';

function EditerUser({userId}) {
      const idInLocalStorage = getIdInLocalStorage();
      //const navigate = useNavigate();
      const [show, setShow] = useState(false);
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);

      //permet de requiperer l'identifiant de l'utilisateur ensuite de l'utiliser dans le methode d'ajoute
      const {stateIdUserFromToken, setStateIdUserFromToken} = useContext(AppContextIdUserByToken);
      //const { stateUtilisateur, setStateUtilisateur  } = useContext(AppContextUtilisateur);
      const { users, setUsers } = useUsers(); // ✅ Récupérer la liste des utilisateurs
      

      const [nom, setNom] = useState("");
      const [prenom, setPrenom] = useState("");
      const [telephone, setTelephone] = useState("");
      const [matricule , setMatricule] = useState("");
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [activer , setActiver] = useState(false);
      const [adresse, setAdresse] = useState("");
      const idUser = idInLocalStorage;;
      const [updateBy, setUpdateBy] = useState(idUser);

      const [errorPrenom, setErrorPrenom] = useState("");
      const [errorNom, setErrorNom] = useState("");
      const [errorEmail, setErrorEmail] = useState("");
      const [errorTelephone, setErrorTelephone] = useState("");

      useEffect(() =>{
        if (userId) {
           handleGetUserById(userId);
        }
      },[userId]);

      const handleGetUserById = (userId) => {
            getUserById(userId).then(resp => {
                 let user = resp.data;
                 setPrenom(user.prenom);
                 setNom(user.nom);
                 setTelephone(user.telephone);
                 setMatricule(user.matricule);
                 setEmail(user.email);
                 setActiver(user.activer);
                 setAdresse(user.adresse)
            });
      };

      const handleUpdateUser = (e) => {
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
          
          const id = userId;
          const updateBy = stateIdUserFromToken;
           // Création de l'objet utilisateur
          let user = {id, prenom, nom, telephone, matricule, email, activer,adresse, updateBy };

        // Envoi de l'utilisateur si tout est valide
          updateUser(user).then(resp =>{
                handleClose();
                setUsers((prevUsers) => [...prevUsers, user]);
                setPrenom("");
                setNom("");
                setTelephone("");
                setMatricule("");
                setEmail("");
                setActiver(false);
                setAdresse("")
              } )
              .catch((error) => {
                console.error("Erreur lors de la modification de l'utilisateur :", error);
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
             {/* <button onClick={handleShow} className="btn btn-outline-danger">
                <FontAwesomeIcon icon={faTrash}>
                </FontAwesomeIcon>
             </button> */}

             <Link onClick={handleShow} className="dropdown-item text-muted" >Modifier</Link>

             <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Modification d'un utilisateur</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={ handleUpdateUser }>
                      <div className="row"> 
                          <div className="col-lg-6">
                          <div className="mb-3">
                              <label className="form-label">Prenom <span style={{color: "red"}}>*</span> : </label>
                              <input type="text" value={prenom}
                                    onChange={(e) => setPrenom(e.target.value) } className="form-control" name="prenom"/>
                          {errorPrenom && <span style={{color : "red"}}>{errorPrenom}</span>}
                          </div>
                          </div>
                          <div className="col-lg-6">
                          <div className="mb-3">
                              <label className="form-label">Nom <span style={{color: "red"}}>*</span> : </label>
                              <input name="nom" type="text" value={nom}
                                onChange={(e) => setNom(e.target.value) } className="form-control" />
                                {errorNom && <span style={{color : "red"}}>{errorNom}</span>}
                          </div>
                          </div>
                          <div className="col-lg-6">
                          <div className="mb-3">
                              <label className="form-label">Telephone <span style={{color: "red"}}>*</span> : </label>
                              <input name="telephone" type="tel" value={telephone}
                                  onChange={(e) => setTelephone(e.target.value) } className="form-control" />
                                  {errorTelephone && <span style={{color : "red"}}>{errorTelephone}</span>}
                          </div>
                          </div>
                          <div className="col-lg-6">
                          <div className="mb-3">
                              <label className="form-label">Email <span style={{color: "red"}}>*</span> : </label>
                              <input name="email" type="email" value={email}
                                  onChange={(e) => setEmail(e.target.value) } className="form-control" />
                               {errorEmail && <span style={{color : "red"}}>{errorEmail}</span>}
                          </div>
                          </div>
                          <div className="col-lg-6">
                          <div className="mb-3">
                              <label className="form-label">Matricule : </label>
                              <input name="matricule" type="text" value={matricule}
                                onChange={(e) => setMatricule(e.target.value) } className="form-control" />
                          </div>
                          </div>
                         
                        <div className="col-lg-6">
                        <div className="mb-3">
                            <label className="form-label">Adresse <span style={{color: "red"}}>*</span>:</label>
                            <input name="adresse" type="adresse" value={adresse}
                                onChange={(e) => setAdresse(e.target.value) } className="form-control" />
                        </div>
                        </div>
                        
                          <div className="mb-3">
                          <div className="form-check">
                              <input className="form-check-input" type="checkbox"
                                checked={activer}
                                onChange={(e) => setActiver(e.target.checked) } />
                            <label className="form-check-label" htmlFor="flexCheckChecked">
                              Activer
                            </label>
                          </div>  
                      
                        </div>
                        <div className="modal-footer">
                            
                            <button type="button" className="btn btn-danger light" onClick={handleClose}>Fermer</button>
                            <button className="btn btn-primary">+ Modifiier</button>
                            
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
export default EditerUser;