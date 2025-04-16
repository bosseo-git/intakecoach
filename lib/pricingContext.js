import { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';

// Create the context
const PricingContext = createContext();

// Pricing provider component that will wrap around our app
export function PricingProvider({ children }) {
  const [billingInterval, setBillingInterval] = useState('monthly');
  const router = useRouter();
  
  // Sync the billing interval with URL parameters when the page loads
  useEffect(() => {
    const { billing } = router.query;
    if (billing === 'yearly' || billing === 'monthly') {
      setBillingInterval(billing);
    }
  }, [router.query]);

  // Function to change the billing interval and update URL
  const changeBillingInterval = (interval) => {
    setBillingInterval(interval);
    
    // Update URL with the new billing interval without navigating
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('billing', interval);
    window.history.replaceState({}, '', newUrl.toString());
  };

  return (
    <PricingContext.Provider value={{ billingInterval, changeBillingInterval }}>
      {children}
    </PricingContext.Provider>
  );
}

// Custom hook to use the pricing context
export function usePricing() {
  const context = useContext(PricingContext);
  if (context === undefined) {
    throw new Error('usePricing must be used within a PricingProvider');
  }
  return context;
}

// Pricing options data that can be shared across pages
export const pricingOptions = {
  basic: {
    name: 'Basic',
    description: 'Perfect for individuals and small practices',
    monthlyPrice: '$99',
    yearlyPrice: '$1,068',
    yearlyDiscount: 'Save 10%',
    monthlyPriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_BASIC_MONTHLY || 'price_basic_monthly',
    yearlyPriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_BASIC_YEARLY || 'price_basic_yearly',
    features: [
      'Single user license',
      'Basic intake forms',
      'Email support',
      'PDF exports',
      'Client portal',
      'Form templates',
    ],
  },
  professional: {
    name: 'Professional',
    description: 'Designed for growing practices',
    monthlyPrice: '$289',
    yearlyPrice: '$2,628',
    yearlyDiscount: 'Save 24%',
    monthlyPriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO_MONTHLY || 'price_pro_monthly',
    yearlyPriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO_YEARLY || 'price_pro_yearly',
    popular: true,
    features: [
      'Up to 5 users',
      'Advanced intake forms',
      'Priority support',
      'Custom branding',
      'Client portal',
      'Electronic signatures',
      'Custom form fields',
      'Form logic and conditionals',
      'Automated workflows',
    ],
  },
  enterprise: {
    name: 'Enterprise',
    description: 'For large practices and clinics',
    monthlyPrice: '$449',
    yearlyPrice: '$3,772',
    yearlyDiscount: 'Save 30%',
    monthlyPriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE_MONTHLY || 'price_enterprise_monthly',
    yearlyPriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE_YEARLY || 'price_enterprise_yearly',
    features: [
      'Unlimited users',
      'All Professional features',
      'Dedicated account manager',
      'API access',
      'HIPAA compliance',
      'White labeling',
      'Custom integrations',
      'Advanced analytics',
      'Priority feature requests',
      'Onboarding training',
    ],
  },
}; 