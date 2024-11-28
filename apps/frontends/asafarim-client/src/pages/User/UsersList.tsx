import React, { useState, useEffect } from 'react';
import { getUsers, deleteUser, updateUser } from '../../api/userManagerApi';

const UsersList: React.FC = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const data = await getUsers();
                setUsers(data);
            } catch (error) {
                setError('Failed to fetch users.' + error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            await deleteUser(id);
            setUsers(users.filter(user => user.id !== id));
        } catch (error) {
            setError('Failed to delete user.');
        }
    };

    const handleUpdate = async (id: string) => {
        const updatedUser = { fullName: 'Updated Name', isAdmin: true };

        try {
            await updateUser(id, updatedUser);
            setUsers(users.map(user => user.id === id ? { ...user, ...updatedUser } : user));
        } catch (error) {
            setError('Failed to update user.');
        }
    };

    return (
        <div>
            <h1>User Management</h1>
            {loading && <p>Loading users...</p>}
            {error && <p>{error}</p>}
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        <p>{user.fullName} ({user.isAdmin ? 'Admin' : 'User'})</p>
                        <button onClick={() => handleUpdate(user.id)}>Update</button>
                        <button onClick={() => handleDelete(user.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UsersList;
