import { IUser } from "./IUser";

// Create Project Interface
export interface IProject {
    id: string;
    title: string;
    description: string;
    startDate: Date;
    endDate?: Date;
    isCompleted: boolean;
    budget?: number;
    clientId: string;
    client?: IUser;
    ownerId: string;
    owner?: IUser;
    dateCreated: Date;
    dateModified: Date;

    markAsCompleted: () => void;
    updateProjectDetails: (title: string, description: string, clientId: string,ownerId: string, endDate?: Date, budget?: number) => void;
    calculateDaysLeft: (startDate: string) => number;
}

export default IProject;