import { Link } from "@inertiajs/react";
import React from "react";

const menus = {
    user: [
        {
            name: "Tambah",
            icon: "/images/add.png",
            url: "/triage/create",
        },
        {
            name: "List Triase",
            icon: "/images/list.png",
            url: "/triage",
        },
    ],
    admin: [
        {
            name: "Tambah",
            icon: "/images/add.png",
            url: "/triage/create",
        },
        {
            name: "List Triase",
            icon: "/images/list.png",
            url: "/triage",
        },
        {
            name: "Level",
            icon: "/images/star.png",
            url: "/triage-level",
        },
        {
            name: "Category",
            icon: "/images/application.png",
            url: "/category",
        },
        {
            name: "Checklist",
            icon: "/images/checklist.png",
            url: "/checklist-item",
        },
        {
            name: "Data Pasien",
            icon: "/images/patient.png",
            url: "/data-pasien",
        },
        {
            name: "Treatments",
            icon: "/images/therapy.png",
            url: "/treatments",
        },
        {
            name: "User",
            icon: "/images/user.png",
            url: "/user",
        },
    ],
};

const HomeTriage = ({ data: user }) => {
    return (
        <div className="py-4">
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-5">
                {user && user?.role === "user"
                    ? menus.user.map((val, idx) => (
                          <MenuItem key={`user${idx}`} val={val} />
                      ))
                    : menus.admin.map((val, idx) => (
                          <MenuItem key={`user${idx}`} val={val} />
                      ))}
            </div>
        </div>
    );
};

const MenuItem = ({ val }) => {
    return (
        <Link href={val.url} className="group">
            <div className="bg-white p-6 rounded-xl shadow-[0_0_5px_rgba(0,0,0,0.09)] flex flex-col items-center justify-center gap-3 transition-transform duration-200 group-hover:scale-[1.03]">
                <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full">
                    <img src={val.icon} alt={val.name} className="w-10 h-10" />
                </div>
                <p className="text-sm font-medium text-gray-600 text-center">
                    {val.name}
                </p>
            </div>
        </Link>
    );
};

export default HomeTriage;
