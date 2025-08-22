import { useState, useEffect } from 'react';
import { getRecaptchaToken } from '../utils/recaptcha';

interface UseRecaptchaOptions {
  action: string;
  autoExecute?: boolean;
}

export const useRecaptcha = (options: UseRecaptchaOptions) => {
  const { action, autoExecute = false } = options;
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const executeRecaptcha = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const newToken = await getRecaptchaToken(action);
      setToken(newToken);
      return newToken;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'reCAPTCHA failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (autoExecute) {
      executeRecaptcha();
    }
  }, [action, autoExecute]);

  return {
    token,
    isLoading,
    error,
    executeRecaptcha,
  };
};