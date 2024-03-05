import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/login.css";

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
    <div className="container justify-content-center mx-auto">
      <form onSubmit={handleSubmit} className="p-5 m-3">
        <div className="mb-3">
          <label className="form-label">Correo</label>
          <input type="email" className="input form-control" id="email" name="email" value={formData.email} onChange={handleChange} autoComplete="current-user_name" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input type="password" className="input form-control" id="password" name="password" value={formData.password} onChange={handleChange} autoComplete="current-password" />
        </div>
        <button type="submit" className="btn">Iniciar Sesión</button>
        {alertMessage && (<div className="alert alert-danger mt-3">{alertMessage}</div>)}
      </form>
    </div>
  );
}
