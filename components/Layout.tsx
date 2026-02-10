
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [linkCopied, setLinkCopied] = React.useState(false);

  const copyAppLink = () => {
    // Mevcut sayfanın ana adresini kopyalar
    const appUrl = window.location.origin;
    navigator.clipboard.writeText(appUrl).then(() => {
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-blue-100">
      <header className="bg-white/70 backdrop-blur-md sticky top-0 z-50 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg text-white">
              <i className="fa-solid fa-earth-americas text-xl"></i>
            </div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500">
              GlobePlan AI
            </h1>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-slate-600 font-medium text-sm">
            <button 
              onClick={copyAppLink}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${
                linkCopied ? 'text-green-600 bg-green-50' : 'hover:text-indigo-600 hover:bg-indigo-50'
              }`}
            >
              <i className={`fa-solid ${linkCopied ? 'fa-check' : 'fa-link'}`}></i>
              {linkCopied ? 'Link Kopyalandı' : 'Uygulamayı Paylaş'}
            </button>
            <a href="#" className="hover:text-indigo-600 transition-colors">Nasıl Çalışır?</a>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition-all shadow-md">
              Giriş Yap
            </button>
          </nav>
        </div>
      </header>
      
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <footer className="bg-slate-900 text-slate-400 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm">© 2024 GlobePlan AI. Dünya Turunuz Yapay Zeka ile Başlasın.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
