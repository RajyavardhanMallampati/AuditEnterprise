import { useEffect, useState } from "react";
import API from "./api";

function UserList() {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const res = await API.get("/users");
            setUsers(res.data);
        } catch (err) {
            console.error("Error fetching users:", err);
        }
    };

    const softDelete = async (id) => {
        try {
            await API.delete(`/users/${id}`);
            fetchUsers();
        } catch (err) {
            console.error("Error deleting user:", err);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div>
            <h3>Active Users</h3>
            {users.map((user) => (
                <div key={user.id}>
                    {user.name} - {user.email}
                    <button onClick={() => softDelete(user.id)}>
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
}

export default UserList;