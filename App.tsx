
import React from 'react';
import Layout from './components/Layout';
import ContinentSelection from './components/ContinentSelection';
import TravelForm from './components/TravelForm';
import ChoiceStep from './components/ChoiceStep';
import LoadingState from './components/LoadingState';
import ItineraryResult from './components/ItineraryResult';
import { TravelPreferences, ItineraryResponse, AppStep } from './types';
import { generateTravelItinerary } from './services/geminiService';

const App: React.FC = () => {
  const [step, setStep] = React.useState<AppStep>('continent-choice');
  const [prefs, setPrefs] = React.useState<Partial<TravelPreferences>>({});
  const [itineraryResponse, setItineraryResponse] = React.useState<ItineraryResponse | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const calculateDuration = (start: string, end: string) => {
    if (!start || !end) return 0;
    const s = new Date(start);
    const e = new Date(end);
    const diffTime = Math.abs(e.getTime() - s.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  const handleContinentSelect = (continent: string) => {
    setPrefs({ continent });
    setStep('form');
  };

  const handleInitialForm = (data: Partial<TravelPreferences>) => {
    const duration = calculateDuration(data.startDate!, data.endDate!);
    const updatedPrefs = { ...prefs, ...data };
    setPrefs(updatedPrefs);

    if (duration > 2) {
      setStep('choice');
    } else {
      startGeneration({ ...updatedPrefs, isMultiCountry: false } as TravelPreferences);
    }
  };

  const handleChoice = (isMulti: boolean) => {
    startGeneration({ ...prefs, isMultiCountry: isMulti } as TravelPreferences);
  };

  const handleBackToContinent = () => {
    setStep('continent-choice');
  };

  const handleBackToForm = () => {
    setStep('form');
  };

  const startGeneration = async (finalPrefs: TravelPreferences) => {
    setStep('loading');
    setError(null);
    try {
      const result = await generateTravelItinerary(finalPrefs);
      setItineraryResponse(result);
      setStep('result');
    } catch (err) {
      setError(err instanceof Error ? err.message : "Beklenmedik bir hata oluştu.");
      setStep('form');
    }
  };

  const reset = () => {
    setStep('continent-choice');
    setPrefs({});
    setItineraryResponse(null);
    setError(null);
  };

  return (
    <Layout>
      {error && (
        <div className="max-w-xl mx-auto mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl flex items-center gap-3 animate-bounce">
          <i className="fa-solid fa-circle-exclamation"></i>
          {error}
        </div>
      )}

      {step === 'continent-choice' && <ContinentSelection onSelect={handleContinentSelect} />}

      {step === 'form' && (
        <TravelForm 
          continent={prefs.continent || ''} 
          onBack={handleBackToContinent} 
          onSubmit={handleInitialForm} 
        />
      )}
      
      {step === 'choice' && (
        <ChoiceStep 
          duration={calculateDuration(prefs.startDate!, prefs.endDate!)} 
          onChoice={handleChoice} 
          onBack={handleBackToForm}
        />
      )}

      {step === 'loading' && <LoadingState />}

      {step === 'result' && itineraryResponse && (
        <ItineraryResult response={itineraryResponse} onReset={reset} />
      )}
    </Layout>
  );
};

export default App;
