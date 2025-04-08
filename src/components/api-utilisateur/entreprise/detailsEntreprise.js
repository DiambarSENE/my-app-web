import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import {  getEntrepriseById} from '../../../servicesApi/microservice-utilisateur';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function DetailsEntreprise({entrepriseId}) {
    //const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [entrepriseData, setEntrepriseData] = useState({
      nom: "",
      labelle: "",
      adresse: "",
      telephone: "",
      email: "",
      pays: "",
      tva1: "",
      tva2: "",
      ninea: "",
      registreDeCommerce: "",
      createAt: "",
      updateAt: "",
      createBy: "",
      updateBy: "",
      activer: "",
      categorie: "",
      type: "",
      accessEntrepriseDto: []
    });
    

    useEffect(() => {
      if (entrepriseId) {
        handleGetEntrepriseById(entrepriseId);
      }
    }, [entrepriseId]);
    
    const handleGetEntrepriseById = (entrepriseId) => {
      getEntrepriseById(entrepriseId).then(resp => {
        setEntrepriseData(resp.data);
      });
    };
    

  
      return(
            <>

             <Link onClick={handleShow} className="dropdown-item" >détails</Link>

             <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Informations sur l’Entreprise</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {entrepriseData && (
                  <div>
                    <p><strong>Nom :</strong> {entrepriseData.nom}</p>
                    <p><strong>Labelle :</strong> {entrepriseData.labelle}</p>
                    <p><strong>Adresse :</strong> {entrepriseData.adresse}</p>
                    <p><strong>Téléphone :</strong> {entrepriseData.telephone}</p>
                    <p><strong>Email :</strong> {entrepriseData.email}</p>
                    <p><strong>Pays :</strong> {entrepriseData.pays}</p>
                    <p><strong>TVA 1 :</strong> {entrepriseData.tva1}</p>
                    <p><strong>TVA 2 :</strong> {entrepriseData.tva2}</p>
                    <p><strong>NINEA :</strong> {entrepriseData.ninea}</p>
                    <p><strong>Registre de Commerce :</strong> {entrepriseData.registreDeCommerce}</p>
                    <p><strong>Créé le :</strong> {entrepriseData.createAt}</p>
                    <p><strong>Mis à jour le :</strong> {entrepriseData.updateAt}</p>
                    <p><strong>Créé par :</strong> {entrepriseData.createBy}</p>
                    <p><strong>Mis à jour par :</strong> {entrepriseData.updateBy}</p>
                    <p><strong>Actif :</strong> {entrepriseData.activer ? "Oui" : "Non"}</p>
                    <p><strong>Catégorie :</strong> {entrepriseData.categorie}</p>
                    <p><strong>Type :</strong> {entrepriseData.type}</p>

                    {/* Affichage de accessEntrepriseDto */}
                    <hr/>
                    <p><strong>Accès Entreprise :</strong></p>
                    {entrepriseData.accessEntrepriseDto && entrepriseData.accessEntrepriseDto.length > 0 ? (
                        <ul style={{ paddingLeft: '20px' }}>
                          {entrepriseData.accessEntrepriseDto.map((accesEntreprise, index) => (
                            <li key={ index } style={{ marginBottom: '10px' }} >
                                <p><strong>ID :</strong> { accesEntreprise.id || 'N/A'}</p>
                                <p><strong>Propriétaire :</strong> { accesEntreprise.proprietaire ? 'Oui' : 'Non'}</p>
                                <p><strong>Admin :</strong> { accesEntreprise.admin ? 'Oui' : 'Non'}</p>
                                <p><strong>Gerant :</strong> { accesEntreprise.gerant ? 'Oui' : 'Non'}</p>
                                <p><strong>Gestionnaire :</strong> { accesEntreprise.gestionnaire ? 'Oui' : 'Non'}</p>
                                <p><strong>Caissier :</strong> { accesEntreprise.caissier ? 'Oui' : 'Non'}</p>
                                <p><strong>Vendeur :</strong> { accesEntreprise.vendeur ? 'Oui' : 'Non'}</p>
                                <p><strong>ECommerce :</strong> { accesEntreprise.eCommerce ? 'Oui' : 'Non'}</p>
                            </li>
                          ))}
                        </ul>
                      ):
                        (
                          <p>Aucun acces entreprise assigné</p>
                        )
                      }
                    
                  </div>
                  
                )}
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
export default DetailsEntreprise;