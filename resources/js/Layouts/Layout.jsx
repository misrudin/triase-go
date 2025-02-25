import Navbar from "@/components/navbar";
import Seo from "@/components/seo";
import { Toaster } from "@/components/ui/toaster";
import { usePage } from "@inertiajs/react";
import React from "react";

const Layout = ({ children }) => {
    const { props } = usePage();
    const pageTitle = props.title || "";
    return (
        <>
            <Seo title={pageTitle} description={pageTitle} />
            <Navbar />
            <main className="container mx-auto py-5 px-4 bg-white max-w-[500px] shadow-[0_0_5px_rgba(0,0,0,0.1)] min-h-screen pt-[72px]">
                {children}
            </main>
            <Toaster />
        </>
    );
};

export default Layout;
