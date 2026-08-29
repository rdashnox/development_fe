import { useMemo } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

export default function StudentTable({ data, onEdit, role }) {
  console.log("StudentTable received data:", data);
  const columns = useMemo(
    () => {
      const allColumns = [
        { accessorKey: 'student_number', header: 'Student ID' },
        { accessorKey: 'program', header: 'Program' },
        { accessorKey: 'year_level', header: 'Year' },
        { accessorKey: 'section', header: 'Section' },
        { accessorKey: 'contact_number', header: 'Contact' },
        { accessorKey: 'address', header: 'Address' },
        { accessorKey: 'emergency_contact_name', header: 'Emergency Name' },
        { accessorKey: 'emergency_contact_number', header: 'Emergency Number' },
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
      ];

      const isStaff = ["administrator", "internship_coordinator", "hte_supervisor"].includes(role);
      
      if (!isStaff) {
        return allColumns.filter(col => 
          ['student_number', 'contact_number', 'address', 'emergency_contact_name', 'emergency_contact_number', 'actions'].includes(col.accessorKey || col.id)
        );
      }
      return allColumns;
    },
    [onEdit, role],
  );


  return <MaterialReactTable columns={columns}
    data={data || []}
    initialState={{ pagination: {pageSize: 25, pageIndex: 0}}}/>
} 
