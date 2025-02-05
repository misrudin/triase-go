import { useState, useRef } from "react";
import { humanInner, humanOrgan } from "@/lib/human-anatomy";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

const BodyPartsSelector = () => {
    const [pins, setPins] = useState([]);
    const [selectedPin, setSelectedPin] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
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
        setShowConfirm(true);
    };

    const handleConfirm = () => {
        setPins([...pins, selectedPin]);
        setShowConfirm(false);
        setShowForm(true);
    };

    const handleSubmit = () => {
        setShowForm(false);
        setShowSuccess(true);
    };

    const handleCancel = () => {
        setShowForm(false);
        setShowConfirm(true);
    };

    const handleSuccessClose = () => {
        setShowSuccess(false);
    };

    const handleCancelPin = () => {
        setPins(pins.filter((pin) => pin.id !== selectedPin.id));
        setShowConfirm(false);
    };

    return (
        <Card>
            <CardContent>
                <div className="my-5">
                    <h2 className="text-lg font-bold">Keluhan</h2>
                    <Textarea
                        className="mt-3"
                        rows={5}
                        placeholder="Keluhan yang dirasakan pasien"
                    />
                </div>

                <h2 className="text-lg font-bold mb-3">
                    Bagian tubuh yang terasa sakit
                </h2>

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
                        {pins.map((pin, index) => (
                            <g
                                key={pin.id}
                                className="cursor-pointer"
                                onClick={() =>
                                    alert(`x: ${pin.x}, y: ${pin.y}`)
                                }
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

                    {showConfirm && (
                        <div className="absolute left-1/2 top-10 -translate-x-1/2 bg-white p-4 rounded shadow-lg">
                            <p>Konfirmasi posisi pin?</p>
                            <button
                                className="bg-green-500 text-white px-3 py-1 rounded"
                                onClick={handleConfirm}
                            >
                                Ya
                            </button>
                            <button
                                className="bg-red-500 text-white px-3 py-1 rounded ml-2"
                                onClick={handleCancelPin}
                            >
                                Batal
                            </button>
                        </div>
                    )}

                    {showForm && (
                        <div className="absolute left-1/2 top-10 -translate-x-1/2 bg-white p-4 rounded shadow-lg">
                            <textarea
                                className="w-full border p-2 rounded"
                                placeholder="Masukkan catatan"
                            ></textarea>
                            <input
                                type="text"
                                className="w-full border p-2 rounded mt-2"
                                placeholder="Nama"
                            />
                            <div className="mt-2">
                                <button
                                    className="bg-blue-500 text-white px-3 py-1 rounded"
                                    onClick={handleSubmit}
                                >
                                    Submit
                                </button>
                                <button
                                    className="bg-gray-500 text-white px-3 py-1 rounded ml-2"
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}

                    {showSuccess && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black/40 text-white">
                            <div className="bg-white p-6 rounded-lg">
                                <p className="text-black">
                                    Konfirmasi berhasil!
                                </p>
                                <button
                                    className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
                                    onClick={handleSuccessClose}
                                >
                                    OK
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default BodyPartsSelector;
