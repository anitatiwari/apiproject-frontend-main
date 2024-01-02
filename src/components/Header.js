import React, { useEffect } from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
export default function Header() {

    const navigate = useNavigate();


    const [userData, setUserData] = useState({
        "id": 1,
        "firstname": "",
        "lastname": "",
        "email": "",
        "created_at": "",
        "updated_at": ""
    });

    useEffect(() => {
        fetch('http://localhost:3001/user/profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',

            },
            credentials: 'include',
        }).then(response => {
            return response.json()

        }).then(data => {

            setUserData(data)
        })
    }, [])


    const handleDeleteAccount = () => {
        fetch('http://localhost:3001/user/deleteAccount', {
            method: 'DELETE',

            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        }).then(response => {
            return response.json()

        }).then((data) => {

            toast.success("Deleted Account Successfully");
            navigate('/login');

        }).catch((err) => {
            toast.error("Error in deleting account");
        })
    }
    


    return (
        <header className="flex items-center justify-between p-4 bg-blue-500 text-white">
            <div className="flex items-center gap-12">
                <span className=" flex  pl-12 rounded-full ">
                    <span className="flex h-full w-full items-center justify-center rounded-full bg-muted text-2xl font-bold  text-white">
                    <Link to="/" className='text-s font-bold  '> FeedFrenzy </Link>

                    </span>
                </span>
                <div className='flex  gap-2'>
                    
                
                <div class="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 overflow-hidden">
                <img class="w-full h-full object-cover" src={`https://ui-avatars.com/api/?name=${userData.firstname}+${userData.lastname}`} alt="User Profile" />
            </div>
                <div className="grid text-xs">
                    <div className="font-medium">{userData.firstname + " " + userData.lastname}</div>
                    <div className="text-gray-200">{userData.email}</div>
                </div>
                </div>
            </div>
            <div className="flex items-center gap-4">

                <button onClick={handleDeleteAccount} className="text-white hover:bg-red-600 border border-light-400 p-3 bg-red-700 rounded-lg" href="#">
                    Delete Account
                </button>
            </div>
        </header>
    )
}
