import React from 'react';
import { useTranslation } from 'react-i18next';
import { Shield } from 'lucide-react';

const RecaptchaBadge: React.FC = () => {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  return (
    <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mt-4">
      <Shield size={12} className="text-green-500" />
      <span>
        {isRtl ? 'محمي بواسطة' : 'Protected by'}{' '}
        <a
          href="https://www.google.com/recaptcha/intro/v3.html"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-600 transition-colors"
        >
          reCAPTCHA
        </a>
      </span>
    </div>
  );
};

export default RecaptchaBadge;