import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import styles from '../styles/SubscriptionInfo.module.css';

export default function SubscriptionInfo() {
  const { data: session } = useSession();
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [portalLoading, setPortalLoading] = useState(false);

  useEffect(() => {
    if (session) {
      fetchSubscription();
    }
  }, [session]);

  const fetchSubscription = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/get-subscription');
      
      if (!response.ok) {
        throw new Error('Failed to fetch subscription data');
      }
      
      const data = await response.json();
      setSubscription(data);
    } catch (err) {
      console.error('Error fetching subscription:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleManageSubscription = async () => {
    if (!subscription?.customerId) return;
    
    try {
      setPortalLoading(true);
      const response = await fetch('/api/create-customer-portal-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerId: subscription.customerId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create portal session');
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (err) {
      console.error('Error creating portal session:', err);
      setError(err.message);
    } finally {
      setPortalLoading(false);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Loading subscription details...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  if (!subscription || !subscription.hasSubscription) {
    return (
      <div className={styles.noSubscription}>
        <h2>No Active Subscription</h2>
        <p>You don't have an active subscription plan.</p>
        <a href="/pricing" className={styles.button}>View Plans</a>
      </div>
    );
  }

  // Format the date
  const periodEndDate = new Date(subscription.currentPeriodEnd * 1000).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Format the price
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: subscription.price.currency || 'USD',
    minimumFractionDigits: 2,
  }).format(subscription.price.amount / 100);

  // Capitalize first letter of status
  const statusText = subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1);

  return (
    <div className={styles.subscriptionInfo}>
      <h2>Your Subscription</h2>
      
      <div className={styles.card}>
        <div className={styles.header}>
          <h3>{subscription.product.name}</h3>
          <span className={`${styles.status} ${styles[subscription.status]}`}>
            {statusText}
          </span>
        </div>
        
        <div className={styles.details}>
          <div className={styles.row}>
            <span className={styles.label}>Plan:</span>
            <span className={styles.value}>{subscription.product.description || subscription.product.name}</span>
          </div>
          
          <div className={styles.row}>
            <span className={styles.label}>Price:</span>
            <span className={styles.value}>
              {formattedPrice} / {subscription.price.interval}
              {subscription.price.intervalCount > 1 ? `(${subscription.price.intervalCount} ${subscription.price.interval}s)` : ''}
            </span>
          </div>
          
          {subscription.paymentMethod && (
            <div className={styles.row}>
              <span className={styles.label}>Payment Method:</span>
              <span className={styles.value}>
                {subscription.paymentMethod.brand?.toUpperCase() || 'Card'} •••• {subscription.paymentMethod.last4}
                <span className={styles.cardExpiry}>
                  Expires {subscription.paymentMethod.expMonth}/{subscription.paymentMethod.expYear}
                </span>
              </span>
            </div>
          )}
          
          <div className={styles.row}>
            <span className={styles.label}>Renewal Date:</span>
            <span className={styles.value}>
              {periodEndDate}
              {subscription.cancelAtPeriodEnd && (
                <span className={styles.cancelling}> (Cancels after this period)</span>
              )}
            </span>
          </div>
        </div>
        
        <button 
          className={styles.manageButton}
          onClick={handleManageSubscription}
          disabled={portalLoading}
        >
          {portalLoading ? 'Loading...' : 'Manage Subscription'}
        </button>
      </div>
    </div>
  );
} 