import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex-shrink-0">
            <a href="#" className="flex items-center">
              <Image
                src="/intakecoach.webp"
                alt="IntakeCoach Logo"
                width={180}
                height={40}
                className="h-10 w-auto"
                priority
              />
            </a>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              <svg 
                className={`h-6 w-6 ${isMenuOpen ? 'hidden' : 'block'}`}
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg 
                className={`h-6 w-6 ${isMenuOpen ? 'block' : 'hidden'}`}
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/features">
              <a className="text-gray-700 hover:text-blue-600 transition">Features</a>
            </Link>
            <Link href="/how-it-works">
              <a className="text-gray-700 hover:text-blue-600 transition">How It Works</a>
            </Link>
            <Link href="/industry-use-cases">
              <a className="text-gray-700 hover:text-blue-600 transition">Industry Use Cases</a>
            </Link>
            <Link href="/sales-performance">
              <a className="text-gray-700 hover:text-blue-600 transition">Sales Performance</a>
            </Link>
            <Link href="/integrations">
              <a className="text-gray-700 hover:text-blue-600 transition">Integrations</a>
            </Link>
            <Link href="/pricing">
              <a className="text-gray-700 hover:text-blue-600 transition">Pricing</a>
            </Link>
            <Link href="/contact">
              <a className="text-gray-700 hover:text-blue-600 transition">Contact</a>
            </Link>
          </nav>
        </div>
      </div>
      
      {/* Mobile navigation */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link href="/features">
            <a className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md">Features</a>
          </Link>
          <Link href="/how-it-works">
            <a className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md">How It Works</a>
          </Link>
          <Link href="/industry-use-cases">
            <a className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md">Industry Use Cases</a>
          </Link>
          <Link href="/sales-performance">
            <a className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md">Sales Performance</a>
          </Link>
          <Link href="/integrations">
            <a className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md">Integrations</a>
          </Link>
          <Link href="/pricing">
            <a className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md">Pricing</a>
          </Link>
          <Link href="/contact">
            <a className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md">Contact</a>
          </Link>
        </div>
      </div>
    </header>
  );
} 