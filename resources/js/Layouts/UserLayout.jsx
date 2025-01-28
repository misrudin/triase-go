import { AppSidebar } from "@/components/app-sidebar";
import Navbar from "@/components/navbar";
import Seo from "@/components/seo";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import React from "react";

const UserLayout = ({ children, title = "Dashboard", description }) => {
    return (
        <>
            <Seo title={title} description={description || title} />
            <SidebarProvider>
                <SidebarInset>
                    <Navbar isUser />
                    <main className="container mx-auto py-5">{children}</main>
                </SidebarInset>
            </SidebarProvider>
            <Toaster />
        </>
    );
};

export default UserLayout;
