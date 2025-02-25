import { Link, usePage } from "@inertiajs/react";
import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { ChevronLeft } from "lucide-react";

const Navbar = () => {
    const { url, props } = usePage();
    const { user } = usePage().props.auth;
    const [isScrolled, setIsScrolled] = useState(false);

    const pageTitle = props.title || "";

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`z-50 fixed top-0 bg-white transition-shadow duration-300 max-w-[500px] left-[50%] w-[100%] -translate-x-1/2 ${
                isScrolled
                    ? "shadow-[0_0_10px_rgba(0,0,0,0.1)] bg-white"
                    : "shadow-none"
            }`}
        >
            <div className="container mx-auto flex justify-between items-center px-4 py-3">
                {/* Tombol Back jika tidak di halaman home */}
                {url !== "/" && (
                    <div className="flex items-center gap-2">
                        <Button
                            onClick={() => window.history.back()}
                            variant="outline"
                            size="icon"
                        >
                            <ChevronLeft />
                        </Button>
                        <p className="text-md font-bold">{pageTitle}</p>
                    </div>
                )}

                {url === "/" && (
                    <Link href="/profile">
                        <div className="flex items-center gap-2">
                            <img
                                src="/images/user.png"
                                alt="User Profile"
                                className="w-12 h-12 rounded-full border-2 border-white"
                            />
                            <div>
                                <p className="font-normal text-xs text-gray-400">
                                    Welcome
                                </p>
                                <p className="font-semibold text-sm">
                                    {user?.name}
                                </p>
                            </div>
                        </div>
                    </Link>
                )}
            </div>
        </header>
    );
};

export default Navbar;
