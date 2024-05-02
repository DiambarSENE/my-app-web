import React, { useState, useEffect, useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import { deleteRole, getRoleById} from '../../servicesApi/microservice-utilisateur';
import { AppContextRole } from '../../useContext/contextStateUser';
import { Link } from 'react-router-dom';

function DeleteRole({roleId}) {
      //const navigate = useNavigate();
      const [show, setShow] = useState(false);
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);

      const { userRoles, setUserRoles  } = useContext(AppContextRole);

      const [nom, setNom] = useState("");
      const [description, setDescription] = useState("");
      const [userCreate, setUserCreate] = useState("");

      useEffect(() =>{
           handleGetRoleById(roleId);
      },[]);

      const handleGetRoleById = (roleId) => {
            getRoleById(roleId).then(resp => {
                 let role = resp.data;
                 setNom(role.nom);
                 setDescription(role.description);
                 setUserCreate(role.userCreate);
            });
      };

      const handleDeleteRole = (e) => {
          e.preventDefault();
          deleteRole(roleId).then(resp =>{
                const newRolesList = userRoles.filter((r) => r.id != roleId);
                setUserRoles(newRolesList);
                {handleClose();}

                 alert(resp.data);
                 
                
              } )
              .catch(err => {
                  console.log(err)
                  alert("Vous ne pouvez pas supprimer un role qui est relié a un utilisateur.Supprimez d'abord l'utilisateur en premiere")
              });
      };
      return(
            <>

             <Link onClick={handleShow} className="dropdown-item text-danger" >Supprimer</Link>

             <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Modification d'un role</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={ handleDeleteRole }>
                      <div className="row"> 
                          <div className="col-lg-12">
                          <div className="mb-3">
                              <label className="form-label">Nom :</label>
                              <input name="nom" type="text" value={nom}
                                onChange={(e) => setNom(e.target.value) } className="form-control" disabled/>
                          </div>
                          </div>
                          <div className="col-lg-12">
                          <div className="mb-3">
                              <label className="form-label">Description : </label>
                              <input name="description" type="tel" value={description}
                                  onChange={(e) => setDescription(e.target.value) } className="form-control" disabled/>
                          </div>
                          </div>
                          <div className="col-lg-6">
                          <div className="mb-3">
                              <input name="userCreate"
                                  type="hidden" min="0"
                                value={userCreate}
                                onChange={(e) => setUserCreate(e.target.value) } className="form-control" disabled/>
                          </div>
                        </div>
                        <div className="modal-footer">
                            
                            <button type="button" className="btn btn-danger light" onClick={handleClose}>Fermer</button>
                            <button className="btn btn-primary">- Supprimer</button>
                            
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
export default DeleteRole;