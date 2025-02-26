import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function ModalPainLocation({
    item,
    isOpen,
    setIsOpen,
}) {
    const [name, setName] = useState(item?.name || "");
    const [note, setNote] = useState(item?.notes || "");
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Detail</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div>
                        <Label htmlFor="name" className="text-right">
                            Nama
                        </Label>
                        <Input
                            id="name"
                            className="h-12 mt-1 resize-none"
                            placeholder="Contoh: Lengan Kanan"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            readOnly
                        />
                    </div>
                    <div>
                        <Label htmlFor="note" className="text-right">
                            Catatan
                        </Label>
                        <Textarea
                            id="note"
                            className="h-12 mt-1 resize-none"
                            placeholder="Contoh: Nyeri pada lengan kanan..."
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            readOnly
                        />
                    </div>
                </div>
                {/* <DialogFooter className="gap-2">
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
                        className="h-12"
                        disabled={!name || !note}
                        onClick={handleSubmit}
                    >
                        Simpan
                    </Button>
                </DialogFooter> */}
            </DialogContent>
        </Dialog>
    );
}
