"use client";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Building2, Folder, List, Settings } from "lucide-react";
import Link from "next/link";

const sidebarItems = [
    {
        title: "Organizaciones",
        icon: <Building2 />,
        href: "/organization",
    },
    {
        title: "Tareas",
        icon: <List />,
        href: "/tareas",
    },
    {
        title: "Configuración",
        icon: <Settings />,
        href: "/configuracion",
    },
];

export default function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader>
                {/* <Image
                    src="/logo.png"
                    alt="Sinergia"
                    width={100}
                    height={100}
                /> */}
                <h1 className="text-2xl font-bold">Sinergia</h1>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href="/proyectos/new">
                                        <Folder />
                                        <span>Proyectos</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            {sidebarItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.href}>
                                            {item.icon}
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    );
}
