export const isEmbeddedBrowser = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  return (
    userAgent.includes('instagram') ||
    userAgent.includes('tiktok') ||
    userAgent.includes('fbav') ||
    userAgent.includes('fban') ||
    userAgent.includes('twitter')
  );
};

export const isIOS = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod/.test(userAgent);
};

export const handleBookingEmbedded = () => {
  const surveyUrl = '/survey';
  const redirectUrl = '/redirect-required';
  const fullURL = window.location.origin + surveyUrl;

  if (isEmbeddedBrowser()) {
    try {
      if (isIOS()) {
        // Try to open in Chrome for iOS first
        window.location.href = `googlechrome://${window.location.host}${surveyUrl}`;

        // First fallback: try x-safari URL scheme (iOS 17+)
        setTimeout(() => {
          window.location.href = `x-safari-${fullURL}`;

          // Second fallback: redirect page if neither worked
          setTimeout(() => {
            window.location.href = redirectUrl;
          }, 1000);
        }, 1000);
      } else {
        // Android - try to open in Chrome first
        const chromeIntent = `intent://${window.location.host}${surveyUrl}#Intent;scheme=https;package=com.android.chrome;end`;
        window.location.href = chromeIntent;

        // Fallback if Chrome intent doesn't work
        setTimeout(() => {
          window.location.href = redirectUrl;
        }, 1000);
      }
    } catch (e) {
      // If there's any error, fallback to redirect page
      window.location.href = redirectUrl;
    }
  } else {
    window.location.href = surveyUrl;
  }
};
