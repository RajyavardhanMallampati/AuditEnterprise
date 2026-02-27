import { useEffect, useState } from "react";
import API from "./api";

function DeletedUsers() {
    const [users, setUsers] = useState([]);

    const fetchDeleted = async () => {
        try {
            const res = await API.get("/users/deleted");
            setUsers(res.data);
        } catch (err) {
            console.error("Error fetching deleted users:", err);
        }
    };

    const restoreUser = async (id) => {
        try {
            await API.put(`/users/${id}/restore`);
            fetchDeleted();
        } catch (err) {
            console.error("Error restoring user:", err);
        }
    };

    useEffect(() => {
        fetchDeleted();
    }, []);

    return (
        <div>
            <h3>Deleted Users</h3>
            {users.map((user) => (
                <div key={user.id}>
                    {user.name} - {user.email}
                    <button onClick={() => restoreUser(user.id)}>
                        Restore
                    </button>
                </div>
            ))}
        </div>
    );
}

export default DeletedUsers;