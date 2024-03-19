import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import OnlineWorld from "../../img/Online world-pana.png";
import "../../styles/homelogged.css";

export const HomeLogged = () => {
    return (
        <div className="container p-3 mt-5 logged">
            <div className="row">
                <div className="col-lg-7 col-md-12">
                    <div className="text-center">
                        <div className="container title">
                            <h2 className="title">Bienvenido a la comunidad</h2>
                        </div>
                        <div className="d-flex justify-content-center justify-content-md-start">
                            <div className="container conectionImg">
                                <img src={OnlineWorld} className="onlineWorld" alt="Online World" />
                            </div>
                            <p className="textLogged">"Explora el hogar de tus sueños: en nuestra plataforma, conectamos a más de 1000 personas que encuentran la habitación ideal para convivir felices y crear recuerdos inolvidables."</p>
                        </div>
                        <div className="container d-flex justify-content-center justify-content-md-start mt-5">
                            <Link to="/finder">
                                <button type="button" className="btn btn-success mx-3 mx-md-5 btn-lg"><i className="fa-solid fa-magnifying-glass"></i> Buscar</button>
                            </Link>
                            <Link to="/profile">
                                <button type="button" className="btn btn-success mx-3 mx-md-5 btn-lg"><i className="fa-regular fa-user"></i> Mi perfil</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="col-lg-5 col-md-12">
                    <div className="container profiles text-center justify-content-md-center">
                        <img src="https://tecnosoluciones.com/wp-content/uploads/2023/07/roles-de-usuarios-en-portales-cms-y-comercio-electronico.png" className="profilesImg img-fluid" alt="Profiles" />
                    </div>
                </div>
            </div>
        </div>
    );
};
