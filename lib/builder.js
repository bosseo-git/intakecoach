import { builder, Builder } from '@builder.io/react';

// Initialize the Builder with your public API key
builder.init('e8dfdc162e464199b363b2b7d489c362');

// Optional: if you have custom components
// import MyCustomComponent from '../components/MyCustomComponent';
// Builder.registerComponent(MyCustomComponent, {
//   name: 'My Custom Component',
//   inputs: [
//     { name: 'title', type: 'string' },
//     // additional inputs as needed
//   ],
// });

// Only include this code when running on the client (browser)
if (typeof window !== 'undefined') {
  // Show the preview content if Builder's preview query param is present
  const searchParams = new URLSearchParams(window.location.search);
  const isInBuilder = searchParams.has('builder.preview');
  
  // Show draft content only in preview mode
  builder.canTrack = !isInBuilder;
  builder.isPreviewing = isInBuilder;
}

export { builder, Builder }; 