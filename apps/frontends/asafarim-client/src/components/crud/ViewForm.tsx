import { IField } from '@/interfaces/IField';
import Wrapper from '@/layout/Wrapper/Wrapper';
import React from 'react';

interface ViewFormProps {
    entityName: string;
    fields: IField[];
    data: { [key: string]: React.ReactNode [] };
}

const ViewForm: React.FC<ViewFormProps> = ({ entityName, fields, data }) => {
    return (
        <Wrapper header={<h2 className="text-3xl font-bold text-center mb-4">{entityName} Details</h2>} footer={null}>
            <div className="view-entity-form p-4">
                {fields.map((field) => (
                    <div key={field.name} className="mb-4">
                        {field.label && <label className="block font-semibold mb-1">{field.label}:</label>}
                        <div className="border rounded-md p-2 bg-gray-50">
                            {field.type === 'file' && data[field.name] ? (
                                <a href={`${data[field.name]}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                                    View File
                                </a>
                            ) : Array.isArray(data[field.name]) ? (
                                <ul className="list-disc list-inside">
                                    {Array.isArray(data[field.name]) && data[field.name].map((item, index: number) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            ) : (
                                <span>{data[field.name] || 'N/A'}</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </Wrapper>
    );
};

export default ViewForm;
