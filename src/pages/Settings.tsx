import { Layout } from "@/components/shared/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Upload, Coffee, Building, Palette } from "lucide-react";

export const Settings = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    cafeName: "مور بيريسكو كافيه",
    currency: "ر.س",
    timezone: "Asia/Riyadh",
    logo: ""
  });

  const handleSave = async () => {
    setLoading(true);
    try {
      // Here you would save settings to Supabase
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated delay
      
      toast({
        title: "تم حفظ الإعدادات",
        description: "تم تحديث إعدادات النظام بنجاح",
      });
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء حفظ الإعدادات",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Here you would upload to Supabase Storage
    toast({
      title: "جاري رفع الشعار...",
      description: "سيتم تحديث الشعار قريباً",
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2 font-arabic">إعدادات النظام</h1>
          <p className="text-muted-foreground font-arabic">تخصيص إعدادات المقهى والنظام</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* General Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-arabic">
                <Building className="w-5 h-5" />
                إعدادات عامة
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="cafeName" className="font-arabic">اسم المقهى</Label>
                <Input
                  id="cafeName"
                  value={settings.cafeName}
                  onChange={(e) => setSettings({...settings, cafeName: e.target.value})}
                  className="font-arabic"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="currency" className="font-arabic">العملة</Label>
                <Input
                  id="currency"
                  value={settings.currency}
                  onChange={(e) => setSettings({...settings, currency: e.target.value})}
                  className="font-arabic"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone" className="font-arabic">المنطقة الزمنية</Label>
                <Input
                  id="timezone"
                  value={settings.timezone}
                  onChange={(e) => setSettings({...settings, timezone: e.target.value})}
                  className="font-arabic"
                />
              </div>
            </CardContent>
          </Card>

          {/* Logo Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-arabic">
                <Coffee className="w-5 h-5" />
                شعار المقهى
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-4 font-arabic">
                  اسحب الشعار هنا أو اضغط لاختيار ملف
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                  id="logo-upload"
                />
                <Button 
                  variant="outline" 
                  onClick={() => document.getElementById('logo-upload')?.click()}
                  className="font-arabic"
                >
                  اختيار شعار
                </Button>
              </div>
              <p className="text-sm text-muted-foreground font-arabic">
                يُفضل استخدام صورة بحجم 200x200 بكسل أو أكبر
              </p>
            </CardContent>
          </Card>

          {/* Theme Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-arabic">
                <Palette className="w-5 h-5" />
                إعدادات المظهر
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground font-arabic">
                  قريباً: إمكانية تخصيص ألوان النظام والمظهر
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {["الأخضر (الحالي)", "الأزرق", "البنفسجي"].map((theme, index) => (
                    <div key={theme} className="p-3 border rounded-lg text-center text-sm font-arabic">
                      {theme}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Backup & Export */}
          <Card>
            <CardHeader>
              <CardTitle className="font-arabic">النسخ الاحتياطي والتصدير</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full font-arabic">
                تصدير البيانات (Excel)
              </Button>
              <Button variant="outline" className="w-full font-arabic">
                إنشاء نسخة احتياطية
              </Button>
              <Button variant="outline" className="w-full font-arabic">
                استعادة من نسخة احتياطية
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Save Button */}
        <div className="mt-8 flex justify-end">
          <Button 
            onClick={handleSave} 
            disabled={loading}
            size="lg"
            className="px-8 font-arabic"
          >
            {loading ? "جاري الحفظ..." : "حفظ الإعدادات"}
          </Button>
        </div>
      </div>
    </Layout>
  );
};