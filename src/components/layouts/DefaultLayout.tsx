import { DashboardSidebar } from "../DashboardSidebar";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import UserIcon from "../UserIcon";

export default function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="w-full">
        <div className="pt-6 px-3 flex items-center justify-between">
          <SidebarTrigger />
          <UserIcon />
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
}
