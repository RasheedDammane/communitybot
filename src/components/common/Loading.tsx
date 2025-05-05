import { Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Loading = () => {
  const { t } = useTranslation();
  
  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-8">
      <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
      <p className="mt-4 text-gray-600">{t('common.loading')}</p>
    </div>
  );
};

export default Loading;