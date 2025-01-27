import Select from "@/components/select";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import ErrorMessage from "@/components/ui/error-message";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "@inertiajs/react";
import { Pencil, Plus } from "lucide-react";
import { useState } from "react";

export default function ModalUsers({ isEdit, item }) {
    const { toast } = useToast();
    const [isOpen, setIsOpen] = useState(false);

    const { data, setData, post, processing, errors, put } = useForm({
        name: item?.name || "",
        email: item?.email || "",
        role: item?.role || "",
        password: "",
        password_confirmation: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(`/admin/user/${item.id}`, {
                onSuccess: () => {
                    setData({
                        name: "",
                        email: "",
                        role: "",
                        password: "",
                        password_confirmation: "",
                    });
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
        } else {
            post("/admin/user", {
                onSuccess: () => {
                    setData({ level: "", description: "" });
                    toast({
                        description: "Data berhasil disimpan",
                    });
                    setIsOpen(false);
                },
                onError: (errors) => {
                    console.error(errors);
                    toast({
                        variant: "destructive",
                        description: "Gagal menyimpan data",
                    });
                },
            });
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            {!isEdit && (
                <DialogTrigger asChild>
                    <Button onClick={() => setIsOpen(true)}>
                        <Plus /> Tambah
                    </Button>
                </DialogTrigger>
            )}
            {isEdit && (
                <DialogTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setIsOpen(true)}
                        className="p-2 text-blue-500 hover:text-blue-700"
                    >
                        <Pencil className="w-4 h-4" />
                    </Button>
                </DialogTrigger>
            )}
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>
                            {isEdit ? "Update" : "Tambah"} Level Triase
                        </DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div>
                            <Label htmlFor="role" className="text-left">
                                Role
                            </Label>
                            <Select
                                options={[
                                    { label: "Admin", value: "admin" },
                                    { label: "User", value: "user" },
                                ]}
                                className="mt-1"
                                placeholder="Pilih role"
                                value={data.role}
                                onChange={(e) => setData("role", e)}
                            />
                            <ErrorMessage message={errors?.role} />
                        </div>

                        <div>
                            <Label htmlFor="name" className="text-right">
                                Nama
                            </Label>
                            <Input
                                id="name"
                                className="h-12 mt-1"
                                placeholder="Masukan nama"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                            />
                            <ErrorMessage message={errors?.name} />
                        </div>

                        <div>
                            <Label htmlFor="email" className="text-right">
                                Email
                            </Label>
                            <Input
                                id="email"
                                className="h-12 mt-1"
                                placeholder="Masukan email"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />
                            <ErrorMessage message={errors?.email} />
                        </div>

                        {!isEdit && (
                            <div>
                                <Label
                                    htmlFor="password"
                                    className="text-right"
                                >
                                    Password
                                </Label>
                                <Input
                                    id="password"
                                    className="h-12 mt-1"
                                    placeholder="Masukan password"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    type="password"
                                />
                                <ErrorMessage message={errors?.password} />
                            </div>
                        )}

                        {!isEdit && (
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
                                        setData(
                                            "password_confirmation",
                                            e.target.value
                                        )
                                    }
                                    type="password"
                                />
                                <ErrorMessage message={errors?.password} />
                            </div>
                        )}
                    </div>
                    <DialogFooter className="gap-2">
                        <DialogClose asChild>
                            <Button
                                type="button"
                                variant="secondary"
                                className="h-12"
                            >
                                Batal
                            </Button>
                        </DialogClose>
                        <Button
                            type="submit"
                            className="h-12"
                            disabled={processing}
                        >
                            Simpan
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
