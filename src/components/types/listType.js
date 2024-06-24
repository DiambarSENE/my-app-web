import React, { useContext } from 'react';
import { getTypes, updatePropertyActivated } from '../../servicesApi/microservice-parametre';
import { faCheckCircle, faCircle} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddType from './addType';
import EditType from './editType';
import DeleteType from './deleteType';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router';
import Header from '../templates/header';
import Footer from '../templates/Footer';
import SideNav from '../templates/SideNav';
import { AppContext } from '../../useContext/context';
import Connexion from '../utilisateurs/connexion';
import { AppContextToken } from '../../useContext/contextStateUser';
import Preload from '../templates/preload';

function ListType(){
    const navigate = useNavigate();
    //j'utilise le token pour la redirection entre le page d'accueil et la page de connexion
    const {stateToken , setStateToken} = useContext(AppContextToken);

    const { stateT, setStateT } = useContext(AppContext);
   
    const handleActiveType = (type) => {
        updatePropertyActivated(type).then((resp) =>{

        const newTypes = stateT.map((t) => {
            if(t.typeId === type.typeId){
                t.activated = !t.activated;
            }
            return t;
        });
          setStateT(newTypes);
        });
    };

    const columns = [
        {
            name: (
              <div style={{ fontWeight: "bold" }}>
                Nom
              </div>
            ),
            selector: row => row.name,
            sortable: true,
            cell: (row) => <div style={{ fontWeight: "bold" }}>{row.name}</div>,
        },
        {
            name: "Description",
            selector: row => row.description,
            sortable: true,
            cell: (row) => <div style={{ fontWeight: "bold" }}>{row.description}</div>,
        },
        {
            name: "Date de creation",
            selector: row => row.dateCreate,
            sortable: true,
            cell: (row) => <div style={{ fontWeight: "bold" }}>{row.dateCreate}</div>,
        },
        {
            name: "UserCreate",
            selector: row => row.userCreate,
            sortable: true,
            cell: (row) => <div style={{ fontWeight: "bold" }}>{row.userCreate}</div>,
        },
        {
            name: "Activer/Desactiver",
            cell: (row) => (
              <div>
                <button onClick={() => handleActiveType(row)} className="btn btn-outline-primary">
                  <FontAwesomeIcon icon={row.activated ? faCheckCircle : faCircle}
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
                         { < EditType typeId={row.typeId} />  }
                    
                         { < DeleteType typeId={row.typeId}/>}
                  </div>
                ),
                sortable: true
                
          }
    ];

    function handleFilter(e) {
        const searchText = e.target.value.toLowerCase();
      
        if (searchText === "") {
            getTypes()
                .then( resp => {
                    setStateT(resp.data);
                })
                .catch((err) => {
                    console.log(err)
            });
        } else {
           const records = stateT.filter((row) => {
            return row.name.toLowerCase().includes(searchText);
          });
          setStateT(records);
        }
      }

    // const listType = () => {
    //     navigate("/listType")
    //  };
    //  const listParametre = () => {
    //     navigate("/listParametre")
    //  };
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
                          { < AddType /> }
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
                                    <h4 className="card-title">Liste des Types</h4>
                                  </div>
                                  <div className="card-body">
                                <div >
                                <div>
      
                                    <div className='text-end'><input type='text' onChange={ handleFilter }/></div>
                                    <br/>
                                  <DataTable 
                                        columns={columns} 
                                        data={stateT} 
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
export default ListType;