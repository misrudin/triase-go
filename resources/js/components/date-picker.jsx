import React, { useState } from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const Datepicker = ({ selectedDate, onChange }) => {
    const [open, setOpen] = useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "pl-3 text-left font-normal h-12 w-full",
                        !selectedDate && "text-muted-foreground"
                    )}
                >
                    {selectedDate ? (
                        format(selectedDate, "PPP")
                    ) : (
                        <span>Pilih Tanggal</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={selectedDate ? new Date(selectedDate) : null}
                    onSelect={(date) => {
                        onChange(date);
                        setOpen(false);
                    }}
                    captionLayout="dropdown-buttons"
                    fromYear={1900}
                    toYear={new Date().getFullYear()}
                />
            </PopoverContent>
        </Popover>
    );
};

export default Datepicker;
