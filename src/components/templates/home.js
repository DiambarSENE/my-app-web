import React, { useContext } from 'react';
import Header from './header';
import SideNav from './SideNav';
import Footer from './Footer';
import Connexion from '../utilisateurs/connexion';
import { AppContextToken } from '../../useContext/contextStateUser';

function Home() {
  //j'utilise le token pour la redirection entre le page d'accueil et la page de connexion
  const {stateToken , setStateToken} = useContext(AppContextToken);

  return (
    <>
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
            {/* row */}
            <div className="container-fluid">
              <div className="row">
                <div className="col-xl-12">
                  <div className="row">
                    <div className="col-xl-6">
                      <div className="row">
                        <div className="col-xl-12">
                          <div className="card tryal-gradient">
                            <div className="card-body tryal row">
                              <div className="col-xl-7 col-sm-6">
                                <h2>Manage your project in one touch</h2>
                                <span>Let Fillow manage your project automatically with our best AI systems </span>
                                <a href="javascript:void(0);" className="btn btn-rounded  fs-18 font-w500">Try Free Now</a>
                              </div>
                              <div className="col-xl-5 col-sm-6">
                                <img src="images/chart.png" alt="img" className="sd-shape" />
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <div className="col-xl-12">
                          <div className="card">
                            <div className="card-header border-0 flex-wrap">
                              <h4 className="fs-20 font-w700 mb-2">Project Statistics</h4>
                              <div className="d-flex align-items-center project-tab mb-2">	
                                <div className="card-tabs mt-3 mt-sm-0 mb-3 ">
                                  <ul className="nav nav-tabs" role="tablist">
                                    <li className="nav-item">
                                      <a className="nav-link active" data-bs-toggle="tab" href="#monthly" role="tab">Monthly</a>
                                    </li>
                                    <li className="nav-item">
                                      <a className="nav-link" data-bs-toggle="tab" href="#Weekly" role="tab">Weekly</a>
                                    </li>
                                    <li className="nav-item">
                                      <a className="nav-link" data-bs-toggle="tab" href="#Today" role="tab">Today</a>
                                    </li>
                                  </ul>
                                </div>
                                <div className="dropdown ms-2">
                                  <div className="btn-link" data-bs-toggle="dropdown">
                                    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <circle cx="12.4999" cy="3.5" r="2.5" fill="#A5A5A5" />
                                      <circle cx="12.4999" cy="11.5" r="2.5" fill="#A5A5A5" />
                                      <circle cx="12.4999" cy="19.5" r="2.5" fill="#A5A5A5" />
                                    </svg>
                                  </div>
                                  <div className="dropdown-menu dropdown-menu-right">
                                    <a className="dropdown-item" href="javascript:void(0)">Delete</a>
                                    <a className="dropdown-item" href="javascript:void(0)">Edit</a>
                                  </div>
                                </div>
                              </div>	
                            </div>
                            <div className="card-body">
                              <div className="d-flex justify-content-between align-items-center flex-wrap">
                                <div className="d-flex">
                                  <div className="d-inline-block position-relative donut-chart-sale mb-3">
                                    <span className="donut1" data-peity="{ &quot;fill&quot;: [&quot;rgba(136,108,192,1)&quot;, &quot;rgba(241, 234, 255, 1)&quot;],   &quot;innerRadius&quot;: 20, &quot;radius&quot;: 15}">5/8</span>
                                  </div>
                                  <div className="ms-3">
                                    <h4 className="fs-24 font-w700 ">246</h4>
                                    <span className="fs-16 font-w400 d-block">Total Projects</span>
                                  </div>
                                </div>
                                <div className="d-flex">	
                                  <div className="d-flex me-5">
                                    <div className="mt-2">
                                      <svg width={13} height={13} viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="6.5" cy="6.5" r="6.5" fill="#FFCF6D" />
                                      </svg>
                                    </div>
                                    <div className="ms-3">
                                      <h4 className="fs-24 font-w700 ">246</h4>
                                      <span className="fs-16 font-w400 d-block">On Going</span>
                                    </div>
                                  </div>
                                  <div className="d-flex">
                                    <div className="mt-2">
                                      <svg width={13} height={13} viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="6.5" cy="6.5" r="6.5" fill="#FFA7D7" />
                                      </svg>
                                    </div>
                                    <div className="ms-3">
                                      <h4 className="fs-24 font-w700 ">28</h4>
                                      <span className="fs-16 font-w400 d-block">Unfinished</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="tab-content">
                                <div className="tab-pane fade active show" id="monthly">
                                  <div id="chartBar" className="chartBar" />
                                </div>	
                                <div className="tab-pane fade" id="Weekly">
                                  <div id="chartBar1" className="chartBar" />
                                </div>
                                <div className="tab-pane fade" id="Today">
                                  <div id="chartBar2" className="chartBar" />
                                </div>
                              </div>
                              <div className="d-flex align-items-center">
                                <label className="form-check-label font-w400 fs-16 mb-0" htmlFor="flexSwitchCheckChecked1">Number</label>
                                <div className="form-check form-switch toggle-switch">
                                  <input className="form-check-input custome" type="checkbox" id="flexSwitchCheckChecked1" defaultChecked />
                                </div>
                                <label className="form-check-label font-w400 fs-16 mb-0 ms-3" htmlFor="flexSwitchCheckChecked2">Analytics</label>	
                                <div className="form-check form-switch toggle-switch">
                                  <input className="form-check-input custome" type="checkbox" id="flexSwitchCheckChecked2" defaultChecked />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-12">
                          <div className="card">
                            <div className="card-header border-0 pb-0">
                              <h4 className="fs-20 font-w700 mb-0">Completion Project Rate</h4>
                              <div className="dropdown ">
                                <div className="btn-link" data-bs-toggle="dropdown">
                                  <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12.4999" cy="3.5" r="2.5" fill="#A5A5A5" />
                                    <circle cx="12.4999" cy="11.5" r="2.5" fill="#A5A5A5" />
                                    <circle cx="12.4999" cy="19.5" r="2.5" fill="#A5A5A5" />
                                  </svg>
                                </div>
                                <div className="dropdown-menu dropdown-menu-right">
                                  <a className="dropdown-item" href="javascript:void(0)">Delete</a>
                                  <a className="dropdown-item" href="javascript:void(0)">Edit</a>
                                </div>
                              </div>
                            </div>
                            <div className="card-body pb-0">
                              <div id="revenueMap" className="revenueMap" />
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-12">
                          <div className="card">
                            <div className="card-header border-0">
                              <div>
                                <h4 className="fs-20 font-w700">Recent Emails</h4>
                                <span className="fs-14 font-w400">Lorem ipsum dolor sit amet</span>
                              </div>
                              <div>
                                <a href="javascript:void(0);" className="btn btn-outline-primary btn-rounded fs-18">View More</a>
                              </div>
                            </div>
                            <div className="card-body px-0">
                              <div className="d-flex justify-content-between recent-emails">
                                <div className="d-flex">
                                  <div className="profile-k">
                                    <span className="bg-success">K</span>	
                                  </div>
                                  <div className="ms-3">
                                    <h4 className="fs-18 font-w500">How to improve project management flows</h4>
                                    <span className="font-w400 d-block">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do<br /> eiusmod tempor incididunt ut labore et dolore magna aliqua...</span>
                                  </div>
                                </div>
                                <div className="email-check">
                                  <label className="like-btn mb-0">
                                    <input type="checkbox" />
                                    <span className="checkmark" />
                                  </label>
                                </div>
                              </div>
                              <div className="d-flex justify-content-between recent-emails">
                                <div className="d-flex">
                                  <div className="profile-k">
                                    <img src="images/profile/small/pic6.jpg" alt="img" />
                                  </div>
                                  <div className="ms-3">
                                    <h4 className="fs-18 font-w500">Fillow Final UseCase Diagram</h4>
                                    <span className="font-w400 d-block">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do<br /> eiusmod tempor incididunt ut labore et dolore magna aliqua...</span>
                                    <div className="final-badge">
                                      <span className="badge text-black border"><i className="far fa-file-alt me-3" />Master_file.fig</span>
                                      <span className="badge text-black border"><i className="fas fa-image me-2" />CoverPreview.jpg</span>
                                      <span className="badge border bgl-primary font-w700">4 files more</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="email-check">
                                  <label className="like-btn mb-0">
                                    <input type="checkbox" />
                                    <span className="checkmark" />
                                  </label>
                                </div>
                              </div>
                              <div className="d-flex justify-content-between recent-emails">
                                <div className="d-flex">
                                  <div className="profile-k">
                                    <span className="bg-warning">G</span>	
                                  </div>
                                  <div className="ms-3">
                                    <h4 className="fs-18 font-w500">Weekly Design Inspirations by Envato</h4>
                                    <span className="font-w400 d-block">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do<br /> eiusmod tempor incididunt ut labore et dolore magna aliqua...</span>
                                  </div>
                                </div>
                                <div className="email-check">
                                  <label className="like-btn mb-0">
                                    <input type="checkbox" />
                                    <span className="checkmark" />
                                  </label>
                                </div>
                              </div>
                              <div className="d-flex justify-content-between recent-emails">
                                <div className="d-flex">
                                  <div className="profile-k">
                                    <img src="images/profile/small/pic8.jpg" alt="img" />
                                  </div>
                                  <div className="ms-3">
                                    <h4 className="fs-18 font-w500">How to improve project management flows</h4>
                                    <span className="font-w400 d-block">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do<br /> eiusmod tempor incididunt ut labore et dolore magna aliqua...</span>
                                  </div>
                                </div>
                                <div className="email-check">
                                  <label className="like-btn mb-0">
                                    <input type="checkbox" />
                                    <span className="checkmark" />
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div> */}
                      </div>
                    </div>
                    <div className="col-xl-6">
                      <div className="row">
                        <div className="col-xl-12">
                          <div className="row">
                            <div className="col-xl-6 col-sm-6">
                              <div className="card">
                                <div className="card-body d-flex px-4 pb-0 justify-content-between">
                                  <div>
                                    <h4 className="fs-18 font-w600 mb-4 text-nowrap">Total Clients</h4>
                                    <div className="d-flex align-items-center">
                                      <h2 className="fs-32 font-w700 mb-0">68</h2>
                                      <span className="d-block ms-4">
                                        <svg width={21} height={11} viewBox="0 0 21 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M1.49217 11C0.590508 11 0.149368 9.9006 0.800944 9.27736L9.80878 0.66117C10.1954 0.29136 10.8046 0.291359 11.1912 0.661169L20.1991 9.27736C20.8506 9.9006 20.4095 11 19.5078 11H1.49217Z" fill="#09BD3C" />
                                        </svg>
                                        <small className="d-block fs-16 font-w400 text-success">+0,5%</small>
                                      </span>
                                    </div>
                                  </div>
                                  <div id="columnChart" />
                                </div>
                              </div>
                            </div>
                            <div className="col-xl-6 col-sm-6">
                              <div className="card">
                                <div className="card-body px-4 pb-0">
                                  <h4 className="fs-18 font-w600 mb-5 text-nowrap">Total Clients</h4>
                                  <div className="progress default-progress">
                                    <div className="progress-bar bg-gradient1 progress-animated" style={{width: '40%', height: 10}} role="progressbar">
                                      <span className="sr-only">45% Complete</span>
                                    </div>
                                  </div>
                                  <div className="d-flex align-items-end mt-2 pb-3 justify-content-between">
                                    <span>76 left from target</span>
                                    <h4 className="mb-0">42</h4>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-xl-6 col-sm-6">
                              <div className="card">
                                <div className="card-body d-flex px-4  justify-content-between">
                                  <div>
                                    <div className>
                                      <h2 className="fs-32 font-w700">562</h2>
                                      <span className="fs-18 font-w500 d-block">Total Clients</span>
                                      <span className="d-block fs-16 font-w400"><small className="text-danger">-2%</small> than last month</span>
                                    </div>
                                  </div>
                                  <div id="NewCustomers" />
                                </div>
                              </div>
                            </div>
                            <div className="col-xl-6 col-sm-6">
                              <div className="card">
                                <div className="card-body d-flex px-4  justify-content-between">
                                  <div>
                                    <div className>
                                      <h2 className="fs-32 font-w700">892</h2>
                                      <span className="fs-18 font-w500 d-block">New Projects</span>
                                      <span className="d-block fs-16 font-w400"><small className="text-success">-2%</small> than last month</span>
                                    </div>
                                  </div>
                                  <div id="NewCustomers1" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <div className="col-xl-12">
                          <div className="card">
                            <div className="card-body">
                              <div className="row">
                                <div className="col-xl-6 col-sm-6">
                                  <div className=" owl-carousel card-slider">
                                    <div className="items">
                                      <h4 className="fs-20 font-w700 mb-4">Fillow Company Profile Website Project</h4>
                                      <span className="fs-14 font-w400">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque </span>
                                    </div>	
                                    <div className="items">
                                      <h4 className="fs-20 font-w700 mb-4">Fillow Company Profile Website Project</h4>
                                      <span className="fs-14 font-w400">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque </span>
                                    </div>	
                                    <div className="items">
                                      <h4 className="fs-20 font-w700 mb-4">Fillow Company Profile Website Project</h4>
                                      <span className="fs-14 font-w400">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque </span>
                                    </div>	
                                  </div>
                                </div>
                                <div className="col-xl-6 redial col-sm-6">
                                  <div id="redial" />
                                  <span className="text-center d-block fs-18 font-w600">On Progress <small className="text-success">70%</small></span>	
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-12 col-lg-12">
                          <div className="row">
                            <div className="col-xl-6 col-xxl-12 col-sm-6">
                              <div className="card">
                                <div className="card-header border-0">
                                  <div>
                                    <h4 className="fs-20 font-w700">Email Categories</h4>
                                    <span className="fs-14 font-w400 d-block">Lorem ipsum dolor sit amet</span>
                                  </div>	
                                </div>	
                                <div className="card-body">
                                  <div id="emailchart"> </div>
                                  <div className="mb-3 mt-4">
                                    <h4 className="fs-18 font-w600">Legend</h4>
                                  </div>
                                  <div>
                                    <div className="d-flex align-items-center justify-content-between mb-4">
                                      <span className="fs-18 font-w500">	
                                        <svg className="me-3" width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <rect width={20} height={20} rx={6} fill="#886CC0" />
                                        </svg>
                                        Primary (27%)
                                      </span>
                                      <span className="fs-18 font-w600">763</span>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between  mb-4">
                                      <span className="fs-18 font-w500">	
                                        <svg className="me-3" width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <rect width={20} height={20} rx={6} fill="#26E023" />
                                        </svg>
                                        Promotion (11%)
                                      </span>
                                      <span className="fs-18 font-w600">321</span>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between  mb-4">
                                      <span className="fs-18 font-w500">	
                                        <svg className="me-3" width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <rect width={20} height={20} rx={6} fill="#61CFF1" />
                                        </svg>
                                        Forum (22%)
                                      </span>
                                      <span className="fs-18 font-w600">69</span>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between  mb-4">
                                      <span className="fs-18 font-w500">	
                                        <svg className="me-3" width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <rect width={20} height={20} rx={6} fill="#FFDA7C" />
                                        </svg>
                                        Socials (15%) 
                                      </span>
                                      <span className="fs-18 font-w600">154</span>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between  mb-4">
                                      <span className="fs-18 font-w500">	
                                        <svg className="me-3" width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <rect width={20} height={20} rx={6} fill="#FF86B1" />
                                        </svg>
                                        Spam (25%) 
                                      </span>
                                      <span className="fs-18 font-w600">696</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="card-footer border-0 pt-0">
                                  <a href="javascript:void(0);" className="btn btn-outline-primary d-block btn-rounded">Update Progress</a>		
                                </div>
                              </div>
                            </div>	
                            <div className="col-xl-6 col-xxl-12 col-sm-6">
                              <div className="card">
                                <div className="card-header border-0 pb-0">
                                  <div>
                                    <h4 className="fs-20 font-w700">Important Projects</h4>
                                    <span className="fs-14 font-w400 d-block">Lorem ipsum dolor sit amet</span>
                                  </div>
                                </div>
                                <div className="card-body pb-0">
                                  <div className="project-details"> 
                                    <div className="d-flex align-items-center justify-content-between">
                                      <div className="d-flex align-items-center">
                                        <span className="big-wind">
                                          <img src="images/big-wind.png" alt="" />
                                        </span>
                                        <div className="ms-3">
                                          <h4>Big Wind</h4>
                                          <span className="fs-14 font-w400">Creative Agency</span>
                                        </div>
                                      </div>	
                                      <div className="dropdown">
                                        <div className="btn-link" data-bs-toggle="dropdown">
                                          <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="12.4999" cy="3.5" r="2.5" fill="#A5A5A5" />
                                            <circle cx="12.4999" cy="11.5" r="2.5" fill="#A5A5A5" />
                                            <circle cx="12.4999" cy="19.5" r="2.5" fill="#A5A5A5" />
                                          </svg>
                                        </div>
                                        <div className="dropdown-menu dropdown-menu-right">
                                          <a className="dropdown-item" href="javascript:void(0)">Delete</a>
                                          <a className="dropdown-item" href="javascript:void(0)">Edit</a>
                                        </div>
                                      </div>
                                    </div>
                                    <h4 className="fs-16 font-w600 mt-4">Optimization Dashboard Page for indexing in Google</h4>
                                    <div className="projects">
                                      <span className="badge bgl-warning text-warning font-w700 me-3">SEO</span>
                                      <span className="badge bgl-danger text-danger font-w700">MARKETING</span>
                                    </div>
                                    <div className="mt-3">
                                      <div className="progress default-progress">
                                        <div className="progress-bar bg-gradient1 progress-animated" style={{width: '45%', height: 10}} role="progressbar">
                                          <span className="sr-only">45% Complete</span>
                                        </div>
                                      </div>
                                      <div className="d-flex align-items-end mt-3 pb-3 justify-content-between">
                                        <span className="fs-14 font-w400"><small className="font-w700 me-2">12</small>Task Done</span>
                                        <span className="fs-14 font-w400">Due date: 12/05/2020</span>
                                      </div>
                                    </div>
                                  </div>	
                                  <div className="project-details"> 
                                    <div className="d-flex align-items-center justify-content-between">
                                      <div className="d-flex align-items-center">
                                        <span className="big-wind">
                                          <img src="images/circle-hunt.png" alt="" />
                                        </span>
                                        <div className="ms-3">
                                          <h4>Circle Hunt</h4>
                                          <span className="fs-14 font-w400">Creative Agency</span>
                                        </div>
                                      </div>	
                                      <div className="dropdown">
                                        <div className="btn-link" data-bs-toggle="dropdown">
                                          <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="12.4999" cy="3.5" r="2.5" fill="#A5A5A5" />
                                            <circle cx="12.4999" cy="11.5" r="2.5" fill="#A5A5A5" />
                                            <circle cx="12.4999" cy="19.5" r="2.5" fill="#A5A5A5" />
                                          </svg>
                                        </div>
                                        <div className="dropdown-menu dropdown-menu-right">
                                          <a className="dropdown-item" href="javascript:void(0)">Delete</a>
                                          <a className="dropdown-item" href="javascript:void(0)">Edit</a>
                                        </div>
                                      </div>
                                    </div>
                                    <h4 className="fs-16 font-w600 mt-4">Redesign Landing Page Website for Company Profile</h4>
                                    <div className="projects">
                                      <span className="badge bgl-primary text-primary font-w700 me-3">UI/UX</span>
                                      <span className="badge bgl-danger text-danger font-w700">WEBSITE</span>
                                    </div>
                                    <div className="mt-3">
                                      <div className="progress default-progress">
                                        <div className="progress-bar bg-gradient1 progress-animated" style={{width: '45%', height: 10}} role="progressbar">
                                          <span className="sr-only">45% Complete</span>
                                        </div>
                                      </div>
                                      <div className="d-flex align-items-end mt-3 pb-3 justify-content-between">
                                        <span className="fs-14 font-w400"><small className="font-w700 me-2">12</small>Task Done</span>
                                        <span className="fs-14 font-w400">Due date: 12/05/2020</span>
                                      </div>
                                    </div>
                                  </div>	
                                </div>
                                <div className="card-footer pt-0 border-0">
                                  <a href="javascript:void(0);" className="btn btn-outline-primary d-block btn-rounded">Pin other projects</a>
                                </div>
                              </div>
                            </div>
                          </div>	
                        </div>
                        <div className="col-xl-12 col-lg-12">
                          <div className="card">
                            <div className="card-header border-0">
                              <div>
                                <h4 className="fs-20 font-w700">Messages</h4>
                                <span>Lorem ipsum dolor sit amet</span>
                              </div>
                              <div>
                                <a href="javascript:void(0);" className="btn btn-primary btn-rounded">+New Messages</a>
                              </div>
                            </div>
                            <div className="card-body px-0">
                              <div className="msg-bx d-flex justify-content-between align-items-center">
                                <div className="msg d-flex align-items-center w-100">
                                  <div className="image-box active">
                                    <img src="images/profile/small/pic6.jpg" alt="" />
                                  </div>
                                  <div className="ms-3 w-100 ">
                                    <h4 className="fs-18 font-w600">Maren Rosser</h4>
                                    <div className="d-flex justify-content-between">
                                      <span className="me-auto">Hei, dont forget to clear server cache!</span>
                                      <span className="me-4 fs-12">25min ago</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="dropdown">
                                  <div className="btn-link" data-bs-toggle="dropdown">
                                    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <circle cx="12.4999" cy="3.5" r="2.5" fill="#A5A5A5" />
                                      <circle cx="12.4999" cy="11.5" r="2.5" fill="#A5A5A5" />
                                      <circle cx="12.4999" cy="19.5" r="2.5" fill="#A5A5A5" />
                                    </svg>
                                  </div>
                                  <div className="dropdown-menu dropdown-menu-right">
                                    <a className="dropdown-item" href="javascript:void(0)">Delete</a>
                                    <a className="dropdown-item" href="javascript:void(0)">Edit</a>
                                  </div>
                                </div>
                              </div>
                              <div className="msg-bx d-flex justify-content-between align-items-center">
                                <div className="msg d-flex align-items-center w-100">
                                  <div className="image-box">
                                    <img src="images/profile/small/pic7.jpg" alt="" />
                                  </div>	
                                  <div className="ms-3 w-100">
                                    <h4 className="fs-18 font-w600">Kaiya Bergson</h4>
                                    <div className="d-flex justify-content-between">
                                      <span className="me-auto">I remember that project due is tomorrow.</span>
                                      <span className="me-4 fs-12">Yesterday, 8:24 AM</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="dropdown">
                                  <div className="btn-link" data-bs-toggle="dropdown">
                                    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <circle cx="12.4999" cy="3.5" r="2.5" fill="#A5A5A5" />
                                      <circle cx="12.4999" cy="11.5" r="2.5" fill="#A5A5A5" />
                                      <circle cx="12.4999" cy="19.5" r="2.5" fill="#A5A5A5" />
                                    </svg>
                                  </div>
                                  <div className="dropdown-menu dropdown-menu-right">
                                    <a className="dropdown-item" href="javascript:void(0)">Delete</a>
                                    <a className="dropdown-item" href="javascript:void(0)">Edit</a>
                                  </div>
                                </div>
                              </div>
                              <div className="msg-bx d-flex justify-content-between align-items-center">
                                <div className="msg d-flex align-items-center w-100">
                                  <div className="image-box active">
                                    <img src="images/profile/small/pic4.jpg" alt="" />
                                  </div>	
                                  <div className="ms-3 w-100">
                                    <h4 className="fs-18 font-w600">Ruben Press</h4>
                                    <div className="d-flex justify-content-between">
                                      <span className="me-auto">Ok sir. I will fix it as soon as possible</span>
                                      <span className="me-4 fs-12">December 12th, 2020  10:24 AM</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="dropdown">
                                  <div className="btn-link" data-bs-toggle="dropdown">
                                    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <circle cx="12.4999" cy="3.5" r="2.5" fill="#A5A5A5" />
                                      <circle cx="12.4999" cy="11.5" r="2.5" fill="#A5A5A5" />
                                      <circle cx="12.4999" cy="19.5" r="2.5" fill="#A5A5A5" />
                                    </svg>
                                  </div>
                                  <div className="dropdown-menu dropdown-menu-right">
                                    <a className="dropdown-item" href="javascript:void(0)">Delete</a>
                                    <a className="dropdown-item" href="javascript:void(0)">Edit</a>
                                  </div>
                                </div>
                              </div>
                              <div className="msg-bx d-flex justify-content-between align-items-center">
                                <div className="msg d-flex align-items-center w-100">
                                  <div className="image-box active">
                                    <img src="images/profile/small/pic3.jpg" alt="" />
                                  </div>	
                                  <div className="ms-3 w-100">
                                    <h4 className="fs-18 font-w600">Cristofer Torff</h4>
                                    <div className="d-flex justify-content-between">
                                      <span className="me-auto">Maybe we should schedule that meeting</span>
                                      <span className="me-4 fs-12">December 12th, 2020  10:24 AM</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="dropdown">
                                  <div className="btn-link" data-bs-toggle="dropdown">
                                    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <circle cx="12.4999" cy="3.5" r="2.5" fill="#A5A5A5" />
                                      <circle cx="12.4999" cy="11.5" r="2.5" fill="#A5A5A5" />
                                      <circle cx="12.4999" cy="19.5" r="2.5" fill="#A5A5A5" />
                                    </svg>
                                  </div>
                                  <div className="dropdown-menu dropdown-menu-right">
                                    <a className="dropdown-item" href="javascript:void(0)">Delete</a>
                                    <a className="dropdown-item" href="javascript:void(0)">Edit</a>
                                  </div>
                                </div>
                              </div>
                              <div className="msg-bx d-flex justify-content-between align-items-center">
                                <div className="msg d-flex align-items-center w-100">
                                  <div className="image-box active">
                                    <img src="images/profile/small/pic5.jpg" alt="" />
                                  </div>	
                                  <div className="ms-3 w-100">
                                    <h4 className="fs-18 font-w600">Ann Rosser</h4>
                                    <div className="d-flex justify-content-between">
                                      <span className="me-auto">I dont’t know where that files saved dude.</span>
                                      <span className="me-4 fs-12">Yesterday, 8:24 AM</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="dropdown">
                                  <div className="btn-link" data-bs-toggle="dropdown">
                                    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <circle cx="12.4999" cy="3.5" r="2.5" fill="#A5A5A5" />
                                      <circle cx="12.4999" cy="11.5" r="2.5" fill="#A5A5A5" />
                                      <circle cx="12.4999" cy="19.5" r="2.5" fill="#A5A5A5" />
                                    </svg>
                                  </div>
                                  <div className="dropdown-menu dropdown-menu-right">
                                    <a className="dropdown-item" href="javascript:void(0)">Delete</a>
                                    <a className="dropdown-item" href="javascript:void(0)">Edit</a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div> */}
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

export default Home;
