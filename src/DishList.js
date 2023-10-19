import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dish.css';
function DishList() {
    const [dishes, setDishes] = useState([]);
    const [newDish, setNewDish] = useState({ foodName: '', type: '', price: 0 });

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:8086/api/orders');
                setDishes(response.data);
            } catch (error) {
                console.error('Error fetching dishes', error);
            }
        }
        fetchData();
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewDish(prevState => ({ ...prevState, [name]: value }));
    }

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:8086/api/orders', newDish);
            setDishes([...dishes, response.data]);
            setNewDish({ foodName: '', type: '', price: 0 });
        } catch (error) {
            console.error('Error adding dish', error);
        }
    }

    // ... (Other imports and logic)

return (
    <div className="list-container">
        <h2>Dishes</h2>

        <table className="styled-table">
            <thead>
                <tr>
                    <th>Food Name</th>
                    <th>Type</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {dishes.map(dish => (
                    <tr key={dish.id}>
                        <td>{dish.foodName}</td>
                        <td>{dish.type}</td>
                        <td>{dish.price}</td>
                    </tr>
                ))}
            </tbody>
        </table>

        <div className="add-dish">
            <h3>Add New Dish</h3>
            <input
                className="input-field"
                name="foodName"
                value={newDish.foodName}
                onChange={handleInputChange}
                placeholder="Food Name"
            />
            <input
                className="input-field"
                name="type"
                value={newDish.type}
                onChange={handleInputChange}
                placeholder="Type"
            />
            <input
                className="input-field"
                name="price"
                type="number"
                value={newDish.price}
                onChange={handleInputChange}
                placeholder="Price"
            />
            <button className="glow-button" onClick={handleSubmit}>Add Dish</button>
        </div>
    </div>
);

}

export default DishList;