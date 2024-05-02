import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTypes } from '../../servicesApi/microservice-parametre';
import { AppContext, useAppState } from '../../useContext/context';


function SideNav() {

  //const [ stateT, setStateT ] = useAppState(AppContext);
  const { stateT, setStateT } = useContext(AppContext);

  // useEffect(() => {
  //         handleGetType();
  //     },[]);

  // const handleGetType = () => {
  //     getTypes()
  //         .then( resp => {
  //             setStateT(resp.data);
  //         })
  //         .catch((err) => {
  //             console.log(err)
  //         });
  // };
  return (
    <div>
       {/***********************************
      Sidebar start
        ************************************/}
      <div className="dlabnav">
        <div className="dlabnav-scroll">
          <ul className="metismenu" id="menu">
            <li><Link to='/home' aria-expanded="false">
                <i className="fas fa-home" />
                <span className="nav-text">Accueil</span>
              </Link>
            </li>
            <li><a className="has-arrow " href="javascript:void()" aria-expanded="false">
                <i className="fas fa-clone" />
                <span className="nav-text">Types</span>
              </a>
              <ul aria-expanded="false">
                  <li><Link to={"/listType"}>Gestion des types</Link></li>
              </ul>
            </li>
            <li><a className="has-arrow " href="javascript:void()" aria-expanded="false">
                <i className="fa fa-bars" />
                <span className="nav-text">Parametrages</span>
              </a>
              <ul aria-expanded="false">
                  { stateT.map(type => 
                      <li key={type.typeId} >
                        <Link  to={`/listParametreByType/${type.typeId}`} >{type.name}</Link>  
                      </li>
                  )}
              </ul>
            </li>
            <li><a className="has-arrow " href="javascript:void()" aria-expanded="false">
                <i className="fas fa-heart" />
                <span className="nav-text">Fonctionnalité</span>
              </a>
              <ul aria-expanded="false">
                 <li><Link to={"/listFonctionnalite"}>Gestion des fonctionnalités</Link></li>
                {/* <li><a href="uc-select2.html">Select 2</a></li>
                <li><a href="uc-nestable.html">Nestedable</a></li>
                <li><a href="uc-noui-slider.html">Noui Slider</a></li>
                <li><a href="uc-sweetalert.html">Sweet Alert</a></li>
                <li><a href="uc-toastr.html">Toastr</a></li>
                <li><a href="map-jqvmap.html">Jqv Map</a></li>
                <li><a href="uc-lightgallery.html">Light Gallery</a></li> */}
              </ul>
            </li>
            {/* <li><a href="widget-basic.html" className aria-expanded="false">
                <i className="fas fa-clone" />
                <span className="nav-text">Widget</span>
              </a>
            </li> */}
            {/* <li><a className="has-arrow " href="javascript:void()" aria-expanded="false">
                <i className="fas fa-file-alt" />
                <span className="nav-text">Rapport</span>
              </a>
              <ul aria-expanded="false">
                <li><a href="form-element.html">Form Elements</a></li>
                <li><a href="form-wizard.html">Wizard</a></li>
                <li><a href="form-ckeditor.html">CkEditor</a></li>
                <li><a href="form-pickers.html">Pickers</a></li>
                <li><a href="form-validation.html">Form Validate</a></li>
              </ul>
            </li>
            <li><a className="has-arrow " href="javascript:void()" aria-expanded="false">
                <i className="fas fa-table" />
                <span className="nav-text">Catalogue Total</span>
              </a>
              <ul aria-expanded="false">
                <li><a href="table-bootstrap-basic.html">Bootstrap</a></li>
                <li><a href="table-datatable-basic.html">Datatable</a></li>
              </ul>
            </li> */}
            <li><a className="has-arrow " href="javascript:void()" aria-expanded="false">
                <i className="fas fa-user" />
                <span className="nav-text">Roles</span>
              </a>
              <ul aria-expanded="false">
                <li><Link to={"/listRole"}>Gestion des roles</Link></li>
              </ul>
            </li>
            <li><a className="has-arrow " href="javascript:void()" aria-expanded="false">
                <i className="fas fa-user-check" />
                <span className="nav-text">Mon Compte</span>
              </a>
              <ul aria-expanded="false">
  
                {/* <li><a className="has-arrow" href="javascript:void()" aria-expanded="false">Error</a>
                  <ul aria-expanded="false">
                    <li><a href="page-error-400.html">Error 400</a></li>
                    <li><a href="page-error-403.html">Error 403</a></li>
                    <li><a href="page-error-404.html">Error 404</a></li>
                    <li><a href="page-error-500.html">Error 500</a></li>
                    <li><a href="page-error-503.html">Error 503</a></li>
                  </ul>
                </li> */}
                <li><Link to={"/listUser"}>Personnels</Link></li>
              </ul>
            </li>
          </ul>
          <div className="side-bar-profile">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div className="side-bar-profile-img">
                <img src="images/user.jpg" alt="img" />
              </div>
              <div className="profile-info1">
                <h4 className="fs-18 font-w500">Soeng Souy</h4>
                <span>example@mail.com</span>
              </div>
              <div className="profile-button">
                <i className="fas fa-caret-down scale5 text-light" />
              </div>
            </div>	
            <div className="d-flex justify-content-between mb-2 progress-info">
              <span className="fs-12"><i className="fas fa-star text-orange me-2" />Task Progress</span>
              <span className="fs-12">20/45</span>
            </div>
            <div className="progress default-progress">
              <div className="progress-bar bg-gradientf progress-animated" style={{width: '45%', height: 10}} role="progressbar">
                <span className="sr-only">45% Complete</span>
              </div>
            </div>
          </div>
          <div className="copyright">
            <p><strong>JCaisse 2 Admin</strong> © 2023 Tous droits réservés</p>
            <p className="fs-12">Réalisé avec <span className="heart" /> par YAATOUT SARL</p>
          </div>
        </div>
      </div>
      {/***********************************
            Sidebar end
    ************************************/}

      </div>
  )
}

export default SideNav
