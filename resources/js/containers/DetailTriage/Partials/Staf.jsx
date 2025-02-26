import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Staf = ({ data }) => {
    return (
        <Card className={"p-3 relative"}>
            <div className="absolute text-xl px-2 rounded-full bg-white top-[-15px] left-1/2 -translate-x-1/2 font-bold">
                Staf
            </div>
            <div>
                <div>Name : {data?.name}</div>
                <div>Email : {data?.email}</div>
                <div>Phone Number : {data?.phone_number ?? "-"}</div>
                <div>Department : {data?.department ?? "-"}</div>
                <div>Alamat : {data?.address ?? "-"}</div>
            </div>
        </Card>
    );
};

export default Staf;
