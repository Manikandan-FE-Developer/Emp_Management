const Emp = require('../models/empModel');

// Create Employee API - /api/v1/employee
exports.createEmp = async (req, res) => {
    const { name, email, mobile, designation, gender, course } = req.body;

    try {
        const existingEmp = await Emp.findOne({ email });
        if (existingEmp) {
            return res.status(409).json({ message: "Employee already exists" });
        }

        const newEmp = new Emp({
            name,
            email,
            mobile,
            designation,
            gender,
            course,
        });

        await newEmp.save();

        res.status(201).json({ 
            message: "Employee registered successfully", 
            name: newEmp.name, 
            email: newEmp.email, 
            mobile: newEmp.mobile, 
            designation: newEmp.designation, 
            gender: newEmp.gender, 
            course: newEmp.course, 
        });

    } catch (error) {
        console.error("Error registering Employee:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Fetch Employees API - /api/v1/employees
exports.getEmployees = async (req, res) => {
    try {
        const employees = await Emp.find();
        res.status(200).json(employees);
    } catch (error) {
        console.error("Error fetching employees:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Update Employee API - /api/v1/employee/:id
exports.updateEmp = async (req, res) => {
    const { id } = req.params;
    const { name, email, mobile, designation, gender, course } = req.body;

    try {
        const updatedEmp = await Emp.findByIdAndUpdate(id, {
            name,
            email,
            mobile,
            designation,
            gender,
            course
        }, { new: true });

        if (!updatedEmp) {
            return res.status(404).json({ message: "Employee not found" });
        }

        res.status(200).json({ 
            message: "Employee updated successfully", 
            employee: updatedEmp 
        });

    } catch (error) {
        console.error("Error updating Employee:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


// Delete Employee API - /api/v1/employee/:id
exports.deleteEmp = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedEmp = await Emp.findByIdAndDelete(id);

        if (!deletedEmp) {
            return res.status(404).json({ message: "Employee not found" });
        }

        res.status(200).json({ 
            message: "Employee deleted successfully" 
        });

    } catch (error) {
        console.error("Error deleting Employee:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};