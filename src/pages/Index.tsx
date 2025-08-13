import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Coffee, Shield, Sparkles, Eye, EyeOff } from "lucide-react";

const Index = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate loading
    setTimeout(() => setIsLoading(false), 2000);
  };

  const handleDemoLogin = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-warm relative overflow-hidden font-arabic" dir="rtl">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-32 h-32 bg-accent/10 rounded-full animate-float"></div>
        <div className="absolute bottom-32 left-16 w-24 h-24 bg-primary/10 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-accent/5 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
        <div className="w-full max-w-md space-y-8">
          {/* Header Section */}
          <div className="text-center animate-fade-in">
            <div className="mx-auto w-24 h-24 rounded-2xl flex items-center justify-center mb-6 shadow-medium animate-glow overflow-hidden">
              <img 
                src="/lovable-uploads/b4854dd5-f780-45c3-b27d-0383a7c9abe0.png" 
                alt="موريسكو كافيه" 
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">موريسكو كافيه</h1>
            <p className="text-muted-foreground font-medium">لوحة إدارة احترافية وسريعة</p>
            <Badge variant="secondary" className="mt-3 bg-accent/20 text-accent-foreground border-accent/30">
              <Sparkles className="w-3 h-3 ml-1" />
              نسخة محدثة
            </Badge>
          </div>

          {/* Login Card */}
          <Card className="shadow-strong border-border/50 backdrop-blur-sm bg-card/95 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl font-bold text-center text-foreground">تسجيل الدخول</CardTitle>
              <CardDescription className="text-center text-muted-foreground">
                أدخل بياناتك للوصول إلى لوحة الإدارة
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-foreground">
                    البريد الإلكتروني
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@morisco.cafe"
                    className="h-11 bg-background/50 border-border/80 focus:border-primary transition-colors"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-foreground">
                    كلمة المرور
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="h-11 bg-background/50 border-border/80 focus:border-primary transition-colors pl-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full h-11 bg-gradient-primary hover:shadow-glow transition-all duration-300 font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                      جاري التحميل...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 ml-2" />
                      دخول
                    </div>
                  )}
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border/60" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-3 text-muted-foreground font-medium">أو</span>
                </div>
              </div>

              <Button 
                variant="outline" 
                className="w-full h-11 border-border/80 hover:bg-accent/10 hover:border-accent/50 transition-all"
                onClick={handleDemoLogin}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-foreground/30 border-t-foreground rounded-full animate-spin"></div>
                    جاري التحميل...
                  </div>
                ) : (
                  <>
                    <Coffee className="w-4 h-4 ml-2" />
                    دخول تجريبي
                  </>
                )}
              </Button>

              <div className="text-center text-sm text-muted-foreground bg-muted/30 rounded-lg p-3">
                <p className="font-medium mb-1">للتجربة:</p>
                <p>أضف مستخدمًا من Supabase → Auth للتجربة بحسابك.</p>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <p>© 2024 موريسكو كافيه. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
