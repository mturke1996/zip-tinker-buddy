import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  Coffee, 
  Users, 
  Clock, 
  Receipt, 
  CreditCard, 
  BarChart3,
  ArrowRight,
  TrendingUp,
  CalendarCheck,
  Wallet
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  // Sample statistics for the coffee shop
  const stats = [
    { title: "الموظفين", value: "12", icon: Users, trend: "+2 هذا الشهر" },
    { title: "الحضور اليوم", value: "10", icon: CalendarCheck, trend: "83% معدل الحضور" },
    { title: "المصروفات اليومية", value: "1,250 ريال", icon: Wallet, trend: "-5% عن أمس" },
    { title: "الديون المعلقة", value: "8,500 ريال", value_count: "من 15 عميل", icon: CreditCard, trend: "تحتاج متابعة" },
  ];

  const quickActions = [
    {
      title: "إدارة الموظفين",
      description: "عرض وإدارة بيانات الموظفين",
      icon: Users,
      path: "/employees",
      color: "bg-primary",
      badge: "12 موظف"
    },
    {
      title: "تسجيل الحضور",
      description: "متابعة حضور وغياب الموظفين",
      icon: Clock,
      path: "/attendance",
      color: "bg-accent",
      badge: "10 حاضر اليوم"
    },
    {
      title: "المصروفات",
      description: "تسجيل ومتابعة المصروفات اليومية",
      icon: Receipt,
      path: "/expenses",
      color: "bg-secondary",
      badge: "5 عمليات اليوم"
    },
    {
      title: "ديون العملاء",
      description: "إدارة ومتابعة ديون العملاء",
      icon: CreditCard,
      path: "/customers",
      color: "bg-muted",
      badge: "15 عميل"
    },
    {
      title: "التقارير",
      description: "استخراج التقارير المالية والإدارية",
      icon: BarChart3,
      path: "/reports",
      color: "bg-primary-glow",
      badge: "PDF"
    },
    {
      title: "لوحة التحكم",
      description: "عرض شامل للأداء والإحصائيات",
      icon: TrendingUp,
      path: "/dashboard",
      color: "bg-accent",
      badge: "تحليلات"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-warm font-arabic" dir="rtl">
      {/* Header */}
      <div className="bg-gradient-primary text-primary-foreground">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Coffee className="h-10 w-10" />
              <div>
                <h1 className="text-3xl font-bold">موريسكو كافيه</h1>
                <p className="text-primary-foreground/80">نظام إدارة احترافي</p>
              </div>
            </div>
            <div className="text-left">
              <p className="text-sm text-primary-foreground/80">مرحباً بك</p>
              <p className="font-semibold">مدير المقهى</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="shadow-soft hover:shadow-strong transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    {stat.value_count && (
                      <p className="text-sm text-muted-foreground">{stat.value_count}</p>
                    )}
                    <p className="text-xs text-accent mt-1">{stat.trend}</p>
                  </div>
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">الإجراءات السريعة</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <Card 
                key={index} 
                className="shadow-soft hover:shadow-strong transition-all duration-300 cursor-pointer group"
                onClick={() => handleNavigation(action.path)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-lg ${action.color.replace('bg-', 'bg-')} text-white`}>
                      <action.icon className="h-6 w-6" />
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {action.badge}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {action.description}
                  </p>
                  <div className="flex items-center text-primary text-sm font-medium">
                    <span className="ml-2">الدخول</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-foreground">النشاطات الحديثة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 bg-secondary/50 rounded-lg">
                <div className="p-2 bg-primary/10 rounded-full">
                  <CalendarCheck className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">تم تسجيل حضور أحمد محمد</p>
                  <p className="text-xs text-muted-foreground">منذ 5 دقائق</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-3 bg-secondary/50 rounded-lg">
                <div className="p-2 bg-accent/10 rounded-full">
                  <Receipt className="h-4 w-4 text-accent" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">إضافة مصروف: مواد تنظيف - 150 ريال</p>
                  <p className="text-xs text-muted-foreground">منذ 15 دقيقة</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-3 bg-secondary/50 rounded-lg">
                <div className="p-2 bg-muted/40 rounded-full">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">دفعة جزئية من العميل سارة أحمد - 500 ريال</p>
                  <p className="text-xs text-muted-foreground">منذ ساعة</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground mt-8 pt-8 border-t border-border">
          <p>© 2024 موريسكو كافيه. جميع الحقوق محفوظة.</p>
          <p className="mt-1">نظام إدارة احترافي مع ربط كامل بقاعدة البيانات</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
