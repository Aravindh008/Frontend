import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import CustomerList from './Customers';
import DishList from './DishList';
import PaymentList from './Payment';
import Login from './Login';   // Assuming you'll create a Login.js file


function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/login">Login</Link>   {/* Add this */}
         
          <Link to="/customers">Customers</Link>
          <Link to="/orders">Dishes</Link>
          <Link to="/payments">Payments</Link>
        </nav>

        <Routes>
          <Route path="/login" element={<Login />} />    {/* Add this */}
          
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/orders" element={<DishList />} />
          <Route path="/payments" element={<PaymentList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
