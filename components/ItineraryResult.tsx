
import React from 'react';
import { Itinerary, DayPlan, ItineraryResponse } from '../types';

interface ItineraryResultProps {
  response: ItineraryResponse;
  onReset: () => void;
}

const DayCard: React.FC<{ day: DayPlan }> = ({ day }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow">
    <div className="bg-indigo-50 px-6 py-4 flex justify-between items-center border-b border-indigo-100">
      <div>
        <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">GÜN {day.day}</span>
        <h4 className="font-bold text-slate-800">{day.city}, {day.country}</h4>
      </div>
      <span className="text-sm font-medium text-slate-500">{day.date}</span>
    </div>
    <div className="p-6 space-y-4">
      <div className="flex gap-4">
        <div className="w-8 flex flex-col items-center">
          <div className="w-2 h-2 rounded-full bg-amber-400 mt-2"></div>
          <div className="w-0.5 h-full bg-slate-100 my-1"></div>
        </div>
        <div>
          <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Sabah</h5>
          <p className="text-slate-700 text-sm leading-relaxed">{day.morning}</p>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="w-8 flex flex-col items-center">
          <div className="w-2 h-2 rounded-full bg-indigo-400 mt-2"></div>
          <div className="w-0.5 h-full bg-slate-100 my-1"></div>
        </div>
        <div>
          <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Öğleden Sonra</h5>
          <p className="text-slate-700 text-sm leading-relaxed">{day.afternoon}</p>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="w-8 flex flex-col items-center">
          <div className="w-2 h-2 rounded-full bg-slate-800 mt-2"></div>
        </div>
        <div>
          <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Akşam</h5>
          <p className="text-slate-700 text-sm leading-relaxed">{day.evening}</p>
        </div>
      </div>
      
      <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-500 text-xs">
          <i className="fa-solid fa-wallet"></i>
          Tahmini: <span className="font-bold text-slate-800">{day.estimatedCost} €</span>
        </div>
        {day.transportation && (
           <div className="flex items-center gap-2 text-indigo-600 text-xs font-medium">
             <i className="fa-solid fa-van-shuttle"></i>
             {day.transportation}
           </div>
        )}
      </div>
    </div>
  </div>
);

const ItineraryResult: React.FC<ItineraryResultProps> = ({ response, onReset }) => {
  const [activeIdx, setActiveIdx] = React.useState(0);
  const [copied, setCopied] = React.useState(false);
  const data = response.itineraries[activeIdx];

  const handleShare = () => {
    const text = `
🌍 GlobePlan AI - Seyahat Planım: ${data.tripTitle}
--------------------------------------
📍 Rota: ${data.destinations.map(d => `${d.city}, ${d.country}`).join(' -> ')}
💰 Toplam Tahmini Bütçe: ${data.totalEstimatedCost} €

📝 Özet: ${data.tripSummary}

📅 Günlük Plan:
${data.dailyPlans.map(day => `
GÜN ${day.day} (${day.city}):
- Sabah: ${day.morning}
- Öğleden Sonra: ${day.afternoon}
- Akşam: ${day.evening}
`).join('\n')}

💡 İpuçları:
${data.tips.map(tip => `- ${tip}`).join('\n')}

Planı GlobePlan AI ile oluşturdum!
    `.trim();

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 print:bg-white print:p-0">
      {/* Selection Tabs - Hidden on print */}
      <div className="flex flex-col items-center space-y-4 print:hidden">
        <h3 className="text-slate-500 font-semibold uppercase tracking-widest text-xs">Sizin İçin Hazırladığımız Rotalar</h3>
        <div className="flex p-1 bg-slate-200/50 backdrop-blur rounded-2xl w-full max-w-2xl overflow-x-auto no-scrollbar">
          {response.itineraries.map((it, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              className={`flex-1 min-w-[120px] py-3 px-4 rounded-xl font-bold text-sm transition-all duration-300 ${
                activeIdx === idx 
                ? 'bg-white text-indigo-600 shadow-lg scale-100' 
                : 'text-slate-500 hover:text-slate-700 scale-95 opacity-70'
              }`}
            >
              Rota {idx + 1}
              <span className="block text-[10px] font-medium opacity-60 truncate">{it.tripTitle}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 relative overflow-hidden print:shadow-none print:border-none">
        <div className="absolute top-0 right-0 p-8 opacity-5 print:hidden">
          <i className="fa-solid fa-passport text-9xl -rotate-12"></i>
        </div>
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <h2 className="text-4xl font-extrabold text-slate-900 mb-2">{data.tripTitle}</h2>
              <div className="flex flex-wrap gap-2">
                {data.destinations.map((d, i) => (
                  <span key={i} className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold print:bg-slate-100">
                    {d.city}, {d.country} ({d.duration} G)
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-slate-900 text-white px-6 py-3 rounded-2xl flex items-center gap-3 print:bg-slate-200 print:text-black">
              <i className="fa-solid fa-coins text-amber-400 print:text-amber-600"></i>
              <div>
                <p className="text-[10px] uppercase tracking-wider opacity-60">Tahmini Toplam</p>
                <p className="text-xl font-bold">{data.totalEstimatedCost} €</p>
              </div>
            </div>
          </div>
          <p className="text-slate-600 text-lg leading-relaxed border-l-4 border-indigo-500 pl-6 py-2">
            {data.tripSummary}
          </p>

          {/* Quick Actions - Hidden on print */}
          <div className="mt-8 flex flex-wrap gap-3 print:hidden">
            <button 
              onClick={handleShare}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold transition-all ${
                copied ? 'bg-green-500 text-white' : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              <i className={`fa-solid ${copied ? 'fa-check' : 'fa-share-nodes'}`}></i>
              {copied ? 'Plan Kopyalandı!' : 'Planı Paylaş (WhatsApp/Metin)'}
            </button>
            <button 
              onClick={handlePrint}
              className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-900 transition-all"
            >
              <i className="fa-solid fa-print"></i>
              Yazdır / PDF Kaydet
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <i className="fa-solid fa-calendar-day text-indigo-600 print:hidden"></i>
            Günlük Plan
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 print:grid-cols-1">
            {data.dailyPlans.map((day) => (
              <DayCard key={day.day} day={day} />
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-amber-50 rounded-3xl p-6 border border-amber-100 print:bg-white print:border-slate-200">
            <h3 className="text-xl font-bold text-amber-900 mb-4 flex items-center gap-2">
              <i className="fa-solid fa-lightbulb print:hidden"></i>
              Önemli İpuçları
            </h3>
            <ul className="space-y-4">
              {data.tips.map((tip, i) => (
                <li key={i} className="flex gap-3 text-sm text-amber-800 print:text-slate-800">
                  <span className="shrink-0 text-amber-500">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-indigo-900 rounded-3xl p-6 text-white text-center shadow-xl shadow-indigo-100 print:hidden">
            <h4 className="text-lg font-bold mb-2">Başka Bir Plan?</h4>
            <p className="text-indigo-200 text-sm mb-6">Tarihleri veya bütçeyi değiştirerek yeni bir plan oluşturabilirsin.</p>
            <button 
              onClick={onReset}
              className="w-full bg-white text-indigo-900 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-all active:scale-95"
            >
              Yeniden Başla
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItineraryResult;
