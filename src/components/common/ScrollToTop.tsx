import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

export const ScrollToTop = () => {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    // Only scroll to top on PUSH navigation (explicitly navigating to a new link)
    // On POP navigation (Back / Forward), allow browser history scroll restoration
    if (navigationType === 'POP') {
      return;
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    });
  }, [pathname, navigationType]);

  return null;
};
