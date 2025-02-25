import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, Eye, Printer, Repeat2 } from "lucide-react";

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
            return "bg-green-100 hover:bg-green-200";
        } else if (val?.level === "black") {
            return "bg-gray-400 hover:bg-gray-500";
        } else if (val?.level === "yellow") {
            return "bg-yellow-100 hover:bg-yellow-200";
        } else if (val?.level === "red") {
            return "bg-red-100 hover:bg-red-200";
        } else if (val?.level === "orange") {
            return "bg-orange-100 hover:bg-orange-200";
        }
        return "";
    };

    return (
        <div>
            {/* <DataTable
                columns={columns}
                data={data}
                // rowClassname={(row) => getRowClassName(row)}
            /> */}

            {data &&
                data?.map((val, idx) => (
                    <Card key={idx} className={`mt-5 ${getColorLevel(val)}`}>
                        <CardContent className="pb-0 p-5">
                            <div className="flex justify-between items-center">
                                <div>
                                    <div className="flex items-center gap-3">
                                        <p>{val?.triage_no}</p>

                                        <p className=" bg-white px-5 rounded-full">
                                            NIK:{val?.patient?.nik ?? "-"}
                                        </p>
                                    </div>
                                    <h3 className="text-[24px] font-semibold mt-3">
                                        {val?.name}
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-10 mt-5">
                                        <div className="flex items-center gap-3 ">
                                            <img
                                                src={"/images/gender.png"}
                                                alt={val.name}
                                                className="w-6 h-6"
                                            />
                                            <p>
                                                {val?.patient?.gender
                                                    ?.charAt(0)
                                                    .toUpperCase() +
                                                    val?.patient?.gender?.slice(
                                                        1
                                                    )}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <img
                                                src={"/images/date.png"}
                                                alt={val.name}
                                                className="w-6 h-6"
                                            />
                                            <p>
                                                {val?.patient?.date_of_birth ??
                                                    "-"}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <img
                                                src={"/images/phone.png"}
                                                alt={val.name}
                                                className="w-6 h-6"
                                            />
                                            <p>
                                                {val?.patient?.phone_number ??
                                                    "-"}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-5">
                                        <p>Address</p>
                                        <p className="text-lg">
                                            {val?.patient?.address}
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                className={`focus-visible:ring-0 ${
                                                    val?.level === "black"
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
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
        </div>
    );
};

export default TriageList;
