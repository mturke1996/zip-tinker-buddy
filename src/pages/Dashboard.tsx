import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Coffee, Users, ShoppingCart, TrendingUp, DollarSign, Calendar } from "lucide-react";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { OrdersTable } from "@/components/dashboard/OrdersTable";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { ProductsManagement } from "@/components/dashboard/ProductsManagement";
import { UsersManagement } from "@/components/dashboard/UsersManagement";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    {
      title: "إجمالي الطلبات",
      value: "1,234",
      change: "+12%",
      icon: ShoppingCart,
      trend: "up" as const
    },
    {
      title: "العملاء الجدد",
      value: "89",
      change: "+23%",
      icon: Users,
      trend: "up" as const
    },
    {
      title: "إجمالي الإيرادات",
      value: "45,230 ر.س",
      change: "+8%",
      icon: DollarSign,
      trend: "up" as const
    },
    {
      title: "المنتجات المباعة",
      value: "2,456",
      change: "+15%",
      icon: Coffee,
      trend: "up" as const
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-warm" dir="rtl">
      {/* Header */}
      <header className="bg-card/95 backdrop-blur-sm border-b border-border/50 sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Coffee className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">لوحة إدارة موريسكو</h1>
                <p className="text-sm text-muted-foreground">مرحباً بك في نظام الإدارة</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="bg-accent/10 text-accent-foreground border-accent/30">
                <Calendar className="w-3 h-3 mr-1" />
                اليوم: {new Date().toLocaleDateString('ar-SA')}
              </Badge>
              <Button variant="outline" size="sm">
                تسجيل خروج
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Navigation */}
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4 bg-card/60 backdrop-blur-sm">
            <TabsTrigger value="overview" className="gap-2">
              <TrendingUp className="w-4 h-4" />
              نظرة عامة
            </TabsTrigger>
            <TabsTrigger value="orders" className="gap-2">
              <ShoppingCart className="w-4 h-4" />
              الطلبات
            </TabsTrigger>
            <TabsTrigger value="products" className="gap-2">
              <Coffee className="w-4 h-4" />
              المنتجات
            </TabsTrigger>
            <TabsTrigger value="users" className="gap-2">
              <Users className="w-4 h-4" />
              العملاء
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <StatsCard key={index} {...stat} />
              ))}
            </div>

            {/* Charts and Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RevenueChart />
              
              <Card className="shadow-strong bg-card/95 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center gap-2">
                    <Coffee className="w-5 h-5 text-primary" />
                    المنتجات الأكثر مبيعاً
                  </CardTitle>
                  <CardDescription>المنتجات الأكثر طلباً هذا الأسبوع</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: "كابتشينو كلاسيكي", sales: 145, change: "+12%" },
                    { name: "لاتيه بالفانيليا", sales: 132, change: "+8%" },
                    { name: "إسبريسو مزدوج", sales: 98, change: "+15%" },
                    { name: "فرابتشينو بالكراميل", sales: 87, change: "+23%" }
                  ].map((product, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                      <div>
                        <p className="font-medium text-foreground">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{product.sales} طلب</p>
                      </div>
                      <Badge variant="outline" className="text-accent">
                        {product.change}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <OrdersTable />
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products">
            <ProductsManagement />
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users">
            <UsersManagement />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;