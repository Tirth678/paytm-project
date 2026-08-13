import { useEffect, useState } from "react"
import Btn from '../components/Btn.jsx'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Users ()  {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        
        if (!token) {
            navigate('/signin');
            return;
        }

        axios.get(`http://localhost:3001/api/v1/user/bulk?filter=${search}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            setUsers(response.data.users)
        })
        .catch(error => {
            console.error('Error fetching users:', error);
            if (error.response?.status === 403) {
                navigate('/signin');
            }
        })
    }, [search, navigate])

    return (
        <>
        <div className="m-5">
        <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="my-2">
            <input 
                onChange={(e) => setSearch(e.target.value)}
                type="text" 
                placeholder="Search users..." 
                className="w-full px-2 py-1 border rounded border-slate-200"
            />
        </div>
        <div>
            {users.map(user => <User key={user._id} user={user} />)}
        </div>
        </div>
    </>
    )
}

function User({user}) {
    const navigate = useNavigate();

    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
            <Btn 
                onClick={() => navigate(`/send?id=${user._id}&name=${user.firstName}`)} 
                btn={"Send Money"} 
            />
        </div>
    </div>
}
export default Users;