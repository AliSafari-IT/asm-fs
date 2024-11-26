// src/pages/Sitemap/SitemapPage.tsx

import { useEffect, useState } from 'react';
import { IconButton, Dropdown, IDropdownOption } from '@fluentui/react';
import sitemapService from '../../api/sitemapService';
import '../../styles/sitemap-page.css';
import Wrapper from '../../layout/Wrapper/Wrapper';
import { IRoleEnum } from '../../interfaces/IRole';
import { ISitemapItem } from '../../interfaces/ISitemapItem';

const SitemapPage = () => {
  const [sitemapData, setSitemapData] = useState<ISitemapItem []>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch sitemap data from API
    const fetchData = async () => {
      try {
        const data = await sitemapService.getSitemap(IRoleEnum.Admin);
        setSitemapData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching sitemap:', error);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  // Handle actions (CRUD)
  const handleEdit = (id: string) => {
    console.log('Edit sitemap ID:', id);
    // Add logic to edit a sitemap item
  };

  const handleDelete = (id: string) => {
    console.log('Delete sitemap ID:', id);
    // Add logic to delete a sitemap item
  };

  const handleCreate = () => {
    console.log('Create new sitemap');
    // Add logic to create a new sitemap item
  };

  const dropdownOptions: IDropdownOption[] = [
    { key: 'edit', text: 'Edit' },
    { key: 'delete', text: 'Delete' },
  ];

  const handleDropdownChange = (itemId: string, option: IDropdownOption) => {
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

  if (sitemapData.length === 0) {
    return (
      <Wrapper header={headerBlock}>
        <p>No sitemaps found.</p>
      </Wrapper>
    );
  }

  if (loading) {
    return <Wrapper header={headerBlock}>
    <p>Loading...</p>
  </Wrapper>;
  }

  // Render the sitemap table
  return (
    <Wrapper header={headerBlock}>
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
                  onChange={(_e, option) => handleDropdownChange(item.id, option!)}
                  ariaLabel="Actions Dropdown"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex justify-end">
        <IconButton
          iconProps={{ iconName: 'Add' }}
          title="Create"
          ariaLabel="Create"
          onClick={handleCreate}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        />
      </div>
    </Wrapper>
  );
};

export default SitemapPage;
