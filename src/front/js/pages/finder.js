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
import { PageNotAllowed } from "./PageNotAllowed";

export const Finder = () => {
    const { store, actions } = useContext(Context);
    const [usersData, setUsersData] = useState([]);
    const [favoriteProfiles, setFavoriteProfiles] = useState([]);
    const [filters, setFilters] = useState({})
    const [noProfilesFound, setNoProfilesFound] = useState(false);
    const [filtersActive, setFiltersActive] = useState(false);
    const navigate = useNavigate();

    console.log(favoriteProfiles)
    useEffect(() => {

        actions.getUsersFilter({}).then(data => {
            if (data && data.length) {
                setUsersData(data);
            }

        })
        actions.getFavoriteProfiles().then(data => {
            if (data && data.length) {
                setFavoriteProfiles(data);
            }

        })
    }, []);


    const handleClick = userData => {
        navigate(`/learnmore/${userData.id}`);
    };


    const handleSetFilter = (filter) => {
        setFilters({ ...filters, ...filter });
    };


    const handleFilteredUsers = () => {
        actions.getUsersFilter(filters).then(data => {
            console.log(data)
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
        actions.getUsersFilter({}).then(data => {
            if (data && data.length) {
                setUsersData(data);
                setNoProfilesFound(false);
            }
        });
        document.getElementById('find_roomie').selectedIndex = 0;
        document.getElementById('gender').selectedIndex = 0;
        document.getElementById('pet').selectedIndex = 0;
        document.getElementById('budget').selectedIndex = 0;
    };


    const handleModalClose = () => {
        document.getElementById('find_roomie').selectedIndex = 0;
        document.getElementById('gender').selectedIndex = 0;
        document.getElementById('pet').selectedIndex = 0;
        document.getElementById('budget').selectedIndex = 0;

        actions.getUsersFilter({}).then(data => {
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
                const updatedFavoriteProfiles = await actions.getFavoriteProfiles();
                setFavoriteProfiles(updatedFavoriteProfiles);
            } else {
                console.error("Token no disponible. Inicia sesión nuevamente.");
            }
        } catch (error) {
            console.error("Error al eliminar de favoritos:", error);
        }
    };


    if (!store.token || store.token === "" || store.token === undefined) {
        return <PageNotAllowed />;
    }
    return (
        <div className="container p-5 finder">
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
                                <div className="card shadow-sm" style={{ width: "18rem" }} key={index}>
                                    <div className="card-body">
                                        <div className="text-center">
                                            <img
                                                src={userData.properties?.profile_img}
                                                className="img-fluid rounded-circle"
                                                alt=""
                                                style={{ width: '220px', height: '220px', objectFit: 'cover' }}
                                            />
                                        </div>

                                        <div className="card-center d-flex justify-content-around">
                                            <h5 className="card-title-name">{userData.user_name}</h5>
                                            <h5 className="card-title-name">{userData.last_name}</h5>
                                        </div>

                                        <div className="d-flex">
                                            <div className="more-data p-2 d-flex justify-content-start">
                                                <p><i className="fa-solid fa-paw"></i> {LITERALS[userData.properties?.pet]}</p>
                                            </div>
                                            <div className="flex-row">
                                                <p><i className="fa-solid fa-euro-sign"></i>{userData.properties?.budget}</p>
                                                <p><i className="fa-solid fa-venus-mars"></i>{LITERALS[userData.properties?.gender]}</p>
                                            </div>
                                        </div>


                                        <div className="d-flex  justify-content-between">
                                            <div className="d-grid gap-2 d-md-flex">

                                                <button
                                                    onClick={() => {
                                                        handleClick(userData);
                                                    }}
                                                    className="btn bn3637 bn38"
                                                >
                                                    Saber más
                                                </button>

                                            </div>
                                            <div className="d-grid gap-1 d-md-flex justify-content-md-end">
                                                {
                                                    favoriteProfiles.find(profile => profile.id === userData.id) ? (
                                                        <button
                                                            onClick={() => handleRemoveFromFavorites(userData.id)}
                                                            className="btn btn-link text-end text-decoration-none"
                                                        >
                                                            <i className="fa-solid fa-heart"></i>
                                                        </button>
                                                    ) : (
                                                        <button
                                                            onClick={() => handleAddToFavorites(userData.id)}
                                                            className="btn btn-link text-end text-decoration-none"
                                                        >

                                                            <i className="fa-regular fa-heart"></i>
                                                        </button>
                                                    )
                                                }

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


