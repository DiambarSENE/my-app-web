import React, { useState, useEffect, useContext } from 'react';
import { deleteType, getTypeById} from '../../servicesApi/microservice-parametre';
import {  faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Header from '../templates/header';
import Footer from '../templates/Footer';
import SideNav from '../templates/SideNav';
import { AppContext } from '../../useContext/context';

function DeleteType({typeId}) {
      //const navigate = useNavigate();
      const [show, setShow] = useState(false);
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);

      const { stateT, setStateT } = useContext(AppContext);

      const [name, setName ] =  useState("");
      const [description, setDescription] = useState("");
      const [userCreate, setUserCreate] = useState("");
      const [activated, setActivated] = useState(false);

      useEffect(() =>{
           handleGetTypeById(typeId);
      },[]);

      const handleGetTypeById = (typeId) => {
            getTypeById(typeId).then(resp => {
                 let type = resp.data;
                 setName(type.name);
                 setDescription(type.description);
                 setUserCreate(type.userCreate);
                 setActivated(type.activated);
            });
      };

      const handleDeleteType = (e) => {
          e.preventDefault();

          deleteType(typeId)
              .then(resp =>{
                const newTypes = stateT.filter((t) => t.typeId !== typeId);
                setStateT(newTypes);
                alert(resp.data);
                {handleClose();}
              } )
              .catch(err => {
                console.log(err)
                alert("Vous ne pouvez pas supprimer un type qui est relié avec un parametre.Supprimez d'abord le parametre en premiere")

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
                                    value={name}
                                    onChange={(e) => setName(e.target.value) }
                                    className="form-control" id="exampleFormControlInput1" placeholder="le nom du type" disabled></input>
                          </div>
                          <div className="mb-3">
                            <label htmlFor="exampleFormControlTextarea1" className="form-label">Description :</label>
                            <textarea name="description"
                                      type="text"
                                      value={description}
                                      onChange={(e) => setDescription(e.target.value) }
                                      className="form-control" id="exampleFormControlTextarea1" rows="3" disabled></textarea>
                          </div>
                          <div className="mb-3">
                              <input name="userCreate"
                                      type="hidden" min="0"
                                      value={userCreate}
                                      onChange={(e) => setUserCreate(e.target.value) }
                                      className="form-control" id="exampleFormControlInput1" placeholder="userCreate" disabled/>
                            </div>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox"
                                activated={activated}
                                onChange={(e) => setActivated(e.target.checked) } disabled/>
                            <label className="form-check-label" htmlFor="flexCheckChecked">
                              Activated
                            </label>
                          </div>
                            <div className="modal-footer">
                              <button type="button" className="btn btn-danger light" onClick={handleClose}>Fermer</button>
                              <button className="btn btn-primary" onClick={ handleDeleteType } >- Supprimer</button>
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
export default DeleteType;