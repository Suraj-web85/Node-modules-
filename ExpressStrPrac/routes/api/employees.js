const express = require('express');
const router = express.Router();
const data = {};
data.employees = require('../../data/employees.json')
const fs = require('fs');

// Routes

router.route('/')
      .get((req, res) => {
        res.json(data.employees)
      })
      .post((req, res) => {
        // Extract new employee data from the request body
        const newEmployee = {
            id: data.employees.length + 1, // Assuming IDs are incremental
            firstname: req.body.firstname,
            lastname: req.body.lastname
        };
    
        // Add the new employee data to the array
        data.employees.push(newEmployee);
    
        // Write the updated array back to the employees.json file
        fs.writeFile('./data/employees.json', JSON.stringify(data.employees), (err) => {
            if (err) {
                console.error('Error updating employees.json:', err);
                res.status(500).json({ error: 'Error updating employees' });
            } else {
                res.json(newEmployee);
            }
        });
    })
    .put((req, res) => {
      const id = req.body.id;
      const employeeIndex = data.employees.findIndex(emp => emp.id === id);
      if (employeeIndex !== -1) {
          // Update the employee data in the array
          data.employees[employeeIndex] = req.body;
          // Now save the updated data back to the JSON file
          fs.writeFile('./data/employees.json', JSON.stringify(data.employees), (err) => {
              if (err) {
                  console.error('Error updating employees.json:', err);
                  res.status(500).json({ error: 'Error updating employees' });
              } else {
                  res.json(req.body);
              }
          });
      } else {
          res.status(404).json({ error: 'Employee not found' });
      }
  })
      .delete((req,res) => {
        res.json({"id" : req.body.id})
      })

      router.route('/:id')
      .get((req,res)=>{
          res.json({"id" : req.params.id})
      })

module.exports = router;