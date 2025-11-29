import "./globals.css";
import ReactQueryProvider from "../providers/queryProviders";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
export const metadata = {
  title: "BlackCoffers Dashboard",
  description: "Admin Dashboard for BlackCoffers",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <SidebarProvider>
            <AppSidebar />
            <SidebarTrigger />
            {children}
          </SidebarProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
