import { DataTable } from "@/components/data-table";
import dayjs from "dayjs";
import React from "react";
import ModalMedicalStaff from "./Partials/ModalMedicalStaff";
import { DeleteData } from "./Partials/DeleteData";
import { useForm } from "@inertiajs/react";
import SearchInput from "@/components/search";

const MedicalStaff = ({ data, filters }) => {
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
            accessorKey: "staff_id",
            header: "ID",
        },
        {
            accessorKey: "name",
            header: "Nama",
        },
        {
            accessorKey: "role",
            header: "Role",
        },
        {
            accessorKey: "department",
            header: "Department",
        },
        {
            accessorKey: "email",
            header: "Email",
        },
        {
            accessorKey: "phone_number",
            header: "Nomor HP.",
        },
        {
            accessorKey: "address",
            header: "Alamat",
        },
        {
            id: "id",
            header: () => <div className="text-center">Aksi</div>,
            center: true,
            cell: ({ row }) => (
                <div className="flex items-center space-x-2 justify-center">
                    <ModalMedicalStaff isEdit item={row.original} />
                    <DeleteData item={row.original} />
                </div>
            ),
        },
    ];

    return (
        <div className="container">
            <div className="flex items-center justify-between pb-4">
                <h1 className="text-2xl font-bold text-gray-800">
                    Medical Staff
                </h1>

                <ModalMedicalStaff />
            </div>

            <SearchInput
                value={values?.search}
                setValue={(e) => setData("search", e)}
                onSearch={handleSearch}
                placeholder="Cari nama, role, email, nomor hp, alamat"
            />
            <DataTable columns={columns} data={data} />
        </div>
    );
};

export default MedicalStaff;
