import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import OnlineWorld from "../../img/Online world-pana.png"
import "../../styles/homelogged.css"


export const HomeLogged = () => {
    return (
        <div className="row container p-3 mt-5 logged">
            <div className="d-flex">
                <div className="col-7 text-center justify-content-center">
                    <div className="container title">
                        <h2 className="title">Bienvenido a la comunidad</h2>
                    </div>


                    <div className="d-flex">
                        <div className="container conectionImg">
                            <img src={OnlineWorld} className="onlineWorld" ></img>
                        </div>
                        <p className="textLogged">"Explora el hogar de tus sueños: en nuestra plataforma, conectamos a más de 1000 personas que encuentran la habitación ideal para convivir felices y crear recuerdos inolvidables."</p>
                    </div>
                    <div className=" container d-flex justify-content-center mt-5 ">
                        <Link to="/finder">
                            <button type="button" className="btn btn-success mx-5 btn-lg"><i className="fa-solid fa-magnifying-glass"></i>  Buscar</button>
                        </Link>

                        <Link to="/profile">
                            <button type="button" className="btn btn-success mx-5 btn-lg"><i className="fa-regular fa-user"></i>  Mi perfil</button>
                        </Link>
                    </div>
                </div>

                <div className="col-5 container profiles justify-content-center">
                    <img src="https://tecnosoluciones.com/wp-content/uploads/2023/07/roles-de-usuarios-en-portales-cms-y-comercio-electronico.png" className="profilesImg" ></img>
                </div>


            </div>
        </div>
    );
};