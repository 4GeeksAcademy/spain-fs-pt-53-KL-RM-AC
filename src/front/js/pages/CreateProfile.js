import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/createProfile.css";
import { Link } from "react-router-dom";


export const CreateProfile = () => {
    const { store, actions } = useContext(Context);
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
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);
    const [imageUploaded, setImageUploaded] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                await actions.getUserDetails(store);
                setLoading(false);
                setUserData(store)
            } catch (error) {
                console.error('Error al obtener los detalles del usuario:', error);
            }
        };

        fetchUserData();

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
        console.log("soy imagen")
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
                profile_img: data.secure_url // Actualiza el estado con la URL de la imagen cargada
            });
            setImageUploaded(true);

        } catch (error) {
            setImageUploaded(false);
            console.error("Error al cargar la imagen:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar el formulario
        if (!formData.pet || !formData.gender || !formData.budget || !formData.find_roomie || !formData.text_box || !imageUploaded) {
            setAlertMessage("Por favor, completa todos los campos antes de enviar el formulario.");
            return; // Salir de la función si el formulario no está completo
        }

        // Si el formulario está completo, intenta enviar los datos
        try {
            await actions.addProfileInfo(formData);
            setAlertMessage("");
        } catch (error) {
            console.error("Error al enviar datos:", error);
            setAlertMessage("Error al crear el perfil");
        }
    }

    if (loading) {
        return (
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando...</span>
            </div>
        )
    }

    return (

        <div className="createProfile">
            <div className="container mt-2 p-3 justify-content-center">
                <div className="container createProfilePage mt-2 p-3 justify-content-center">
                    <form className="d-flex">
                        <div className="form-group container imageGroup col-4">
                            <div className="profileImg">
                                {image ? (
                                    <img src={URL.createObjectURL(image)} alt="Uploaded" className="uploaded-img " />
                                ) : (
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsg0F0hqjo2pVSEgusU_JvJ4WOxd-U1QWMnw&usqp=CAU" alt="Placeholder" className="placeholder-img " />
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
                                <h3>{userData.user_name} {userData.last_name}</h3>
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
                            <div className="container d-flex">
                                <div className="m-1 inputOption ">
                                    <label className="form-label mt-2 fw-bold">Tienes mascota</label>
                                    <select className="form-select" name="pet" value={formData.pet} onChange={handleInputChange}>
                                        <option value="">Tienes mascota?</option>
                                        <option value="Yes">Si</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>
                                <div className="m-1 inputOption">
                                    <label className="form-label mt-2 fw-bold">Genero</label>
                                    <select className="form-select " name="gender" value={formData.gender} onChange={handleInputChange}>
                                        <option value="">Selecciona te genero</option>
                                        <option value="Female">Mujer</option>
                                        <option value="Male">Hombre</option>
                                    </select>
                                </div>
                            </div>
                            <div className="m-1 container ">
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

                        <button type="button" className="btn btn-dark me-2" onClick={(e) => handleSubmit(e)} disabled={!imageUploaded}>Crear Perfil</button>
                        <Link to={"/password"}>
                            <button type="button" className="btn btn-dark">Cambiar Contrasena</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );

}