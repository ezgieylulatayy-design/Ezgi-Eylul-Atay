
import React from 'react';

const messages = [
  "Uçuş rotaları analiz ediliyor...",
  "Bütçene uygun oteller seçiliyor...",
  "Gezilecek yerler listeleniyor...",
  "Yapay zeka rotanı optimize ediyor...",
  "Dünya rehberin hazırlanıyor..."
];

const LoadingState: React.FC = () => {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-24">
      <div className="relative mb-12">
        <div className="w-24 h-24 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <i className="fa-solid fa-plane text-indigo-600 text-2xl animate-float"></i>
        </div>
      </div>
      <h3 className="text-2xl font-bold text-slate-800 mb-2">Senin İçin Planlıyoruz</h3>
      <p className="text-indigo-600 font-medium animate-pulse">{messages[index]}</p>
    </div>
  );
};

export default LoadingState;
