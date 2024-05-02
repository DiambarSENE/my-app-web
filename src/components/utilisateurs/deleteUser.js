import React, { useState, useEffect, useContext } from 'react';
import { deleteType, getTypeById} from '../../servicesApi/microservice-parametre';
import {  faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Header from '../templates/header';
import Footer from '../templates/Footer';
import SideNav from '../templates/SideNav';
import { deleteUsers, getUserById } from '../../servicesApi/microservice-utilisateur';
import { AppContextUtilisateur } from '../../useContext/contextStateUser';
import { Link } from 'react-router-dom';

function DeleteUser({userId}) {
      //const navigate = useNavigate();
      const [show, setShow] = useState(false);
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);

      const { stateUtilisateur, setStateUtilisateur } = useContext(AppContextUtilisateur);
      

      const [nom, setNom] = useState("");
      const [prenom, setPrenom] = useState("");
      const [telephone, setTelephone] = useState("");
      const [matricule , setMatricule] = useState("");
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [isactivated , setIsActivated] = useState(false);
      const [userCreate, setUserCreate] = useState("");

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
                 setUserCreate(user.userCreate);
                 setIsActivated(user.isactivated);
            });
      };

      const handleDeleteUser = (e) => {
          e.preventDefault();

          deleteUsers(userId)
              .then(resp =>{
                   const newusers = stateUtilisateur.filter((u) => u.id != userId);
                   setStateUtilisateur(newusers);
                   alert(resp.data);
                   {handleClose();}
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
             <Link onClick={handleShow} className="dropdown-item text-danger">Supprimer</Link>

             <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Confirmation de la Suppression</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                   <form>
                      <div className="row"> 
                          <div className="col-lg-6">
                          <div className="mb-3">
                              <label className="form-label">Prenom : </label>
                              <input type="text" value={prenom}
                                    onChange={(e) => setPrenom(e.target.value) } className="form-control" name="prenom" disabled/>
                          </div>
                          </div>
                          <div className="col-lg-6">
                          <div className="mb-3">
                              <label className="form-label">Nom :</label>
                              <input name="nom" type="text" value={nom}
                                onChange={(e) => setNom(e.target.value) } className="form-control" disabled/>
                          </div>
                          </div>
                          <div className="col-lg-6">
                          <div className="mb-3">
                              <label className="form-label">Telephone : </label>
                              <input name="telephone" type="tel" value={telephone}
                                  onChange={(e) => setTelephone(e.target.value) } className="form-control" disabled/>
                          </div>
                          </div>
                          <div className="col-lg-6">
                          <div className="mb-3">
                              <label className="form-label">Email :</label>
                              <input name="email" type="email" value={email}
                                  onChange={(e) => setEmail(e.target.value) } className="form-control" disabled/>
                          </div>
                          </div>
                          <div className="col-lg-12">
                          <div className="mb-3">
                              <label className="form-label">Matricule : </label>
                              <input name="matricule" type="text" value={matricule}
                                onChange={(e) => setMatricule(e.target.value) } className="form-control" disabled/>
                          </div>
                          </div>
                          <div className="col-lg-6">
                          <div className="mb-3">
                              <input name="userCreate"
                                  type="hidden" min="0"
                                value={userCreate}
                                onChange={(e) => setUserCreate(e.target.value) } className="form-control" disabled/>
                          </div>
                          <div className="mb-3">
                          <div className="form-check">
                              <input className="form-check-input" type="checkbox"
                                disabled/>
                            <label className="form-check-label" htmlFor="flexCheckChecked">
                              Activated
                            </label>
                          </div>  
                          </div>
                        </div>
                        <div className="modal-footer">
                              <button type="button" className="btn btn-danger light" onClick={handleClose}>Fermer</button>
                              <button className="btn btn-primary" onClick={ handleDeleteUser } >- Supprimer</button>
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
export default DeleteUser;