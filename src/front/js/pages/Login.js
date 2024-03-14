import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/login.css";
import mobilelogin from "../../img/mobilelogin.png";


export const Login = () => {
  const { actions, store } = useContext(Context);
  const navigate = useNavigate(); // Recuerda agregar los paréntesis para llamar a la función
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [alertMessage, setAlertMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setAlertMessage("Todos los campos son obligatorios");
      return;
    }
    try {
      await actions.login(formData);
      setFormData({
        email: "",
        password: "",
      });
      navigate("/homelogged"); // Redirige a la página después de iniciar sesión correctamente
    } catch (error) {
      if (error.message === "Email or password are incorrect")
        setAlertMessage("Correo electrónico o contraseña incorrectos");
    }
  };

  return (
    <div className="d-flex loginStyles">

      <div className="container login justify-content-center mx-auto">
        <form onSubmit={handleSubmit} className="p-3 m-3">
          <h1 className="title mb-4">Iniciar Sesion</h1>
          <div className="textLogin">
            <div className="mb-3">
              <label className="form-label">Correo</label>
              <input type="email" className="input form-control" id="email" name="email" value={formData.email} onChange={handleChange} autoComplete="current-user_name" />
            </div>
            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <input type="password" className="input form-control" id="password" name="password" value={formData.password} onChange={handleChange} autoComplete="current-password" />
            </div>
          </div>
          <button type="submit" className="btn loginBtn mt-5">Iniciar Sesión</button>
          {alertMessage && (<div className="alert alert-danger mt-3">{alertMessage}</div>)}
        </form>
      </div>
      <img className="imageLogIn" src={mobilelogin} />
    </div>



  );
}
