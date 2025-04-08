import React, { useState, useEffect, useContext } from 'react';

import {  faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal } from 'react-bootstrap';
import { getAccessBackEndById } from '../../../servicesApi/microservice-utilisateur';
import { Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';

function DetailsAccessBackend({id}) {
      const [show, setShow] = useState(false);
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);
      
     const [superAdmin, setSuperAdmin ] =  useState(false);
     const [admin, setAdmin ] =  useState(false);
     const [activer, setActiver] = useState(false);
     const [createBy, setCreateBy] =  useState("");
     const [updateBy, setUpdateBy] =  useState("");
     const [createAt, setCreateAt] =  useState("");
     const [updateAt, setUpdateAt] =  useState("");
     const [accompagnateur, setAccompagnateur] =  useState(false);
     const [editeurCatalogue, setEditeurCatalogue] =  useState(false);
     const [utilisateur, setUtilisateur] = useState({});

      useEffect(() =>{
        if (id) {
        handleGetAccessBackendById(id);
        }
      },[id]);

      const handleGetAccessBackendById = (id) => {
            getAccessBackEndById(id).then(resp => {
                 let accessBackend = resp.data;
                  setActiver(accessBackend.activer);
                  setSuperAdmin(accessBackend.superAdmin);
                  setAdmin(accessBackend.admin);
                  setAccompagnateur(accessBackend.accompagnateur);
                  setCreateBy(accessBackend.createBy);
                  setUpdateBy(accessBackend.updateBy);
                  setCreateAt(accessBackend.createAt);
                  setUpdateAt(accessBackend.updateAt);
                  setEditeurCatalogue(accessBackend.editeurCatalogue);
                  setUtilisateur(accessBackend.utilisateur || {})
            });
      };


        return(
            <>
            <Link onClick={handleShow} className="dropdown-item text-info">
                Détails
            </Link>
            <Modal show={show} onHide={handleClose} size="lg">
              <Modal.Header closeButton>
                <Modal.Title>Détails d'access backend</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <h5>Accès Back-End</h5>
                 {/* Affichage global des rôles */}
                  <Form.Check
                    type="checkbox"
                    label="Super Admin"
                    checked={superAdmin}
                    disabled
                  />
                  <Form.Check
                    type="checkbox"
                    label="Admin"
                    checked={admin}
                    disabled
                  />
                  <Form.Check
                    type="checkbox"
                    label="Activer"
                    checked={activer}
                    disabled
                  />
                  <Form.Check
                    type="checkbox"
                    label="Accompagnateur"
                    checked={accompagnateur}
                    disabled
                  />
                  <Form.Check
                    type="checkbox"
                    label="Éditeur Catalogue"
                    checked={editeurCatalogue}
                    disabled
                  />
                  <hr/>
                  <Form.Check
                    type="checkbox"
                    label="Access backend Activé"
                    checked={activer}
                    disabled
                  />
                    <hr/>

                    <h5>Utilisateur associé</h5>
                    <Form.Group>
                    <Form.Label>Nom</Form.Label>
                    <Form.Control value={utilisateur.nom} readOnly />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Prénom</Form.Label>
                    <Form.Control value={utilisateur.prenom} readOnly />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Téléphone</Form.Label>
                    <Form.Control value={utilisateur.telephone} readOnly />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control value={utilisateur.email} readOnly />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Matricule</Form.Label>
                    <Form.Control value={utilisateur.matricule} readOnly />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Adresse</Form.Label>
                    <Form.Control value={utilisateur.adresse} readOnly />
                  </Form.Group>
                  
                </Form>
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

export default DetailsAccessBackend;