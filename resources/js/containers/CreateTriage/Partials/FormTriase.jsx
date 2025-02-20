import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import React from "react";

const FormTriase = ({
    checklistItems,
    onBack,
    data,
    setData,
    errors,
    handleSubmit,
}) => {
    const handleCheckboxChange = (itemId) => {
        const newChecklist = data.triageChecklist.some(
            (item) => item.checklist_item_id === itemId
        )
            ? data.triageChecklist.filter(
                  (item) => item.checklist_item_id !== itemId
              )
            : [
                  ...data.triageChecklist,
                  { checklist_item_id: itemId, checked: true },
              ];

        setData("triageChecklist", newChecklist);
    };
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <h2 className="text-lg font-bold">Input Data Triase</h2>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-6">
                        {checklistItems?.map((option, index) => (
                            <div key={`${option?.category}-${index}`}>
                                <h2 className="text-md font-semibold">
                                    {option?.category}
                                </h2>
                                <div className="flex flex-col gap-4 mt-4">
                                    {option?.items?.map((item, idx) => (
                                        <div
                                            className="items-top flex space-x-2"
                                            key={item?.id}
                                        >
                                            <Checkbox
                                                id={item?.id}
                                                checked={data?.triageChecklist?.some(
                                                    (c) =>
                                                        c.checklist_item_id ===
                                                        item.id
                                                )}
                                                onCheckedChange={() =>
                                                    handleCheckboxChange(
                                                        item.id
                                                    )
                                                }
                                            />
                                            <div className="grid gap-1.5 leading-none">
                                                <label
                                                    htmlFor={item?.id}
                                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                                >
                                                    {item?.name}
                                                </label>
                                                {!!item?.description && (
                                                    <p className="text-sm text-muted-foreground">
                                                        {item?.description}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-end gap-2 mt-8">
                        <Button
                            onClick={onBack}
                            className="h-12 px-8"
                            variant="secondary"
                        >
                            Kembali
                        </Button>
                        <Button
                            type="submit"
                            className="h-12 px-8"
                            disabled={data.triageChecklist.length === 0}
                        >
                            Submit
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

export default FormTriase;
