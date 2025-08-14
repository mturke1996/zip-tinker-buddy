import { useState } from "react";
import { FormField } from "@/components/shared/FormField";
import { LoadingButton } from "@/components/shared/LoadingButton";
import { Shield, Coffee } from "lucide-react";

interface LoginFormProps {
  onSubmit: (e: React.FormEvent) => void;
  onDemoLogin: () => void;
  isLoading: boolean;
}

export const LoginForm = ({ onSubmit, onDemoLogin, isLoading }: LoginFormProps) => {
  return (
    <div className="space-y-6">
      <form onSubmit={onSubmit} className="space-y-4">
        <FormField
          id="email"
          type="email"
          label="البريد الإلكتروني"
          placeholder="admin@morisco.cafe"
          required
        />
        
        <FormField
          id="password"
          type="password"
          label="كلمة المرور"
          placeholder="••••••••"
          required
          showPasswordToggle
        />
        
        <LoadingButton
          type="submit"
          isLoading={isLoading}
          loadingText="جاري التحميل..."
          className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
        >
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 ml-2" />
            دخول
          </div>
        </LoadingButton>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border/60" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-3 text-muted-foreground font-medium">أو</span>
        </div>
      </div>

      <LoadingButton
        variant="outline"
        isLoading={isLoading}
        loadingText="جاري التحميل..."
        className="border-border/80 hover:bg-accent/10 hover:border-accent/50 transition-all"
        onClick={onDemoLogin}
      >
        <>
          <Coffee className="w-4 h-4 ml-2" />
          دخول تجريبي
        </>
      </LoadingButton>

      <div className="text-center text-sm text-muted-foreground bg-muted/30 rounded-lg p-3">
        <p className="font-medium mb-1">للتجربة:</p>
        <p>أضف مستخدمًا من Supabase → Auth للتجربة بحسابك.</p>
      </div>
    </div>
  );
};