import React, { useContext, useState, useEffect} from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const SignUp = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [lastName, setLastName] = useState("");
  const [alertMessage, setAlertMessage] = useState();

  

  const handleSignUp = async () => {
    actions.SignUp(email, password, userName, lastName, setAlertMessage, setEmail, setPassword, setUserName, setLastName);
  }
  
 
    return (
    <form className="p-5 m-3">
   {!store.token && (
    <div>
  <div className="mb-3">
    <label className="form-label">Nombre</label>
    <input type="name" className="form-control" id="name" value={userName} onChange={(e) => setUserName(e.target.value)}/>
  </div>
  <div className="mb-3">
    <label className="form-label">Apellido</label>
    <input type="lastName" className="form-control" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
  </div>
  <div className="mb-3">
    <label  className="form-label">Correo</label>
    <input type="email" className="form-control" id="Email" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)}/>
    <div id="emailHelp" className="form-text">Solo compartiremos tu correo si algun usuario quiere contactarte</div>
  </div>
  <div className="mb-3">
    <label className="form-label">Contraseña</label>
    <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e) => setPassword(e.target.value)}/>
  </div>
  <button type="submit" className="btn btn-primary" onClick={handleSignUp}>Submit</button>
  {alertMessage}
  </div>
  )}
</form>
);
}

