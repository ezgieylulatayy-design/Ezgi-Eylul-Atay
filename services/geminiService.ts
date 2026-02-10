
import { GoogleGenAI, Type } from "@google/genai";
import { TravelPreferences, ItineraryResponse } from "../types";

const API_KEY = process.env.API_KEY || "";

export const generateTravelItinerary = async (prefs: TravelPreferences): Promise<ItineraryResponse> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const prompt = `
    ${prefs.continent} kıtası içinde birbirinden TAMAMEN FARKLI bölgelerde EN AZ 3 adet kişiselleştirilmiş seyahat rotası oluştur.
    Kalkış Ülkesi: ${prefs.departureCountry}
    Başlangıç Tarihi: ${prefs.startDate}
    Bitiş Tarihi: ${prefs.endDate}
    Kişi Sayısı: ${prefs.numberOfPeople}
    TOPLAM Bütçe Limitim (Tüm grup için): ${prefs.budget} ${prefs.currency}
    Kimle Gidiyorum: ${prefs.companionType}
    İlgi Alanları & Tercihler: ${prefs.interests || "Genel turistik gezi"}
    Birden Fazla Ülke İsteği: ${prefs.isMultiCountry ? "Evet" : "Hayır, tek ülke tercih ediyorum."}

    ÖNEMLİ KURALLAR:
    1. Üç rota da ${prefs.continent} kıtasında birbirinden tamamen farklı alt bölgeleri kapsamalıdır.
    2. Rotalar arasında şehir ve ülke tekrarı YAPMAMALIDIR. Her seçenek benzersiz bir deneyim sunmalıdır.
    3. Eğer kullanıcı "Birden Fazla Ülke" istediyse, rotalar farklı ülke kombinasyonları içermeli. Tek ülke istediyse 3 farklı popüler veya saklı kalmış şehir rotası sunulmalı.
    4. Bütçeyi ${prefs.numberOfPeople} kişi için konaklama, yemek ve ulaşım kalemlerine gerçekçi bir şekilde paylaştır. Belirtilen bütçe TOPLAM bütçedir.
    5. Rotaların her birine yaratıcı bir başlık ver.
    6. Dili Türkçe olsun. Toplam 3 farklı plan üret.
  `;

  const itinerarySchema = {
    type: Type.OBJECT,
    properties: {
      tripTitle: { type: Type.STRING },
      tripSummary: { type: Type.STRING },
      totalEstimatedCost: { type: Type.NUMBER },
      destinations: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            country: { type: Type.STRING },
            city: { type: Type.STRING },
            duration: { type: Type.NUMBER }
          },
          required: ["country", "city", "duration"]
        }
      },
      dailyPlans: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            day: { type: Type.NUMBER },
            date: { type: Type.STRING },
            city: { type: Type.STRING },
            country: { type: Type.STRING },
            morning: { type: Type.STRING },
            afternoon: { type: Type.STRING },
            evening: { type: Type.STRING },
            estimatedCost: { type: Type.NUMBER },
            transportation: { type: Type.STRING }
          },
          required: ["day", "date", "city", "country", "morning", "afternoon", "evening", "estimatedCost"]
        }
      },
      tips: {
        type: Type.ARRAY,
        items: { type: Type.STRING }
      }
    },
    required: ["tripTitle", "tripSummary", "totalEstimatedCost", "destinations", "dailyPlans", "tips"]
  };

  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      itineraries: {
        type: Type.ARRAY,
        items: itinerarySchema,
        minItems: 3
      }
    },
    required: ["itineraries"]
  };

  try {
    const result = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const text = result.text || "{}";
    return JSON.parse(text) as ItineraryResponse;
  } catch (error) {
    console.error("Gemini API Hatası:", error);
    throw new Error("Seyahat planları oluşturulurken bir hata oluştu.");
  }
};
