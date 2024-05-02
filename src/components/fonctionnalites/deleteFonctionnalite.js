import React, { useState, useEffect, useContext } from 'react';
import {  faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from 'react-bootstrap/Modal';
import { AppContextFonctionnalite } from '../../useContext/context';
import { deleteFonctionnalite, getFonctionnaliteById } from '../../servicesApi/microservice-parametre';

function DeleteFonctionnalite({fonctionnaliteId}) {
      //const navigate = useNavigate();
      const [show, setShow] = useState(false);
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);

      const { stateFonctionnalite, setStateFonctionnalite } = useContext(AppContextFonctionnalite);

      const [nom, setNom ] =  useState("");
      const [description, setDescription] = useState("");
      const [userCreate, setUserCreate] = useState("");
      const [activer, setActiver] = useState(false);

      useEffect(() =>{
           handleGetFonctionnaliteById(fonctionnaliteId);
      },[]);

      const handleGetFonctionnaliteById = (fonctionnaliteId) => {
            getFonctionnaliteById(fonctionnaliteId).then(resp => {
                 let fonctionnalite = resp.data;
                 setNom(fonctionnalite.nom);
                 setDescription(fonctionnalite.description);
                 setUserCreate(fonctionnalite.userCreate);
                 setActiver(fonctionnalite.activer);
            });
      };

      const handleDeleteFonctionnalite = (e) => {
          e.preventDefault();

          deleteFonctionnalite(fonctionnaliteId)
              .then(resp =>{
                const newFonctionnalites = stateFonctionnalite.filter((f) => f.id !== fonctionnaliteId);
                setStateFonctionnalite(newFonctionnalites);
                alert(resp.data);
                {handleClose();}
              } )
              .catch(err => {
                console.log(err)
            });
      };
      return(
            <>
            {/* <Header />
            <SideNav/> */}
             <button onClick={handleShow} className="btn btn-outline-danger">
                <FontAwesomeIcon icon={faTrash}>
                </FontAwesomeIcon>
             </button>

             <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Confirmation de la Suppression</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <form>
                          <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Nom :</label>
                            <input name="name"
                                    type="text"
                                    value={nom}
                                    onChange={(e) => setNom(e.target.value) }
                                    className="form-control" id="exampleFormControlInput1"  disabled></input>
                          </div>
                          <div className="mb-3">
                          <label htmlFor="exampleFormControlTextarea1" className="form-label">Description : </label>
                          <textarea name="description"
                                    type="text"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value) }
                                    className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox"
                                activated={activer}
                                onChange={(e) => setActiver(e.target.checked) } disabled/>
                            <label className="form-check-label" htmlFor="flexCheckChecked">
                              Activer/desactiver
                            </label>
                          </div>
                            <div className="modal-footer">
                              <button type="button" className="btn btn-danger light" onClick={handleClose}>Fermer</button>
                              <button className="btn btn-primary" onClick={ handleDeleteFonctionnalite } >- Supprimer</button>
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
export default DeleteFonctionnalite;