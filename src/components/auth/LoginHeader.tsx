import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

export const LoginHeader = () => {
  return (
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
  );
};