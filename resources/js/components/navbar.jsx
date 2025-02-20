import React from "react";
import { SidebarTrigger } from "./ui/sidebar";
import { NavUser } from "./nav-user";
import { Stethoscope } from "lucide-react";
import { Link } from "@inertiajs/react";

const Navbar = ({ isUser }) => {
    return (
        <header className="z-10 sticky bg-background/75 supports-[backdrop-filter]:bg-background/60 backdrop-blur top-0 border-b h-16 px-3 flex items-center">
            <div
                className="container flex shrink-0 items-center gap-2 mx-auto"
                {...(!isUser && {
                    className: "flex shrink-0 items-center gap-2 w-full",
                })}
            >
                {!isUser && <SidebarTrigger />}
                {isUser && (
                    <Link href="/">
                        <div className="flex gap-2 items-center">
                            <Stethoscope size="30px" />
                            <p className="font-bold text-lg">Triase GO</p>
                        </div>
                    </Link>
                )}

                <div className="ml-auto">
                    <NavUser
                        isNavbar
                        btnClassName="hover:bg-transparent focus-visible:ring-0"
                    />
                </div>
            </div>
        </header>
    );
};

export default Navbar;
