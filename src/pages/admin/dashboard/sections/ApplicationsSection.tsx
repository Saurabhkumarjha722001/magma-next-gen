import React, { useEffect, useState } from "react";
import { supabase } from "../../../../supabase/client";
import { useReactTable, ColumnDef, getCoreRowModel, flexRender } from "@tanstack/react-table";

type Application = {
  id: number;
  full_name: string;
  email: string;
  role: string;
  cover_letter: string;
  created_at: string;
};

const ApplicationsPage: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    const fetchApplications = async () => {
      const { data, error } = await supabase.from("applications").select("*");
      if (error) {
        console.error("Error fetching applications:", error.message);
      } else {
        setApplications(data || []);
      }
    };

    fetchApplications();
  }, []);

  const columns = React.useMemo<ColumnDef<Application>[]>(
    () => [
      { header: "Sr. No", cell: (info) => info.row.index + 1 },
      { accessorKey: "full_name", header: "Full Name" },
      { accessorKey: "email", header: "Email" },
      { accessorKey: "role", header: "Role" },
      { accessorKey: "cover_letter", header: "Cover Letter" },
      {
        accessorKey: "created_at",
        header: "Submitted At",
        cell: (info) => new Date(info.getValue<string>()).toLocaleString(),
      },
    ],
    []
  );

  const table = useReactTable({
    data: applications,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full bg-white text-sm text-left">
          <thead className="bg-gray-100 border-b">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-4 py-2 text-gray-700 font-semibold">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b hover:bg-gray-50 transition">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicationsPage;
