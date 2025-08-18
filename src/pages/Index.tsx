import { Layout } from "@/components/shared/Layout";
import { Coffee, Users, Clock, DollarSign, FileText, CreditCard, BarChart3, Settings } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

const Index = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    employees: 0,
    todayAttendance: 0,
    totalExpenses: 0,
    totalDebts: 0
  });

  const features = [
    {
      icon: Users,
      title: "إدارة الموظفين",
      description: "متابعة الموظفين وملفاتهم الشخصية والرواتب",
      path: "/employees",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: Clock,
      title: "الحضور والغياب",
      description: "تسجيل حضور الموظفين وتتبع أوقات العمل",
      path: "/attendance", 
      gradient: "from-green-500 to-green-600"
    },
    {
      icon: DollarSign,
      title: "المصروفات اليومية",
      description: "تسجيل ومتابعة مصروفات المقهى",
      path: "/expenses",
      gradient: "from-orange-500 to-orange-600"
    },
    {
      icon: CreditCard,
      title: "العملاء والديون",
      description: "إدارة ديون العملاء والمدفوعات",
      path: "/customers",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      icon: FileText,
      title: "التقارير المالية",
      description: "تقارير شاملة وتصدير PDF احترافي",
      path: "/reports",
      gradient: "from-red-500 to-red-600"
    },
    {
      icon: BarChart3,
      title: "لوحة التحكم",
      description: "عرض شامل للإحصائيات والبيانات",
      path: "/dashboard",
      gradient: "from-indigo-500 to-indigo-600"
    },
    {
      icon: Settings,
      title: "إعدادات النظام",
      description: "تخصيص النظام وإعدادات المقهى",
      path: "/settings",
      gradient: "from-gray-500 to-gray-600"
    }
  ];

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Get employees count
      const { count: employeesCount } = await supabase
        .from('employees')
        .select('*', { count: 'exact', head: true });

      // Get today's attendance
      const today = new Date().toISOString().split('T')[0];
      const { count: attendanceCount } = await supabase
        .from('attendance')
        .select('*', { count: 'exact', head: true })
        .eq('date', today)
        .eq('status', 'present');

      // Get total expenses for current month
      const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0];
      const { data: expenses } = await supabase
        .from('expenses')
        .select('amount')
        .gte('date', startOfMonth);

      const totalExpenses = expenses?.reduce((sum, expense) => sum + expense.amount, 0) || 0;

      // Get total pending debts
      const { data: debts } = await supabase
        .from('debts')
        .select('amount, paid_amount')
        .neq('status', 'paid');

      const totalDebts = debts?.reduce((sum, debt) => sum + (debt.amount - debt.paid_amount), 0) || 0;

      setStats({
        employees: employeesCount || 0,
        todayAttendance: attendanceCount || 0,
        totalExpenses,
        totalDebts
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-primary text-primary-foreground">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiPjxwYXRoIGQ9Ik0zMCAzMGMwLTE2LjU2OS0xMy40MzEtMzAtMzAtMzB2NjBjMTYuNTY5IDAgMzAtMTMuNDMxIDMwLTMweiIvPjwvZz48L3N2Zz4=')] opacity-20"></div>
        <div className="relative container mx-auto px-6 py-20 text-center">
          <div className="flex items-center justify-center mb-6 animate-fade-in">
            <Coffee className="w-20 h-20 ml-6 animate-float" />
            <div>
              <h1 className="text-6xl font-bold mb-2 font-arabic">مور بيريسكو</h1>
              <p className="text-2xl text-primary-foreground/90 font-arabic">كافيه</p>
            </div>
          </div>
          <p className="text-xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto animate-fade-in animate-delay-200 font-arabic">
            نظام إدارة متكامل وشامل للمقهى - إدارة الموظفين، المصروفات، الديون والتقارير المالية
          </p>
          <Button 
            onClick={() => navigate('/dashboard')}
            size="lg"
            variant="secondary"
            className="animate-fade-in animate-delay-400 text-lg px-8 py-3 font-arabic"
          >
            ابدأ الآن
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-background/50 py-12 -mt-8 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { title: "إجمالي الموظفين", value: stats.employees, icon: Users, color: "text-blue-600" },
              { title: "الحضور اليوم", value: stats.todayAttendance, icon: Clock, color: "text-green-600" },
              { title: "مصروفات الشهر", value: `${stats.totalExpenses.toLocaleString()} ر.س`, icon: DollarSign, color: "text-orange-600" },
              { title: "إجمالي الديون", value: `${stats.totalDebts.toLocaleString()} ر.س`, icon: CreditCard, color: "text-red-600" }
            ].map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card key={stat.title} className="text-center p-6 shadow-soft hover:shadow-strong transition-all duration-300 border-0">
                  <IconComponent className={`w-8 h-8 mx-auto mb-4 ${stat.color}`} />
                  <p className="text-2xl font-bold text-foreground mb-2 font-arabic">{stat.value}</p>
                  <p className="text-muted-foreground text-sm font-arabic">{stat.title}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-foreground font-arabic">
          أقسام النظام
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card 
                key={feature.path} 
                className="group cursor-pointer transition-all duration-500 hover:shadow-glow hover:-translate-y-3 border-0 shadow-soft overflow-hidden"
                onClick={() => navigate(feature.path)}
              >
                <CardContent className="p-0">
                  <div className={`bg-gradient-to-br ${feature.gradient} p-8 text-white relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                    <IconComponent className="w-12 h-12 mb-4 relative z-10 group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="text-xl font-bold mb-2 relative z-10 font-arabic">
                      {feature.title}
                    </h3>
                  </div>
                  <div className="p-6">
                    <p className="text-muted-foreground mb-6 leading-relaxed font-arabic">
                      {feature.description}
                    </p>
                    <Button 
                      variant="outline" 
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300 font-arabic"
                    >
                      الدخول للقسم ←
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-card py-12 mt-16">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center mb-4">
            <Coffee className="w-8 h-8 ml-3 text-primary" />
            <h3 className="text-2xl font-bold text-card-foreground font-arabic">مور بيريسكو كافيه</h3>
          </div>
          <p className="text-muted-foreground font-arabic">
            نظام إدارة شامل ومتكامل للمقاهي والمطاعم
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
