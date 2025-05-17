
import React from "react";
import { Bell as BellIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface BellProps {
  hasNotifications?: boolean;
  className?: string;
}

const Bell: React.FC<BellProps> = ({ hasNotifications = false, className }) => {
  return (
    <div className="relative">
      <BellIcon className={cn("h-6 w-6", className)} />
      
      {hasNotifications && (
        <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-destructive animate-pulse"></span>
      )}
    </div>
  );
};

export default Bell;
