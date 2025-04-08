import React, { useState, useEffect, useContext } from 'react';

import {  faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Modal } from 'react-bootstrap';
import { AppContextFonctionnalite,   useAuth } from '../../../useContext/contextStateUser';
import {  getFonctionnaliteById,  getIdInLocalStorage } from '../../../servicesApi/microservice-utilisateur';
import { Link } from 'react-router-dom';


function DetailsFonctionnalite({id}) {
  const idInLocalStorage = getIdInLocalStorage();
      //const {id} = useParams();
      //const typeId = parseInt(id);
      const [show, setShow] = useState(false);
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);

      const { roles } = useAuth(); // ✅ Récupère la liste des roles

      const [fonctionnaliteData, setFonctionnaliteData] = useState({
        nom : "",
        activer : "",
        updateBy : "",
        rolesDto : [],
        createAt : "",
        createBy: "",
        updateAt: ""
     });
      

      useEffect(() =>{
        if (id) {
        handleGetFonctionnaliteById(id);
        }
      },[id]);

      const handleGetFonctionnaliteById = (id) => {
            getFonctionnaliteById(id).then(resp => {
              setFonctionnaliteData(resp.data);
            });
      };

      
        return(
            <>
            {/* <Header/>
            <SideNav /> */}
             <Link onClick={handleShow} className="dropdown-item text-info" >Détails</Link>

             <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Informations d'une Fonctionnalite</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {fonctionnaliteData && (
                  <div>
                    <p><strong>Nom :</strong> {fonctionnaliteData.nom || 'N/A'}</p>
                    <p><strong>Activée :</strong> {fonctionnaliteData.activer ? "Oui" : "Non" }</p>
                    <p><strong>Mis à jour par :</strong> {fonctionnaliteData.updateBy || 'N/A'}</p>
                    <p><strong>Créé le :</strong> {fonctionnaliteData.createAt || 'N/A'}</p>
                    <p><strong>Créé par :</strong> {fonctionnaliteData.createBy || 'N/A'}</p>
                    <p><strong>Mis à jour le :</strong> {fonctionnaliteData.updateAt || 'N/A'}</p>
                    
                    <p><strong>Rôles :</strong></p>
                    {fonctionnaliteData.rolesDto && fonctionnaliteData.rolesDto.length > 0 ? (
                        <ul style={{ paddingLeft: '20px' }}>
                          {fonctionnaliteData.rolesDto.map((role, index) => (
                            <li key={index} style={{ marginBottom: '10px' }}>
                              <p><strong>Nom :</strong> {role.nom || 'N/A'}</p>
                              <p><strong>Activé :</strong> {role.activer ? "Oui" : "Non"}</p>
                              <p><strong>Créé par :</strong> {role.createBy || 'N/A'}</p>
                              <p><strong>Créé le :</strong> {role.createAt || 'N/A'}</p>
                              <p><strong>Mis à jour par :</strong> {role.updateBy || 'N/A'}</p>
                              <p><strong>Mis à jour le :</strong> {role.updateAt || 'N/A'}</p>
                              <hr/>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>Aucun rôle assigné</p>
                      )}

                  </div>
                )}

                </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Fermer
                </Button>
              </Modal.Footer>
              </Modal>
          {/* <Footer/> */}
           </>
        );
}

export default DetailsFonctionnalite;