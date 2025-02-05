import { DataTable } from "@/components/data-table";
import dayjs from "dayjs";
import React from "react";
import { useForm } from "@inertiajs/react";
import SearchInput from "@/components/search";

const Treatment = ({ data, filters }) => {
    const {
        get,
        setData,
        data: values,
    } = useForm({
        search: filters?.search || "",
    });

    const handleSearch = (e) => {
        if (e) e.preventDefault();
        get("/admin/treatments");
    };

    const columns = [
        {
            accessorKey: "created_at",
            header: "Tanggal",
            cell: ({ row }) =>
                dayjs(row.original.created_at).format("DD/MM/YYYY"),
        },
        {
            accessorKey: "triage",
            header: "No. Triase",
            cell: ({ row }) => dayjs(row.original.triage?.triage_no),
        },
        {
            accessorKey: "user",
            header: "Staff",
            cell: ({ row }) => dayjs(row.original.user?.name),
        },
        {
            accessorKey: "treatment_detail",
            header: "Detail",
        },
    ];

    return (
        <div className="">
            <div className="flex items-center justify-between pb-4">
                <h1 className="text-2xl font-bold text-gray-800">
                    Daftar Treage
                </h1>
            </div>

            <SearchInput
                value={values?.search}
                setValue={(e) => setData("search", e)}
                onSearch={handleSearch}
                placeholder="Cari nomor, staff, detail"
            />
            <DataTable columns={columns} data={data} />
        </div>
    );
};

export default Treatment;
