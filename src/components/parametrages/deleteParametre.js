import React, { useState, useContext, useEffect } from 'react';
import { deleteParametre, getParametreById } from '../../servicesApi/microservice-parametre';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Header from '../templates/header';
import Footer from '../templates/Footer';
import SideNav from '../templates/SideNav';
import { AppContextParam, AppContextParamByType } from '../../useContext/context';

function DeleteParametre({parametreId}) {
    //const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { stateParametreByType, setStateParametreByType } = useContext(AppContextParamByType);
    //const { stateParametre, setStateParametre} = useContext(AppContextParam);

    const [ name, setName ] =  useState("");
    const [userCreate, setUserCreate] = useState("");
    const [symbole, setSymbole] = useState("");
    const [types, setTypes] = useState("");
    const [isActivated, setIsActivated] = useState(false);

      useEffect( () => {
         handleGetParametreById(parametreId);
      }, []);
      
      const handleGetParametreById = (parametreId) => {
        getParametreById(parametreId).then( resp => {
            let parametre = resp.data;
            setName(parametre.name);
            setSymbole(parametre.symbole);
            setTypes(parametre.type.name);
            setUserCreate(parametre.userCreate);
            setIsActivated(parametre.isActivated);
        });
      }


    
    const handleDeleteParametre = (e) => {
      e.preventDefault();
      deleteParametre(parametreId)
          .then(resp =>{
            const newParametres = stateParametreByType.filter((t) => t.parametreId !== parametreId);
            setStateParametreByType(newParametres);
            alert(resp.data);
          })
          .catch(err => {
            console.log(err)
        });
  };
     //const cancel = () => {
       //  navigate("/listtype");
    //};
    return(
        <>
       {/* <Header />
       <SideNav/> */}
          <button  onClick={handleShow} className="btn btn-outline-danger">
              <FontAwesomeIcon icon={faTrash}>
              </FontAwesomeIcon>
          </button>

          <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Confirmation de la Suppression</Modal.Title>
              </Modal.Header>
              <Modal.Body>


              <form>

          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Nom:
            </label>
            <input name="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value) }
                  className="form-control" id="exampleFormControlInput1" placeholder="le nom du parametre" disabled></input>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">Symbole :</label>
            <input  name="symbole"
                    type="text"
                    value={symbole}
                    onChange={(e) => setSymbole(e.target.value) }
                      className="form-control" id="exampleFormControlTextarea1" disabled></input>
          </div>
          <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">Type :</label>
          <input  name="symbole"
                    type="text"
                    value={types}
                    onChange={(e) => setTypes(e.target.value) }
                      className="form-control" id="exampleFormControlTextarea1" disabled></input>
            
          </div>

          <div className="mb-3">

              <input name="userCreate"
                    type="hidden" min="0"
                    value={userCreate}
                    onChange={(e) => setUserCreate(e.target.value) }
                    className="form-control" id="exampleFormControlInput1" placeholder="userCreate" disabled/>
          </div>

          <div className="form-check">
            <input className="form-check-input" type="checkbox"
              isActivated={isActivated}
              onChange={(e) => setIsActivated(e.target.checked) } disabled/>
            <label className="form-check-label" htmlFor="flexCheckChecked">
              Activated
            </label>
          </div>
          <br/>
          <div style={{color:"red"}}>Les champs qui ont (*) sont obligatoires</div>
          <div className="modal-footer">
            
              <button type="button" className="btn btn-danger light" onClick={handleClose}>Fermer</button>
              <button type="button" className="btn btn-primary" onClick={ handleDeleteParametre}>- Supprimer</button>
              
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
export default DeleteParametre;