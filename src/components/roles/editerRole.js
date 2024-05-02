import React, { useState, useEffect, useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import { getAllRoles, getRoleById, updateRole} from '../../servicesApi/microservice-utilisateur';
import { AppContextIdUserByToken, AppContextRole } from '../../useContext/contextStateUser';
import { Link } from 'react-router-dom';
import { ValidationName } from '../../validateur/validation';

function EditerRole({roleId}) {
      //const navigate = useNavigate();
      const [show, setShow] = useState(false);
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);
      //recupere la liste des roles
      const { userRoles, setUserRoles  } = useContext(AppContextRole);
      //permet de requiperer l'identifiant de l'utilisateur ensuite de l'utiliser dans le methode d'ajoute
      const {stateIdUserFromToken, setStateIdUserFromToken} = useContext(AppContextIdUserByToken);
      

      const [nom, setNom] = useState("");
      const [description, setDescription] = useState("");
      //ajouter l'identifiant de l'utilisateur dans le role qu'il modifi
      //const idUser = stateIdUserFromToken;
      //const [userId, setUserId] = useState(idUser);
      const [errorNom, setErrorNom] = useState("");


      useEffect(() =>{
           handleGetRoleById(roleId);
      },[]);

      const handleGetRoleById = (roleId) => {
            getRoleById(roleId).then(resp => {
                 let role = resp.data;
                 setNom(role.nom);
                 setDescription(role.description);
                 
            });
      };

      const handleUpdateRole = (e) => {
          e.preventDefault();
          const errorNom = ValidationName(nom);
          const id = roleId;
          const userId = stateIdUserFromToken;
          let role = {id, nom, description, userId};
          if(!errorNom){
            updateRole(role).then(resp =>{
                  {handleClose();}
                  getAllRoles()
                      .then( resp => {
                          setUserRoles(resp.data);
                  }) 
                  alert("Role modifier avec success")
                  
                } )
                .catch(err => {
                  console.log(err)
              });
          }else{
            setErrorNom(errorNom);
          }      
      };
      return(
            <>

             <Link onClick={handleShow} className="dropdown-item" >Modifier</Link>

             <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Modification d'un role</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={ handleUpdateRole }>
                      <div className="row"> 
                          <div className="col-lg-12">
                          <div className="mb-3">
                              <label className="form-label">Nom<span style={{color: "red"}}>*</span> :
                              {errorNom && <span style={ { color: "red"} } >{errorNom}</span>}
                              </label>
                              <input name="nom" type="text" value={nom}
                                onChange={(e) => setNom(e.target.value) } className="form-control" />
                          </div>
                          </div>
                          <div className="col-lg-12">
                          <div className="mb-3">
                              <label className="form-label">Description : </label>
                              <input name="description" type="tel" value={description}
                                  onChange={(e) => setDescription(e.target.value) } className="form-control" />
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
export default EditerRole;