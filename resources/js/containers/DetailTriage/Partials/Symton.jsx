import { DataTable } from "@/components/data-table";
import { Card } from "@/components/ui/card";
import { humanInner, humanOrgan } from "@/lib/human-anatomy";
import React, { useRef } from "react";

const Symton = ({ data }) => {
    const svgRef = useRef(null);
    return (
        <Card className="p-3">
            <p>
                <b>Keluhan</b> : {data?.symptoms ?? "-"}
            </p>
            <p className="mt-2">
                <b>Alergi</b> : {data?.allergy ?? "-"}
            </p>

            <div className="grid grid-cols-1 gap-4 mt-5">
                <div className="relative h-[80vh] w-full overflow-hidden bg-gray-900 text-gray-700 rounded-md">
                    <svg
                        ref={svgRef}
                        id="humanAnatomy"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-[80vh] mx-auto"
                        viewBox="0 0 420 780"
                        // onClick={handleClick}
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
                        {data?.pain_locations?.map((pin, index) => (
                            <g
                                key={pin.id}
                                className="cursor-pointer"
                                // onClick={(e) => {
                                //     e.stopPropagation();
                                //     setShowForm(true);
                                //     setSelectedPin(pin);
                                // }}
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
                </div>

                <div className="border-b-1">
                    {data?.pain_locations?.length > 0 && (
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
                            data={data?.pain_locations}
                        />
                    )}
                </div>
            </div>
        </Card>
    );
};

export default Symton;
