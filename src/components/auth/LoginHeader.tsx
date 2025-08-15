export const LoginHeader = () => {
  return (
    <div className="text-center animate-fade-in">
      <div className="mx-auto mb-6 w-24 h-24 rounded-2xl flex items-center justify-center shadow-soft animate-pulse overflow-hidden">
        <img 
          src="/lovable-uploads/b4854dd5-f780-45c3-b27d-0383a7c9abe0.png" 
          alt="موريسكو كافيه" 
          className="w-full h-full object-contain"
        />
      </div>
      <h1 className="text-3xl font-bold text-foreground mb-2">موريسكو كافيه</h1>
      <p className="text-muted-foreground font-medium">لوحة إدارة احترافية وسريعة</p>
      <div className="inline-flex items-center gap-1 bg-accent/20 text-accent-foreground border border-accent/30 px-3 py-1 rounded-sm text-sm mt-3">
        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l14 9-14 9V3z" />
        </svg>
        نسخة محدثة
      </div>
    </div>
  );
};