import { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();
  const { data: session } = useSession();
  
  // If already logged in, redirect to dashboard
  if (session) {
    router.push('/dashboard');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });
    
    setIsLoading(false);
    
    if (result.error) {
      setError('Invalid email or password');
    } else {
      // Redirect to dashboard or callback URL
      router.push(router.query.callbackUrl || '/dashboard');
    }
  };
  
  return (
    <>
      <Head>
        <title>Login - IntakeCoach</title>
      </Head>
      
      <Header />
      
      <main className="max-w-md mx-auto my-12 px-4">
        <div className="bg-white shadow rounded-lg p-8">
          <h1 className="text-2xl font-bold text-center mb-6">Login to IntakeCoach</h1>
          
          {error && (
            <div className="bg-red-50 text-red-700 p-3 rounded mb-4">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          
          <div className="mt-6 text-center text-sm text-gray-600">
            <p>Don't have an account?</p>
            <p className="mt-1">Purchase a package to create an account automatically.</p>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
} 