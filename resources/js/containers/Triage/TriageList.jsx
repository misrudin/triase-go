import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, Eye, Printer, Repeat2 } from "lucide-react";

const TriageList = ({ data }) => {
    const columns = [
        {
            accessorKey: "#",
            header: "No",
            cell: ({ row }) => row.index + 1,
        },
        {
            accessorKey: "triage_no",
            header: "Triage No",
            // cell: ({ row }) =>
            //     dayjs(row.original.created_at).format("DD/MM/YYYY"),
        },
        {
            accessorKey: "patient.name",
            header: "Nama",
        },
        {
            accessorKey: "patient.nik",
            header: "NIK",
            cell: ({ row }) => row.original.patient.nik ?? "-",
        },
        {
            accessorKey: "patient.date_of_birth",
            header: "Tanggal Lahir",
            cell: ({ row }) => row.original.patient.nik ?? "-",
        },
        {
            accessorKey: "patient.gender",
            header: "Jenis Kelamain",
            cell: ({ row }) => row.original.patient.gender.toUpperCase(),
        },
        {
            accessorKey: "allergy",
            header: "Alergi",
        },
        {
            accessorKey: "symptoms",
            header: "Keluhan",
        },

        {
            id: "id",
            header: () => <div>Aksi</div>,
            center: true,
            cell: ({ row }) => (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            className={`${
                                row?.original?.level === "black"
                                    ? "text-white"
                                    : "text-black"
                            }`}
                        >
                            <EllipsisVertical />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-56"
                        side="bottom"
                        align="end"
                        sideOffset={8}
                    >
                        <DropdownMenuItem>
                            <Repeat2 />
                            <span>Triase Ulang</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Eye />
                            <span>Lihat Detail</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Printer />
                            <span>Cetak Triase</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                // <div className="flex items-center space-x-2 justify-center">
                //     {/* <ModalCategory isEdit item={row.original} /> */}
                //     {/* <DeleteData item={row.original} /> */}
                // </div>
            ),
        },
    ];

    const getRowClassName = (row) => {
        if (row.original.level === "green") {
            return "bg-green-500";
        } else if (row.original.level === "black") {
            return "bg-black hover:text-black text-white"; // Warna untuk laki-laki
        } else if (row.original.level === "yellow") {
            return "bg-yellow-500"; // Warna untuk laki-laki
        } else if (row.original.level === "red") {
            return "bg-red-500"; // Warna untuk laki-laki
        }
        return "";
    };

    return (
        <div>
            <DataTable
                columns={columns}
                data={data}
                rowClassname={(row) => getRowClassName(row)}
            />
        </div>
    );
};

export default TriageList;
