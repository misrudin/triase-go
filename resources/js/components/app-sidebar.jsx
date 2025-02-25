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
            url: "/triage-level",
            icon: ChartNoAxesCombined,
        },
        {
            name: "Category",
            url: "/category",
            icon: Group,
        },
        {
            name: "Chceklist Item",
            url: "/checklist-item",
            icon: ListCheck,
        },
    ],
    triase: [
        {
            name: "Data Pasien",
            url: "/data-pasien",
            icon: Users,
        },
        {
            name: "Treatments",
            url: "/treatments",
            icon: Hospital,
        },
        {
            name: "Triage",
            url: "/triage",
            icon: ClipboardPlus,
        },
    ],
    setting: [
        {
            name: "User",
            url: "/user",
            icon: UserRoundCog,
        },
        {
            name: "Password",
            url: "/password",
            icon: Lock,
        },
        {
            name: "Profile",
            url: "/profile",
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
                                    <Link href="">
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
