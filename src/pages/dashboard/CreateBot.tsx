import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../stores/authStore';
import { useBotStore, BotIndustry } from '../../stores/botStore';
import { 
  Search, 
  Check, 
  X, 
  ChevronRight, 
  ChevronLeft, 
  StepForward,
  Globe,
  FileText,
  Tag,
  Settings
} from 'lucide-react';
import { 
  industryNames, 
  getAllCategories, 
  getIndustriesByCategory, 
  getCategoryIcon 
} from '../../utils/industryUtils';

// Step type definition
type Step = 'basics' | 'industry' | 'goals' | 'languages' | 'review';

const CreateBot = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { createBot } = useBotStore();
  
  const [currentStep, setCurrentStep] = useState<Step>('basics');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Form state
  const [botName, setBotName] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState<BotIndustry | null>(null);
  const [botGoal, setBotGoal] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([i18n.language]);
  
  // Available languages
  const availableLanguages = [
    { code: 'en', name: t('languages.en') },
    { code: 'fr', name: t('languages.fr') },
    { code: 'it', name: t('languages.it') },
    { code: 'es', name: t('languages.es') },
    { code: 'ru', name: t('languages.ru') },
    { code: 'ar', name: t('languages.ar') },
    { code: 'th', name: t('languages.th') },
  ];
  
  // Check if current step is valid
  const isStepValid = () => {
    switch (currentStep) {
      case 'basics':
        return botName.trim().length > 0;
      case 'industry':
        return selectedIndustry !== null;
      case 'goals':
        return botGoal.trim().length > 0;
      case 'languages':
        return selectedLanguages.length > 0;
      case 'review':
        return true;
      default:
        return false;
    }
  };
  
  // Go to next step
  const nextStep = () => {
    if (!isStepValid()) return;
    
    switch (currentStep) {
      case 'basics':
        setCurrentStep('industry');
        break;
      case 'industry':
        setCurrentStep('goals');
        break;
      case 'goals':
        setCurrentStep('languages');
        break;
      case 'languages':
        setCurrentStep('review');
        break;
      default:
        break;
    }
  };
  
  // Go to previous step
  const prevStep = () => {
    switch (currentStep) {
      case 'industry':
        setCurrentStep('basics');
        break;
      case 'goals':
        setCurrentStep('industry');
        break;
      case 'languages':
        setCurrentStep('goals');
        break;
      case 'review':
        setCurrentStep('languages');
        break;
      default:
        break;
    }
  };
  
  // Submit the form
  const handleSubmit = () => {
    if (!user || !selectedIndustry) return;
    
    createBot({
      name: botName,
      userId: user.id,
      industry: selectedIndustry,
      goal: botGoal,
      languages: selectedLanguages,
      active: true,
    });
    
    navigate('/bots');
  };
  
  // Toggle language selection
  const toggleLanguage = (code: string) => {
    if (selectedLanguages.includes(code)) {
      setSelectedLanguages(selectedLanguages.filter(lang => lang !== code));
    } else {
      setSelectedLanguages([...selectedLanguages, code]);
    }
  };
  
  // Filter industries based on search term
  const filteredIndustries = Object.entries(industryNames)
    .filter(([code, name]) => 
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      code.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
  // Render the current step
  const renderStep = () => {
    switch (currentStep) {
      case 'basics':
        return renderBasicsStep();
      case 'industry':
        return renderIndustryStep();
      case 'goals':
        return renderGoalsStep();
      case 'languages':
        return renderLanguagesStep();
      case 'review':
        return renderReviewStep();
      default:
        return null;
    }
  };
  
  // Render the progress indicator
  const renderProgressIndicator = () => {
    const steps: { key: Step; icon: JSX.Element; label: string }[] = [
      { key: 'basics', icon: <FileText className="h-5 w-5" />, label: t('createBot.steps.basics') },
      { key: 'industry', icon: <Tag className="h-5 w-5" />, label: t('createBot.steps.industry') },
      { key: 'goals', icon: <Settings className="h-5 w-5" />, label: t('createBot.steps.goals') },
      { key: 'languages', icon: <Globe className="h-5 w-5" />, label: t('createBot.steps.languages') },
      { key: 'review', icon: <Check className="h-5 w-5" />, label: t('createBot.steps.review') },
    ];
    
    return (
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, i) => (
            <div key={step.key} className="flex flex-col items-center">
              <div 
                className={`flex items-center justify-center h-10 w-10 rounded-full ${
                  currentStep === step.key 
                    ? 'bg-blue-600 text-white' 
                    : i < steps.findIndex(s => s.key === currentStep) 
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-gray-100 text-gray-400'
                } mb-2`}
              >
                {step.icon}
              </div>
              <span className={`text-xs ${
                currentStep === step.key 
                  ? 'text-blue-600 font-medium' 
                  : 'text-gray-500'
              }`}>
                {step.label}
              </span>
              
              {/* Connecting line */}
              {i < steps.length - 1 && (
                <div className="hidden sm:block absolute left-0 top-0 w-full">
                  <div className={`h-0.5 ${
                    i < steps.findIndex(s => s.key === currentStep) 
                      ? 'bg-blue-600' 
                      : 'bg-gray-200'
                  }`} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  // Render the basics step
  const renderBasicsStep = () => {
    return (
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          {t('createBot.steps.basics')}
        </h2>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="botName" className="block text-sm font-medium text-gray-700">
              {t('createBot.fields.name')} <span className="text-red-500">*</span>
            </label>
            <p className="text-sm text-gray-500 mb-1">
              {t('createBot.fields.nameDescription')}
            </p>
            <input
              type="text"
              id="botName"
              value={botName}
              onChange={(e) => setBotName(e.target.value)}
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="e.g., Customer Support Bot"
            />
          </div>
        </div>
      </div>
    );
  };
  
  // Render the industry step
  const renderIndustryStep = () => {
    return (
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          {t('createBot.steps.industry')}
        </h2>
        
        <div className="space-y-6">
          <div>
            <label htmlFor="industrySearch" className="block text-sm font-medium text-gray-700">
              {t('createBot.fields.industry')} <span className="text-red-500">*</span>
            </label>
            <p className="text-sm text-gray-500 mb-1">
              {t('createBot.fields.industryDescription')}
            </p>
            
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="industrySearch"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder={`${t('common.search')} ${t('bots.industry')}...`}
              />
            </div>
          </div>
          
          {/* Industry categories */}
          {searchTerm === '' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {getAllCategories().map(category => {
                const IconComponent = getCategoryIcon(category);
                const isSelected = selectedCategory === category;
                
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(isSelected ? null : category)}
                    className={`flex items-center p-4 rounded-lg border ${
                      isSelected 
                        ? 'bg-blue-50 border-blue-200' 
                        : 'bg-white border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className={`p-2 rounded-full ${
                      isSelected ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {/* Using a placeholder icon since we don't actually have the category icons */}
                      <Tag className="h-5 w-5" />
                    </div>
                    <span className={`ml-3 font-medium ${
                      isSelected ? 'text-blue-600' : 'text-gray-700'
                    }`}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
          
          {/* Industry list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
            {(searchTerm !== '' ? filteredIndustries : selectedCategory 
              ? getIndustriesByCategory(selectedCategory).map(industry => [industry, industryNames[industry]])
              : []
            ).map(([code, name]) => {
              const isSelected = selectedIndustry === code;
              
              return (
                <button
                  key={code}
                  onClick={() => setSelectedIndustry(isSelected ? null : code as BotIndustry)}
                  className={`flex items-center p-4 rounded-lg border ${
                    isSelected 
                      ? 'bg-blue-50 border-blue-200' 
                      : 'bg-white border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className={`h-5 w-5 flex-shrink-0 ${isSelected ? 'text-blue-600' : 'text-gray-400'}`}>
                    {isSelected ? <Check className="h-5 w-5" /> : null}
                  </div>
                  <span className={`ml-3 ${isSelected ? 'font-medium text-blue-600' : 'text-gray-700'}`}>
                    {name}
                  </span>
                </button>
              );
            })}
          </div>
          
          {searchTerm !== '' && filteredIndustries.length === 0 && (
            <div className="text-center py-6">
              <p className="text-gray-500">No industries found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  // Render the goals step
  const renderGoalsStep = () => {
    return (
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          {t('createBot.steps.goals')}
        </h2>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="botGoal" className="block text-sm font-medium text-gray-700">
              {t('createBot.fields.goal')} <span className="text-red-500">*</span>
            </label>
            <p className="text-sm text-gray-500 mb-1">
              {t('createBot.fields.goalDescription')}
            </p>
            <textarea
              id="botGoal"
              value={botGoal}
              onChange={(e) => setBotGoal(e.target.value)}
              rows={4}
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="e.g., Help customers book appointments and answer common questions about services"
            />
          </div>
        </div>
      </div>
    );
  };
  
  // Render the languages step
  const renderLanguagesStep = () => {
    return (
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          {t('createBot.steps.languages')}
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t('createBot.fields.languages')} <span className="text-red-500">*</span>
            </label>
            <p className="text-sm text-gray-500 mb-1">
              {t('createBot.fields.languagesDescription')}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-3">
              {availableLanguages.map(language => {
                const isSelected = selectedLanguages.includes(language.code);
                
                return (
                  <button
                    key={language.code}
                    type="button"
                    onClick={() => toggleLanguage(language.code)}
                    className={`flex items-center p-4 rounded-lg border ${
                      isSelected 
                        ? 'bg-blue-50 border-blue-200' 
                        : 'bg-white border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className={`h-5 w-5 flex-shrink-0 ${isSelected ? 'text-blue-600' : 'text-gray-400'}`}>
                      {isSelected ? <Check className="h-5 w-5" /> : null}
                    </div>
                    <span className={`ml-3 ${isSelected ? 'font-medium text-blue-600' : 'text-gray-700'}`}>
                      {language.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Render the review step
  const renderReviewStep = () => {
    return (
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          {t('createBot.review.title')}
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          {t('createBot.review.description')}
        </p>
        
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {botName}
            </h3>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  {t('bots.name')}
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {botName}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  {t('bots.industry')}
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {selectedIndustry ? industryNames[selectedIndustry] : ''}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  {t('bots.goal')}
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {botGoal}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  {t('bots.languages')}
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <div className="flex flex-wrap gap-2">
                    {selectedLanguages.map(code => (
                      <span 
                        key={code} 
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {t(`languages.${code}`)}
                      </span>
                    ))}
                  </div>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="space-y-8">
      {/* Progress indicator */}
      {renderProgressIndicator()}
      
      {/* Content */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        {renderStep()}
        
        {/* Navigation buttons */}
        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 'basics'}
            className={`inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 ${
              currentStep === 'basics'
                ? 'bg-gray-100 cursor-not-allowed'
                : 'bg-white hover:bg-gray-50'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            {t('common.back')}
          </button>
          
          {currentStep === 'review' ? (
            <button
              type="button"
              onClick={handleSubmit}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {t('common.create')}
              <Check className="h-4 w-4 ml-1" />
            </button>
          ) : (
            <button
              type="button"
              onClick={nextStep}
              disabled={!isStepValid()}
              className={`inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
                isStepValid()
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-blue-400 cursor-not-allowed'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            >
              {t('common.next')}
              <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateBot;