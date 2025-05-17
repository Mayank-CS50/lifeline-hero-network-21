
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";
import { UserRole } from "@/types";
import { 
  Home, 
  User, 
  Users, 
  Heart, 
  Calendar, 
  Award, 
  Bell, 
  Settings, 
  LogOut, 
  Menu, 
  X
} from "lucide-react";

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
  roles: UserRole[];
}

const navItems: NavItem[] = [
  { path: "/", label: "Home", icon: <Home size={20} />, roles: [UserRole.DONOR, UserRole.REQUESTER, UserRole.ADMIN] },
  { path: "/profile", label: "Profile", icon: <User size={20} />, roles: [UserRole.DONOR, UserRole.REQUESTER, UserRole.ADMIN] },
  { path: "/donors", label: "Donors", icon: <Users size={20} />, roles: [UserRole.ADMIN] },
  { path: "/requests", label: "Requests", icon: <Heart size={20} />, roles: [UserRole.DONOR, UserRole.REQUESTER, UserRole.ADMIN] },
  { path: "/appointments", label: "Appointments", icon: <Calendar size={20} />, roles: [UserRole.DONOR, UserRole.REQUESTER, UserRole.ADMIN] },
  { path: "/achievements", label: "Achievements", icon: <Award size={20} />, roles: [UserRole.DONOR] },
];

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user) {
    return <>{children}</>;
  }

  const filteredNavItems = navItems.filter(item => item.roles.includes(user.role));
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };
  
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="flex h-screen bg-background">
      {/* Mobile sidebar toggle */}
      <div className="fixed top-4 left-4 z-50 lg:hidden">
        <Button variant="outline" size="icon" onClick={toggleSidebar}>
          <Menu size={20} />
        </Button>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-background/80 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-sidebar transform transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Mobile close button */}
        <div className="flex justify-end p-4 lg:hidden">
          <Button variant="ghost" size="icon" onClick={closeSidebar}>
            <X size={20} />
          </Button>
        </div>
        
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <Heart className="h-8 w-8 text-blood-600" />
            <h1 className="text-xl font-semibold">LifeFlow</h1>
          </div>
          
          <div className="space-y-1">
            {filteredNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeSidebar}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  location.pathname === item.path
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "hover:bg-sidebar-accent/50 text-sidebar-foreground"
                )}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="border-b bg-card p-4">
          <div className="flex justify-end items-center">
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => {
                  navigate('/notifications');
                  closeSidebar();
                }}
              >
                <Bell size={20} />
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9">
                      <AvatarImage 
                        src={user.profilePicture} 
                        alt={user.name} 
                      />
                      <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem 
                    onClick={() => {
                      navigate('/profile');
                      closeSidebar();
                    }}
                  >
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => {
                      navigate('/settings');
                      closeSidebar();
                    }}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
