import Seo from "@/components/seo";
import { Toaster } from "@/components/ui/toaster";
import { usePage } from "@inertiajs/react";
import React from "react";

const AuthLayout = ({ children }) => {
    const { props } = usePage();
    const pageTitle = props.title || "";
    return (
        <>
            <Seo title={pageTitle} description={pageTitle} />
            <main className="container mx-auto px-4 bg-white max-w-[500px] shadow-[0_0_5px_rgba(0,0,0,0.1)] min-h-screen">
                {children}
            </main>
            <Toaster />
        </>
    );
};

export default AuthLayout;
