
import React from 'react';
import { TravelPreferences } from '../types';

interface TravelFormProps {
  continent: string;
  onBack: () => void;
  onSubmit: (data: Partial<TravelPreferences>) => void;
}

const TravelForm: React.FC<TravelFormProps> = ({ continent, onBack, onSubmit }) => {
  const [formData, setFormData] = React.useState({
    startDate: '',
    endDate: '',
    budget: '',
    currency: 'EUR',
    departureCountry: 'Türkiye',
    companionType: 'Tek Başına',
    numberOfPeople: '1',
    interests: ''
  });

  const countries = [
    "Türkiye", "Almanya", "Fransa", "İtalya", "İspanya", 
    "İngiltere", "Hollanda", "Amerika Birleşik Devletleri", "Japonya", "Tayland",
    "Yunanistan", "Mısır", "Brezilya", "Avustralya", "Güney Kore"
  ];

  const companions = [
    "Tek Başına", "Arkadaşlarım ile", "Sevgilim/Eşim ile", "Ailem ile", "İş Grubu"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.startDate || !formData.endDate || !formData.budget || !formData.departureCountry || !formData.numberOfPeople) {
      alert("Lütfen tüm alanları doldurun.");
      return;
    }
    onSubmit({
      startDate: formData.startDate,
      endDate: formData.endDate,
      budget: parseFloat(formData.budget),
      currency: formData.currency,
      departureCountry: formData.departureCountry,
      companionType: formData.companionType,
      numberOfPeople: parseInt(formData.numberOfPeople),
      interests: formData.interests
    });
  };

  return (
    <div className="max-w-xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button 
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-medium transition-colors group"
      >
        <i className="fa-solid fa-arrow-left transition-transform group-hover:-translate-x-1"></i>
        Kıta Seçimine Dön
      </button>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
        <div className="bg-indigo-600 px-8 py-10 text-white relative">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <i className="fa-solid fa-passport text-9xl"></i>
          </div>
          <h2 className="text-3xl font-bold mb-2">{continent} Maceranı Planla</h2>
          <p className="text-indigo-100 opacity-90">Bütçene ve tarzına göre en uygun rotayı bulalım.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Nereden?</label>
              <div className="relative">
                <select 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none appearance-none bg-white cursor-pointer"
                  value={formData.departureCountry}
                  onChange={(e) => setFormData({...formData, departureCountry: e.target.value})}
                >
                  {countries.map(c => <option key={c} value={c}>{c}</option>)}
                  <option value="Diğer">Diğer</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-400">
                  <i className="fa-solid fa-location-dot text-xs"></i>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Kimle Gidiyorsun?</label>
              <div className="relative">
                <select 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none appearance-none bg-white cursor-pointer"
                  value={formData.companionType}
                  onChange={(e) => setFormData({...formData, companionType: e.target.value})}
                >
                  {companions.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-400">
                  <i className="fa-solid fa-user-group text-xs"></i>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Gidiş Tarihi</label>
              <input 
                type="date" 
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                value={formData.startDate}
                onChange={(e) => setFormData({...formData, startDate: e.target.value})}
              />
            </div>
            <div className="md:col-span-1">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Dönüş Tarihi</label>
              <input 
                type="date" 
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                value={formData.endDate}
                onChange={(e) => setFormData({...formData, endDate: e.target.value})}
              />
            </div>
            <div className="md:col-span-1">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Kaç Kişi?</label>
              <div className="relative">
                <input 
                  type="number" 
                  min="1"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                  value={formData.numberOfPeople}
                  onChange={(e) => setFormData({...formData, numberOfPeople: e.target.value})}
                />
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-400">
                  <i className="fa-solid fa-users text-xs"></i>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">İlgi Alanların & Seyahat Tarzın</label>
            <input 
              type="text" 
              placeholder="Örn: Sanat, Gece Hayatı, Tarih, Gurme Lezzetler..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
              value={formData.interests}
              onChange={(e) => setFormData({...formData, interests: e.target.value})}
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-grow">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Toplam Bütçe Sınırı (Grup Toplamı)</label>
              <input 
                type="number" 
                placeholder="Örn: 1500"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                value={formData.budget}
                onChange={(e) => setFormData({...formData, budget: e.target.value})}
              />
            </div>
            <div className="w-32 relative">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Birim</label>
              <select 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none appearance-none bg-white cursor-pointer"
                value={formData.currency}
                onChange={(e) => setFormData({...formData, currency: e.target.value})}
              >
                <option value="EUR">EUR (€)</option>
                <option value="USD">USD ($)</option>
                <option value="TRY">TRY (₺)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 transform hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2"
          >
            Devam Et
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default TravelForm;
