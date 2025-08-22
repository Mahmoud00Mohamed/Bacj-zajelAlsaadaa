import { ensureRecaptchaLoaded } from './recaptchaLoader';

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

const RECAPTCHA_SITE_KEY = '6LfAOJcrAAAAANmEBoqPEB2dBT8iUddJoRl_KnUv';

export const executeRecaptcha = async (action: string): Promise<string> => {
  // Ensure reCAPTCHA is loaded first
  await ensureRecaptchaLoaded();

  return new Promise((resolve, reject) => {
    if (!window.grecaptcha) {
      reject(new Error('reCAPTCHA not loaded'));
      return;
    }

    window.grecaptcha.ready(() => {
      window.grecaptcha
        .execute(RECAPTCHA_SITE_KEY, { action })
        .then((token) => {
          resolve(token);
        })
        .catch((error) => {
          console.error('reCAPTCHA execution failed:', error);
          reject(error);
        });
    });
  });
};

export const getRecaptchaToken = async (action: string): Promise<string> => {
  try {
    // Add a small delay to ensure the user interaction is registered
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const token = await executeRecaptcha(action);
    
    if (!token) {
      throw new Error('Empty reCAPTCHA token received');
    }
    
    return token;
  } catch (error) {
    console.error('Failed to get reCAPTCHA token:', error);
    throw new Error('reCAPTCHA verification failed. Please try again.');
  }
};