import { usePricing } from '../lib/pricingContext';

export default function PricingToggle() {
  const { billingInterval, changeBillingInterval } = usePricing();
  
  return (
    <div className="flex justify-center mb-8">
      <div className="bg-gray-100 p-1 rounded-lg inline-flex">
        <button
          onClick={() => changeBillingInterval('monthly')}
          className={`py-2 px-4 text-sm font-medium rounded ${
            billingInterval === 'monthly'
              ? 'bg-white shadow-sm text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Monthly
        </button>
        <button
          onClick={() => changeBillingInterval('yearly')}
          className={`py-2 px-4 text-sm font-medium rounded ${
            billingInterval === 'yearly'
              ? 'bg-white shadow-sm text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Yearly
        </button>
      </div>
    </div>
  );
} 