import Link from 'next/link';
import { FiCheck } from 'react-icons/fi';
import { usePricing } from '../lib/pricingContext';

export default function PricingCard({ 
  plan, 
  showFeatures = true, 
  showAllFeatures = false,
  onPurchase = null, 
  isLoading = false 
}) {
  const { billingInterval } = usePricing();
  
  // Determine pricing details based on billing interval
  const price = billingInterval === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
  const interval = billingInterval === 'monthly' ? 'month' : 'year';
  const priceId = billingInterval === 'monthly' ? plan.monthlyPriceId : plan.yearlyPriceId;
  const yearlyDiscount = billingInterval === 'yearly' ? plan.yearlyDiscount : null;
  
  // Limit features display if not showing all
  const displayFeatures = showAllFeatures 
    ? plan.features 
    : (showFeatures ? plan.features.slice(0, 4) : []);
  
  return (
    <div 
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
        </div>
        
        {onPurchase ? (
          <button
            onClick={() => onPurchase(priceId)}
            disabled={isLoading}
            className={`w-full py-2 px-4 rounded-md font-medium transition ${
              plan.popular
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
            }`}
          >
            {isLoading ? 'Processing...' : 'Purchase Plan'}
          </button>
        ) : (
          <Link
            href={`/pricing?billing=${billingInterval}`}
            className={`block w-full py-2 px-4 rounded-md font-medium text-center transition ${
              plan.popular
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
            }`}
          >
            View Plan
          </Link>
        )}
      </div>
      
      {showFeatures && displayFeatures.length > 0 && (
        <div className="bg-gray-50 p-6 border-t border-gray-200">
          <h3 className="font-medium mb-3">Features included:</h3>
          <ul className="space-y-2">
            {displayFeatures.map((feature) => (
              <li key={feature} className="flex items-start">
                <FiCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          
          {!showAllFeatures && plan.features.length > 4 && (
            <div className="mt-4 text-center">
              <Link 
                href="/pricing" 
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                View all features
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 