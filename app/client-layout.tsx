"use client";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

const noLayoutPages = ["/login", "/register"];

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isFullPage = noLayoutPages.includes(pathname);

  if (isFullPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 min-w-0 h-screen overflow-y-auto scrollbar-hide">
        <Topbar />
        <main>{children}</main>
      </div>
    </div>
  );
}
