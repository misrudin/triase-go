import { useForm, router } from "@inertiajs/react";
import { useState } from "react";
import BodyPainSelector from "./Partials/BodyPainSelector";
import FormPasien from "./Partials/FormPasien";
import FormTriase from "./Partials/FormTriase";
import Stepper from "./Partials/Stepper";
import { useToast } from "@/hooks/use-toast";

const CreateTriage = ({ data: checklistItems }) => {
    const [step, setStep] = useState(1);
    const { data, setData, post, errors } = useForm({
        name: "",
        nik: "",
        gender: "",
        birth_date: "",
        address: "",
        phone: "",
        allergy: "",
        symptoms: "",
        bodyPaint: [],
        triageChecklist: [],
    });
    const { toast } = useToast();

    // { id: "", x: "", y: "", name: "", notes: "" }
    // { checklist_item_id: "", checked: false }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);

        post("/triage", {
            onSuccess: () => {
                toast({
                    description: "Data berhasil disimpan",
                });
                router.get("/");
            },
            onError: (errors) => {
                console.error(errors);
                toast({
                    variant: "destructive",
                    description: "Gagal menyimpan data",
                });
            },
        });
    };

    return (
        <div className="grid grid-cols-1 gap-6">
            <Stepper step={step} setStep={setStep} />

            {step === 1 && (
                <FormPasien
                    data={data}
                    errors={errors}
                    setData={setData}
                    onNext={() => setStep(2)}
                />
            )}
            {step === 2 && (
                <BodyPainSelector
                    data={data}
                    errors={errors}
                    setData={setData}
                    onNext={() => setStep(3)}
                    onBack={() => setStep(1)}
                />
            )}
            {step === 3 && (
                <FormTriase
                    data={data}
                    errors={errors}
                    setData={setData}
                    checklistItems={checklistItems}
                    onBack={() => setStep(2)}
                    handleSubmit={handleSubmit}
                />
            )}
        </div>
    );
};

export default CreateTriage;
