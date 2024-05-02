import React, { useState, useEffect, useContext } from 'react';
import { useNavigate  } from 'react-router-dom';
import {updateType, getTypeById, getTypes} from '../../servicesApi/microservice-parametre';
import {ValidationName} from '../../validateur/validation';

import {  faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal } from 'react-bootstrap';
import Header from '../templates/header';
import Footer from '../templates/Footer';
import SideNav from '../templates/SideNav';
import { AppContext } from '../../useContext/context';
import { AppContextIdUserByToken } from '../../useContext/contextStateUser';


function EditType({typeId}) {

      //const {id} = useParams();
      //const typeId = parseInt(id);
      const [show, setShow] = useState(false);
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);

      const { stateT, setStateT } = useContext(AppContext);
      //permet de requiperer l'identifiant de l'utilisateur ensuite de l'utiliser dans le methode d'ajoute
      const {stateIdUserFromToken, setStateIdUserFromToken} = useContext(AppContextIdUserByToken);

      const [name, setName ] =  useState("");
      const [description, setDescription] = useState("");
      //const idUser = stateIdUserFromToken;
      //const [userCreate, setUserCreate] = useState(idUser);
      const [activated, setActivated] = useState(false);

      useEffect(() =>{
        handleGetTypeById(typeId);
      },[]);

      const handleGetTypeById = (typeId) => {
            getTypeById(typeId).then(resp => {
                 let type = resp.data;
                 setName(type.name);
                 setDescription(type.description);
                 setActivated(type.activated);
            });
      };

      const [nameError, setNameError] = useState("");

      const handleUpdateType = (e) => {
            e.preventDefault();
            const userCreate = stateIdUserFromToken;
            const nameError = ValidationName(name);
            if(!nameError){
                let type = { typeId, name,description,userCreate,activated };

                 updateType(type).then( res => {
                    {handleClose();}
                     getTypes()
                        .then( resp => {
                            setStateT(resp.data);
                        })
                     alert(res.data)
                     //navigate("/listtype")
                 });
            }else{
                setNameError(nameError)
            }
       //console.log("type => " + JSON.stringify(type));
     };

        return(
            <>
            {/* <Header/>
            <SideNav /> */}
             <button onClick={handleShow} className="btn btn-outline-primary">
                <FontAwesomeIcon icon={faEdit}>
                </FontAwesomeIcon>
             </button>

             <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Modification d'un Type</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <form onSubmit={ handleUpdateType } >
                          <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">
                              Nom <span style={{color:"red"}}>*</span> :
                                {nameError && <span style={{color:"red"}}>{nameError}</span>}
                            </label>
                            <input name="name"
                                  type="text"
                                  value={name}
                                  onChange={(e) => setName(e.target.value) }
                                  className="form-control" id="exampleFormControlInput1" placeholder="le nom du type"></input>
                          </div>
                          <div className="mb-3">
                            <label htmlFor="exampleFormControlTextarea1" className="form-label">Description :</label>
                            <textarea name="description"
                                      type="text"
                                      value={description}
                                      onChange={(e) => setDescription(e.target.value) }
                                      className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                          </div>

                          <div className="form-check">
                            <input className="form-check-input" type="checkbox"
                              activated={activated}
                              onChange={(e) => setActivated(e.target.checked) } />
                            <label className="form-check-label" htmlFor="flexCheckChecked">
                              Activated
                            </label>
                          </div>
                          <br/>
                          <div style={{color:"red"}}>Les champs qui ont (*) sont obligatoires</div>

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

export default EditType;