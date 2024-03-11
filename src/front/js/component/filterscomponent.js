// import React, { useState, useContext } from 'react';
// import { Context } from '../store/appContext'; 

// const FiltersComponent = () => {
//   const { actions } = useContext(Context);
//   const [filters, setFilters] = useState({
//     pet: '',
//     gender: '',
//     budget: '',
//     find_roomie: '',
//   });

//   const handleChange = (e) => {
//     setFilters({ ...filters, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await actions.getFilteredUsers(filters);
//     } catch (error) {
//       console.error('Error fetching filtered users:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label htmlFor="pet">Mascota:</label>
//         <select name="pet" id="pet" value={filters.pet} onChange={handleChange}>
//           <option value="">Selecciona una opción</option>
//           <option value="Yes">Sí</option>
//           <option value="No">No</option>
//         </select>
//       </div>
//       <div>
//         <label htmlFor="gender">Género:</label>
//         <select name="gender" id="gender" value={filters.gender} onChange={handleChange}>
//           <option value="">Selecciona una opción</option>
//           <option value="Male">Masculino</option>
//           <option value="Female">Femenino</option>
//         </select>
//       </div>
//       <div>
//         <label htmlFor="budget">Presupuesto:</label>
//         <input
//           type="number"
//           name="budget"
//           id="budget"
//           value={filters.budget}
//           onChange={handleChange}
//           min="0"
//         />
//       </div>
//       <div>
//         <label htmlFor="find_roomie">Buscar compañero de cuarto:</label>
//         <select name="find_roomie" id="find_roomie" value={filters.find_roomie} onChange={handleChange}>
//           <option value="">Selecciona una opción</option>
//           <option value="Apartment">Con apartamento</option>
//           <option value="NoApartment">Sin apartamento</option>
//         </select>
//       </div>
//       <button type="submit">Buscar</button>
//     </form>
//   );
// };

// export default FiltersComponent;