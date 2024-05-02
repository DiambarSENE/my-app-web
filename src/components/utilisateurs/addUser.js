import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import { ValidationEmail, ValidationMatricule, ValidationName, ValidationPrenom, ValidationRole, ValidationTelephone } from "../../validateur/validation";
import { createUsers, getUsers } from "../../servicesApi/microservice-utilisateur";
import { AppContextIdUserByToken, AppContextRole, AppContextUtilisateur } from "../../useContext/contextStateUser";

function AddUser(){
    const { stateUtilisateur, setStateUtilisateur} = useContext(AppContextUtilisateur);
    const {userRoles, setUserRoles} = useContext(AppContextRole);
    //permet de requiperer l'identifiant de l'utilisateur ensuite de l'utiliser dans le methode d'ajoute
    const {stateIdUserFromToken, setStateIdUserFromToken} = useContext(AppContextIdUserByToken);

      const [show, setShow] = useState(false);
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);

      const [nom, setNom] = useState("");
      const [prenom, setPrenom] = useState("");
      const [telephone, setTelephone] = useState("");
      const [email, setEmail] = useState("");
      const [role, setRole] = useState("");
      const [isActivated , setIsActivated] = useState(false);
      //recupere la valeur de l'identifiant
      const userId = stateIdUserFromToken;
      const [userCreate, setUserCreate] = useState(userId);

      const [errorPrenom, setErrorPrenom] = useState("");
      const [errorNom, setErrorNom] = useState("");
      const [errorEmail, setErrorEmail] = useState("");
      const [errorTelephone, setErrorTelephone] = useState("");
      const [errorRole, setErrorRole] = useState("");

      const handlerAddUser = (e) => {
        e.preventDefault();
        const errorPrenom = ValidationPrenom(prenom);
        const errorNom = ValidationName(nom);
        const errorEmail = ValidationEmail(email);
        const errorTelephone = ValidationTelephone(telephone);
        const errorRole = ValidationRole(role);
        
        let user = {nom, prenom,telephone, email, role, isActivated, userCreate}
        if(!errorPrenom || !errorNom || !errorEmail || !errorTelephone || !errorRole){
            createUsers(user).then(resp => {
                alert("utilisateur ajouter avec succes");
                {handleClose();}
                getUsers()
                    .then(response => {
                        setStateUtilisateur(response.data);
                    })
                    .catch(error => {
                        console.log(error)
                    })
            })
        }else{
            setErrorPrenom(errorPrenom);
            setErrorNom(errorNom);
            setErrorEmail(errorEmail);
            setErrorTelephone(errorTelephone);
            setErrorRole(errorRole);
        }
      };

    return(
        <>
          <Link onClick={handleShow} className="btn btn-primary btn-rounded fs-18" >+Ajouter un utilisateur</Link>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Ajouter un Utilisateur</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form onSubmit={handlerAddUser}>
                <div className="row"> 
                    <div className="col-lg-6">
                    <div className="mb-3">
                        <label className="form-label">Prenom <span style={{color: "red"}}>*</span>: </label>
                        <input type="text" value={prenom}
                            onChange={(e) => setPrenom(e.target.value) } className="form-control" name="prenom"/>
                        {errorPrenom && <span style={{color : "red"}}>{errorPrenom}</span>}
                    </div>
                    </div>
                    <div className="col-lg-6">
                    <div className="mb-3">
                        <label className="form-label">Nom <span style={{color: "red"}}>*</span>:</label>
                        <input name="nom" type="text" value={nom}
                        onChange={(e) => setNom(e.target.value) } className="form-control" />
                        {errorNom && <span style={{color : "red"}}>{errorNom}</span>}
                    </div>
                    </div>
                    <div className="col-lg-6">
                    <div className="mb-3">
                        <label className="form-label">Telephone <span style={{color: "red"}}>*</span>: </label>
                        <input name="telephone" type="tel" value={telephone}
                            onChange={(e) => setTelephone(e.target.value) } className="form-control" />
                        {errorTelephone && <span style={{color : "red"}}>{errorTelephone}</span>}
                    </div>
                    </div>
                    <div className="col-lg-6">
                    <div className="mb-3">
                        <label className="form-label">Email <span style={{color: "red"}}>*</span>:</label>
                        <input name="email" type="email" value={email}
                            onChange={(e) => setEmail(e.target.value) } className="form-control" />
                            {errorEmail && <span style={{color : "red"}}>{errorEmail}</span>}
                    </div>
                    </div>
                      {/* <div className="col-lg-6">
                    <div className="mb-3">
                        <input name="userCreate"
                            type="hidden" min="0"
                        value={userCreate}
                        onChange={(e) => setUserCreate(e.target.value) } className="form-control" />
                    </div>

                  <div className="mb-3">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox"
                        isActivated={isActivated}
                        onChange={(e) => setIsActivated(e.target.checked) } />
                    <label className="form-check-label" htmlFor="flexCheckChecked">
                        Activated
                    </label>
                    </div>  
                    </div> 
                </div>*/}
                <div className="mb-3 col-md-12">
                    <label className="form-label">Profil<span style={{color: "red"}}>*</span>:</label>
                    <select name="role" value={role} 
                        onChange={(e) => setRole(e.target.value)}
                        className="form-control default-select wide" id="inputState">
                    <option selected value="">Choose...</option>
                    {   
                         userRoles.map(role => (
                            <option key={role.id} value={role.name}>{role.nom}</option>
                        ))
                    }
                     </select>
                     {errorRole && <span style={{color : "red"}}>{errorRole}</span>}
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-danger light" onClick={handleClose}>Fermer</button>
                    <button className="btn btn-primary">+ Enregistrer</button>
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

export default AddUser;