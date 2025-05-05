import { BotIndustry } from '../stores/botStore';

// Map industry codes to display names
export const industryNames: Record<BotIndustry, string> = {
  orthopedic_surgery_services: 'Orthopedic Surgery',
  cardiology_services: 'Cardiology',
  find_rental_property: 'Rental Property Search',
  internal_medicine_services: 'Internal Medicine',
  anesthesiology_services: 'Anesthesiology',
  cryotherapy_services: 'Cryotherapy',
  radiology_services: 'Radiology',
  oncology_services: 'Oncology',
  renovation_services: 'Renovation & Construction',
  emergency_numbers: 'Emergency Services',
  painting_services: 'Painting',
  driver_services: 'Driver & Transportation',
  roofing_services: 'Roofing',
  cook_services: 'Cooking & Catering',
  electrician_services: 'Electrician',
  car_rental: 'Car Rental',
  nanny_services: 'Childcare & Nanny',
  gp_services: 'General Practice Medicine',
  financial_services: 'Financial Services',
  plastic_surgery_services: 'Plastic Surgery',
  laser_skin_services: 'Laser Skin Treatments',
  tax_advisor_services: 'Tax Advisory',
  Visa_Consultant: 'Visa Consultancy',
  international_school_search: 'International Schools',
  pet_services: 'Pet Care',
  summer_school_programs: 'Summer School Programs',
  gas_connection: 'Gas Services',
  orthodontics_services: 'Orthodontics',
  rheumatology_services: 'Rheumatology',
  notary_services: 'Notary Services',
  emergency_medicine_services: 'Emergency Medicine',
  hair_services: 'Hair Styling & Care',
  ophthalmology_services: 'Ophthalmology',
  massage_services: 'Massage Therapy',
  banking_payment_setup: 'Banking & Payments',
  gardening_services: 'Gardening & Landscaping',
  barbershop_services: 'Barbershop',
  legal_advice_general: 'General Legal Advice',
  dermatology_services: 'Dermatology',
  pediatric_services: 'Pediatrics',
  oral_surgery_services: 'Oral Surgery',
  spa_services: 'Spa & Wellness',
  security_services: 'Security Services',
  business_setup: 'Business Setup',
  locksmith_services: 'Locksmith',
  psychiatry_services: 'Psychiatry',
  urology_services: 'Urology',
  ent_services: 'ENT (Ear, Nose & Throat)',
  gynecology_obstetrics_services: 'Gynecology & Obstetrics',
  gastroenterology_services: 'Gastroenterology',
  nails_lashes_services: 'Nails & Lashes',
  neurology_services: 'Neurology',
  physiotherapy_services: 'Physiotherapy',
  makeup_services: 'Makeup & Beauty',
  dentist_services: 'Dental Care',
  maid_services: 'Maid & Cleaning',
  hospital_services: 'Hospital Services',
  masonry_services: 'Masonry',
  digital_marketing_services: 'Digital Marketing',
  general_dentistry_services: 'General Dentistry',
  plumbing_services: 'Plumbing',
  currency_exchange_services: 'Currency Exchange',
  geriatric_services: 'Geriatric Care',
  cardiothoracic_surgery_services: 'Cardiothoracic Surgery',
  carpentry_services: 'Carpentry',
  legal_advice: 'Legal Services',
  alternative_medicine_services: 'Alternative Medicine',
  neurosurgery_services: 'Neurosurgery',
  health_insurance: 'Health Insurance',
  general_surgery_services: 'General Surgery',
  embassy_registration: 'Embassy Registration',
  license_conversion_process: 'License Conversion',
  pulmonology_services: 'Pulmonology',
  international_bank_services: 'International Banking',
  sports_medicine_services: 'Sports Medicine',
  electricity_installation: 'Electricity Installation',
  relocation_services: 'Relocation Services',
  tattoo_services: 'Tattoo & Body Art',
  temporary_housing: 'Temporary Housing',
  endocrinology_services: 'Endocrinology'
};

// Group industries by category for easier selection
export const industryCategories = {
  healthcare: [
    'orthopedic_surgery_services',
    'cardiology_services',
    'internal_medicine_services',
    'anesthesiology_services',
    'cryotherapy_services',
    'radiology_services',
    'oncology_services',
    'gp_services',
    'plastic_surgery_services',
    'laser_skin_services',
    'orthodontics_services',
    'rheumatology_services',
    'emergency_medicine_services',
    'ophthalmology_services',
    'dermatology_services',
    'pediatric_services',
    'oral_surgery_services',
    'psychiatry_services',
    'urology_services',
    'ent_services',
    'gynecology_obstetrics_services',
    'gastroenterology_services',
    'neurology_services',
    'physiotherapy_services',
    'dentist_services',
    'hospital_services',
    'general_dentistry_services',
    'geriatric_services',
    'cardiothoracic_surgery_services',
    'alternative_medicine_services',
    'neurosurgery_services',
    'health_insurance',
    'general_surgery_services',
    'pulmonology_services',
    'sports_medicine_services',
    'endocrinology_services'
  ],
  property: [
    'find_rental_property',
    'renovation_services',
    'painting_services',
    'roofing_services',
    'electrician_services',
    'gas_connection',
    'gardening_services',
    'masonry_services',
    'plumbing_services',
    'carpentry_services',
    'electricity_installation',
    'temporary_housing'
  ],
  services: [
    'driver_services',
    'cook_services',
    'car_rental',
    'nanny_services',
    'financial_services',
    'tax_advisor_services',
    'Visa_Consultant',
    'pet_services',
    'notary_services',
    'hair_services',
    'massage_services',
    'banking_payment_setup',
    'barbershop_services',
    'legal_advice_general',
    'spa_services',
    'security_services',
    'business_setup',
    'locksmith_services',
    'nails_lashes_services',
    'makeup_services',
    'maid_services',
    'digital_marketing_services',
    'currency_exchange_services',
    'legal_advice',
    'embassy_registration',
    'license_conversion_process',
    'international_bank_services',
    'relocation_services',
    'tattoo_services'
  ],
  education: [
    'international_school_search',
    'summer_school_programs'
  ],
  emergency: [
    'emergency_numbers'
  ]
} as const;

// Get industries in a category
export const getIndustriesByCategory = (category: keyof typeof industryCategories): BotIndustry[] => {
  return industryCategories[category] as BotIndustry[];
};

// Get all categories
export const getAllCategories = (): Array<keyof typeof industryCategories> => {
  return Object.keys(industryCategories) as Array<keyof typeof industryCategories>;
};

// Get category for an industry
export const getCategoryForIndustry = (industry: BotIndustry): keyof typeof industryCategories | undefined => {
  for (const [category, industries] of Object.entries(industryCategories)) {
    if ((industries as readonly string[]).includes(industry)) {
      return category as keyof typeof industryCategories;
    }
  }
  return undefined;
};

// Get icon name for industry category
export const getCategoryIcon = (category: keyof typeof industryCategories): string => {
  switch (category) {
    case 'healthcare':
      return 'Stethoscope';
    case 'property':
      return 'Home';
    case 'services':
      return 'Briefcase';
    case 'education':
      return 'GraduationCap';
    case 'emergency':
      return 'AlertTriangle';
    default:
      return 'CircleHelp';
  }
};