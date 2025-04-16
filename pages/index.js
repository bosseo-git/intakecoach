import React from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import TotalCallInsightsSection from '../components/TotalCallInsightsSection';
import DetailedCallBreakdownSection from '../components/DetailedCallBreakdownSection';
import MarketingFluffSection from '../components/MarketingFluffSection';
import AutomatedMonitoringSection from '../components/AutomatedMonitoringSection';
import EffortlessIntegrationSection from '../components/EffortlessIntegrationSection';
import ConnectEverythingSection from '../components/ConnectEverythingSection';
import HowItWorksSection from '../components/HowItWorksSection';
import IndustryUseCasesSection from '../components/IndustryUseCasesSection';
import SalesPerformanceSection from '../components/SalesPerformanceSection';
import IntegrationsSection from '../components/IntegrationsSection';
import PricingSection from '../components/PricingSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div>
      <Head>
        <title>IntakeCoach - Build Relationships, Not Todo Lists</title>
        <meta name="description" content="IntakeCoach - A comprehensive call analysis platform that helps you build relationships, not todo lists, with real-time insights and actionable analytics to drive sales performance." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      
      <main>
        <HeroSection />
        <TotalCallInsightsSection />
        <DetailedCallBreakdownSection />
        <MarketingFluffSection />
        <AutomatedMonitoringSection />
        <EffortlessIntegrationSection />
        <ConnectEverythingSection />
        <FeaturesSection />
        <HowItWorksSection />
        <SalesPerformanceSection />
        <IndustryUseCasesSection />
        <IntegrationsSection />
        <PricingSection />
        <ContactSection />
      </main>
      
      <Footer />
    </div>
  );
} 