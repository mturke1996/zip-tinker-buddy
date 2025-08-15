import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Eye, Edit, Trash2 } from "lucide-react";

export const OrdersTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const orders = [
    {
      id: "#12345",
      customer: "أحمد محمد",
      products: "كابتشينو × 2، كروسان × 1",
      total: "45.50 ر.س",
      status: "مكتمل",
      date: "2024-01-15",
      time: "14:30"
    },
    {
      id: "#12346", 
      customer: "فاطمة أحمد",
      products: "لاتيه × 1، كيك شوكولاتة × 1",
      total: "32.00 ر.س",
      status: "قيد التحضير",
      date: "2024-01-15",
      time: "14:25"
    },
    {
      id: "#12347",
      customer: "خالد سعد",
      products: "إسبريسو × 3، ماء × 1",
      total: "18.75 ر.س",
      status: "جديد",
      date: "2024-01-15",
      time: "14:20"
    },
    {
      id: "#12348",
      customer: "نورا علي",
      products: "فرابتشينو × 2، سندويش × 1",
      total: "67.25 ر.س",
      status: "مكتمل",
      date: "2024-01-15",
      time: "14:15"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "مكتمل":
        return "bg-accent/20 text-accent-foreground border-accent/30";
      case "قيد التحضير":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "جديد":
        return "bg-blue-100 text-blue-800 border-blue-300";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const filteredOrders = orders.filter(order =>
    order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="shadow-strong bg-card/95 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-foreground">إدارة الطلبات</CardTitle>
            <CardDescription>متابعة وإدارة جميع طلبات العملاء</CardDescription>
          </div>
          <Button className="bg-gradient-primary text-primary-foreground hover:shadow-glow">
            طلب جديد
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="البحث بالاسم أو رقم الطلب..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10"
          />
        </div>

        {/* Table */}
        <div className="rounded-lg border border-border/50 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead className="text-right font-medium">رقم الطلب</TableHead>
                <TableHead className="text-right font-medium">العميل</TableHead>
                <TableHead className="text-right font-medium">المنتجات</TableHead>
                <TableHead className="text-right font-medium">المجموع</TableHead>
                <TableHead className="text-right font-medium">الحالة</TableHead>
                <TableHead className="text-right font-medium">التاريخ</TableHead>
                <TableHead className="text-right font-medium">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id} className="hover:bg-muted/20 transition-colors">
                  <TableCell className="font-medium text-primary">{order.id}</TableCell>
                  <TableCell className="font-medium">{order.customer}</TableCell>
                  <TableCell className="text-muted-foreground max-w-xs truncate">
                    {order.products}
                  </TableCell>
                  <TableCell className="font-medium text-accent">{order.total}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(order.status)} variant="outline">
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    <div>
                      <div>{order.date}</div>
                      <div className="text-xs">{order.time}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="w-8 h-8 p-0">
                        <Eye className="w-3 h-3" />
                      </Button>
                      <Button variant="outline" size="sm" className="w-8 h-8 p-0">
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button variant="outline" size="sm" className="w-8 h-8 p-0 text-destructive hover:bg-destructive/10">
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};