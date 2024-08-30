import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function Login({
  open = false,
  onCloseHandler = null,
  onSubmitHandler = null,
}) {
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={onCloseHandler}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            onSubmitHandler(formJson)
            onCloseHandler();
          },
        }}
      >
        <DialogTitle>Ingreso a la plataforma</DialogTitle>
        <DialogContent>
          <div className='form-container' >
            <TextField
              autoFocus
              required
              margin="dense"
              id="email"
              name="email"
              label="Correo electrónico"
              type="text"
              fullWidth
            />

            <TextField
              autoFocus
              required
              margin="dense"
              id="password"
              name="password"
              label="Contraseña"
              type="password"
              fullWidth
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button type="submit">Ingresar</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}