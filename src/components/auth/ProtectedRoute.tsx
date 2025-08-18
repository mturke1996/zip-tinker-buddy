import { useAuth } from '@/contexts/AuthContext';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-warm flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-muted-foreground font-arabic">جاري التحقق من الهوية...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    // Redirect to login will be handled by the App component
    return null;
  }

  return <>{children}</>;
};