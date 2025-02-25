import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "@inertiajs/react";
import { EllipsisVertical, Eye, Printer, Repeat2, Trash } from "lucide-react";

const TriageList = ({ data }) => {
    console.log(data);
    // const columns = [
    //     {
    //         accessorKey: "#",
    //         header: "No",
    //         cell: ({ row }) => row.index + 1,
    //     },
    //     {
    //         accessorKey: "triage_no",
    //         header: "Triage No",
    //     },
    //     {
    //         accessorKey: "patient.name",
    //         header: "Nama",
    //     },
    //     {
    //         accessorKey: "patient.nik",
    //         header: "NIK",
    //         cell: ({ row }) => row.original.patient.nik ?? "-",
    //     },
    //     {
    //         accessorKey: "patient.date_of_birth",
    //         header: "Tanggal Lahir",
    //         cell: ({ row }) => row.original.patient.nik ?? "-",
    //     },
    //     {
    //         accessorKey: "patient.gender",
    //         header: "Jenis Kelamain",
    //         cell: ({ row }) => row.original.patient.gender.toUpperCase(),
    //     },
    //     {
    //         accessorKey: "allergy",
    //         header: "Alergi",
    //     },
    //     {
    //         accessorKey: "symptoms",
    //         header: "Keluhan",
    //     },

    //     {
    //         id: "id",
    //         header: "Aksi",
    //         center: true,
    //         cell: ({ row }) => (
    //             <DropdownMenu>
    //                 <DropdownMenuTrigger asChild>
    //                     <Button
    //                         variant="ghost"
    //                         className={`focus-visible:ring-0 ${
    //                             row?.original?.level === "black"
    //                                 ? "text-white"
    //                                 : "text-black"
    //                         }`}
    //                     >
    //                         <EllipsisVertical />
    //                     </Button>
    //                 </DropdownMenuTrigger>
    //                 <DropdownMenuContent
    //                     className="w-56"
    //                     side="bottom"
    //                     align="end"
    //                     sideOffset={8}
    //                 >
    //                     <DropdownMenuItem>
    //                         <Repeat2 />
    //                         <span>Triase Ulang</span>
    //                     </DropdownMenuItem>
    //                     <DropdownMenuItem>
    //                         <Eye />
    //                         <span>Lihat Detail</span>
    //                     </DropdownMenuItem>
    //                     <DropdownMenuItem>
    //                         <Printer />
    //                         <span>Cetak Triase</span>
    //                     </DropdownMenuItem>
    //                 </DropdownMenuContent>
    //             </DropdownMenu>
    //             // <div className="flex items-center space-x-2 justify-center">
    //             //     {/* <ModalCategory isEdit item={row.original} /> */}
    //             //     {/* <DeleteData item={row.original} /> */}
    //             // </div>
    //         ),
    //     },
    // ];

    const getColorLevel = (val) => {
        if (val?.level === "green") {
            return "border-green-500 hover:border-green-600";
        } else if (val?.level === "black") {
            return "border-gray-700 hover:border-gray-900";
        } else if (val?.level === "yellow") {
            return "border-yellow-500 hover:border-yellow-600";
        } else if (val?.level === "red") {
            return "border-red-500 hover:border-red-600";
        } else if (val?.level === "orange") {
            return "border-orange-500 hover:border-orange-600";
        }
        return "";
    };

    const getColorBadge = (val) => {
        if (val?.level === "green") {
            return "bg-green-500";
        } else if (val?.level === "black") {
            return "bg-gray-700";
        } else if (val?.level === "yellow") {
            return "bg-yellow-500";
        } else if (val?.level === "red") {
            return "bg-red-500";
        } else if (val?.level === "orange") {
            return "bg-orange-500";
        }
        return "";
    };

    return (
        <div className="grid grid-cols-1 gap-4 py-4">
            {data &&
                data?.map((val, idx) => (
                    <Link href={`/triage/${val?.id}`}>
                        <Card
                            key={idx}
                            className={`cursor-pointer shadow-[0_0_5px_rgba(0,0,0,0.09)] border-0 border-l-[2px] rounded-lg ${getColorLevel(
                                val
                            )}`}
                        >
                            <CardContent className="p-3">
                                <div className="flex items-center gap-3 justify-between">
                                    <div className="flex gap-2 items-center">
                                        <p className="font-semibold text-sm">
                                            {val?.triage_no}
                                        </p>
                                        {val?.level && (
                                            <Badge
                                                className={`pointer-events-none capitalize text-[10px] font-normal px-1 py-[1px] ${getColorBadge(
                                                    val
                                                )}`}
                                            >
                                                {val?.level}
                                            </Badge>
                                        )}
                                    </div>

                                    <div className="">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className={`focus-visible:ring-0 p-1 w-auto h-auto`}
                                                    onCick={(e) =>
                                                        e.stopPropagation()
                                                    }
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
                                                <Link
                                                    href={`/triage/${val?.id}/edit`}
                                                >
                                                    <DropdownMenuItem className="cursor-pointer">
                                                        <Repeat2 />
                                                        <span>
                                                            Triase Ulang
                                                        </span>
                                                    </DropdownMenuItem>
                                                </Link>
                                                <Link
                                                    href={`/triage/${val?.id}`}
                                                >
                                                    <DropdownMenuItem className="cursor-pointer">
                                                        <Eye />
                                                        <span>
                                                            Lihat Detail
                                                        </span>
                                                    </DropdownMenuItem>
                                                </Link>
                                                <DropdownMenuItem
                                                    className="cursor-pointer"
                                                    onClick={(event) => {
                                                        event.stopPropagation();
                                                    }}
                                                >
                                                    <Printer />
                                                    <span>Cetak Triase</span>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className="text-red-500 cursor-pointer"
                                                    onClick={(event) => {
                                                        event.stopPropagation();
                                                    }}
                                                >
                                                    <Trash />
                                                    <span>Hapus</span>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>
                                <div className="mt-1">
                                    <h3 className="text-sm font-medium">
                                        {val?.name}
                                    </h3>
                                    {val?.patient?.nik && (
                                        <p className="text-sm text-gray-400 mt-1">
                                            {val?.patient?.nik}
                                        </p>
                                    )}

                                    <div className="flex items-center gap-3 mt-1">
                                        <img
                                            src={"/images/gender.png"}
                                            alt={val.name}
                                            className="w-5 h-5"
                                        />
                                        <p className="text-sm text-gray-600 font-medium">
                                            {val?.patient?.gender === "male"
                                                ? "Laki - Laki"
                                                : "Perempuan"}
                                        </p>
                                    </div>
                                    <div className="p-2 rounded-md bg-slate-100 mt-2">
                                        <p className="text-xs font-normal text-gray-700">
                                            {val?.symptoms || "-"}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
        </div>
    );
};

export default TriageList;
