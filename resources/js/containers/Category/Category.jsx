import { DataTable } from "@/components/data-table";
import dayjs from "dayjs";
import React from "react";
import ModalCategory from "./Partials/ModalCategory";
import { DeleteData } from "./Partials/DeleteData";
import { useForm } from "@inertiajs/react";
import SearchInput from "@/components/search";

const Category = ({ data, filters }) => {
    const {
        get,
        setData,
        data: values,
    } = useForm({
        search: filters?.search || "",
    });

    const handleSearch = (e) => {
        if (e) e.preventDefault();
        get("/admin/category");
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
            id: "id",
            header: () => <div className="text-center">Aksi</div>,
            center: true,
            cell: ({ row }) => (
                <div className="flex items-center space-x-2 justify-center">
                    <ModalCategory isEdit item={row.original} />
                    <DeleteData item={row.original} />
                </div>
            ),
        },
    ];

    return (
        <div className="">
            <div className="flex items-center justify-between pb-4">
                <h1 className="text-2xl font-bold text-gray-800">Category</h1>

                <ModalCategory />
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

export default Category;
