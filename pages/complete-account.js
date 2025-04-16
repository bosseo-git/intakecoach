import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { signIn } from 'next-auth/react';

export default function CompleteAccount() {
  const router = useRouter();
  const { email, session_id } = router.query;
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  // Create/update the user account
  const completeAccount = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    // Validate passwords
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      setIsLoading(false);
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }
    
    try {
      // Call API to set the password
      const response = await fetch('/api/complete-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          session_id
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSuccess(true);
        
        // Attempt to sign in automatically
        const signInResult = await signIn('credentials', {
          redirect: false,
          email,
          password,
        });
        
        if (signInResult?.ok) {
          // Redirect to dashboard after successful login
          setTimeout(() => {
            router.push('/dashboard');
          }, 1500);
        } else {
          // If auto-login fails, let them click the button manually
          console.error('Auto-login failed:', signInResult?.error);
        }
      } else {
        setError(data.error || 'Failed to complete account setup');
      }
    } catch (error) {
      console.error('Error completing account:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <>
      <Head>
        <title>Complete Your Account - IntakeCoach</title>
      </Head>
      
      <Header />
      
      <main className="min-h-screen py-20">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-lg rounded-lg p-8 border border-gray-200">
            {success ? (
              <div className="text-center">
                <div className="mb-6 text-green-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                  Account Setup Complete!
                </h1>
                <p className="text-gray-600 mb-6">
                  You'll be redirected to your dashboard in a moment...
                </p>
                <Link href="/dashboard">
                  <a className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition">
                    Go to Dashboard
                  </a>
                </Link>
              </div>
            ) : (
              <>
                <h1 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                  Complete Your Account
                </h1>
                
                <p className="text-gray-600 mb-6 text-center">
                  Thanks for your purchase! Please create a password to access your account.
                </p>
                
                {email && (
                  <div className="mb-6 p-3 bg-blue-50 rounded-md">
                    <p className="text-blue-800">
                      <strong>Email:</strong> {email}
                    </p>
                  </div>
                )}
                
                {error && (
                  <div className="mb-6 p-3 bg-red-50 rounded-md">
                    <p className="text-red-600">{error}</p>
                  </div>
                )}
                
                <form onSubmit={completeAccount} className="space-y-4">
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                      minLength={8}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm Password
                    </label>
                    <input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition disabled:opacity-70 flex items-center justify-center"
                  >
                    {isLoading ? (
                      <>
                        <span className="inline-block animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>
                        Setting up account...
                      </>
                    ) : (
                      'Complete Account Setup'
                    )}
                  </button>
                </form>
                
                <p className="mt-6 text-sm text-gray-500 text-center">
                  Need help? <Link href="/contact"><a className="text-blue-600 hover:text-blue-800">Contact Support</a></Link>
                </p>
              </>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
} 