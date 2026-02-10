
import React from 'react';

interface ContinentSelectionProps {
  onSelect: (continent: string) => void;
}

const continents = [
  { id: 'Avrupa', name: 'Avrupa', icon: 'fa-earth-europe', color: 'from-blue-500 to-indigo-600', desc: 'Tarih, sanat ve klasik rotalar.' },
  { id: 'Asya', name: 'Asya', icon: 'fa-earth-asia', color: 'from-red-500 to-orange-600', desc: 'Egzotik kültürler ve modern metropoller.' },
  { id: 'Amerika', name: 'Amerika', icon: 'fa-earth-americas', color: 'from-green-500 to-emerald-600', desc: 'Vahşi doğa ve sınırsız macera.' },
  { id: 'Afrika', name: 'Afrika', icon: 'fa-earth-africa', color: 'from-yellow-500 to-amber-600', desc: 'Safari ve keşfedilmemiş topraklar.' },
  { id: 'Okyanusya', name: 'Okyanusya', icon: 'fa-water', color: 'from-cyan-500 to-blue-600', desc: 'Adalar, deniz ve huzur.' },
];

const ContinentSelection: React.FC<ContinentSelectionProps> = ({ onSelect }) => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Nereyi Keşfetmek İstersin?</h2>
        <p className="text-slate-600 text-lg">Macerana başlamak için bir kıta seç.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {continents.map((c) => (
          <button
            key={c.id}
            onClick={() => onSelect(c.id)}
            className="group relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-left border border-slate-100"
          >
            <div className={`h-24 bg-gradient-to-r ${c.color} p-6 flex justify-between items-start`}>
              <i className={`fa-solid ${c.icon} text-4xl text-white/80 group-hover:scale-110 transition-transform`}></i>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-slate-800 mb-2">{c.name}</h3>
              <p className="text-slate-500 text-sm">{c.desc}</p>
              <div className="mt-4 flex items-center gap-2 text-indigo-600 font-bold text-sm">
                Seç ve Devam Et
                <i className="fa-solid fa-chevron-right text-[10px]"></i>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ContinentSelection;
