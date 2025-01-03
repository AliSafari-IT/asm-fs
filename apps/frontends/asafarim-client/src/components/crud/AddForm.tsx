import { IField } from '@/interfaces/IField';
import Wrapper from '@/layout/Wrapper/Wrapper';
import React, { useState } from 'react';


interface FormData {
    [key: string]: string | number | boolean | File | FileList | undefined;
    delete: boolean;
}

interface AddFormProps {
    entityName: string;
    fields: IField[];
    submitHandler: (formData: FormData) => Promise<void>;
}

const AddForm: React.FC<AddFormProps> = ({ entityName, fields, submitHandler }) => {
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
        <Wrapper header={<h2 className="text-3xl font-bold text-center mb-4">Add {entityName}</h2>}>
            <form onSubmit={handleSubmit} className="add-entity-form">
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
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </Wrapper>
    );
};

export default AddForm;
