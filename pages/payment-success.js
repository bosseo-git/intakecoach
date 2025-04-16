import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function PaymentSuccess() {
  const router = useRouter();
  const { status, email } = router.query;
  const [countdown, setCountdown] = useState(5);
  
  // Redirect to complete account or dashboard
  useEffect(() => {
    if (status === 'error') {
      // No automatic redirect for errors
      return;
    }
    
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          // If we have an email, go to complete account, otherwise go to dashboard
          if (email) {
            router.push(`/complete-account?email=${encodeURIComponent(email)}`);
          } else {
            router.push('/dashboard');
          }
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [router, status, email]);
  
  // Different content based on status
  const renderContent = () => {
    switch (status) {
      case 'error':
        return (
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Something Went Wrong
            </h1>
            <p className="text-gray-600 mb-6">
              We encountered an issue while processing your payment or setting up your account.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/dashboard">
                <a className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition">
                  Go to Dashboard
                </a>
              </Link>
              <Link href="/contact">
                <a className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-6 rounded-md transition">
                  Contact Support
                </a>
              </Link>
            </div>
          </div>
        );
        
      default:
        return (
          <div className="text-center">
            <div className="mb-8 text-green-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Payment Successful!
            </h1>
            <p className="text-gray-600 mb-4">
              Thank you for your purchase! We're setting up your account.
            </p>
            <p className="text-gray-600 mb-6">
              You will be redirected in {countdown} seconds...
            </p>
            
            {email ? (
              <Link href={`/complete-account?email=${encodeURIComponent(email)}`}>
                <a className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition">
                  Complete Your Account
                </a>
              </Link>
            ) : (
              <Link href="/dashboard">
                <a className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition">
                  Go to Dashboard
                </a>
              </Link>
            )}
          </div>
        );
    }
  };
  
  return (
    <>
      <Head>
        <title>Payment Status - IntakeCoach</title>
      </Head>
      
      <Header />
      
      <main className="min-h-screen py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-lg rounded-lg p-8 border border-gray-200">
            {renderContent()}
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
} 