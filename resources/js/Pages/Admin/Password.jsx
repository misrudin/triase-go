import Seo from "@/components/seo";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import ErrorMessage from "@/components/ui/error-message";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useForm, usePage } from "@inertiajs/react";
import { CircleCheck } from "lucide-react";
import React, { useEffect, useState } from "react";

const UsersPage = ({ ...props }) => {
    const { data, setData, processing, errors, put } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });
    const toast = useToast();
    const [isShowAlert, setIsShowAlert] = useState(false);
    const [msg, setMsg] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/password`, {
            onSuccess: () => {
                setData({
                    current_password: "",
                    password: "",
                    password_confirmation: "",
                });
                setMsg("Data berhasil diupate");
                toast({
                    description: "Data berhasil diupate",
                });
                setIsOpen(false);
            },
            onError: (errors) => {
                console.error(errors);
                toast({
                    variant: "destructive",
                    description: "Gagal mengupdate data",
                });
            },
        });
    };

    useEffect(() => {
        if (!!msg) {
            setIsShowAlert(true);
            setTimeout(() => {
                setIsShowAlert(false);
                setMsg("");
            }, 5000);
        }
    }, [msg]);

    return (
        <>
            <Seo title="Reset Password" />
            <form onSubmit={handleSubmit} className="w-full flex justify-center items-center min-h-[70vh]">
                <div className="grid gap-4 py-4 shadow-lg p-4 rounded-lg min-w-[400px]">
                {isShowAlert && (
                    <Alert>
                        <CircleCheck className="h-4 w-4" />
                        <AlertTitle>Berhasil!</AlertTitle>
                        <AlertDescription>
                            Password kamu berhasil diupdate.
                        </AlertDescription>
                    </Alert>
                )}

                    <div>
                        <Label
                            htmlFor="current_password"
                            className="text-right"
                        >
                            Password
                        </Label>
                        <Input
                            id="current_password"
                            className="h-12 mt-1"
                            placeholder="Masukan password lama"
                            value={data.current_password}
                            onChange={(e) =>
                                setData("current_password", e.target.value)
                            }
                            type="password"
                        />
                        <ErrorMessage message={errors?.current_password} />
                    </div>

                    <div>
                        <Label htmlFor="password" className="text-right">
                            Password Baru
                        </Label>
                        <Input
                            id="password"
                            className="h-12 mt-1"
                            placeholder="Masukan password baru"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            type="password"
                        />
                        <ErrorMessage message={errors?.password} />
                    </div>

                    <div>
                        <Label
                            htmlFor="password_confirmation"
                            className="text-right"
                        >
                            Konfirmasi Password
                        </Label>
                        <Input
                            id="password_confirmation"
                            className="h-12 mt-1"
                            placeholder="Masukan konfirmasi password"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                            type="password"
                        />
                        <ErrorMessage message={errors?.password} />
                    </div>

                    <div className="mt-4">
                    <Button
                        type="submit"
                        className="h-12 w-full"
                        disabled={processing}
                    >
                        Simpan
                    </Button>
                </div>
                </div>

            </form>
        </>
    );
};

export default UsersPage;
