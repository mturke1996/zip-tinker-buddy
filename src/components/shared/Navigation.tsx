import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  LayoutDashboard, 
  Users, 
  Clock, 
  DollarSign, 
  CreditCard, 
  FileText,
  Home,
  LogOut
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const navigationItems = [
  { path: "/dashboard", icon: LayoutDashboard, label: "الرئيسية" },
  { path: "/employees", icon: Users, label: "الموظفين" },
  { path: "/attendance", icon: Clock, label: "الحضور" },
  { path: "/expenses", icon: DollarSign, label: "المصروفات" },
  { path: "/customers", icon: CreditCard, label: "العملاء" },
  { path: "/reports", icon: FileText, label: "التقارير" },
];

export const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Card className="fixed bottom-0 left-0 right-0 md:top-0 md:bottom-auto md:left-0 md:right-auto md:w-64 md:h-screen bg-card/95 backdrop-blur-sm border-border/50 z-50">
      <div className="p-4">
        {/* Logo - Hidden on mobile */}
        <div className="hidden md:block mb-8 text-center">
          <h2 className="text-xl font-bold text-primary">مقهى موريسكو</h2>
          <p className="text-sm text-muted-foreground">نظام الإدارة</p>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-2 md:space-y-3">
          <div className="flex md:flex-col gap-2 md:gap-3 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              
              return (
                <Button
                  key={item.path}
                  variant={isActive ? "default" : "ghost"}
                  className={`
                    flex-shrink-0 min-w-[60px] md:min-w-full
                    ${isActive 
                      ? 'bg-gradient-primary text-primary-foreground shadow-glow' 
                      : 'hover:bg-muted/50'
                    }
                    flex flex-col md:flex-row items-center gap-1 md:gap-3 
                    h-auto py-3 px-3 md:px-4
                  `}
                  onClick={() => navigate(item.path)}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="text-xs md:text-sm font-medium hidden md:block">
                    {item.label}
                  </span>
                  <span className="text-xs font-medium md:hidden">
                    {item.label}
                  </span>
                </Button>
              );
            })}
          </div>
        </nav>

        {/* Logout Button - Desktop only */}
        <div className="hidden md:block mt-auto pt-8">
          <Button
            variant="ghost"
            className="w-full flex items-center gap-3 text-destructive hover:bg-destructive/10"
            onClick={() => navigate("/")}
          >
            <LogOut className="w-5 h-5" />
            <span>تسجيل الخروج</span>
          </Button>
        </div>
      </div>
    </Card>
  );
};