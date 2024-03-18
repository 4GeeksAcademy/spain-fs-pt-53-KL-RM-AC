import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/createProfile.css";
import { Link } from "react-router-dom";

export const EditProfile = () => {
    const { store, actions } = useContext(Context);
    const [alertMessage, setAlertMessage] = useState("");

    const [formData, setFormData] = useState({
        pet: store.pet || "", // Cargar las opciones existentes del store
        gender: store.gender || "",
        budget: store.budget || "",
        find_roomie: store.find_roomie || "",
        text_box: store.text_box || "",
        profile_img: store.profile_img || null // Inicialmente, establece la imagen como nula
    });

    const [image, setImage] = useState(null);


    useEffect(() => {
        // Cargar las opciones existentes del store en el estado formData
        setFormData({
            ...formData,
            last_name: store.last_name || "",
            user_name: store.user_name || "",
            pet: store.pet || "",
            gender: store.gender || "",
            budget: store.budget || "",
            find_roomie: store.find_roomie || "",
            text_box: store.text_box || "",
            profile_img: store.profile_img || null
        });
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleNewImage = async (e) => {
        const image = e.target.files[0];
        setImage(image); // Actualiza la imagen en el estado
        const formDataImage = new FormData();
        formDataImage.append("file", image);
        formDataImage.append("upload_preset", "injqzpue"); // Reemplaza "tu-upload-preset" con tu upload preset

        try {
            const response = await fetch(
                'https://api.cloudinary.com/v1_1/dru67quag/image/upload', // Reemplaza "tu-cloud-name" con el nombre de tu nube en Cloudinary
                {
                    method: "POST",
                    body: formDataImage,
                }
            );
            const data = await response.json();
            setFormData({
                ...formData,
                profile_img: data.secure_url // Actualiza el estado con la URL de la imagen cargada
            });
        } catch (error) {
            console.error("Error al cargar la imagen:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await actions.updateProfileInfo(formData); // Enviar directamente el estado formData
            setAlertMessage(""); // Borra cualquier mensaje de alerta previo

        } catch (error) {
            console.error("Error al enviar datos:", error);
            setAlertMessage("Error al crear el perfil"); // Establece el mensaje de error
        }
    };

    return (
        <div className="container mt-2 p-3 justify-content-center">

            <div className="createProfile">
                <div className="container createProfilePage mt-2 p-3 justify-content-center">
                    <form className="d-flex">
                        <div className="form-group container imageGroup col-4">
                            <div className="profileImg">
                                {image ? (
                                    <img src={URL.createObjectURL(image)} alt="Uploaded" className="uploaded-img " />
                                ) : (
                                    <img src={formData.profile_img} alt="Placeholder" className="placeholder-img " />
                                )}
                            </div>
                            <input
                                id="fileInput"
                                name="profile_img"
                                type="file"
                                hidden // Oculta el input
                                onChange={handleNewImage}

                            />
                            <label htmlFor="fileInput" className="labelImg btn">
                                Escoge una imagen
                            </label>

                        </div>



                        <div className="container inputsCreateProfile">
                            <div className="container nameCreateProfile">
                                <h3>{formData.user_name} {formData.last_name}</h3>
                            </div>
                            <div className="container d-flex">
                                <div className="m-1 inputOption">
                                    <label className="form-label mt-2 fw-bold">Que buscas?</label>
                                    <select className="form-select " name="find_roomie" value={formData.find_roomie} onChange={handleInputChange}>
                                        <option value="">Que buscas?</option>
                                        <option value="Apartment">Tengo piso y busco roomie</option>
                                        <option value="NoApartment">Busco roomie con piso</option>
                                    </select>
                                </div>
                                <div className="m-1 inputOption">
                                    <label className="form-label mt-2 fw-bold">Cual es tu presupuesto?</label>
                                    <input type="text" className="form-control" id="budget" name="budget" value={formData.budget} onChange={handleInputChange} />
                                </div>
                            </div>
                            <div className="container d-flex ">
                                <div className="m-1 inputOption ">
                                    <label className="form-label mt-2 fw-bold">Tienes mascota</label>
                                    <select className="form-select" name="pet" value={formData.pet} onChange={handleInputChange}>
                                        <option value="">Tienes mascota?</option>
                                        <option value="Yes">Si</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>
                                <div className="m-1 inputOption ">
                                    <label className="form-label mt-2 fw-bold">Genero</label>
                                    <select className="form-select " name="gender" value={formData.gender} onChange={handleInputChange}>
                                        <option value="">Selecciona te genero</option>
                                        <option value="Female">Mujer</option>
                                        <option value="Male">Hombre</option>
                                    </select>
                                </div>
                            </div>
                            <div className="m-1 container">
                                <label className="form-label mt-2 fw-bold" name="text_box">Por que serias el compi ideal?</label>
                                <textarea
                                    className="form-control"
                                    id="exampleFormControlTextarea1"
                                    rows="3"
                                    value={formData.text_box}
                                    onChange={handleInputChange}
                                    name="text_box"
                                ></textarea>
                            </div>
                        </div>
                        {alertMessage && (<div className="container alert alert-danger mt-3">{alertMessage}</div>)}
                    </form>
                    <div className="buttonsCP mt-5">

                        <button type="button" className="btn btn-dark me-2" onClick={handleSubmit}>Guardar</button>

                        <Link to={"/password"}>
                            <button type="button" className="btn btn-dark">Cambiar Contrasena</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
