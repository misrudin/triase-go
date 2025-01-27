import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useRef } from "react";

export default function SearchInput({
    onSearch,
    value,
    setValue,
    placeholder,
}) {
    const formRef = useRef(null);

    return (
        <form
            onSubmit={onSearch}
            className="flex items-center space-x-2 mb-4 max-w-[500px]"
        >
            <div className="relative w-full">
                <Input
                    type="text"
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="pr-10 h-10"
                    autoFocus
                />
                {value && (
                    <Button
                        type="button"
                        onClick={() => {
                            setValue("");
                            setTimeout(()=> formRef.current.click(), 100)
                        }}
                        variant="link"
                        className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >
                        <X className="w-4 h-4" />
                    </Button>
                )}
            </div>
            <Button
                ref={formRef}
                type="submit"
                className="h-10 hidden"
                variant="outline"
            >
                Cari
            </Button>
        </form>
    );
}
