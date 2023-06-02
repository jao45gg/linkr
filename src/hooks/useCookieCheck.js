import { useEffect, useState } from 'react';

const useCookieCheck = () => {
  const [cookiesAccepted, setCookiesAccepted] = useState(false);

  useEffect(() => {
    setCookiesAccepted(navigator.cookieEnabled);
  }, []);

  return cookiesAccepted;
};

export default useCookieCheck;