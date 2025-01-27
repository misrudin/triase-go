import React from "react";
import {
    Select as S,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { cn } from "@/lib/utils";

const Select = ({ options, value, onChange, placeholder, className }) => {
    return (
        <S onValueChange={onChange} value={value}>
            <SelectTrigger className={cn(className, "w-full h-12")}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {options?.map((item, index) => (
                        <SelectItem key={index} value={item.value}>
                            {item.label}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </S>
    );
};

export default Select;
