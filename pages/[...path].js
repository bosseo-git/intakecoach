import React from 'react';
import Head from 'next/head';
import { BuilderComponent, builder } from '@builder.io/react';
import { getBuilderContent, shouldFetchBuilderContent } from '../lib/builderUtils';
import DefaultErrorPage from 'next/error';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BuilderEditButton from '../components/BuilderEditButton';

// Initializes the Builder.io with your API key (if not already initialized elsewhere)
builder.init('e8dfdc162e464199b363b2b7d489c362');

export default function BuilderPage({ content, statusCode }) {
  // If the page doesn't exist or is not found, show an error page
  if (statusCode && statusCode !== 200) {
    return <DefaultErrorPage statusCode={statusCode} />;
  }

  // If no Builder.io content was found, show a 404 page
  if (!content) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <>
      <Head>
        <title>{content.data?.title || 'IntakeCoach'}</title>
        {content.data?.description && (
          <meta name="description" content={content.data.description} />
        )}
      </Head>
      
      <Header />
      
      <main>
        {/* Render the Builder.io content */}
        <BuilderComponent 
          model="page" 
          content={content} 
          options={{ includeRefs: true }}
        />
      </main>
      
      <Footer />
      
      {/* Add the Builder.io edit button */}
      <BuilderEditButton contentId={content.id} />
    </>
  );
}

export async function getStaticProps({ params }) {
  // Get the path from the params object
  const path = params?.path?.join('/') || '';
  const urlPath = `/${path}`;
  
  // Check if we should fetch Builder.io content for this path
  if (!shouldFetchBuilderContent(urlPath)) {
    return {
      props: {
        statusCode: 404,
      },
    };
  }

  try {
    // Fetch the Builder.io content for the page
    const content = await getBuilderContent(urlPath);
    
    // If no content is found, return 404
    if (!content) {
      return {
        props: {
          statusCode: 404,
        },
      };
    }

    // Return the content as props
    return {
      props: {
        content,
      },
      // Recommended 30 seconds for incremental static regeneration
      revalidate: 30,
    };
  } catch (error) {
    console.error('Error fetching Builder.io content:', error);
    return {
      props: {
        statusCode: 500,
      },
    };
  }
}

export async function getStaticPaths() {
  // This function generates all the possible static paths
  // Since this is a catch-all route, we'll start with an empty array
  // and let Next.js handle dynamic paths
  return {
    paths: [],
    fallback: 'blocking', // Use blocking for better SEO
  };
} 