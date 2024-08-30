import './App.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import TableCustom from './components/TableCustom';
import NavBar from './components/NavBar';
import FormTask from './components/FormTask';
import { Button, CircularProgress, Snackbar } from '@mui/material';
import { useEffect, useState } from 'react';
import taskServices from './api/services/tasks/task-services';
import Login from './components/Login';
import userServices from './api/services/users/user-services';

function App() {
  const [openForm, setOpenForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });
  const [task, setTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [isAuth, setIsAuth] = useState(localStorage.getItem("access_token") != null);

  useEffect(() => {
    if (isAuth) {
      findTasks()
    }
  }, []);

  const findTasks = async () => {
    setLoading(true)
    let response = await taskServices.findAll()
    if (!response.success) {
      setSnackbar({ open: true, message: response.message })
      return;
    }
    setTasks(response.data)
    setLoading(false)
  }

  const handleClickOpenNew = () => {
    setTask(null)
    setOpenForm(true);
  };

  const handleClose = () => {
    setOpenForm(false);
  };

  const onSave = async (data) => {
    setLoading(true)
    let response = task == null ? await taskServices.create(data) : await taskServices.update(task.id, data)
    setTask(null)
    setSnackbar({ open: true, message: response.message })
    await findTasks()
  }

  const onEdit = (data) => {
    setTask(data)
    setOpenForm(true);
  }

  const onDelete = async (data) => {
    let rest = confirm('¿Está seguro de eliminar esta tarea?')
    if (rest) {
      setLoading(true)
      let response = await taskServices.delete(data.id)
      setSnackbar({ open: true, message: response.message })
      await findTasks()
    }
  }

  const onLogin = async (data) => {
    setLoading(true)
    let response = await userServices.login(data)
    if (response.success) {
      localStorage.setItem("access_token", response.data)
      setIsAuth(true)
      await findTasks()
    } else {
      setSnackbar({ open: true, message: response.message })
    }
  }

  const onLogout = async () => {
    setLoading(true)
    let response = await userServices.logout()
    setLoading(false)
    localStorage.removeItem("access_token")
    setIsAuth(false)
  }

  return (
    <>
      {isAuth && <NavBar />}

      {isAuth && <Button onClick={onLogout}>Cerrar sesión</Button>}

      <div className='main-container'>
        {isAuth ? <><Button variant="contained" onClick={handleClickOpenNew}>+ Nueva</Button>
          <FormTask
            open={openForm}
            task={task}
            onCloseHandler={handleClose}
            onSubmitHandler={onSave}
          />
          <div className='table-content'>
            {loading ? <CircularProgress /> :
              <TableCustom
                list={tasks}
                onEdit={(data) => { onEdit(data) }}
                onDelete={(data) => { onDelete(data) }}
              />}
          </div></>
          : <Login open={true} onSubmitHandler={onLogin} onCloseHandler={() => { }} />}

        <Snackbar
          open={snackbar.open}
          autoHideDuration={8000}
          onClose={() => { setSnackbar({ open: false, message: "" }) }}
          message={snackbar.message}
        />
      </div>
    </>
  )
}

export default App
