import React from 'react';
import { useRouter } from 'next/router';
import { builder } from '../lib/builder';

const styles = {
  button: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    backgroundColor: '#2563eb',
    color: 'white',
    padding: '10px 15px',
    borderRadius: '8px',
    fontWeight: 'bold',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
    zIndex: 9999,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    border: 'none',
    fontSize: '14px',
  },
  icon: {
    width: '16px',
    height: '16px',
  }
};

export default function BuilderEditButton({ contentId }) {
  const router = useRouter();
  
  // Only show in development or if preview mode is active
  const isDev = process.env.NODE_ENV === 'development';
  const isPreview = router.query['builder.preview'] !== undefined;
  
  // Don't show if no content ID is provided
  if (!contentId || (!isDev && !isPreview)) {
    return null;
  }
  
  // Create the Builder.io edit URL
  const editUrl = `https://builder.io/content/${contentId}`;
  
  return (
    <a href={editUrl} target="_blank" rel="noopener noreferrer" style={styles.button}>
      <svg 
        style={styles.icon}
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
      Edit in Builder.io
    </a>
  );
} 