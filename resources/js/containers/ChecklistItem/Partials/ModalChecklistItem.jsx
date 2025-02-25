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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { capitalizeFirstLetter } from "@/lib/utils";
import { useForm } from "@inertiajs/react";
import { Pencil, Plus } from "lucide-react";
import { useState } from "react";

export default function ModalChecklistItem({
    isEdit,
    item,
    levels,
    categories,
}) {
    const { toast } = useToast();
    const [isOpen, setIsOpen] = useState(false);

    const { data, setData, post, processing, errors, put } = useForm({
        name: item?.name || "",
        description: item?.description || "",
        triage_level_id: item?.triage_level?.id?.toString() || "",
        category_id: item?.category?.id?.toString() || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(`/checklist-item/${item.id}`, {
                onSuccess: () => {
                    setData({
                        name: "",
                        description: "",
                        triage_level_id: "",
                        category_id: "",
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
            post("/checklist-item", {
                onSuccess: () => {
                    setData({
                        name: "",
                        description: "",
                        triage_level_id: "",
                        category_id: "",
                    });
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

    const options = levels?.map((level) => ({
        label: capitalizeFirstLetter(level.level),
        value: level.id.toString(),
    }));

    const optionsCategory = categories?.map((category) => ({
        label: category.name,
        value: category.id.toString(),
    }));

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
                            {isEdit ? "Update" : "Tambah"} Checklist Item
                        </DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div>
                            <Label
                                htmlFor="triage_level_id"
                                className="text-left"
                            >
                                Level
                            </Label>
                            <Select
                                options={options}
                                className="mt-1"
                                placeholder="Pilih level"
                                value={data.triage_level_id}
                                onChange={(e) => setData("triage_level_id", e)}
                            />
                            <ErrorMessage message={errors?.triage_level_id} />
                        </div>

                        <div>
                            <Label htmlFor="category_id" className="text-left">
                                Category
                            </Label>
                            <Select
                                options={optionsCategory}
                                className="mt-1"
                                placeholder="Pilih category"
                                value={data.category_id}
                                onChange={(e) => setData("category_id", e)}
                            />
                            <ErrorMessage message={errors?.category_id} />
                        </div>

                        <div>
                            <Label htmlFor="name" className="text-right">
                                Gejala
                            </Label>
                            <Input
                                id="name"
                                className="h-12 mt-1 resize-none"
                                placeholder="Masukan gejala"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                            />
                            <ErrorMessage message={errors?.description} />
                        </div>
                        <div>
                            <Label htmlFor="description" className="text-right">
                                Deskripsi
                            </Label>
                            <Textarea
                                id="username"
                                className="h-12 mt-1 resize-none"
                                placeholder="Masukan deskripsi"
                                value={data.description}
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                            />
                            <ErrorMessage message={errors?.description} />
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
