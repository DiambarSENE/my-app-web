import React, { useCallback, useContext, useEffect } from 'react';
import { faCheckCircle, faCircle} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router';

import EditAccessBackend from './editAccessBackend';
import DeleteAccessBackend from './deleteAccessBackend';
import AddAccessBackend from './addAccessBackend';
import { getAllAccessBackEnds, updateAccessBackEndPartiel } from '../../../servicesApi/microservice-utilisateur';
import Preload from '../../templates/preload';
import Header from '../../templates/header';
import SideNav from '../../templates/SideNav';
import Footer from '../../templates/Footer';
import { AppContextAccessBackEnd, useAuth } from '../../../useContext/contextStateUser';
import DetailsAccessBackend from './detailsAccessBackend';

function ListAccessBackend(){
  const navigate = useNavigate();
  //j'utilise le token pour la redirection entre le page d'accueil et la page de connexion
  // const {stateToken } = useContext(AppContextToken);
  const { stateToken } = useAuth(); // ✅ Récupère correctement le token depuis le contexte

  const { stateAccessBackEnd, setStateAccessBackEnd } = useContext(AppContextAccessBackEnd);
  // <gerer la redirection vers la page de connexion si le token n'existe pas>
  const handlerRedirection = useCallback(() => {
    if(!stateToken){
      navigate('/');
    }
  }, [stateToken, navigate]);
      
  useEffect(() => {
   // console.log("Valeur de stateToken :", stateToken);
    handlerRedirection();
  }, [handlerRedirection]);
       
  // </gerer la redirection vers la page de connexion si le token n'existe pas>
  
  const handleActiverAccessBackend = (accessBackend) => {
    updateAccessBackEndPartiel(accessBackend).then((resp) =>{

      const newAccessBackends = stateAccessBackEnd.map((f) => {
          if(f.id === accessBackend.id){
              f.activer = !f.activer;
          }
          return f;
      });
        setStateAccessBackEnd(newAccessBackends);
      });
  };


    const columns = [        
        {
            name: "Prénom",
            selector: row => row.prenom,
            sortable: true,
            cell: row => <div>{row?.utilisateurDto?.prenom ? (row.utilisateurDto.prenom) : "Non définu"}</div>,
            style: {
              width: '100px'
              }
            //cell: (row) => <div style={{ fontWeight: "bold" }}>{row.nom}</div>,
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
          name: "Super Admin",
          cell: (row) => (
            <div>
                <FontAwesomeIcon icon={row.superAdmin ? faCheckCircle : faCircle}
                />
            </div>
          ),
          sortable: true,
          //cell: (row) => <div style={{ fontWeight: "bold" }}>{row.nom}</div>,
        },
        {
            name: "Super Admin",
            cell: (row) => (
              <div>
                  <FontAwesomeIcon icon={row.superAdmin ? faCheckCircle : faCircle}
                  />
              </div>
            ),
            sortable: true,
            //cell: (row) => <div style={{ fontWeight: "bold" }}>{row.nom}</div>,
        },
        {
          name: "Admin",
          cell: (row) => (
            <div>
                <FontAwesomeIcon icon={row.admin ? faCheckCircle : faCircle}
                />
            </div>
          ),
          sortable: true
        },
        {
          name: "Accompagnateur",
          cell: (row) => (
            <div>
                <FontAwesomeIcon icon={row.accompagnateur ? faCheckCircle : faCircle}
                />
            </div>
          ),
          sortable: true
        },
        {
          name: "Editeur Catalogue",
          cell: (row) => (
            <div>
                <FontAwesomeIcon icon={row.editeurCatalogue ? faCheckCircle : faCircle}
                />
            </div>
          ),
          sortable: true
        },
       
        {
            name: "Activer/desactiver",
            cell: (row) => (
              <div>
                <button onClick={() => handleActiverAccessBackend(row)} className="btn btn-outline-primary">
                  <FontAwesomeIcon icon={row.activer ? faCheckCircle : faCircle}
                  />
                </button>
              </div>
            ),
            sortable: true,
          },
          {
              name:"Opérqtions",
              cell: row => (
                <div className="dropdown"><button className="btn btn-primary tp-btn-light sharp" type="button" data-bs-toggle="dropdown"><span className="fs--1"><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd"><rect x={0} y={0} width={24} height={24} /><circle fill="#000000" cx={5} cy={12} r={2} /><circle fill="#000000" cx={12} cy={12} r={2} /><circle fill="#000000" cx={19} cy={12} r={2} /></g></svg></span></button>
                  <div className="dropdown-menu dropdown-menu-end border py-0">
                      <div className="py-2">
                         < EditAccessBackend id={row.id} />  
                    
                          < DeleteAccessBackend id={row.id}/>
                          < DetailsAccessBackend id={row.id} />
                      </div>
                  </div>
                </div>  
                ),
                sortable: true
                
          }
    ];

    function handleFilter(e) {
        const searchText = e.target.value.toLowerCase();
      
        if (searchText === "") {
            getAllAccessBackEnds()
                .then( resp => {
                    setStateAccessBackEnd(resp.data);
                })
                .catch((err) => {
                    console.log(err)
            });
        } else {
           const records = stateAccessBackEnd.filter((row) => {
            return row.utilisateurDto?.nom.toLowerCase().includes(searchText);
          });
          setStateAccessBackEnd(records);
        }
      }


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
                <Header/>
                <SideNav />
                <div className="content-body">
                  <div className="container-fluid">
                    <div className="project-page d-flex justify-content-between align-items-center flex-wrap">
                      <div className="project mb-4">
                        <ul className="nav nav-tabs" role="tablist">
                          {/* <li className="nav-item">
                            <a className="nav-link" data-bs-toggle="tab" href="#AllStatus" onClick={ listParametre } role="tab">List Parametre</a>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link active" data-bs-toggle="tab" href="#OnProgress" onClick={ listType } role="tab">List Type</a>
                          </li> */}
                        </ul>
                      </div>
                      <div className="mb-4">
                          { < AddAccessBackend /> }
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
                                    <h4 className="card-title">Liste des accessBackend</h4>
                                  </div>
                                  <div className="card-body">
                                <div >
                                <div>
      
                                    <div className='text-end'><input type='text' onChange={ handleFilter }/></div>
                                    <br/>
                                  <DataTable 
                                        columns={columns} 
                                        data={stateAccessBackEnd} 
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
                <Footer /> 
            {/* </>
          )
      }      */}
      </div>
    </>

    );
}
export default ListAccessBackend;