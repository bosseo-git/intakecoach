import { builder } from './builder';

/**
 * Fetches a Builder.io page by its URL path
 * 
 * @param {string} urlPath - The URL path (e.g., '/about')
 * @param {string} model - The Builder.io model (default: 'page')
 * @param {Object} options - Additional options for the fetch
 * @returns {Promise<Object>} - The page content
 */
export async function getBuilderContent(urlPath, model = 'page', options = {}) {
  // Provide the model and URL path to get the content
  const content = await builder.get(model, {
    url: urlPath,
    userAttributes: {
      urlPath,
    },
    ...options,
  }).promise();

  return content;
}

/**
 * Fetches all Builder.io pages for a given model
 * 
 * @param {string} model - The Builder.io model (default: 'page')
 * @param {Object} options - Additional options for the fetch
 * @returns {Promise<Array>} - Array of pages
 */
export async function getAllBuilderPages(model = 'page', options = {}) {
  // Get all public facing pages
  return await builder.getAll(model, {
    options: { noTargeting: true },
    ...options,
  });
}

/**
 * Determines if we should fetch Builder.io content for a given path
 * 
 * @param {string} urlPath - The URL path to check
 * @returns {boolean}
 */
export function shouldFetchBuilderContent(urlPath) {
  // Add logic here to exclude certain pages from being fetched from Builder
  // For example, you might not want to fetch content for API routes or static pages
  
  // Exclude API routes and specific app paths
  const excludePaths = ['/api/', '/_next/', '/static/'];
  return !excludePaths.some(path => urlPath.startsWith(path));
} 