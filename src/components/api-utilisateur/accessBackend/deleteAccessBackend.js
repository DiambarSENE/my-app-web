import React, { useState, useEffect, useContext } from 'react';
import {  faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from 'react-bootstrap/Modal';
import { AppContextAccessBackEnd } from '../../../useContext/contextStateUser';
import { deleteAccessBackEnd, getAccessBackEndById } from '../../../servicesApi/microservice-utilisateur';
import { Link } from 'react-router-dom';

function DeleteAccessBackend({id}) {
      //const navigate = useNavigate();
      const [show, setShow] = useState(false);
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);

      const { stateAccessBackEnd, setStateAccessBackEnd } = useContext(AppContextAccessBackEnd);

      const [superAdmin, setSuperAdmin ] =  useState(false);
      const [admin, setAdmin ] =  useState(false);
      const [activer, setActiver] = useState(false);
      const [createBy, setCreateBy] =  useState("");
      const [accompagnateur, setAccompagnateur] =  useState(false);
      const [editeurCatalogue, setEditeurCatalogue] =  useState(false);

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
            });
      };

      const handleDeleteAccessBackend = (e) => {
          e.preventDefault();
          if (!id) {
            alert("Access backend introuvable.");
            return;
        }

          deleteAccessBackEnd(id)
              .then(resp =>{
                const newAccessBackends = stateAccessBackEnd.filter((f) => f.id !== id);
                setStateAccessBackEnd(newAccessBackends);
                //alert(resp.data);
                handleClose();
              } )
              .catch(err => {
                console.log(err)
            });
      };
      return(
            <>
            {/* <Header />
            <SideNav/> */}
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
                              <button className="btn btn-primary" onClick={ handleDeleteAccessBackend } >- Supprimer</button>
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
export default DeleteAccessBackend;