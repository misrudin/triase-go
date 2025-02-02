import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useForm } from "@inertiajs/react";
import Select from "@/components/select";
import Datepicker from "@/components/date-picker";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import BodyPainSelector from "./Partials/BodyPainSelector";
import FormTriase from "./Partials/FormTriase";
import FormPasien from "./Partials/FormPasien";

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
        post("/patients");
    };

    console.log(checklistItems);

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6">
                <FormPasien data={data} setData={setData} />
                <BodyPainSelector />
                <FormTriase checklistItems={checklistItems} />
            </div>
            <div className="mt-4">
                <h2 className="text-lg font-semibold">Hasil Input</h2>
                <pre className="bg-gray-100 p-4 rounded">
                    {JSON.stringify(data, null, 2)}
                </pre>
            </div>
        </form>
    );
};

export default CreateTriage;
