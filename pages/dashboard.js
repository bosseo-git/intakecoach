import { useState, useEffect } from 'react';
import { useSession, getSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import DashboardLayout from '../components/DashboardLayout';
import SubscriptionManager from '../components/SubscriptionManager';
import SubscriptionInfo from '../components/SubscriptionInfo';
import styles from '../styles/Dashboard.module.css';

export default function Dashboard() {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/auth/signin');
    },
  });
  const [userSubscription, setUserSubscription] = useState(null);
  const [customerId, setCustomerId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch subscription data for the user
  useEffect(() => {
    if (session?.user?.email) {
      fetchSubscriptionData();
    }
  }, [session]);

  const fetchSubscriptionData = async () => {
    try {
      setIsLoading(true);
      
      // Fetch subscription data from our API endpoint
      const response = await fetch('/api/get-subscription');
      
      if (!response.ok) {
        throw new Error('Failed to fetch subscription data');
      }
      
      const data = await response.json();
      
      // Set the customer ID even if there's no subscription
      if (data.customerId) {
        setCustomerId(data.customerId);
      }
      
      // Set the subscription data if it exists
      if (data.subscription) {
        setUserSubscription(data.subscription);
      }
    } catch (error) {
      console.error('Error fetching subscription data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <DashboardLayout>
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <p>Loading...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard - IntakeCoach</title>
      </Head>
      
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Dashboard</h1>
          <p className={styles.welcome}>
            Welcome back, {session.user.name || session.user.email}!
          </p>
        </div>

        <div className={styles.section}>
          <SubscriptionInfo />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content - takes up 2/3 of the space */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Welcome, {session?.user?.name || 'User'}!</h2>
                <p className="text-gray-600">
                  This is your dashboard where you can manage your account, view insights, and access your applications.
                </p>
              </div>
              
              {/* Dashboard widgets would go here */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                <div className="text-gray-600">
                  <p>Your account was created recently.</p>
                  <p className="mt-2">Start exploring your dashboard to see all available features.</p>
                </div>
              </div>
            </div>
            
            {/* Sidebar - takes up 1/3 of the space */}
            <div className="space-y-6">
              {/* Subscription Management */}
              <SubscriptionManager 
                user={session?.user} 
                subscription={userSubscription}
                customerId={customerId}
                isLoading={isLoading}
              />
              
              {/* Account Info */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Account Info</h2>
                <div className="space-y-3">
                  <div>
                    <span className="font-medium">Name:</span> {session?.user?.name || 'N/A'}
                  </div>
                  <div>
                    <span className="font-medium">Email:</span> {session?.user?.email || 'N/A'}
                  </div>
                  <div>
                    <span className="font-medium">Member since:</span> {new Date().toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  
  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }
  
  return {
    props: { session }
  };
} 