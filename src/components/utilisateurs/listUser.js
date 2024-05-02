import React, { useContext } from "react"; 
import Footer from "../templates/Footer";
import SideNav from "../templates/SideNav";
import Header from "../templates/header";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faCircle } from "@fortawesome/free-solid-svg-icons";
import DeleteUser from "./deleteUser";
import EditerUser from "./editerUser";
import { getAuthToken, getUsers, updateEtatActiverDesactiver } from "../../servicesApi/microservice-utilisateur";
import { AppContextRole, AppContextToken, AppContextUtilisateur } from "../../useContext/contextStateUser";
import AddUser from "./addUser.js";
import { updatePropertyiSActivated } from "../../servicesApi/microservice-parametre";
import Connexion from "./connexion";

function ListUser(){
   //j'utilise le token pour la redirection entre le page d'accueil et la page de connexion
   const {stateToken , setStateToken} = useContext(AppContextToken);
  const { stateUtilisateur, setStateUtilisateur} = useContext(AppContextUtilisateur);


  function handleFilter(e) {
    const researchText = e.target.value.toLowerCase();
    if(researchText === ""){
       getUsers().then(resp => {
        setStateUtilisateur(resp.data)
       })
    }else{
      const recors = stateUtilisateur.filter((row) => {
          return row.nom.toLowerCase().includes(researchText);
      });
      setStateUtilisateur(recors);
    }
  }

  const handleActiveUser = (user) => {
    updateEtatActiverDesactiver(user).then((resp)=>{
        const newUsers = stateUtilisateur.map((u)=>{
            if(u.id === user.id){
                u.isActivated = !u.isActivated
            }
            return u;
        });
        setStateUtilisateur(newUsers)
    })
};

  const columns = [
      {
          name: "Prenom",
          selector: row => row.prenom,
          sortable: true
      },
      {
          name : "Nom",
          selector:row => row.nom,
          sortable: true
      },
      {
          name: "Telephone",
          selector: row => row.telephone,
          sortable: true
      },
      {
          name: "Matricule",
          selector: row => row.matricule,
          sortable: true
      },
      {
          name: "Email",
          selector: row => row.email,
          sortable: true
      },
      {
          name:"Date de creation",
          selector: row => row.dateCreation,
          sortable: true
      },
      // {
      //     name:"UserCreate",
      //     selector: row => row.userCreate,
      //     sortable: true
      // },
      {
        name: "Etat",
        cell: (row) => (
          <div>
            { <button onClick={() => handleActiveUser(row)} className="btn btn-outline-primary">
              <FontAwesomeIcon icon={row.isActivated ? faCheckCircle : faCircle}
              />
            </button> }
          </div>
        ),
        sortable: true,
      },
      {
          name:"Operations",
          cell: row => (
                <div className="dropdown"><button className="btn btn-primary tp-btn-light sharp" type="button" data-bs-toggle="dropdown"><span className="fs--1"><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd"><rect x={0} y={0} width={24} height={24} /><circle fill="#000000" cx={5} cy={12} r={2} /><circle fill="#000000" cx={12} cy={12} r={2} /><circle fill="#000000" cx={19} cy={12} r={2} /></g></svg></span></button>
                  <div className="dropdown-menu dropdown-menu-end border py-0">
                      <div className="py-2">
                      { < EditerUser userId={row.id} /> }
                        
                          { < DeleteUser userId={row.id} />  }   
                      </div>
                  </div>
              
              </div>

              
                    

            ),
            sortable: true
      }
    ];
    return(
        <>
          {
             !stateToken || stateToken === "null" ? ( 
              <Connexion/>
              ) :
              (
              <>
                <Header />
                <SideNav />
              
                <div className="content-body">
                    <br/>
                    <div  className="ms-4 mb-3">
                            { < AddUser />}
                            {' '}
                            <button className="btn btn-secondary btn-rounded fs-18">+Ajouter un personnel</button>
                    </div>
                    <div className="container-fluid">
                  <div className="project-page d-flex justify-content-between align-items-center flex-wrap">
                    <div className="project mb-4">
                      <ul className="nav nav-tabs" role="tablist">
                       
                        <li className="nav-item">
                          <a className="nav-link active" data-bs-toggle="tab"
                          //  href="#AllStatus" onClick='' 
                          role="tab">Liste des personnels</a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" data-bs-toggle="tab" 
                          // href="#OnProgress" onClick='' 
                          role="tab">Liste des accompagnateurs</a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" data-bs-toggle="tab" 
                          // href="#OnProgress" onClick='' 
                          role="tab">Liste des ingenieurs</a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" data-bs-toggle="tab"
                          //  href="#OnProgress" onClick='' 
                          role="tab">Assistant(e)</a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" data-bs-toggle="tab" 
                          // href="#OnProgress" onClick='' 
                          role="tab">Liste des accompagnateurs</a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" data-bs-toggle="tab" 
                          // href="#OnProgress" onClick='' 
                          role="tab">Admin</a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" data-bs-toggle="tab" 
                          // href="#OnProgress" onClick='' 
                          role="tab">Super Admin</a>
                        </li>
                      </ul>
                    </div>
                  </div>	
                <div className="row">
                    <div className="col-xl-12">
                      <div className="tab-content">
                        <div className="tab-pane fade active show" id="AllStatus">
                          
                          <div className="row">
                            <div className="col-12">
                              <div className="card">
                                <div className="card-header">
                                  <h4 className="card-title">Liste des personnels</h4>
                                </div>
                                <div className="card-body">
                              <div >
                              <div>

                                  <div className='text-end'><input type='text' onChange={ handleFilter }/></div>
                                  <br/>
                              <DataTable 
                                      columns={columns} 
                                      data={stateUtilisateur}  
                                      fixedHeader
                                      pagination
                                      striped
                                      /> 
                      </div>
                    </div>
                    </div>
                    </div>
                    </div>
                    </div>
                    </div>
                    </div>
                    </div>
                    </div>
                    </div>
                </div>
                <Footer/>
              </>
              )
          }
        </>
    )
}

export default ListUser;