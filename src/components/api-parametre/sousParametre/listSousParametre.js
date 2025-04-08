import React, { useCallback, useContext, useEffect } from 'react';
import { faCheckCircle, faCircle} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router';
import Header from '../../templates/header';
import Footer from '../../templates/Footer';
import SideNav from '../../templates/SideNav';
import Connexion from '../../api-utilisateur/utilisateurs/connexion';
import { AppContextToken, useAuth } from '../../../useContext/contextStateUser';
import { AppContextSousParametre } from '../../../useContext/context';
import EditSousParametre from './editFonctionnalite';
import DeleteSousParametre from './deleteSousParametre';
import AddSousParametre from './addSousParametre';
import { activerDesactiver, getAllSousParametres, updatePropertyActiver } from '../../../servicesApi/microservice-parametre';
import Preload from '../../templates/preload';

function ListSousParametre(){

  //j'utilise le token pour la redirection entre le page d'accueil et la page de connexion
  //const {stateToken , setStateToken} = useContext(AppContextToken);
   const {stateToken} = useAuth(); // ✅ Récupère correctement le token depuis le contexte

  const { stateSousParametre, setStateSousParametre } = useContext(AppContextSousParametre);
  
  const navigate = useNavigate();

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
      

    const handleActiverDesactiverSousParametre = (fonctionnalite) => {
        activerDesactiver(fonctionnalite).then((resp) =>{

        const newSousParametres = stateSousParametre.map((f) => {
            if(f.id === fonctionnalite.id){
                f.activer = !f.activer;
            }
            return f;
        });
          setStateSousParametre(newSousParametres);
        });
    };

    const columns = [
        {
            name: "Nom",
            selector: row => row.nom,
            sortable: true,
            //cell: (row) => <div style={{ fontWeight: "bold" }}>{row.nom}</div>,
        },
        {
          name: "description",
          selector: row =>  row.description,
          sortable: true
        },
        {
          name: "Date de Creation",
          selector: row =>  row.createAt,
          sortable: true
        },
        {
          name: "Créé par",
          selector: row =>  row.createBy,
          sortable: true
        },
        {
            name: "Activer/desactiver",
            cell: (row) => (
              <div>
                <button onClick={() => handleActiverDesactiverSousParametre(row)} className="btn btn-outline-primary">
                  <FontAwesomeIcon icon={row.activer ? faCheckCircle : faCircle}
                  />
                </button>
              </div>
            ),
            sortable: true,
          },
          {
              name:"Actions",
              cell: row => (
                  <div >
                         { < EditSousParametre id={row.id} />  }
                    
                         { < DeleteSousParametre id={row.id}/>}
                  </div>
                ),
                sortable: true
                
          }
    ];

    function handleFilter(e) {
        const searchText = e.target.value.toLowerCase();
      
        if (searchText === "") {
            getAllSousParametres()
                .then( resp => {
                    setStateSousParametre(resp.data);
                })
                .catch((err) => {
                    console.log(err)
            });
        } else {
           const records = stateSousParametre.filter((row) => {
            return row.nom.toLowerCase().includes(searchText);
          });
          setStateSousParametre(records);
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
                          { < AddSousParametre /> }
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
                                    <h4 className="card-title">Liste des sous parametre</h4>
                                  </div>
                                  <div className="card-body">
                                <div >
                                <div>
      
                                    <div className='text-end'><input type='text' onChange={ handleFilter }/></div>
                                    <br/>
                                  <DataTable 
                                        columns={columns} 
                                        data={stateSousParametre} 
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
export default ListSousParametre;