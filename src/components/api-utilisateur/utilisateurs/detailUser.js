import React, { useState, useEffect, useContext } from 'react';
import {  faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from 'react-bootstrap/Modal';

import {  Link } from 'react-router-dom';
import { getUserById } from '../../../servicesApi/microservice-utilisateur';
import { Button, Form } from 'react-bootstrap';

function DetailUser({userId}) {
      //const navigate = useNavigate();
      const [show, setShow] = useState(false);
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);


      const [nom, setNom] = useState("");
      const [prenom, setPrenom] = useState("");
      const [telephone, setTelephone] = useState("");
      const [matricule , setMatricule] = useState("");
      const [email, setEmail] = useState("");
      const [activer , setActiver] = useState(false);
      const [adresse, setAdresse] = useState("");
      const [updateBy, setUpdateBy] = useState("");
      const [updateAt, setUpdateAt] = useState("");
      const [createAt, setCreateAt] = useState("");
      const [createBy, setCreateBy] = useState("");
      const [accessBackEndDto, setAccessBackEndDto] = useState({});
      const [accessEntrepriseDto, setAccessEntrepriseDto] = useState([]);


      useEffect(() =>{
        if (userId) {
           handleGetUserById(userId);
        }
      },[userId]);

      const handleGetUserById = (userId) => {
            getUserById(userId).then(resp => {
                 let user = resp.data;
                 setPrenom(user.prenom);
                 setNom(user.nom);
                 setTelephone(user.telephone);
                 setMatricule(user.matricule);
                 setEmail(user.email);
                 setActiver(user.activer);
                 setAdresse(user.adresse);
                 setUpdateAt(user.updateAt);
                 setUpdateBy(user.updateBy);
                 setCreateBy(user.setCreateBy);
                 setCreateAt(user.setCreateAt);
                 setAccessBackEndDto(user.accessBackEndDto || {});
                 setAccessEntrepriseDto(user.accessEntrepriseDto || [])
            });
      };

    
      return(
            <>
                <Link onClick={handleShow} className="dropdown-item text-info">
                   Détails
                </Link>
                <Modal show={show} onHide={handleClose} size="lg">
                  <Modal.Header closeButton>
                    <Modal.Title>Détails de l'utilisateur</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group>
                        <Form.Label>Nom</Form.Label>
                        <Form.Control value={nom} readOnly />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Prénom</Form.Label>
                        <Form.Control value={prenom} readOnly />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Téléphone</Form.Label>
                        <Form.Control value={telephone} readOnly />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control value={email} readOnly />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Matricule</Form.Label>
                        <Form.Control value={matricule} readOnly />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Adresse</Form.Label>
                        <Form.Control value={adresse} readOnly />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Compte Activé</Form.Label>
                        <Form.Control value={activer ? "Oui" : "Non"} readOnly />
                      </Form.Group>

                      <hr />
                      <h5>Accès Back-End</h5>
                      {Object.entries(accessBackEndDto).map(([key, value]) => (
                        <Form.Check
                          type="checkbox"
                          label={key}
                          checked={value}
                          disabled
                          key={key}
                        />
                      ))}

                      <hr />
                      <h5>Accès Entreprise</h5>
                      {
                      accessEntrepriseDto.map((item, index) => (
                        <div key={index}>
                        <Form.Check
                          type="checkbox"
                          label="Propriétaire"
                          checked={item.proprietaire}
                          disabled
                        />
                        <Form.Check
                          type="checkbox"
                          label="Admin"
                          checked={item.admin}
                          disabled
                        />
                        <Form.Check
                          type="checkbox"
                          label="Gérant"
                          checked={item.gerant}
                          disabled
                        />
                        <Form.Check
                          type="checkbox"
                          label="Gestionnaire"
                          checked={item.gestionnaire}
                          disabled
                        />
                        <Form.Check
                          type="checkbox"
                          label="Caissier"
                          checked={item.caissier}
                          disabled
                        />
                        <Form.Check
                          type="checkbox"
                          label="Vendeur"
                          checked={item.vendeur}
                          disabled
                        />
                        <Form.Check
                          type="checkbox"
                          label="E-Commerce"
                          checked={item.e_commerce}
                          disabled
                        />
                      </div>
                    ))}
                     
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
export default DetailUser;