import React, { useState, useEffect } from 'react';
import axios from 'axios';
import  './Customer.css';

function CustomerList() {
    const [customers, setCustomers] = useState([]);
    const [currentCustomer, setCurrentCustomer] = useState({ id: null, name: '', email: '', address: '' });
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const response = await axios.get('http://localhost:8086/api/customers');
            setCustomers(response.data);
        } catch (error) {
            console.error('Error fetching customers', error);
        }
    };

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentCustomer({ ...currentCustomer, [name]: value });
    };

    const addCustomer = async () => {
        if (!currentCustomer.name || !currentCustomer.email || !currentCustomer.address) return;
        try {
            const response = await axios.post('http://localhost:8086/api/customers', currentCustomer);
            setCustomers([...customers, response.data]);
            setCurrentCustomer({ id: null, name: '', email: '', address: '' });
        } catch (error) {
            console.error('Error adding customer', error);
        }
    };

    const deleteCustomer = async id => {
        try {
            await axios.delete(`http://localhost:8086/api/customers/${id}`);
            setCustomers(customers.filter(customer => customer.id !== id));
        } catch (error) {
            console.error('Error deleting customer', error);
        }
    };

    const editCustomer = customer => {
        setEditing(true);
        setCurrentCustomer(customer);
    };

    const updateCustomer = async () => {
        try {
            await axios.put(`http://localhost:8086/api/customers/${currentCustomer.id}`, currentCustomer);
            fetchCustomers();
            setEditing(false);
            setCurrentCustomer({ id: null, name: '', email: '', address: '' });
        } catch (error) {
            console.error('Error updating customer', error);
        }
    };

    // ... (other imports and logic)

return (
    <div className="list-container">
        <h2>Customers</h2>

        {editing ? (
            <div>
                <h3>Edit Customer</h3>
                <button className="glow-button" onClick={() => setEditing(false)}>Cancel</button>
            </div>
        ) : (
            <h3>Add New Customer</h3>
        )}

        <input className="input-field" name="name" value={currentCustomer.name} onChange={handleInputChange} placeholder="Name" />
        <input className="input-field" name="email" value={currentCustomer.email} onChange={handleInputChange} placeholder="Email" />
        <input className="input-field" name="address" value={currentCustomer.address} onChange={handleInputChange} placeholder="Address" />
        
        {editing ? (
            <button className="glow-button" onClick={updateCustomer}>Update</button>
        ) : (
            <button className="glow-button" onClick={addCustomer}>Add Customer</button>
        )}

        <table className="styled-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {customers.map(customer => (
                    <tr key={customer.id}>
                        <td>{customer.name}</td>
                        <td>{customer.email}</td>
                        <td>{customer.address}</td>
                        <td>
                            <button className="glow-button" onClick={() => editCustomer(customer)}>Edit</button>
                            <button className="glow-button" onClick={() => deleteCustomer(customer.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

}
export default CustomerList;