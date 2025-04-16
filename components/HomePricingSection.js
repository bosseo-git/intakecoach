import Link from 'next/link';
import PricingToggle from './PricingToggle';
import PricingCard from './PricingCard';
import { pricingOptions } from '../lib/pricingContext';

export default function HomePricingSection() {
  return (
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
        
        {/* Pricing toggle */}
        <PricingToggle />
        
        {/* Full pricing grid, same as pricing page */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {Object.values(pricingOptions).map((plan) => (
            <PricingCard 
              key={plan.name}
              plan={plan}
              showFeatures={true}
              showAllFeatures={false}
            />
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Link 
            href="/pricing" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-md transition"
          >
            Compare All Plans
          </Link>
        </div>
      </div>
    </section>
  );
} 