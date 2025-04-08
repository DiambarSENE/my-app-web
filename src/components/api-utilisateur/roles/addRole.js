import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import {   ValidationAccesEntreprise, ValidationName } from "../../../validateur/validation";
import { addRole, getIdInLocalStorage } from "../../../servicesApi/microservice-utilisateur";
import { AppContextAccessEntreprise, useAuth } from "../../../useContext/contextStateUser";

function AddRole(){
  const idInLocalStorage = getIdInLocalStorage();
  const {  updateRoleList } = useAuth(); // ✅ Récupère la liste des roles

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { stateAccessEntreprise } = useContext(AppContextAccessEntreprise);

  const [nom, setNom] = useState("");
  const [activer, setActiver] = useState(false);
  const [accessEntrepriseDto, setAccessEntrepriseDto] = useState({id:""});
  const [createBy, setCreateBy] = useState(idInLocalStorage);
  const [errorNom, setErrorNom] = useState("");
  const [errorAcces, setErrorAcces] = useState("");

  const handleAccesChange = (accesId) => {
    setAccessEntrepriseDto({ id: accesId });
  };
     
  const handlerAddRole = (e) => {
    //const createBy = stateIdUserFromToken;
    e.preventDefault();
    const validationNom = ValidationName(nom);
    const validationAcces = ValidationAccesEntreprise(accessEntrepriseDto);
    setErrorNom(validationNom);
    setErrorAcces(validationAcces);

    if(validationNom || validationAcces){
        return;
    }

    let newRole = {nom, activer,accessEntrepriseDto, createBy}
    // console.log("Données envoyées :", JSON.stringify(newRole));
    addRole(newRole).then(resp => {
      //  alert("Role cree avec success");
      setNom("");
      setActiver("");
      setAccessEntrepriseDto("");
      setCreateBy("");
      //setUserId("");
      handleClose();
      //permet d'afficher l'element ajouté en tete de liste
      updateRoleList(newRole); 
    })
    
  };

  return(
      <>
        <Link onClick={handleShow} className="btn btn-primary btn-rounded fs-18" >+Ajouter un role</Link>

      <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
          <Modal.Title>Ajouter un role</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={ handlerAddRole }>
          <div className="row"> 
              <div className="col-lg-12">
              <div className="mb-3">
                  <label className="form-label">Nom <span style={{color: "red"}}>*</span>:
                  </label>
                  {errorNom && <span style={ { color: "red", marginBottom: "8px"} } >{errorNom}</span>}
                  <input name="nom" type="text" value={nom}
                    onChange={(e) => setNom(e.target.value) } className="form-control" />
              </div>
              </div>
              <div className="col-lg-12">
              <div className="mb-3">
                <label className="form-label">Accès entreprise<span style={{color: "red"}}>*</span>:</label>
                {errorAcces && <span style={ { color: "red", marginBottom : "8px"} } >{errorAcces}</span>}
                
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Sélectionnez</th>
                    <th>Admin</th>
                    <th>proprietaire</th>
                    <th>gerant</th>
                    <th>gestionnaire</th>
                    <th>caissier</th>
                    <th>vendeur</th>
                    <th>eCommerce</th>
                  </tr>
                </thead>
                <tbody>
                {stateAccessEntreprise.map((item) => (
                  <tr key={item.id}>
                    <td>
                    <input
                      type="radio"
                      name="accessEntreprise"
                      value={item.id}
                      checked={accessEntrepriseDto.id === item.id}
                      onChange={() => handleAccesChange(item.id)}
                    />
                    </td>
                    <td>{item.admin ? "Oui" : "Non" }</td>
                    <td>{item.proprietaire ? "Oui" : "Non" }</td>
                    <td>{item.gerant ? "Oui" : "Non" }</td>
                    <td>{ item.gestionnaire ? "Oui" : "Non" }</td>
                    <td>{ item.caissier ? "Oui" : "Non" }</td>
                    <td>{ item.vendeur ? "Oui" : "Non" }</td>
                    <td>{  item.eCommerce ? "Oui" : "Non" }</td>

                  </tr>
                ))}
                </tbody>
              </table>
            </div>
            </div>
            <div className="col-lg-12">
              <div className="form-check">
                  <input className="form-check-input" type="checkbox"
                    checked={activer}
                    onChange={(e) => setActiver(e.target.checked) } />
                  <label className="form-check-label" htmlFor="flexCheckChecked">
                    Activer
                  </label>
                </div>
                </div>
                <br/>
            <div className="modal-footer">
                
                <button type="button" className="btn btn-danger light" onClick={handleClose}>Fermer</button>
                <button className="btn btn-primary">+ Ajouter</button>
                
            </div>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
      </Modal.Footer>
      </Modal>
      </>
  );
}

export default AddRole;