import Datepicker from "@/components/date-picker";
import Select from "@/components/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
        <Card className="">
            <CardHeader>
                <CardTitle>
                    <h2 className="text-xl font-bold text-center">
                        Biodata Pasien
                    </h2>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-4">
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
                            <Label htmlFor="phone">No HP</Label>
                            <Input
                                id="phone"
                                name="phone"
                                type="tel"
                                value={data.phone}
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
                            <Label htmlFor="birth_date">Tanggal Lahir</Label>
                            <Datepicker
                                selectedDate={data.birth_date}
                                onChange={(date) => setData("birth_date", date)}
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
            </CardContent>
        </Card>
    );
};

export default FormPasien;
