import {useState} from "react";
import API from "../api";
function UserForm({refresh}){
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const handleSubmit =async(e)=>{
        e.preventDefault();
        await API.post("/users",{name,email});
        setName("");
        setEmail("");
        refresh();
    };
    return(
        <form onSubmit={handleSubmit}>
            <h3>Create User</h3>
            <input type="text" placeholder={"Name"} value={name} onChange={(e)=>setName(e.target.value)}
                   required/>
            <input type={"text"} placeholder={"Email"} value={email} onChange={(e)=>setEmail(e.target.value)}
                   required/>
            <button type={"submit"}>Create</button>
        </form>
    );
}
export default UserForm;