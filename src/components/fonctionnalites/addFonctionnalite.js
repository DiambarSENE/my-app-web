import React, { useState, useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import { ValidationName } from '../../validateur/validation';
import { AppContextIdUserByToken } from '../../useContext/contextStateUser';
import { AppContextFonctionnalite } from '../../useContext/context';
import { createFonctionnalite, getAllFonctionnalites } from '../../servicesApi/microservice-parametre';

function AddFonctionnalite() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { stateFonctionnalite, setStateFonctionnalite } = useContext(AppContextFonctionnalite);
     //permet de requiperer l'identifiant de l'utilisateur ensuite de l'utiliser dans le methode d'ajoute
    const {stateIdUserFromToken, setStateIdUserFromToken} = useContext(AppContextIdUserByToken);


    
    //const idUser = stateIdUserFromToken; 
    //const [userCreate, setUserCreate] = useState(idUser);
    const [ nom, setNom ] =  useState("");
    const [ description, setDescription ] =  useState("");
    const [activer, setActiver] = useState(false);

    // États pour les erreurs de validation
     const [nameError, setNameError] = useState("");

    
    const saveFonctionnalite = (e) => {
        e.preventDefault();
        const userCreate = stateIdUserFromToken;
        const nameError = ValidationName(nom);
        let fonctionnalite = {  nom, description, userCreate, activer };
        if(!nameError){
              createFonctionnalite(fonctionnalite).then( res => {
                  alert(res.data);
                  setNom("");
                  setDescription("");
                 // setUserCreate("");
                  setActiver(false) ;
                  {handleClose();}
                  getFonctionnalite();
                  // Mise à jour de l'état avec le nouvel élément au début du tableau
                   //setStateT(stateT => [type, ...stateT]);
                  // Fermer le modal après la création du type
                  //const modal = document.getElementById('basicModal');
                  //modal .hide();
              });
        }else{
            setNameError(nameError)
        }
       //console.log("type => " + JSON.stringify(type));
    };

    const getFonctionnalite = () => {
      getAllFonctionnalites()
          .then(resp =>{
              // Récupérer les fonctionnalites du state actuel
              const currentFonctionnalites = stateFonctionnalite;

              // Ajouter le dernier élément de la réponse au début du tableau
              const updatedFonctionnalites = [resp.data[resp.data.length - 1], ...currentFonctionnalites];
  
              // Mettre à jour le stateFonctionnalite avec le nouveau tableau
            setStateFonctionnalite(updatedFonctionnalites);
          })
          .catch(err => {
              console.log(err)
       });

    };

    return(
        <>

              <button className="btn btn-primary btn-rounded fs-18" onClick={handleShow}>
                + Ajouter une Fonctionnalité
              </button>
           

             <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Ajout d'une fonctionnalie</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={ saveFonctionnalite } >
                          <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">
                              Nom <span style={{color:"red"}}>*</span> :
                              {nameError && <span style={{color:"red"}}>{ nameError }</span> }
                            </label>
                            <input name="nom"
                                  type="text"
                                  value={nom}
                                  onChange={(e) => setNom(e.target.value) }
                                  className="form-control" id="exampleFormControlInput1" placeholder="Entrez le nom du fonctionnalite"></input>
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
                            <button type="button" className="btn btn-danger light" data-bs-dismiss="modal">Fermer</button>
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
export default AddFonctionnalite;