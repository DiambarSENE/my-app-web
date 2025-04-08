import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import {  faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from 'react-bootstrap/Modal';
import { ValidationEntreprise, ValidationUtilisateur } from '../../../validateur/validation';

import { AppContext } from '../../../useContext/context';
import { AppContextAccessEntreprise, AppContextEntreprise,  useUsers } from '../../../useContext/contextStateUser';
import { getAccessEntrepriseById, updateAccessEntreprise, getIdInLocalStorage, getAllAccessEntreprises } from '../../../servicesApi/microservice-utilisateur';

function EditAccessEntreprise({id}) {
   //permet de requiperer l'identifiant de l'utilisateur ensuite de l'utiliser dans le methode d'ajoute
   const idInLocalStorage = getIdInLocalStorage();

      const [show, setShow] = useState(false);
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);
            
      const { setStateAccessEntreprise } = useContext(AppContextAccessEntreprise);
  
      //const {id} = useParams();
      //const id = parseInt(id);
      const navigate = useNavigate();

      //const { stateUtilisateur, setStateUtilisateur} = useContext(AppContextUtilisateur);
      const { users } = useUsers(); // ✅ Récupérer la liste des utilisateurs
      const { stateEntreprise} = useContext(AppContextEntreprise);

    
        const [admin, setAdmin ] = useState(false);
        const [proprietaire, setProprietaire] = useState(false);
        const [gerant, setGerant] = useState(false);
        const [gestionnaire, setGestionnaire] = useState(false);
        const [caissier, setCaissier] = useState(false);
        const [vendeur, setVendeur] = useState(false);
        const [eCommerce, setECommerce] = useState(false);
        const [activer, setActiver] = useState(false);
        const [updateBy, setUpdateBy] =  useState(idInLocalStorage);
        const [utilisateurDto, setUtilisateurDto] =  useState({id:""});
        const [entrepriseDto, setEntrepriseDto] =  useState({id:""});

        // États pour les erreurs de validation
         const [erreurUtilisateur, setErreurUtilisateur] = useState("");
         const [erreurEntreprise, setErreurEntreprise] = useState("");

      useEffect( () => {
         if (id) {
         handleGetAccessEntrepriseById(id);
         }
      }, [id]);
      
      const handleGetAccessEntrepriseById = (id) => {
        getAccessEntrepriseById(id).then( resp => {
            let accessEntreprise = resp.data;
            setAdmin(accessEntreprise.admin);
    
            setProprietaire(accessEntreprise.proprietaire);
            setGerant(accessEntreprise.gerant);
            setGestionnaire(accessEntreprise.gestionnaire);
            setCaissier(accessEntreprise.caissier);
            setVendeur(accessEntreprise.activer);
            setECommerce(accessEntreprise.eCommerce);
            setActiver(accessEntreprise.activer);
            setUpdateBy(accessEntreprise.updateBy);
            setUtilisateurDto(accessEntreprise.utilisateurDto || {});
            setEntrepriseDto(accessEntreprise.entrepriseDto || {});
            setActiver(accessEntreprise.activer);

        });
      }

      const idAcces = id;
      const handleUpdateAccessEntreprise = (e) => {
        e.preventDefault();

        const validationUtilisateur  = ValidationUtilisateur(utilisateurDto);
         const validationEntreprise = ValidationEntreprise(entrepriseDto);
         setErreurUtilisateur(validationUtilisateur);
         setErreurEntreprise(validationEntreprise);

         if(validationUtilisateur || validationEntreprise){
            return; // Stop si erreur de validation
         }

        let accessEntreprise = {id, admin, proprietaire, gerant, gestionnaire, caissier, vendeur,eCommerce,utilisateurDto,entrepriseDto, updateBy, activer };
        // if(!nameError && !typesError){
          updateAccessEntreprise(accessEntreprise).then( resp =>{
            //navigate("/listAccessEntreprise")
            handleClose();
            // alert("accessEntreprise modifier avec success");
            getAllAccessEntreprises()
              .then( resp => {
                setStateAccessEntreprise(resp.data);
            })
            
           //j'ai utilise ici ce methode juste pour la mise a jour du tableux c'est a dire afficher les donnees modifiees sans reflechir la page
            // getAccessEntrepriseById(idAcces)
            // .then( resp => {
            //     setStateAccessEntreprise(resp.data);
            // })
            //   .catch((err) => {
            //     console.log(err)
            //   });
          });
        
      };



        return(
            <>
            {/* <Header />
            <SideNav /> */}
              {/* <button onClick={handleShow} className="btn btn-outline-primary">
                <FontAwesomeIcon icon={faEdit}>
                </FontAwesomeIcon>
             </button> */}
             <Link onClick={handleShow} className="dropdown-item text-muted">
               Modifier
            </Link>

             <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Modification d'un AccessEntreprise</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form onSubmit={ handleUpdateAccessEntreprise } >
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
                     
                     <br/>
                     {/* <div style={{color:"red"}}>Les champs qui ont (*) sont obligatoires</div> */}
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

export default EditAccessEntreprise;