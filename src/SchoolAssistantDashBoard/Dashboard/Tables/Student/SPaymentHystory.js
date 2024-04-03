import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

function createData(idClass, term1, term2, term3, about) {
  return { idClass, term1, term2, term3, about };
}

const rows = [
  createData('#1234/class-5', 'paid/2-1-2024', 'unpaid', 'paid', 'completed'),
  createData('#1234/class-4', 'paid/2-1-2024', 'unpaid', 'paid', 'completed'),
  createData('#1234/class-3', 'paid/2-1-2024', 'unpaid', 'paid', 'completed'),
  createData('#1234/class-2', 'paid/2-1-2024', 'unpaid', 'paid', 'completed'),
  createData('#1234/class-1', 'paid/2-1-2024', 'unpaid', 'paid', 'completed'),
];

export default function DenseTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650, backgroundColor: '#f0f0f0' }} size="large" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center">
              <Typography variant="h6" fontWeight="bold">Id/Class</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="h6" fontWeight="bold">Term-1</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="h6" fontWeight="bold">Term-2</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="h6" fontWeight="bold">Term-3</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="h6" fontWeight="bold">About</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={row.idClass}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: index % 2 === 0 ? '#ffffff' : '#f0f0f0' }}
            >
              <TableCell component="th" scope="row" align="center">
                {row.idClass}
              </TableCell>
              <TableCell align="center">{row.term1}</TableCell>
              <TableCell align="center">{row.term2}</TableCell>
              <TableCell align="center">{row.term3}</TableCell>
              <TableCell align="center"> {row.about}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
