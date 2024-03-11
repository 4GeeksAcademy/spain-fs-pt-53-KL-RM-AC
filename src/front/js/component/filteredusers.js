// import React, { useContext, useEffect, useState } from 'react';
// import { Context } from '../store/appContext';

// const FilteredUsers = () => {
//   const { store } = useContext(Context);
//   const [filteredUsers, setFilteredUsers] = useState([]);

//   useEffect(() => {
//     setFilteredUsers(store.filteredUsers || []);
//   }, [store.filteredUsers]);

//   return (
//     <div>
//       {filteredUsers.map(user => (
//         <div key={user.id}>
//           {/* Muestra la información que desees de cada usuario */}
//           <p>{user.user_name}</p>
//           {/* Y así sucesivamente */}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default FilteredUsers