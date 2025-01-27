import { DataTable } from "@/components/data-table";
import dayjs from "dayjs";
import React from "react";
import ModalChecklistItem from "./Partials/ModalChecklistItem";
import { DeleteData } from "./Partials/DeleteData";
import { useForm } from "@inertiajs/react";
import SearchInput from "@/components/search";

const TriageLevel = ({ data, filters, levels }) => {
    const {
        get,
        setData,
        data: values,
    } = useForm({
        search: filters?.search || "",
    });

    const handleSearch = (e) => {
        if (e) e.preventDefault();
        get("/admin/checklist-item");
    };

    const columns = [
        {
            accessorKey: "created_at",
            header: "Created At",
            cell: ({ row }) =>
                dayjs(row.original.created_at).format("DD/MM/YYYY"),
        },
        {
            accessorKey: "level",
            header: "Level",
            cell: ({ row }) => (
                <p className="capitalize">{row.original.triage_level.level}</p>
            ),
        },
        {
            accessorKey: "name",
            header: "Gejala",
        },
        {
            accessorKey: "description",
            header: "Deskripsi",
        },
        {
            id: "id",
            header: () => <div className="text-center">Aksi</div>,
            center: true,
            cell: ({ row }) => (
                <div className="flex items-center space-x-2 justify-center">
                    <ModalChecklistItem
                        isEdit
                        item={row.original}
                        levels={levels}
                    />
                    <DeleteData item={row.original} />
                </div>
            ),
        },
    ];

    return (
        <div className="container">
            <div className="flex items-center justify-between pb-4">
                <h1 className="text-2xl font-bold text-gray-800">
                    Checklist Item
                </h1>

                <ModalChecklistItem levels={levels} />
            </div>

            <SearchInput
                value={values?.search}
                setValue={(e) => setData("search", e)}
                onSearch={handleSearch}
                placeholder="Cari level, nama atau deskripsi"
            />
            <DataTable columns={columns} data={data} />
        </div>
    );
};

export default TriageLevel;
