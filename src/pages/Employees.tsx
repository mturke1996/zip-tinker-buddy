import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { UserPlus, Search, User, Phone, Calendar, DollarSign, Clock, CheckCircle, XCircle } from "lucide-react";
import { supabase, type Employee, type Attendance, type EmployeeWithdrawal } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { Layout } from "@/components/shared/Layout";

export const Employees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Form states
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    phone: "",
    daily_wage: 0
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const { data, error } = await supabase
        .from('employees')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEmployees(data || []);
    } catch (error) {
      console.error('Error fetching employees:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ في جلب بيانات الموظفين",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const addEmployee = async () => {
    try {
      const { data, error } = await supabase
        .from('employees')
        .insert([{
          name: newEmployee.name,
          phone: newEmployee.phone,
          daily_wage: newEmployee.daily_wage,
          hire_date: new Date().toISOString().split('T')[0]
        }])
        .select()
        .single();

      if (error) throw error;

      setEmployees([data, ...employees]);
      setNewEmployee({ name: "", phone: "", daily_wage: 0 });
      setIsAddDialogOpen(false);
      
      toast({
        title: "تم بنجاح",
        description: "تم إضافة الموظف بنجاح"
      });
    } catch (error) {
      console.error('Error adding employee:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ في إضافة الموظف",
        variant: "destructive"
      });
    }
  };

  const markAttendance = async (employeeId: string, status: 'present' | 'absent') => {
    try {
      const today = new Date().toISOString().split('T')[0];
      
      const { error } = await supabase
        .from('attendance')
        .upsert({
          employee_id: employeeId,
          date: today,
          status,
          time_in: status === 'present' ? new Date().toLocaleTimeString('ar-SA') : null
        });

      if (error) throw error;

      toast({
        title: "تم بنجاح",
        description: `تم تسجيل ${status === 'present' ? 'الحضور' : 'الغياب'} بنجاح`
      });
    } catch (error) {
      console.error('Error marking attendance:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ في تسجيل الحضور",
        variant: "destructive"
      });
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').slice(0, 2);
  };

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.phone.includes(searchTerm)
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-warm flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">جاري تحميل بيانات الموظفين...</p>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="p-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">إدارة الموظفين</h1>
            <p className="text-muted-foreground mt-2">متابعة وإدارة بيانات الموظفين والحضور</p>
          </div>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary text-primary-foreground hover:shadow-glow">
                <UserPlus className="w-4 h-4 mr-2" />
                موظف جديد
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md" dir="rtl">
              <DialogHeader>
                <DialogTitle>إضافة موظف جديد</DialogTitle>
                <DialogDescription>
                  أدخل بيانات الموظف الجديد
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">الاسم</Label>
                  <Input
                    id="name"
                    value={newEmployee.name}
                    onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
                    placeholder="اسم الموظف"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">رقم الهاتف</Label>
                  <Input
                    id="phone"
                    value={newEmployee.phone}
                    onChange={(e) => setNewEmployee({...newEmployee, phone: e.target.value})}
                    placeholder="+966xxxxxxxxx"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="wage">اليومية (ر.س)</Label>
                  <Input
                    id="wage"
                    type="number"
                    value={newEmployee.daily_wage}
                    onChange={(e) => setNewEmployee({...newEmployee, daily_wage: Number(e.target.value)})}
                    placeholder="200"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <Button onClick={addEmployee} className="flex-1">
                  إضافة الموظف
                </Button>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="flex-1">
                  إلغاء
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="البحث بالاسم أو رقم الهاتف..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Employees Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredEmployees.map((employee) => (
            <Card 
              key={employee.id} 
              className="shadow-strong bg-card/95 backdrop-blur-sm border-border/50 hover:shadow-glow transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedEmployee(employee)}
            >
              <CardContent className="p-6 text-center">
                <Avatar className="w-20 h-20 mx-auto mb-4">
                  <AvatarImage src={employee.avatar_url} alt={employee.name} />
                  <AvatarFallback className="bg-primary/10 text-primary font-bold text-lg">
                    {getInitials(employee.name)}
                  </AvatarFallback>
                </Avatar>
                
                <h3 className="font-bold text-lg text-foreground mb-2">{employee.name}</h3>
                
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center justify-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>{employee.phone}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    <span>{employee.daily_wage} ر.س / يوم</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>انضم في {new Date(employee.hire_date).toLocaleDateString('ar-SA')}</span>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      markAttendance(employee.id, 'present');
                    }}
                    className="flex-1 bg-accent hover:bg-accent/90"
                  >
                    <CheckCircle className="w-4 h-4 mr-1" />
                    حضور
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      markAttendance(employee.id, 'absent');
                    }}
                    className="flex-1 text-destructive hover:bg-destructive/10"
                  >
                    <XCircle className="w-4 h-4 mr-1" />
                    غياب
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredEmployees.length === 0 && (
          <Card className="text-center p-12">
            <User className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">لا توجد موظفين</h3>
            <p className="text-muted-foreground">
              {searchTerm ? 'لم يتم العثور على موظفين مطابقين للبحث' : 'ابدأ بإضافة الموظفين الجدد'}
            </p>
          </Card>
        )}

        {/* Employee Details Dialog */}
        {selectedEmployee && (
          <Dialog open={!!selectedEmployee} onOpenChange={() => setSelectedEmployee(null)}>
            <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto" dir="rtl">
              <DialogHeader>
                <DialogTitle className="text-xl">ملف الموظف - {selectedEmployee.name}</DialogTitle>
                <DialogDescription>
                  بيانات مفصلة عن الموظف والحضور والمدفوعات
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-6">
                {/* Employee Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">المعلومات الشخصية</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">{selectedEmployee.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span>{selectedEmployee.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-4 h-4 text-muted-foreground" />
                      <span>{selectedEmployee.daily_wage} ر.س / يوم</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>تاريخ التوظيف: {new Date(selectedEmployee.hire_date).toLocaleDateString('ar-SA')}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Monthly Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">ملخص الشهر الحالي</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-accent/10 rounded-lg">
                        <div className="text-2xl font-bold text-accent">0</div>
                        <div className="text-sm text-muted-foreground">أيام العمل</div>
                      </div>
                      <div className="text-center p-4 bg-primary/10 rounded-lg">
                        <div className="text-2xl font-bold text-primary">0 ر.س</div>
                        <div className="text-sm text-muted-foreground">المسحوبات</div>
                      </div>
                      <div className="text-center p-4 bg-muted/30 rounded-lg">
                        <div className="text-2xl font-bold text-foreground">0 ر.س</div>
                        <div className="text-sm text-muted-foreground">المستحق</div>
                      </div>
                      <div className="text-center p-4 bg-accent/10 rounded-lg">
                        <div className="text-2xl font-bold text-accent">0 ر.س</div>
                        <div className="text-sm text-muted-foreground">المتبقي</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </DialogContent>
          </Dialog>
        )}
        </div>
      </div>
    </Layout>
  );
};