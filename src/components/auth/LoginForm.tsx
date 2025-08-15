import { useState } from "react";
import { FormField } from "@/components/shared/FormField";
import { LoadingButton } from "@/components/shared/LoadingButton";

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
          variant="primary"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          دخول
        </LoadingButton>
      </form>

      <div className="relative my-6">
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
        onClick={onDemoLogin}
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
        دخول تجريبي
      </LoadingButton>

      <div className="text-center text-sm text-muted-foreground bg-muted/30 rounded-md p-3 mt-4">
        <p className="font-medium mb-1">للتجربة:</p>
        <p>أضف مستخدمًا من Supabase → Auth للتجربة بحسابك.</p>
      </div>
    </div>
  );
};