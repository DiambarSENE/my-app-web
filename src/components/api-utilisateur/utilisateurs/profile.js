import React, { useCallback, useContext, useEffect, useState } from "react";
import Footer from "../../templates/Footer";
import Header from "../../templates/header";
import SideNav from "../../templates/SideNav";
import { AppContextEmailByToken, AppContextRole, AppContextRoleByToken, AppContextToken, AppContextUserByEmail, useAuth } from "../../../useContext/contextStateUser";
import { getAuthToken, getUserByEmail, updatePassword, updateUser, getEmailInLocalStorage } from "../../../servicesApi/microservice-utilisateur";
import { decodeJWT } from "../../../validateur/decoteToken";
import Connexion from "./connexion";
import { useNavigate } from "react-router";

function Profile(){
     const navigate = useNavigate();
    const emailInLocalStorage = getEmailInLocalStorage();
      //j'utilise le token pour la redirection entre le page d'accueil et la page de connexion
     //const {stateToken , setStateToken} = useContext(AppContextToken);   
      const {stateToken} = useAuth(); // ✅ Récupère correctement le token depuis le contexte
    // const [componentToShow, setComponentToShow] = useState("");
     //const [userRoles, setUseRoles] = useState([]);
    const {stateRoleFromToken, setStateRoleFromToken} = useContext(AppContextRoleByToken);
    //const {stateEmailFromToken , setStateEmailFromToken} = useContext(AppContextEmailByToken);
    const {stateUserByEmail, setStateUserByEmail} = useContext(AppContextUserByEmail);
  

    const [errorPass1, setErrorPass1] = useState("");
    const [errorPassNew1, setErrorPassNew1] = useState("");
    const [errorPassNew2, setErrorPassNew2] = useState("");
    
    const [id, setId] = useState();
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [telephone, setTelephone] = useState("");
    const [matricule , setMatricule] = useState("");
    const [email, setEmail] = useState("");
    const [activer , setActiver] = useState(false);
    const [createBy, setCreateBy] = useState("");
    const [adresse, setAdresse] = useState("");
    const [password1, setPassword1] = useState("");

    const [passwordNew, setPasswordNew] = useState("");
    const [confirmerPassword, setConfirmerPassword] = useState("");

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


    const handlerUpdatePass = (e) => {
        e.preventDefault();
        //Réinitialisation des messages d'erreurs
        setErrorPassNew1("");
        setErrorPassNew2("");
        setErrorPass1("");

        if(!password1){
            setErrorPass1("L'ancien mot de passe ne doit pas être vide.");
            return;
        }

        if(!passwordNew || passwordNew.length < 4){
            setErrorPassNew1("Le mot de passe ne doit pas être vide et doit contenir au moins 4 caractères.");
            return;
        }
        if (!passwordNew || !confirmerPassword) {
            setErrorPassNew1("Veuillez saisir et confirmer le nouveau mot de passe.");
            return;
        }
    
        if (passwordNew !== confirmerPassword) {
            setErrorPassNew2("Les mots de passe doivent être identiques.");
            return;
        }
        const password = passwordNew
        // Si toutes les conditions sont remplies
        const updatePass = { email, password };
        updatePassword(updatePass).then(resp => {
            alert("Mot de passe modifié avec succès !");
            setPasswordNew("");
            setPassword1("");
            setConfirmerPassword("");
        });

        // if(passwordNew){
        //     if (password1 || confirmerPassword){
        //         if(password1 === confirmerPassword){
        //            const password = passwordNew;
        //            let updatePass = {email, password};
        //             updatePassword(updatePass).then(resp =>{
        //                 alert("Mot de passe modifier avec succes");
        //                 setPasswordNew("");
        //                 setPassword1("");
        //                 setConfirmerPassword("")
        //            })
        //         }else{
        //             setErrorPass("vos mot de pas doit etre identique")
        //         }
        //     }else{
        //         setErrorPass("Ajouter/confirmer le nouveau mot de passe")
        //     }
        // }else{
        //     setErrorPass1("Entrez votre mot de passe")
        // }
    };

    useEffect(() => {
        if(emailInLocalStorage){
        findUserByEmail(emailInLocalStorage)
        }
    }, [emailInLocalStorage]);

    const findUserByEmail = (emailInLocalStorage) => {
        getUserByEmail(emailInLocalStorage)
            .then(response => {
                let user = response.data;
            //setStateUserByEmail(response.data)
            setId(user.id)
            setNom(user.nom);
            setPrenom(user.prenom);
            setTelephone(user.telephone);
            setMatricule(user.matricule);
            setEmail(user.email);
            setActiver(user.activer);
            setAdresse(user.adresse);
            setCreateBy(user.createBy)
        })
        .catch(err =>{
            console.error(err);
        })
    };
   

    const handlerUpdateUser = (e) => {
        e.preventDefault();
        let user = { id, prenom, nom, telephone, matricule, email, createBy, activer};

        updateUser(user)
            .then(resp =>{
              // {handleClose();}
            //getUsers()
                //  .then( resp => {
                //    setStateUtilisateur(resp.data);
            //}) 
            alert("utilisatur modifier avec success")
            
            } )
         .catch(err => {
          console.log(err)
      });
    };

    return(
        <>
           {
             !stateToken || stateToken === "null" ? (
                <Connexion/>
              ) :
               (
                <>
                <Header/>
                <SideNav/>
     
                 {/***********************************
                      Content body start
                 ************************************/}
                     <div className="content-body">
                         <div className="container-fluid">
                         <div className="row page-titles">
                             <ol className="breadcrumb">
                             <li className="breadcrumb-item active"><a href="javascript:void(0)">App</a></li>
                             <li className="breadcrumb-item"><a href="javascript:void(0)">Profile</a></li>
                             </ol>
                         </div>
                         {/* row */}
                         <div className="row">
                             <div className="col-lg-12">
                             <div className="profile card card-body px-3 pt-3 pb-0">
                                 <div className="profile-head">
                                 <div className="photo-content">
                                     <div className="cover-photo rounded" />
                                 </div>
                                 <div className="profile-info">
                                     <div className="profile-photo">
                                     <img src="images/profile/profile.png" className="img-fluid rounded-circle" alt />
                                     </div>
                                     <div className="profile-details">
                                     <div className="profile-name px-3 pt-2">
                                         <h4 className="text-primary mb-0">{prenom } { nom }</h4>
                                         <p>Presnom & Nom</p>
                                     </div>
                                     <div className="profile-email px-2 pt-2">
                                         <h4 className="text-muted mb-0">{email}</h4>
                                         <p>Email</p>
                                     </div>
                                     {/* <div className="dropdown ms-auto">
                                         <a href="#" className="btn btn-primary light sharp" data-bs-toggle="dropdown" aria-expanded="true"><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd"><rect x={0} y={0} width={24} height={24} /><circle fill="#000000" cx={5} cy={12} r={2} /><circle fill="#000000" cx={12} cy={12} r={2} /><circle fill="#000000" cx={19} cy={12} r={2} /></g></svg></a>
                                         <ul className="dropdown-menu dropdown-menu-end">
                                         <li className="dropdown-item"><i className="fa fa-user-circle text-primary me-2" /> View profile</li>
                                         <li className="dropdown-item"><i className="fa fa-users text-primary me-2" /> Add to btn-close friends</li>
                                         <li className="dropdown-item"><i className="fa fa-plus text-primary me-2" /> Add to group</li>
                                         <li className="dropdown-item"><i className="fa fa-ban text-primary me-2" /> Block</li>
                                         </ul>
                                     </div> */}
                                     </div>
                                 </div>
                                 </div>
                             </div>
                             </div>
                         </div>
                         <div className="row">
                             <div className="col-xl-4">
                             <div className="row">
                                 <div className="col-xl-12">
                                 <div className="card">
                                     <div className="card-body">
                                     <div className="profile-statistics">
                                         <div className="text-center">
                                         <div className="row">
                                         <h3 className="m-b-0">Si vous souhaitez modifier votre mot de passe</h3><span>Cliquez sur le bouton ci-dessous</span>
                                             {/* <div className="col">
                                             <h3 className="m-b-0">150</h3><span>Follower</span>
                                             </div>
                                             <div className="col">
                                             <h3 className="m-b-0">140</h3><span>Place Stay</span>
                                             </div>
                                             <div className="col">
                                             <h3 className="m-b-0">45</h3><span>Reviews</span>
                                             </div> */}
                                         </div>
                                         <div className="mt-4">
                                             {/* <a href="javascript:void(0);" className="btn btn-primary mb-1 me-1">Follow</a>  */}
                                             <a href="javascript:void(0);" className="btn btn-primary mb-1" data-bs-toggle="modal" data-bs-target="#sendMessageModal">+ Modifier Votre mot de passe</a>
                                         </div>
                                         </div>
                                         {/* Modal */}
                                         <div className="modal fade" id="sendMessageModal">
                                         <div className="modal-dialog modal-dialog-centered" role="document">
                                             <div className="modal-content">
                                             <div className="modal-header">
                                                 <h5 className="modal-title">Modification mot de passe</h5>
                                                 <button type="button" className="btn-close" data-bs-dismiss="modal" />
                                             </div>
                                             <div className="modal-body">
                                                 <form className="comment-form" onSubmit={ handlerUpdatePass }>
                                                 <div className="row"> 
                                                 <div className="col-lg-12">
                                                     <div className="mb-3">
                                                         <label className="text-black font-w600 form-label">Ancien mot de passe <span className="required" style={{color: "red"}}>*</span></label>
                                                         <input type="password" className="form-control" name="password" value={password1} onChange={(e) => setPassword1(e.target.value)} placeholder="Votre ancien mot de passe"  />
                                                         <span style={{ color: "red"}}>{errorPass1}</span>
                                                     </div>
                                                     </div>
                                                     <div className="col-lg-6">
                                                     <div className="mb-3">
                                                         <label className="text-black font-w600 form-label">Nouveau mot de passe <span className="required" style={{color: "red"}}>*</span></label>
                                                         <input value={passwordNew} onChange={(e) => setPasswordNew(e.target.value)} type="password" className="form-control" placeholder="Nouveau mot de passe"/>
                                                         <span style={{ color: "red"}}>{errorPassNew1}</span>
                                                     </div>
                                                     </div>
                                                     <div className="col-lg-6">
                                                     <div className="mb-3">
                                                         <label className="text-black font-w600 form-label">Confirmer nouveau mot de passe <span className="required" style={{color: "red"}}>*</span></label>
                                                         <input value={confirmerPassword} onChange={(e) => setConfirmerPassword(e.target.value)} type="password" className="form-control" placeholder="Confirmer nouveau mot de passe" />
                                                         <span style={{ color: "red"}}>{errorPassNew2}</span>
                                                     </div>
                                                     </div>
                                                     
                                                     <div className="col-lg-12">
                                                     <div className="mb-3 mb-0">
                                                         <input type="submit"  className="submit btn btn-primary" name="submit" />
                                                     </div>
                                                     </div>
                                                 </div>
                                                 </form>
                                             </div>
                                             </div>
                                         </div>
                                         </div>
                                     </div>
                                     </div>
                                 </div>
                                 </div>
                                 {/* <div className="col-xl-12">
                                 <div className="card">
                                     <div className="card-body">
                                     <div className="profile-blog">
                                         <h5 className="text-primary d-inline">Today Highlights</h5>
                                         <img src="images/profile/1.jpg" alt className="img-fluid mt-4 mb-4 w-100" />
                                         <h4><a href="post-details.html" className="text-black">Darwin Creative Agency Theme</a></h4>
                                         <p className="mb-0">A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.</p>
                                     </div>
                                     </div>
                                 </div>
                                 </div>
                                 <div className="col-xl-12">
                                 <div className="card">
                                     <div className="card-body">
                                     <div className="profile-interest">
                                         <h5 className="text-primary d-inline">Interest</h5>
                                         <div className="row mt-4 sp4" id="lightgallery">
                                         <a href="images/profile/2.jpg" data-exthumbimage="images/profile/2.jpg" data-src="images/profile/2.jpg" className="mb-1 col-lg-4 col-xl-4 col-sm-4 col-6">
                                             <img src="images/profile/2.jpg" alt className="img-fluid" />
                                         </a>
                                         <a href="images/profile/3.jpg" data-exthumbimage="images/profile/3.jpg" data-src="images/profile/3.jpg" className="mb-1 col-lg-4 col-xl-4 col-sm-4 col-6">
                                             <img src="images/profile/3.jpg" alt className="img-fluid" />
                                         </a>
                                         <a href="images/profile/4.jpg" data-exthumbimage="images/profile/4.jpg" data-src="images/profile/4.jpg" className="mb-1 col-lg-4 col-xl-4 col-sm-4 col-6">
                                             <img src="images/profile/4.jpg" alt className="img-fluid" />
                                         </a>
                                         <a href="images/profile/3.jpg" data-exthumbimage="images/profile/3.jpg" data-src="images/profile/3.jpg" className="mb-1 col-lg-4 col-xl-4 col-sm-4 col-6">
                                             <img src="images/profile/3.jpg" alt className="img-fluid" />
                                         </a>
                                         <a href="images/profile/4.jpg" data-exthumbimage="images/profile/4.jpg" data-src="images/profile/4.jpg" className="mb-1 col-lg-4 col-xl-4 col-sm-4 col-6">
                                             <img src="images/profile/4.jpg" alt className="img-fluid" />
                                         </a>
                                         <a href="images/profile/2.jpg" data-exthumbimage="images/profile/2.jpg" data-src="images/profile/2.jpg" className="mb-1 col-lg-4 col-xl-4 col-sm-4 col-6">
                                             <img src="images/profile/2.jpg" alt className="img-fluid" />
                                         </a>
                                         </div>
                                     </div>
                                     </div>
                                 </div>
                                 </div>
                                 <div className="col-xl-12">
                                 <div className="card">
                                     <div className="card-body">
                                     <div className="profile-news">
                                         <h5 className="text-primary d-inline">Our Latest News</h5>
                                         <div className="media pt-3 pb-3">
                                         <img src="images/profile/5.jpg" alt="image" className="me-3 rounded" width={75} />
                                         <div className="media-body">
                                             <h5 className="m-b-5"><a href="post-details.html" className="text-black">Collection of textile samples</a></h5>
                                             <p className="mb-0">I shared this on my fb wall a few months back, and I thought.</p>
                                         </div>
                                         </div>
                                         <div className="media pt-3 pb-3">
                                         <img src="images/profile/6.jpg" alt="image" className="me-3 rounded" width={75} />
                                         <div className="media-body">
                                             <h5 className="m-b-5"><a href="post-details.html" className="text-black">Collection of textile samples</a></h5>
                                             <p className="mb-0">I shared this on my fb wall a few months back, and I thought.</p>
                                         </div>
                                         </div>
                                         <div className="media pt-3 pb-3">
                                         <img src="images/profile/7.jpg" alt="image" className="me-3 rounded" width={75} />
                                         <div className="media-body">
                                             <h5 className="m-b-5"><a href="post-details.html" className="text-black">Collection of textile samples</a></h5>
                                             <p className="mb-0">I shared this on my fb wall a few months back, and I thought.</p>
                                         </div>
                                         </div>
                                     </div>
                                     </div>
                                 </div>
                                 </div> */}
                             </div>
                             </div>
                             <div className="col-xl-8">
                             <div className="card">
                                 <div className="card-body">
                                 <div className="profile-tab">
                                     <div className="custom-tab-1">
                                     <ul className="nav nav-tabs">
                                         <li className="nav-item"><a href="#my-posts" data-bs-toggle="tab" className="nav-link active show">Parametres Payement</a>
                                         </li>
                                         <li className="nav-item"><a href="#about-me" data-bs-toggle="tab" className="nav-link">Mon Profil</a>
                                         </li>
                                         <li className="nav-item"><a href="#profile-settings" data-bs-toggle="tab" className="nav-link">Modifier Profil</a>
                                         </li>
                                     </ul>
                                     <div className="tab-content">
                                         <div id="my-posts" className="tab-pane fade active show">
                                         <div className="my-post-content pt-3">
                                             {/* <div className="post-input">
                                        
                                         */}
                                        
                                             <h4 className="text-primary mb-4">Informations Payement</h4>
                                             <div className="row mb-2">
                                             <div className="col-sm-3 col-5">
                                                 <h5 className="f-w-500">RIB <span className="pull-end">:</span>
                                                 </h5>
                                             </div>
                                             <div className="col-sm-9 col-7"><span>Numero</span>
                                             </div>
                                             </div>
                                             <div className="row mb-2">
                                             <div className="col-sm-3 col-5">
                                                 <h5 className="f-w-500">Orange Money <span className="pull-end">:</span>
                                                 </h5>
                                             </div>
                                             <div className="col-sm-9 col-7"><span>Numero</span>
                                             </div>
                                             </div>
             
                                             <div className="row mb-2">
                                             <div className="col-sm-3 col-5">
                                                 <h5 className="f-w-500">Tigo Cach <span className="pull-end">:</span>
                                                 </h5>
                                             </div>
                                             <div className="col-sm-9 col-7"><span>Numero</span>
                                             </div>
                                             </div>
     
                                             <div className="row mb-2">
                                             <div className="col-sm-3 col-5">
                                                 <h5 className="f-w-500">Joni Joni <span className="pull-end">:</span>
                                                 </h5>
                                             </div>
                                             <div className="col-sm-9 col-7"><span>Numero</span>
                                             </div>
                                             </div>
     
                                             <div className="row mb-2">
                                             <div className="col-sm-3 col-5">
                                                 <h5 className="f-w-500">Wari <span className="pull-end">:</span>
                                                 </h5>
                                             </div>
                                             <div className="col-sm-9 col-7"><span>Numero</span>
                                             </div>
                                             </div>
                                             <div className="row mb-2">
                                             <div className="col-sm-3 col-5">
                                                 <h5 className="f-w-500">Yup <span className="pull-end">:</span>
                                                 </h5>
                                             </div>
                                             <div className="col-sm-9 col-7"><span>Numero</span>
                                             </div>
                                             </div>
                                         
                                      
                                             {/* <textarea name="textarea" id="textarea" cols={30} rows={5} className="form-control bg-transparent" placeholder="Please type what you want...." defaultValue={""} /> 
                                             */}
                                             <a href="javascript:void(0);" className="btn btn-primary mb-1" data-bs-toggle="modal" data-bs-target="#linkModal">+ Modifier les parametre de paiement </a>
                                            
                                             {/* Modal */}
                                             <div className="modal fade" id="linkModal">
                                                 <div className="modal-dialog modal-dialog-centered" role="document">
                                                 <div className="modal-content">
                                                     <div className="modal-header">
                                                     <h5 className="modal-title">MODIFICATION DES PARAMETTRES PAYEMENT</h5>
                                                     <button type="button" className="btn-close" data-bs-dismiss="modal">
                                                     </button>
                                                     </div>
                                                     <div className="modal-body">
                                                         <form>
                                                        <div className="row"> 
                                                                 <div className="col-lg-12">
                                                                 <div className="mb-3">
                                                                     <label className="form-label">RIB </label>
                                                                     <input type="number" className="form-control" name="rib"/>
                                                                 </div>
                                                                 </div>
                                                                 <div className="col-lg-6">
                                                                 <div className="mb-3">
                                                                     <label className="form-label">Orange Money</label>
                                                                     <input type="number" className="form-control" />
                                                                 </div>
                                                                 </div>
                                                                 <div className="col-lg-6">
                                                                 <div className="mb-3">
                                                                     <label className="form-label">Tigo Cach </label>
                                                                     <input type="number" className="form-control" />
                                                                 </div>
                                                                 </div>
                                                                 <div className="col-lg-6">
                                                                 <div className="mb-3">
                                                                     <label className="form-label">Joni Joni</label>
                                                                     <input type="number" className="form-control" />
                                                                 </div>
                                                                 </div>
                                                                 <div className="col-lg-6">
                                                                 <div className="mb-3">
                                                                     <label className="form-label">Wari </label>
                                                                     <input type="number" className="form-control" />
                                                                 </div>
                                                                 </div>
                                                                 <div className="col-lg-12">
                                                                 <div className="mb-3">
                                                                     <label className="form-label">Yup </label>
                                                                     <input type="number" className="form-control" />
                                                                 </div>
                                                                 </div>
                                           
                                                             <button className="btn btn-primary">+ Enregitrer
                                                             </button>
                                                         
                                                             </div>
                                                         </form>
                                                     </div>
                                                 </div>
                                                 </div>
                                             </div>
                                             {/* <a href="javascript:void(0);" className="btn btn-primary light me-1 px-3" data-bs-toggle="modal" data-bs-target="#cameraModal"><i className="fa fa-camera m-0" /> </a>
                                              */}
                                             {/* Modal */}
                                             {/* <div className="modal fade" id="cameraModal">
                                                 <div className="modal-dialog modal-dialog-centered" role="document">
                                                 <div className="modal-content">
                                                     <div className="modal-header">
                                                     <h5 className="modal-title">Upload images</h5>
                                                     <button type="button" className="btn-close" data-bs-dismiss="modal">
                                                     </button>
                                                     </div>
                                                     <div className="modal-body">
                                                     <div className="input-group mb-3">
                                                         <span className="input-group-text">Upload</span>
                                                         <div className="form-file">
                                                         <input type="file" className="form-file-input form-control" />
                                                         </div>
                                                     </div>
                                                     </div>
                                                 </div>
                                                 </div>
                                             </div> */}
                                             {/* <a href="javascript:void(0);" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#postModal">Post</a>
                                              */}
                                             {/* Modal */}
                                             {/* <div className="modal fade" id="postModal">
                                                 <div className="modal-dialog modal-dialog-centered" role="document">
                                                 <div className="modal-content">
                                                     <div className="modal-header">
                                                     <h5 className="modal-title">Post</h5>
                                                     <button type="button" className="btn-close" data-bs-dismiss="modal">
                                                     </button>
                                                     </div>
                                                     <div className="modal-body">
                                                     <textarea name="textarea" id="textarea2" cols={30} rows={5} className="form-control bg-transparent" placeholder="Please type what you want...." defaultValue={""} />
                                                     <a className="btn btn-primary btn-rounded" href="javascript:void(0)">Post</a>																		 
                                                     </div>
                                                 </div>
                                                 </div>
                                             </div> */}
                                             {/* </div> */}
                                             {/* <div className="profile-uoloaded-post border-bottom-1 pb-5">
                                             <img src="images/profile/8.jpg" alt className="img-fluid w-100 rounded" />
                                             <a className="post-title" href="post-details.html"><h3 className="text-black">Collection of textile samples lay spread</h3></a>
                                             <p>A wonderful serenity has take possession of my entire soul like these sweet morning of spare which enjoy whole heart.A wonderful serenity has take possession of my entire soul like these sweet morning
                                                 of spare which enjoy whole heart.</p>
                                             <button className="btn btn-primary me-2"><span className="me-2"><i className="fa fa-heart" /></span>Like</button>
                                             <button className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#replyModal"><span className="me-2"><i className="fa fa-reply" /></span>Reply</button>
                                             
                                             </div> */}
                                          
                                         </div>
                                         </div>
                                         <div id="about-me" className="tab-pane fade">
                                         {/* <div className="profile-about-me">
                                             <div className="pt-4 border-bottom-1 pb-3">
                                             <h4 className="text-primary">About Me</h4>
                                             <p className="mb-2">A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence was created for the bliss of souls like mine.I am so happy, my dear friend, so absorbed in the exquisite sense of mere tranquil existence, that I neglect my talents.</p>
                                             <p>A collection of textile samples lay spread out on the table - Samsa was a travelling salesman - and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame.</p>
                                             </div>
                                         </div> */}
                                         <div className="profile-skills mb-5">
                                             <br/>
                                             <h4 className="text-primary mb-2">Role(s)</h4>
                                                 {/* {
                                                     stateRoleFromToken.map(role => (
                                                         <a  href="javascript:void(0);" className="btn btn-primary light btn-xs mb-1">{ role } {"  "}</a> 
     
                                                     ))
                                                 } */}
                                              {/* <a href="javascript:void(0);" className="btn btn-primary light btn-xs mb-1">Admin</a>
                                             <a href="javascript:void(0);" className="btn btn-primary light btn-xs mb-1">Dashboard</a>
                                             <a href="javascript:void(0);" className="btn btn-primary light btn-xs mb-1">Photoshop</a>
                                             <a href="javascript:void(0);" className="btn btn-primary light btn-xs mb-1">Bootstrap</a>
                                             <a href="javascript:void(0);" className="btn btn-primary light btn-xs mb-1">Responsive</a>
                                             <a href="javascript:void(0);" className="btn btn-primary light btn-xs mb-1">Crypto</a> */}
                                         </div>
                                         {/* <div className="profile-lang  mb-5">
                                             <h4 className="text-primary mb-2">Language</h4>
                                             <a href="javascript:void(0);" className="text-muted pe-3 f-s-16"><i className="flag-icon flag-icon-us" /> English</a> 
                                             <a href="javascript:void(0);" className="text-muted pe-3 f-s-16"><i className="flag-icon flag-icon-fr" /> French</a>
                                             <a href="javascript:void(0);" className="text-muted pe-3 f-s-16"><i className="flag-icon flag-icon-bd" /> Bangla</a>
                                         </div> */}
                                         <div className="profile-personal-info">
                                             <h4 className="text-primary mb-4">Informations personnelles</h4>
                                             <div className="row mb-2">
                                             <div className="col-sm-3 col-5">
                                                 <h5 className="f-w-500">Prenom & Nom <span className="pull-end">:</span>
                                                 </h5>
                                             </div>
                                             <div className="col-sm-9 col-7"><span>{prenom } { nom}</span>
                                             </div>
                                             </div>
                                             <div className="row mb-2">
                                             <div className="col-sm-3 col-5">
                                                 <h5 className="f-w-500">Telephone <span className="pull-end">:</span>
                                                 </h5>
                                             </div>
                                             <div className="col-sm-9 col-7"><span>{telephone}</span>
                                             </div>
                                             </div>
             
                                             <div className="row mb-2">
                                             <div className="col-sm-3 col-5">
                                                 <h5 className="f-w-500">Matricule <span className="pull-end">:</span>
                                                 </h5>
                                             </div>
                                             <div className="col-sm-9 col-7"><span>{matricule}</span>
                                             </div>
                                             </div>
     
                                             <div className="row mb-2">
                                             <div className="col-sm-3 col-5">
                                                 <h5 className="f-w-500">Email <span className="pull-end">:</span>
                                                 </h5>
                                             </div>
                                             <div className="col-sm-9 col-7"><span>{email}</span>
                                             </div>
                                             </div>
     
                                             <div className="row mb-2">
                                             <div className="col-sm-3 col-5">
                                                 <h5 className="f-w-500">Adresse <span className="pull-end">:</span>
                                                 </h5>
                                             </div>
                                             <div className="col-sm-9 col-7"><span>{adresse}</span>
                                             </div>
                                             </div>
                                         </div>
                                         </div>
                                         <div id="profile-settings" className="tab-pane fade">
                                         <div className="pt-3">
                                             <div className="settings-form">
                                             <h4 className="text-primary">Paramétrage du compte</h4>
                                             <form onSubmit={handlerUpdateUser}>
                                                 <div className="row">
                                                 <div className="mb-3 col-md-6">
                                                     <label className="form-label">Prenom <span style={{ color:"red" }}>*</span> : </label>
                                                     <input value={prenom} onChange={(e) => setPrenom(e.target.value)} type="text" className="form-control" />
                                                 </div>
                                                 <div className="mb-3 col-md-6">
                                                     <label className="form-label">Nom <span style={{ color:"red" }}>*</span> : </label>
                                                     <input value={nom} onChange={(e) => setNom(e.target.value)} type="text" className="form-control" />
                                                 </div>
                                                 </div>
                                                 <div className="mb-3">
                                                 <label className="form-label">Telephone <span style={{ color:"red" }}>*</span> : </label>
                                                 <input value={telephone} onChange={ (e) => setTelephone(e.target.value)} type="tel" className="form-control" />
                                                 </div>
                                                 <div className="mb-3">
                                                 <label className="form-label">Matricule <span style={{ color:"red" }}>*</span> : </label>
                                                 <input value={matricule} onChange={ (e) => setMatricule(e.target.value)} type="text"  className="form-control" />
                                                 </div>
                                                 
                                                 <div className="row">
                                                 <div className="mb-3 col-md-6">
                                                     <label className="form-label">Email<span style={{ color:"red" }}>*</span> : </label>
                                                     <input value={email} onChange={(e) => setEmail(e.target.value)} type="email"  className="form-control" />
                                                 </div>
                                                 <div className="mb-3 col-md-6">
                                                     <label className="form-label">Adresse</label>
                                                     <input value={adresse} onChange={(e) => setAdresse(e.target.value)} type="text" placeholder="Votre adresse" className="form-control" />
                                                 </div>
                                                 </div>
                                                 {/* <div className="row">
                                                 <div className="mb-3 col-md-6">
                                                     <label className="form-label">Mot de passe</label>
                                                     <input type="password"  className="form-control" />
                                                 </div>
                                                 <div className="mb-3 col-md-6">
                                                     <label className="form-label">Confirmer le mot de passe</label>
                                                     <select className="form-control default-select wide" id="inputState">
                                                     <option selected>Choose...</option>
                                                     <option>Option 1</option>
                                                     <option>Option 2</option>
                                                     <option>Option 3</option>
                                                     </select>
                                                 </div>
                                                 </div> 
                                                 <div className="mb-3">
                                                 <div className="form-check custom-checkbox">
                                                     <input type="checkbox" className="form-check-input" id="gridCheck" />
                                                     <label className="form-check-label form-label" htmlFor="gridCheck"> Check me out</label>
                                                 </div>
                                                 </div>*/}
                                                 <button className="btn btn-primary">+ Modifier Votre profil
                                                 </button>
                                             </form>
                                             </div>
                                         </div>
                                         </div>
                                     </div>
                                     </div>
                                     {/* Modal */}
                                     <div className="modal fade" id="replyModal">
                                     <div className="modal-dialog modal-dialog-centered" role="document">
                                         <div className="modal-content">
                                         <div className="modal-header">
                                             <h5 className="modal-title">Post Reply</h5>
                                             <button type="button" className="btn-close" data-bs-dismiss="modal" />
                                         </div>
                                         <div className="modal-body">
                                             <form>
                                             <textarea className="form-control" rows={4} defaultValue={"Message"} />
                                             </form>
                                         </div>
                                         <div className="modal-footer">
                                             <button type="button" className="btn btn-danger light" data-bs-dismiss="modal">btn-close</button>
                                             <button type="button" className="btn btn-primary">Reply</button>
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
                     {/***********************************
                      Content body end
                 ************************************/}
                 <Footer/>
                 </>
               )
           }
        </>
    )
}

export default Profile;