import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';

export default function TableCustom({ list = [], onEdit, onDelete }) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow sx={{ backgroundColor: '#5dc7f5', color: '#ffffff' }}>
                        <TableCell align="center" sx={{ color: '#ffffff', fontWeight: 'bold' }}>#</TableCell>
                        <TableCell align="center" sx={{ color: '#ffffff', fontWeight: 'bold' }}>Título</TableCell>
                        <TableCell align="center" sx={{ color: '#ffffff', fontWeight: 'bold' }}>Descripción</TableCell>
                        <TableCell align="center" sx={{ color: '#ffffff', fontWeight: 'bold' }}>Estado</TableCell>
                        <TableCell align="center" sx={{ color: '#ffffff', fontWeight: 'bold' }}>Fecha creación</TableCell>
                        <TableCell align="center"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {list.data && list.data.map((row, i) => (
                        <TableRow
                            key={i}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="center" component="th" scope="row">
                                {i+1 || 0}
                            </TableCell>
                            <TableCell align="center">{row.title}</TableCell>
                            <TableCell align="center">{row.description}</TableCell>
                            <TableCell align="center">{row.status == 0 ? "Pendiente" : "Completado"}</TableCell>
                            <TableCell align="center">{row.created_at}</TableCell>
                            <TableCell align="center">
                                <IconButton onClick={() => onEdit(row)} size="large" aria-label="edit task" color="inherit">
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => onDelete(row)} size="large" aria-label="delete task" color="inherit">
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
