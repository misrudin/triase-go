import { Card } from "@/components/ui/card";

const Staf = ({ data }) => {
    return (
        <Card className={"p-3"}>
            <div className="text-xl font-bold">Staf</div>
            <div className="mt-3">
                <div>Name : {data?.name}</div>
                <div>Email : {data?.email}</div>
                <div>Phone Number : {data?.phone_number ?? "-"}</div>
                <div>Department : {data?.department ?? "-"}</div>
                <div></div>
                <div>
                    <p>Alamat</p>
                    <p className="ml-2">{data?.symptoms ?? "-"}</p>
                </div>
            </div>
        </Card>
    );
};

export default Staf;
