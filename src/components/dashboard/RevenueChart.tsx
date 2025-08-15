import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp } from "lucide-react";

export const RevenueChart = () => {
  const data = [
    {
      name: "السبت",
      revenue: 4000,
    },
    {
      name: "الأحد", 
      revenue: 3000,
    },
    {
      name: "الاثنين",
      revenue: 5000,
    },
    {
      name: "الثلاثاء",
      revenue: 4500,
    },
    {
      name: "الأربعاء",
      revenue: 6000,
    },
    {
      name: "الخميس",
      revenue: 5500,
    },
    {
      name: "الجمعة",
      revenue: 7000,
    }
  ];

  return (
    <Card className="shadow-strong bg-card/95 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          الإيرادات الأسبوعية
        </CardTitle>
        <CardDescription>إيرادات الأسبوع الحالي بالريال السعودي</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="name" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  color: "hsl(var(--foreground))"
                }}
                formatter={(value) => [`${value} ر.س`, "الإيرادات"]}
              />
              <Bar 
                dataKey="revenue" 
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};