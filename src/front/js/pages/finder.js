import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { ProfileCard } from "../component/profilecard";


export const Finder = () => {

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
                            <select className="form-select" aria-label="Default select example">
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
                    <ProfileCard/>
                </div>
                
            </div>
        </div>
    );
};


