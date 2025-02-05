import { Button } from "@/components/ui/button";
import { useForm } from "@inertiajs/react";
import { useState } from "react";
import BodyPainSelector from "./Partials/BodyPainSelector";
import FormPasien from "./Partials/FormPasien";
import FormTriase from "./Partials/FormTriase";

const CreateTriage = ({ data: checklistItems }) => {
    const { data, setData, post } = useForm({
        name: "",
        nik: "",
        gender: "",
        birth_date: "",
        address: "",
        phone: "",
        checklist: [],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // post("/patients");
    };

    const steps = [
        { id: 1, title: "Personal Info" },
        { id: 2, title: "Address" },
        { id: 3, title: "Confirmation" },
    ];
    const [step, setStep] = useState(1);

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6">
                <div className="flex justify-center space-x-4 mb-4">
                    {steps.map((s, index) => (
                        <button
                            key={s.id}
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                                step === s.id
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-200 text-gray-600"
                            }`}
                            onClick={() => setStep(s.id)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>

                {step === 1 && <FormPasien data={data} setData={setData} />}
                {step === 2 && <BodyPainSelector />}
                {step === 3 && <FormTriase checklistItems={checklistItems} />}

                <div className="flex justify-end gap-2">
                    {(step === 2 || step === 3) && (
                        <Button onClick={() => setStep((prev) => prev - 1)}>
                            Back
                        </Button>
                    )}

                    <Button
                        onClick={() => {
                            if (step === 1) {
                                setStep(2);
                            } else if (step === 2) {
                                setStep(3);
                            }
                        }}
                    >
                        {step === 3 ? "Submit" : "Next"}
                    </Button>
                </div>

                {/* <FormPasien data={data} setData={setData} />
                <BodyPainSelector />
                <FormTriase checklistItems={checklistItems} /> */}
            </div>
            {/* <div className="mt-4">
                <h2 className="text-lg font-semibold">Hasil Input</h2>
                <pre className="bg-gray-100 p-4 rounded">
                    {JSON.stringify(data, null, 2)}
                </pre>
            </div> */}
        </form>
    );
};

export default CreateTriage;
