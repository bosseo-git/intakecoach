import Head from 'next/head';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import HowItWorksSection from '../components/HowItWorksSection';
import IndustryUseCasesSection from '../components/IndustryUseCasesSection';
import IntegrationsSection from '../components/IntegrationsSection';
import PricingSection from '../components/PricingSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div>
      <Head>
        <title>IntakeCoach - Revolutionize Your Call Analysis</title>
        <meta name="description" content="IntakeCoach - A comprehensive call analysis platform with automated call categorization, real-time AI transcription, and actionable analytics." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <IndustryUseCasesSection />
        <IntegrationsSection />
        <PricingSection />
        <ContactSection />
      </main>
      
      <Footer />
    </div>
  );
} 