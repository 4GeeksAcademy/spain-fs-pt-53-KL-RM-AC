// import React, { useState, useContext } from 'react';
// import { Context } from '../store/appContext'; // Ajusta la ruta de importación según tu estructura

// export const Finderprueba = () => {
//   const { actions, store } = useContext(Context);
//   const [filters, setFilters] = useState({
//     pet: '',
//     gender: '',
//     budget: '',
//     find_roomie: '',
//   });

//   const handleChange = (e) => {
//     setFilters({ ...filters, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     actions.getFilteredUsers(filters);
//   };

//   return (
//     <div>
//       {/* Formulario para filtros */}
//       <form onSubmit={handleSubmit}>
//         {/* Inputs para pet, gender, budget, find_roomie */}
//         <button type="submit">Buscar</button>
//       </form>

//       {/* Mostrar resultados */}
//       <div>
//         {store.filteredUsers.map((user) => (
//           <div key={user.id}>
//             <p>{user.user_name} {user.last_name}</p>
//             {/* Más datos del usuario si se requiere */}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };


