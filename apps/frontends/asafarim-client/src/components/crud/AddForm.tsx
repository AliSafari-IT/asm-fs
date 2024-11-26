import React, { useState } from 'react';
import axios from 'axios';

const AddForm: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        budget: 0,
        clientId: '',
        ownerId: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://localhost:44337/api/projects', formData);
            console.log('Project added:', response.data);
            // Optionally reset the form
            setFormData({
                name: '',
                title: '',
                description: '',
                startDate: '',
                endDate: '',
                budget: 0,
                clientId: '',
                ownerId: '',
            });
        } catch (error) {
            console.error('Error adding project:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Title:</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Description:</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Start Date:</label>
                <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>End Date:</label>
                <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Budget:</label>
                <input
                    type="number"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Client ID:</label>
                <input
                    type="text"
                    name="clientId"
                    value={formData.clientId}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Owner ID:</label>
                <input
                    type="text"
                    name="ownerId"
                    value={formData.ownerId}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Add Project</button>
        </form>
    );
};

export default AddForm;
