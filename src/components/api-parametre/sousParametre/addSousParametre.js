import React, { useState, useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import { ValidationName } from '../../../validateur/validation';
import { AppContextIdUserByToken } from '../../../useContext/contextStateUser';
import { createSousParametre, getAllSousParametres } from '../../../servicesApi/microservice-parametre';
import { AppContextParam, AppContextSousParametre } from '../../../useContext/context';

function AddSousParametre() {
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
    const [description, setDescription ] =  useState("");
    const [activer, setActiver] = useState(false);
    const [createBy, setCreateBy] =  useState("");
    const [parametre, setParametre] =  useState({id : ""});

    // États pour les erreurs de validation
     const [nameError, setNameError] = useState("");

    
    const saveSousParametre = (e) => {
        e.preventDefault();
        const userCreate = stateIdUserFromToken;
        const nameError = ValidationName(nom);
        let sousParametre = {  nom, description, parametre,createBy, activer };
        if(!nameError){
              createSousParametre(sousParametre).then( res => {
                  //alert(res.data);
                  setNom("");
                  setDescription("");
                  setCreateBy("");
                  setParametre("");
                  setActiver(false) ;
                  handleClose();
                  getSousParametre();
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

    const getSousParametre = () => {
      getAllSousParametres()
          .then(resp =>{
              // Récupérer les sousParametres du state actuel
              const currentSousParametres = stateSousParametre;

              // Ajouter le dernier élément de la réponse au début du tableau
              const updatedSousParametres = [resp.data[resp.data.length - 1], ...currentSousParametres];
  
              // Mettre à jour le stateSousParametre avec le nouveau tableau
            setStateSousParametre(updatedSousParametres);
          })
          .catch(err => {
              console.log(err)
       });

    };

    return(
        <>

              <button className="btn btn-primary btn-rounded fs-18" onClick={handleShow}>
                + Ajouter un sous parametre
              </button>
           

             <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Ajout d'un sous parametre</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={ saveSousParametre } >
                          <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">
                              Nom <span style={{color:"red"}}>*</span> :
                              {nameError && <span style={{color:"red"}}>{ nameError }</span> }
                            </label>
                            <input name="nom"
                                  type="text"
                                  value={nom}
                                  onChange={(e) => setNom(e.target.value) }
                                  className="form-control" id="exampleFormControlInput1" placeholder="Entrez le nom"></input>
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
export default AddSousParametre;