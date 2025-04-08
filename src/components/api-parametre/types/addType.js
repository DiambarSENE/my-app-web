import React, { useState, useContext, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { createType, getTypes } from '../../../servicesApi/microservice-parametre';
import { ValidationName } from '../../../validateur/validation';
import { AppContext } from '../../../useContext/context';
import Header from '../../templates/header';
import Footer from '../../templates/Footer';
import SideNav from '../../templates/SideNav';
import { AppContextIdUserByToken } from '../../../useContext/contextStateUser';

function AddType() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { stateT, setStateT } = useContext(AppContext);
     //permet de requiperer l'identifiant de l'utilisateur ensuite de l'utiliser dans le methode d'ajoute
    const {stateIdUserFromToken, setStateIdUserFromToken} = useContext(AppContextIdUserByToken);


    const [ nom, setNom ] =  useState("");
    const [description, setDescription] = useState("");
    //const idUser = stateIdUserFromToken; 
    // const [createBy, setCreateBy] = useState(idUser);
    const [createBy, setCreateBy] = useState();
    const [activer, setActiver] = useState(false);

    // États pour les erreurs de validation
     const [nomError, setNomError] = useState("");

    
    const saveType = (e) => {
        e.preventDefault();
        const nomError = ValidationName(nom);
        const userCreate = stateIdUserFromToken;
        let type = {  nom,description,createBy,activer };
        if(!nomError){
              createType(type).then( res => {
                  //alert(res.data)
                  setNom("")
                  setDescription("")
                  //setUserCreate("")
                  setActiver(false) 
                  handleClose();
                  getType();
                  // Mise à jour de l'état avec le nouvel élément au début du tableau
                   //setStateT(stateT => [type, ...stateT]);
                  // Fermer le modal après la création du type
                  //const modal = document.getElementById('basicModal');
                  //modal .hide();
              });
        }else{
            setNomError(nomError)
        }
       //console.log("type => " + JSON.stringify(type));
    };

    const getType = () => {
       getTypes()
          .then(resp =>{
              // Récupérer les types du state actuel
            const currentTypes = stateT;

            // Ajouter le dernier élément de la réponse au début du tableau
            const updatedTypes = [resp.data[resp.data.length - 1], ...currentTypes];

            // Mettre à jour le stateT avec le nouveau tableau
            setStateT(updatedTypes);
          })
          .catch(err => {
              console.log(err)
       });

    };

    return(
        <>
        {/* <Header />
        <SideNav /> */}
             <button className="btn btn-primary btn-rounded fs-18" onClick={handleShow}>
                  + Ajouter un Type
             </button>

             <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Ajout d'un nouveau Type</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={ saveType } >
                        <div className="mb-3">
                          <label htmlFor="exampleFormControlInput1" className="form-label">
                            Nom <span style={{color:"red"}}>*</span> :
                            {nomError && <span style={{color:"red"}}>{ nomError }</span> }
                          </label>
                          <input name="nom"
                                type="text"
                                value={nom}
                                onChange={(e) => setNom(e.target.value) }
                                className="form-control" id="exampleFormControlInput1" placeholder="Entrez le nom du type"></input>
                        </div>
                        <div className="mb-3">
                          <label htmlFor="exampleFormControlTextarea1" className="form-label">Description : </label>
                          <textarea name="description"
                                    type="text"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value) } placeholder="Entrez la description"
                                    className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
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
                          <button className="btn btn-primary" >+ Ajouter</button>
                        </div>
                    </form>
                </Modal.Body>
              <Modal.Footer>
              </Modal.Footer>
              </Modal>

   </>
    );
}
export default AddType;