import { useMemo } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';

export default function StudentTable({ data }) {
  const columns = useMemo(
    () => [
      { accessorKey: 'student_number', header: 'Student ID' },
      { accessorKey: 'profiles.firstName', header: 'First Name' },
      { accessorKey: 'profiles.lastName', header: 'Last Name' },
      { accessorKey: 'program', header: 'Program' },
      { accessorKey: 'year_level', header: 'Year' },
      { accessorKey: 'section', header: 'Section' },
      { accessorKey: 'internship_status', header: 'Status' },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data: data || [],
    initialState: { pagination: { pageSize: 25 } },
  });

  return <MaterialReactTable table={table} />;
}
