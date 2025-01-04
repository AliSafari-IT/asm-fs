import React from "react";
import { IField } from "@/interfaces/IField";
import ViewForm from "@/components/crud/ViewForm";

interface ViewProjectProps {
    project: { [key: string]: React.ReactNode[] };
}

const ViewProject: React.FC<ViewProjectProps> = ({ project }) => {
    const fields: IField[] = [
        { name: "title", label: "Title", type: "text" },
        { name: "description", label: "Description", type: "textarea" },
        { name: "startDate", label: "Start Date", type: "date" },
        { name: "endDate", label: "End Date", type: "date" },
        { name: "budget", label: "Budget", type: "number" },
        {
            name: "priority",
            label: "Priority",
            type: "select",
            options: [
                { value: "low", label: "Low" },
                { value: "medium", label: "Medium" },
                { value: "high", label: "High" },
            ],
        },
        { name: "image", label: "Uploaded Image", type: "file" },
        { name: "isPublic", label: "Public Project", type: "checkbox" },
    ];

    return (
        <ViewForm entityName="Project" fields={fields} data={project} />
    );
};

export default ViewProject;
