import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, UserPlus, Edit, Trash2, Phone, Mail } from "lucide-react";

export const UsersManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const users = [
    {
      id: 1,
      name: "أحمد محمد السعيد",
      email: "ahmed@example.com",
      phone: "+966501234567",
      orders: 23,
      totalSpent: "1,250.75 ر.س",
      joinDate: "2023-12-15",
      status: "نشط",
      avatar: "/api/placeholder/40/40"
    },
    {
      id: 2,
      name: "فاطمة أحمد علي",
      email: "fatima@example.com", 
      phone: "+966507654321",
      orders: 45,
      totalSpent: "2,890.25 ر.س",
      joinDate: "2023-10-08",
      status: "نشط",
      avatar: "/api/placeholder/40/40"
    },
    {
      id: 3,
      name: "خالد سعد المطيري",
      email: "khalid@example.com",
      phone: "+966509876543",
      orders: 12,
      totalSpent: "567.50 ر.س",
      joinDate: "2024-01-03",
      status: "نشط",
      avatar: "/api/placeholder/40/40"
    },
    {
      id: 4,
      name: "نورا علي الحربي",
      email: "nora@example.com",
      phone: "+966502468135",
      orders: 67,
      totalSpent: "4,123.80 ر.س",
      joinDate: "2023-08-22",
      status: "مميز",
      avatar: "/api/placeholder/40/40"
    },
    {
      id: 5,
      name: "محمد عبدالله القحطاني",
      email: "mohammed@example.com",
      phone: "+966505555555",
      orders: 3,
      totalSpent: "89.25 ر.س",
      joinDate: "2024-01-10",
      status: "جديد",
      avatar: "/api/placeholder/40/40"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "نشط":
        return "bg-accent/20 text-accent-foreground border-accent/30";
      case "مميز":
        return "bg-purple-100 text-purple-800 border-purple-300";
      case "جديد":
        return "bg-blue-100 text-blue-800 border-blue-300";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').slice(0, 2);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone.includes(searchTerm)
  );

  return (
    <Card className="shadow-strong bg-card/95 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-foreground">إدارة العملاء</CardTitle>
            <CardDescription>متابعة وإدارة بيانات العملاء وطلباتهم</CardDescription>
          </div>
          <Button className="bg-gradient-primary text-primary-foreground hover:shadow-glow">
            <UserPlus className="w-4 h-4 mr-2" />
            عميل جديد
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="البحث بالاسم، البريد الإلكتروني أو رقم الهاتف..."
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
                <TableHead className="text-right font-medium">العميل</TableHead>
                <TableHead className="text-right font-medium">معلومات الاتصال</TableHead>
                <TableHead className="text-right font-medium">الطلبات</TableHead>
                <TableHead className="text-right font-medium">إجمالي الشراء</TableHead>
                <TableHead className="text-right font-medium">تاريخ الانضمام</TableHead>
                <TableHead className="text-right font-medium">الحالة</TableHead>
                <TableHead className="text-right font-medium">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id} className="hover:bg-muted/20 transition-colors">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="bg-primary/10 text-primary font-medium">
                          {getInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-foreground">{user.name}</p>
                        <p className="text-sm text-muted-foreground">#{user.id.toString().padStart(4, '0')}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-3 h-3 text-muted-foreground" />
                        <span className="text-muted-foreground">{user.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-3 h-3 text-muted-foreground" />
                        <span className="text-muted-foreground">{user.phone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-center">
                      <p className="font-medium text-foreground">{user.orders}</p>
                      <p className="text-xs text-muted-foreground">طلب</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="font-medium text-accent">{user.totalSpent}</p>
                  </TableCell>
                  <TableCell>
                    <p className="text-muted-foreground">{user.joinDate}</p>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(user.status)} variant="outline">
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
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