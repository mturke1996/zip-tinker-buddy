import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Coffee, 
  Users, 
  Clock, 
  DollarSign, 
  CreditCard, 
  FileText, 
  BarChart3, 
  Settings, 
  LogOut,
  Menu,
  X,
  Home
} from "lucide-react";

export const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signOut, user } = useAuth();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const menuItems = [
    { icon: Home, label: "الصفحة الرئيسية", path: "/" },
    { icon: BarChart3, label: "لوحة التحكم", path: "/dashboard" },
    { icon: Users, label: "الموظفين", path: "/employees" },
    { icon: Clock, label: "الحضور والغياب", path: "/attendance" },
    { icon: DollarSign, label: "المصروفات", path: "/expenses" },
    { icon: CreditCard, label: "العملاء والديون", path: "/customers" },
    { icon: FileText, label: "التقارير", path: "/reports" },
    { icon: Settings, label: "الإعدادات", path: "/settings" }
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMobileOpen(false);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 right-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="bg-card/95 backdrop-blur-sm border-border/50"
        >
          {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 right-0 h-full w-80 bg-card border-l border-border z-40 transform transition-transform duration-300 ease-in-out
        md:transform-none md:translate-x-0
        ${isMobileOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="flex flex-col h-full p-6">
          {/* Logo and Title */}
          <div className="flex items-center gap-3 mb-8">
            <Coffee className="w-8 h-8 text-primary" />
            <div>
              <h2 className="text-xl font-bold text-card-foreground font-arabic">مور بيريسكو</h2>
              <p className="text-sm text-muted-foreground font-arabic">كافيه</p>
            </div>
          </div>

          {/* User Info */}
          <div className="bg-secondary/50 rounded-lg p-4 mb-6">
            <p className="text-sm text-muted-foreground font-arabic">مرحباً بك</p>
            <p className="font-semibold text-card-foreground font-arabic">
              {user?.user_metadata?.full_name || user?.email || "المدير"}
            </p>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              const IconComponent = item.icon;
              
              return (
                <Button
                  key={item.path}
                  variant={isActive ? "default" : "ghost"}
                  className={`
                    w-full justify-start gap-3 p-4 h-auto
                    ${isActive 
                      ? 'bg-gradient-primary text-primary-foreground shadow-glow' 
                      : 'hover:bg-muted/50'
                    }
                    font-arabic
                  `}
                  onClick={() => handleNavigation(item.path)}
                >
                  <IconComponent className="w-5 h-5 flex-shrink-0" />
                  <span className="text-right">{item.label}</span>
                </Button>
              );
            })}
          </nav>
          
          {/* Logout Button */}
          <div className="mt-auto pt-6 border-t border-border">
            <Button
              onClick={handleSignOut}
              variant="outline"
              className="w-full justify-start gap-3 p-4 text-destructive border-destructive/20 hover:bg-destructive/10 font-arabic"
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              تسجيل الخروج
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
};