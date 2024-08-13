import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function CreateEmp(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [designation, setDesignation] = useState("");
    const [gender, setGender] = useState("");
    const [course, setCourse] = useState("");
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    async function CreateEmp(e){
        e.preventDefault();

        setMessage("Loading...");

        if(!name || !email || !mobile || !designation || !gender || !course|| !file){
            setMessage("Please fill in all fields");
        } else{
            try {
                const response = await axios.post(`${process.env.REACT_APP_API_URL}/employee`, {
                    name,
                    email,
                    mobile,
                    designation,
                    gender,
                    course,
                });
    
                if (response.data.message === "Employee already exists") {
                    setMessage("Employee already exists");
                } else if (response.data.message === "Employee registered successfully") {
                    toast.success("Registration Successful");
                    navigate("/empList", { state: { id: email } });
                }
            } catch (error) {
                if (error.response.status === 409) {
                    setMessage('Email address is already in use');
                } else {
                    setMessage('Something went wrong');
                    console.error(error);
                }
            }
        }

        setTimeout(() => {
            setMessage("");
        }, 3000);
    }

    return(
        <div className="createEmp-container">
            <form className="createEmp" onSubmit={CreateEmp}>
                <h2>Create Employee</h2>
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Name"
                    onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className="form-group">
                    <input type="email" className="form-control" placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="form-group">
                    <input type="number" className="form-control" placeholder="Mobile No"
                    onChange={(e) => setMobile(e.target.value)}/>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Designation"
                    onChange={(e) => setDesignation(e.target.value)}/>
                </div>
                <div className="form-group">
                    <select className="form-control" onChange={(e) => setGender(e.target.value)}>
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Others">Others</option>
                    </select>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Course"
                    onChange={(e) => setCourse(e.target.value)}/>
                </div>
                <div className="form-group">
                    <input type="file" className="form-control" 
                    onChange={(e) => setFile(e.target.files[0])}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <p className="error">{message}</p>
            </form>
        </div>  
    );
}