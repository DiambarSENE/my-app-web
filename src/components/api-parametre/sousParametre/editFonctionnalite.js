import React, { useState, useEffect, useContext } from 'react';
import {ValidationName} from '../../../validateur/validation';

import {  faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal } from 'react-bootstrap';
import { AppContextIdUserByToken } from '../../../useContext/contextStateUser';
import { AppContextParam, AppContextSousParametre } from '../../../useContext/context';
import { getAllSousParametres, getSousParametreById, updateSousParametre } from '../../../servicesApi/microservice-parametre';


function EditSousParametre({id}) {

      //const {id} = useParams();
      //const typeId = parseInt(id);
      const [show, setShow] = useState(false);
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);

      const {stateParametre, setStateParametre } = useContext(AppContextParam)
      const { stateSousParametre, setStateSousParametre } = useContext(AppContextSousParametre);
      //permet de requiperer l'identifiant de l'utilisateur ensuite de l'utiliser dans le methode d'ajoute
      const {stateIdUserFromToken, setStateIdUserFromToken} = useContext(AppContextIdUserByToken);

      //const idUser = stateIdUserFromToken;
      //const [userCreate, setUserCreate] = useState(idUser);
      const [nom, setNom ] =  useState("");
      const [description, setDescription] =  useState("");
      const [activer, setActiver] = useState(false);
      const [updateBy, setUpdateBy] =  useState("");
      const [parametre, setParametre] =  useState({id : ""});

      useEffect(() =>{
        handleGetSousParametreById(id);
      },[]);

      const handleGetSousParametreById = (id) => {
            getSousParametreById(id).then(resp => {
                 let sousParametre = resp.data;
                 setNom(sousParametre.nom);
                 setDescription(sousParametre.description);
                 setActiver(sousParametre.activer);

            });
      };

      const [nameError, setNameError] = useState("");

      const handleUpdateSousParametre = (e) => {
            e.preventDefault();
            const userCreate = stateIdUserFromToken;
            const nameError = ValidationName(nom);
            if(!nameError){
                let sousParametre = { id, nom, description, parametre, updateBy, activer };

                 updateSousParametre(sousParametre).then( res => {
                    handleClose();
                     getAllSousParametres()
                        .then( resp => {
                            setStateSousParametre(resp.data);
                        })
                     //alert(res.data)
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
                  <Modal.Title>Modification d'une SousParametre</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <form onSubmit={ handleUpdateSousParametre } >
                          <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">
                              Nom <span style={{color:"red"}}>*</span> :
                                {nameError && <span style={{color:"red"}}>{nameError}</span>}
                            </label>
                            <input name="nom"
                                  type="text"
                                  value={nom}
                                  onChange={(e) => setNom(e.target.value) }  placeholder="Entrez le nom"
                                  className="form-control" id="exampleFormControlInput1" ></input>
                          </div>
                          <div className="mb-3">
                          <label htmlFor="exampleFormControlTextarea1" className="form-label">Description : </label>
                          <textarea name="description"
                                    type="text"
                                    value={description} placeholder="Entrez la description"
                                    onChange={(e) => setDescription(e.target.value) }
                                    className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>
                        <div className="mb-3">
                              <label htmlFor="exampleFormControlTextarea1" className="form-label">
                                 Parametre <span style={{color:"red"}}>*</span> :
                                 {/* {parametreError && <span style={{color:"red"}}>{ parametreError }</span> } */}
                              </label>
                              <select name="parametre" type="text" value={parametre.id}
                                 onChange={(e) => setParametre({id : e.target.value}) }
                                 className="form-control" id="exampleFormControlTextarea1" >
                                    <option value="">Sélectionnez un parametre</option>
                                    { stateParametre.map( item =>
                                       <option  value={item.id} key={item.id}>{item.nom}</option>
                                    )}

                              </select>
                        </div>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox"
                              activer={activer}
                              onChange={(e) => setActiver(e.target.checked) } />
                            <label className="form-check-label" htmlFor="flexCheckChecked">
                              Activer
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

export default EditSousParametre;