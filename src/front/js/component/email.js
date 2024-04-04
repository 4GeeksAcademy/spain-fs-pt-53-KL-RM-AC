import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#295f72',
    },
  },
});

export const Emailjs = ({ isOpen, onClose, userEmail }) => { // Agrega userEmail como prop
  const form = useRef();
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: userEmail, // Asigna el correo electrónico del usuario como valor inicial
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);

    emailjs
      .sendForm('service_fagtxs7', 'template_bu9rbda', form.current, {
        publicKey: 'FZ1DV86eSiMbxSAyI', 
      })
      .then(
        () => {
          console.log('SUCCESS!');
          setIsSending(false);
          onClose();
        },
        (error) => {
          console.log('FAILED...', error.text);
          setIsSending(false);
        },
      );
  };

  return (
    <ThemeProvider theme={theme}>
      <Modal open={isOpen} onClose={onClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 4,
            textAlign: 'center'
          }}
        >
          <form ref={form} onSubmit={sendEmail}>
            <TextField
              margin="dense"
              label="Name"
              name="user_name"
              value={formData.user_name}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Email"
              type="email"
              name="user_email"
              value={formData.user_email}
              onChange={handleChange}
              fullWidth
              disabled 
            />
            <TextField
              margin="dense"
              label="Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              multiline
              rows={4}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSending}
              sx={{ mt: 2 }}
            >
              {isSending ? 'Sending...' : 'Send'}
            </Button>
          </form>
        </Box>
      </Modal>
    </ThemeProvider>
  );
};
