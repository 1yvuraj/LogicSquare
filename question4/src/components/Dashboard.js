
import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [availableCount, setAvailableCount] = useState(0);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    department: '',
    salary: '',
    location: '',
    available: false
  });
  const [editingId, setEditingId] = useState(null);

  // Load data from localStorage on initial render
  useEffect(() => {
    const savedEmployees = JSON.parse(localStorage.getItem('employees'));
    if (savedEmployees && savedEmployees.length > 0) {
      setEmployees(savedEmployees);
      // Calculate availableCount
      const availableCount = savedEmployees.filter(employee => employee.available).length;
      setAvailableCount(availableCount);
    }
  }, []);
  
  // Save data to localStorage whenever employees state changes
  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
    // Recalculate availableCount whenever employees state changes
    const newAvailableCount = employees.filter(employee => employee.available).length;
    setAvailableCount(newAvailableCount);
  }, [employees]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };

  const toggleAvailability = (id) => {
    setEmployees(employees.map(employee => {
      if (employee.id === id) {
        return { ...employee, available: !employee.available };
      }
      return employee;
    }));
  };
  const Available1 = (e) => {
    const { name, value } = e.target;
    if (name === "available") {
      // If the availability toggle button is clicked
      setNewEmployee({ ...newEmployee, available: !newEmployee.available });
    } else {
      // For other input fields
      setNewEmployee({ ...newEmployee, [name]: value });
    }
  };
  
  const addEmployee = () => {
    setEmployees([...employees, { id: Date.now(), ...newEmployee }]);
    if (newEmployee.available) {
      setAvailableCount(prevCount => prevCount + 1);
    }
    // Reset the form fields
    setNewEmployee({
      name: '',
      department: '',
      salary: '',
      location: '',
      available: false
    });
  };

  const deleteEmployee = (id) => {
    setEmployees(employees.filter(employee => employee.id !== id));
    const deletedEmployee = employees.find(employee => employee.id === id);
    if (deletedEmployee.available) {
      setAvailableCount(prevCount => prevCount - 1);
    }
  };

  const editEmployee = (id) => {
    setEditingId(id);
    const employeeToEdit = employees.find(employee => employee.id === id);
    setNewEmployee(employeeToEdit);
  };

  const saveEdit = () => {
    setEmployees(employees.map(employee => {
      if (employee.id === editingId) {
        return newEmployee;
      }
      return employee;
    }));
    setEditingId(null);
  };

  return (
    <div style={styles.container}>
      <div style={styles.stats}>
        <h2>Total Employees: {employees.length}</h2>
        <h2>Available Employees: {availableCount}</h2>
      </div>

      <div style={styles.form}>
        <input
          type="text"
          name="name"
          value={newEmployee.name}
          onChange={handleInputChange}
          style={styles.input}
          placeholder="Enter name"
        />
        <select
          name="department"
          value={newEmployee.department}
          onChange={handleInputChange}
          style={styles.input}
        >
          <option value="">Select Department</option>
          <option value="Frontend Development">Frontend Development</option>
          <option value="Backend Development">Backend Development</option>
          <option value="Testing">Testing</option>
          <option value="Deployment">Deployment</option>
        </select>
        <input
          type="number"
          name="salary"
          value={newEmployee.salary}
          onChange={handleInputChange}
          style={styles.input}
          placeholder="Enter salary"
        />
        <input
          type="text"
          name="location"
          value={newEmployee.location}
          onChange={handleInputChange}
          style={styles.input}
          placeholder="Enter location"
        />
        <div>
          <label>
          Available:
            <button onClick={() => Available1({ target: { name: "available" } })} style={newEmployee.available ? styles.availableButton : styles.unavailableButton}>
                {newEmployee.available ? 'Yes' : 'No'}
            </button>

          </label>
        </div>
        {editingId !== null ? (
          <div>
            <button onClick={saveEdit} style={styles.button}>Save Edit</button>
            <button onClick={() => setEditingId(null)} style={styles.button}>Cancel</button>
          </div>
        ) : (
          <button onClick={addEmployee} style={styles.button}>Add Employee</button>
        )}
      </div>

      <div style={styles.employeeContainer}>
        {employees.map(employee => (
          <div style={styles.employeeBox} key={employee.id}>
            <h3>{employee.name}</h3>
            <p><strong>Department:</strong> {employee.department}</p>
            <p><strong>Salary:</strong> {employee.salary}</p>
            <p><strong>Location:</strong> {employee.location}</p>
            <p><strong>Available:</strong> {employee.available ? 'Yes' : 'No'}</p>
            <div>
              <button onClick={() => editEmployee(employee.id)} style={styles.actionButton}>Edit</button>
              <button onClick={() => deleteEmployee(employee.id)} style={styles.actionButton}>Delete</button>
              <button onClick={() => toggleAvailability(employee.id)} style={styles.actionButton}>
                {employee.available ? 'Make Unavailable' : 'Make Available'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
    body:{
      backgroundColor: 'black'
    },
    container: {
      maxWidth: '850px',
      margin: 'auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f0f0f0',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Add shadow for depth
      borderRadius: '10px', // Add rounded corners for a softer look
    },
    stats: {
      textAlign: 'center',
      marginBottom: '20px',
    },
    form: {
      marginBottom: '20px',
      background: 'linear-gradient(to right, #c9d6ff, #e2e2e2)', // Add gradient background
      padding: '20px',
      borderRadius: '10px', // Add rounded corners
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Add subtle shadow
    },
    input: {
      display: 'block',
      width: '100%',
      padding: '10px',
      marginBottom: '15px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      boxSizing: 'border-box',
    },
    button: {
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      padding: '10px',
      cursor: 'pointer',
      width: '100%',
      marginRight: '5px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Add shadow for depth
    },
    actionButton: {
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      padding: '5px 10px',
      cursor: 'pointer',
      marginRight: '5px',
      boxShadow:'0 2px 4px rgba(0, 0, 0, 0.1)', // Add shadow for depth
    },
   employeeContainer:{
     display:'flex', 
     flexWrap:'wrap', 
     justifyContent:'center', 
     perspective:'1000px' // Add perspective for a subtle 3D effect
  },
  employeeBox:{
     backgroundColor:'#fff', 
     border:'1px solid #ccc', 
     borderRadius:'5px', 
     padding:'20px', 
     margin:'10px', 
     width:'270px', 
     boxShadow:'3px -3px #888888' // Add box shadow with offset for a lifted effect
  },
  availableButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '5px 10px',
    cursor: 'pointer',
    marginRight: '5px',
    boxShadow:'0 2px 4px rgba(0, 0, 0, 0.1)', // Add shadow for depth
  },
  unavailableButton: {
    backgroundColor: '#ff6666',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '5px 10px',
    cursor: 'pointer',
    marginRight: '5px',
    boxShadow:'0 2px 4px rgba(0, 0, 0, 0.1)', // Add shadow for depth
  },
};

export default Dashboard;
