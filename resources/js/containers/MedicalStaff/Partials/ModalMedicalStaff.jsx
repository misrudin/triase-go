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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "@inertiajs/react";
import { Pencil, Plus } from "lucide-react";
import { useState } from "react";

export default function ModalMedicalStaff({ isEdit, item }) {
    const { toast } = useToast();
    const [isOpen, setIsOpen] = useState(false);

    const { data, setData, post, processing, errors, put } = useForm({
        name: item?.name || "",
        staff_id: item?.staff_id || "",
        role: item?.role || "",
        department: item?.department || "",
        email: item?.email || "",
        phone_number: item?.phone_number || "",
        address: item?.address || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(`/admin/medical-staff/${item.id}`, {
                onSuccess: () => {
                    setData({
                        level: "",
                        description: "",
                        triage_level_id: "",
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
            post("/admin/medical-staff", {
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
            <DialogContent className="sm:max-w-[625px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>
                            {isEdit ? "Update" : "Tambah"} Medical Staff
                        </DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-4">
                                <div>
                                    <Label
                                        htmlFor="staff_id"
                                        className="text-right"
                                    >
                                        ID
                                    </Label>
                                    <Input
                                        id="staff_id"
                                        className="h-12 mt-1 resize-none"
                                        placeholder="Masukan id staff"
                                        value={data.staff_id}
                                        onChange={(e) =>
                                            setData("staff_id", e.target.value)
                                        }
                                    />
                                    <ErrorMessage message={errors?.staff_id} />
                                </div>
                                <div>
                                    <Label
                                        htmlFor="name"
                                        className="text-right"
                                    >
                                        Nama
                                    </Label>
                                    <Input
                                        id="name"
                                        className="h-12 mt-1 resize-none"
                                        placeholder="Masukan nama staff"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                    />
                                    <ErrorMessage message={errors?.name} />
                                </div>

                                <div>
                                    <Label
                                        htmlFor="role"
                                        className="text-right"
                                    >
                                        Role
                                    </Label>
                                    <Input
                                        id="role"
                                        className="h-12 mt-1 resize-none"
                                        placeholder="Masukan role"
                                        value={data.role}
                                        onChange={(e) =>
                                            setData("role", e.target.value)
                                        }
                                    />
                                    <ErrorMessage message={errors?.role} />
                                </div>
                            </div>
                            <div className="grid gap-4">
                                <div>
                                    <Label
                                        htmlFor="department"
                                        className="text-right"
                                    >
                                        Department
                                    </Label>
                                    <Input
                                        id="department"
                                        className="h-12 mt-1 resize-none"
                                        placeholder="Masukan department"
                                        value={data.department}
                                        onChange={(e) =>
                                            setData(
                                                "department",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <ErrorMessage
                                        message={errors?.department}
                                    />
                                </div>

                                <div>
                                    <Label
                                        htmlFor="email"
                                        className="text-right"
                                    >
                                        Email
                                    </Label>
                                    <Input
                                        id="email"
                                        className="h-12 mt-1 resize-none"
                                        placeholder="Masukan email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                    />
                                    <ErrorMessage message={errors?.email} />
                                </div>

                                <div>
                                    <Label
                                        htmlFor="phone_number"
                                        className="text-right"
                                    >
                                        Nomor HP.
                                    </Label>
                                    <Input
                                        id="phone_number"
                                        className="h-12 mt-1 resize-none"
                                        placeholder="Masukan nomor hp"
                                        value={data.phone_number}
                                        onChange={(e) =>
                                            setData(
                                                "phone_number",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <ErrorMessage
                                        message={errors?.phone_number}
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="address" className="text-right">
                                Alamat
                            </Label>
                            <Textarea
                                id="username"
                                className="h-12 mt-1 resize-none"
                                placeholder="Masukan alamat"
                                value={data.address}
                                onChange={(e) =>
                                    setData("address", e.target.value)
                                }
                            />
                            <ErrorMessage message={errors?.address} />
                        </div>
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
