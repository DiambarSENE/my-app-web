import React, { useState, useContext } from 'react';
import { ValidationEntreprise, ValidationName, ValidationTypes, ValidationUtilisateur } from '../../../validateur/validation';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Header from '../../templates/header';
import Footer from '../../templates/Footer';
import SideNav from '../../templates/SideNav';
import { AppContextAccessEntreprise, AppContextEntreprise, AppContextIdUserByToken, AppContextUtilisateur, useUsers } from '../../../useContext/contextStateUser';
import { AppContext } from '../../../useContext/context';
import { createAccessEntreprise, getAccessEntrepriseById, getAllAccessEntreprises, getIdInLocalStorage } from '../../../servicesApi/microservice-utilisateur';


function AddAccessEntreprise() {
   const idInLocalStorage = getIdInLocalStorage();

      //const navigate = useNavigate();
      const [show, setShow] = useState(false);
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);
      //const { stateUtilisateur, setStateUtilisateur} = useContext(AppContextUtilisateur);
      const { users, setUsers } = useUsers(); // ✅ Récupérer la liste des utilisateurs
      
      const { stateEntreprise, setStateEntreprise} = useContext(AppContextEntreprise);
      
      //permet de requiperer l'identifiant de l'utilisateur ensuite de l'utiliser dans le methode d'ajoute
      const {stateIdUserFromToken, setStateIdUserFromToken} = useContext(AppContextIdUserByToken);
      const { stateAccessEntreprise, setStateAccessEntreprise } = useContext(AppContextAccessEntreprise);
   //   const {stateAccessEntreprise, setStateAccessEntreprise } = useContext(AppContextParam)
     const { stateT, setStateT } = useContext(AppContext);


   const [admin, setAdmin ] =  useState(false);
   const [proprietaire, setProprietaire] =  useState(false);
   const [gerant, setGerant] =  useState(false);
   const [gestionnaire, setGestionnaire] =  useState(false);
   const [caissier, setCaissier] =  useState(false);
   const [vendeur, setVendeur] =  useState(false);
   const [eCommerce, setECommerce] =  useState(false);
   const [activer, setActiver] = useState(false);
   const [createBy, setCreateBy] =  useState(idInLocalStorage);
   const [utilisateurDto, setUtilisateurDto] =  useState({id:""});
   const [entrepriseDto, setEntrepriseDto] =  useState({id:""});
 
   // États pour les erreurs de validation
   const [erreurUtilisateur, setErreurUtilisateur] = useState("");
   const [erreurEntreprise, setErreurEntreprise] = useState("");

     //const userId = stateIdUserFromToken;
     //const [createBy, setCreateBy] = useState(userId);
 


     const handleSaveAccessEntreprise = (e) => {
        e.preventDefault();
        //const createBy = stateIdUserFromToken;
    
        const validationUtilisateur  = ValidationUtilisateur(utilisateurDto);
        const validationEntreprise = ValidationEntreprise(entrepriseDto);
        setErreurUtilisateur(validationUtilisateur);
        setErreurEntreprise(validationEntreprise);

         if(validationUtilisateur || validationEntreprise){
            return; // Stop si erreur de validation
         }

        let accessEntreprise = { admin, proprietaire, gerant, gestionnaire, caissier, vendeur,eCommerce,utilisateurDto,entrepriseDto, createBy, activer };
        console.log("access entreprise => " + JSON.stringify(accessEntreprise)); 
         createAccessEntreprise(accessEntreprise).then( resp => {
         handleClose();
        setAdmin(false);
        setProprietaire(false);
        setGerant(false);
        setGestionnaire(false);
        setCaissier(false);
        setVendeur(false);
        setECommerce(false);
        setCreateBy("");
        setUtilisateurDto("");
        setEntrepriseDto("");
        setActiver(false);
            
        getAccessEntreprise();
         
      }).catch(error => {
         console.log(error);
      })
        
     };

   //   const getAccessEntreprise = () => {
   //       getAccessEntreprises()
   //          .then(resp => {
   //             setStateAccessEntreprise(resp.data)
   //       })
   //       .catch(err=>{
   //          console.log(err)
   //       })
   //   };
   // const getAccessEntreprise = () => {
   //    getAccessEntrepriseByName(nom).then(response => {
   //       getAccessEntrepriseById(response.data.type.typeId).then(resp => {

   //           const currentStateAccessEntrepriseByType = stateAccessEntreprise;
   //           const updatedAccessEntrepriseByType = [resp.data[resp.data.length - 1], ...currentStateAccessEntrepriseByType];
   //          //setStateAccessEntreprise(resp.data);
   //            setStateAccessEntreprise(updatedAccessEntrepriseByType)
   //       }).catch(error => {
   //          console.log(error)
   //       })
   //    });
        
   //   };
    const getAccessEntreprise = () => {
          getAllAccessEntreprises()
             .then(resp =>{
                 // Récupérer les stateAccessEntreprises du state actuel
               const currentAccessEntreprise = stateAccessEntreprise;
   
               // Ajouter le dernier élément de la réponse au début du tableau
               const updatedAccessEntreprise = [resp.data[resp.data.length - 1], ...currentAccessEntreprise];
   
               // Mettre à jour le stateAccessEntreprise avec le nouveau tableau
               setStateAccessEntreprise(updatedAccessEntreprise);
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
               + Ajout dun AccessEntreprise
            </button>
            {/* <Button variant="primary" onClick={handleShow}>
               + Ajout dun AccessEntreprise
            </Button> */}
            <Modal show={show} onHide={handleClose}>
               <Modal.Header closeButton>
                  <Modal.Title>Ajout d'un nouveau accessEntreprise</Modal.Title>
               </Modal.Header>
               <Modal.Body>
                     <form onSubmit={ handleSaveAccessEntreprise } >
                        <div className="form-check">
                           <input className="form-check-input" type="checkbox" checked={admin}
                              onChange={(e) => setAdmin(e.target.checked) } />
                           <label className="form-check-label" htmlFor="flexCheckChecked">
                           admin
                           </label>
                        </div>
                        <div className="form-check">
                           <input className="form-check-input" type="checkbox" checked={proprietaire}
                              onChange={(e) => setProprietaire(e.target.checked) } />
                           <label className="form-check-label" htmlFor="flexCheckChecked">
                           proprietaire
                           </label>
                        </div>
                        <div className="form-check">
                           <input className="form-check-input" type="checkbox" checked={gerant}
                              onChange={(e) => setGerant(e.target.checked) } />
                           <label className="form-check-label" htmlFor="flexCheckChecked">
                           gerant
                           </label>
                        </div>
                        <div className="form-check">
                           <input className="form-check-input" type="checkbox" checked={gestionnaire}
                              onChange={(e) => setGestionnaire(e.target.checked) } />
                           <label className="form-check-label" htmlFor="flexCheckChecked">
                           gestionnaire
                           </label>
                        </div>
                        <div className="form-check">
                           <input className="form-check-input" type="checkbox" checked={caissier}
                              onChange={(e) => setCaissier(e.target.checked) } />
                           <label className="form-check-label" htmlFor="flexCheckChecked">
                           caissier
                           </label>
                        </div>
                        <div className="form-check">
                           <input className="form-check-input" type="checkbox" checked={vendeur}
                              onChange={(e) => setVendeur(e.target.checked) } />
                           <label className="form-check-label" htmlFor="flexCheckChecked">
                              vendeur
                           </label>
                        </div>
                        <div className="form-check">
                           <input className="form-check-input" type="checkbox" checked={eCommerce}
                              onChange={(e) => setECommerce(e.target.checked) } />
                           <label className="form-check-label" htmlFor="flexCheckChecked">
                           eCommerce
                           </label>
                        </div>
                         <div className="mb-3 col-md-12">
                           <label className="form-label">utilisateur<span style={{color: "red"}}>*</span>:</label>
                           <select name="utilisateurDto" value={utilisateurDto.id} 
                                 onChange={(e) => setUtilisateurDto({id:e.target.value})}
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
                        <div className="mb-3 col-md-12">
                           <label className="form-label">entreprise<span style={{color: "red"}}>*</span>:</label>
                           <select name="entrepriseDto" value={entrepriseDto.id} 
                                 onChange={(e) => setEntrepriseDto({id:e.target.value})}
                                 className="form-control default-select wide" id="inputState">
                           <option selected value="">Choose...</option>
                           {   
                                 stateEntreprise.map(item => (
                                    <option key={item.id} value={item.id}>{item.nom}</option>
                                 ))
                           }
                              </select>
                              {erreurEntreprise && <span style={{color : "red"}}>{erreurEntreprise}</span>}
                        </div>
                        <div className="form-check">
                           <input className="form-check-input" type="checkbox" checked={activer}
                              onChange={(e) => setActiver(e.target.checked) } />
                           <label className="form-check-label" htmlFor="flexCheckChecked">
                              Activer
                           </label>
                        </div>
                        <br/>
                        {/* <div style={{color:"red"}}>Les champs qui ont (*) sont obligatoires</div> */}
                        <div className="modal-footer">
                              <Button variant="secondary" onClick={handleClose}> Fermer </Button>
                              <button className="btn btn-primary">+ Ajouter</button>
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

export default AddAccessEntreprise;