import React, { useState, useEffect, useContext } from 'react';

import {  faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal } from 'react-bootstrap';
import { AppContextParam } from '../../../useContext/context';
import { AppContextAccessBackEnd, AppContextIdUserByToken, AppContextUtilisateur, useUsers } from '../../../useContext/contextStateUser';
import { getAccessBackEndById, getAllAccessBackEnds, updateAccessBackEnd, getIdInLocalStorage } from '../../../servicesApi/microservice-utilisateur';
import { ValidationName, ValidationUtilisateur } from '../../../validateur/validation';
import { Link } from 'react-router-dom';


function EditAccessBackend({id}) {
  const idInLocalStorage = getIdInLocalStorage();

      //const {id} = useParams();
      //const typeId = parseInt(id);
      const [show, setShow] = useState(false);
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);
      
      //const { stateUtilisateur, setStateUtilisateur} = useContext(AppContextUtilisateur);
      const { users, setUsers } = useUsers(); // ✅ Récupérer la liste des utilisateurs
      
      const {stateParametre, setStateParametre } = useContext(AppContextParam)
      const { stateAccessBackEnd, setStateAccessBackEnd } = useContext(AppContextAccessBackEnd);
      //permet de requiperer l'identifiant de l'utilisateur ensuite de l'utiliser dans le methode d'ajoute
      const {stateIdUserFromToken, setStateIdUserFromToken} = useContext(AppContextIdUserByToken);

  
     //const idUser = stateIdUserFromToken; 
     //const [userCreate, setUserCreate] = useState(idUser);
     const [superAdmin, setSuperAdmin ] =  useState(false);
     const [admin, setAdmin ] =  useState(false);
     const [activer, setActiver] = useState(false);
     const [createBy, setCreateBy] =  useState("");
     const [updateBy, setUpdateBy] =  useState(idInLocalStorage);
     const [accompagnateur, setAccompagnateur] =  useState(false);
     const [editeurCatalogue, setEditeurCatalogue] =  useState(false);
     const [utilisateur, setUtilisateur] = useState({id:""});
      // États pour les erreurs de validation
     const [erreurUtilisateur, setErreurUtilisateur] = useState("");

      useEffect(() =>{
        if (id) {
        handleGetAccessBackendById(id);
        }
      },[id]);

      const handleGetAccessBackendById = (id) => {
            getAccessBackEndById(id).then(resp => {
                 let accessBackend = resp.data;
                  setActiver(accessBackend.activer);
                  setSuperAdmin(accessBackend.superAdmin);
                  setAdmin(accessBackend.admin);
                  setAccompagnateur(accessBackend.accompagnateur);
                  setCreateBy(accessBackend);
                  setEditeurCatalogue(accessBackend.editeurCatalogue);
                  setUtilisateur(accessBackend.utilisateur || {})
            });
      };

      const handleUpdateAccessBackend = (e) => {
            e.preventDefault();
            //const userCreate = stateIdUserFromToken;
            const validationMessage  = ValidationUtilisateur(utilisateur);
            setErreurUtilisateur(validationMessage);
    
            if(validationMessage ){
              return; // Stop si erreur de validation
            }

            let accessBackend = { id, superAdmin, admin, accompagnateur,editeurCatalogue,utilisateur, updateBy, activer };
              console.log("accessBackend => " + JSON.stringify(accessBackend));
              updateAccessBackEnd(accessBackend).then( res => {
                handleClose();
                  getAllAccessBackEnds()
                    .then( resp => {
                        setStateAccessBackEnd(resp.data);
                    })
                  //alert(res.data)
              });
            
       //console.log("type => " + JSON.stringify(type));
     };

        return(
            <>
            {/* <Header/>
            <SideNav /> */}
             {/* <button onClick={handleShow} className="btn btn-outline-primary">
                <FontAwesomeIcon icon={faEdit}>
                </FontAwesomeIcon>
             </button> */}
             <Link onClick={handleShow} className="dropdown-item text-muted">Modifier</Link>

             <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Modification d'un AccessBackend</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                      <form onSubmit={ handleUpdateAccessBackend } >
                   
                         <div className="form-check">
                            <input className="form-check-input" type="checkbox"
                              checked={superAdmin}
                              onChange={(e) => setSuperAdmin(e.target.checked) } />
                            <label className="form-check-label">
                              Super Admin
                            </label>
                          </div>

                          <div className="form-check">
                            <input className="form-check-input" type="checkbox"
                              checked={admin}
                              onChange={(e) => setAdmin(e.target.checked) } />
                            <label className="form-check-label">
                              Admin
                            </label>
                          </div>

                          <div className="form-check">
                            <input className="form-check-input" type="checkbox"
                              checked={accompagnateur}
                              onChange={(e) => setAccompagnateur(e.target.checked) } />
                            <label className="form-check-label">
                              Accompagnateur
                            </label>
                          </div>

                          <div className="form-check">
                            <input className="form-check-input" type="checkbox"
                              checked={editeurCatalogue}
                              onChange={(e) => setEditeurCatalogue(e.target.checked) } />
                            <label className="form-check-label">
                              Éditeur Catalogue
                            </label>
                          </div>
                           <div className="mb-3 col-md-12">
                            <label className="form-label">Utilisateur<span style={{color: "red"}}>*</span>:</label>
                            <select name="utilisateur" value={utilisateur.id} 
                                onChange={(e) => setUtilisateur({ id : e.target.value })}
                                className="form-control default-select wide" id="inputState">
                            <option selected value="">Choose...</option>
                            {   
                                  users.map(item => (
                                    <option key={item.id} value={item.id}>{item.prenom} {item.nom}</option>
                                ))
                            }
                              </select>
                            {erreurUtilisateur && <span style={{color : "red"}}>{erreurUtilisateur}</span>}
                        </div>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox"
                              checked={activer}
                              onChange={(e) => setActiver(e.target.checked) } />
                            <label className="form-check-label">
                              Activer
                            </label>
                          </div>
                          <br/>
                        
                          <div className="modal-footer">
                              <button type="button" className="btn btn-danger light" onClick={handleClose}>Fermer</button>
                              <button className="btn btn-primary" >Modifier</button>
                          </div>
                        </form>
                </Modal.Body>
              <Modal.Footer>
              </Modal.Footer>
              </Modal>
          {/* <Footer/> */}
           </>
        );
}

export default EditAccessBackend;