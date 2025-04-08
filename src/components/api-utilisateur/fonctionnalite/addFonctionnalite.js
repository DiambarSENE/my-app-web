import React, { useState, useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import { ValidationName, ValidationRole } from '../../../validateur/validation';
import { AppContextFonctionnalite, AppContextIdUserByToken,  useAuth } from '../../../useContext/contextStateUser';
import { createFonctionnalite, getAllFonctionnalites , getIdInLocalStorage} from '../../../servicesApi/microservice-utilisateur';

function AddFonctionnalite() {
  const idInLocalStorage = getIdInLocalStorage();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const { roles } = useAuth(); // ✅ Récupère la liste des roles
    
    const { stateFonctionnalite, setStateFonctionnalite } = useContext(AppContextFonctionnalite);
     //permet de requiperer l'identifiant de l'utilisateur ensuite de l'utiliser dans le methode d'ajoute
    
    //const idUser = stateIdUserFromToken; 
    //const [userCreate, setUserCreate] = useState(idUser);
    const [nom, setNom ] =  useState("");
    const [description, setDescription ] =  useState("");
    const [activer, setActiver] = useState(false);
    const [createBy, setCreateBy] =  useState(idInLocalStorage);
    const [rolesDto, setRolesDto] =  useState([]);

    // États pour les erreurs de validation
     const [erreurNom, setErreurNom] = useState("");
     const [erreurRole, setErreurRole] = useState("");

     const handleRoleChange = (roleId) => {
      setRolesDto((prev) => {
        const exists = prev.some((role) => role.id === roleId);
        return exists ? prev.filter((role) => role.id !== roleId) : [...prev, { id: roleId }];
      });
    };
    
    const saveFonctionnalite = (e) => {
        e.preventDefault();

        const validationNom = ValidationName(nom);
        const validationRole = ValidationRole(rolesDto);

        setErreurNom(validationNom);
        setErreurRole(validationRole);

        if(validationNom || validationRole){
          return ;
        }

        let fonctionnalite = {  nom, description, rolesDto, createBy, activer };
          //console.log("type => " + JSON.stringify(type));
        createFonctionnalite(fonctionnalite).then( res => {
            //alert(res.data);
            setNom("");
            setDescription("");
            setCreateBy("");
            // setParametre("");
            setActiver(false) ;
            handleClose();
            getFonctionnalite();
            // Mise à jour de l'état avec le nouvel élément au début du tableau
              //setStateT(stateT => [type, ...stateT]);
            // Fermer le modal après la création du type
            //const modal = document.getElementById('basicModal');
            //modal .hide();
        });

       
    };

    const getFonctionnalite = () => {
      getAllFonctionnalites()
          .then(resp =>{
              // Récupérer les fonctionnalites du state actuel
              const currentFonctionnalites = stateFonctionnalite;

              // Ajouter le dernier élément de la réponse au début du tableau
              const updatedFonctionnalites = [resp.data[resp.data.length - 1], ...currentFonctionnalites];
  
              // Mettre à jour le stateFonctionnalite avec le nouveau tableau
            setStateFonctionnalite(updatedFonctionnalites);
          })
          .catch(err => {
              console.log(err)
       });

    };

   

    return(
        <>

              <button className="btn btn-primary btn-rounded fs-18" onClick={handleShow}>
                + Ajouter une fonctionnalité
              </button>
           

             <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Ajout d'une fonctionnalité</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={ saveFonctionnalite } >
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
                            <button className="btn btn-primary" >+ Ajouter</button>
                          </div>
                    </form>
                </Modal.Body>
              <Modal.Footer>
              </Modal.Footer>
            </Modal>
    
   </>
    );
}
export default AddFonctionnalite;