
let csrfToken = null;

export async function getCsrfToken() {
  if (csrfToken) return csrfToken;
  
  try {
    const response = await fetch('http://localhost:3002/api/csrf-token', {
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
