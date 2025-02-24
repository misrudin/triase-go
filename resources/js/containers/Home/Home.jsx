import { Link } from "@inertiajs/react";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";
import React from "react";
import {
    CirclePlus,
    ClipboardPlus,
    Group,
    Hospital,
    ListCheck,
    ListOrdered,
    Lock,
    User,
    UserRoundCog,
    Users,
} from "lucide-react";

const menus = {
    user: [
        {
            name: "Triage Dashboard",
            icon: ClipboardPlus,
            url: "/triage/create",
        },
        {
            name: "List Triase",
            icon: ListOrdered,
            url: "/triage",
        },
        {
            name: "Password",
            icon: Lock,
            url: "/password",
        },
        {
            name: "Profile",
            icon: User,
            url: "/profile",
        },
    ],
    admin: [
        {
            name: "Dashboard",
            icon: CirclePlus,
            url: "/",
        },
        {
            name: "Triage Level",
            icon: ListOrdered,
            url: "/triage-level",
        },
        {
            name: "Category",
            icon: Group,
            url: "/category",
        },
        {
            name: "Checklist Item",
            icon: ListCheck,
            url: "/checklist-item",
        },
        {
            name: "Data Pasien",
            icon: Users,
            url: "/data-pasien",
        },
        {
            name: "Treatments",
            icon: Hospital,
            url: "/treatments",
        },
        {
            name: "Triage Dashboard",
            icon: ClipboardPlus,
            url: "/triage/create",
        },
        {
            name: "List Triase",
            icon: ListOrdered,
            url: "/triage",
        },
        {
            name: "User",
            icon: UserRoundCog,
            url: "/user",
        },
        {
            name: "Password",
            icon: Lock,
            url: "/password",
        },
        {
            name: "Profile",
            icon: User,
            url: "/profile",
        },
    ],
};

const HomeTriage = ({ data: user }) => {
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 px-5 md:px-0">
                {user && user?.role === "user"
                    ? menus.user.map((val, idx) => (
                          <Link
                              className="w-full bg-red-200"
                              href={val.url}
                              key={`user${idx}`}
                          >
                              <Button className="p-10 w-full flex-col">
                                  <val.icon size={34} /> {val?.name}
                              </Button>
                          </Link>
                      ))
                    : menus.admin.map((val, idx) => (
                          <Link
                              className="w-full bg-red-200"
                              href={val.url}
                              key={`admin${idx}`}
                          >
                              <Button className="p-10 w-full flex-col">
                                  <val.icon size={34} /> {val?.name}
                              </Button>
                          </Link>
                      ))}
            </div>
        </div>
    );
};

export default HomeTriage;
