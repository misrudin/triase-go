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

const Select = ({
    options,
    value,
    onChange,
    placeholder,
    className,
    isLoading = false,
    ...props
}) => {
    return (
        <S onValueChange={onChange} value={value} {...props}>
            <SelectTrigger
                className={cn(className, "w-full h-12")}
                isLoading={isLoading}
            >
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
