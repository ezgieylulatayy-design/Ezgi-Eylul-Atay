
import React from 'react';

interface ChoiceStepProps {
  duration: number;
  onChoice: (isMulti: boolean) => void;
  onBack: () => void;
}

const ChoiceStep: React.FC<ChoiceStepProps> = ({ duration, onChoice, onBack }) => {
  return (
    <div className="max-w-2xl mx-auto py-12 px-6">
      <button 
        onClick={onBack}
        className="mb-8 flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-medium transition-colors group"
      >
        <i className="fa-solid fa-arrow-left transition-transform group-hover:-translate-x-1"></i>
        Bilgileri Güncelle
      </button>

      <div className="text-center">
        <div className="mb-8 inline-flex p-4 rounded-full bg-indigo-100 text-indigo-600">
          <i className="fa-solid fa-map-location-dot text-4xl"></i>
        </div>
        <h2 className="text-3xl font-bold text-slate-800 mb-4">
          Harika! {duration} Günlük Bir Tatil Planlıyorsun.
        </h2>
        <p className="text-lg text-slate-600 mb-10 max-w-lg mx-auto">
          Süren yeterince uzun. Sadece bir ülkede mi kalmak istersin, yoksa rotayı genişletip birden fazla ülkeyi mi keşfetmek istersin?
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button 
            onClick={() => onChoice(false)}
            className="group p-8 rounded-3xl bg-white border-2 border-slate-100 hover:border-indigo-500 hover:shadow-xl transition-all text-left"
          >
            <div className="bg-slate-100 group-hover:bg-indigo-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors">
              <i className="fa-solid fa-hotel text-xl text-slate-600 group-hover:text-indigo-600"></i>
            </div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-600">Tek Ülke</h3>
            <p className="text-slate-500 text-sm">Derinlemesine keşif, daha az yolculuk, daha sakin bir tempo.</p>
          </button>

          <button 
            onClick={() => onChoice(true)}
            className="group p-8 rounded-3xl bg-white border-2 border-slate-100 hover:border-indigo-500 hover:shadow-xl transition-all text-left"
          >
            <div className="bg-slate-100 group-hover:bg-indigo-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors">
              <i className="fa-solid fa-train-subway text-xl text-slate-600 group-hover:text-indigo-600"></i>
            </div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-600">Çoklu Ülke</h3>
            <p className="text-slate-500 text-sm">Daha fazla deneyim, farklı kültürler ve dinamik bir rota.</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChoiceStep;
