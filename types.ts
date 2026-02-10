
export interface TravelPreferences {
  continent: string;
  startDate: string;
  endDate: string;
  budget: number;
  currency: string;
  isMultiCountry: boolean;
  departureCountry: string;
  interests: string;
  companionType: string;
  numberOfPeople: number;
}

export interface DayPlan {
  day: number;
  date: string;
  city: string;
  country: string;
  activity: string;
  morning: string;
  afternoon: string;
  evening: string;
  estimatedCost: number;
  transportation: string;
}

export interface Itinerary {
  tripTitle: string;
  tripSummary: string;
  totalEstimatedCost: number;
  destinations: {
    country: string;
    city: string;
    duration: number;
  }[];
  dailyPlans: DayPlan[];
  tips: string[];
}

export interface ItineraryResponse {
  itineraries: Itinerary[];
}

export type AppStep = 'continent-choice' | 'form' | 'choice' | 'loading' | 'result';
