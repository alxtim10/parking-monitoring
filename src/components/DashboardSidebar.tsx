"use client";
import { Building, ChartBar, HomeIcon, Square, User2 } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";

// Menu items.
const items = [
  {
    title: "Place",
    url: "place",
    icon: Building,
  },
  {
    title: "Floor",
    url: "/floor",
    icon: ChartBar,
  },
  {
    title: "Spot",
    url: "/spot",
    icon: Square,
  },
];

export function DashboardSidebar() {
  const router = useRouter();

  return (
    <Sidebar>
      <SidebarHeader>
        <h1 className="text-3xl font-bold px-3 pt-3">BOKIR</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <button
                    onClick={() => {
                      router.push("/dashboard");
                    }}
                  >
                    <HomeIcon />
                    <span>Home</span>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <button
                      onClick={() => {
                        router.push(`/dashboard/${item.url}`);
                      }}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>System</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <button
                  onClick={() => {
                      router.push("/dashboard/user");
                    }}>
                    <User2 />
                    <span>User</span>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
