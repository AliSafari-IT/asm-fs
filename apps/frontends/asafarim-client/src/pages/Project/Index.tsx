import { useEffect, useState } from "react";
import Wrapper from "../../layout/Wrapper/Wrapper";
import { Button, Toolbar, Tooltip } from "@fluentui/react-components";
import { Edit20Regular, Delete20Regular, Eye20Regular, AppsAddIn24Regular as AddNewIcon } from "@fluentui/react-icons";
import { useNavigate } from "react-router-dom";
import dashboardServices from "../../api/entityServices";
import { IProject } from "../../interfaces/IProject";

const ProjectHome: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [projects, setProjects] = useState<IProject[]>([]);
    const navigate = useNavigate();

    const headerBlock = (
        <header className="w-full text-center mx-auto m-0 flex justify-between items-center">
            <Toolbar aria-label="Project Toolbar" className="mt-4">
                <h1 className="text-3xl font-bold p-6">
                    <span className="mx-3">Projects</span>   {/* Add project toolbar */}
                    <Button
                        appearance="primary"
                        icon={<AddNewIcon />}
                        onClick={() => navigate("/projects/addnew")}
                        className="ml-5 pl-3 pr-3"
                        aria-label={"Add New Project"}
                        title="Add New Project"
                    />
                </h1>
            </Toolbar>
        </header>
    );

    const fetchProjects = async () => {
        setLoading(true);
        try {
            const response = await dashboardServices.fetchEntities("project");
            setProjects(response.data);
        } catch (error) {
            setError((error as { message: string }).message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleView = (id: string) => {
        navigate(`/projects/${id}`);
    };

    const handleEdit = (id: string) => {
        navigate(`/projects/${id}/edit`);
    };

    const handleDelete = (id: string) => {
        // Confirm deletion and call API to delete project
        if (window.confirm("Are you sure you want to delete this project?")) {
            console.log(`Delete project with id: ${id}`);
        }
    };

    const calculateDaysLeft = (startDate: string) => {
        const today = new Date();
        const start = new Date(startDate);
        return Math.ceil((today.getTime() - start.getTime()) / (1000 * 3600 * 24));
    };

    return (
        <Wrapper header={headerBlock}>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div className="w-full p-4">

                    <table className="w-full shadow-md rounded-lg">
                        <thead className="">
                            <tr>
                                <th className="p-1 text-left">Project Title</th>
                                <th className="p-1 text-left">Description</th>
                                <th className="p-1 text-left">Start Date</th>
                                <th className="p-1 text-center">Days Left</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map((project: IProject) => (
                                <tr key={project.id} className="border-b">
                                    <td className="p-2">{project.title}</td>
                                    <td className="p-2">{project.description}</td>
                                    <td className="p-2 text-center">{new Date(project.startDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</td>
                                    <td className={`p-2 text-center font-bold ${(calculateDaysLeft(project.startDate as unknown as string) !== undefined && calculateDaysLeft(project.startDate as unknown as string) < 0) ? "bg-danger" : (calculateDaysLeft(project.startDate as unknown as string)  && calculateDaysLeft(project.startDate as unknown as string) < 30) ? "bg-warning" : "bg-info"}`} >{calculateDaysLeft(project.startDate as unknown as string) !== undefined ? calculateDaysLeft(project.startDate as unknown as string) : '-'}</td>
                                    <td className="p-2 text-center space-x-2">
                                        <Tooltip content="View" relationship={"description"}>
                                            <Button
                                                icon={<Eye20Regular />}
                                                onClick={() => handleView(project.id)}
                                                appearance="subtle"
                                            />
                                        </Tooltip>
                                        <Tooltip content="Edit" relationship={"description"}>
                                            <Button
                                                icon={<Edit20Regular />}
                                                onClick={() => handleEdit(project.id)}
                                                appearance="subtle"
                                            />
                                        </Tooltip>
                                        <Tooltip content="Delete" relationship={"description"}>
                                            <Button
                                                icon={<Delete20Regular />}
                                                onClick={() => handleDelete(project.id)}
                                                appearance="subtle"
                                            />
                                        </Tooltip>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </Wrapper>
    );
};

export default ProjectHome;
