import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { router, useForm } from "@inertiajs/react";
import ErrorMessage from "./ui/error-message";
import { useToast } from "@/hooks/use-toast";

export function LoginForm({ className, ...props }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
    });
    const { toast } = useToast();

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("login"), {
            onSuccess: (res) => {
                router.replace("/", {
                    preserveState: false,
                });
            },
            onError: (errors) => {
                const message = Object.keys(errors).map((key) => {
                    return errors[key];
                });
                toast({
                    variant: "destructive",
                    description: message?.join(", "),
                });
            },
        });
    };
    return (
        <div className={cn("w-full flex flex-col gap-6", className)} {...props}>
            <div className="flex justify-center px-10">
                <img alt="Login" src="/images/login_il.svg" />
            </div>
            <div>
                <h1 className="text-2xl font-bold">Selamat Datang!</h1>
                <p className="font-normal text-sm text-gray-500">
                    Silahkan login untuk masuk ke aplikasi
                </p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="m@example.com"
                            className="h-12 shadow-none"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                        />
                        <ErrorMessage message={errors?.email} />
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">Password</Label>
                        </div>
                        <Input
                            id="password"
                            type="password"
                            name="password"
                            autoComplete="on"
                            className="h-12"
                            placeholder="Masukan password"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                        />
                        <ErrorMessage message={errors?.password} />
                    </div>
                    <Button
                        type="submit"
                        className="w-full h-12"
                        disabled={processing}
                    >
                        Masuk
                    </Button>
                </div>
            </form>
        </div>
    );
}
