import { useMemo } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';

const data = [
  {
    SI: 1,
    Name: 'John Doe',
    Gender: 'Male',
    'Pas/Fail': 'Pass',
    'Grade percent': 85,
    telugu: 78,
    hindi: 89,
    english: 92,
    math: 75,
    science: 88,
    social: 80,
    'obtain/marks': 602,
  },
  {
    SI: 2,
    Name: 'Jane Doe',
    Gender: 'Female',
    'Pas/Fail': 'Pass',
    'Grade percent': 92,
    telugu: 85,
    hindi: 90,
    english: 94,
    math: 88,
    science: 91,
    social: 89,
    'obtain/marks': 637,
  },
  {
    SI: 2,
    Name: 'Jane Doe',
    Gender: 'Female',
    'Pas/Fail': 'Pass',
    'Grade percent': 92,
    telugu: 85,
    hindi: 90,
    english: 94,
    math: 88,
    science: 91,
    social: 89,
    'obtain/marks': 637,
  },
  {
    SI: 2,
    Name: 'Jane Doe',
    Gender: 'Female',
    'Pas/Fail': 'Pass',
    'Grade percent': 92,
    telugu: 85,
    hindi: 90,
    english: 94,
    math: 88,
    science: 91,
    social: 89,
    'obtain/marks': 637,
  },
  {
    SI: 2,
    Name: 'Jane Doe',
    Gender: 'Female',
    'Pas/Fail': 'Pass',
    'Grade percent': 92,
    telugu: 85,
    hindi: 90,
    english: 94,
    math: 88,
    science: 91,
    social: 89,
    'obtain/marks': 637,
  },
  {
    SI: 2,
    Name: 'Jane Doe',
    Gender: 'Female',
    'Pas/Fail': 'Pass',
    'Grade percent': 92,
    telugu: 85,
    hindi: 90,
    english: 94,
    math: 88,
    science: 91,
    social: 89,
    'obtain/marks': 637,
  },
  // Add more data entries as needed
];

const Example = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: 'SI',
        header: 'SI',
        size: 50,
      },
      {
        accessorKey: 'Name',
        header: 'Name',
        size: 200,
      },
      {
        accessorKey: 'Gender',
        header: 'Gender',
        size: 100,
      },
      {
        accessorKey: 'Pas/Fail',
        header: 'Pas/Fail',
        size: 100,
      },
      {
        accessorKey: 'Grade percent',
        header: 'Grade Percent',
        size: 120,
      },
      {
        accessorKey: 'telugu',
        header: 'Telugu',
        size: 80,
      },
      {
        accessorKey: 'hindi',
        header: 'Hindi',
        size: 80,
      },
      {
        accessorKey: 'english',
        header: 'English',
        size: 80,
      },
      {
        accessorKey: 'math',
        header: 'Math',
        size: 80,
      },
      {
        accessorKey: 'science',
        header: 'Science',
        size: 80,
      },
      {
        accessorKey: 'social',
        header: 'Social',
        size: 80,
      },
      {
        accessorKey: 'obtain/marks',
        header: 'Obtain/Marks',
        size: 120,
      },
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
