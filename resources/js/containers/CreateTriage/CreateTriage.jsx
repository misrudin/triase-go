import { useForm, router } from "@inertiajs/react";
import { useState } from "react";
import BodyPainSelector from "./Partials/BodyPainSelector";
import FormPasien from "./Partials/FormPasien";
import FormTriase from "./Partials/FormTriase";
import Stepper from "./Partials/Stepper";
import { useToast } from "@/hooks/use-toast";

const CreateTriage = ({ checklist: checklistItems, data: detail, isEdit }) => {
    const [step, setStep] = useState(1);
    const { data, setData, post, errors } = useForm({
        name: detail?.patient?.name || "",
        nik: detail?.patient?.nik || "",
        gender: detail?.patient?.gender || "",
        birth_date: detail?.patient?.birth_date || "",
        address: detail?.patient?.address || "",
        phone: detail?.patient?.phone || "",
        allergy: detail?.allergy || "",
        symptoms: detail?.symptoms || "",
        bodyPaint: detail?.pain_locations || [],
        triageChecklist: detail?.triage_checklists || [],
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
        <div className="grid grid-cols-1 gap-6 py-4">
            <Stepper step={step} setStep={setStep} isEdit={isEdit} />

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
