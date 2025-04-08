import React, { useState, useContext, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Header from '../../templates/header';
import Footer from '../../templates/Footer';
import SideNav from '../../templates/SideNav';
import { AppContextAccessEntreprise, AppContextEntreprise, AppContextUtilisateur, useUsers } from '../../../useContext/contextStateUser';
import { deleteAccessEntrepriseById, getAccessEntrepriseById } from '../../../servicesApi/microservice-utilisateur';
import { Link } from 'react-router-dom';

function DeleteAccessEntreprise({id}) {
    //const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { stateAccessEntreprise, setStateAccessEntreprise } = useContext(AppContextAccessEntreprise);
    //const { stateAccessEntreprise, setStateAccessEntreprise} = useContext(AppContextParam);

   //const { stateUtilisateur, setStateUtilisateur} = useContext(AppContextUtilisateur);
   const { users, setUsers } = useUsers(); // ✅ Récupérer la liste des utilisateurs
   
  const { stateEntreprise, setStateEntreprise} = useContext(AppContextEntreprise);


    const [admin, setAdmin ] = useState(false);

    const [proprietaire, setProprietaire] = useState(false);
    const [gerant, setGerant] = useState(false);
    const [gestionnaire, setGestionnaire] = useState(false);
    const [caissier, setCaissier] = useState(false);
    const [vendeur, setVendeur] = useState(false);
    const [eCommerce, setECommerce] = useState(false);
    const [activer, setActiver] = useState(false);
    const [createBy, setCreateBy] =  useState("");
    const [utilisateur, setUtilisateur] =  useState({id:""});
    const [entreprise, setEntreprise] =  useState({id:""});

  useEffect( () => {
   if (id) {
    handleGetAccessEntrepriseById(id);
   }
  }, [id]);
  
  const handleGetAccessEntrepriseById = (id) => {
    getAccessEntrepriseById(id).then( resp => {
        let accessEntreprise = resp.data;
        setAdmin(accessEntreprise.activer);

        setProprietaire(accessEntreprise.proprietaire);
        setGerant(accessEntreprise.gerant);
        setGestionnaire(accessEntreprise.gestionnaire);
        setCaissier(accessEntreprise.caissier);
        setVendeur(accessEntreprise.activer);
        setECommerce(accessEntreprise.eCommerce);
        setActiver(accessEntreprise.activer);
        setCreateBy(accessEntreprise.createBy);
        // setUtilisateur(accessEntreprise.utilisateurId);
        // setEntreprise(accessEntreprise.entrepriseId);
        //setUserCreate(accessEntreprise.userCreate);
        setActiver(accessEntreprise.activer);

    });
  }


    
    const handleDeleteAccessEntreprise = (e) => {
      e.preventDefault();
      if (!id) {
         alert("Access entreprise introuvable.");
         return;
     }

      deleteAccessEntrepriseById(id)
          .then(resp =>{
            const newAccessEntreprises = stateAccessEntreprise.filter((t) => t.id !== id);
            setStateAccessEntreprise(newAccessEntreprises);
            alert(resp.data);
          })
          .catch(err => {
            console.log(err)
        });
  };
     //const cancel = () => {
       //  navigate("/listtype");
    //};
    return(
        <>
       {/* <Header />
       <SideNav/> */}
          {/* <button  onClick={handleShow} className="btn btn-outline-danger">
              <FontAwesomeIcon icon={faTrash}>
              </FontAwesomeIcon>
          </button> */}
          <Link onClick={handleShow} className="dropdown-item text-danger">
            Supprimer
         </Link>

          <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Confirmation de la Suppression</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <form>
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
                           <select name="utilisateur" value={utilisateur.id} 
                                 onChange={(e) => setUtilisateur({id:e.target.value})}
                                 className="form-control default-select wide" id="inputState">
                           <option selected value="">Choose...</option>
                           {   
                                 users.map(item => (
                                    <option key={item.id} value={item.id}>{item.nom}</option>
                                 ))
                           }
                              </select>
                              {/* {errorRole && <span style={{color : "red"}}>{errorRole}</span>} */}
                        </div>
                        <div className="mb-3 col-md-12">
                           <label className="form-label">entreprise<span style={{color: "red"}}>*</span>:</label>
                           <select name="entreprise" value={entreprise.id} 
                                 onChange={(e) => setEntreprise({id:e.target.value})}
                                 className="form-control default-select wide" id="inputState">
                           <option selected value="">Choose...</option>
                           {   
                                 stateEntreprise.map(item => (
                                    <option key={item.id} value={item.id}>{item.nom}</option>
                                 ))
                           }
                              </select>
                              {/* {errorRole && <span style={{color : "red"}}>{errorRole}</span>} */}
                        </div>
                        <div className="form-check">
                           <input className="form-check-input" type="checkbox" checked={activer}
                              onChange={(e) => setActiver(e.target.checked) } />
                           <label className="form-check-label" htmlFor="flexCheckChecked">
                              Activer
                           </label>
                        </div>
                        <br/>
                         
                         
                      <div className="modal-footer">
                        
                          <button type="button" className="btn btn-danger light" onClick={handleClose}>Fermer</button>
                          <button type="button" className="btn btn-primary" onClick={ handleDeleteAccessEntreprise}>- Supprimer</button>
                          
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
export default DeleteAccessEntreprise;