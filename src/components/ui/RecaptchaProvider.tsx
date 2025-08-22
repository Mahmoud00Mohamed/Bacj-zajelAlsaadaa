import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ensureRecaptchaLoaded, isRecaptchaReady } from '../../utils/recaptchaLoader';

interface RecaptchaContextType {
  isReady: boolean;
  isLoading: boolean;
  error: string | null;
}

const RecaptchaContext = createContext<RecaptchaContextType | undefined>(undefined);

interface RecaptchaProviderProps {
  children: ReactNode;
}

export const RecaptchaProvider: React.FC<RecaptchaProviderProps> = ({ children }) => {
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRecaptcha = async () => {
      try {
        await ensureRecaptchaLoaded();
        setIsReady(true);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load reCAPTCHA');
        console.error('reCAPTCHA loading error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadRecaptcha();
  }, []);

  return (
    <RecaptchaContext.Provider value={{ isReady, isLoading, error }}>
      {children}
    </RecaptchaContext.Provider>
  );
};

export const useRecaptchaContext = () => {
  const context = useContext(RecaptchaContext);
  if (!context) {
    throw new Error('useRecaptchaContext must be used within a RecaptchaProvider');
  }
  return context;
};