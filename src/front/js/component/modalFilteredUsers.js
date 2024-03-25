import React from "react";
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "../../styles/modalfiltered.css";

export const ModalFilteredUsers = ({ show, handleClose }) => {

    const theme = createTheme({
        palette: {
            primary: {
                main: '#295f72',
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            {show && (
                <div className="modal-overlay">
                    <div className="modal-background"></div> {/* Capa de fondo oscuro */}
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">No se encontraron perfiles</h5>
                        </div>
                        <div className="modal-body">
                            <p>No hay perfiles que cumplan con los filtros seleccionados.</p>
                        </div>
                        <div className="modal-footer">
                            <Button type="button" color="primary" variant="outlined" className="button" onClick={handleClose}>Cerrar</Button>
                        </div>
                    </div>
                </div>
            )}
        </ThemeProvider>
    );
};
