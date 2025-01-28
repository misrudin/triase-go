import { DataTable } from "@/components/data-table";
import dayjs from "dayjs";
import React from "react";
import { useForm } from "@inertiajs/react";
import SearchInput from "@/components/search";

const Pasien = ({ data, filters }) => {
    const {
        get,
        setData,
        data: values,
    } = useForm({
        search: filters?.search || "",
    });

    const handleSearch = (e) => {
        if (e) e.preventDefault();
        get("/admin/data-pasien");
    };

    const columns = [
        {
            accessorKey: "nik",
            header: "NIK",
        },
        {
            accessorKey: "name",
            header: "Nama",
        },
        {
            accessorKey: "gender",
            header: "Jenis Kelamin",
        },
        {
            accessorKey: "date_of_birth",
            header: "Tanggal Lahir",
            cell: ({ row }) =>
                dayjs(row.original.date_of_birth).format("DD/MM/YYYY"),
        },
        {
            accessorKey: "phone_number",
            header: "Nomor HP.",
        },
        {
            accessorKey: "address",
            header: "Alamat",
        },
    ];

    return (
        <div className="">
            <div className="flex items-center justify-between pb-4">
                <h1 className="text-2xl font-bold text-gray-800">
                    Daftar Pasien
                </h1>
            </div>

            <SearchInput
                value={values?.search}
                setValue={(e) => setData("search", e)}
                onSearch={handleSearch}
                placeholder="Cari berdasarkan nama"
            />
            <DataTable columns={columns} data={data} />
        </div>
    );
};

export default Pasien;
