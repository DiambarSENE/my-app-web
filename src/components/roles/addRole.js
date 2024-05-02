import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import { ValidationEmail, ValidationMatricule, ValidationName, ValidationPrenom, ValidationRole, ValidationTelephone } from "../../validateur/validation";
import { addRole, createUsers, getAllRoles } from "../../servicesApi/microservice-utilisateur";
import { AppContextIdUserByToken, AppContextRole } from "../../useContext/contextStateUser";

function AddRole(){
    const {stateIdUserFromToken , setStateIdUserFromToken} = useContext(AppContextIdUserByToken);
    const {userRoles, setUserRoles} = useContext(AppContextRole);

      const [show, setShow] = useState(false);
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);
      
     
      const [nom, setNom] = useState("");
      const [description, setDescription] = useState("");
      //const idUser = stateIdUserFromToken;
      //const [userId, setUserId] = useState(idUser);
      const [errorNom, setErrorNom] = useState("");
     
      const handlerAddRole = (e) => {
        const userId = stateIdUserFromToken;
        e.preventDefault();
        const errorNom = ValidationName(nom);
        let role = {nom, description, userId}
        if(!errorNom){
            addRole(role).then(resp => {
                 alert("Role cree avec success");
                 setNom("");
                 setDescription("");
                 //setUserId("");
                 {handleClose();}

                 getAllRoles().then(resp => {
                    const currentUserRoles = userRoles;
                    const updatedUserRoles = [resp.data[resp.data.length - 1], ...currentUserRoles];
                    setUserRoles(updatedUserRoles);
                 }).catch(err => {
                    console.error(err);
                 })
            })
        }else{
            setErrorNom(errorNom);
        }
      }

    return(
        <>
          <Link onClick={handleShow} className="btn btn-primary btn-rounded fs-18" >+Ajouter un role</Link>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Ajouter un role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={ handlerAddRole }>
            <div className="row"> 
                <div className="col-lg-12">
                <div className="mb-3">
                    <label className="form-label">Nom <span style={{color: "red"}}>*</span>:
                    {errorNom && <span style={ { color: "red"} } >{errorNom}</span>}
                    </label>
                    <input name="nom" type="text" value={nom}
                      onChange={(e) => setNom(e.target.value) } className="form-control" />
                </div>
                </div>
                <div className="col-lg-12">
                <div className="mb-3">
                    <label className="form-label">Description : </label>
                    <input name="description" type="tel" value={description}
                        onChange={(e) => setDescription(e.target.value) } className="form-control" />
                </div>
                </div>
                
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