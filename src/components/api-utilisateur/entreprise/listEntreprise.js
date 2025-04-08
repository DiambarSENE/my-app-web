import React, { useCallback, useContext, useEffect } from "react"; 
import Footer from "../../templates/Footer";
import SideNav from "../../templates/SideNav";
import Header from "../../templates/header";
import DataTable from "react-data-table-component";
import { getAllEntreprises } from "../../../servicesApi/microservice-utilisateur";
import { AppContextEntreprise,  useAuth } from "../../../useContext/contextStateUser";
import Preload from "../../templates/preload";
import { useNavigate } from "react-router";
import DetailsEntreprise from "./detailsEntreprise.js";

function ListEntreprise(){
  const navigate = useNavigate();
  //j'utilise le token pour la redirection entre le page d'accueil et la page de connexion
  //const {stateToken , setStateToken} = useContext(AppContextToken);
   const {stateToken} = useAuth(); // ✅ Récupère correctement le token depuis le contexte
  const { stateEntreprise, setStateEntreprise} = useContext(AppContextEntreprise);

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
    

  function handleFilter(e) {
    const researchText = e.target.value.toLowerCase();
    if(researchText === ""){
       getAllEntreprises().then(resp => {
        setStateEntreprise(resp.data)
       })
    }else{
      const recors = stateEntreprise.filter((row) => {
          return row.nom.toLowerCase().includes(researchText);
      });
      setStateEntreprise(recors);
    }
  }
//updateAt; createBy; updateBy; activer;categorie; type;

  const columns = [
      {
          name : "Nom",
          selector:row => row.nom,
          sortable: true
      },
      {
        name: "Libelle",
        selector: row => row.labelle,
        sortable: true
    },
      {
        name : "Telephone",
        selector:row => row.telephone,
        sortable: true
      },
      {
        name : "Email",
        selector:row => row.email,
        sortable: true
      },
      {
        name : "Adresse",
        selector:row => row.adresse,
        sortable: true
      },
      {
        name : "Pays",
        selector:row => row.pays,
        sortable: true
      },
      {
        name : "Tva1",
        selector:row => row.tva1,
        sortable: true
      },
      {
        name : "Tva2",
        selector:row => row.tva2,
        sortable: true
      },
      {
        name : "Ninea",
        selector:row => row.ninea,
        sortable: true
      },
      {
        name : "registreDeCommerce",
        selector:row => row.registreDeCommerce,
        sortable: true
      },
      {
          name:"Date de creation",
          selector: row => row.createAt,
          sortable: true
      },
      {
          name:"cree par",
          selector: row => row.createBy,
          sortable: true
      },
      {
          name:"Operations",
          cell: row => (
                <div className="dropdown"><button className="btn btn-primary tp-btn-light sharp" type="button" data-bs-toggle="dropdown"><span className="fs--1"><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd"><rect x={0} y={0} width={24} height={24} /><circle fill="#000000" cx={5} cy={12} r={2} /><circle fill="#000000" cx={12} cy={12} r={2} /><circle fill="#000000" cx={19} cy={12} r={2} /></g></svg></span></button>
                  <div className="dropdown-menu dropdown-menu-end border py-0">
                      <div className="py-2">
                       {/* < EditerEntreprise entrepriseId={row.id} /> 
                        
                         < DeleteEntreprise entrepriseId={row.id} />   */}
                         < DetailsEntreprise entrepriseId={row.id} />
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
                   {/* < AddEntreprise /> */}
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
                            <h4 className="card-title">Liste des Entreprises</h4>
                          </div>
                          <div className="card-body">
                        <div >
                        <div>

                            <div className='text-end'><input type='text' onChange={ handleFilter }/></div>
                            <br/>
                        <DataTable 
                                columns={columns} 
                                data={stateEntreprise}  
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

export default ListEntreprise;