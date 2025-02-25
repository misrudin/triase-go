import { AppSidebar } from "@/components/app-sidebar";
import Navbar from "@/components/navbar";
import Seo from "@/components/seo";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import React from "react";

const Layout = ({ children }) => {
    return (
        <>
            <Seo title="Admin" />
            <Navbar />
            <main className="container mx-auto py-5 px-4 md:px-0 bg-slate-50">
                {children}
            </main>
            <Toaster />
        </>
    );
};

export default Layout;
