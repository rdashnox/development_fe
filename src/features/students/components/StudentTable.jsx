import { useMemo } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

export default function StudentTable({ data, onEdit }) {
  const columns = useMemo(
    () => [
      { accessorKey: 'student_number', header: 'Student ID' },
      { accessorKey: 'program', header: 'Program' },
      { accessorKey: 'year_level', header: 'Year' },
      { accessorKey: 'section', header: 'Section' },
      { accessorKey: 'internship_status', header: 'Status' },
      {
        id: 'actions',
        header: 'Actions',
        Cell: ({ row }) => (
          <IconButton onClick={() => onEdit(row.original)}>
            <EditIcon />
          </IconButton>
        ),
      },
    ],
    [onEdit],
  );

  return <MaterialReactTable columns={columns} data={data || []} />;
}
