import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";
import React from "react";

const HomeTriage = () => {
    const data = [
        {
            created_at: new Date(),
            name: "Andri",
            id: 10,
        },
    ];

    const columns = [
        {
            accessorKey: "created_at",
            header: "Created At",
            cell: ({ row }) =>
                dayjs(row.original.created_at).format("DD/MM/YYYY"),
        },
        {
            accessorKey: "name",
            header: "Nama",
        },
        {
            id: "id",
            header: () => <div className="text-center">Aksi</div>,
            center: true,
            cell: ({ row }) => (
                <div className="flex items-center space-x-2 justify-center">
                    {/* <ModalCategory isEdit item={row.original} /> */}
                    {/* <DeleteData item={row.original} /> */}
                </div>
            ),
        },
    ];
    return (
        <div>
            <div className="mb-5 flex justify-end">
                <a href="/triage">
                    <Button>Triage</Button>
                </a>
            </div>
            <DataTable columns={columns} data={data} />
        </div>
    );
};

export default HomeTriage;
