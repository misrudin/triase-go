import * as React from "react";
import {
    ChartNoAxesCombined,
    ClipboardPlus,
    Group,
    Home,
    Hospital,
    ListCheck,
    Lock,
    Stethoscope,
    User,
    UserRoundCog,
    Users,
} from "lucide-react";

import { NavMenus } from "@/components/nav-menus";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar";
import { ScrollArea } from "./ui/scroll-area";
import { Link } from "@inertiajs/react";

const data = {
    master: [
        {
            name: "Triage Level",
            url: "/admin/triage-level",
            icon: ChartNoAxesCombined,
        },
        {
            name: "Category",
            url: "/admin/category",
            icon: Group,
        },
        {
            name: "Chceklist Item",
            url: "/admin/checklist-item",
            icon: ListCheck,
        },
    ],
    triase: [
        {
            name: "Data Pasien",
            url: "/admin/data-pasien",
            icon: Users,
        },
        {
            name: "Treatments",
            url: "/admin/treatments",
            icon: Hospital,
        },
        {
            name: "Triage",
            url: "/admin/triage",
            icon: ClipboardPlus,
        },
    ],
    setting: [
        {
            name: "User",
            url: "/admin/user",
            icon: UserRoundCog,
        },
        {
            name: "Password",
            url: "/admin/password",
            icon: Lock,
        },
        {
            name: "Profile",
            url: "/admin/profile",
            icon: User,
        },
    ],
};

export function AppSidebar({ ...props }) {
    return (
        <Sidebar {...props}>
            <SidebarHeader className="h-16 items-center gap-4">
                <Stethoscope size="30px" />
                <p className="font-bold text-lg">Triase GO</p>
            </SidebarHeader>
            <SidebarContent>
                <ScrollArea>
                    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild size="md">
                                    <Link href="/admin">
                                        <Home />
                                        <span>Dashboard</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroup>
                    <NavMenus menus={data.master} title="Master Data" />
                    <NavMenus menus={data.triase} title="Triase" />
                    <NavMenus menus={data.setting} title="General Setting" />
                </ScrollArea>
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
}
