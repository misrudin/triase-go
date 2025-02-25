import { usePage } from "@inertiajs/react";
import React, { useState, useEffect } from "react";

const Navbar = () => {
    const { user } = usePage().props.auth;
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`z-50 sticky top-0 bg-slate-50 transition-shadow duration-300 ${
                isScrolled
                    ? "shadow-[0_0_10px_rgba(0,0,0,0.1)] bg-white"
                    : "shadow-none"
            }`}
        >
            <div className="container mx-auto flex justify-between items-center px-4 py-3">
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
                        <p className="font-semibold text-sm">{user?.name}</p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
