import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Download, Calendar, DollarSign, Clock, User, TrendingUp, BarChart3 } from "lucide-react";
import { supabase, type Employee, type Attendance, type EmployeeWithdrawal } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const Reports = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<string>("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reportData, setReportData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchEmployees();
  }, []);

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
      toast({
        title: "خطأ",
        description: "حدث خطأ في جلب بيانات الموظفين",
        variant: "destructive"
      });
    }
  };

  const generateReport = async () => {
    if (!selectedEmployee || !startDate || !endDate) {
      toast({
        title: "خطأ",
        description: "يرجى تحديد الموظف والفترة الزمنية",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const employee = employees.find(e => e.id === selectedEmployee);
      if (!employee) return;

      // Fetch attendance data
      const { data: attendanceData, error: attendanceError } = await supabase
        .from('attendance')
        .select('*')
        .eq('employee_id', selectedEmployee)
        .gte('date', startDate)
        .lte('date', endDate)
        .eq('status', 'present');

      if (attendanceError) throw attendanceError;

      // Fetch withdrawals data
      const { data: withdrawalsData, error: withdrawalsError } = await supabase
        .from('employee_withdrawals')
        .select('*')
        .eq('employee_id', selectedEmployee)
        .gte('date', startDate)
        .lte('date', endDate);

      if (withdrawalsError) throw withdrawalsError;

      const workDays = attendanceData?.length || 0;
      const totalEarned = workDays * employee.daily_wage;
      const totalWithdrawals = withdrawalsData?.reduce((sum, w) => sum + w.amount, 0) || 0;
      const remaining = totalEarned - totalWithdrawals;

      setReportData({
        employee,
        workDays,
        totalEarned,
        totalWithdrawals,
        remaining,
        attendanceData: attendanceData || [],
        withdrawalsData: withdrawalsData || [],
        startDate,
        endDate
      });

      toast({
        title: "تم بنجاح",
        description: "تم إنشاء التقرير بنجاح"
      });
    } catch (error) {
      console.error('Error generating report:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ في إنشاء التقرير",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const exportToPDF = async () => {
    if (!reportData) return;

    try {
      const reportElement = document.getElementById('report-content');
      if (!reportElement) return;

      const canvas = await html2canvas(reportElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`تقرير_${reportData.employee.name}_${reportData.startDate}_${reportData.endDate}.pdf`);

      toast({
        title: "تم بنجاح",
        description: "تم تصدير التقرير بصيغة PDF"
      });
    } catch (error) {
      console.error('Error exporting PDF:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ في تصدير التقرير",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-warm p-6" dir="rtl">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">التقارير المالية</h1>
            <p className="text-muted-foreground mt-2">إنشاء وتصدير التقارير المالية للموظفين</p>
          </div>
        </div>

        {/* Report Generator */}
        <Card className="mb-8 shadow-strong">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              إنشاء تقرير جديد
            </CardTitle>
            <CardDescription>
              اختر الموظف والفترة الزمنية لإنشاء التقرير المالي
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="employee">الموظف</Label>
                <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الموظف" />
                  </SelectTrigger>
                  <SelectContent>
                    {employees.map((employee) => (
                      <SelectItem key={employee.id} value={employee.id}>
                        {employee.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="startDate">من تاريخ</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate">إلى تاريخ</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>

            <Button 
              onClick={generateReport} 
              disabled={loading}
              className="w-full bg-gradient-primary text-primary-foreground hover:shadow-glow"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                  جاري إنشاء التقرير...
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4 mr-2" />
                  إنشاء التقرير
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Report Display */}
        {reportData && (
          <Card className="shadow-strong">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl">التقرير المالي</CardTitle>
                <CardDescription>
                  تقرير شامل للفترة من {new Date(reportData.startDate).toLocaleDateString('ar-SA')} 
                  إلى {new Date(reportData.endDate).toLocaleDateString('ar-SA')}
                </CardDescription>
              </div>
              <Button onClick={exportToPDF} variant="outline">
                <Download className="w-4 h-4 mr-2" />
                تصدير PDF
              </Button>
            </CardHeader>
            <CardContent>
              <div id="report-content" className="space-y-8 p-6 bg-white rounded-lg">
                {/* Report Header */}
                <div className="text-center border-b pb-6">
                  <h2 className="text-2xl font-bold text-primary mb-2">مقهى موريسكو</h2>
                  <h3 className="text-xl font-semibold text-foreground">التقرير المالي للموظف</h3>
                  <p className="text-muted-foreground mt-2">
                    الفترة: {new Date(reportData.startDate).toLocaleDateString('ar-SA')} - {new Date(reportData.endDate).toLocaleDateString('ar-SA')}
                  </p>
                </div>

                {/* Employee Info */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-foreground border-b pb-2">بيانات الموظف</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">الاسم:</span>
                        <span>{reportData.employee.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <DollarSign className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">اليومية:</span>
                        <span>{reportData.employee.daily_wage.toLocaleString()} ر.س</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">تاريخ التوظيف:</span>
                        <span>{new Date(reportData.employee.hire_date).toLocaleDateString('ar-SA')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-foreground border-b pb-2">ملخص الفترة</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">أيام العمل:</span>
                        <span className="font-bold text-accent">{reportData.workDays} يوم</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <TrendingUp className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">إجمالي الاستحقاق:</span>
                        <span className="font-bold text-primary">{reportData.totalEarned.toLocaleString()} ر.س</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <DollarSign className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">إجمالي المسحوبات:</span>
                        <span className="font-bold text-destructive">{reportData.totalWithdrawals.toLocaleString()} ر.س</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Financial Summary */}
                <div className="bg-gradient-primary/10 p-6 rounded-lg">
                  <h4 className="text-xl font-bold text-center mb-6">الملخص المالي</h4>
                  <div className="grid grid-cols-3 gap-6 text-center">
                    <div className="bg-white p-4 rounded-lg shadow-soft">
                      <p className="text-2xl font-bold text-primary">{reportData.totalEarned.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">إجمالي الاستحقاق</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-soft">
                      <p className="text-2xl font-bold text-destructive">{reportData.totalWithdrawals.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">إجمالي المسحوبات</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-soft">
                      <p className={`text-2xl font-bold ${reportData.remaining >= 0 ? 'text-accent' : 'text-destructive'}`}>
                        {reportData.remaining.toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {reportData.remaining >= 0 ? 'المتبقي' : 'الدين على الموظف'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Detailed Breakdown */}
                {reportData.withdrawalsData.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-foreground border-b pb-2">تفاصيل المسحوبات</h4>
                    <div className="space-y-2">
                      {reportData.withdrawalsData.map((withdrawal: any, index: number) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                          <div>
                            <span className="font-medium">{withdrawal.description || 'سحب نقدي'}</span>
                            <p className="text-sm text-muted-foreground">
                              {new Date(withdrawal.date).toLocaleDateString('ar-SA')}
                            </p>
                          </div>
                          <span className="font-bold text-destructive">{withdrawal.amount.toLocaleString()} ر.س</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Footer */}
                <div className="text-center pt-6 border-t text-sm text-muted-foreground">
                  <p>تم إنشاء هذا التقرير في {new Date().toLocaleDateString('ar-SA')} - مقهى موريسكو</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {!reportData && (
          <Card className="text-center p-12">
            <FileText className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">لا يوجد تقرير</h3>
            <p className="text-muted-foreground">
              اختر الموظف والفترة الزمنية لإنشاء التقرير المالي
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};