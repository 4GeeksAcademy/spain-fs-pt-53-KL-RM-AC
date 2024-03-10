import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

export const Finder = () => {

    const { store, actions } = useContext(Context);
    const [usersData, setUsersData] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    // Actualiza los parámetros de búsqueda en la URL
    const updateSearchParams = (filter, value) => {
        setSearchParams((params) => {
            params.set(filter, value);
            return params;
        });
    };

    //Te lleva al perfil del usuario y te trae sus propiedades
    const handleClick = (userData) => {
        navigate("/learnmore", { state: { user: userData } })
    }

    //Añadir favoritos AUN NO FUNCIONA 
    const handleAddToFavorites = async (profileId) => {
        try {
            await actions.addFavoriteProfile(store, profileId);
            // Puedes realizar acciones adicionales después de agregar a favoritos, si es necesario
        } catch (error) {
            console.error('Error al agregar a favoritos:', error);
        }
    };

    useEffect(() => {
        //Llamar a la acción para obtener todos los usuarios cuando el componente se monta
        actions.syncTokenFromLocalStorage()
        if (store.token === "" || store.token === null) {
            navigate("/");
        }
        else {
            actions.getAllUsers().then(data => {
                if (data && data.length) {
                    setUsersData(data);
                }
            });
        }
    }, []);


    useEffect(() => {
        // Obtener y aplicar filtros al cargar la página
        const filters = {
            pet: searchParams.get("pet"),
            gender: searchParams.get("gender"),
            // ... (otros filtros)
        };

        actions.getUsersFilter(filters).then((data) => {
            setUsersData(data);
        });

    }, []);


    return (
        <div className="container p-5">
            <div className="row">
                <div className=" filter col-3 sticky-top">
                    <h4>Filtros</h4>
                    <form>
                        <div className="situation">
                            <h5>¿Qué buscas?</h5>
                            <select className="form-select" aria-label="Default select example">
                                <option selected>¿Cual es tu situacion?</option>
                                <option value="1">Tengo piso, busco roomie</option>
                                <option value="2">Busco roomie que tenga piso</option>

                            </select>
                        </div>

                        <hr></hr>

                        <div className="gender">
                            <h5>Género</h5>
                            <select className="form-select" aria-label="Default select example">
                                <option selected>Género</option>
                                <option value="1">Femenino</option>
                                <option value="2">Masculino</option>
                            </select>
                        </div>

                        <hr></hr>

                        <div className="pet">
                            <h5>Mascota</h5>
                            <select className="form-select" aria-label="Default select example "
                                onChange={(e) => {
                                    updateSearchParams("pet", e.target.value);
                                }}>
                                <option selected>Mascota</option>
                                <option value="1">Tengo mascota</option>
                                <option value="2">No tengo mascota</option>
                            </select>
                        </div>

                        <hr></hr>

                        <div className="budget">
                            <h5>Presupuesto</h5>
                            <select className="form-select" aria-label="Default select example">
                                <option selected>Ajusta tu presupuesto</option>
                                <option value="1">Hasta 300</option>
                                <option value="2">Hasta 400</option>
                                <option value="2">Hasta 500</option>
                            </select>
                        </div>

                        <hr></hr>

                        <div className="location">
                            <h5>Ubicacion</h5>
                            <select className="form-select" aria-label="Default select example">
                                <option selected>Elige tu zona ideal</option>
                                <option value="1">Madrid</option>
                                <option value="2">Barcelona</option>
                                <option value="2">Ibiza</option>
                            </select>
                        </div>

                        <hr></hr>
                    </form>
                </div>


                <div className="col-9">
                    <div>
                        {usersData.map((userData, index) => (
                            <div className="card" style={{ width: "20rem" }} key={index}>
                                <div className="card-body">
                                    <div className="card-upper">
                                        <img src="https://c0.klipartz.com/pngpicture/527/663/gratis-png-logo-persona-usuario-icono-de-persona-thumbnail.png" className="img-fluid rounded-circle" alt="" />
                                    </div>
                                    <hr></hr>
                                    <div className="card-center d-flex justify-content-around">
                                        <h5 className="card-title-name">{userData.user_name}</h5>
                                        <h5 className="card-title-name">{userData.last_name}</h5>
                                    </div>
                                    <div className="more-data d-flex justify-content-around">
                                        <p>{userData.properties.gender}</p>
                                        <p>{userData.properties.find_roomie}</p>
                                        <p>{userData.properties.pet}</p>
                                        <p>{userData.properties.budget}</p>
                                    </div>
                                    <div className="d-flex p-3 justify-content-between">
                                        <div className="d-grid gap-2 d-md-flex">

                                            <button onClick={() => {
                                                handleClick(userData)
                                            }} type="button" className="btn btn-success">Saber más</button>

                                        </div>
                                        <div className="d-grid gap-1 d-md-flex justify-content-md-end">
                                            <button
                                                onClick={() => handleAddToFavorites(userData.id)}
                                                className="btn btn-link text-end text-decoration-none"
                                            >
                                                <i className="fas fa-heart"></i>
                                                <i className="far fa-heart"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};


