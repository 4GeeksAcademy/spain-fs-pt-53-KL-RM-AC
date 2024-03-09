// import React, { useContext, useEffect, useState } from "react";
// import { Context } from "../store/appContext";
// import { Link, useNavigate, userSearchParams } from "react-router-dom";


// export const ProfileCard = () => {
//     const { store, actions } = useContext(Context);
//     const [usersData, setUsersData] = useState([]);
//     const [userSearchParams, setUserSearchParams] = userSearchParams();
    

//     const navigate = useNavigate();
//     const handleClick = (userData) => {
//         navigate("/learnmore", { state: { user: userData } })
//     }

//     //añadir favoritos
//     const handleAddToFavorites = async (profileId) => {
//         try {
//             await actions.addFavoriteProfile(store, profileId);
//             // Puedes realizar acciones adicionales después de agregar a favoritos, si es necesario
//         } catch (error) {
//             console.error('Error al agregar a favoritos:', error);
//         }
//     };


//     useEffect(() => {
//         //Llamar a la acción para obtener todos los usuarios cuando el componente se monta
//         actions.syncTokenFromLocalStorage()
//         if (store.token === "" || store.token === null) {
//             navigate("/");
//         }
//         else {
//             actions.getAllUsers().then(data => {
//                 if (data && data.length) {
//                     setUsersData(data);
//                 }
//             });
//         }
//     }, []);


//     return (
//         <div>
//             {usersData.map((userData, index) => (
//                 <div className="card" style={{ width: "20rem" }} key={index}>
//                     <div className="card-body">
//                         <div className="card-upper">
//                             <img src="https://c0.klipartz.com/pngpicture/527/663/gratis-png-logo-persona-usuario-icono-de-persona-thumbnail.png" className="img-fluid rounded-circle" alt="" />
//                         </div>
//                         <hr></hr>
//                         <div className="card-center d-flex justify-content-around">
//                             <h5 className="card-title-name">{userData.user_name}</h5>
//                             <h5 className="card-title-name">{userData.last_name}</h5>
//                         </div>
//                         <div className="more-data d-flex justify-content-around">
//                             <p>{userData.properties.gender}</p>
//                             <p>{userData.properties.find_roomie}</p>
//                             <p>{userData.properties.pet}</p>
//                             <p>{userData.properties.budget}</p>
//                         </div>
//                         <div className="d-flex p-3 justify-content-between">
//                             <div className="d-grid gap-2 d-md-flex">

//                                 <button onClick={() => {
//                                     handleClick(userData)
//                                 }} type="button" className="btn btn-success">Saber más</button>

//                             </div>
//                             <div className="d-grid gap-1 d-md-flex justify-content-md-end">
//                                 <button
//                                     onClick={() => handleAddToFavorites(userData.id)}
//                                     className="btn btn-link text-end text-decoration-none"
//                                 >
//                                     <i className="fas fa-heart"></i>
//                                     <i className="far fa-heart"></i>
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// };
