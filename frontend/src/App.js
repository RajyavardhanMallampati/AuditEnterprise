import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles/App.css";

function App() {
    const [users, setUsers] = useState([]);
    const [deletedUsers, setDeletedUsers] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const API = "http://localhost:8080/users";

    useEffect(() => {
        fetchUsers();
        fetchDeleted();
    }, []);

    const fetchUsers = async () => {
        const res = await axios.get(API);
        setUsers(res.data);
    };

    const fetchDeleted = async () => {
        const res = await axios.get(`${API}/deleted`);
        setDeletedUsers(res.data);
    };

    const addUser = async () => {
        if (!name || !email) return;

        const res = await axios.post(API, { name, email });

        setUsers(prev => [...prev, res.data]);
        setName("");
        setEmail("");
    };

    const deleteUser = async (id) => {
        const userToDelete = users.find(u => u.id === id);

        await axios.delete(`${API}/${id}`);

        setUsers(prev => prev.filter(u => u.id !== id));
        setDeletedUsers(prev => [...prev, userToDelete]);
    };

    const restoreUser = async (id) => {
        const userToRestore = deletedUsers.find(u => u.id === id);

        await axios.put(`${API}/${id}/restore`);

        setDeletedUsers(prev => prev.filter(u => u.id !== id));
        setUsers(prev => [...prev, userToRestore]);
    };

    return (
        <div className="dashboard">
            <header className="header">
                <h1>Audit Enterprise Dashboard</h1>
            </header>

            <div className="container">

                {/* Add User */}
                <div className="card">
                    <h2>Add New User</h2>
                    <div className="form">
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <button className="btn-primary" onClick={addUser}>
                            Add User
                        </button>
                    </div>
                </div>

                {/* Active Users */}
                <div className="card">
                    <h2>Active Users</h2>
                    <table className="table">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Created At</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map(user => (
                            <tr key={user.id} className="fade-in">
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.createdAt?.slice(0, 10)}</td>
                                <td>
                                    <span className="badge badge-active">Active</span>
                                </td>
                                <td>
                                    <button
                                        className="btn-danger"
                                        onClick={() => deleteUser(user.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {/* Deleted Users */}
                <div className="card">
                    <h2>Deleted Users</h2>
                    <table className="table">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {deletedUsers.map(user => (
                            <tr key={user.id} className="fade-in">
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <span className="badge badge-deleted">Deleted</span>
                                </td>
                                <td>
                                    <button
                                        className="btn-success"
                                        onClick={() => restoreUser(user.id)}
                                    >
                                        Restore
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
}

export default App;
