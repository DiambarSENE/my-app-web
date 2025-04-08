import React, {useCallback, useContext, useEffect, useState} from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import { faCheckCircle, faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DataTable from 'react-data-table-component';
import Connexion from '../utilisateurs/connexion';
import { AppContextAccessEntreprise, AppContextToken, useAuth } from '../../../useContext/contextStateUser';
import Preload from '../../templates/preload';
import Header from '../../templates/header';
import SideNav from '../../templates/SideNav';
import Footer from '../../templates/Footer';
import DeleteAccessEntreprise from './deleteAccessEntreprise';
import AddAccessEntreprise from './addAccessEntreprise';
import EditAccessEntreprise from './editAccessEntreprise';
import DetailsAccessEntreprise from './detailsAccessEntreprise';


function ListAccessEntreprise(){
  const navigate = useNavigate();
  const {id} = useParams();
  const typeId = parseInt(id);

  const { stateAccessEntreprise, setStateAccessEntreprise } = useContext(AppContextAccessEntreprise);
  const [stateNameType, setStateNameType] = useState("");
  //j'utilise le token pour la redirection entre le page d'accueil et la page de connexion
  //const {stateToken , setStateToken} = useContext(AppContextToken);
   const {stateToken} = useAuth(); // ✅ Récupère correctement le token depuis le contexte

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


     
    //  useEffect(() => {
    //     handlerGetParametreByIdType(typeId);
    //     handleFindNameType(typeId);
    // },[typeId]);

    // const handlerGetParametreByIdType = (typeId) => {
    //     getParametreByIdType(typeId)
    //         .then( resp => {
    //             setStateAccessEntreprise(resp.data);
    //     })
    //     .catch((err) => {
    //         console.log(err)
    //     });
    // };

    // const handleFindNameType = (typeId) => {
    //     getTypeById(typeId).then(response => {
    //       setStateNameType(response.data.name);
    //     }).catch(error => {
    //       console.log(error);
    //     })
    // };

    // const handleActiveParametre = (parametre) => {
    //     updatePropertyiSActivated(parametre).then((resp)=>{
    //         const newParametres = stateAccessEntreprise.map((p)=>{
    //             if(p.id === parametre.id){
    //                 p.activer = !p.activer
    //             }
    //             return p;
    //         });
    //         setStateAccessEntreprise(newParametres)
    //     })
    // };

    function handleFilter(e) {
        const searchText = e.target.value.toLowerCase();
      
        if (searchText === "") {
          //   getParametreByIdType(typeId)
          //     .then( resp => {
          //       setStateAccessEntreprise(resp.data);
          // })
          // .catch((err) => {
          //     console.log(err)
          // });
        } else {
          const records = stateAccessEntreprise.filter((row) => {
            return row.name.toLowerCase().includes(searchText);
          });
          setStateAccessEntreprise(records);
        }
      }
     
    const columns = [
      {
        name: "Prenom",
        selector: row => row.prenom,
        sortable: true,
        cell: row => <div>{row?.utilisateurDto?.prenom ? (row.utilisateurDto.prenom) : "Non définu"}</div>,
        style: {
          width: '100px'
          }
     },
      {
        name: "Nom",
        selector: row => row.nom,
        sortable: true,
        cell: row => <div>{row?.utilisateurDto?.nom ? (row.utilisateurDto.nom) : "Non définu"}</div>,
        style: {
          width: '100px'
          }
       },
       {
        name: "Entreprise",
        selector: row => row.entreprise,
        sortable: true,
        cell: row => <div>{row?.entrepriseDto?.nom ? (row.entrepriseDto.nom) : "Non définu"}</div>,
        style: {
          width: '100px'
          }
     },
        {
            name: "Proprietaire",
            cell: (row) => (
              <div>
                  <FontAwesomeIcon icon={row.proprietaire ? faCheckCircle : faCircle}
                  />
              </div>
            ),
            sortable: true
        },
        {
            name : "Admin",
            cell: (row) => (
                <div>
                    <FontAwesomeIcon icon={row.admin ? faCheckCircle : faCircle}
                    />
                </div>
              ),
            sortable: true
        },
        {
          name : "Gerant",
          cell: (row) => (
              <div>
                  <FontAwesomeIcon icon={row.gerant ? faCheckCircle : faCircle}
                  />
              </div>
            ),
          sortable: true
          },
          {
            name : "Gestionnaire",
            cell: (row) => (
              <div>
                  <FontAwesomeIcon icon={row.gestionnaire ? faCheckCircle : faCircle}
                  />
              </div>
            ),
            sortable: true
        },
        {
            name : "Caissier",
            cell: (row) => (
              <div>
                  <FontAwesomeIcon icon={row.caissier ? faCheckCircle : faCircle}
                  />
              </div>
            ),
            sortable: true
        },
        {
          name : "Vendeur",
          cell: (row) => (
            <div>
                <FontAwesomeIcon icon={row.vendeur ? faCheckCircle : faCircle}
                />
            </div>
          ),
          sortable: true
      },
      {
        name : "e_commerce",
        cell: (row) => (
          <div>
              <FontAwesomeIcon icon={row.e_commerce ? faCheckCircle : faCircle}
              />
          </div>
        ),
        sortable: true
      },
          {
            name:"Opérqtions",
            cell: row => (
              <div className="dropdown"><button className="btn btn-primary tp-btn-light sharp" type="button" data-bs-toggle="dropdown"><span className="fs--1"><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd"><rect x={0} y={0} width={24} height={24} /><circle fill="#000000" cx={5} cy={12} r={2} /><circle fill="#000000" cx={12} cy={12} r={2} /><circle fill="#000000" cx={19} cy={12} r={2} /></g></svg></span></button>
                <div className="dropdown-menu dropdown-menu-end border py-0">
                    <div className="py-2">
                  
                        < EditAccessEntreprise id={row.id} />  
                         < DeleteAccessEntreprise id={row.id} /> 
                         < DetailsAccessEntreprise id={row.id} />
                  </div>
                  </div>
                </div>
                ),
                sortable: true
          }
    ];

    
   //const addParametre = () => {
     //  navigate("/addParametre")
    //};
    // const listType = () => {
    //    navigate("/listType")
    // };
    // const listParametre = () => {
    //    navigate("/listParametre")
    // };

    return(
        <>
          <Preload/>
          <div id="main-wrapper">
          {/* {
             !stateToken || stateToken === "null" ? (
              <Connexion />
             
              ) :
               (
                <> */}
                  <Header/>
                  <SideNav/>
                  <div className="content-body">
                    <div className="container-fluid">
                  
                      <div className="project-page d-flex justify-content-between align-items-center flex-wrap">
                        <div className="project mb-4">
                          <ul className="nav nav-tabs" role="tablist">
                            {/* <li className="nav-item">
                              <a className="nav-link" data-bs-toggle="tab" href="#AllStatus" onClick={ listParametre } role="tab">List Parametre</a>
                            </li>
                            <li className="nav-item">
                              <a className="nav-link" data-bs-toggle="tab" href="#OnProgress" onClick={ listType } role="tab">List Type</a>
                            </li> */}
                          </ul>
                        </div>
                        <div className="mb-4">
                          { < AddAccessEntreprise /> }
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
                                      <ol className="breadcrumb">
                                          <li className="breadcrumb-item active"><a href="javascript:void(0)">Parametrages</a></li>
                                          <li className="breadcrumb-item"><a href="javascript:void(0)"> {stateNameType} </a></li>
                                      </ol>
                                    </div>
                                    <div className="card-body">
                                  <div >
                                  <div>
    
                                      <div className='text-end'><input type='text' onChange={ handleFilter }/></div>
                                      
                                      <br/>
                                    <DataTable 
                                          columns={columns} 
                                          data={stateAccessEntreprise} 
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
          }      */}
          </div>
        </>
        
        );
}

export default ListAccessEntreprise;