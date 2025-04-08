import React, { useState, useEffect, useContext } from 'react';
import { useNavigate  } from 'react-router-dom';
import {updateParametre, getParametreById, getTypes, getParametres, getParametreByIdType} from '../../../servicesApi/microservice-parametre';
import {  faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from 'react-bootstrap/Modal';
import { ValidationName, ValidationTypes } from '../../../validateur/validation';
import Header from '../../templates/header';
import Footer from '../../templates/Footer';
import SideNav from '../../templates/SideNav';
import { AppContext, AppContextParam, AppContextParamByType } from '../../../useContext/context';
import { AppContextIdUserByToken } from '../../../useContext/contextStateUser';

function EditParametre({id}) {
      const [show, setShow] = useState(false);
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);
      //permet de requiperer l'identifiant de l'utilisateur ensuite de l'utiliser dans le methode d'ajoute
      const {stateIdUserFromToken, setStateIdUserFromToken} = useContext(AppContextIdUserByToken);
      const { stateParametreByType, setStateParametreByType } = useContext(AppContextParamByType);
      // const {stateParametre, setStateParametre } = useContext(AppContextParam);
      const { stateT, setStateT } = useContext(AppContext);
      //const {id} = useParams();
      //const id = parseInt(id);
      const navigate = useNavigate();

      const [nom, setNom ] =  useState("");
      const [symbole, setSymbole] = useState("");
      const [type, setType] = useState({id : ""});
      //const userId = stateIdUserFromToken;
      //const [userCreate, setUserCreate] = useState(userId);
      const [updateBy, setUpdateBy] = useState(); 
      const [activer, setActiver] = useState(false);

      const [nameError, setNameError] = useState("");
      const [typesError, setTypesError] = useState("");

      useEffect( () => {
         handleGetParametreById(id);
      }, []);
      
      const handleGetParametreById = (id) => {
        getParametreById(id).then( resp => {
            let parametre = resp.data;
            setNom(parametre.nom);
            setSymbole(parametre.symbole);
            //setType(parametre.type.nom);
            //setUserCreate(parametre.userCreate);
            setActiver(parametre.activer);

        });
      }

      const handleUpdateParametre = (e) => {
        e.preventDefault();
        const userCreate = stateIdUserFromToken;
        const nameError = ValidationName(nom);
        const typesError = ValidationTypes(type);
        let parametre = { id, nom, symbole, type, updateBy, activer };
        if(!nameError && !typesError){
          updateParametre(parametre).then( resp =>{
            //navigate("/listParametre")
            handleClose();
            alert("parametre modifier avec success");
            setNom("");
            setSymbole("");
            setType("");
            //setUserCreate("");
            setActiver(false);

            // getParametres()
            //   .then( resp => {
            //     setStateParametre(resp.data);
            // })
            
           //j'ai utilise ici de methode juste pour la mise a jour du tableux c'est a dire afficher les donnees modifiees sans reflechir la page
            getParametreByIdType(resp.data.type.id)
            .then( resp => {
                setStateParametreByType(resp.data);
            })
              .catch((err) => {
                console.log(err)
              });
          });
        }else{
          setNameError(nameError)
          setTypesError(type)
        }
      };

      useEffect(() => {
        handleGetParametre();
    },[]);


    const handleGetParametre = () => {
          getTypes()
          .then( resp => {
              setStateT(resp.data);
      })
      .catch((err) => {
          console.log(err)
      });
    };
      //const cancel = () => {
        //navigate("/listParametre")
      //};

        return(
            <>
            {/* <Header />
            <SideNav /> */}
              <button onClick={handleShow} className="btn btn-outline-primary">
                <FontAwesomeIcon icon={faEdit}>
                </FontAwesomeIcon>
             </button>

             <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Modification d'un Parametre</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <form onSubmit={ handleUpdateParametre } >

                           <div className="mb-3">
                             <label htmlFor="exampleFormControlInput1" className="form-label">
                                Nom <span style={{color:"red"}}>*</span> :
                                {nameError && <span style={{color:"red"}}>{ nameError }</span> }
                              </label>
                             <input name="nom"
                                    type="text"
                                    value={nom}
                                    onChange={(e) => setNom(e.target.value) }
                                    className="form-control" id="exampleFormControlInput1" placeholder="le nom du parametre"></input>
                           </div>
                           <div className="mb-3">
                             <label htmlFor="exampleFormControlTextarea1" className="form-label">Symbole :</label>
                             <input  name="symbole"
                                      type="text"
                                      value={symbole}
                                      onChange={(e) => setSymbole(e.target.value) }
                                       className="form-control" id="exampleFormControlTextarea1" ></input>
                           </div>
                           <div className="mb-3">
                            <label htmlFor="exampleFormControlTextarea1" className="form-label">
                              Type <span style={{ color: "red"}}>*</span> :
                              { typesError && <span style={{ color: "red"}} >{ typesError }</span>}  
                            </label>
                            <select name="types" type="text" value={type.id}
                              onChange={(e) => setType({id : e.target.value}) }
                              className="form-control" id="exampleFormControlTextarea1" >
                                 { stateT.map( type =>
                                      <option  value={type.id} key={type.id}>{type.nom}</option>
                                   )}

                           </select>          
                          </div>

                           {/* <div className="mb-3">

                               <input name="userCreate"
                                      type="hidden" min="0"
                                      value={userCreate}
                                      onChange={(e) => setUserCreate(e.target.value) }
                                      className="form-control" id="exampleFormControlInput1" placeholder="userCreate"/>
                            </div> */}

                           <div className="form-check">
                             <input className="form-check-input" type="checkbox"
                                activer={activer}
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

export default EditParametre;