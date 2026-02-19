import {useEffect,useState} from "react";
import API from "./api";

API.get("/users")

function DeletedUsers(){
    const [users,setUsers]=useState([]);
    const fetchDeleted=async()=>{
        const res= await API.get("/users/deleted");
        setUsers(res.data);
    };
    const restoreUser=async (id)=>{
        await API.put(`/users/${id}/restore`);
        fetchDeleted();
    };
    useEffect(()=>{
        fetchDeleted();
    },[]);
    return(
        <div>
            <h3>Deleted Users</h3>
            {users.map((user)=>(
                <div key={user.id}>
                    {user.name}-{user.mail}
                    <button onClick={()=>restoreUser(user.id)}>Restore</button>
                </div>
                    ))}
        </div>
    );
}
export default DeletedUsers;