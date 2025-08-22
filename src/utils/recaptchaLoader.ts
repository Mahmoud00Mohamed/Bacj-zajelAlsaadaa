/**
 * Utility to ensure reCAPTCHA is properly loaded before use
 */

let recaptchaLoaded = false;
let recaptchaPromise: Promise<void> | null = null;

export const ensureRecaptchaLoaded = (): Promise<void> => {
  if (recaptchaLoaded) {
    return Promise.resolve();
  }

  if (recaptchaPromise) {
    return recaptchaPromise;
  }

  recaptchaPromise = new Promise((resolve, reject) => {
    // Check if reCAPTCHA is already available
    if (window.grecaptcha) {
      recaptchaLoaded = true;
      resolve();
      return;
    }

    // Wait for reCAPTCHA to load
    const checkRecaptcha = () => {
      if (window.grecaptcha) {
        recaptchaLoaded = true;
        resolve();
      } else {
        setTimeout(checkRecaptcha, 100);
      }
    };

    // Start checking after a short delay
    setTimeout(checkRecaptcha, 100);

    // Timeout after 10 seconds
    setTimeout(() => {
      if (!recaptchaLoaded) {
        reject(new Error('reCAPTCHA failed to load'));
      }
    }, 10000);
  });

  return recaptchaPromise;
};

export const isRecaptchaReady = (): boolean => {
  return recaptchaLoaded && !!window.grecaptcha;
};