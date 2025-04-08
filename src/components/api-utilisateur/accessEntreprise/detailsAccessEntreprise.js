import React, { useState, useEffect } from 'react';
import { Link  } from 'react-router-dom';
import {  faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from 'react-bootstrap/Modal';
import { getAccessEntrepriseById } from '../../../servicesApi/microservice-utilisateur';
import { Button, Form } from 'react-bootstrap';

function DetailsAccessEntreprise({id}) {

   const [show, setShow] = useState(false);
   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);
         

   const [admin, setAdmin ] = useState(false);

   const [proprietaire, setProprietaire] = useState(false);
   const [gerant, setGerant] = useState(false);
   const [gestionnaire, setGestionnaire] = useState(false);
   const [caissier, setCaissier] = useState(false);
   const [vendeur, setVendeur] = useState(false);
   const [eCommerce, setECommerce] = useState(false);
   const [activer, setActiver] = useState(false);
   const [updateBy, setUpdateBy] =  useState("");
   const [updateAt , setUpdateAt] =  useState("");
   const [createBy, setCreateBy] =  useState("");
   const [createAt , setCreateAt] =  useState("");
   const [utilisateur, setUtilisateur] =  useState({});
   const [entreprise, setEntreprise] =  useState({});
   const [role, setRole] =  useState([]);


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
            setUpdateBy(accessEntreprise.updateBy);
            setCreateAt(accessEntreprise.createAt);
            setCreateBy(accessEntreprise.createBy);
            setUpdateAt(accessEntreprise.updateAt);
            setUpdateBy(accessEntreprise.updateBy);
            setActiver(accessEntreprise.activer);
            setUtilisateur(accessEntreprise.utilisateurDto || {});
            setEntreprise(accessEntreprise.entrepriseDto || {});
            setRole(accessEntreprise.rolesDto || []);
        });
      }


        return(
            <>
            <Link onClick={handleShow} className="dropdown-item text-info">
               Détails
            </Link>
            <Modal show={show} onHide={handleClose} size="lg">
               <Modal.Header closeButton>
               <Modal.Title>Détails d'access entreprise</Modal.Title>
               </Modal.Header>
               <Modal.Body>
               <div>
               <h4>Accès entreprise</h4>
                  {/* Affichage global des rôles */}
            
               <Form.Check
                  type="checkbox"
                  label="Admin"
                  checked={admin}
                  disabled
               />
               <Form.Check
                  type="checkbox"
                  label="Propriétaire"
                  checked={proprietaire}
                  disabled
               />
               <Form.Check
                  type="checkbox"
                  label="Gérant"
                  checked={gerant}
                  disabled
               />
               <Form.Check
                  type="checkbox"
                  label="Gestionnaire"
                  checked={gestionnaire}
                  disabled
               />
               <Form.Check
                  type="checkbox"
                  label="Caissier"
                  checked={caissier}
                  disabled
               />
               <Form.Check
                  type="checkbox"
                  label="Vendeur"
                  checked={vendeur}
                  disabled
               />
               <Form.Check
                  type="checkbox"
                  label="E-Commerce"
                  checked={eCommerce}
                  disabled
               />
               <Form.Check
                  type="checkbox"
                  label="Activer"
                  checked={activer}
                  disabled
               />

               {/* Informations sur les métadonnées */}
               <div style={{ marginTop: "1rem" }}>
               <p><strong>Créé par :</strong> {createBy}</p>
               <p><strong>Date de création :</strong> {createAt}</p>
               <p><strong>Modifié par :</strong> {updateBy}</p>
               <p><strong>Date de modification :</strong> {updateAt}</p>
               </div>
       
               <hr />
               {/* Informations sur l'utilisateur */}
               <h4>Informations Utilisateur</h4>
               <p><strong>Nom :</strong> {utilisateur.nom}</p>
               <p><strong>Prénom :</strong> {utilisateur.prenom}</p>
               <p><strong>Téléphone :</strong> {utilisateur.telephone}</p>
               <p><strong>Email :</strong> {utilisateur.email}</p>
               <p><strong>Matricule :</strong> {utilisateur.matricule}</p>
               <p><strong>Adresse :</strong> {utilisateur.adresse}</p>
               <p><strong>Créé par :</strong> {utilisateur.createBy}</p>
               <p><strong>Date de création :</strong> {utilisateur.createAt}</p>
               <p><strong>Modifié par :</strong> {utilisateur.updateBy}</p>
               <p><strong>Date de modification :</strong> {utilisateur.upcreateAt}</p>
               <p><strong>Actif :</strong> {utilisateur.activer ? "Oui" : "Non"}</p>

               <hr />
               {/* Informations sur l'entreprise */}
               <h4>Informations Entreprise</h4>
               <p><strong>Nom :</strong> {entreprise.nom}</p>
               <p><strong>Label :</strong> {entreprise.labelle}</p>
               <p><strong>Adresse :</strong> {entreprise.adresse}</p>
               <p><strong>Téléphone :</strong> {entreprise.telephone}</p>
               <p><strong>Email :</strong> {entreprise.email}</p>
               <p><strong>Pays :</strong> {entreprise.pays}</p>
               <p><strong>TVA 1 :</strong> {entreprise.tva1}</p>
               <p><strong>TVA 2 :</strong> {entreprise.tva2}</p>
               <p><strong>NINEA :</strong> {entreprise.ninea}</p>
               <p><strong>Registre de commerce :</strong> {entreprise.registreDeCommerce}</p>
               <p><strong>Catégorie :</strong> {entreprise.categorie}</p>
               <p><strong>Type :</strong> {entreprise.type}</p>
               <p><strong>Créé par :</strong> {entreprise.createBy}</p>
               <p><strong>Date de création :</strong> {entreprise.createAt}</p>
               <p><strong>Modifié par :</strong> {entreprise.updateBy}</p>
               <p><strong>Date de modification :</strong> {entreprise.updateAt}</p>
               <p><strong>Actif :</strong> {entreprise.activer ? "Oui" : "Non"}</p>
               
               <hr />
               {/* Liste des rôles */}
               <h4>Rôles</h4>
               {role.length > 0 ? (
                  role.map((r, index) => (
                     <div key={index} style={{ marginBottom: "1rem" }}>
                     <p><strong>Nom du rôle :</strong> {r.nom}</p>
                     <p><strong>Actif :</strong> {r.activer ? "Oui" : "Non"}</p>
                     <p><strong>Créé par :</strong> {r.createBy}</p>
                     <p><strong>Date de création :</strong> {r.createAt}</p>
                     <p><strong>Modifié par :</strong> {r.updateBy}</p>
                     <p><strong>Date de modification :</strong> {r.updateAt}</p>
                  
                     </div>
                  ))
               ) : (
                  <p>Aucun rôle disponible.</p>
               )}
               </div>

               </Modal.Body>
               <Modal.Footer>
               <Button variant="secondary" onClick={handleClose}>
                  Fermer
               </Button>
               </Modal.Footer>
            </Modal>
        </>
        );
}

export default DetailsAccessEntreprise;