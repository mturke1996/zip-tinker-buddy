import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, CalendarDays, Search, Download, CheckCircle, XCircle, Clock } from "lucide-react";
import { supabase, type Employee, type Attendance as AttendanceType } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

export const Attendance = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [attendance, setAttendance] = useState<(AttendanceType & { employee: Employee })[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchEmployees();
    fetchAttendance();
  }, [selectedDate]);

  const fetchEmployees = async () => {
    try {
      const { data, error } = await supabase
        .from('employees')
        .select('*')
        .order('name');

      if (error) throw error;
      setEmployees(data || []);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const fetchAttendance = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('attendance')
        .select(`
          *,
          employee:employees(*)
        `)
        .eq('date', selectedDate)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAttendance(data || []);
    } catch (error) {
      console.error('Error fetching attendance:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ في جلب بيانات الحضور",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const markAttendance = async (employeeId: string, status: 'present' | 'absent' | 'late') => {
    try {
      const currentTime = new Date().toLocaleTimeString('ar-SA');
      
      const { data, error } = await supabase
        .from('attendance')
        .upsert({
          employee_id: employeeId,
          date: selectedDate,
          status,
          time_in: status !== 'absent' ? currentTime : null,
          time_out: null
        })
        .select(`
          *,
          employee:employees(*)
        `)
        .single();

      if (error) throw error;

      // Update local state
      const existingIndex = attendance.findIndex(a => a.employee_id === employeeId);
      if (existingIndex >= 0) {
        const newAttendance = [...attendance];
        newAttendance[existingIndex] = data;
        setAttendance(newAttendance);
      } else {
        setAttendance([data, ...attendance]);
      }

      toast({
        title: "تم بنجاح",
        description: `تم تسجيل ${getStatusLabel(status)} بنجاح`
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

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'present': return 'الحضور';
      case 'absent': return 'الغياب';
      case 'late': return 'التأخير';
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return "bg-accent/20 text-accent-foreground border-accent/30";
      case 'absent':
        return "bg-destructive/20 text-destructive border-destructive/30";
      case 'late':
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <CheckCircle className="w-4 h-4" />;
      case 'absent':
        return <XCircle className="w-4 h-4" />;
      case 'late':
        return <Clock className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const exportToPDF = () => {
    // TODO: Implement PDF export functionality
    toast({
      title: "قريباً",
      description: "سيتم إضافة ميزة تصدير PDF قريباً"
    });
  };

  const filteredAttendance = attendance.filter(record =>
    record.employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const employeesWithoutAttendance = employees.filter(emp => 
    !attendance.some(att => att.employee_id === emp.id) &&
    emp.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-warm p-6" dir="rtl">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">سجل الحضور والغياب</h1>
            <p className="text-muted-foreground mt-2">متابعة وتسجيل حضور الموظفين اليومي</p>
          </div>

          <Button onClick={exportToPDF} variant="outline" className="bg-card">
            <Download className="w-4 h-4 mr-2" />
            تصدير PDF
          </Button>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">التاريخ</label>
                <div className="relative">
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="pr-10"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">البحث</label>
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="البحث بالاسم..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pr-10"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Attendance Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-accent/10">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-accent">{attendance.filter(a => a.status === 'present').length}</div>
              <div className="text-sm text-muted-foreground">حاضر</div>
            </CardContent>
          </Card>
          <Card className="bg-destructive/10">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-destructive">{attendance.filter(a => a.status === 'absent').length}</div>
              <div className="text-sm text-muted-foreground">غائب</div>
            </CardContent>
          </Card>
          <Card className="bg-yellow-100">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-700">{attendance.filter(a => a.status === 'late').length}</div>
              <div className="text-sm text-muted-foreground">متأخر</div>
            </CardContent>
          </Card>
          <Card className="bg-muted/30">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-foreground">{employees.length}</div>
              <div className="text-sm text-muted-foreground">إجمالي الموظفين</div>
            </CardContent>
          </Card>
        </div>

        {/* Attendance Table */}
        <Card className="shadow-strong bg-card/95 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarDays className="w-5 h-5 text-primary" />
              سجل الحضور - {new Date(selectedDate).toLocaleDateString('ar-SA')}
            </CardTitle>
            <CardDescription>
              قائمة بحضور الموظفين لليوم المحدد
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                <p className="mt-2 text-muted-foreground">جاري التحميل...</p>
              </div>
            ) : (
              <div className="rounded-lg border border-border/50 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/30">
                      <TableHead className="text-right font-medium">الموظف</TableHead>
                      <TableHead className="text-right font-medium">الحالة</TableHead>
                      <TableHead className="text-right font-medium">وقت الدخول</TableHead>
                      <TableHead className="text-right font-medium">وقت الخروج</TableHead>
                      <TableHead className="text-right font-medium">الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAttendance.map((record) => (
                      <TableRow key={record.id} className="hover:bg-muted/20 transition-colors">
                        <TableCell>
                          <div className="font-medium text-foreground">{record.employee.name}</div>
                          <div className="text-sm text-muted-foreground">{record.employee.phone}</div>
                        </TableCell>
                        <TableCell>
                          <Badge className={`${getStatusColor(record.status)} flex items-center gap-1 w-fit`} variant="outline">
                            {getStatusIcon(record.status)}
                            {getStatusLabel(record.status)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className="text-muted-foreground">{record.time_in || '-'}</span>
                        </TableCell>
                        <TableCell>
                          <span className="text-muted-foreground">{record.time_out || '-'}</span>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              onClick={() => markAttendance(record.employee_id, 'present')}
                              className="bg-accent hover:bg-accent/90 text-xs px-2 py-1"
                            >
                              حضور
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => markAttendance(record.employee_id, 'late')}
                              className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs px-2 py-1"
                            >
                              تأخير
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => markAttendance(record.employee_id, 'absent')}
                              className="text-destructive hover:bg-destructive/10 text-xs px-2 py-1"
                            >
                              غياب
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {employeesWithoutAttendance.map((employee) => (
                      <TableRow key={`no-attendance-${employee.id}`} className="hover:bg-muted/20 transition-colors opacity-60">
                        <TableCell>
                          <div className="font-medium text-foreground">{employee.name}</div>
                          <div className="text-sm text-muted-foreground">{employee.phone}</div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-muted text-muted-foreground">
                            لم يسجل
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className="text-muted-foreground">-</span>
                        </TableCell>
                        <TableCell>
                          <span className="text-muted-foreground">-</span>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              onClick={() => markAttendance(employee.id, 'present')}
                              className="bg-accent hover:bg-accent/90 text-xs px-2 py-1"
                            >
                              حضور
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => markAttendance(employee.id, 'late')}
                              className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs px-2 py-1"
                            >
                              تأخير
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => markAttendance(employee.id, 'absent')}
                              className="text-destructive hover:bg-destructive/10 text-xs px-2 py-1"
                            >
                              غياب
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};