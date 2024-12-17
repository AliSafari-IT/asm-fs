import { useState } from 'react';
import { Modal, TextField, DefaultButton, PrimaryButton, Dropdown, IDropdownOption, useTheme } from '@fluentui/react';
import { ISitemapItem } from '../../services/sitemapService';

interface CreateNewModalProps {
  isOpen: boolean;
  onDismiss: () => void;
  onCreate: (item: Omit<ISitemapItem, 'id'>) => Promise<void>;
  error: string | null;
}

const CreateNewModal = ({ isOpen, onDismiss, onCreate, error }: CreateNewModalProps) => {
  const theme = useTheme();
  const [formData, setFormData] = useState<Omit<ISitemapItem, 'id'>>({
    pageName: '',
    description: '',
    slug: '',
    accessByRole: 'Guest'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const roleOptions: IDropdownOption[] = [
    { key: 'Guest', text: 'Guest' },
    { key: 'User', text: 'User' },
    { key: 'Admin', text: 'Admin' }
  ];

  const handleInputChange = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    const { name } = e.currentTarget;
    setFormData((prev) => ({
      ...prev,
      [name]: newValue || ''
    }));
  };

  const handleRoleChange = (_: any, option?: IDropdownOption) => {
    if (option) {
      setFormData((prev) => ({
        ...prev,
        accessByRole: option.key as string
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      await onCreate(formData);
      setFormData({
        pageName: '',
        description: '',
        slug: '',
        accessByRole: 'Guest'
      });
    } catch (error) {
      // Error is handled by the parent component
    } finally {
      setIsSubmitting(false);
    }
  };

  const modalStyles = {
    main: {
      backgroundColor: theme.palette.neutralLighterAlt,
      maxWidth: '600px',
      width: '90%',
      borderRadius: '4px',
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onDismiss={onDismiss}
      isBlocking={false}
      styles={modalStyles}
    >
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Create New Sitemap Item</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <TextField
            label="Page Name"
            required
            name="pageName"
            value={formData.pageName}
            onChange={handleInputChange}
          />

          <TextField
            label="Description"
            multiline
            rows={3}
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />

          <TextField
            label="Slug"
            required
            name="slug"
            value={formData.slug}
            onChange={handleInputChange}
          />

          <Dropdown
            label="Access Role"
            required
            options={roleOptions}
            selectedKey={formData.accessByRole}
            onChange={handleRoleChange}
          />

          <div className="flex justify-end space-x-2 mt-6">
            <DefaultButton
              text="Cancel"
              onClick={onDismiss}
              disabled={isSubmitting}
            />
            <PrimaryButton
              text={isSubmitting ? 'Creating...' : 'Create'}
              onClick={handleSubmit}
              disabled={isSubmitting || !formData.pageName || !formData.slug}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CreateNewModal;
