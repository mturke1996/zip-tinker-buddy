import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Eye, EyeOff, Coffee, Shield } from 'lucide-react';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';

export const Login = () => {
  const { signIn, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsSubmitting(true);
    try {
      await signIn(email, password);
    } catch (error) {
      // Error handling is done in the context
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoLogin = async () => {
    setIsSubmitting(true);
    setEmail('demo@moriscokafe.com');
    setPassword('demo123456');
    
    try {
      await signIn('demo@moriscokafe.com', 'demo123456');
    } catch (error) {
      // Error handling is done in the context
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-warm flex items-center justify-center" dir="rtl">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-warm flex items-center justify-center p-4" dir="rtl">
      <div className="w-full max-w-md">
        {/* App Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-3xl shadow-soft mb-6">
            <div className="w-16 h-20 bg-gradient-primary rounded-t-full flex items-end justify-center relative">
              <div className="w-12 h-12 bg-white/20 rounded-full absolute top-2"></div>
              <div className="w-8 h-8 bg-white/20 rounded-full mb-2"></div>
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-foreground mb-2 font-arabic">
            مور بيريسكو كافيه
          </h1>
          <p className="text-muted-foreground font-arabic">
            لوحة إدارة احترافية وسريعة
          </p>
          
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full mt-4">
            <Shield className="w-4 h-4" />
            <span className="text-sm font-medium font-arabic">نسخة محدثة</span>
          </div>
        </div>

        {/* Login Form */}
        <Card className="shadow-strong border-0">
          <CardHeader className="text-center pb-4">
            <h2 className="text-2xl font-bold text-foreground font-arabic">تسجيل الدخول</h2>
            <p className="text-muted-foreground font-arabic">
              أدخل بياناتك للوصول إلى لوحة الإدارة
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-right font-arabic">
                  البريد الإلكتروني
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="mohturke96@gmail.com"
                  required
                  className="text-right font-arabic"
                  disabled={isSubmitting}
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-right font-arabic">
                  كلمة المرور
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="text-right font-arabic pl-12"
                    disabled={isSubmitting}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    disabled={isSubmitting}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                className="w-full bg-gradient-primary hover:shadow-glow text-lg py-6 font-arabic"
                disabled={isSubmitting || !email || !password}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <LoadingSpinner size="sm" />
                    جاري الدخول...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    دخول
                  </div>
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-border"></div>
              <span className="text-muted-foreground text-sm font-arabic">أو</span>
              <div className="flex-1 h-px bg-border"></div>
            </div>

            {/* Demo Login */}
            <Button
              onClick={handleDemoLogin}
              variant="outline"
              className="w-full py-6 font-arabic"
              disabled={isSubmitting}
            >
              <div className="flex items-center gap-2">
                <Coffee className="w-5 h-5" />
                دخول تجريبي
              </div>
            </Button>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p className="font-arabic">© 2024 مور بيريسكو كافيه</p>
          <p className="font-arabic">نظام إدارة محمي بتقنيات حديثة</p>
        </div>
      </div>
    </div>
  );
};