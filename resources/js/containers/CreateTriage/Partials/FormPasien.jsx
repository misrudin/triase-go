import Datepicker from "@/components/date-picker";
import Select from "@/components/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import React from "react";

const FormPasien = ({ data, setData, onNext, errors }) => {
    const optionsGender = [
        { label: "Laki - Laki", value: "male" },
        { label: "Perempuan", value: "female" },
    ];

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const isNextDisabled = !data.name || !data.gender;
    return (
        <div>
            <div className="grid grid-cols-1 gap-4">
                <h2 className="text-xl font-bold text-center">
                    Biodata Pasien
                </h2>
                <div className="flex flex-col gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Nama Pasien</Label>
                        <Input
                            id="name"
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                            placeholder="Masukkan nama"
                            className="h-12"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="gender">Jenis Kelamin</Label>
                        <Select
                            options={optionsGender}
                            placeholder="Pilih jenis kelamin"
                            value={data.gender}
                            onChange={(e) => setData("gender", e)}
                        />
                        {errors.gender && (
                            <p className="text-red-500 text-sm">
                                {errors.gender}
                            </p>
                        )}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="phone_number">No HP</Label>
                        <Input
                            id="phone_number"
                            name="phone_number"
                            type="tel"
                            value={data.phone_number}
                            onChange={handleChange}
                            placeholder="Masukkan no HP"
                            className="h-12"
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="nik">NIK</Label>
                        <Input
                            id="nik"
                            name="nik"
                            value={data.nik}
                            onChange={handleChange}
                            placeholder="Masukkan NIK"
                            className="h-12"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="date_of_birth">Tanggal Lahir</Label>
                        <Datepicker
                            selectedDate={data.date_of_birth}
                            onChange={(date) => {
                                setData(
                                    "date_of_birth",
                                    format(date, "Y-MM-dd")
                                );
                            }}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="address">Alamat</Label>
                        <Textarea
                            id="address"
                            name="address"
                            value={data.address}
                            onChange={handleChange}
                            placeholder="Masukkan alamat"
                            className="h-12 resize-none"
                        />
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-2 mt-8">
                <Button
                    onClick={onNext}
                    disabled={isNextDisabled}
                    className="h-12 px-8"
                >
                    Selanjutnya
                </Button>
            </div>
        </div>
    );
};

export default FormPasien;
