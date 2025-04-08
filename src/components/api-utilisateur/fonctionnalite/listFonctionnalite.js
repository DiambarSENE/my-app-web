import React, { useCallback, useContext, useEffect } from 'react';
import { faCheckCircle, faCircle} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router';
import Header from '../../templates/header';
import Footer from '../../templates/Footer';
import SideNav from '../../templates/SideNav';
import { AppContextFonctionnalite,  useAuth } from '../../../useContext/contextStateUser';
import Preload from '../../templates/preload';
import DeleteFonctionnalite from './deleteFonctionnalite';
import EditFonctionnalite from './editFonctionnalite';
import { getAllFonctionnalites,  updateFonctionnalitePartial } from '../../../servicesApi/microservice-utilisateur';
import AddFonctionnalite from './addFonctionnalite';
import DetailsFonctionnalite from './detailsFonctionnalite';

function ListFonctionnalite(){
  const navigate = useNavigate();
  //j'utilise le token pour la redirection entre le page d'accueil et la page de connexion
 // const {stateToken } = useContext(AppContextToken);
  const {stateToken} = useAuth(); // ✅ Récupère correctement le token depuis le contexte

  const { stateFonctionnalite, setStateFonctionnalite } = useContext(AppContextFonctionnalite);
   
    
  // <gerer la redirection vers la page de connexion si le token n'existe pas>
  const handlerRedirection = useCallback(() => {
      if(!stateToken || stateToken === null){
          navigate('/');
      }
  },[stateToken, navigate]);
     
  useEffect(() => {
      handlerRedirection();
  }, [handlerRedirection]);
	// </gerer la redirection vers la page de connexion si le token n'existe pas>
	


    const handleActiverDesactiverFonctionnalite = (fonctionnalite) => {
        
       updateFonctionnalitePartial(fonctionnalite).then((resp) =>{
        const newFonctionnalites = stateFonctionnalite.map((f) => {
            if(f.id === fonctionnalite.id){
                f.activer = !f.activer;
            }
            return f;
        });
          setStateFonctionnalite(newFonctionnalites);
        });
    };

    const columns = [
        {
            name: "Nom",
            selector: row => row.nom,
            sortable: true,
        },
        {
          name: "Role(s)",
          selector: row =>
            row?.rolesDto && row.rolesDto.length > 0
              ? row.rolesDto.map(role => role.nom).join(", ")
              : "Aucun",
          //selector: row => row?.rolesDto?.map(role => role.nom).join(", "), //convertir en texte
          sortable: true
        },
        {
          name: "Date de Création",
          selector: row =>  row.createAt,
          sortable: true
        },
        {
            name: "Activer/desactiver",
            cell: (row) => (
              <div>
                <button onClick={() => handleActiverDesactiverFonctionnalite(row)} className="btn btn-outline-primary">
                  <FontAwesomeIcon icon={row.activer ? faCheckCircle : faCircle}
                  />
                </button>
              </div>
            ),
            sortable: true,
          },
          {
              name:"Opérations",
               cell: row => (
                    <div className="dropdown"><button className="btn btn-primary tp-btn-light sharp" type="button" data-bs-toggle="dropdown"><span className="fs--1"><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd"><rect x={0} y={0} width={24} height={24} /><circle fill="#000000" cx={5} cy={12} r={2} /><circle fill="#000000" cx={12} cy={12} r={2} /><circle fill="#000000" cx={19} cy={12} r={2} /></g></svg></span></button>
                      <div className="dropdown-menu dropdown-menu-end border py-0">
                          <div className="py-2">
                          < EditFonctionnalite id={row.id} />  
                    
                          < DeleteFonctionnalite id={row.id}/>

                          < DetailsFonctionnalite id={row.id}/>
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
            getAllFonctionnalites()
                .then( resp => {
                    setStateFonctionnalite(resp.data);
                })
                .catch((err) => {
                    console.log(err)
            });
        } else {
           const records = stateFonctionnalite.filter((row) => {
            return row.nom.toLowerCase().includes(searchText);
          });
          setStateFonctionnalite(records);
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
                          { < AddFonctionnalite /> }
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
                                    <h4 className="card-title">Liste des fonctionnalités</h4>
                                  </div>
                                  <div className="card-body">
                                <div >
                                <div>
      
                                    <div className='text-end'><input type='text' onChange={ handleFilter }/></div>
                                    <br/>
                                  <DataTable 
                                        columns={columns} 
                                        data={stateFonctionnalite} 
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
export default ListFonctionnalite;