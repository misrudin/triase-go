import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import dayjs from "dayjs";
import { Pencil, Plus, Trash } from "lucide-react";
import React from "react";

const TriageLevel = ({ data }) => {
    const columns = [
        {
            accessorKey: "created_at",
            header: "Created At",
            cell: ({ row }) =>
                dayjs(row.original.created_at).format("DD MMMM YYYY, HH:mm"),
        },
        {
            accessorKey: "level",
            header: "Level",
            cell: ({ row }) => (
                <p className="capitalize">{row.original.level}</p>
            ),
        },
        {
            accessorKey: "description",
            header: "Description",
        },
        {
            id: "id",
            header: () => <div className="text-center">Aksi</div>,
            center: true,
            cell: ({ row }) => (
                <div className="flex items-center space-x-2 justify-center">
                    <Button
                        variant="outline"
                        size="icon"
                        // onClick={() => handleEdit(row.original)}
                        className="p-2 text-blue-500 hover:text-blue-700"
                    >
                        <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        // onClick={() => handleDelete(row.original)}
                        className="p-2 text-red-500 hover:text-red-700"
                    >
                        <Trash className="w-4 h-4" />
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div className="container">
            <div className="flex items-center justify-between pb-4">
                <h1 class="text-2xl font-bold text-gray-800">Triage Level</h1>
                <Button>
                    <Plus /> Tambah
                </Button>
            </div>

            <div className="flex items-center py-4">
                <Input placeholder="Cari data" className="max-w-sm" />
            </div>
            <DataTable columns={columns} data={data?.data} />
        </div>
    );
};

export default TriageLevel;
