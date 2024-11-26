import { webDarkTheme, webLightTheme } from "@fluentui/react-components";

// Set a cookie that works across the main domain and subdomains
export function setThemeCookie(theme: any) {
  const domain = '.asafarim.com'; // Use your main domain
  const days = 7; // Set expiration for 7 days (adjust as needed)
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  }
  document.cookie = `theme=${theme}${expires}; domain=${domain}; path=/`;
}

// Get the theme from the cookie
export function getTheme() {
  const name = 'theme=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookies = decodedCookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    let c = cookies[i].trim();
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return localStorage.getItem('theme') || 'light'; // Default to light if not found
}

// my theme for FluentProvider
export function getFluentProviderTheme() {
  return localStorage.getItem('theme') == 'dark' ? webDarkTheme : webLightTheme;
}