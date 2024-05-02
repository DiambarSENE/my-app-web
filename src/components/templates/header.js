import React, { useContext } from 'react'
import {  deleteToken } from '../../servicesApi/microservice-utilisateur';
import { Link, useNavigate } from 'react-router-dom';
import { AppContextToken, AppContextUserByEmail } from '../../useContext/contextStateUser';
   
  function Header() {
    const navigate = useNavigate();
    //permet d'utiliser l'email de l'utilisateur connecter 
    const {stateUserByEmail, setStateUserByEmail} = useContext(AppContextUserByEmail);
     //j'utilise le token pour la redirection entre le page d'accueil et la page de connexion
     const {stateToken , setStateToken} = useContext(AppContextToken);
    
    const deconnexion = () => {
        setStateUserByEmail(null);
        deleteToken();
        setStateToken(null);
        navigate("/");
    };



  return (
    <>
       {/* {stateToken === "null" && < Connexion /> } */}
            {/***********************************
             Nav header start
        ************************************/}
        <div className="nav-header">
        <Link to={"/home"} className="brand-logo">
            {/* <svg className="logo-abbr" width={55} height={55} viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg"  >
            <path fillRule="evenodd" clipRule="evenodd" d="M27.5 0C12.3122 0 0 12.3122 0 27.5C0 42.6878 12.3122 55 27.5 55C42.6878 55 55 42.6878 55 27.5C55 12.3122 42.6878 0 27.5 0ZM28.0092 46H19L19.0001 34.9784L19 27.5803V24.4779C19 14.3752 24.0922 10 35.3733 10V17.5571C29.8894 17.5571 28.0092 19.4663 28.0092 24.4779V27.5803H36V34.9784H28.0092V46Z" fill="url(#paint0_linear)" />
            <defs>
            </defs>
            </svg> */}
            <img src="/images/jcaisse.png" className="logo-abbr" width={55} height={55} viewBox="0 0 55 55" fill="none"/>
            <div className="brand-title">
            <h2 className>JCaisse</h2>
            <span className="brand-sub-title">@Version 2</span>
            </div>
        </Link>
        <div className="nav-control">
            <div className="hamburger">
            <span className="line" /><span className="line" /><span className="line" />
            </div>
        </div>
        </div>
        {/***********************************
             Nav header end
                ************************************/}
            {/***********************************
              Chat box start
          ************************************/}
        <div className="chatbox">
          <div className="chatbox-close" />
          <div className="custom-tab-1">
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <a className="nav-link" data-bs-toggle="tab" href="#notes">Notes</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-bs-toggle="tab" href="#alerts">Alerts</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" data-bs-toggle="tab" href="#chat">Chat</a>
              </li>
            </ul>
            <div className="tab-content">
              <div className="tab-pane fade active show" id="chat" role="tabpanel">
                <div className="card mb-sm-3 mb-md-0 contacts_card dlab-chat-user-box">
                  <div className="card-header chat-list-header text-center">
                    <a href="javascript:void(0);"><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd"><rect fill="#000000" x={4} y={11} width={16} height={2} rx={1} /><rect fill="#000000" opacity="0.3" transform="translate(12.000000, 12.000000) rotate(-270.000000) translate(-12.000000, -12.000000) " x={4} y={11} width={16} height={2} rx={1} /></g></svg></a>
                    <div>
                      <h6 className="mb-1">Chat List</h6>
                      <p className="mb-0">Show All</p>
                    </div>
                    <a href="javascript:void(0);"><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd"><rect x={0} y={0} width={24} height={24} /><circle fill="#000000" cx={5} cy={12} r={2} /><circle fill="#000000" cx={12} cy={12} r={2} /><circle fill="#000000" cx={19} cy={12} r={2} /></g></svg></a>
                  </div>
                  <div className="card-body contacts_body p-0 dlab-scroll  " id="DLAB_W_Contacts_Body">
                    <ul className="contacts">
                      <li className="name-first-letter">A</li>
                      <li className="active dlab-chat-user">
                        <div className="d-flex bd-highlight">
                          <div className="img_cont">
                            <img src="images/avatar/1.jpg" className="rounded-circle user_img" alt="img avatar 1" />
                            <span className="online_icon" />
                          </div>
                          <div className="user_info">
                            <span>Archie Parker</span>
                            <p>Kalid is online</p>
                          </div>
                        </div>
                      </li>
                      <li className="dlab-chat-user">
                        <div className="d-flex bd-highlight">
                          <div className="img_cont">
                            <img src="images/avatar/2.jpg" className="rounded-circle user_img" alt="img avatar 2" />
                            <span className="online_icon offline" />
                          </div>
                          <div className="user_info">
                            <span>Alfie Mason</span>
                            <p>Taherah left 7 mins ago</p>
                          </div>
                        </div>
                      </li>
                      <li className="dlab-chat-user">
                        <div className="d-flex bd-highlight">
                          <div className="img_cont">
                            <img src="images/avatar/3.jpg" className="rounded-circle user_img" alt="img avatar 3" />
                            <span className="online_icon" />
                          </div>
                          <div className="user_info">
                            <span>AharlieKane</span>
                            <p>Sami is online</p>
                          </div>
                        </div>
                      </li>
                      <li className="dlab-chat-user">
                        <div className="d-flex bd-highlight">
                          <div className="img_cont">
                            <img src="images/avatar/4.jpg" className="rounded-circle user_img" alt="img avatar 4" />
                            <span className="online_icon offline" />
                          </div>
                          <div className="user_info">
                            <span>Athan Jacoby</span>
                            <p>Nargis left 30 mins ago</p>
                          </div>
                        </div>
                      </li>
                      <li className="name-first-letter">B</li>
                      <li className="dlab-chat-user">
                        <div className="d-flex bd-highlight">
                          <div className="img_cont">
                            <img src="images/avatar/5.jpg" className="rounded-circle user_img" alt="img avatar 5" />
                            <span className="online_icon offline" />
                          </div>
                          <div className="user_info">
                            <span>Bashid Samim</span>
                            <p>Rashid left 50 mins ago</p>
                          </div>
                        </div>
                      </li>
                      <li className="dlab-chat-user">
                        <div className="d-flex bd-highlight">
                          <div className="img_cont">
                            <img src="images/avatar/1.jpg" className="rounded-circle user_img" alt="img avatar 1" />
                            <span className="online_icon" />
                          </div>
                          <div className="user_info">
                            <span>Breddie Ronan</span>
                            <p>Kalid is online</p>
                          </div>
                        </div>
                      </li>
                      <li className="dlab-chat-user">
                        <div className="d-flex bd-highlight">
                          <div className="img_cont">
                            <img src="images/avatar/2.jpg" className="rounded-circle user_img" alt="img avatar2" />
                            <span className="online_icon offline" />
                          </div>
                          <div className="user_info">
                            <span>Ceorge Carson</span>
                            <p>Taherah left 7 mins ago</p>
                          </div>
                        </div>
                      </li>
                      <li className="name-first-letter">D</li>
                      <li className="dlab-chat-user">
                        <div className="d-flex bd-highlight">
                          <div className="img_cont">
                            <img src="images/avatar/3.jpg" className="rounded-circle user_img" alt="img avatar 3" />
                            <span className="online_icon" />
                          </div>
                          <div className="user_info">
                            <span>Darry Parker</span>
                            <p>Sami is online</p>
                          </div>
                        </div>
                      </li>
                      <li className="dlab-chat-user">
                        <div className="d-flex bd-highlight">
                          <div className="img_cont">
                            <img src="images/avatar/4.jpg" className="rounded-circle user_img" alt="img avatar4" />
                            <span className="online_icon offline" />
                          </div>
                          <div className="user_info">
                            <span>Denry Hunter</span>
                            <p>Nargis left 30 mins ago</p>
                          </div>
                        </div>
                      </li>
                      <li className="name-first-letter">J</li>
                      <li className="dlab-chat-user">
                        <div className="d-flex bd-highlight">
                          <div className="img_cont">
                            <img src="images/avatar/5.jpg" className="rounded-circle user_img" alt="img avatar 5" />
                            <span className="online_icon offline" />
                          </div>
                          <div className="user_info">
                            <span>Jack Ronan</span>
                            <p>Rashid left 50 mins ago</p>
                          </div>
                        </div>
                      </li>
                      <li className="dlab-chat-user">
                        <div className="d-flex bd-highlight">
                          <div className="img_cont">
                            <img src="images/avatar/1.jpg" className="rounded-circle user_img" alt="img avatar1" />
                            <span className="online_icon" />
                          </div>
                          <div className="user_info">
                            <span>Jacob Tucker</span>
                            <p>Kalid is online</p>
                          </div>
                        </div>
                      </li>
                      <li className="dlab-chat-user">
                        <div className="d-flex bd-highlight">
                          <div className="img_cont">
                            <img src="images/avatar/2.jpg" className="rounded-circle user_img" alt="img avatar2" />
                            <span className="online_icon offline" />
                          </div>
                          <div className="user_info">
                            <span>James Logan</span>
                            <p>Taherah left 7 mins ago</p>
                          </div>
                        </div>
                      </li>
                      <li className="dlab-chat-user">
                        <div className="d-flex bd-highlight">
                          <div className="img_cont">
                            <img src="images/avatar/3.jpg" className="rounded-circle user_img" alt="img avatar3" />
                            <span className="online_icon" />
                          </div>
                          <div className="user_info">
                            <span>Joshua Weston</span>
                            <p>Sami is online</p>
                          </div>
                        </div>
                      </li>
                      <li className="name-first-letter">O</li>
                      <li className="dlab-chat-user">
                        <div className="d-flex bd-highlight">
                          <div className="img_cont">
                            <img src="images/avatar/4.jpg" className="rounded-circle user_img" alt="img avatar4" />
                            <span className="online_icon offline" />
                          </div>
                          <div className="user_info">
                            <span>Oliver Acker</span>
                            <p>Nargis left 30 mins ago</p>
                          </div>
                        </div>
                      </li>
                      <li className="dlab-chat-user">
                        <div className="d-flex bd-highlight">
                          <div className="img_cont">
                            <img src="images/avatar/5.jpg" className="rounded-circle user_img" alt="img avatar5" />
                            <span className="online_icon offline" />
                          </div>
                          <div className="user_info">
                            <span>Oscar Weston</span>
                            <p>Rashid left 50 mins ago</p>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="card chat dlab-chat-history-box d-none">
                  <div className="card-header chat-list-header text-center">
                    <a href="javascript:void(0);" className="dlab-chat-history-back">
                      <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd"><polygon points="0 0 24 0 24 24 0 24" /><rect fill="#000000" opacity="0.3" transform="translate(15.000000, 12.000000) scale(-1, 1) rotate(-90.000000) translate(-15.000000, -12.000000) " x={14} y={7} width={2} height={10} rx={1} /><path d="M3.7071045,15.7071045 C3.3165802,16.0976288 2.68341522,16.0976288 2.29289093,15.7071045 C1.90236664,15.3165802 1.90236664,14.6834152 2.29289093,14.2928909 L8.29289093,8.29289093 C8.67146987,7.914312 9.28105631,7.90106637 9.67572234,8.26284357 L15.6757223,13.7628436 C16.0828413,14.136036 16.1103443,14.7686034 15.7371519,15.1757223 C15.3639594,15.5828413 14.7313921,15.6103443 14.3242731,15.2371519 L9.03007346,10.3841355 L3.7071045,15.7071045 Z" fill="#000000" fillRule="nonzero" transform="translate(9.000001, 11.999997) scale(-1, -1) rotate(90.000000) translate(-9.000001, -11.999997) " /></g></svg>
                    </a>
                    <div>
                      <h6 className="mb-1">Chat with Khelesh</h6>
                      <p className="mb-0 text-success">Online</p>
                    </div>							
                    <div className="dropdown">
                      <a href="javascript:void(0);" data-bs-toggle="dropdown" aria-expanded="false"><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd"><rect x={0} y={0} width={24} height={24} /><circle fill="#000000" cx={5} cy={12} r={2} /><circle fill="#000000" cx={12} cy={12} r={2} /><circle fill="#000000" cx={19} cy={12} r={2} /></g></svg></a>
                      <ul className="dropdown-menu dropdown-menu-end">
                        <li className="dropdown-item"><i className="fa fa-user-circle text-primary me-2" /> View profile</li>
                        <li className="dropdown-item"><i className="fa fa-users text-primary me-2" /> Add to btn-close friends</li>
                        <li className="dropdown-item"><i className="fa fa-plus text-primary me-2" /> Add to group</li>
                        <li className="dropdown-item"><i className="fa fa-ban text-primary me-2" /> Block</li>
                      </ul>
                    </div>
                  </div>
                  <div className="card-body msg_card_body dlab-scroll" id="DLAB_W_Contacts_Body3">
                    <div className="d-flex justify-content-start mb-4">
                      <div className="img_cont_msg">
                        <img src="images/avatar/1.jpg" className="rounded-circle user_img_msg" alt="img avatar1" />
                      </div>
                      <div className="msg_cotainer">
                        Hi, how are you samim?
                        <span className="msg_time">8:40 AM, Today</span>
                      </div>
                    </div>
                    <div className="d-flex justify-content-end mb-4">
                      <div className="msg_cotainer_send">
                        Hi Khalid i am good tnx how about you?
                        <span className="msg_time_send">8:55 AM, Today</span>
                      </div>
                      <div className="img_cont_msg">
                        <img src="images/avatar/2.jpg" className="rounded-circle user_img_msg" alt="img avatar2" />
                      </div>
                    </div>
                    <div className="d-flex justify-content-start mb-4">
                      <div className="img_cont_msg">
                        <img src="images/avatar/1.jpg" className="rounded-circle user_img_msg" alt="img avatar1" />
                      </div>
                      <div className="msg_cotainer">
                        I am good too, thank you for your chat template
                        <span className="msg_time">9:00 AM, Today</span>
                      </div>
                    </div>
                    <div className="d-flex justify-content-end mb-4">
                      <div className="msg_cotainer_send">
                        You are welcome
                        <span className="msg_time_send">9:05 AM, Today</span>
                      </div>
                      <div className="img_cont_msg">
                        <img src="images/avatar/2.jpg" className="rounded-circle user_img_msg" alt="img avatar2" />
                      </div>
                    </div>
                    <div className="d-flex justify-content-start mb-4">
                      <div className="img_cont_msg">
                        <img src="images/avatar/1.jpg" className="rounded-circle user_img_msg" alt="img avatar1" />
                      </div>
                      <div className="msg_cotainer">
                        I am looking for your next templates
                        <span className="msg_time">9:07 AM, Today</span>
                      </div>
                    </div>
                    <div className="d-flex justify-content-end mb-4">
                      <div className="msg_cotainer_send">
                        Ok, thank you have a good day
                        <span className="msg_time_send">9:10 AM, Today</span>
                      </div>
                      <div className="img_cont_msg">
                        <img src="images/avatar/2.jpg" className="rounded-circle user_img_msg" alt="img avatar2" />
                      </div>
                    </div>
                    <div className="d-flex justify-content-start mb-4">
                      <div className="img_cont_msg">
                        <img src="images/avatar/1.jpg" className="rounded-circle user_img_msg" alt="img avatar1" />
                      </div>
                      <div className="msg_cotainer">
                        Bye, see you
                        <span className="msg_time">9:12 AM, Today</span>
                      </div>
                    </div>
                    <div className="d-flex justify-content-start mb-4">
                      <div className="img_cont_msg">
                        <img src="images/avatar/1.jpg" className="rounded-circle user_img_msg" alt="img avatar1" />
                      </div>
                      <div className="msg_cotainer">
                        Hi, how are you samim?
                        <span className="msg_time">8:40 AM, Today</span>
                      </div>
                    </div>
                    <div className="d-flex justify-content-end mb-4">
                      <div className="msg_cotainer_send">
                        Hi Khalid i am good tnx how about you?
                        <span className="msg_time_send">8:55 AM, Today</span>
                      </div>
                      <div className="img_cont_msg">
                        <img src="images/avatar/2.jpg" className="rounded-circle user_img_msg" alt="img avatar" />
                      </div>
                    </div>
                    <div className="d-flex justify-content-start mb-4">
                      <div className="img_cont_msg">
                        <img src="images/avatar/1.jpg" className="rounded-circle user_img_msg" alt="img avatar" />
                      </div>
                      <div className="msg_cotainer">
                        I am good too, thank you for your chat template
                        <span className="msg_time">9:00 AM, Today</span>
                      </div>
                    </div>
                    <div className="d-flex justify-content-end mb-4">
                      <div className="msg_cotainer_send">
                        You are welcome
                        <span className="msg_time_send">9:05 AM, Today</span>
                      </div>
                      <div className="img_cont_msg">
                        <img src="images/avatar/2.jpg" className="rounded-circle user_img_msg" alt="img avatar" />
                      </div>
                    </div>
                    <div className="d-flex justify-content-start mb-4">
                      <div className="img_cont_msg">
                        <img src="images/avatar/1.jpg" className="rounded-circle user_img_msg" alt="img avatar" />
                      </div>
                      <div className="msg_cotainer">
                        I am looking for your next templates
                        <span className="msg_time">9:07 AM, Today</span>
                      </div>
                    </div>
                    <div className="d-flex justify-content-end mb-4">
                      <div className="msg_cotainer_send">
                        Ok, thank you have a good day
                        <span className="msg_time_send">9:10 AM, Today</span>
                      </div>
                      <div className="img_cont_msg">
                        <img src="images/avatar/2.jpg" className="rounded-circle user_img_msg" alt="img avatar" />
                      </div>
                    </div>
                    <div className="d-flex justify-content-start mb-4">
                      <div className="img_cont_msg">
                        <img src="images/avatar/1.jpg" className="rounded-circle user_img_msg" alt="img avatar" />
                      </div>
                      <div className="msg_cotainer">
                        Bye, see you
                        <span className="msg_time">9:12 AM, Today</span>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer type_msg">
                    <div className="input-group">
                      <textarea className="form-control" placeholder="Type your message..." defaultValue={""} />
                      <div className="input-group-append">
                        <button type="button" className="btn btn-primary"><i className="fa fa-location-arrow" /></button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" id="alerts" role="tabpanel">
                <div className="card mb-sm-3 mb-md-0 contacts_card">
                  <div className="card-header chat-list-header text-center">
                    <a href="javascript:void(0);"><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd"><rect x={0} y={0} width={24} height={24} /><circle fill="#000000" cx={5} cy={12} r={2} /><circle fill="#000000" cx={12} cy={12} r={2} /><circle fill="#000000" cx={19} cy={12} r={2} /></g></svg></a>
                    <div>
                      <h6 className="mb-1">Notications</h6>
                      <p className="mb-0">Show All</p>
                    </div>
                    <a href="javascript:void(0);"><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd"><rect x={0} y={0} width={24} height={24} /><path d="M14.2928932,16.7071068 C13.9023689,16.3165825 13.9023689,15.6834175 14.2928932,15.2928932 C14.6834175,14.9023689 15.3165825,14.9023689 15.7071068,15.2928932 L19.7071068,19.2928932 C20.0976311,19.6834175 20.0976311,20.3165825 19.7071068,20.7071068 C19.3165825,21.0976311 18.6834175,21.0976311 18.2928932,20.7071068 L14.2928932,16.7071068 Z" fill="#000000" fillRule="nonzero" opacity="0.3" /><path d="M11,16 C13.7614237,16 16,13.7614237 16,11 C16,8.23857625 13.7614237,6 11,6 C8.23857625,6 6,8.23857625 6,11 C6,13.7614237 8.23857625,16 11,16 Z M11,18 C7.13400675,18 4,14.8659932 4,11 C4,7.13400675 7.13400675,4 11,4 C14.8659932,4 18,7.13400675 18,11 C18,14.8659932 14.8659932,18 11,18 Z" fill="#000000" fillRule="nonzero" /></g></svg></a>
                  </div>
                  <div className="card-body contacts_body p-0 dlab-scroll" id="DLAB_W_Contacts_Body1">
                    <ul className="contacts">
                      <li className="name-first-letter">SEVER STATUS</li>
                      <li className="active">
                        <div className="d-flex bd-highlight">
                          <div className="img_cont primary">KK</div>
                          <div className="user_info">
                            <span>David Nester Birthday</span>
                            <p className="text-primary">Today</p>
                          </div>
                        </div>
                      </li>
                      <li className="name-first-letter">SOCIAL</li>
                      <li>
                        <div className="d-flex bd-highlight">
                          <div className="img_cont success">RU</div>
                          <div className="user_info">
                            <span>Perfection Simplified</span>
                            <p>Jame Smith commented on your status</p>
                          </div>
                        </div>
                      </li>
                      <li className="name-first-letter">SEVER STATUS</li>
                      <li>
                        <div className="d-flex bd-highlight">
                          <div className="img_cont primary">AU</div>
                          <div className="user_info">
                            <span>AharlieKane</span>
                            <p>Sami is online</p>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="d-flex bd-highlight">
                          <div className="img_cont info">MO</div>
                          <div className="user_info">
                            <span>Athan Jacoby</span>
                            <p>Nargis left 30 mins ago</p>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="card-footer" />
                </div>
              </div>
              <div className="tab-pane fade" id="notes">
                <div className="card mb-sm-3 mb-md-0 note_card">
                  <div className="card-header chat-list-header text-center">
                    <a href="javascript:void(0);"><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd"><rect fill="#000000" x={4} y={11} width={16} height={2} rx={1} /><rect fill="#000000" opacity="0.3" transform="translate(12.000000, 12.000000) rotate(-270.000000) translate(-12.000000, -12.000000) " x={4} y={11} width={16} height={2} rx={1} /></g></svg></a>
                    <div>
                      <h6 className="mb-1">Notes</h6>
                      <p className="mb-0">Add New Nots</p>
                    </div>
                    <a href="javascript:void(0);"><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd"><rect x={0} y={0} width={24} height={24} /><path d="M14.2928932,16.7071068 C13.9023689,16.3165825 13.9023689,15.6834175 14.2928932,15.2928932 C14.6834175,14.9023689 15.3165825,14.9023689 15.7071068,15.2928932 L19.7071068,19.2928932 C20.0976311,19.6834175 20.0976311,20.3165825 19.7071068,20.7071068 C19.3165825,21.0976311 18.6834175,21.0976311 18.2928932,20.7071068 L14.2928932,16.7071068 Z" fill="#000000" fillRule="nonzero" opacity="0.3" /><path d="M11,16 C13.7614237,16 16,13.7614237 16,11 C16,8.23857625 13.7614237,6 11,6 C8.23857625,6 6,8.23857625 6,11 C6,13.7614237 8.23857625,16 11,16 Z M11,18 C7.13400675,18 4,14.8659932 4,11 C4,7.13400675 7.13400675,4 11,4 C14.8659932,4 18,7.13400675 18,11 C18,14.8659932 14.8659932,18 11,18 Z" fill="#000000" fillRule="nonzero" /></g></svg></a>
                  </div>
                  <div className="card-body contacts_body p-0 dlab-scroll" id="DLAB_W_Contacts_Body2">
                    <ul className="contacts">
                      <li className="active">
                        <div className="d-flex bd-highlight">
                          <div className="user_info">
                            <span>New order placed..</span>
                            <p>10 Aug 2020</p>
                          </div>
                          <div className="ms-auto">
                            <a href="javascript:void(0);" className="btn btn-primary btn-xs sharp me-1"><i className="fas fa-pencil-alt" /></a>
                            <a href="javascript:void(0);" className="btn btn-danger btn-xs sharp"><i className="fa fa-trash" /></a>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="d-flex bd-highlight">
                          <div className="user_info">
                            <span>Youtube, a video-sharing website..</span>
                            <p>10 Aug 2020</p>
                          </div>
                          <div className="ms-auto">
                            <a href="javascript:void(0);" className="btn btn-primary btn-xs sharp me-1"><i className="fas fa-pencil-alt" /></a>
                            <a href="javascript:void(0);" className="btn btn-danger btn-xs sharp"><i className="fa fa-trash" /></a>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="d-flex bd-highlight">
                          <div className="user_info">
                            <span>john just buy your product..</span>
                            <p>10 Aug 2020</p>
                          </div>
                          <div className="ms-auto">
                            <a href="javascript:void(0);" className="btn btn-primary btn-xs sharp me-1"><i className="fas fa-pencil-alt" /></a>
                            <a href="javascript:void(0);" className="btn btn-danger btn-xs sharp"><i className="fa fa-trash" /></a>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="d-flex bd-highlight">
                          <div className="user_info">
                            <span>Athan Jacoby</span>
                            <p>10 Aug 2020</p>
                          </div>
                          <div className="ms-auto">
                            <a href="javascript:void(0);" className="btn btn-primary btn-xs sharp me-1"><i className="fas fa-pencil-alt" /></a>
                            <a href="javascript:void(0);" className="btn btn-danger btn-xs sharp"><i className="fa fa-trash" /></a>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/***********************************
              Chat box End
          ************************************/}

                {/***********************************
              Header start
          ************************************/}
        <div className="header border-bottom">
          <div className="header-content">
            <nav className="navbar navbar-expand">
              <div className="collapse navbar-collapse justify-content-between">
                <div className="header-left">
                  <div className="dashboard_bar">
                    Dashboard
                  </div>
                </div>
                <ul className="navbar-nav header-right">
                  <li className="nav-item d-flex align-items-center">
                    <div className="input-group search-area">
                      <input type="text" className="form-control" placeholder="Search here..." />
                      <span className="input-group-text"><a href="javascript:void(0)"><i className="flaticon-381-search-2" /></a></span>
                    </div>
                  </li>
                  <li className="nav-item dropdown notification_dropdown">
                    <a className="nav-link " href="javascript:void(0);">
                      <svg width={28} height={28} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M26.7727 10.8757C26.7043 10.6719 26.581 10.4909 26.4163 10.3528C26.2516 10.2146 26.0519 10.1247 25.8393 10.0929L18.3937 8.95535L15.0523 1.83869C14.9581 1.63826 14.8088 1.46879 14.6218 1.35008C14.4349 1.23137 14.218 1.16833 13.9965 1.16833C13.775 1.16833 13.5581 1.23137 13.3712 1.35008C13.1842 1.46879 13.0349 1.63826 12.9407 1.83869L9.59934 8.95535L2.15367 10.0929C1.9416 10.1252 1.74254 10.2154 1.57839 10.3535C1.41423 10.4916 1.29133 10.6723 1.22321 10.8757C1.15508 11.0791 1.14436 11.2974 1.19222 11.5065C1.24008 11.7156 1.34468 11.9075 1.49451 12.061L6.92067 17.6167L5.63734 25.4777C5.60232 25.6934 5.6286 25.9147 5.7132 26.1162C5.79779 26.3177 5.93729 26.4914 6.1158 26.6175C6.29432 26.7436 6.50466 26.817 6.72287 26.8294C6.94108 26.8418 7.15838 26.7926 7.35001 26.6875L14 23.0149L20.65 26.6875C20.8416 26.7935 21.0592 26.8434 21.2779 26.8316C21.4965 26.8197 21.7075 26.7466 21.8865 26.6205C22.0655 26.4944 22.2055 26.3204 22.2903 26.1186C22.3751 25.9167 22.4014 25.695 22.3662 25.4789L21.0828 17.6179L26.5055 12.061C26.6546 11.9071 26.7585 11.715 26.8056 11.5059C26.8527 11.2968 26.8413 11.0787 26.7727 10.8757Z" fill="#717579" />
                      </svg>
                      <span className="badge light text-white bg-secondary rounded-circle">76</span>
                    </a>
                  </li>	
                  <li className="nav-item dropdown notification_dropdown">
                    <a className="nav-link" href="javascript:void(0);" role="button" data-bs-toggle="dropdown">
                      <svg width={28} height={28} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23.3333 19.8333H23.1187C23.2568 19.4597 23.3295 19.065 23.3333 18.6666V12.8333C23.3294 10.7663 22.6402 8.75902 21.3735 7.12565C20.1068 5.49228 18.3343 4.32508 16.3333 3.80679V3.49996C16.3333 2.88112 16.0875 2.28763 15.6499 1.85004C15.2123 1.41246 14.6188 1.16663 14 1.16663C13.3812 1.16663 12.7877 1.41246 12.3501 1.85004C11.9125 2.28763 11.6667 2.88112 11.6667 3.49996V3.80679C9.66574 4.32508 7.89317 5.49228 6.6265 7.12565C5.35983 8.75902 4.67058 10.7663 4.66667 12.8333V18.6666C4.67053 19.065 4.74316 19.4597 4.88133 19.8333H4.66667C4.35725 19.8333 4.0605 19.9562 3.84171 20.175C3.62292 20.3938 3.5 20.6905 3.5 21C3.5 21.3094 3.62292 21.6061 3.84171 21.8249C4.0605 22.0437 4.35725 22.1666 4.66667 22.1666H23.3333C23.6428 22.1666 23.9395 22.0437 24.1583 21.8249C24.3771 21.6061 24.5 21.3094 24.5 21C24.5 20.6905 24.3771 20.3938 24.1583 20.175C23.9395 19.9562 23.6428 19.8333 23.3333 19.8333Z" fill="#717579" />
                        <path d="M9.9819 24.5C10.3863 25.2088 10.971 25.7981 11.6766 26.2079C12.3823 26.6178 13.1838 26.8337 13.9999 26.8337C14.816 26.8337 15.6175 26.6178 16.3232 26.2079C17.0288 25.7981 17.6135 25.2088 18.0179 24.5H9.9819Z" fill="#717579" />
                      </svg>
                      <span className="badge light text-white bg-warning rounded-circle">12</span>
                    </a>
                    <div className="dropdown-menu dropdown-menu-end">
                      <div id="DZ_W_Notification1" className="widget-media dlab-scroll p-3" style={{height: 380}}>
                        <ul className="timeline">
                          <li>
                            <div className="timeline-panel">
                              <div className="media me-2">
                                <img alt="image" width={50} src="images/avatar/1.jpg" />
                              </div>
                              <div className="media-body">
                                <h6 className="mb-1">Dr sultads Send you Photo</h6>
                                <small className="d-block">29 July 2020 - 02:26 PM</small>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="timeline-panel">
                              <div className="media me-2 media-info">
                                KG
                              </div>
                              <div className="media-body">
                                <h6 className="mb-1">Resport created successfully</h6>
                                <small className="d-block">29 July 2020 - 02:26 PM</small>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="timeline-panel">
                              <div className="media me-2 media-success">
                                <i className="fa fa-home" />
                              </div>
                              <div className="media-body">
                                <h6 className="mb-1">Reminder : Treatment Time!</h6>
                                <small className="d-block">29 July 2020 - 02:26 PM</small>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="timeline-panel">
                              <div className="media me-2">
                                <img alt="image" width={50} src="images/avatar/1.jpg" />
                              </div>
                              <div className="media-body">
                                <h6 className="mb-1">Dr sultads Send you Photo</h6>
                                <small className="d-block">29 July 2020 - 02:26 PM</small>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="timeline-panel">
                              <div className="media me-2 media-danger">
                                KG
                              </div>
                              <div className="media-body">
                                <h6 className="mb-1">Resport created successfully</h6>
                                <small className="d-block">29 July 2020 - 02:26 PM</small>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="timeline-panel">
                              <div className="media me-2 media-primary">
                                <i className="fa fa-home" />
                              </div>
                              <div className="media-body">
                                <h6 className="mb-1">Reminder : Treatment Time!</h6>
                                <small className="d-block">29 July 2020 - 02:26 PM</small>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <a className="all-notification" href="javascript:void(0);">See all notifications <i className="ti-arrow-end" /></a>
                    </div>
                  </li>
                  <li className="nav-item dropdown notification_dropdown">
                    <a className="nav-link bell-link " href="javascript:void(0);">
                      <svg width={28} height={28} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M27.076 6.24662C26.962 5.48439 26.5787 4.78822 25.9955 4.28434C25.4123 3.78045 24.6679 3.50219 23.8971 3.5H4.10289C3.33217 3.50219 2.58775 3.78045 2.00456 4.28434C1.42137 4.78822 1.03803 5.48439 0.924011 6.24662L14 14.7079L27.076 6.24662Z" fill="#717579" />
                        <path d="M14.4751 16.485C14.3336 16.5765 14.1686 16.6252 14 16.6252C13.8314 16.6252 13.6664 16.5765 13.5249 16.485L0.875 8.30025V21.2721C0.875926 22.1279 1.2163 22.9484 1.82145 23.5536C2.42659 24.1587 3.24707 24.4991 4.10288 24.5H23.8971C24.7529 24.4991 25.5734 24.1587 26.1786 23.5536C26.7837 22.9484 27.1241 22.1279 27.125 21.2721V8.29938L14.4751 16.485Z" fill="#717579" />
                      </svg>
                      <span className="badge light text-white bg-danger rounded-circle">76</span>
                    </a>
                  </li>	
                  <li className="nav-item dropdown notification_dropdown">
                    <a className="nav-link " href="javascript:void(0);" data-bs-toggle="dropdown">
                      <svg width={28} height={28} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.1666 5.83331H20.9999V3.49998C20.9999 3.19056 20.877 2.89381 20.6582 2.67502C20.4394 2.45623 20.1427 2.33331 19.8333 2.33331C19.5238 2.33331 19.2271 2.45623 19.0083 2.67502C18.7895 2.89381 18.6666 3.19056 18.6666 3.49998V5.83331H9.33325V3.49998C9.33325 3.19056 9.21034 2.89381 8.99154 2.67502C8.77275 2.45623 8.47601 2.33331 8.16659 2.33331C7.85717 2.33331 7.56042 2.45623 7.34163 2.67502C7.12284 2.89381 6.99992 3.19056 6.99992 3.49998V5.83331H5.83325C4.90499 5.83331 4.01476 6.20206 3.35838 6.85844C2.702 7.51482 2.33325 8.40506 2.33325 9.33331V10.5H25.6666V9.33331C25.6666 8.40506 25.2978 7.51482 24.6415 6.85844C23.9851 6.20206 23.0948 5.83331 22.1666 5.83331Z" fill="#717579" />
                        <path d="M2.33325 22.1666C2.33325 23.0949 2.702 23.9851 3.35838 24.6415C4.01476 25.2979 4.90499 25.6666 5.83325 25.6666H22.1666C23.0948 25.6666 23.9851 25.2979 24.6415 24.6415C25.2978 23.9851 25.6666 23.0949 25.6666 22.1666V12.8333H2.33325V22.1666Z" fill="#717579" />
                      </svg>
                      <span className="badge light text-white bg-success rounded-circle">!</span>
                    </a>
                    <div className="dropdown-menu dropdown-menu-end">
                      <div id="DZ_W_TimeLine02" className="widget-timeline dlab-scroll style-1 ps ps--active-y p-3 height370">
                        <ul className="timeline">
                          <li>
                            <div className="timeline-badge primary" />
                            <a className="timeline-panel text-muted" href="javascript:void(0);">
                              <span>10 minutes ago</span>
                              <h6 className="mb-0">Youtube, a video-sharing website, goes live <strong className="text-primary">$500</strong>.</h6>
                            </a>
                          </li>
                          <li>
                            <div className="timeline-badge info">
                            </div>
                            <a className="timeline-panel text-muted" href="javascript:void(0);">
                              <span>20 minutes ago</span>
                              <h6 className="mb-0">New order placed <strong className="text-info">#XF-2356.</strong></h6>
                              <p className="mb-0">Quisque a consequat ante Sit amet magna at volutapt...</p>
                            </a>
                          </li>
                          <li>
                            <div className="timeline-badge danger">
                            </div>
                            <a className="timeline-panel text-muted" href="javascript:void(0);">
                              <span>30 minutes ago</span>
                              <h6 className="mb-0">john just buy your product <strong className="text-warning">Sell $250</strong></h6>
                            </a>
                          </li>
                          <li>
                            <div className="timeline-badge success">
                            </div>
                            <a className="timeline-panel text-muted" href="javascript:void(0);">
                              <span>15 minutes ago</span>
                              <h6 className="mb-0">StumbleUpon is acquired by eBay. </h6>
                            </a>
                          </li>
                          <li>
                            <div className="timeline-badge warning">
                            </div>
                            <a className="timeline-panel text-muted" href="javascript:void(0);">
                              <span>20 minutes ago</span>
                              <h6 className="mb-0">Mashable, a news website and blog, goes live.</h6>
                            </a>
                          </li>
                          <li>
                            <div className="timeline-badge dark">
                            </div>
                            <a className="timeline-panel text-muted" href="javascript:void(0);">
                              <span>20 minutes ago</span>
                              <h6 className="mb-0">Mashable, a news website and blog, goes live.</h6>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                  <li className="nav-item dropdown  header-profile">
                    <a className="nav-link" href="javascript:void(0);" role="button" data-bs-toggle="dropdown">
                      <img src="images/user.jpg" width={56} alt="image" />
                    </a>
                    <div className="dropdown-menu dropdown-menu-end">
                      <Link to={"/listUser"} className="dropdown-item ai-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18}  viewBox="0 0 640 512" ><path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z"/></svg>  
                        <span className="ms-2">Personnel </span>
                      </Link>
                        <Link to={"/vitrine"} className="dropdown-item ai-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" className="text-primary" width={18} height={18} viewBox="0 0 512 512"><path d="M345 39.1L472.8 168.4c52.4 53 52.4 138.2 0 191.2L360.8 472.9c-9.3 9.4-24.5 9.5-33.9 .2s-9.5-24.5-.2-33.9L438.6 325.9c33.9-34.3 33.9-89.4 0-123.7L310.9 72.9c-9.3-9.4-9.2-24.6 .2-33.9s24.6-9.2 33.9 .2zM0 229.5V80C0 53.5 21.5 32 48 32H197.5c17 0 33.3 6.7 45.3 18.7l168 168c25 25 25 65.5 0 90.5L277.3 442.7c-25 25-65.5 25-90.5 0l-168-168C6.7 262.7 0 246.5 0 229.5zM144 144a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/></svg> 
                        <span className="ms-2">Vitrine </span>
                      </Link>
                      <Link to={"/profile"} className="dropdown-item ai-icon">
                        <svg id="icon-user1" xmlns="http://www.w3.org/2000/svg" className="text-primary" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx={12} cy={7} r={4} /></svg>
                        <span className="ms-2">Profile ( { stateUserByEmail  } )</span>
                      </Link>
                      
                      <Link to={"/"} className="dropdown-item ai-icon">
                        <svg id="icon-logout" xmlns="http://www.w3.org/2000/svg" className="text-danger" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1={21} y1={12} x2={9} y2={12} /></svg>
                        <span className="ms-2" onClick={ deconnexion }>Deconnexion </span>
                      </Link>
                    </div>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
        {/***********************************
              Header end ti-comment-alt
          ************************************/}
    </>
  )
}
export default Header;