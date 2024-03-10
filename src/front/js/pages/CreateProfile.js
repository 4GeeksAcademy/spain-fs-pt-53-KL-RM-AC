import React, { useContext, useState, useRef } from "react";
import { Context } from "../store/appContext";
import "../../styles/FormsImgs.css";
import { Link } from "react-router-dom";
import ReactAvatarEditor from "react-avatar-editor";


export const CreateProfile = () => {
    const { store , actions } = useContext(Context);
    const [alertMessage, setAlertMessage] = useState("");
    const [formData, setFormData] = useState({
        pet: "",
        gender: "",
        budget: "",
        find_roomie: "",
        text_box: "",
        profile_img: null // Inicialmente, establece la imagen como nula
    });

    const [image, setImage] = useState(null);
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0.5, y: 0.5 });
    const [rotate, setRotate] = useState(0);
    const [borderRadius, setBorderRadius] = useState(50);
    const [editorWidth, setEditorWidth] = useState(330);
    const [editorHeight, setEditorHeight] = useState(330);
    const editorRef = useRef();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleScaleChange = (e) => {
        setScale(parseFloat(e.target.value));
    };

    const handlePositionChange = (position) => {
        setPosition(position);
    };

    const handleNewImage = async (e) => {
        const image = e.target.files[0];
        setImage(image); // Actualiza la imagen en el estado
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "injqzpue"); // Reemplaza "tu-upload-preset" con tu upload preset

        try {
            const response = await fetch(
                'https://api.cloudinary.com/v1_1/dru67quag/image/upload', // Reemplaza "tu-cloud-name" con el nombre de tu nube en Cloudinary
                {
                    method: "POST",
                    body: formData,
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
            await actions.addProfileInfo(formData); // Enviar directamente el estado formData

            setAlertMessage(""); // Borra cualquier mensaje de alerta previo
        } catch (error) {
            console.error("Error al enviar datos:", error);
            setAlertMessage("Error al crear el perfil"); // Establece el mensaje de error
        }
    };

    return (
        <div className="container mt-2 p-3 justify-content-center">
            <h3 className="text-center">Crear Perfil</h3>
            <form className="d-flex">
                <div className="form-group col-4">
                    <label htmlFor="profileImg" className="form-label fw-bold">Selecciona una imagen</label>
                    <div className="profile-img-container">
                        {image ? (
                            <ReactAvatarEditor
                                ref={editorRef}
                                scale={scale}
                                width={editorWidth}
                                height={editorHeight}
                                position={position}
                                onPositionChange={handlePositionChange}
                                rotate={rotate}
                                borderRadius={borderRadius}
                                image={image}
                                className="img-thumbnail"
                            />
                        ) : (
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsg0F0hqjo2pVSEgusU_JvJ4WOxd-U1QWMnw&usqp=CAU" alt="Placeholder" className="placeholder-img" />
                        )}
                    </div>
                    <input
                        name="profile_img"
                        type="file"
                        onChange={handleNewImage}
                    />
                    <input
                        type="range"
                        min="0.1"
                        max="2"
                        step="0.01"
                        value={scale}
                        onChange={handleScaleChange}
                    />
                </div>

                <div className="col-4">
                    <div className="m-1  col-4">
                        <label className="form-label mt-2 fw-bold">Que buscas?</label>
                        <select className="form-select " name="find_roomie" value={formData.find_roomie} onChange={handleInputChange}>
                            <option value="">Que buscas?</option>
                            <option value="Apartment">Tengo piso y busco roomie</option>
                            <option value="NoApartment">Busco roomie con piso</option>
                        </select>
                    </div>
                    <div className="m-1">
                        <label className="form-label mt-2 fw-bold">Cual es tu presupuesto?</label>
                        <input type="text" className="form-control" id="budget" name="budget" value={formData.budget} onChange={handleInputChange} />
                    </div>
                    <div className="m-1 ">
                        <label className="form-label mt-2 fw-bold">Tienes mascota</label>
                        <select className="form-select" name="pet" value={formData.pet} onChange={handleInputChange}>
                            <option value="">Tienes mascota?</option>
                            <option value="Yes">Si</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                </div>

                <div className="col-4">
                    <div className="m-1 ">
                        <label className="form-label mt-2 fw-bold">Genero</label>
                        <select className="form-select " name="gender" value={formData.gender} onChange={handleInputChange}>
                            <option value="">Selecciona te genero</option>
                            <option value="Female">Mujer</option>
                            <option value="Male">Hombre</option>
                        </select>
                    </div>
                    <div className="m-1 ">
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
                {alertMessage && (<div className="alert alert-danger mt-3">{alertMessage}</div>)}
            </form>
            <div className="justify-content-center">
                <button type="button" className="btn btn-dark me-2" onClick={handleSubmit}>Crear Perfil</button>
                <Link to={"/password"}>
                    <button type="button" className="btn btn-dark">Cambiar Contrasena</button>
                </Link>
            </div>
        </div>
    );
};