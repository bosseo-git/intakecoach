import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PricingToggle from '../components/PricingToggle';
import { FiCheck } from 'react-icons/fi';
import { usePricing, pricingOptions } from '../lib/pricingContext';

export default function Pricing() {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingPlanId, setLoadingPlanId] = useState(null);
  const { billingInterval } = usePricing();
  
  const router = useRouter();
  const { data: session } = useSession();
  
  // If already logged in, redirect them to the dashboard
  if (session) {
    router.push('/dashboard');
    return null;
  }
  
  // Generate pricing plans based on the selected billing interval
  const pricingPlans = Object.values(pricingOptions).map(plan => {
    // Calculate monthly equivalent for annual plans
    const isYearly = billingInterval === 'yearly';
    const monthlyEquivalent = isYearly ? calculateMonthlyEquivalent(plan.yearlyPrice) : null;
    
    return {
      name: plan.name,
      description: plan.description,
      price: billingInterval === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice,
      interval: billingInterval === 'monthly' ? 'month' : 'year',
      priceId: billingInterval === 'monthly' ? plan.monthlyPriceId : plan.yearlyPriceId,
      popular: plan.popular,
      features: plan.features,
      yearlyDiscount: billingInterval === 'yearly' ? plan.yearlyDiscount : null,
      monthlyEquivalent: monthlyEquivalent,
    };
  });

  // Helper function to calculate monthly equivalent from yearly price
  function calculateMonthlyEquivalent(yearlyPrice) {
    // Remove currency symbol and commas, convert to number
    const numericPrice = parseFloat(yearlyPrice.replace(/[$,]/g, ''));
    // Divide by 12 and round to nearest cent
    const monthlyPrice = (numericPrice / 12).toFixed(2);
    // Format with currency symbol
    return `$${monthlyPrice}`;
  }
  
  const handlePurchase = async (priceId) => {
    setIsLoading(true);
    setLoadingPlanId(priceId);
    
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
        }),
      });
      
      const { url } = await response.json();
      
      // Redirect to Stripe Checkout
      router.push(url);
    } catch (error) {
      console.error('Error starting checkout:', error);
      alert('Failed to start checkout process. Please try again.');
      setIsLoading(false);
      setLoadingPlanId(null);
    }
  };
  
  return (
    <>
      <Head>
        <title>Pricing - IntakeCoach</title>
      </Head>
      
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that's right for your practice. All plans include a 14-day free trial.
          </p>
        </div>
        
        {/* Billing interval toggle */}
        <PricingToggle />
        
        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {pricingPlans.map((plan) => (
            <div 
              key={plan.name}
              className={`border rounded-lg overflow-hidden ${
                plan.popular 
                  ? 'border-blue-500 shadow-md relative' 
                  : 'border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="bg-blue-500 text-white text-sm font-medium text-center py-1">
                  Most Popular
                </div>
              )}
              
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2">{plan.name}</h2>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-600">/{plan.interval}</span>
                  
                  {plan.yearlyDiscount && (
                    <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      {plan.yearlyDiscount}
                    </span>
                  )}
                  
                  {plan.monthlyEquivalent && (
                    <div className="mt-2 text-sm text-gray-600">
                      Just {plan.monthlyEquivalent}/month, billed annually
                    </div>
                  )}
                </div>
                
                <button
                  onClick={() => handlePurchase(plan.priceId)}
                  disabled={isLoading && loadingPlanId === plan.priceId}
                  className={`w-full py-2 px-4 rounded-md font-medium transition ${
                    plan.popular
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                  }`}
                >
                  {isLoading && loadingPlanId === plan.priceId ? 'Processing...' : 'Purchase Plan'}
                </button>
              </div>
              
              <div className="bg-gray-50 p-6 border-t border-gray-200">
                <h3 className="font-medium mb-3">Features included:</h3>
                <ul className="space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <FiCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-3">
            All plans include:
          </h3>
          <div className="flex flex-wrap justify-center gap-6 max-w-3xl mx-auto">
            <div className="bg-white px-4 py-3 rounded-md shadow-sm border border-gray-200">
              <p className="font-medium">14-day free trial</p>
            </div>
            <div className="bg-white px-4 py-3 rounded-md shadow-sm border border-gray-200">
              <p className="font-medium">Cancel anytime</p>
            </div>
            <div className="bg-white px-4 py-3 rounded-md shadow-sm border border-gray-200">
              <p className="font-medium">Secure payment</p>
            </div>
            <div className="bg-white px-4 py-3 rounded-md shadow-sm border border-gray-200">
              <p className="font-medium">No setup fees</p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
} 