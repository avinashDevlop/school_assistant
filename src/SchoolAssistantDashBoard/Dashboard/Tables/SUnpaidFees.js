import React from 'react';
import { styled } from '@mui/system';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FiInfo } from "react-icons/fi";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette?.common?.blue || '#F3F4FF',
    color: theme.palette?.common?.white || 'black',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette?.action?.hover || 'hover',
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(Class, paid, unpaid, status) {
  return { Class, paid, unpaid, status };
}

const rows = [
  createData('7th class', 'paid-10', 'unpaid-20', 'pending'),
  createData('8th class', 'paid-10', 'unpaid-20', 'completed'),
  createData('9th class', 'paid-10', 'unpaid-20', 'pending'),
  createData('10th class', 'paid-10', 'unpaid-20', 'completed'),
  createData('6th class', 'paid-10', 'unpaid-20', 'pending'),
  createData('4th class', 'paid-10', 'unpaid-20', 'completed'),
  createData('10th class', 'paid-10', 'unpaid-20', 'completed'),
  createData('6th class', 'paid-10', 'unpaid-20', 'pending'),
  createData('4th class', 'paid-10', 'unpaid-20', 'completed'),
];

function CustomizedTables() {
  return (
    <TableContainer component={Paper} sx={{ maxHeight: 400, overflow: 'auto' }}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table" className='tableStudentMarks'>
        <TableBody>
          {rows.map((row, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {row.Class}
              </StyledTableCell>
              <StyledTableCell>{row.paid}</StyledTableCell>
              <StyledTableCell>{row.unpaid}</StyledTableCell>
              <StyledTableCell>{row.status}</StyledTableCell>
              <StyledTableCell>
                <FiInfo /> {/* Assuming FiInfo is your icon component */}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CustomizedTables;
