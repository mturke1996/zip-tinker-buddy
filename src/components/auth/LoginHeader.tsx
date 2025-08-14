export const LoginHeader = () => {
  return (
    <div className="login-header">
      <div className="logo-container">
        <img 
          src="/lovable-uploads/b4854dd5-f780-45c3-b27d-0383a7c9abe0.png" 
          alt="موريسكو كافيه" 
          className="logo-image"
        />
      </div>
      <h1 className="main-title">موريسكو كافيه</h1>
      <p className="subtitle">لوحة إدارة احترافية وسريعة</p>
      <div className="badge">
        <svg className="badge-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l14 9-14 9V3z" />
        </svg>
        نسخة محدثة
      </div>
    </div>
  );
};