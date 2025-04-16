import React from 'react';
import Head from 'next/head';
import { BuilderComponent, builder, Builder } from '@builder.io/react';
import { getBuilderContent } from '../lib/builderUtils';
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
import BuilderEditButton from '../components/BuilderEditButton';

// Register your components with Builder.io so they can be used in the visual editor
Builder.registerComponent(HeroSection, { name: 'Hero Section' });
Builder.registerComponent(FeaturesSection, { name: 'Features Section' });
Builder.registerComponent(TotalCallInsightsSection, { name: 'Total Call Insights Section' });
Builder.registerComponent(DetailedCallBreakdownSection, { name: 'Detailed Call Breakdown Section' });
Builder.registerComponent(MarketingFluffSection, { name: 'Marketing Fluff Section' });
Builder.registerComponent(AutomatedMonitoringSection, { name: 'Automated Monitoring Section' });
Builder.registerComponent(EffortlessIntegrationSection, { name: 'Effortless Integration Section' });
Builder.registerComponent(ConnectEverythingSection, { name: 'Connect Everything Section' });
Builder.registerComponent(HowItWorksSection, { name: 'How It Works Section' });
Builder.registerComponent(IndustryUseCasesSection, { name: 'Industry Use Cases Section' });
Builder.registerComponent(SalesPerformanceSection, { name: 'Sales Performance Section' });
Builder.registerComponent(IntegrationsSection, { name: 'Integrations Section' });
Builder.registerComponent(PricingSection, { name: 'Pricing Section' });
Builder.registerComponent(ContactSection, { name: 'Contact Section' });

export default function Home({ builderContent }) {
  return (
    <div>
      <Head>
        <title>IntakeCoach - Build Relationships, Not Todo Lists</title>
        <meta name="description" content="IntakeCoach - A comprehensive call analysis platform that helps you build relationships, not todo lists, with real-time insights and actionable analytics to drive sales performance." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      
      <main>
        {builderContent ? (
          // If we have Builder content, render that
          <BuilderComponent 
            model="page" 
            content={builderContent} 
          />
        ) : (
          // Otherwise, render our default sections
          <>
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
          </>
        )}
      </main>
      
      <Footer />
      
      {/* Add the Builder.io edit button if content exists */}
      {builderContent && <BuilderEditButton contentId={builderContent.id} />}
    </div>
  );
}

export async function getStaticProps() {
  // Fetch Builder.io content for the homepage
  const builderContent = await getBuilderContent('/');
  
  // Return the content as props (will be null if no content is found)
  return {
    props: {
      builderContent: builderContent || null,
    },
    // Revalidate the page every 30 seconds for incremental static regeneration
    revalidate: 30,
  };
} 