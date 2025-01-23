import { AppSidebar } from "@/components/app-sidebar";
import Navbar from "@/components/navbar";
import Seo from "@/components/seo";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

const Layout = ({ children }) => {
    return (
        <>
           <Seo title='' />
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <Navbar />
                    <main className="p-5">{children}</main>
                </SidebarInset>
            </SidebarProvider>
        </>
    );
};

export default Layout;
