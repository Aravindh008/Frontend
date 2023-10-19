import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PaymentList() {
    const [payments, setPayments] = useState([]);
    const [newPayment, setNewPayment] = useState({ transactionId: '', amount: 0, status: '' });

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:8086/api/payments');
                setPayments(response.data);
            } catch (error) {
                console.error('Error fetching payments', error);
            }
        }
        fetchData();
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewPayment(prevState => ({ ...prevState, [name]: value }));
    }

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:8086/api/payments', newPayment);
            setPayments([...payments, response.data]);
            setNewPayment({ transactionId: '', amount: 0, status: '' });
        } catch (error) {
            console.error('Error adding payment', error);
        }
    }

    // ... (Other imports and logic)

return (
    <div className="list-container">
        <h2>Payments</h2>

        <table className="styled-table">
            <thead>
                <tr>
                    <th>Transaction ID</th>
                    <th>Amount</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {payments.map(payment => (
                    <tr key={payment.id}>
                        <td>{payment.transactionId}</td>
                        <td>${payment.amount}</td>
                        <td>{payment.status}</td>
                    </tr>
                ))}
            </tbody>
        </table>

        <div className="add-payment">
            <h3>Add New Payment</h3>
            <input
                className="input-field"
                name="transactionId"
                value={newPayment.transactionId}
                onChange={handleInputChange}
                placeholder="Transaction ID"
            />
            <input
                className="input-field"
                name="amount"
                type="number"
                value={newPayment.amount}
                onChange={handleInputChange}
                placeholder="Amount"
            />
            <input
                className="input-field"
                name="status"
                value={newPayment.status}
                onChange={handleInputChange}
                placeholder="Status"
            />
            <button className="glow-button" onClick={handleSubmit}>Add Payment</button>
        </div>
    </div>
);

}

export default PaymentList;