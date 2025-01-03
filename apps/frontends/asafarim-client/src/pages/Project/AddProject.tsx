// src/pages/Project/AddProject.tsx
import AddForm from "../../components/crud/AddForm";
import axios from "axios";
import { IField } from "@/interfaces/IField";
import API_URL from "@/api/getApiUrls";
const projectUrl = API_URL + '/projects';

const AddProject: React.FC = () => {
    const fields: IField[] = [
        { name: 'title', label: 'Title', type: 'text', required: true, placeholder: 'Enter project title' },
        { name: 'description', label: 'Description', type: 'textarea' },
        { name: 'startDate', label: 'Start Date', type: 'date', required: true },
        { name: 'endDate', label: 'End Date', type: 'date' },
        { name: 'budget', label: 'Budget', type: 'number', placeholder: 'Enter project budget' },
        {
            name: 'priority', label: 'Priority', type: 'select', options: [
                { value: 'low', label: 'Low' },
                { value: 'medium', label: 'Medium' },
                { value: 'high', label: 'High' },
            ]
        },
        { name: 'image', label: 'Upload Image', type: 'file', accept: 'image/*' },
        { name: 'isPublic', label: 'Public Project', type: 'checkbox' },
    ];


    return (
        <AddForm entityName={"Project"}
            fields={fields}
            submitHandler={async (formData: { [key: string]: string | number | boolean | File | FileList | undefined; delete: boolean }) => {

                console.debug("Submitting form data:", formData, "via URL:", projectUrl);

                const response = await axios.post(projectUrl, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                console.log("submitHandler response data: ", response.data);
            }} />
    );
};

export default AddProject;
