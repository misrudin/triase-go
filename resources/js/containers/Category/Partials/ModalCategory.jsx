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

export default function ModalCategory({ isEdit, item }) {
    const { toast } = useToast();
    const [isOpen, setIsOpen] = useState(false);

    const { data, setData, post, processing, errors, put } = useForm({
        name: item?.name || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(`/admin/category/${item.id}`, {
                onSuccess: () => {
                    setData({
                        name: "",
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
            post("/admin/category", {
                onSuccess: () => {
                    setData({ name: "" });
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
                            {isEdit ? "Update" : "Tambah"} Category
                        </DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div>
                            <Label htmlFor="name" className="text-right">
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
