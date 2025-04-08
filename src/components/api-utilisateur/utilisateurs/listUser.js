import React, { useCallback, useContext, useEffect } from "react"; 
import { Link, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faCircle } from "@fortawesome/free-solid-svg-icons";
import DeleteUser from "./deleteUser";
import EditerUser from "./editerUser";
import AddUser from "./addUser.js";
import Connexion from "./connexion";
import Preload from "../../templates/preload.js";
import { AppContextToken, AppContextUtilisateur, useAuth, useUsers } from "../../../useContext/contextStateUser.js";
import Header from "../../templates/header.js";
import Footer from "../../templates/Footer.js";
import SideNav from "../../templates/SideNav.js";
import { getAuthToken, getUsers, updateEtatActiver } from "../../../servicesApi/microservice-utilisateur.js";
import DetailUser from "./detailUser.js";

function ListUser(){
   const navigate = useNavigate();
   //j'utilise le token pour la redirection entre le page d'accueil et la page de connexion
   //const {stateToken , setStateToken} = useContext(AppContextToken);
    const {stateToken} = useAuth(); // ✅ Récupère correctement le token depuis le contexte
   //const { stateUtilisateur, setStateUtilisateur} = useContext(AppContextUtilisateur);
   const { users, setUsers } = useUsers(); // ✅ Récupérer la liste des utilisateurs
   
  // <gerer la redirection vers la page de connexion si le token n'existe pas>
  const handlerRedirection = useCallback(() => {
      if(!stateToken || stateToken === null){
          navigate('/');
      }
  }, [stateToken, navigate]);
 
  useEffect(() => {
      handlerRedirection();
  }, [handlerRedirection]);
// </gerer la redirection vers la page de connexion si le token n'existe pas>

useEffect(() => {
  console.log("Liste des utilisateurs:", users); // Affiche la liste dans la console
}, [users]); // Ré-exécute le useEffect si la liste change


  function handleFilter(e) {
    const researchText = e.target.value.toLowerCase();
    if(researchText === ""){
       getUsers().then(resp => {
        setUsers(resp.data)
       })
    }else{
      const recors = users.filter((row) => {
          return row.nom.toLowerCase().includes(researchText);
      });
      setUsers(recors);
    }
  }

  const handleActiveUser = (user) => {
    updateEtatActiver(user).then((resp)=>{
        const newUsers = users.map((u)=>{
            if(u.id === user.id){
                u.activer = !u.activer
            }
            return u;
        });
        setUsers(newUsers)
    })
};

  const columns = [
      {
          name: "Prénom",
          selector: row => row.prenom,
          sortable: true
      },
      {
          name : "Nom",
          selector:row => row.nom,
          sortable: true
      },
      {
          name: "Téléphone",
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
        name: "Adresse",
        selector: row => row.adresse,
        sortable: true
      },
      {
          name:"Date de création",
          selector: row => row.createAt,
          sortable: true
      },
      // {
      //     name:"UserCreate",
      //     selector: row => row.userCreate,
      //     sortable: true
      // },
      {
        name: "Activer",
        cell: (row) => (
          <div>
            { <button onClick={() => handleActiveUser(row)} className="btn btn-outline-primary">
              <FontAwesomeIcon icon={row.activer ? faCheckCircle : faCircle}
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
                       < EditerUser userId={row.id} /> 
                        
                        < DeleteUser userId={row.id} /> 
                        < DetailUser userId={row.id} /> 
                      </div>
                  </div>
              
              </div>

              
                    

            ),
            sortable: true
      }
  ];


    return(
        <>
         <Preload/>
         <div id="main-wrapper">
          {/* {
             !stateToken || stateToken === "null" ? ( 
              <Connexion/>
              ) :
              (
              <>*/}
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
                                      data={users}  
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
              {/* </>
              )
          } */}
          </div>
        </>
    )
}

export default ListUser;