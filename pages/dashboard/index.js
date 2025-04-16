import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { FiUser, FiCreditCard, FiLogOut, FiHome } from 'react-icons/fi';
import OnboardingChecklist from '../../components/OnboardingChecklist';

// Component for the Settings tab
const SettingsTab = () => {
  const { data: session } = useSession();
  const [name, setName] = useState(session?.user?.name || '');
  const [isSaving, setIsSaving] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    // In a real app, you would save this to your database
    // For now, we'll just simulate a delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setIsSaving(false);
    alert('Settings saved!');
  };
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
      
      <form onSubmit={handleSubmit} className="max-w-md">
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={session?.user?.email || ''}
            disabled
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
          />
          <p className="mt-1 text-sm text-gray-500">
            Your email address cannot be changed
          </p>
        </div>
        
        <div className="mb-6">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Display Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          <p className="mt-1 text-sm text-gray-500">
            Leave blank to keep your current password
          </p>
        </div>
        
        <button
          type="submit"
          disabled={isSaving}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition"
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

// Component for the Subscription tab
const SubscriptionTab = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Your Subscription</h2>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium">Current Plan</h3>
          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
            Active
          </span>
        </div>
        <p className="text-lg font-bold">Premium Plan</p>
        <p className="text-gray-600 text-sm">Next billing date: January 1, 2025</p>
      </div>
      
      <div className="mb-6">
        <h3 className="font-medium mb-2">Payment Method</h3>
        <div className="flex items-center border border-gray-200 rounded-md p-3">
          <div className="bg-gray-100 p-2 rounded mr-3">
            <FiCreditCard className="text-gray-600" />
          </div>
          <div>
            <p className="font-medium">•••• •••• •••• 4242</p>
            <p className="text-sm text-gray-500">Expires 12/25</p>
          </div>
        </div>
      </div>
      
      <div className="flex space-x-3">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition">
          Manage Subscription
        </button>
        <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-md transition">
          Update Payment Method
        </button>
      </div>
    </div>
  );
};

// Component for the Dashboard Home tab
const DashboardHomeTab = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Dashboard</h2>
      
      <OnboardingChecklist />
      
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="font-medium text-lg mb-3">Quick Stats</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm text-gray-600">Total Forms</p>
              <p className="text-2xl font-bold mt-1">0</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm text-gray-600">Form Submissions</p>
              <p className="text-2xl font-bold mt-1">0</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="font-medium text-lg mb-3">Recent Activity</h3>
          <p className="text-gray-600">No recent activity to display.</p>
        </div>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('home');
  const { data: session, status } = useSession();
  const router = useRouter();
  
  // Check if user is new (in a real app, you would check this from user data)
  const [isNewUser, setIsNewUser] = useState(true);
  
  // If not authenticated, redirect to login
  if (status === 'unauthenticated') {
    router.push('/login');
    return null;
  }
  
  // If loading session, show loading state
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }
  
  return (
    <>
      <Head>
        <title>Dashboard - IntakeCoach</title>
      </Head>
      
      <div className="min-h-screen bg-gray-50">
        {/* Dashboard Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <h1 className="text-xl font-bold">IntakeCoach</h1>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="font-medium">{session.user.name || session.user.email}</p>
                  <p className="text-sm text-gray-500">{session.user.email}</p>
                </div>
                
                <button 
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="p-2 rounded-full hover:bg-gray-100 text-gray-600"
                  title="Logout"
                >
                  <FiLogOut />
                </button>
              </div>
            </div>
          </div>
        </header>
        
        {/* Dashboard Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            {/* Tab Navigation */}
            <div className="flex border-b">
              <button
                onClick={() => setActiveTab('home')}
                className={`px-6 py-3 text-sm font-medium flex items-center ${
                  activeTab === 'home'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <FiHome className="mr-2" />
                Dashboard
              </button>
            
              <button
                onClick={() => setActiveTab('settings')}
                className={`px-6 py-3 text-sm font-medium flex items-center ${
                  activeTab === 'settings'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <FiUser className="mr-2" />
                Settings
              </button>
              
              <button
                onClick={() => setActiveTab('subscription')}
                className={`px-6 py-3 text-sm font-medium flex items-center ${
                  activeTab === 'subscription'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <FiCreditCard className="mr-2" />
                Subscription
              </button>
            </div>
            
            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'home' ? (
                <DashboardHomeTab />
              ) : activeTab === 'settings' ? (
                <SettingsTab />
              ) : (
                <SubscriptionTab />
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

// Add protection to the page
export async function getServerSideProps(context) {
  return {
    props: {},
  };
} 