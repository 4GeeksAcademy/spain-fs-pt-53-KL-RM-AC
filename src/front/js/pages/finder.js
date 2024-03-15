import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/finder.css";
import { ModalFilteredUsers } from "../component/modalFilteredUsers";
const LITERALS = {
    "Male": "Hombre",
    "Female": "Mujer",
    "Yes": "Tengo mascota",
    "No": "No tengo mascota",
    "Apartment": "Busco rommie",
    "NoApartment": "Busco habitación",
}

export const Finder = () => {
    const { store, actions } = useContext(Context);
    const [usersData, setUsersData] = useState([]);
    const [favoriteProfiles, setFavoriteProfiles] = useState([]);
    const [filters, setFilters] = useState({})
    const [noProfilesFound, setNoProfilesFound] = useState(false);
    const [filtersActive, setFiltersActive] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        actions.syncTokenFromLocalStorage();
        if (store.token === "" || store.token === null) {
            navigate("/");
        } else {
            actions.getAllUsers().then(data => {
                if (data && data.length) {
                    setUsersData(data);
                }
            });
        }
    }, []);


    const handleClick = userData => {
        navigate("/learnmore", { state: { user: userData } });
    };


    const handleSetFilter = (filter) => {
        setFilters({ ...filters, ...filter });
    };


    const handleFilteredUsers = () => {
        actions.getUsersFilter(filters).then(data => {
            if (data && data.length) {
                setUsersData(data);
                setFiltersActive(true);
                setNoProfilesFound(false);
            } else {
                setUsersData([]);
                setNoProfilesFound(true);
                console.log("no se encontraron perfiles que cumplan estas condiciones")
                setFiltersActive(false);
            }
        });
    };

    const handleResetFilters = () => {
        setFilters({});
        setFiltersActive(false);
        actions.getAllUsers().then(data => {
            if (data && data.length) {
                setUsersData(data);  // Actualiza los perfiles con los datos obtenidos 
                setNoProfilesFound(false); // Aquí establecemos noProfilesFound en false para mostrar todos los perfiles
            }
        });
        // Restablecer los valores predeterminados de los selects
        document.getElementById('find_roomie').selectedIndex = 0;
        document.getElementById('gender').selectedIndex = 0;
        document.getElementById('pet').selectedIndex = 0;
        document.getElementById('budget').selectedIndex = 0;
    };


    const handleModalClose = () => {
        // Restablecer los valores predeterminados de los selects
        document.getElementById('find_roomie').selectedIndex = 0;
        document.getElementById('gender').selectedIndex = 0;
        document.getElementById('pet').selectedIndex = 0;
        document.getElementById('budget').selectedIndex = 0;

        // Actualizar los perfiles llamando a getAllUsers
        actions.getAllUsers().then(data => {
            if (data && data.length) {
                setUsersData(data);
                setNoProfilesFound(false);
            }
        });
    };


    const handleAddToFavorites = async (profileId) => {
        try {
            if (store.token) {
                await actions.addFavoriteProfile(profileId);
                console.log("Perfil agregado a favoritos exitosamente");
                // Actualiza la lista de favoritos después de agregar uno nuevo
                const updatedFavoriteProfiles = await actions.getFavoriteProfiles();
                setFavoriteProfiles(updatedFavoriteProfiles);
            } else {
                console.error("Token no disponible. Inicia sesión nuevamente.");
            }
        } catch (error) {
            console.error("Error al agregar a favoritos:", error);
        }
    };

    const handleRemoveFromFavorites = async (profileId) => {
        try {
            if (store.token) {
                await actions.removeFavoriteProfile(profileId);
                console.log("Perfil eliminado de favoritos exitosamente");
                // Actualiza la lista de favoritos después de eliminar uno
                const updatedFavoriteProfiles = await actions.getFavoriteProfiles();
                setFavoriteProfiles(updatedFavoriteProfiles);
            } else {
                console.error("Token no disponible. Inicia sesión nuevamente.");
            }
        } catch (error) {
            console.error("Error al eliminar de favoritos:", error);
        }
    };


    // useEffect(() => {
    //     // Actualizar userData cuando cambian los datos de los usuarios
    //     setUsersData(store);
    // }, [store]);


    return (
        <div className="container finder filter p-4">
            <ModalFilteredUsers show={noProfilesFound} handleClose={() => setNoProfilesFound(false)} />
            <div className="row">
                <div className=" filter col-3 sticky-top">
                    <h4>Filtros</h4>
                    <form>
                        <div className="situation">
                            <h5>¿Qué buscas?</h5>
                            <select id="find_roomie" className="form-select" aria-label="Default select example" onChange={(e) => handleSetFilter({ 'find_roomie': e.target.value })}>
                                <option defaultValue>¿Cual es tu situacion?</option>
                                <option value="Apartment">Tengo piso, busco roomie</option>
                                <option value="NoApartment">Busco roomie que tenga piso</option>

                            </select>
                        </div>

                        <hr></hr>

                        <div className="gender">
                            <h5>Género</h5>
                            <select id="gender" className="form-select" aria-label="Default select example" onChange={(e) => handleSetFilter({ 'gender': e.target.value })}>
                                <option defaultValue>Género</option>
                                <option value="Female">Femenino</option>
                                <option value="Male">Masculino</option>
                            </select>
                        </div>

                        <hr></hr>

                        <div className="pet">
                            <h5>Mascota</h5>
                            <select id="pet" className="form-select" aria-label="Default select example" onChange={(e) => handleSetFilter({ 'pet': e.target.value })} >
                                <option defaultValue>Mascota</option>
                                <option value="Yes">Tengo mascota</option>
                                <option value="No">No tengo mascota</option>
                            </select>
                        </div>

                        <hr></hr>

                        <div className="budget">
                            <h5>Presupuesto</h5>
                            <select id="budget" className="form-select" aria-label="Default select example" onChange={(e) => handleSetFilter({ 'budget': e.target.value })}>
                                <option defaultValue>Ajusta tu presupuesto</option>
                                <option value="300">Hasta 300</option>
                                <option value="400">Hasta 400</option>
                                <option value="500">Hasta 500</option>
                            </select>
                        </div>

                        <hr></hr>
                    </form>

                    <button
                        onClick={filtersActive ? handleResetFilters : handleFilteredUsers}
                        className={`btn ${filtersActive ? "btn-reset" : "btn-primary"}`}
                    >
                        {filtersActive ? "Restablecer filtros" : "Aplicar filtros"}
                    </button>
                </div>


                <div className="col-9">
                    <div className="row row-cols-1 row-cols-md-3 g-4">
                        {Array.isArray(usersData) &&
                            usersData.map((userData, index) => (
                                <div className="card mb-3 shadow-sm" style={{ width: "17rem" }} key={index}>
                                    <div className="card-body">
                                        <div className="card">
                                            <img
                                                src={userData.profile_img}
                                                className="img-fluid rounded-circle"
                                                alt=""
                                            />
                                        </div>
                                        <hr></hr>
                                        <div className="card-center d-flex justify-content-around">
                                            <h5 className="card-title-name">{userData.user_name}</h5>
                                            <h5 className="card-title-name">{userData.last_name}</h5>
                                        </div>
                                        <div className="more-data d-flex justify-content-around">
                                        <p>{LITERALS[userData.properties?.find_roomie]}</p>
                                            <p>{LITERALS[userData.properties?.pet]}</p>
                                            <p>{userData.properties?.budget}</p>
                                            <p>{LITERALS[userData.properties?.gender]}</p>
                                            
                                        </div>
                                        <div className="d-flex p-3 justify-content-between">
                                            <div className="d-grid gap-2 d-md-flex">
                                                <button
                                                    onClick={() => {
                                                        handleClick(userData);
                                                    }}
                                                    type="button"
                                                    className="btn btn-success"
                                                >
                                                    Saber más
                                                </button>
                                            </div>
                                            <div className="d-grid gap-1 d-md-flex justify-content-md-end">
                                                <button
                                                    onClick={() => handleAddToFavorites(userData.id)}
                                                    className="btn btn-link text-end text-decoration-none"
                                                >
                                                    <i className="fas fa-heart"></i>
                                                </button>
                                                <button
                                                    onClick={() => handleRemoveFromFavorites(userData.id)}
                                                    className="btn btn-link text-end text-decoration-none"
                                                >
                                                    <i className="fa-solid fa-heart-crack"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>

            <ModalFilteredUsers show={noProfilesFound} handleClose={handleModalClose} />

        </div>
    );
};


