
import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Header />
      <main className="pt-16 md:pl-64">
        <div className="p-4 md:p-6 animate-fadeIn">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
