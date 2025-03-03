import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

const TriaseCheck = ({ data }) => {
    return (
        <Card className={"p-3"}>
            <div className="text-xl font-bold">
                Triase List
            </div>

            <div className="grid grid-cols-2 gap-5 mt-5">
                {data?.map((item, idx) => (
                    <div className="items-top flex space-x-2" key={item?.id}>
                        <Checkbox
                            id={item?.id}
                            checked={data?.some(
                                (c) => c.id === item.id
                            )}

                            // onCheckedChange={() => handleCheckboxChange(item.id)}
                        />
                        <div className="grid gap-1.5 leading-none">
                            <label
                                htmlFor={item?.id}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                            >
                                {item?.checklist_item?.name}
                            </label>
                            {!!item?.checklist_item?.description && (
                                <p className="text-sm text-muted-foreground">
                                    {item?.checklist_item?.description}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
};

export default TriaseCheck;
