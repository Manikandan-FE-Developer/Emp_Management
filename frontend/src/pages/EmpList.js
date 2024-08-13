import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function EmpList() {
    const [employees, setEmployees] = useState([]);
    const [error, setError] = useState("");
    const [selectedEmp, setSelectedEmp] = useState(null);
    const [editForm, setEditForm] = useState({
        name: "",
        email: "",
        mobile: "",
        designation: "",
        gender: "",
        course: ""
    });

    useEffect(() => {
        async function fetchEmployees() {
            try {
                const response = await axios.get('http://localhost:8000/api/v1/employees');
                setEmployees(response.data);
            } catch (error) {
                setError('Failed to fetch employees');
                console.error('Error fetching employees:', error.message);
            }
        }
        fetchEmployees();
    }, []);

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(""), 3000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/v1/employee/${id}`);
            setEmployees(employees.filter(emp => emp._id !== id));
            setError('Employee deleted successfully');
        } catch (error) {
            setError('Failed to delete employee');
            console.error('Error deleting employee:', error.message);
        }
    };

    const handleEdit = (emp) => {
        setSelectedEmp(emp);
        setEditForm({
            name: emp.name,
            email: emp.email,
            mobile: emp.mobile,
            designation: emp.designation,
            gender: emp.gender,
            course: emp.course
        });
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setEditForm(prevForm => ({
            ...prevForm,
            [name]: value
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8000/api/v1/employee/${selectedEmp._id}`, editForm);
            setEmployees(employees.map(emp => (emp._id === selectedEmp._id ? { ...emp, ...editForm } : emp)));
            setSelectedEmp(null);
            setError('Employee updated successfully');
        } catch (error) {
            setError('Failed to update employee');
            console.error('Error updating employee:', error.message);
        }
    };

    return (
        <div className="empList">
            <div className="head">
                <p>Employee List</p>
                <p>Total Count: {employees.length}</p>
                <Link to="/createemp">
                    <button className="btn btn-success">Create Employee</button>
                </Link>
            </div>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile No</th>
                        <th>Designation</th>
                        <th>Gender</th>
                        <th>Course</th>
                        <th>Create Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.length > 0 ? (
                        employees.map(emp => (
                            <tr key={emp._id}>
                                <td>{emp._id}</td>
                                <td>{emp.file ? <img src={emp.file} alt="Employee" style={{width: '50px', height: '50px'}} /> : 'N/A'}</td>
                                <td>{emp.name}</td>
                                <td>{emp.email}</td>
                                <td>{emp.mobile}</td>
                                <td>{emp.designation}</td>
                                <td>{emp.gender}</td>
                                <td>{emp.course}</td>
                                <td>{emp.createdAt ? new Date(emp.createdAt).toLocaleDateString() : 'N/A'}</td>
                                <td>
                                    <button className="btn btn-primary" onClick={() => handleEdit(emp)}>Edit</button>
                                    <button className="btn btn-danger" onClick={() => handleDelete(emp._id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="10" className="text-center">No employees found</td>
                        </tr>
                    )}
                </tbody>
            </table>
            {error && <p className="error">{error}</p>}
            {selectedEmp && (
                <div className="popup">
                    <div className="form-group">
                        <h2>Edit Employee</h2><span className="close" onClick={() => setSelectedEmp(null)}>&times;</span>
                        <form onSubmit={handleFormSubmit}>
                            <div>
                                <input className="form-control" type="text" name="name" value={editForm.name} onChange={handleFormChange} required />
                            </div>
                            <div>
                                <input className="form-control" type="email" name="email" value={editForm.email} onChange={handleFormChange} required />
                            </div>
                            <div>
                                <input className="form-control" type="number" name="mobile" value={editForm.mobile} onChange={handleFormChange} required />
                            </div>
                            <div>
                                <input className="form-control" type="text" name="designation" value={editForm.designation} onChange={handleFormChange} required />
                            </div>
                            <div>
                                <select className="form-control" value={editForm.gender} name="gender" onChange={handleFormChange} required>
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Others">Others</option>
                                </select>
                            </div>
                            <div>
                                <input className="form-control" type="text" name="course" value={editForm.course} onChange={handleFormChange} required />
                            </div>
                            <button type="submit" className="btn btn-primary">Update</button>
                        </form>
                        {error && <p className="error">{error}</p>}
                    </div>
                </div>
            )}
        </div>
    );
}