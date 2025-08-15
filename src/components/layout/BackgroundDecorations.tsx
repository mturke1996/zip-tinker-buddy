export const BackgroundDecorations = () => {
  return (
    <div className="absolute inset-0">
      <div className="absolute top-20 right-20 w-32 h-32 bg-accent opacity-10 rounded-full animate-float"></div>
      <div className="absolute bottom-32 left-16 w-24 h-24 bg-primary opacity-10 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-accent opacity-5 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
    </div>
  );
};