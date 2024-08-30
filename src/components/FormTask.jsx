import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export default function FormTask({
  open = false,
  task = null,
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
        <DialogTitle>Tarea</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Por favor digita los campos obligatorios marcados con <b>*</b>.
          </DialogContentText>
          <div className='form-container' >


            <TextField
              autoFocus
              required
              margin="dense"
              id="title"
              name="title"
              label="Titulo"
              type="text"
              fullWidth
              defaultValue={task && task.title}
            />

            <TextField
              autoFocus
              required
              margin="dense"
              id="description"
              name="description"
              label="Descripción"
              type="text"
              fullWidth
              defaultValue={task && task.description}
            />

            <FormControl fullWidth>
              <InputLabel id="priority-label">Estado</InputLabel>
              <Select
                labelId="priority-label"
                id="status"
                name="status"
                defaultValue={task && task.status}
                label="Estado"
              >
                <MenuItem value={0}>Pendiente</MenuItem>
                <MenuItem value={1}>Completado</MenuItem>
              </Select>
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseHandler}>Cancelar</Button>
          <Button type="submit">Guardar</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}