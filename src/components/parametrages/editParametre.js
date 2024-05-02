import React, { useState, useEffect, useContext } from 'react';
import { useNavigate  } from 'react-router-dom';
import {updateParametre, getParametreById, getTypes, getParametres, getParametreByIdType} from '../../servicesApi/microservice-parametre';
import {  faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from 'react-bootstrap/Modal';
import { ValidationName, ValidationTypes } from '../../validateur/validation';
import Header from '../templates/header';
import Footer from '../templates/Footer';
import SideNav from '../templates/SideNav';
import { AppContext, AppContextParam, AppContextParamByType } from '../../useContext/context';
import { AppContextIdUserByToken } from '../../useContext/contextStateUser';

function EditParametre({parametreId}) {
      const [show, setShow] = useState(false);
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);
      //permet de requiperer l'identifiant de l'utilisateur ensuite de l'utiliser dans le methode d'ajoute
      const {stateIdUserFromToken, setStateIdUserFromToken} = useContext(AppContextIdUserByToken);
      const { stateParametreByType, setStateParametreByType } = useContext(AppContextParamByType);
      // const {stateParametre, setStateParametre } = useContext(AppContextParam);
      const { stateT, setStateT } = useContext(AppContext);
      //const {id} = useParams();
      //const parametreId = parseInt(id);
      const navigate = useNavigate();

      const [name, setName ] =  useState("");
      const [symbole, setSymbole] = useState("");
      const [types, setTypes] = useState("");
      //const userId = stateIdUserFromToken;
      //const [userCreate, setUserCreate] = useState(userId);
      const [isActivated, setActivated] = useState(false);

      const [nameError, setNameError] = useState("");
      const [typesError, setTypesError] = useState("");

      useEffect( () => {
         handleGetParametreById(parametreId);
      }, []);
      
      const handleGetParametreById = (parametreId) => {
        getParametreById(parametreId).then( resp => {
            let parametre = resp.data;
            setName(parametre.name);
            setSymbole(parametre.symbole);
            setTypes(parametre.type.name);
            //setUserCreate(parametre.userCreate);
            setActivated(parametre.isActivated);

        });
      }

      const handleUpdateParametre = (e) => {
        e.preventDefault();
        const userCreate = stateIdUserFromToken;
        const nameError = ValidationName(name);
        const typesError = ValidationTypes(types);
        let parametre = { parametreId, name, symbole, types, userCreate, isActivated };
        if(!nameError && !typesError){
          updateParametre(parametre).then( resp =>{
            //navigate("/listParametre")
            {handleClose();}
            alert("parametre modifier avec success");
            setName("");
            setSymbole("");
            setTypes("");
            //setUserCreate("");
            setActivated(false);

            // getParametres()
            //   .then( resp => {
            //     setStateParametre(resp.data);
            // })
            
           //j'ai utilise ici de methode juste pour la mise a jour du tableux c'est a dire afficher les donnees modifiees sans reflechir la page
            getParametreByIdType(resp.data.type.typeId)
            .then( resp => {
                setStateParametreByType(resp.data);
            })
              .catch((err) => {
                console.log(err)
              });
          });
        }else{
          setNameError(nameError)
          setTypesError(types)
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
                  <Modal.Title>Modification d un Parametre</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <form onSubmit={ handleUpdateParametre } >

                           <div className="mb-3">
                             <label htmlFor="exampleFormControlInput1" className="form-label">
                                Nom <span style={{color:"red"}}>*</span> :
                                {nameError && <span style={{color:"red"}}>{ nameError }</span> }
                              </label>
                             <input name="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value) }
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
                            <select name="types" type="text" value={types}
                              onChange={(e) => setTypes(e.target.value) }
                              className="form-control" id="exampleFormControlTextarea1" >
                                 { stateT.map( type =>
                                      <option  value={type.name} key={type.typeId}>{type.name}</option>
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
                                isActivated={isActivated}
                                onChange={(e) => setActivated(e.target.checked) } />
                             <label className="form-check-label" htmlFor="flexCheckChecked">
                               Activated
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