import { useState } from 'react';
import Link from 'next/link';
import { formatCurrency } from '../utils/formatCurrency';

export default function SubscriptionManager({ user, subscription, customerId, isLoading }) {
  const [isUpgrading, setIsUpgrading] = useState(false);
  
  // Function to handle upgrade/change subscription
  const handleManageSubscription = async () => {
    try {
      setIsUpgrading(true);
      
      // Call our API to create a Stripe Customer Portal session
      const response = await fetch('/api/create-portal-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerId: customerId
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create customer portal session');
      }
      
      const { url } = await response.json();
      
      // Redirect to Stripe Customer Portal
      window.location.href = url;
    } catch (error) {
      console.error('Error creating portal session:', error);
      alert('Failed to open subscription management. Please try again later.');
    } finally {
      setIsUpgrading(false);
    }
  };
  
  // Function to handle new subscription
  const handleNewSubscription = async (priceId) => {
    try {
      setIsUpgrading(true);
      
      // Call our API to create a checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: priceId,
          email: user?.email,
          metadata: {
            userId: user?.id
          }
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }
      
      const { url } = await response.json();
      
      // Redirect to Stripe Checkout
      window.location.href = url;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      alert('Failed to start subscription process. Please try again later.');
    } finally {
      setIsUpgrading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Subscription</h2>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
        </div>
      ) : !subscription ? (
        <div>
          <p className="text-gray-600 mb-4">You don't have an active subscription.</p>
          <Link 
            href="/pricing" 
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            View Plans
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Plan:</span>
              <span className="text-blue-600 font-semibold">{subscription.planName}</span>
            </div>
            
            <div className="flex justify-between items-center mt-2">
              <span className="font-medium">Status:</span>
              <span className={`font-semibold ${
                subscription.status === 'active' ? 'text-green-600' :
                subscription.status === 'trialing' ? 'text-yellow-600' :
                subscription.status === 'past_due' ? 'text-red-600' :
                'text-gray-600'
              }`}>
                {subscription.status === 'active' ? 'Active' :
                 subscription.status === 'trialing' ? 'Trial' :
                 subscription.status === 'past_due' ? 'Past Due' :
                 subscription.status === 'canceled' ? 'Canceled' :
                 subscription.status === 'incomplete' ? 'Incomplete' :
                 subscription.status}
              </span>
            </div>
            
            <div className="flex justify-between items-center mt-2">
              <span className="font-medium">Billing:</span>
              <span>
                {formatCurrency(subscription.amount / 100, subscription.currency)} / {subscription.interval}
              </span>
            </div>
            
            {subscription.nextBillingDate && (
              <div className="flex justify-between items-center mt-2">
                <span className="font-medium">Next billing date:</span>
                <span>{new Date(subscription.nextBillingDate * 1000).toLocaleDateString()}</span>
              </div>
            )}
            
            {subscription.cancelAtPeriodEnd && (
              <div className="mt-3 p-2 bg-yellow-50 border border-yellow-100 rounded text-sm text-yellow-800">
                Your subscription will be canceled at the end of the current billing period.
              </div>
            )}
          </div>
          
          <button
            onClick={handleManageSubscription}
            disabled={isUpgrading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUpgrading ? 'Loading...' : 'Manage Subscription'}
          </button>
        </div>
      )}
    </div>
  );
} 