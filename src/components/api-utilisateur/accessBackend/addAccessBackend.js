import React, { useState, useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import { AppContextParam } from '../../../useContext/context';
import { AppContextAccessBackEnd, AppContextIdUserByToken, AppContextUtilisateur, useUsers } from '../../../useContext/contextStateUser';
import { createAccessBackEnd, getAllAccessBackEnds, getIdInLocalStorage } from '../../../servicesApi/microservice-utilisateur';
import { ValidationName, ValidationUtilisateur } from '../../../validateur/validation';

function AddAccessBackend() {
  const idInLocalStorage = getIdInLocalStorage();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    // { stateUtilisateur, setStateUtilisateur} = useContext(AppContextUtilisateur);
    const { users, setUsers } = useUsers(); // ✅ Récupérer la liste des utilisateurs

    const {stateParametre, setStateParametre } = useContext(AppContextParam)
    const { stateAccessBackEnd, setStateAccessBackEnd } = useContext(AppContextAccessBackEnd);
     //permet de requiperer l'identifiant de l'utilisateur ensuite de l'utiliser dans le methode d'ajoute
    const {stateIdUserFromToken, setStateIdUserFromToken} = useContext(AppContextIdUserByToken);  
    
    //const idUser = stateIdUserFromToken; 
    //const [userCreate, setUserCreate] = useState(idUser);
    const [superAdmin, setSuperAdmin ] =  useState(false);
    const [admin, setAdmin ] =  useState(false);
    const [activer, setActiver] = useState(false);
    const [createBy, setCreateBy] =  useState(idInLocalStorage);
    const [accompagnateur, setAccompagnateur] =  useState(false);
    const [editeurCatalogue, setEditeurCatalogue] =  useState(false);
    const [utilisateur, setUtilisateur] = useState({ id:"" });
    // États pour les erreurs de validation
    const [erreurUtilisateur, setErreurUtilisateur] = useState("");

    
    const saveAccessBackend = (e) => {
        e.preventDefault();
        const createBy = stateIdUserFromToken;
        const validationMessage  = ValidationUtilisateur(utilisateur);
        setErreurUtilisateur(validationMessage);

        if(validationMessage ){
          return; // Stop si erreur de validation
        }

        let accessBackend = {  superAdmin, admin, accompagnateur,editeurCatalogue,utilisateur, createBy, activer };
        
        createAccessBackEnd(accessBackend).then( res => {
            //alert(res.data);
            setSuperAdmin(false);
            setAdmin(false);
            setAccompagnateur(false);
            setCreateBy(false);
            setEditeurCatalogue(false);
            setActiver(false) ;
            //utilisateur("");

            handleClose();

            getAccessBackend();
            // Mise à jour de l'état avec le nouvel élément au début du tableau
              //setStateT(stateT => [type, ...stateT]);
            // Fermer le modal après la création du type
            //const modal = document.getElementById('basicModal');
            //modal .hide();
        });
  
       //console.log("type => " + JSON.stringify(type));
    };

    const getAccessBackend = () => {
      getAllAccessBackEnds()
          .then(resp =>{
              // Récupérer les accessBackends du state actuel
              const currentAccessBackEnd = stateAccessBackEnd;

              // Ajouter le dernier élément de la réponse au début du tableau
              const updatedAccessBackends = [resp.data[resp.data.length - 1], ...currentAccessBackEnd];
  
              // Mettre à jour le stateAccessBackend avec le nouveau tableau
            setStateAccessBackEnd(updatedAccessBackends);
          })
          .catch(err => {
              console.log(err)
       });

    };

    return(
        <>

              <button className="btn btn-primary btn-rounded fs-18" onClick={handleShow}>
                + Ajouter un accessBackend
              </button>
           

             <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Ajout d'un accessBackend</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={ saveAccessBackend } >
                    <div className="form-check">
                            <input className="form-check-input" type="checkbox"
                              checked={superAdmin}
                              onChange={(e) => setSuperAdmin(e.target.checked) } />
                            <label className="form-check-label" htmlFor="flexCheckChecked">
                            superAdmin
                            </label>
                          </div>

                          <div className="form-check">
                            <input className="form-check-input" type="checkbox"
                              checked={admin}
                              onChange={(e) => setAdmin(e.target.checked) } />
                            <label className="form-check-label" htmlFor="flexCheckChecked">
                            admin
                            </label>
                          </div>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox"
                              checked={accompagnateur}
                              onChange={(e) => setAccompagnateur(e.target.checked) } />
                            <label className="form-check-label" htmlFor="flexCheckChecked">
                            accompagnateur
                            </label>
                          </div>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox"
                              checked={editeurCatalogue}
                              onChange={(e) => setEditeurCatalogue(e.target.checked) } />
                            <label className="form-check-label" htmlFor="flexCheckChecked">
                            editeurCatalogue
                            </label>
                          </div>
                          <div className="mb-3 col-md-12">
                                  <label className="form-label">Utilisateur<span style={{color: "red"}}>*</span>:</label>
                                  <select name="utilisateur" value={utilisateur.id} 
                                      onChange={(e) => setUtilisateur({id : e.target.value})}
                                      className="form-control default-select wide" id="inputState">
                                  <option selected value="">Choose...</option>
                                  {   
                                        users.map(item => (
                                          <option key={item.id} value={item.id}>{item.prenom} {item.nom}</option>
                                      ))
                                  }
                                    </select>
                                   {erreurUtilisateur && <span style={{color : "red"}}>{erreurUtilisateur}</span>}
                              </div>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox"
                              checked={activer}
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
export default AddAccessBackend;