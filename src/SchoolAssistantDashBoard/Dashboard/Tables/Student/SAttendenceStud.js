import React, { useMemo } from 'react';
import './SAttendenceStud.css';
import { TiTick } from 'react-icons/ti';
import { IoCloseSharp } from 'react-icons/io5';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';

// Sample data with alternating true and false for the first 15 numerical columns
const data = [
  {
    si: 1,
    name: {
      firstName: 'John',
      lastName: 'Doe',
    },
    // Alternate true and false for the first 15 numerical columns
    ...Array.from({ length: 30 }, (_, index) => ({
      [`${index + 1}`]: index % 2 === 0,
    })),
  },
  // Add more data objects as needed
  {
    si: 2,
    name: {
      firstName: 'Jane',
      lastName: 'Smith',
    },
    // Add more data for numerical columns
    16: true,
    17: false,
    // ... add data for other numerical columns
    30: false,
  },
  {
    si: 2,
    name: {
      firstName: 'Jane',
      lastName: 'Smith',
    },
    // Add more data for numerical columns
    16: true,
    17: false,
    // ... add data for other numerical columns
    30: false,
  },
  {
    si: 2,
    name: {
      firstName: 'Jane',
      lastName: 'Smith',
    },
    // Add more data for numerical columns
    16: true,
    17: false,
    // ... add data for other numerical columns
    30: false,
  },
  {
    si: 2,
    name: {
      firstName: 'Jane',
      lastName: 'Smith',
    },
    // Add more data for numerical columns
    16: true,
    17: false,
    // ... add data for other numerical columns
    30: false,
  },
  {
    si: 2,
    name: {
      firstName: 'Jane',
      lastName: 'Smith',
    },
    // Add more data for numerical columns
    16: true,
    17: false,
    // ... add data for other numerical columns
    30: false,
  },
  {
    si: 2,
    name: {
      firstName: 'Jane',
      lastName: 'Smith',
    },
    // Add more data for numerical columns
    16: true,
    17: false,
    // ... add data for other numerical columns
    30: false,
  },
  {
    si: 2,
    name: {
      firstName: 'Jane',
      lastName: 'Smith',
    },
    // Add more data for numerical columns
    16: true,
    17: false,
    // ... add data for other numerical columns
    30: false,
  },
  {
    si: 2,
    name: {
      firstName: 'Jane',
      lastName: 'Smith',
    },
    // Add more data for numerical columns
    16: true,
    17: false,
    // ... add data for other numerical columns
    30: false,
  },
  // ... add more data objects as needed
];

const Example = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: 'si',
        header: 'SI',
        size: 20,
      },
      {
        accessorKey: 'name',
        header: 'Name',
        size: 100,
        Cell: ({ row }) => `${row.original.name.firstName} ${row.original.name.lastName}`,
      },
      ...Array.from({ length: 30 }, (_, index) => ({
        accessorKey: `${index + 1}`,
        header: `${index + 1}`,
        size: 0,
        Cell: ({ value }) => value ? <TiTick color="#008000" /> : <IoCloseSharp color="#FF0000" />,
      })),
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data,
  });

  return (
    <div className="table-container">
      <MaterialReactTable table={table} />
    </div>
  );
};

export default Example;
