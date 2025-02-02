import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import React from "react";

const FormTriase = ({ checklistItems }) => {

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <h2 className="text-lg font-bold">Input Data Triase</h2>
                </CardTitle>
            </CardHeader>
            <CardContent>
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
                                        key={`${option?.category}-${index}-${idx}`}
                                    >
                                        <Checkbox id={item?.id} />
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
            </CardContent>
        </Card>
    );
};

export default FormTriase;
