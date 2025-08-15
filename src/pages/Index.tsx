import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginHeader } from "@/components/auth/LoginHeader";
import { LoginForm } from "@/components/auth/LoginForm";
import { BackgroundDecorations } from "@/components/layout/BackgroundDecorations";

const Index = () => {
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
      <BackgroundDecorations />

      <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
        <div className="w-full max-w-md space-y-8">
          <LoginHeader />

          {/* Login Card */}
          <Card className="shadow-strong border-border/50 backdrop-blur-sm bg-card/95 animate-fade-in animate-delay-200">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl font-bold text-center text-foreground">تسجيل الدخول</CardTitle>
              <CardDescription className="text-center text-muted-foreground">
                أدخل بياناتك للوصول إلى لوحة الإدارة
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <LoginForm
                onSubmit={handleSubmit}
                onDemoLogin={handleDemoLogin}
                isLoading={isLoading}
              />
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center text-sm text-muted-foreground animate-fade-in animate-delay-400">
            <p>© 2024 موريسكو كافيه. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
