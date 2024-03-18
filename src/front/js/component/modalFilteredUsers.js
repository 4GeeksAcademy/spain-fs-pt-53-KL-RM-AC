import React, { useContext } from "react";

export const ModalFilteredUsers = ({ show, handleClose }) => {
    return (
        <div className={`modal ${show ? "show" : ""}`} tabIndex="-1" role="dialog" style={{ display: show ? "block" : "none" }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">No se encontraron perfiles</h5>
                        <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button>
                    </div>
                    <div className="modal-body">
                        <p>No hay perfiles que cumplan con los filtros seleccionados.</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={handleClose}>Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};