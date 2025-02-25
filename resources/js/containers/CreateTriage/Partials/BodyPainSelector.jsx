import { useState, useRef } from "react";
import { humanInner, humanOrgan } from "@/lib/human-anatomy";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import ModalPainLocation from "./ModalPainLocation";
import { DataTable } from "@/components/data-table";

const BodyPartsSelector = ({ onNext, onBack, data, setData }) => {
    const [selectedPin, setSelectedPin] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const svgRef = useRef(null);

    const handleClick = (e) => {
        if (!svgRef.current) return;

        const svg = svgRef.current;
        const pt = svg.createSVGPoint();
        pt.x = e.clientX;
        pt.y = e.clientY;
        const transformedPt = pt.matrixTransform(svg.getScreenCTM().inverse());

        const newPin = {
            id: `pin-${Math.round(transformedPt.x)}-${Math.round(
                transformedPt.y
            )}`,
            x: Math.round(transformedPt.x),
            y: Math.round(transformedPt.y),
        };

        setSelectedPin(newPin);
        setShowForm(true);
    };

    const handleSubmit = (values) => {
        setShowForm(false);
        setData("bodyPaint", [
            ...data?.bodyPaint,
            { ...selectedPin, ...values },
        ]);
    };

    const handleSubmitUpdate = (values) => {
        setShowForm(false);
        const newBP = data?.bodyPaint?.map((e) => {
            if (e.id === selectedPin.id) {
                return { ...selectedPin, ...values };
            }
            return e;
        });
        setData("bodyPaint", newBP);
    };

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <h2 className="text-xl font-bold text-center">
                        Keluhan Pasien
                    </h2>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 gap-4 mb-6">
                    <div className="flex flex-col gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="symptoms">Keluhan</Label>
                            <Textarea
                                id="symptoms"
                                name="symptoms"
                                value={data.symptoms}
                                onChange={handleChange}
                                placeholder="Keluhan yang dirasakan pasien"
                                className="h-12 resize-none"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="allergy">Alergi</Label>
                            <Textarea
                                id="allergy"
                                name="allergy"
                                value={data.allergy}
                                onChange={handleChange}
                                placeholder="Apakah pasiean memiliki alergi ?"
                                className="h-12 resize-none"
                            />
                        </div>
                    </div>
                </div>

                <h2 className="text-lg font-bold mb-3">
                    Bagian tubuh yang terasa sakit
                </h2>

                <div className="grid grid-cols-1 gap-4">
                    <div className="relative h-[80vh] w-full overflow-hidden bg-gray-900 text-gray-700 rounded-md">
                        <svg
                            ref={svgRef}
                            id="humanAnatomy"
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-[80vh] mx-auto"
                            viewBox="0 0 420 780"
                            onClick={handleClick}
                        >
                            <g id="humanInner">
                                <path fill="#FFDEC7" d={humanInner} />
                                <image
                                    width="130"
                                    height="416"
                                    href={humanOrgan}
                                    transform="matrix(1 0 0 1 150.0002 12.8901)"
                                />
                            </g>
                            {data?.bodyPaint?.map((pin, index) => (
                                <g
                                    key={pin.id}
                                    className="cursor-pointer"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowForm(true);
                                        setSelectedPin(pin);
                                    }}
                                >
                                    <circle
                                        cx={pin.x}
                                        cy={pin.y}
                                        r="11"
                                        fill="transparent"
                                        stroke="white"
                                        strokeWidth="1"
                                        className="transition-all duration-200 hover:animate-blink"
                                    />
                                    <circle
                                        cx={pin.x}
                                        cy={pin.y}
                                        r="10"
                                        fill="red"
                                        className="transition-all duration-200 hover:fill-blue"
                                    />
                                    <text
                                        x={pin.x}
                                        y={pin.y}
                                        dy="3.5"
                                        textAnchor="middle"
                                        fill="white"
                                        fontSize="10px"
                                        fontWeight="bold"
                                    >
                                        {index + 1}
                                    </text>
                                </g>
                            ))}
                        </svg>

                        {showForm && (
                            <ModalPainLocation
                                isOpen={showForm}
                                setIsOpen={setShowForm}
                                handleAdd={handleSubmit}
                                item={selectedPin}
                                handleUpdate={handleSubmitUpdate}
                            />
                        )}
                    </div>

                    <div className="border-b-1">
                        {data?.bodyPaint?.length > 0 && (
                            <DataTable
                                isNoPagination={true}
                                columns={[
                                    {
                                        accessorKey: "No",
                                        header: "No",
                                        cell: ({ row }) => row.index + 1,
                                    },
                                    {
                                        accessorKey: "name",
                                        header: "Name",
                                    },
                                    {
                                        accessorKey: "notes",
                                        header: "Notes",
                                    },
                                ]}
                                data={data?.bodyPaint}
                            />
                        )}
                    </div>
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
                        onClick={onNext}
                        className="h-12 px-8"
                        disabled={data.bodyPaint.length === 0}
                    >
                        Selanjutnya
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default BodyPartsSelector;
