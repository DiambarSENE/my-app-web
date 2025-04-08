import React, { useState, useEffect, useContext } from 'react';
import {ValidationName, ValidationRole} from '../../../validateur/validation';

import {  faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal } from 'react-bootstrap';
import { AppContextFonctionnalite, AppContextIdUserByToken,  useAuth } from '../../../useContext/contextStateUser';
import { getAllFonctionnalites, getFonctionnaliteById, updateFonctionnalite, getIdInLocalStorage } from '../../../servicesApi/microservice-utilisateur';
import { Link } from 'react-router-dom';


function EditFonctionnalite({id}) {
  const idInLocalStorage = getIdInLocalStorage();
      //const {id} = useParams();
      //const typeId = parseInt(id);
      const [show, setShow] = useState(false);
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);

      const { roles } = useAuth(); // ✅ Récupère la liste des roles
      
      const {  setStateFonctionnalite } = useContext(AppContextFonctionnalite);
      //permet de requiperer l'identifiant de l'utilisateur ensuite de l'utiliser dans le methode d'ajoute

      //const idUser = stateIdUserFromToken;
      //const [userCreate, setUserCreate] = useState(idUser);
      const [nom, setNom ] =  useState("");
      const [activer, setActiver] = useState(false);
      const [updateBy, setUpdateBy] =  useState(idInLocalStorage);
      const [rolesDto, setRolesDto] =  useState([]);
      const [erreurNom, setErreurNom] = useState("");
      const [erreurRole, setErreurRole] = useState("");
     
      const handleRoleChange = (roleId) => {
      setRolesDto((prev) => {
        const exists = prev.some((role) => role.id === roleId);
        return exists ? prev.filter((role) => role.id !== roleId) : [...prev, { id: roleId }];
      });
    };

      useEffect(() =>{
        if (id) {
        handleGetFonctionnaliteById(id);
        }
      },[id]);

      const handleGetFonctionnaliteById = (id) => {
            getFonctionnaliteById(id).then(resp => {
                 let fonctionnalite = resp.data;
                 setNom(fonctionnalite.nom);
                 setActiver(fonctionnalite.activer);
                 setUpdateBy(fonctionnalite.updateBy);
                 setRolesDto(fonctionnalite.rolesDto || [])
            });
      };

      

      const handleUpdateFonctionnalite = (e) => {
            e.preventDefault();

            const validationNom = ValidationName(nom);
            const validationRole = ValidationRole(rolesDto);

            setErreurNom(validationNom);
            setErreurRole(validationRole);

            if(validationNom || validationRole){
              return ;
            }

            let fonctionnalite = { id, nom, rolesDto, updateBy, activer };

            updateFonctionnalite(fonctionnalite).then( res => {
              handleClose();
                getAllFonctionnalites()
                  .then( resp => {
                      setStateFonctionnalite(resp.data);
                  })
                //alert(res.data)
            });

       //console.log("type => " + JSON.stringify(type));
     };

        return(
            <>
            {/* <Header/>
            <SideNav /> */}
             <Link onClick={handleShow} className="dropdown-item text-muted" >Modifier</Link>

             <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Modification d'une Fonctionnalite</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                      <form onSubmit={ handleUpdateFonctionnalite } >
                          <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">
                              Nom <span style={{color:"red"}}>*</span> :
                            </label>
                            {erreurNom && <span style={{color:"red", marginBottom: "8px"}}>{ erreurNom }</span> }
                            <input name="nom"
                                  type="text"
                                  value={nom}
                                  onChange={(e) => setNom(e.target.value) }
                                  className="form-control" id="exampleFormControlInput1" placeholder="Entrez le nom"></input>
                          </div>
                         
                        <div className="mb-3">
                              <label htmlFor="exampleFormControlTextarea1" className="form-label">
                                 Rôles <span style={{ color: "red" }}>*</span> :
                              </label>
                              {erreurRole && <div style={{color:"red", marginBottom: "8px"}}>{ erreurRole }</div>}
                              <table className="table table-bordered">
                              <thead>
                                <tr>
                                  <th>Sélection</th>
                                  <th>Nom du rôle</th>
                                </tr>
                              </thead>
                              <tbody>
                              {roles.map((item) => (
                                <tr key={item.id}>
                                  <td>
                                    <input
                                      type="checkbox"
                                      value={item.id}
                                      checked={rolesDto.some((role) => role.id === item.id)}
                                      onChange={() => handleRoleChange(item.id)}
                                    />
                                  </td>
                                  <td>{item.nom}</td>
                                </tr>
                              ))}
                             </tbody>
                            </table>
                            {/* <p>Rôles sélectionnés : {rolesDto.join(", ")}</p> */}
                        </div>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox"
                              checked={activer}
                              onChange={(e) => setActiver(e.target.checked) } />
                            <label className="form-check-label" htmlFor="flexCheckChecked">
                              Activer
                            </label>
                          </div>
                         
                          <br/>
                          <div style={{color:"red"}}>Les champs qui ont (*) sont obligatoires</div>

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

export default EditFonctionnalite;