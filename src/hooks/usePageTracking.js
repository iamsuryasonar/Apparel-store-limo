import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Pushes a virtual page_view event to the GTM dataLayer
 * on every route change (SPA navigation).
 */
const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'page_view',
      page_location: window.location.href,
      page_path: location.pathname + location.search,
      page_title: document.title,
    });
  }, [location]);
};

export default usePageTracking;
