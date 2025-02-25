import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "@inertiajs/react";
import { Trash } from "lucide-react";

export function DeleteData({ item }) {
    const { delete: destroy, processing } = useForm();
    const { toast } = useToast();

    const handleDelete = () => {
        destroy(`/category/${item.id}`, {
            onSuccess: () => {
                toast({
                    description: "Data berhasil dihapus",
                });
            },
            onError: (errors) => {
                console.error("Gagal menghapus data", errors);
                toast({
                    variant: "destructive",
                    description: "Gagal menghapus data",
                });
            },
        });
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="p-2 text-red-500 hover:text-red-700"
                >
                    <Trash className="w-4 h-4" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-[400px]">
                <AlertDialogHeader>
                    <AlertDialogTitle>Konfirmasi</AlertDialogTitle>
                    <AlertDialogDescription>
                        Apakah anda yakin akan menghapus data?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="mt-4">
                    <AlertDialogCancel>Batal</AlertDialogCancel>
                    <Button
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={processing}
                    >
                        Hapus
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
