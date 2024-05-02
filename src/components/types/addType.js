import React, { useState, useContext, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { createType, getTypes } from '../../servicesApi/microservice-parametre';
import { ValidationName } from '../../validateur/validation';
import { AppContext } from '../../useContext/context';
import Header from '../templates/header';
import Footer from '../templates/Footer';
import SideNav from '../templates/SideNav';
import { AppContextIdUserByToken } from '../../useContext/contextStateUser';

function AddType() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { stateT, setStateT } = useContext(AppContext);
     //permet de requiperer l'identifiant de l'utilisateur ensuite de l'utiliser dans le methode d'ajoute
    const {stateIdUserFromToken, setStateIdUserFromToken} = useContext(AppContextIdUserByToken);


    const [ name, setName ] =  useState("");
    const [description, setDescription] = useState("");
    //const idUser = stateIdUserFromToken; 
    //const [userCreate, setUserCreate] = useState(idUser);
    const [activated, setActivated] = useState(false);

    // États pour les erreurs de validation
     const [nameError, setNameError] = useState("");

    
    const saveType = (e) => {
        e.preventDefault();
        const nameError = ValidationName(name);
        const userCreate = stateIdUserFromToken;
        let type = {  name,description,userCreate,activated };
        if(!nameError){
              createType(type).then( res => {
                  alert(res.data)
                  setName("")
                  setDescription("")
                  //setUserCreate("")
                  setActivated(false) 
                  {handleClose();}
                  getType();
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
                            {nameError && <span style={{color:"red"}}>{ nameError }</span> }
                          </label>
                          <input name="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value) }
                                className="form-control" id="exampleFormControlInput1" placeholder="Entrez le nom du type"></input>
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
                            activated={activated}
                            onChange={(e) => setActivated(e.target.checked) } />
                          <label className="form-check-label" htmlFor="flexCheckChecked">
                            Activated
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
 
                    {/* <div className="bootstrap-modal">
           
            <button type="button" className="btn btn-primary btn-rounded fs-18" data-bs-toggle="modal" data-bs-target="#basicModal">+ Ajouter un Type</button>
           
            <div className="modal fade" id="basicModal">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Ajout d'un nouveau Type</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal">
                    </button>
                  </div>
                  <div className="modal-body">
                    <form>

                    </form>
                    
                  </div>
                  
                </div>
              </div>
            </div></div> */}
            {/* <Footer/> */}
   </>
    );
}
export default AddType;