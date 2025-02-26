import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Patient = ({ data }) => {
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
        <Card className="p-3 relative ">
            <div className="absolute text-xl px-2 rounded-full bg-white top-[-15px] left-1/2 -translate-x-1/2 font-bold">
                Taufik Hidayat
            </div>
            <div className="flex justify-between items-center mt-5">
                <div>
                    <div className="font-semibold">NO : {data?.triage_no}</div>
                    <div className="font-semibold">
                        NIK : {data?.patient?.nik ?? "330113112312312"}{" "}
                    </div>
                </div>
                <Badge
                    className={`pointer-events-none capitalize text-[14px] font-normal px-1 py-[1px] ${getColorBadge(
                        data
                    )}`}
                >
                    {data?.level}
                </Badge>
            </div>

            <Separator className="my-4" />

            <div className="grid grid-cols-3">
                <div className="flex items-center gap-3">
                    <img
                        src={"/images/gender.png"}
                        alt={data.name}
                        className="w-5 h-5"
                    />
                    <p className="text-sm text-gray-600 font-medium">
                        {data?.patient?.gender === "male"
                            ? "Laki - Laki"
                            : "Perempuan"}
                    </p>
                </div>
                <div className="flex items-center gap-3 ">
                    <img
                        src={"/images/date.png"}
                        alt={data.name}
                        className="w-5 h-5"
                    />
                    <p className="text-sm text-gray-600 font-medium">
                        {data?.date_of_birth ?? "22 Juni 2001"}
                    </p>
                </div>
                <div className="flex items-center gap-3 ">
                    <img
                        src={"/images/phone.png"}
                        alt={data.name}
                        className="w-5 h-5"
                    />
                    <p className="text-sm text-gray-600 font-medium">
                        {data?.phone_number ?? "0838719123112"}
                    </p>
                </div>
            </div>

            <div className="mt-5 border rounded-md relative p-3">
                <p className="text-[#ababab] absolute top-[-13px] bg-white px-2">
                    Alamat
                </p>
                <p className="text-[#ababab]">{data?.patient?.address}</p>
            </div>
        </Card>
    );
};

export default Patient;
