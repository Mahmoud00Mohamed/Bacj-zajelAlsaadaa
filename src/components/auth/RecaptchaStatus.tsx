import React from 'react';
import { useTranslation } from 'react-i18next';
import { Shield, AlertCircle, CheckCircle, Loader } from 'lucide-react';
import { useRecaptchaContext } from '../ui/RecaptchaProvider';

const RecaptchaStatus: React.FC = () => {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  const { isReady, isLoading, error } = useRecaptchaContext();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mt-2">
        <Loader size={12} className="animate-spin" />
        <span>{isRtl ? 'جاري تحميل الحماية...' : 'Loading security...'}</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center gap-2 text-xs text-red-500 mt-2">
        <AlertCircle size={12} />
        <span>{isRtl ? 'خطأ في تحميل الحماية' : 'Security loading error'}</span>
      </div>
    );
  }

  if (isReady) {
    return (
      <div className="flex items-center justify-center gap-2 text-xs text-green-600 mt-2">
        <CheckCircle size={12} />
        <span>{isRtl ? 'الحماية نشطة' : 'Security active'}</span>
      </div>
    );
  }

  return null;
};

export default RecaptchaStatus;