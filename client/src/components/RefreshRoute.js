import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function RedirectOnRefresh() {
  const navigate = useNavigate();

  useEffect(() => {
    const navigationEntries = window.performance.getEntriesByType("navigation");
    if (navigationEntries.length > 0 && navigationEntries[0].type === 'reload') {
      navigate('/'); // Redirect to homepage
    }
  }, []);

  return null;
}

export default RedirectOnRefresh;
