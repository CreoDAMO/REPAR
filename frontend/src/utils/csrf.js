
let csrfToken = null;

export async function getCsrfToken(apiBaseUrl) {
  if (csrfToken) return csrfToken;
  
  // Use provided base URL or fall back to environment variable
  const baseUrl = apiBaseUrl || import.meta.env.VITE_BACKEND_API_URL || '';
  
  try {
    const response = await fetch(`${baseUrl}/api/csrf-token`, {
      credentials: 'include'
    });
    const data = await response.json();
    csrfToken = data.csrfToken;
    return csrfToken;
  } catch (error) {
    console.error('Failed to fetch CSRF token:', error);
    throw error;
  }
}

export function clearCsrfToken() {
  csrfToken = null;
}
