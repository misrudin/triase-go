import React from "react";

const Stepper = ({ step, setStep, isEdit }) => {
    const steps = [
        { id: 1, label: "Biodata" },
        { id: 2, label: "Keluhan" },
        { id: 3, label: "Triase" },
    ];

    return (
        <div className="flex items-center justify-center gap-4">
            {steps.map((s, index) => (
                <div key={s.id} className="relative flex gap-3">
                    {/* Step Circle */}
                    <div className="flex flex-col items-center">
                        <button
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 z-10 ${
                                step === s.id
                                    ? "bg-blue-600 text-white"
                                    : step > s.id
                                    ? "bg-blue-400 text-white"
                                    : "bg-gray-200 text-gray-600"
                            }`}
                            {...((step > s.id || isEdit) && {
                                onClick: () => setStep(s.id),
                            })}
                        >
                            {s.id}
                        </button>

                        <span
                            className={`mt-1 text-xs font-medium ${
                                step === s.id
                                    ? "text-blue-600"
                                    : step > s.id
                                    ? "text-gray-500"
                                    : "text-gray-400"
                            }`}
                        >
                            {s.label}
                        </span>
                    </div>

                    {/* Step Connector */}
                    {index !== steps.length - 1 && (
                        <div
                            className={`w-[80px] h-1 mt-[15px] rounded-md ${
                                step === s.id
                                    ? "bg-blue-600 text-white"
                                    : step > s.id
                                    ? "bg-blue-400 text-white"
                                    : "bg-gray-200 text-gray-600"
                            }`}
                        ></div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Stepper;
