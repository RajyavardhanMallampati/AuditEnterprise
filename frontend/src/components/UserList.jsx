import {useEffect,useState} from "react";
import API from "./api";

API.get("/users")

function UserList(){
    const [users,setUsers]=useState([]);
    const fetchUsers=async()=>{
        const res=await API.get("/users");
        setUsers(res.data);
    };
    const softDelete=async(id)=>{
        await API.delete(`/users/${id}`);
        fetchUsers();
    }
    useEffect(()=>{
        fetchUsers();
    },[]);
    return(
        <div>
            <h3>Active Users</h3>
            {users.map((user)=>(
                <div key={user.id}>
                    {user.name}-{user.email}
                    <button onClick={()=>softDelete(user.id)}>Delete</button>
        </div>
            ))}
        </div>
    );
}
export default UserList;