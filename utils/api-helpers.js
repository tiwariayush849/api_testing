/**
 * API Helper Utilities for Playwright API Testing
 * Provides common helper functions for API request handling
 */

/**
 * Wait for a specified number of milliseconds
 * @param {number} ms - Milliseconds to wait
 */
export const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Retry a function with exponential backoff
 * @param {Function} fn - Function to retry
 * @param {number} maxRetries - Maximum number of retries
 * @param {number} baseDelay - Base delay in ms
 */
export const retry = async (fn, maxRetries = 3, baseDelay = 1000) => {
  let lastError;
  for (let i = 0; i <= maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (i < maxRetries) {
        const delay = baseDelay * Math.pow(2, i);
        await wait(delay);
      }
    }
  }
  throw lastError;
};

/**
 * Validate API response structure
 * @param {Object} response - API response object
 * @param {number} expectedStatus - Expected HTTP status code
 */
export const validateResponse = (response, expectedStatus = 200) => {
  if (response.status() !== expectedStatus) {
    throw new Error(`Expected status ${expectedStatus}, got ${response.status()}`);
  }
  return response;
};

/**
 * Extract pagination info from response headers
 * @param {Object} response - API response object
 * @returns {Object} Pagination info
 */
export const getPaginationInfo = (response) => {
  const linkHeader = response.headers()['link'];
  if (!linkHeader) return { hasNext: false };

  const links = linkHeader.split(',');
  const pagination = { hasNext: false, hasPrev: false, next: null, prev: null };

  links.forEach((link) => {
    const relMatch = link.match(/rel="([^"]+)"/);
    const urlMatch = link.match(/<([^>]+)>/);
    if (relMatch && urlMatch) {
      pagination[relMatch[1]] = urlMatch[1];
      if (relMatch[1] === 'next') pagination.hasNext = true;
      if (relMatch[1] === 'prev') pagination.hasPrev = true;
    }
  });

  return pagination;
};

/**
 * Log API response details for debugging
 * @param {Object} response - API response object
 * @param {string} label - Label for the log
 */
export const logResponse = async (response, label = 'API Response') => {
  console.log(`\n=== ${label} ===`);
  console.log(`Status: ${response.status()}`);
  console.log(`Headers:`, response.headers());
  try {
    const body = await response.json();
    console.log(`Body:`, JSON.stringify(body, null, 2));
  } catch {
    const text = await response.text();
    console.log(`Body:`, text);
  }
  console.log('===================\n');
};

export default { wait, retry, validateResponse, getPaginationInfo, logResponse };