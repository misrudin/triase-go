import { DataTable } from "@/components/data-table";
import dayjs from "dayjs";
import React from "react";
import ModalTriageLevel from "./Partials/ModalTriageLevel";
import { DeleteData } from "./Partials/DeleteData";
import { useForm } from "@inertiajs/react";
import SearchInput from "@/components/search";

const TriageLevel = ({ data, filters }) => {
    const {
        get,
        setData,
        data: values,
    } = useForm({
        search: filters?.search || "",
    });

    const handleSearch = (e) => {
        if (e) e.preventDefault();
        get("/admin/triage-level");
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
                <p className="capitalize">{row.original.level}</p>
            ),
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
                    <ModalTriageLevel isEdit item={row.original} />
                    <DeleteData item={row.original} />
                </div>
            ),
        },
    ];

    return (
        <div className="">
            <div className="flex items-center justify-between pb-4">
                <h1 className="text-2xl font-bold text-gray-800">Triage Level</h1>

                <ModalTriageLevel />
            </div>

            <SearchInput
                value={values?.search}
                setValue={(e) => setData("search", e)}
                onSearch={handleSearch}
                placeholder="Cari level atau deskripsi"
            />
            <DataTable columns={columns} data={data} />
        </div>
    );
};

export default TriageLevel;
