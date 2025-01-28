import React, { useEffect, useState } from "react";
import { supabase } from "../../../../supabase/client";
import { useReactTable, ColumnDef, getCoreRowModel, flexRender } from "@tanstack/react-table";

type Contact = {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  created_at: string;
};

const ContactsPage: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    const fetchContacts = async () => {
      const { data, error } = await supabase.from("contact_messages").select("*");
      if (error) {
        console.error("Error fetching contacts:", error.message);
      } else {
        setContacts(data || []);
      }
    };

    fetchContacts();
  }, []);

  const columns = React.useMemo<ColumnDef<Contact>[]>(
    () => [
      { header: "Sr. No", cell: (info) => info.row.index + 1 },
      { accessorKey: "name", header: "Name" },
      { accessorKey: "email", header: "Email" },
      { accessorKey: "phone", header: "Phone" },
      { accessorKey: "message", header: "Message" },
      {
        accessorKey: "created_at",
        header: "Submitted At",
        cell: (info) => new Date(info.getValue<string>()).toLocaleString(),
      },
    ],
    []
  );

  const table = useReactTable({
    data: contacts,
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

export default ContactsPage;
