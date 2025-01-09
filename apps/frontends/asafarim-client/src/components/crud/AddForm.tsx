// E:\asm-fs\apps\frontends\asafarim-client\src\components\crud\AddForm.tsx 
import { IField } from '@/interfaces/IField';
import React, { useState } from 'react';
import Toolbar from '../Toolbars/Toolbar';
import { ActionButton } from '@fluentui/react';


interface FormData {
    [key: string]: string | number | boolean | File | FileList | undefined;
    delete: boolean;
}

interface AddFormProps {
    entityName: string;
    fields: IField[];
    submitHandler: (formData: FormData) => Promise<void>;
    onCancel: () => void;
}

const AddForm: React.FC<AddFormProps> = ({ entityName, fields, submitHandler, onCancel }) => {
    const [formData, setFormData] = useState<FormData>({
        ...Object.fromEntries(fields.map(field => [field.name, ''])),
        delete: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, type, value, checked, files } = e.target as HTMLInputElement;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox'
                ? checked
                : type === 'file'
                    ? files?.[0]
                    : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await submitHandler(formData);
            console.log(`${entityName} added successfully`);
            setFormData({ delete: false }); // Reset the form
        } catch (error) {
            console.error(`Error adding ${entityName}:`, error);
        }
    };

    return (
            <form onSubmit={handleSubmit} className="add-entity-form" autoComplete='on' >
                {fields.map(field => (
                    <div key={field.name}>
                        {field.label && <label>{field.label}:</label>}
                        {field.type === 'textarea' ? (
                            <textarea
                                name={field.name}
                                value={formData[field.name] as string || ''}
                                onChange={handleChange}
                                placeholder={field.placeholder}
                                required={field.required}
                            />
                        ) : field.type === 'select' ? (
                            <select
                                name={field.name}
                                value={formData[field.name] as string || ''}
                                onChange={handleChange}
                                required={field.required}
                                multiple={field.multiple}
                            >
                                <option value="">Select an option</option>
                                {field.options?.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        ) : field.type === 'radio' ? (
                            field.options?.map(option => (
                                <label key={option.value}>
                                    <input
                                        type="radio"
                                        name={field.name}
                                        value={option.value}
                                        checked={formData[field.name] === option.value}
                                        onChange={handleChange}
                                        required={field.required}
                                    />
                                    {option.label}
                                </label>
                            ))
                        ) : (
                            <input
                                type={field.type}
                                name={field.name}
                                value={
                                    field.type === 'checkbox' || field.type === 'file'
                                        ? undefined
                                        : formData[field.name] as string || ''
                                }
                                checked={field.type === 'checkbox' ? formData[field.name] as boolean || false : undefined}
                                onChange={handleChange}
                                required={field.required}
                                placeholder={field.placeholder}
                                accept={field.accept} // For file inputs
                                multiple={field.multiple} // For file inputs
                            />
                        )}
                    </div>
                ))}
                <Toolbar aria-label='Add' className='flex justify-end'>
                    <ActionButton type="submit" id='submit' className='w-24'>Submit</ActionButton>
                    <ActionButton type="button" onClick={onCancel} id='cancel' className='w-24 btn-danger'>Cancel</ActionButton>
                </Toolbar>
            </form>
    );
};

export default AddForm;
