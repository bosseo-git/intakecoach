import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { BuilderComponent, builder, Builder } from '@builder.io/react';
import { getBuilderContent } from '../lib/builderUtils';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import TotalCallInsightsSection from '../components/TotalCallInsightsSection';
import DetailedCallBreakdownSection from '../components/DetailedCallBreakdownSection';
import MarketingFluffSection from '../components/MarketingFluffSection';
import AutomatedMonitoringSection from '../components/AutomatedMonitoringSection';
import EffortlessIntegrationSection from '../components/EffortlessIntegrationSection';
import ConnectEverythingSection from '../components/ConnectEverythingSection';
import HowItWorksSection from '../components/HowItWorksSection';
import IndustryUseCasesSection from '../components/IndustryUseCasesSection';
import SalesPerformanceSection from '../components/SalesPerformanceSection';
import IntegrationsSection from '../components/IntegrationsSection';
import PricingSection from '../components/PricingSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import BuilderEditButton from '../components/BuilderEditButton';
import PricingToggle from '../components/PricingToggle';
import { usePricing, pricingOptions } from '../lib/pricingContext';
import { FiCheck } from 'react-icons/fi';

// Register your components with Builder.io so they can be used in the visual editor
Builder.registerComponent(HeroSection, { name: 'Hero Section' });
Builder.registerComponent(FeaturesSection, { name: 'Features Section' });
Builder.registerComponent(TotalCallInsightsSection, { name: 'Total Call Insights Section' });
Builder.registerComponent(DetailedCallBreakdownSection, { name: 'Detailed Call Breakdown Section' });
Builder.registerComponent(MarketingFluffSection, { name: 'Marketing Fluff Section' });
Builder.registerComponent(AutomatedMonitoringSection, { name: 'Automated Monitoring Section' });
Builder.registerComponent(EffortlessIntegrationSection, { name: 'Effortless Integration Section' });
Builder.registerComponent(ConnectEverythingSection, { name: 'Connect Everything Section' });
Builder.registerComponent(HowItWorksSection, { name: 'How It Works Section' });
Builder.registerComponent(IndustryUseCasesSection, { name: 'Industry Use Cases Section' });
Builder.registerComponent(SalesPerformanceSection, { name: 'Sales Performance Section' });
Builder.registerComponent(IntegrationsSection, { name: 'Integrations Section' });
Builder.registerComponent(PricingSection, { name: 'Pricing Section' });
Builder.registerComponent(ContactSection, { name: 'Contact Section' });

export default function Home({ builderContent }) {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingPlanId, setLoadingPlanId] = useState(null);
  const router = useRouter();

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
    <div>
      <Head>
        <title>IntakeCoach - Build Relationships, Not Todo Lists</title>
        <meta name="description" content="IntakeCoach - A comprehensive call analysis platform that helps you build relationships, not todo lists, with real-time insights and actionable analytics to drive sales performance." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      
      <main>
        {builderContent ? (
          // If we have Builder content, render that
          <BuilderComponent 
            model="page" 
            content={builderContent} 
          />
        ) : (
          // Otherwise, render our default sections
          <>
            <HeroSection />
            <TotalCallInsightsSection />
            <DetailedCallBreakdownSection />
            <MarketingFluffSection />
            <AutomatedMonitoringSection />
            <EffortlessIntegrationSection />
            <ConnectEverythingSection />
            <FeaturesSection />
            <HowItWorksSection />
            <SalesPerformanceSection />
            <IndustryUseCasesSection />
            <IntegrationsSection />
            
            {/* Updated Pricing Section */}
            <section className="py-20 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Transparent, Simple Pricing
                  </h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Choose the plan that works best for your practice.
                  </p>
                </div>
                
                <PricingToggle />
                
                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  {Object.values(pricingOptions).map((plan) => {
                    const { billingInterval } = usePricing();
                    const isYearly = billingInterval === 'yearly';
                    const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
                    const interval = isYearly ? 'year' : 'month';
                    const priceId = isYearly ? plan.yearlyPriceId : plan.monthlyPriceId;
                    const yearlyDiscount = isYearly ? plan.yearlyDiscount : null;
                    
                    // Calculate monthly equivalent for annual plans
                    const monthlyEquivalent = isYearly ? calculateMonthlyEquivalent(plan.yearlyPrice) : null;
                    
                    return (
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
                            <span className="text-4xl font-bold">{price}</span>
                            <span className="text-gray-600">/{interval}</span>
                            
                            {yearlyDiscount && (
                              <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                {yearlyDiscount}
                              </span>
                            )}
                            
                            {monthlyEquivalent && (
                              <div className="mt-2 text-sm text-gray-600">
                                Just {monthlyEquivalent}/month, billed annually
                              </div>
                            )}
                          </div>
                          
                          <button
                            onClick={() => handlePurchase(priceId)}
                            disabled={isLoading && loadingPlanId === priceId}
                            className={`block w-full py-2 px-4 rounded-md font-medium text-center transition ${
                              plan.popular
                                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                            }`}
                          >
                            {isLoading && loadingPlanId === priceId ? 'Processing...' : 'Choose Plan'}
                          </button>
                        </div>
                        
                        <div className="bg-gray-50 p-6 border-t border-gray-200">
                          <h3 className="font-medium mb-3">Features included:</h3>
                          <ul className="space-y-2">
                            {plan.features.slice(0, 4).map((feature) => (
                              <li key={feature} className="flex items-start">
                                <FiCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                                <span>{feature}</span>
                              </li>
                            ))}
                            
                            {plan.features.length > 4 && (
                              <li className="pt-2 text-center">
                                <a href="/pricing" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                  View all features
                                </a>
                              </li>
                            )}
                          </ul>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="text-center mt-10">
                  <a 
                    href="/pricing" 
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-md transition"
                  >
                    Compare All Plans
                  </a>
                </div>
              </div>
            </section>
            
            <ContactSection />
          </>
        )}
      </main>
      
      <Footer />
      
      {/* Add the Builder.io edit button if content exists */}
      {builderContent && <BuilderEditButton contentId={builderContent.id} />}
    </div>
  );
}

// Add helper function at the bottom of the file, before the getStaticProps function
function calculateMonthlyEquivalent(yearlyPrice) {
  // Remove currency symbol and commas, convert to number
  const numericPrice = parseFloat(yearlyPrice.replace(/[$,]/g, ''));
  // Divide by 12 and round to nearest cent
  const monthlyPrice = (numericPrice / 12).toFixed(2);
  // Format with currency symbol
  return `$${monthlyPrice}`;
}

export async function getStaticProps() {
  // Fetch Builder.io content for the homepage
  const builderContent = await getBuilderContent('/');
  
  // Return the content as props (will be null if no content is found)
  return {
    props: {
      builderContent: builderContent || null,
    },
    // Revalidate the page every 30 seconds for incremental static regeneration
    revalidate: 30,
  };
} 