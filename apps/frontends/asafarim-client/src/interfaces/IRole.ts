export enum IRoleEnum {
    Guest,
    StandardUser,
    Admin
  }

  export interface IRole {
    id: string;       // Guid type as a string
    name: string;     // Role name
    description?: string; // Optional description
}
