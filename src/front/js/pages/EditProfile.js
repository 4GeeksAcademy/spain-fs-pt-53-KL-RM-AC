import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/createProfile.css";
import { Link, useNavigate } from "react-router-dom";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CustomAlert from "./Alerts";

export const EditProfile = () => {
    const { store, actions } = useContext(Context);
    const [alertMessage, setAlertMessage] = useState("");
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        pet: store.pet || "",
        gender: store.gender || "",
        budget: store.budget || "",
        find_roomie: store.find_roomie || "",
        text_box: store.text_box || "",
        profile_img: store.profile_img || null
    });
    const [image, setImage] = useState(null);
    const [open, setOpen] = useState(false);


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };


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
            const response = await fetch(process.env.BACKEND_URL_CLOUDINARY + 'image/upload',
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
            if (await actions.updateProfileInfo(formData)) {
                navigate("/profile")
            };
            setAlertMessage("");
        } catch (error) {
            console.error("Error al enviar datos:", error);
            setAlertMessage("Error al crear el perfil");
            setOpen(true)
        }
    };

    const theme = createTheme({
        palette: {
            primary: {
                main: '#295f72',
            },
        },
    });


    return (
        <ThemeProvider theme={theme}>
            <div className="container mt-2 p-3">
                <div className="createProfile d-flex">
                    <div className="createProfilePage mt-2 p-3">
                        <form>
                            <div className="row">
                                <div className="col-lg-5 col-md-6 col-sm-12 mb-3 images">
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
                                        <CloudUploadIcon />
                                    </label>
                                </div>
                                <div className="col-lg-7 col-md-6 col-sm-12">
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
                                            <div className="input-group">
                                                <span className="input-group-text presupuesto">€</span>
                                                <input
                                                    type="number"
                                                    className="form-control presupuesto"
                                                    id="budget"
                                                    name="budget"
                                                    value={formData.budget}
                                                    onChange={handleInputChange}
                                                    inputMode="numeric" // Indica que es un campo numérico
                                                    aria-label="Presupuesto en euros"
                                                />
                                            </div>
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
                                        <textarea className="form-control text" rows="2" value={formData.text_box} onChange={handleInputChange} name="text_box"></textarea>
                                    </div>
                                </div>
                            </div>
                            <Stack direction="row" spacing={2} className="buttons">
                                <Link to={"/profile"}>
                                    <Button onClick={handleSubmit} type="submit" color="primary" variant="outlined" className="button">Guardar</Button>
                                </Link>
                                <CustomAlert open={open} onClose={handleClose} message={alertMessage} severity={alertMessage === "Perfil creado correctamente" ? "success" : "error"} />
                                <Link to={"/password"}>
                                    <Button type="button" color="primary" variant="outlined" className="button">Cambiar Contrasena</Button>
                                </Link>
                            </Stack>
                        </form>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
};
