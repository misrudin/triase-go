import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Staf = ({ data }) => {
    return (
        <Card className={"p-3"}>
            <div className="text-xl font-bold">
                Staf
            </div>
            <div className="mt-3">
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
