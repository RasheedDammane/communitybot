import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type BotIndustry = 
  'orthopedic_surgery_services' | 'cardiology_services' | 'find_rental_property' | 
  'internal_medicine_services' | 'anesthesiology_services' | 'cryotherapy_services' | 
  'radiology_services' | 'oncology_services' | 'renovation_services' | 
  'emergency_numbers' | 'painting_services' | 'driver_services' | 
  'roofing_services' | 'cook_services' | 'electrician_services' | 
  'car_rental' | 'nanny_services' | 'gp_services' | 
  'financial_services' | 'plastic_surgery_services' | 'laser_skin_services' | 
  'tax_advisor_services' | 'Visa_Consultant' | 'international_school_search' | 
  'pet_services' | 'summer_school_programs' | 'gas_connection' | 
  'orthodontics_services' | 'rheumatology_services' | 'notary_services' | 
  'emergency_medicine_services' | 'hair_services' | 'ophthalmology_services' | 
  'massage_services' | 'banking_payment_setup' | 'gardening_services' | 
  'barbershop_services' | 'legal_advice_general' | 'dermatology_services' | 
  'pediatric_services' | 'oral_surgery_services' | 'spa_services' | 
  'security_services' | 'business_setup' | 'locksmith_services' | 
  'psychiatry_services' | 'urology_services' | 'ent_services' | 
  'gynecology_obstetrics_services' | 'gastroenterology_services' | 'nails_lashes_services' | 
  'neurology_services' | 'physiotherapy_services' | 'makeup_services' | 
  'dentist_services' | 'maid_services' | 'hospital_services' | 
  'masonry_services' | 'digital_marketing_services' | 'general_dentistry_services' | 
  'plumbing_services' | 'currency_exchange_services' | 'geriatric_services' | 
  'cardiothoracic_surgery_services' | 'carpentry_services' | 'legal_advice' | 
  'alternative_medicine_services' | 'neurosurgery_services' | 'health_insurance' | 
  'general_surgery_services' | 'embassy_registration' | 'license_conversion_process' | 
  'pulmonology_services' | 'international_bank_services' | 'sports_medicine_services' | 
  'electricity_installation' | 'relocation_services' | 'tattoo_services' | 
  'temporary_housing' | 'endocrinology_services';

export interface Bot {
  id: string;
  name: string;
  userId: string;
  industry: BotIndustry;
  goal: string;
  languages: string[];
  active: boolean;
  createdAt: string;
  updatedAt: string;
  metrics: {
    interactions: number;
    successRate: number;
    averageConversationLength: number;
  };
}

interface BotState {
  bots: Bot[];
  createBot: (bot: Omit<Bot, 'id' | 'createdAt' | 'updatedAt' | 'metrics'>) => void;
  updateBot: (id: string, updates: Partial<Bot>) => void;
  deleteBot: (id: string) => void;
  getBotsByUserId: (userId: string) => Bot[];
  getIndustryCount: () => Record<BotIndustry, number>;
}

// Sample bot data
const SAMPLE_BOTS: Bot[] = [
  {
    id: '1',
    name: 'Medical Assistant',
    userId: '1', // Admin user
    industry: 'general_surgery_services',
    goal: 'Help patients book appointments and answer common questions',
    languages: ['en', 'fr'],
    active: true,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    metrics: {
      interactions: 1237,
      successRate: 87,
      averageConversationLength: 4.3,
    },
  },
  {
    id: '2',
    name: 'Property Finder',
    userId: '1', // Admin user
    industry: 'find_rental_property',
    goal: 'Help users find rental properties based on their preferences',
    languages: ['en', 'fr', 'es'],
    active: true,
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days ago
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    metrics: {
      interactions: 2158,
      successRate: 92,
      averageConversationLength: 6.7,
    },
  },
  {
    id: '3',
    name: 'Financial Advisor',
    userId: '2', // Regular user
    industry: 'financial_services',
    goal: 'Provide financial advice and help with budget planning',
    languages: ['en', 'fr', 'it'],
    active: false,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    metrics: {
      interactions: 458,
      successRate: 75,
      averageConversationLength: 8.2,
    },
  },
];

export const useBotStore = create<BotState>()(
  persist(
    (set, get) => ({
      bots: SAMPLE_BOTS,
      
      createBot: (botData) => {
        const newBot: Bot = {
          ...botData,
          id: `bot_${Date.now()}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          metrics: {
            interactions: 0,
            successRate: 0,
            averageConversationLength: 0,
          },
        };
        
        set(state => ({ 
          bots: [...state.bots, newBot] 
        }));
      },
      
      updateBot: (id, updates) => {
        set(state => ({
          bots: state.bots.map(bot => 
            bot.id === id 
              ? { 
                  ...bot, 
                  ...updates, 
                  updatedAt: new Date().toISOString() 
                } 
              : bot
          )
        }));
      },
      
      deleteBot: (id) => {
        set(state => ({
          bots: state.bots.filter(bot => bot.id !== id)
        }));
      },
      
      getBotsByUserId: (userId) => {
        return get().bots.filter(bot => bot.userId === userId);
      },

      getIndustryCount: () => {
        const counts = {} as Record<BotIndustry, number>;
        
        get().bots.forEach(bot => {
          counts[bot.industry] = (counts[bot.industry] || 0) + 1;
        });
        
        return counts;
      },
    }),
    {
      name: 'bot-storage',
    }
  )
);