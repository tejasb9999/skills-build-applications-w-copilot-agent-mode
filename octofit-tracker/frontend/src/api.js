export function getApiBaseUrl() {
  const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL;

  if (configuredBaseUrl) {
    return configuredBaseUrl.replace(/\/$/, '');
  }

  if (typeof window === 'undefined') {
    return 'http://localhost:8000';
  }

  const hostname = window.location.hostname;
  const codespaceMatch = hostname.match(/^(.*)-5173\.app\.github\.dev$/);

  if (codespaceMatch) {
    return `https://${codespaceMatch[1]}-8000.app.github.dev`;
  }

  return 'http://localhost:8000';
}

export function getApiUrl(path = '') {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${getApiBaseUrl()}${normalizedPath}`;
}
