import { Navigation } from "./Navigation";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-warm" dir="rtl">
      <Navigation />
      <div className="md:mr-64 pb-20 md:pb-0">
        {children}
      </div>
    </div>
  );
};