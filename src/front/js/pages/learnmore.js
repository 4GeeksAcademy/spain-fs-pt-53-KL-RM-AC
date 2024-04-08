import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { Emailjs } from "../component/email";
import "../../styles/learnmore.css";
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
const LITERALS = {
    "Male": "Hombre",
    "Female": "Mujer",
    "Yes": "Tengo mascota",
    "No": "No tengo mascota",
    "Apartment": "Busco rommie",
    "NoApartment": "Busco habitación",
}


export const LearnMore = () => {
    const { store, actions } = useContext(Context);
    const { id } = useParams();
    const [userData, setUserData] = useState({});
    const [showEmail, setShowEmail] = useState(false);


    useEffect(() => {

        const fetchUserData = async () => {
            try {
                const user = await actions.getUserById(id);
                setUserData(user);
            } catch (error) {
                console.error('Error al obtener los datos del usuario:', error);
            }
        };

        fetchUserData();
    }, [id]);

    const handleClickContactar = () => {
        setShowEmail(true);
    };

    const handleCloseEmailModal = () => {
        setShowEmail(false);
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
            <div className="learnmore container-fluid p-3 mb-5 postal">
                {userData && (
                    <div className="row ">
                        <div className="col-md-6 d-flex justify-content-center align-items-center p-1">
                            <div className="d-flex justify-content-center align-items-center">
                                <img src={userData.properties?.profile_img} className="profile-image img-fluid rounded-circle" alt="Profile" style={{ width: '320px', height: '320px', objectFit: 'cover' }} />
                            </div>
                        </div>
                        <div className="col-md-6 mb-4">
                            <div className="user-info">
                                <h3 className="text-center">Perfil de Usuario</h3>
                                <hr></hr>
                                <div className="row">
                                    <div className="col-md-6">
                                        <p> <i className="fas fa-user"></i><strong> Nombre: </strong> {userData.user_name}</p>
                                    </div>
                                    <div className="col-md-6">
                                        <p><strong>Apellidos: </strong> {userData.last_name}</p>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-md-6">
                                        <p><i className="fa-solid fa-paw"></i> {LITERALS[userData.properties?.pet]}</p>
                                    </div>
                                    <div className="col-md-6">
                                        <p><i className="fa-solid fa-venus-mars"></i> {LITERALS[userData.properties?.gender]}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <p><i className="fa-solid fa-euro-sign"></i> <strong> Presupuesto:</strong> {userData.properties?.budget}</p>
                                    </div>
                                    <div className="col-md-6">
                                        <p><strong>Situación actual:</strong> {LITERALS[userData.properties?.find_roomie]}</p>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-md-12">
                                        <p><strong>¿Por qué eres el compi ideal?</strong></p>
                                        <div className="ideal-companion">
                                            <p>{userData.properties?.text_box}</p>
                                        </div>
                                    </div>
                                </div>
                                {showEmail && (
                                    <div className="row">
                                        <div className="col-md-12">
                                        <Emailjs isOpen={showEmail} onClose={handleCloseEmailModal} userEmail={userData.email} />
                                        </div>
                                    </div>
                                )}
                                <div className="row">
                                    <div className="col-md-12 d-flex justify-content-center">
                                        <Button
                                            type="button"
                                            className="button "
                                            color="primary"
                                            variant="outlined"
                                            onClick={handleClickContactar}
                                        >
                                            Contactar
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </ThemeProvider>
    );
};
