import React, { useState, useEffect, useContext } from 'react';
import { deleteType, getTypeById} from '../../servicesApi/microservice-parametre';
import {  faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Header from '../templates/header';
import Footer from '../templates/Footer';
import SideNav from '../templates/SideNav';
import { getUserById, getUsers, updateUser } from '../../servicesApi/microservice-utilisateur';
import { AppContextIdUserByToken, AppContextUtilisateur } from '../../useContext/contextStateUser';
import { Link } from 'react-router-dom';

function EditerUser({userId}) {
      //const navigate = useNavigate();
      const [show, setShow] = useState(false);
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);

      //permet de requiperer l'identifiant de l'utilisateur ensuite de l'utiliser dans le methode d'ajoute
      const {stateIdUserFromToken, setStateIdUserFromToken} = useContext(AppContextIdUserByToken);
      const { stateUtilisateur, setStateUtilisateur  } = useContext(AppContextUtilisateur);
      

      const [nom, setNom] = useState("");
      const [prenom, setPrenom] = useState("");
      const [telephone, setTelephone] = useState("");
      const [matricule , setMatricule] = useState("");
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [isActivated , setIsActivated] = useState(false);
      //const idUser = stateIdUserFromToken;
      //const [userCreate, setUserCreate] = useState(idUser);

      useEffect(() =>{
           handleGetUserById(userId);
      },[]);

      const handleGetUserById = (userId) => {
            getUserById(userId).then(resp => {
                 let user = resp.data;
                 setPrenom(user.prenom);
                 setNom(user.nom);
                 setTelephone(user.telephone);
                 setMatricule(user.matricule);
                 setEmail(user.email);
                 setIsActivated(user.isActivated);
            });
      };

      const handleUpdateUser = (e) => {
          e.preventDefault();
          const id = userId;
          const userCreate = stateIdUserFromToken;
          let user = {id, prenom, nom, telephone, matricule, email, isActivated, userCreate };
          updateUser(user).then(resp =>{
                {handleClose();}
                 getUsers()
                    .then( resp => {
                        setStateUtilisateur(resp.data);
                }) 
                 alert("utilisatur modifier avec success")
                
              } )
              .catch(err => {
                console.log(err)
            });
      };
      return(
            <>
             {/* <button onClick={handleShow} className="btn btn-outline-danger">
                <FontAwesomeIcon icon={faTrash}>
                </FontAwesomeIcon>
             </button> */}

             <Link onClick={handleShow} className="dropdown-item" >Modifier</Link>

             <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Modification d'un utilisateur</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={ handleUpdateUser }>
                      <div className="row"> 
                          <div className="col-lg-6">
                          <div className="mb-3">
                              <label className="form-label">Prenom : </label>
                              <input type="text" value={prenom}
                                    onChange={(e) => setPrenom(e.target.value) } className="form-control" name="prenom"/>
                          </div>
                          </div>
                          <div className="col-lg-6">
                          <div className="mb-3">
                              <label className="form-label">Nom :</label>
                              <input name="nom" type="text" value={nom}
                                onChange={(e) => setNom(e.target.value) } className="form-control" />
                          </div>
                          </div>
                          <div className="col-lg-6">
                          <div className="mb-3">
                              <label className="form-label">Telephone : </label>
                              <input name="telephone" type="tel" value={telephone}
                                  onChange={(e) => setTelephone(e.target.value) } className="form-control" />
                          </div>
                          </div>
                          <div className="col-lg-6">
                          <div className="mb-3">
                              <label className="form-label">Email :</label>
                              <input name="email" type="email" value={email}
                                  onChange={(e) => setEmail(e.target.value) } className="form-control" />
                          </div>
                          </div>
                          <div className="col-lg-12">
                          <div className="mb-3">
                              <label className="form-label">Matricule : </label>
                              <input name="matricule" type="text" value={matricule}
                                onChange={(e) => setMatricule(e.target.value) } className="form-control" />
                          </div>
                          </div>
                          <div className="col-lg-6">
                         
                          <div className="mb-3">
                          <div className="form-check">
                              <input className="form-check-input" type="checkbox"
                                isActivated={isActivated}
                                onChange={(e) => setIsActivated(e.target.checked) } />
                            <label className="form-check-label" htmlFor="flexCheckChecked">
                              Activated
                            </label>
                          </div>  
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