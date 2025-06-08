import { Camera } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";

export function NavHeader() {
  const { state } = useSidebar(); // Get the sidebar state

  return (
    <div className="flex items-center gap-2 bg-blue-600 text-white rounded-[8px] px-4 py-3 w-full justify-center shadow-md">
      <Camera className={`mr-2 ${state === "collapsed" ? "h-5 w-5" : "h-6 w-6"}`} />
      {state === "expanded" && (
        <span className="font-bold text-lg tracking-wide">
          BestPhoto AI
        </span>
      )}
    </div>
  );
} 