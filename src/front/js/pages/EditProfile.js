import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/createProfile.css";
import { Link } from "react-router-dom";

export const EditProfile = () => {
    const { store, actions } = useContext(Context);
    const [alertMessage, setAlertMessage] = useState("");
    const [formData, setFormData] = useState({
        pet: store.pet || "",
        gender: store.gender || "",
        budget: store.budget || "",
        find_roomie: store.find_roomie || "",
        text_box: store.text_box || "",
        profile_img: store.profile_img || null
    });
    const [image, setImage] = useState(null);

    useEffect(() => {
        setFormData({
            ...formData,
            last_name: store.last_name || "",
            user_name: store.user_name || ""
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
        setImage(image);
        const formDataImage = new FormData();
        formDataImage.append("file", image);
        formDataImage.append("upload_preset", "injqzpue");

        try {
            const response = await fetch(
                'https://api.cloudinary.com/v1_1/dru67quag/image/upload',
                {
                    method: "POST",
                    body: formDataImage,
                }
            );
            const data = await response.json();
            setFormData({
                ...formData,
                profile_img: data.secure_url
            });
        } catch (error) {
            console.error("Error al cargar la imagen:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await actions.updateProfileInfo(formData);
            setAlertMessage("");
        } catch (error) {
            console.error("Error al enviar datos:", error);
            setAlertMessage("Error al crear el perfil");
        }
    };

    return (
        <div className="container mt-2 p-3">
            <div className="createProfile">
                <div className="createProfilePage mt-2 p-3">
                    <form>
                        <div className="row">
                            <div className="form-group container imageGroup col-lg-4 col-md-6 col-sm-12">
                                <div className="profileImg">
                                    {image ? (
                                        <img src={URL.createObjectURL(image)} alt="Uploaded" className="uploaded-img" />
                                    ) : (
                                        <img src={formData.profile_img || "https://via.placeholder.com/150"} alt="Placeholder" className="placeholder-img" />
                                    )}
                                </div>
                                <input
                                    id="fileInput"
                                    name="profile_img"
                                    type="file"
                                    hidden
                                    onChange={handleNewImage}
                                />
                                <label htmlFor="fileInput" className="labelImg btn">
                                    Escoge una imagen
                                </label>
                            </div>
                            <div className="container inputsCreateProfile col-lg-8 col-md-6 col-sm-12">
                                <div className="nameCreateProfile mb-3">
                                    <h3>{formData.user_name} {formData.last_name}</h3>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-sm-6">
                                        <label className="form-label fw-bold">Que buscas?</label>
                                        <select className="form-select" name="find_roomie" value={formData.find_roomie} onChange={handleInputChange}>
                                            <option value="">Que buscas?</option>
                                            <option value="Apartment">Tengo piso y busco roomie</option>
                                            <option value="NoApartment">Busco roomie con piso</option>
                                        </select>
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label fw-bold">Cual es tu presupuesto?</label>
                                        <input type="text" className="form-control" id="budget" name="budget" value={formData.budget} onChange={handleInputChange} />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-sm-6">
                                        <label className="form-label fw-bold">Tienes mascota</label>
                                        <select className="form-select" name="pet" value={formData.pet} onChange={handleInputChange}>
                                            <option value="">Tienes mascota?</option>
                                            <option value="Yes">Si</option>
                                            <option value="No">No</option>
                                        </select>
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label fw-bold">Genero</label>
                                        <select className="form-select" name="gender" value={formData.gender} onChange={handleInputChange}>
                                            <option value="">Selecciona te genero</option>
                                            <option value="Female">Mujer</option>
                                            <option value="Male">Hombre</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Por que serias el compi ideal?</label>
                                    <textarea className="form-control" rows="3" value={formData.text_box} onChange={handleInputChange} name="text_box"></textarea>
                                </div>
                            </div>
                        </div>
                        {alertMessage && (<div className="alert alert-danger">{alertMessage}</div>)}
                        <div className="buttonsCP mt-3">
                            <button type="button" className="btn btn-dark me-2" onClick={handleSubmit}>Guardar</button>
                            <Link to={"/password"}>
                                <button type="button" className="btn btn-dark">Cambiar Contrasena</button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
