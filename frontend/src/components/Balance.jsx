import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../config/api.js';

function Balance() {
    const [balance, setBalance] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        
        if (!token) {
            navigate('/signin');
            return;
        }

        axios.get(API_ENDPOINTS.GET_BALANCE, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            setBalance(response.data.balance);
        })
        .catch(error => {
            console.error('Error fetching balance:', error);
            if (error.response?.status === 403) {
                navigate('/signin');
            }
        });
    }, [navigate]);

    return <div className="flex m-5">
        <div className="font-bold text-lg">
            Your balance
        </div>
        <div className="font-semibold ml-4 text-lg">
            Rs {balance.toFixed(2)}
        </div>
    </div>
}
export default Balance;