import { DashboardSidebar } from "@/components/DashboardSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="w-full">
        <div className="pt-6 px-3">
          <SidebarTrigger />
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
}
