import { DataTable } from "@/components/data-table";
import dayjs from "dayjs";
import React from "react";
import ModalUsers from "./Partials/ModalUsers";
import { DeleteData } from "./Partials/DeleteData";
import { useForm } from "@inertiajs/react";
import SearchInput from "@/components/search";

const Users = ({ data, filters }) => {
    const {
        get,
        setData,
        data: values,
    } = useForm({
        search: filters?.search || "",
    });

    const handleSearch = (e) => {
        if (e) e.preventDefault();
        get("/admin/user");
    };

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
            accessorKey: "role",
            header: "Role",
            cell: ({ row }) => <p className="capitalize">{row.original.role}</p>,
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
                    <ModalUsers isEdit item={row.original} />
                    <DeleteData item={row.original} />
                </div>
            ),
        },
    ];

    return (
        <div className="">
            <div className="flex items-center justify-between pb-4">
                <h1 className="text-2xl font-bold text-gray-800">Data User</h1>

                <ModalUsers />
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

export default Users;
