import React from "react";
import { SidebarTrigger } from "./ui/sidebar";
import { NavUser } from "./nav-user";

const user = {
    id: 1,
    name: "Misrudin",
    avatar: "/avatar.jpg",
    email: "misrudinz@gmail.com",
};

const Navbar = () => {
    return (
        <header className="z-10 sticky bg-background/75 supports-[backdrop-filter]:bg-background/60 backdrop-blur top-0 flex shrink-0 items-center gap-2 border-b h-16 px-3">
            <SidebarTrigger />

            <div className="ml-auto">
                <NavUser
                    user={user}
                    isNavbar
                    btnClassName="hover:bg-transparent focus-visible:ring-0"
                />
            </div>
        </header>
    );
};

export default Navbar;
