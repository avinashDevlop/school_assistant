import React from 'react';
import { styled } from '@mui/system';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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

function createData(sno, name, gender, marks, percentage, classValue) {
  return { sno, name, gender, marks, percentage, classValue };
}

const rows = [
  createData(1, 'John Doe', 'M', '45/50', 95, 10),
  createData(2, 'Jane Smith', 'F', '37/50', 74, 10),
  createData(3, 'Bob Johnson', 'M', '42/50', 84, 11),
  createData(4, 'Alice Williams', 'F', '40/50', 80, 11),
  createData(5, 'Charlie Brown', 'M', '48/50', 96, 12),
  createData(6, 'Eva Davis', 'F', '35/50', 70, 12),
  createData(4, 'Alice Williams', 'F', '40/50', 80, 11),
  createData(5, 'Charlie Brown', 'M', '48/50', 96, 12),
  createData(6, 'Eva Davis', 'F', '35/50', 70, 12),
];

function CustomizedTables() {
  return (
    <TableContainer component={Paper} sx={{ maxHeight: 400, overflow: 'auto' }}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table" className='tableStudentMarks'>
        <TableHead>
          <TableRow>
            <StyledTableCell>S.No</StyledTableCell>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Gender</StyledTableCell>
            <StyledTableCell>Abstain / Marks</StyledTableCell>
            <StyledTableCell>Percentage</StyledTableCell>
            <StyledTableCell>Class</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.sno}>
              <StyledTableCell component="th" scope="row">
                {row.sno}
              </StyledTableCell>
              <StyledTableCell>{row.name}</StyledTableCell>
              <StyledTableCell>{row.gender}</StyledTableCell>
              <StyledTableCell>{row.marks}</StyledTableCell>
              <StyledTableCell>{row.percentage}</StyledTableCell>
              <StyledTableCell>{row.classValue}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CustomizedTables;
