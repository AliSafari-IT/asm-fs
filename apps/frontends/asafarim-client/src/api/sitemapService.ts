import { ISitemapItem } from "@/interfaces/ISitemapItem";
import { IRoleEnum } from "../interfaces/IRole";
import API_URL from "./getApiUrls";

const getSitemap = async (userRole: IRoleEnum) => {
  console.log(`Fetching sitemap for userRole: ${userRole}`);

  const {token} = JSON.parse(localStorage.getItem('user') || '{}');
  console.log(`Token from localStorage: ${token}`);

  if (!token) {
    throw new Error('JWT token is missing. Please login first.');
  }

  try {
    const response = await fetch(`${API_URL}/sitemap?roleIndex=${userRole}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch sitemap with status: ${response.status}`);
    }

    const data = await response.json();
    console.log(`Sitemap response: ${JSON.stringify(data)}`);

    return data;
  } catch (error) {
    console.error('Failed to fetch sitemap', error);
    throw error;
  }
};

const createSitemap = async (newItem: Omit<ISitemapItem, 'id'>) => {
  const {token} = JSON.parse(localStorage.getItem('user') || '{}');
  
  if (!token) {
    throw new Error('JWT token is missing. Please login first.');
  }

  const response = await fetch(`${API_URL}/api/sitemap`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(newItem)
  });

  if (!response.ok) {
    throw new Error('Failed to create sitemap item');
  }

  return response.json();
};

const sitemapService = { getSitemap, createSitemap };
export default sitemapService;
