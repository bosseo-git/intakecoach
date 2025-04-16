import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import { PricingProvider } from '../lib/pricingContext';
import { nextAuthClientConfig } from '../lib/nextAuthConfig';

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider 
      session={pageProps.session} 
      // Use our custom config to fix the localhost URL issue
      basePath={nextAuthClientConfig.basePath}
      baseUrl={nextAuthClientConfig.baseUrl}
    >
      <PricingProvider>
        <Component {...pageProps} />
      </PricingProvider>
    </SessionProvider>
  );
}

export default MyApp; 