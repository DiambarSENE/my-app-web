import React, { useState, useEffect, useContext } from 'react';
import {ValidationName} from '../../validateur/validation';

import {  faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal } from 'react-bootstrap';
import { AppContextIdUserByToken } from '../../useContext/contextStateUser';
import { AppContextFonctionnalite } from '../../useContext/context';
import { getAllFonctionnalites, getFonctionnaliteById, updateFonctionnalite } from '../../servicesApi/microservice-parametre';


function EditFonctionnalite({fonctionnaliteId}) {

      //const {id} = useParams();
      //const typeId = parseInt(id);
      const [show, setShow] = useState(false);
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);

      const { stateFonctionnalite, setStateFonctionnalite } = useContext(AppContextFonctionnalite);
      //permet de requiperer l'identifiant de l'utilisateur ensuite de l'utiliser dans le methode d'ajoute
      const {stateIdUserFromToken, setStateIdUserFromToken} = useContext(AppContextIdUserByToken);

      //const idUser = stateIdUserFromToken;
      //const [userCreate, setUserCreate] = useState(idUser);
      const [nom, setNom ] =  useState("");
      const [description, setDescription] =  useState("");
      const [activer, setActiver] = useState(false);

      useEffect(() =>{
        handleGetFonctionnaliteById(fonctionnaliteId);
      },[]);

      const handleGetFonctionnaliteById = (fonctionnaliteId) => {
            getFonctionnaliteById(fonctionnaliteId).then(resp => {
                 let fonctionnalite = resp.data;
                 setNom(fonctionnalite.nom);
                 setDescription(fonctionnalite.description);
                 setActiver(fonctionnalite.activer);
            });
      };

      const [nameError, setNameError] = useState("");

      const handleUpdateFonctionnalite = (e) => {
            e.preventDefault();
            const userCreate = stateIdUserFromToken;
            const nameError = ValidationName(nom);
            const id = fonctionnaliteId;
            if(!nameError){
                let fonctionnalite = { id, nom, description, userCreate, activer };

                 updateFonctionnalite(fonctionnalite).then( res => {
                    {handleClose();}
                     getAllFonctionnalites()
                        .then( resp => {
                            setStateFonctionnalite(resp.data);
                        })
                     alert(res.data)
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
                  <Modal.Title>Modification d'une Fonctionnalite</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <form onSubmit={ handleUpdateFonctionnalite } >
                          <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">
                              Nom <span style={{color:"red"}}>*</span> :
                                {nameError && <span style={{color:"red"}}>{nameError}</span>}
                            </label>
                            <input name="nom"
                                  type="text"
                                  value={nom}
                                  onChange={(e) => setNom(e.target.value) }
                                  className="form-control" id="exampleFormControlInput1" ></input>
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
                              onChange={(e) => setActiver(e.target.checked) } />
                            <label className="form-check-label" htmlFor="flexCheckChecked">
                              Activer/desactiver
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

export default EditFonctionnalite;