import axios from 'axios';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { API_ENDPOINTS } from '../config/api.js';

function SendMoney() {
    const [amount, setAmount] = useState('');
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    
    const recipientId = searchParams.get('id');
    const recipientName = searchParams.get('name');
    
    const handleTransfer = async () => {
        const token = localStorage.getItem('token');
        
        if (!token) {
            alert('Please login first');
            navigate('/signin');
            return;
        }

        if (!amount || amount <= 0) {
            alert('Please enter a valid amount');
            return;
        }

        if (!recipientId) {
            alert('Recipient not found');
            return;
        }

        console.log('Transfer data:', {
            amount: Number(amount),
            to: recipientId
        });

        try {
            const response = await axios.post(API_ENDPOINTS.TRANSFER, 
                {
                    amount: Number(amount),
                    to: recipientId
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log('Transfer response:', response.data);
            alert('Transfer successful!');
            navigate('/dashboard');
        } catch (error) {
            console.error('Transfer error:', error);
            console.error('Error response:', error.response?.data);
            alert(error.response?.data?.message || 'Transfer failed');
        }
    };

    return <div className="flex justify-center h-screen bg-gray-100">
        <div className="h-full flex flex-col justify-center">
            <div
                className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg"
            >
                <div className="flex flex-col space-y-1.5 p-6">
                <h2 className="text-3xl font-bold text-center">Send Money</h2>
                </div>
                <div className="p-6">
                <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
                    <span className="text-2xl text-white">{recipientName?.[0]?.toUpperCase() || 'U'}</span>
                    </div>
                    <h3 className="text-2xl font-semibold">{recipientName || 'User'}</h3>
                </div>
                <div className="space-y-4">
                    <div className="space-y-2">
                    <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        htmlFor="amount"
                    >
                        Amount (in Rs)
                    </label>
                    <input
                        onChange={(e) => setAmount(e.target.value)}
                        type="number"
                        value={amount}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        id="amount"
                        placeholder="Enter amount"
                    />
                    </div>
                    <button
                        onClick={handleTransfer}
                        className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-blue-500 text-white hover:bg-blue-600"
                    >
                        Initiate Transfer
                    </button>
                </div>
                </div>
        </div>
      </div>
    </div>
}
export default SendMoney;