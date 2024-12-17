import { apiClient } from '../utils/apiClient';

export interface ISitemapItem {
    id?: number;
    pageName: string;
    description: string;
    slug: string;
    accessByRole: string;
}

const BASE_URL = '/api/sitemaps';

export const sitemapService = {
    async createSitemap(sitemap: ISitemapItem) {
        const response = await apiClient.post(BASE_URL, sitemap);
        return response.data;
    },

    async getAllSitemaps() {
        const response = await apiClient.get(BASE_URL);
        return response.data;
    },

    async getSitemapById(id: number) {
        const response = await apiClient.get(`${BASE_URL}/${id}`);
        return response.data;
    },

    async updateSitemap(id: number, sitemap: ISitemapItem) {
        const response = await apiClient.put(`${BASE_URL}/${id}`, sitemap);
        return response.data;
    },

    async deleteSitemap(id: number) {
        const response = await apiClient.delete(`${BASE_URL}/${id}`);
        return response.data;
    }
};
