import React, { useContext, useEffect } from "react"; 
import Footer from "../templates/Footer";
import SideNav from "../templates/SideNav";
import Header from "../templates/header";
import DataTable from "react-data-table-component";
import { getAllRoles } from "../../servicesApi/microservice-utilisateur";
import { AppContextRole, AppContextToken } from "../../useContext/contextStateUser";
import EditerRole from "./editerRole";
import DeleteRole from "./deleteRole";
import AddRole from "./addRole";
import Connexion from "../utilisateurs/connexion";
import Preload from "../templates/preload";

function ListRole(){
   //j'utilise le token pour la redirection entre le page d'accueil et la page de connexion
   const {stateToken , setStateToken} = useContext(AppContextToken);
  const { userRoles, setUserRoles} = useContext(AppContextRole);


  function handleFilter(e) {
    const researchText = e.target.value.toLowerCase();
    if(researchText === ""){
       getAllRoles().then(resp => {
        setUserRoles(resp.data)
       })
    }else{
      const recors = userRoles.filter((row) => {
          return row.nom.toLowerCase().includes(researchText);
      });
      setUserRoles(recors);
    }
  }

  const columns = [
      {
          name : "Nom",
          selector:row => row.nom,
          sortable: true
      },
      {
          name: "Description",
          selector: row => row.description,
          sortable: true
      },
      {
          name:"Date de creation",
          selector: row => row.dateCreation,
          sortable: true
      },
      {
          name:"UserCreate",
          selector: row => row.userId,
          sortable: true
      },
      {
          name:"Operations",
          cell: row => (
                <div className="dropdown"><button className="btn btn-primary tp-btn-light sharp" type="button" data-bs-toggle="dropdown"><span className="fs--1"><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd"><rect x={0} y={0} width={24} height={24} /><circle fill="#000000" cx={5} cy={12} r={2} /><circle fill="#000000" cx={12} cy={12} r={2} /><circle fill="#000000" cx={19} cy={12} r={2} /></g></svg></span></button>
                  <div className="dropdown-menu dropdown-menu-end border py-0">
                      <div className="py-2">
                      { < EditerRole roleId={row.id} /> }
                        
                          { < DeleteRole roleId={row.id} />  }   
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
            < Connexion />
          ) :
          (
            <> */}
            <Header />
            <SideNav />
           
            <div className="content-body">
            {/* <br/>
            <div  className="ms-4 mb-3">
                   
    
            </div> */}
          <div className="container-fluid">
            <div className="project-page d-flex justify-content-between align-items-center flex-wrap">
              <div className="project mb-4">

              </div>
              <div className="mb-4">
                  { < AddRole />}
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
                            <h4 className="card-title">Liste des Roles</h4>
                          </div>
                          <div className="card-body">
                        <div >
                        <div>

                            <div className='text-end'><input type='text' onChange={ handleFilter }/></div>
                            <br/>
                        <DataTable 
                                columns={columns} 
                                data={userRoles}  
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

export default ListRole;