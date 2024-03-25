import React from "react";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const CustomAlert = ({ open, onClose, message, severity }) => {
    return (
        <Snackbar 
            open={open} 
            autoHideDuration={5000} 
            onClose={onClose} 
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }} 
            style={{ marginTop: '40px' }}
        >
            <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default CustomAlert;
