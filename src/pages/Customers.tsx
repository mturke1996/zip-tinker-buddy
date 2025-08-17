import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserPlus, Search, Users, CreditCard, Phone, Mail, Calendar, DollarSign, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import { supabase, type Customer, type Debt } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

export const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [debts, setDebts] = useState<Debt[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddCustomerDialogOpen, setIsAddCustomerDialogOpen] = useState(false);
  const [isAddDebtDialogOpen, setIsAddDebtDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const [newCustomer, setNewCustomer] = useState({
    name: "",
    phone: "",
    email: ""
  });

  const [newDebt, setNewDebt] = useState({
    customer_id: "",
    amount: 0,
    description: "",
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [customersResult, debtsResult] = await Promise.all([
        supabase.from('customers').select('*').order('created_at', { ascending: false }),
        supabase.from('debts').select('*').order('created_at', { ascending: false })
      ]);

      if (customersResult.error) throw customersResult.error;
      if (debtsResult.error) throw debtsResult.error;

      setCustomers(customersResult.data || []);
      setDebts(debtsResult.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ في جلب البيانات",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const addCustomer = async () => {
    try {
      const { data, error } = await supabase
        .from('customers')
        .insert([newCustomer])
        .select()
        .single();

      if (error) throw error;

      setCustomers([data, ...customers]);
      setNewCustomer({ name: "", phone: "", email: "" });
      setIsAddCustomerDialogOpen(false);
      
      toast({
        title: "تم بنجاح",
        description: "تم إضافة العميل بنجاح"
      });
    } catch (error) {
      console.error('Error adding customer:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ في إضافة العميل",
        variant: "destructive"
      });
    }
  };

  const addDebt = async () => {
    try {
      const { data, error } = await supabase
        .from('debts')
        .insert([{
          ...newDebt,
          status: 'pending',
          paid_amount: 0
        }])
        .select()
        .single();

      if (error) throw error;

      setDebts([data, ...debts]);
      setNewDebt({
        customer_id: "",
        amount: 0,
        description: "",
        date: new Date().toISOString().split('T')[0]
      });
      setIsAddDebtDialogOpen(false);
      
      toast({
        title: "تم بنجاح",
        description: "تم إضافة الدين بنجاح"
      });
    } catch (error) {
      console.error('Error adding debt:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ في إضافة الدين",
        variant: "destructive"
      });
    }
  };

  const updateDebtPayment = async (debtId: string, paidAmount: number) => {
    try {
      const debt = debts.find(d => d.id === debtId);
      if (!debt) return;

      const newPaidAmount = debt.paid_amount + paidAmount;
      const newStatus = newPaidAmount >= debt.amount ? 'paid' : 
                       newPaidAmount > 0 ? 'partial' : 'pending';

      const { error } = await supabase
        .from('debts')
        .update({
          paid_amount: newPaidAmount,
          status: newStatus
        })
        .eq('id', debtId);

      if (error) throw error;

      setDebts(debts.map(d => 
        d.id === debtId 
          ? { ...d, paid_amount: newPaidAmount, status: newStatus }
          : d
      ));
      
      toast({
        title: "تم بنجاح",
        description: "تم تحديث الدفعة بنجاح"
      });
    } catch (error) {
      console.error('Error updating payment:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ في تحديث الدفعة",
        variant: "destructive"
      });
    }
  };

  const getCustomerDebts = (customerId: string) => {
    return debts.filter(debt => debt.customer_id === customerId);
  };

  const getCustomerTotalDebt = (customerId: string) => {
    return getCustomerDebts(customerId)
      .filter(debt => debt.status !== 'paid')
      .reduce((sum, debt) => sum + (debt.amount - debt.paid_amount), 0);
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone?.includes(searchTerm) ||
    customer.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-accent/10 text-accent"><CheckCircle className="w-3 h-3 mr-1" />مدفوع</Badge>;
      case 'partial':
        return <Badge variant="outline"><Clock className="w-3 h-3 mr-1" />جزئي</Badge>;
      default:
        return <Badge variant="destructive"><AlertTriangle className="w-3 h-3 mr-1" />معلق</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-warm flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">جاري تحميل بيانات العملاء...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-warm p-6" dir="rtl">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">إدارة العملاء والديون</h1>
            <p className="text-muted-foreground mt-2">متابعة بيانات العملاء وإدارة الديون</p>
          </div>

          <div className="flex gap-3">
            <Dialog open={isAddDebtDialogOpen} onOpenChange={setIsAddDebtDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <CreditCard className="w-4 h-4 mr-2" />
                  دين جديد
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md" dir="rtl">
                <DialogHeader>
                  <DialogTitle>إضافة دين جديد</DialogTitle>
                  <DialogDescription>
                    أدخل تفاصيل الدين الجديد
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="customer">العميل</Label>
                    <Select value={newDebt.customer_id} onValueChange={(value) => setNewDebt({...newDebt, customer_id: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر العميل" />
                      </SelectTrigger>
                      <SelectContent>
                        {customers.map((customer) => (
                          <SelectItem key={customer.id} value={customer.id}>
                            {customer.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="amount">المبلغ (ر.س)</Label>
                    <Input
                      id="amount"
                      type="number"
                      value={newDebt.amount}
                      onChange={(e) => setNewDebt({...newDebt, amount: Number(e.target.value)})}
                      placeholder="0"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">الوصف</Label>
                    <Input
                      id="description"
                      value={newDebt.description}
                      onChange={(e) => setNewDebt({...newDebt, description: e.target.value})}
                      placeholder="وصف الدين"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="date">التاريخ</Label>
                    <Input
                      id="date"
                      type="date"
                      value={newDebt.date}
                      onChange={(e) => setNewDebt({...newDebt, date: e.target.value})}
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button onClick={addDebt} className="flex-1">
                    إضافة الدين
                  </Button>
                  <Button variant="outline" onClick={() => setIsAddDebtDialogOpen(false)} className="flex-1">
                    إلغاء
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={isAddCustomerDialogOpen} onOpenChange={setIsAddCustomerDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-primary text-primary-foreground hover:shadow-glow">
                  <UserPlus className="w-4 h-4 mr-2" />
                  عميل جديد
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md" dir="rtl">
                <DialogHeader>
                  <DialogTitle>إضافة عميل جديد</DialogTitle>
                  <DialogDescription>
                    أدخل بيانات العميل الجديد
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">الاسم</Label>
                    <Input
                      id="name"
                      value={newCustomer.name}
                      onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
                      placeholder="اسم العميل"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">رقم الهاتف</Label>
                    <Input
                      id="phone"
                      value={newCustomer.phone}
                      onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})}
                      placeholder="+966xxxxxxxxx"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">البريد الإلكتروني</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newCustomer.email}
                      onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})}
                      placeholder="customer@example.com"
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button onClick={addCustomer} className="flex-1">
                    إضافة العميل
                  </Button>
                  <Button variant="outline" onClick={() => setIsAddCustomerDialogOpen(false)} className="flex-1">
                    إلغاء
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="البحث بالاسم أو رقم الهاتف أو البريد الإلكتروني..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Customers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCustomers.map((customer) => {
            const customerDebts = getCustomerDebts(customer.id);
            const totalDebt = getCustomerTotalDebt(customer.id);
            
            return (
              <Card 
                key={customer.id} 
                className="shadow-strong bg-card/95 backdrop-blur-sm border-border/50 hover:shadow-glow transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedCustomer(customer)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{customer.name}</CardTitle>
                    {totalDebt > 0 && (
                      <Badge variant="destructive" className="text-xs">
                        {totalDebt.toLocaleString()} ر.س
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {customer.phone && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="w-4 h-4" />
                      <span>{customer.phone}</span>
                    </div>
                  )}
                  {customer.email && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="w-4 h-4" />
                      <span>{customer.email}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>انضم في {new Date(customer.created_at).toLocaleDateString('ar-SA')}</span>
                  </div>
                  
                  <div className="pt-3 border-t border-border/50">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">عدد الديون:</span>
                      <span className="font-medium">{customerDebts.length}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredCustomers.length === 0 && (
          <Card className="text-center p-12">
            <Users className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">لا توجد عملاء</h3>
            <p className="text-muted-foreground">
              {searchTerm ? 'لم يتم العثور على عملاء مطابقين للبحث' : 'ابدأ بإضافة العملاء الجدد'}
            </p>
          </Card>
        )}

        {/* Customer Details Dialog */}
        {selectedCustomer && (
          <Dialog open={!!selectedCustomer} onOpenChange={() => setSelectedCustomer(null)}>
            <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto" dir="rtl">
              <DialogHeader>
                <DialogTitle className="text-xl">ملف العميل - {selectedCustomer.name}</DialogTitle>
                <DialogDescription>
                  بيانات مفصلة عن العميل وسجل الديون
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-6">
                {/* Customer Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">المعلومات الشخصية</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">{selectedCustomer.name}</span>
                    </div>
                    {selectedCustomer.phone && (
                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span>{selectedCustomer.phone}</span>
                      </div>
                    )}
                    {selectedCustomer.email && (
                      <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span>{selectedCustomer.email}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>تاريخ التسجيل: {new Date(selectedCustomer.created_at).toLocaleDateString('ar-SA')}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Debts */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">سجل الديون</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {getCustomerDebts(selectedCustomer.id).map((debt) => (
                        <div key={debt.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border/50">
                          <div>
                            <h4 className="font-medium text-foreground">{debt.description}</h4>
                            <div className="flex items-center gap-4 mt-2">
                              {getStatusBadge(debt.status)}
                              <span className="text-sm text-muted-foreground">
                                {new Date(debt.date).toLocaleDateString('ar-SA')}
                              </span>
                            </div>
                          </div>
                          <div className="text-left">
                            <p className="text-lg font-bold text-foreground">{debt.amount.toLocaleString()} ر.س</p>
                            {debt.paid_amount > 0 && (
                              <p className="text-sm text-muted-foreground">
                                مدفوع: {debt.paid_amount.toLocaleString()} ر.س
                              </p>
                            )}
                            {debt.status !== 'paid' && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="mt-2"
                                onClick={() => {
                                  const payment = prompt('أدخل مبلغ الدفعة:');
                                  if (payment && Number(payment) > 0) {
                                    updateDebtPayment(debt.id, Number(payment));
                                  }
                                }}
                              >
                                إضافة دفعة
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {getCustomerDebts(selectedCustomer.id).length === 0 && (
                      <div className="text-center p-8">
                        <CreditCard className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">لا توجد ديون لهذا العميل</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};