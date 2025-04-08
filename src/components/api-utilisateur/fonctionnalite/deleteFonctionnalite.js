import React, { useState, useEffect, useContext } from 'react';
import {  faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from 'react-bootstrap/Modal';
import { AppContextFonctionnalite, AppContextRole, useAuth } from '../../../useContext/contextStateUser';
import { deleteFonctionnaliteById, getFonctionnaliteById } from '../../../servicesApi/microservice-utilisateur';
import { Link } from 'react-router-dom';

function DeleteFonctionnalite({id}) {
      //const navigate = useNavigate();
      const [show, setShow] = useState(false);
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);

      const { roles } = useAuth();
      const { stateFonctionnalite, setStateFonctionnalite } = useContext(AppContextFonctionnalite);

      const [nom, setNom ] =  useState("");
      const [createBy, setCreateBy] = useState("");
      const [activer, setActiver] = useState(false);
      const [rolesDto, setRolesDto] =  useState([]);
            
           
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
              setCreateBy(fonctionnalite.createBy);
              setActiver(fonctionnalite.activer);
              setRolesDto(fonctionnalite.rolesDto)
        });
      };

      const handleDeleteFonctionnalite = (e) => {
          e.preventDefault();

          deleteFonctionnaliteById(id)
              .then(resp =>{
                const newFonctionnalites = stateFonctionnalite.filter((f) => f.id !== id);
                setStateFonctionnalite(newFonctionnalites);
                //alert(resp.data);
                handleClose();
              } )
              .catch(err => {
                console.log(err)
            });
      };
      return(
            <>
            {/* <Header />
            <SideNav/> */}
             <Link onClick={handleShow} className="dropdown-item text-danger" >Supprimer</Link>

             <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Confirmation de la Suppression</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <form  >
                          <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">
                              Nom <span style={{color:"red"}}>*</span> :
                            </label>
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
                        
                            <div className="modal-footer">
                              <button type="button" className="btn btn-danger light" onClick={handleClose}>Fermer</button>
                              <button className="btn btn-primary" onClick={ handleDeleteFonctionnalite } >- Supprimer</button>
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
export default DeleteFonctionnalite;