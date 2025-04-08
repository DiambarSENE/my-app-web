import React, { useState, useEffect, useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import { getAllRoles, getRoleById, updateRole, getIdInLocalStorage} from '../../../servicesApi/microservice-utilisateur';
import { AppContextAccessEntreprise, AppContextIdUserByToken, AppContextRole, useAuth } from '../../../useContext/contextStateUser';
import { Link } from 'react-router-dom';
import { ValidationAccesEntreprise, ValidationName } from '../../../validateur/validation';

function EditerRole({idRole}) {
  //permet de requiperer l'identifiant de l'utilisateur ensuite de l'utiliser dans le methode d'ajoute
  const idInLocalStorage = getIdInLocalStorage();
  //const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { updateRoleList } = useAuth(); // ✅ Récupère la liste des roles
  
  const { stateAccessEntreprise } = useContext(AppContextAccessEntreprise);

  const [id, setId] = useState("");
  const [nom, setNom] = useState("");
  const [activer, setActiver] = useState(false);
  const [accessEntrepriseDto, setAccessEntrepriseDto] = useState({id:""});

  const [updateBy, setUpdateBy] = useState(idInLocalStorage);
  const [errorNom, setErrorNom] = useState("");
  const [errorAcces, setErrorAcces] = useState("");

  const handleAccesChange = (accesId) => {
    setAccessEntrepriseDto({ id: accesId });
  };

  // Récupération des informations du rôle
  useEffect(() => {
    if (idRole) {
        handleGetRoleById(idRole);
    }
  }, [idRole]);


  const handleGetRoleById = async (idRole) => {
    try {
        const resp = await getRoleById(idRole);
        const role = resp.data;
        setId(role.id);
        setNom(role.nom);
        setActiver(role.activer);
        setUpdateBy(role.updateBy);
        setAccessEntrepriseDto(role.accessEntrepriseDto || {})
    } catch (error) {
        console.error("Erreur lors de la récupération du rôle:", error);
        alert("Impossible de récupérer les informations du rôle.");
    }
  };

  const handleUpdateRole = (e) => {
      e.preventDefault();
      //const id = roleId;
      const validationNom = ValidationName(nom);
      const validationAcces = ValidationAccesEntreprise(accessEntrepriseDto);
      setErrorNom(validationNom);
      setErrorAcces(validationAcces);

      if(validationNom || validationAcces){
          return;
      }
      
      let role = {id, nom, activer, accessEntrepriseDto, updateBy};
      console.log("Données envoyées :"+ JSON.stringify(role));

      updateRole(role).then(resp =>{
            handleClose();
            //permet d'afficher l'element modifier en tete de liste
            updateRoleList(role);
        } )
        .catch(err => {
          console.log(err)
      });

  };
      return(
            <>

             <Link onClick={handleShow} className="dropdown-item" >Modifier</Link>

             <Modal show={show} onHide={handleClose} size='lg'>
                <Modal.Header closeButton>
                  <Modal.Title>Modification d'un role</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form onSubmit={ handleUpdateRole }>
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
                      <button className="btn btn-primary">+ Modifiier</button>
                          
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
export default EditerRole;