import { useMemo } from "react";
import { MaterialReactTable, useMaterialReactTable} from "material-react-table";

export default function StudentTable({ data }) {
    const columns = useMemo(
        () => [
            { accessorKey: 'studentNumber', header: 'Student ID' },
            { accessorKey: 'profiles.firstName', header: 'First Name' },
            { accessorKey: 'profiles.lastName', header: 'Last Name' },
            { accessorKey: 'program', header: 'Program' },
            { accessorKey: 'yearLevel', header: 'Year Level' },
        ],
        []
    );

    const table = useMaterialReactTable({
        columns,
        data: data || [],
        initialState: { pagination: { pageSize: 25 } },
        enablePagination: true,
    });

    return <MaterialReactTable table={table} />;
}        