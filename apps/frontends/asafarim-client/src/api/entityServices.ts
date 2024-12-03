// E:\asm\apps\dashboard-client\src\api\dashboardServices.ts
import axios from "axios";
import API_URL from "./getApiUrls";

const tableExistsInDb = async (tableName: string): Promise<boolean> => {
    console.info(`Checking table existence: ${tableName} in ${API_URL}`);
    try {
        const response = await axios.get(`${API_URL}/${tableName}`);
        return response.status === 200;
    } catch {
        return false;
    }
}
// CRUD operations for entities from the API
const fetchEntities = async (entityTableName: string) => {
    // Todo: check if entityTableName is valid/exists
    if (!tableExistsInDb(entityTableName + 's')) {
        throw new Error('Entity does not exist: ' + entityTableName);
    }

    const url = `${API_URL}/${entityTableName}s`;
    console.log(`fetchEntities for ${url}`); // Log the data being sent
    return axios.get(`${url}`)
        .catch(error => {
            console.error('Error fetching entities:', error);
            throw new Error('Failed to fetch entities: ' + entityTableName + 's. (' + error + ')');
        });
}

/**
 * Fetch a single entity by its ID from the specified table in the API.
 * @param {string} entityTableName The name of the table in the API to fetch the entity from.
 * @param {string} id The ID of the entity to fetch.
 * @returns {Promise<any>} A promise that resolves to the fetched entity.
 * @throws {Error} If the fetch operation fails, an error is thrown with a message indicating the failure.
 */
const fetchEntityById = async (entityTableName: string, id: string): Promise<unknown> => {
    console.log(`Fetching entity by ID from ${entityTableName}`, id);
    return axios.get(`${API_URL}/${entityTableName}/${id}`)
        .then(response => {
            console.log(`Fetched entity by ID from ${entityTableName}`, response.data);
            return response.data;
        })
        .catch(error => {
            console.error(`Error fetching entity by ID from ${entityTableName}`, error);
            throw new Error('Failed to fetch entity: ' + entityTableName);
        });
}

const addEntity = async (entityTableName: string, data: unknown) => {
    console.log(`Adding entity to ${entityTableName}`, data);
    // Send a POST request to add a new entity
    return axios.post(`${API_URL}/${entityTableName}`, data)
        .then(response => {
            console.log(`Added entity to ${entityTableName}`, response.data);
            return response.data;
        })
        .catch(error => {
            console.error(`Error adding entity to ${entityTableName}`, error);
            // Throw a new error with a message indicating the failure
            throw new Error('Failed to add entity: ' + entityTableName);
        });
}

const updateEntity = async (entityTableName: string, id: string, data: unknown) => {
    const url = `${API_URL}/${entityTableName}/${id}`;
    console.log(`Updating entity in ${entityTableName}: ID: ${id}`, data); // Log the data being sent

    return axios.put(url, data)  // Do not include the 'id' in the data object
        .then(response => {
            console.log(`Updated entity in ${entityTableName}`, response.data);
            return response.data;
        })
        .catch(error => {
            console.error(`Error updating entity in ${entityTableName}`, error);
            throw new Error('Failed to update entity: ' + entityTableName);
        });
}

const deleteEntity = async (entityTableName: string, id: string) => {
    return axios.delete(`${API_URL}/${entityTableName}/${id}`)
        .catch(error => {
            console.error('Error deleting entity:', error);
            throw new Error('Failed to delete entity: ' + entityTableName);
        });
}


const dashboardServices = {
    // Entity
    fetchEntities, fetchEntityById, addEntity, updateEntity, deleteEntity,
}

export default dashboardServices;

