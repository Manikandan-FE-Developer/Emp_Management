const express = require('express');
const router = express.Router();
const { register } = require('../controllers/registerController');
const { loginUser } = require('../controllers/loginController');
const { createEmp, updateEmp, deleteEmp, getEmployees } = require('../controllers/employeeController');

router.post('/register', register);
router.post('/login', loginUser);
router.post('/employee', createEmp);
router.put('/employee/:id', updateEmp);   
router.delete('/employee/:id', deleteEmp);
router.get('/employees', getEmployees);

module.exports = router;