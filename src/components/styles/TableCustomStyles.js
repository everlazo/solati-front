import { styled } from '@mui/system';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Table from '@mui/material/Table';

export const StyledTable = styled(Table)(({ theme }) => ({
  minWidth: 650,
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: '#5dc7f5',
  color: '#ffffff',
}));

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  color: '#ffffff',
  fontWeight: 'bold',
  textAlign: 'center',
}));