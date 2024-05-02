import React, {useContext, useEffect, useState} from 'react';
import { getAuthToken, getParametreByIdType, getTypeById, updatePropertyiSActivated } from '../../servicesApi/microservice-parametre';
import { useNavigate,useParams } from 'react-router-dom';
import { faCheckCircle, faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddParametre from './addParametre';
import EditParametre from './editParametre';
import DataTable from 'react-data-table-component';
import DeleteParametre from './deleteParametre';
import Header from '../templates/header';
import Footer from '../templates/Footer';
import SideNav from '../templates/SideNav';
import { AppContext, AppContextParamByType } from '../../useContext/context';
import Connexion from '../utilisateurs/connexion';
import { AppContextToken } from '../../useContext/contextStateUser';


function ListParametreByType(){
    const navigate = useNavigate();
    const {id} = useParams();
    const typeId = parseInt(id);

    const { stateParametreByType, setStateParametreByType } = useContext(AppContextParamByType);
    const [stateNameType, setStateNameType] = useState("");
     //j'utilise le token pour la redirection entre le page d'accueil et la page de connexion
     const {stateToken , setStateToken} = useContext(AppContextToken);
 
    useEffect(() => {
        handlerGetParametreByIdType(typeId);
        handleFindNameType(typeId);
    },[typeId]);

    const handlerGetParametreByIdType = (typeId) => {
        getParametreByIdType(typeId)
            .then( resp => {
                setStateParametreByType(resp.data);
        })
        .catch((err) => {
            console.log(err)
        });
    };

    const handleFindNameType = (typeId) => {
        getTypeById(typeId).then(response => {
          setStateNameType(response.data.name);
        }).catch(error => {
          console.log(error);
        })
    };

    const handleActiveParametre = (parametre) => {
        updatePropertyiSActivated(parametre).then((resp)=>{
            const newParametres = stateParametreByType.map((p)=>{
                if(p.parametreId === parametre.parametreId){
                    p.isActivated = !p.isActivated
                }
                return p;
            });
            setStateParametreByType(newParametres)
        })
    };

    function handleFilter(e) {
        const searchText = e.target.value.toLowerCase();
      
        if (searchText === "") {
            getParametreByIdType(typeId)
              .then( resp => {
                setStateParametreByType(resp.data);
          })
          .catch((err) => {
              console.log(err)
          });
        } else {
          const records = stateParametreByType.filter((row) => {
            return row.name.toLowerCase().includes(searchText);
          });
          setStateParametreByType(records);
        }
      }
 
    const columns = [
        {
            name: "Nom",
            selector: row =>  row.name,
            sortable: true
        },
        {
            name : "Symbole",
            selector: row =>  row.symbole,
            sortable: true
        },
        {
            name: "Type",
            selector: row =>  row.type.name,
            sortable: true
        },
        {
            name:"Date de creation",
            selector: row =>  row.dateCreation,
            sortable: true
        },
        {
            name:"UserCreate",
            selector: row =>  row.userCreate,
            sortable: true
        },
        {
            name: "Actived",
            cell: (row) => (
              <div>
                <button onClick={() => handleActiveParametre(row)} className="btn btn-outline-primary">
                  <FontAwesomeIcon icon={row.isActivated ? faCheckCircle : faCircle}
                  />
                </button>
              </div>
            ),
            sortable: true,
          },
          {
              name:"Actions",
              cell: row => (
                  <div>
                  
                        { < EditParametre parametreId={row.parametreId} />  }
                        { < DeleteParametre parametreId={row.parametreId} /> }
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
          {
             !stateToken || stateToken === "null" ? (
              <Connexion />
             
              ) :
               (
                <>
                  <Header />
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
                          { < AddParametre /> }
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
                                          data={stateParametreByType} 
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
                </> 
               )
          }     
        </>
        
        );
}

export default ListParametreByType;