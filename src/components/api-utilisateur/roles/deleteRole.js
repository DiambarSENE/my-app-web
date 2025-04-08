import React, { useState, useEffect, useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import { deleteRole, getRoleById} from '../../../servicesApi/microservice-utilisateur';
import { AppContextRole, useAuth } from '../../../useContext/contextStateUser';
import { Link } from 'react-router-dom';

function DeleteRole({idRole}) {
      //const navigate = useNavigate();
      const [show, setShow] = useState(false);
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);

      //const { stateRole, setStateRole  } = useContext(AppContextRole);
      const { roles, fetchRoles } = useAuth();

      const [id, setId] = useState("");
      const [nom, setNom] = useState("");
      const [activer, setActiver] = useState(false);
      const [description, setDescription] = useState("");
      const [createBy, setCreateBy] = useState("");

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
        setDescription(role.description);
        setActiver(role.activer);
        setCreateBy(role.createBy);
    } catch (error) {
        console.error("Erreur lors de la récupération du rôle:", error);
        alert("Impossible de récupérer les informations du rôle.");
    }
};
      

const handleDeleteRole = async (e) => {
  e.preventDefault();
  if (!id) {
      alert("Rôle introuvable.");
      return;
  }

  try {
      await deleteRole(id);
      handleClose();
      fetchRoles(); // Rafraîchir la liste des rôles après suppression
      alert("Rôle supprimé avec succès !");
  } catch (err) {
      console.error("Erreur lors de la suppression:", err);
      alert("Impossible de supprimer un rôle relié à un utilisateur. Supprimez d'abord l'utilisateur.");
  }
};


      return(
            <>

             <Link onClick={handleShow} className="dropdown-item text-danger" >Supprimer</Link>

             <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Modification d'un role</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={ handleDeleteRole }>
                      <div className="row"> 
                          <div className="col-lg-12">
                          <div className="mb-3">
                              <label className="form-label">Nom :</label>
                              <input name="nom" type="text" value={nom}
                                onChange={(e) => setNom(e.target.value) } className="form-control" disabled/>
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
                          <br/>
                          </div>
                          <div className="col-lg-6">
                          <div className="mb-3">
                              <input name="createBy"
                                  type="hidden" min="0"
                                value={createBy}
                                onChange={(e) => setCreateBy(e.target.value) } className="form-control" disabled/>
                          </div>
                        </div>
                        <div className="modal-footer">
                            
                            <button type="button" className="btn btn-danger light" onClick={handleClose}>Fermer</button>
                            <button className="btn btn-primary">- Supprimer</button>
                            
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
export default DeleteRole;