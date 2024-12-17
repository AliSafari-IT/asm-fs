// src/pages/Sitemap/SitemapPage.tsx

import { useEffect, useState } from 'react';
import { IconButton, Dropdown, IDropdownOption } from '@fluentui/react';
import { sitemapService } from '../../services/sitemapService';
import axios, { AxiosError } from 'axios';
import '../../styles/sitemap-page.css';
import Wrapper from '../../layout/Wrapper/Wrapper';
import { ISitemapItem } from '../../services/sitemapService';
import CreateNewModal from './CreateNewModal';
import { handleError } from '../../utils/handleError';

const SitemapPage = () => {
  const [sitemapData, setSitemapData] = useState<ISitemapItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSitemapData();
  }, []);

  const fetchSitemapData = async () => {
    try {
      const data = await sitemapService.getAllSitemaps();
      setSitemapData(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(handleError(error as AxiosError));
    }
  };

  const handleEdit = async (id: number) => {
    // We'll implement edit functionality in a future update
    console.log('Edit sitemap ID:', id);
  };

  const handleDelete = async (id: number) => {
    try {
      await sitemapService.deleteSitemap(id);
      await fetchSitemapData();
    } catch (error) {
      setError(handleError(error as AxiosError));
    }
  };

  const handleCreate = () => {
    setIsCreateModalOpen(true);
  };

  const handleCreateSubmit = async (newItem: Omit<ISitemapItem, 'id'>) => {
    try {
      setError(null);
      await sitemapService.createSitemap(newItem);
      setIsCreateModalOpen(false);
      await fetchSitemapData();
    } catch (error) {
      setError(handleError(error as AxiosError));
      throw error;
    }
  };

  const dropdownOptions: IDropdownOption[] = [
    { key: 'edit', text: 'Edit' },
    { key: 'delete', text: 'Delete' },
  ];

  const handleDropdownChange = (itemId: number, option: IDropdownOption) => {
    if (option.key === 'edit') {
      handleEdit(itemId);
    } else if (option.key === 'delete') {
      handleDelete(itemId);
    }
  };

  const headerBlock = (
    <header className="w-full text-center bg-gray-800 text-white p-4">
      <h1 className="text-2xl font-bold">ASafariM Sitemap!</h1>
    </header>
  );

  if (loading) {
    return <Wrapper header={headerBlock}>
      <p>Loading...</p>
    </Wrapper>;
  }

  return (
    <Wrapper header={headerBlock}>
      <div className="p-4">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <div className="mt-4 flex justify-end sitemap-page">
          <IconButton
            iconProps={{ iconName: 'Add' }}
            title="Create"
            ariaLabel="Create"
            onClick={handleCreate}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          />
        </div>
        <table className="w-full border-collapse table-auto mt-4">
          <thead className="bg-gray-500">
            <tr className="border-b border-gray-200">
              <th className="px-4 py-2">Page Name</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Slug</th>
              <th className="px-4 py-2">Access By Role</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sitemapData.map((item) => (
              <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="px-4 py-2">{item.pageName}</td>
                <td className="px-4 py-2">{item.description}</td>
                <td className="px-4 py-2">{item.slug}</td>
                <td className="px-4 py-2">{item.accessByRole}</td>
                <td className="px-4 py-2">
                  <Dropdown
                    placeholder="Actions"
                    options={dropdownOptions}
                    onChange={(_e, option) => option && handleDropdownChange(item.id!, option)}
                    ariaLabel="Actions Dropdown"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <CreateNewModal
          isOpen={isCreateModalOpen}
          onDismiss={() => setIsCreateModalOpen(false)}
          onCreate={handleCreateSubmit}
          error={error}
        />
      </div>
    </Wrapper>
  );
};

export default SitemapPage;
